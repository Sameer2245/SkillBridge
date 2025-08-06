import { z } from 'zod';

// Package schema for gig pricing
const packageSchema = z.object({
  title: z
    .string()
    .min(1, 'Package title is required')
    .max(50, 'Package title must be less than 50 characters'),
  
  description: z
    .string()
    .min(1, 'Package description is required')
    .max(200, 'Package description must be less than 200 characters'),
  
  price: z
    .number()
    .min(5, 'Price must be at least $5')
    .max(10000, 'Price must be less than $10,000'),
  
  deliveryTime: z
    .number()
    .min(1, 'Delivery time must be at least 1 day')
    .max(365, 'Delivery time must be less than 365 days'),
  
  revisions: z
    .number()
    .min(0, 'Revisions cannot be negative')
    .max(100, 'Revisions must be less than 100'),
  
  features: z
    .array(z.string().min(1, 'Feature cannot be empty'))
    .min(1, 'At least one feature is required')
    .max(10, 'Maximum 10 features allowed'),
});

// FAQ schema
const faqSchema = z.object({
  question: z
    .string()
    .min(1, 'Question is required')
    .max(100, 'Question must be less than 100 characters'),
  
  answer: z
    .string()
    .min(1, 'Answer is required')
    .max(500, 'Answer must be less than 500 characters'),
});

// Requirement schema
const requirementSchema = z.object({
  question: z
    .string()
    .min(1, 'Question is required')
    .max(100, 'Question must be less than 100 characters'),
  
  type: z
    .enum(['text', 'multiple_choice', 'file'], {
      required_error: 'Question type is required',
    }),
  
  required: z
    .boolean()
    .default(false),
  
  options: z
    .array(z.string().min(1, 'Option cannot be empty'))
    .optional(),
}).refine((data) => {
  if (data.type === 'multiple_choice') {
    return data.options && data.options.length >= 2;
  }
  return true;
}, {
  message: 'Multiple choice questions must have at least 2 options',
  path: ['options'],
});

// Main gig creation schema
export const gigSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(80, 'Title must be less than 80 characters'),
  
  category: z
    .enum([
      'Graphics & Design',
      'Digital Marketing',
      'Writing & Translation',
      'Video & Animation',
      'Music & Audio',
      'Programming & Tech',
      'Business',
      'Lifestyle',
      'Data',
      'Photography'
    ], {
      required_error: 'Please select a category',
    }),
  
  subcategory: z
    .string()
    .min(1, 'Subcategory is required')
    .max(50, 'Subcategory must be less than 50 characters'),
  
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(1200, 'Description must be less than 1200 characters'),
  
  tags: z
    .array(z.string().min(1, 'Tag cannot be empty'))
    .min(1, 'At least one tag is required')
    .max(5, 'Maximum 5 tags allowed'),
  
  // Package pricing
  packages: z.object({
    basic: packageSchema,
    standard: packageSchema.optional(),
    premium: packageSchema.optional(),
  }),
  
  // Legacy fields for backward compatibility
  price: z
    .number()
    .min(5, 'Price must be at least $5')
    .max(10000, 'Price must be less than $10,000'),
  
  deliveryTime: z
    .number()
    .min(1, 'Delivery time must be at least 1 day')
    .max(365, 'Delivery time must be less than 365 days'),
  
  revisions: z
    .number()
    .min(0, 'Revisions cannot be negative')
    .max(100, 'Revisions must be less than 100'),
  
  // Optional fields
  requirements: z
    .array(requirementSchema)
    .max(10, 'Maximum 10 requirements allowed')
    .optional(),
  
  faq: z
    .array(faqSchema)
    .max(10, 'Maximum 10 FAQs allowed')
    .optional(),
  
  images: z
    .array(z.string().url('Invalid image URL'))
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
  
  video: z
    .string()
    .url('Invalid video URL')
    .optional()
    .or(z.literal('')),
});

// Gig search/filter schema
export const gigSearchSchema = z.object({
  query: z
    .string()
    .max(100, 'Search query must be less than 100 characters')
    .optional(),
  
  category: z
    .string()
    .optional(),
  
  subcategory: z
    .string()
    .optional(),
  
  minPrice: z
    .number()
    .min(0, 'Minimum price cannot be negative')
    .optional(),
  
  maxPrice: z
    .number()
    .min(0, 'Maximum price cannot be negative')
    .optional(),
  
  deliveryTime: z
    .number()
    .min(1, 'Delivery time must be at least 1 day')
    .optional(),
  
  sortBy: z
    .enum(['relevance', 'price_low', 'price_high', 'rating', 'newest'])
    .default('relevance'),
  
  page: z
    .number()
    .min(1, 'Page must be at least 1')
    .default(1),
  
  limit: z
    .number()
    .min(1, 'Limit must be at least 1')
    .max(50, 'Limit must be less than 50')
    .default(12),
}).refine((data) => {
  if (data.minPrice && data.maxPrice) {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: 'Minimum price must be less than or equal to maximum price',
  path: ['maxPrice'],
});

// Gig update schema (similar to creation but with optional fields)
export const gigUpdateSchema = gigSchema.partial().extend({
  id: z.string().min(1, 'Gig ID is required'),
});