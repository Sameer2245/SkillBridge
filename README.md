# SkillBridge - Freelance Marketplace

A comprehensive freelance marketplace built with React, Node.js, and MongoDB. SkillBridge connects talented freelancers with clients looking for quality services. Features include user authentication, gig management, real-time chat, payments with Stripe, and more.

## 🚀 Features

### Core Features
- **User Authentication**: JWT-based authentication with two roles (Freelancer & Client)
- **Gig Management**: Create, edit, and manage service listings with packages
- **Advanced Search**: Filter gigs by category, price, delivery time, and more
- **Order Management**: Complete order lifecycle from purchase to delivery
- **Real-time Chat**: Socket.io powered messaging system
- **Payment Processing**: Stripe integration for secure payments
- **Review System**: Rate and review completed orders
- **Notifications**: Real-time notifications for orders, messages, and updates

### Technical Features
- **Frontend**: React 19 + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Form Handling**: React Hook Form + Zod validation
- **Real-time**: Socket.io for chat and notifications
- **File Upload**: Cloudinary integration (optional)
- **Payment**: Stripe for payment processing
- **Authentication**: JWT tokens with secure middleware

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payments)
- Cloudinary account (optional, for image uploads)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd freelance-marketplace
```

### 2. Install dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Environment Setup

#### Backend (.env)
Create a `.env` file in the `server` directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/freelance-marketplace

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Client URL
CLIENT_URL=http://localhost:3000

# Stripe (Required for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Port
PORT=5000
```

#### Frontend (.env)
Create a `.env` file in the `client` directory:

```env
REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Database Setup

Make sure MongoDB is running locally or set up MongoDB Atlas and update the `MONGO_URI` in your `.env` file.

### 5. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Set up webhooks for payment events:
   - Endpoint URL: `http://localhost:5000/api/payments/webhook`
   - Events to listen for: `payment_intent.succeeded`, `payment_intent.payment_failed`

## 🚀 Running the Application

### Development Mode

#### Start the backend server
```bash
cd server
npm run dev
```

#### Start the frontend development server
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Mode

#### Build the frontend
```bash
cd client
npm run build
```

#### Start the backend server
```bash
cd server
npm start
```

## 📁 Project Structure

```
freelance-marketplace/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── common/     # Common UI components
│   │   │   ├── notifications/ # Notification system
│   │   │   └── payment/    # Payment components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   │   ├── auth/       # Auth pages
│   │   │   └── categories/ # Category pages
│   │   ├── schemas/        # Zod validation schemas
│   │   ├── services/       # API services
│   │   └── styles/         # CSS files
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic services
│   ├── uploads/          # File uploads directory
│   └── server.js         # Main server file
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password/:token` - Reset password

### Gigs
- `GET /api/gigs` - Get all gigs
- `GET /api/gigs/:id` - Get gig by ID
- `POST /api/gigs` - Create new gig (auth required)
- `PUT /api/gigs/:id` - Update gig (auth required)
- `DELETE /api/gigs/:id` - Delete gig (auth required)
- `GET /api/gigs/search` - Search gigs

### Orders
- `GET /api/orders` - Get user orders (auth required)
- `POST /api/orders` - Create new order (auth required)
- `PUT /api/orders/:id/status` - Update order status (auth required)
- `POST /api/orders/:id/deliver` - Deliver order (auth required)
- `POST /api/orders/:id/accept` - Accept delivery (auth required)

### Messages
- `GET /api/messages/conversations` - Get conversations (auth required)
- `GET /api/messages/conversations/:id/messages` - Get messages (auth required)
- `POST /api/messages` - Send message (auth required)

### Payments
- `POST /api/payments/create-intent` - Create payment intent (auth required)
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/payments/history` - Payment history (auth required)

### Reviews
- `GET /api/reviews/gig/:gigId` - Get gig reviews
- `POST /api/reviews` - Create review (auth required)
- `PUT /api/reviews/:id` - Update review (auth required)

## 🎨 UI Components

The application uses Tailwind CSS for styling with custom components:

- **Forms**: React Hook Form with Zod validation
- **Modals**: Custom modal components
- **Notifications**: Toast notifications with react-hot-toast
- **Loading States**: Custom loading spinners
- **Icons**: Lucide React icons

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation with Zod
- CORS protection
- Rate limiting (can be added)
- Secure file uploads

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
cd client
npm test

# Backend tests (if implemented)
cd server
npm test
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in your hosting platform

### Backend (Heroku/Railway/DigitalOcean)
1. Set up environment variables
2. Configure MongoDB connection
3. Set up Stripe webhooks with production URL
4. Deploy the server directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

The project is actively maintained. Check for updates regularly and follow the changelog for new features and bug fixes.

---

**Happy Freelancing! 🎉**
