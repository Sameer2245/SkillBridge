#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 FreelanceHub Setup Script');
console.log('============================\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required');
  console.error(`Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log('✅ Node.js version check passed');

// Function to run commands
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Failed to run: ${command}`);
    return false;
  }
}

// Function to create .env file
function createEnvFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  ${filePath} already exists, skipping...`);
    return;
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created ${filePath}`);
}

// Main setup function
async function setup() {
  console.log('\n📦 Installing dependencies...\n');

  // Install server dependencies
  console.log('Installing server dependencies...');
  if (!runCommand('npm install', path.join(__dirname, 'server'))) {
    console.error('❌ Failed to install server dependencies');
    process.exit(1);
  }

  // Install client dependencies
  console.log('\nInstalling client dependencies...');
  if (!runCommand('npm install', path.join(__dirname, 'client'))) {
    console.error('❌ Failed to install client dependencies');
    process.exit(1);
  }

  console.log('\n📝 Creating environment files...\n');

  // Create server .env file
  const serverEnvContent = `# Database
MONGO_URI=mongodb://localhost:27017/freelance-marketplace

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

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
`;

  createEnvFile(path.join(__dirname, 'server', '.env'), serverEnvContent);

  // Create client .env file
  const clientEnvContent = `REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
`;

  createEnvFile(path.join(__dirname, 'client', '.env'), clientEnvContent);

  // Create uploads directory
  const uploadsDir = path.join(__dirname, 'server', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Created uploads directory');
  }

  console.log('\n🎉 Setup completed successfully!\n');
  
  console.log('📋 Next steps:');
  console.log('1. Update the .env files with your actual credentials:');
  console.log('   - MongoDB connection string');
  console.log('   - Stripe API keys');
  console.log('   - Cloudinary credentials (optional)');
  console.log('   - Email credentials (optional)');
  console.log('');
  console.log('2. Make sure MongoDB is running');
  console.log('');
  console.log('3. Start the development servers:');
  console.log('   Backend:  cd server && npm run dev');
  console.log('   Frontend: cd client && npm start');
  console.log('');
  console.log('4. Open http://localhost:3000 in your browser');
  console.log('');
  console.log('📚 For detailed setup instructions, check README.md');
  console.log('');
  console.log('🆘 Need help? Create an issue on GitHub');
}

// Run setup
setup().catch(error => {
  console.error('❌ Setup failed:', error);
  process.exit(1);
});