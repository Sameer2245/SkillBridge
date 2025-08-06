const axios = require('axios');

const quickPaymentTest = async () => {
  console.log('🧪 Quick Payment Interface Test\n');
  
  try {
    // Test 1: Check if gig exists
    console.log('1. Testing gig availability...');
    const gigResponse = await axios.get('http://localhost:5000/api/gigs/details/6884bcb27ae0450c8d310161');
    console.log(`✅ Gig found: "${gigResponse.data.title}" by ${gigResponse.data.userId.username}`);
    
    // Test 2: Check if checkout endpoint exists
    console.log('\n2. Testing checkout endpoint...');
    try {
      await axios.get('http://localhost:3000/checkout/6884bcb27ae0450c8d310161');
      console.log('✅ Checkout page accessible');
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('❌ Frontend server not running on port 3000');
      } else {
        console.log('✅ Checkout endpoint exists (got response)');
      }
    }
    
    // Test 3: Check Stripe configuration
    console.log('\n3. Testing Stripe configuration...');
    const stripeResponse = await axios.get('http://localhost:5000/api/config/stripe-key');
    if (stripeResponse.data.publishableKey) {
      console.log('✅ Stripe publishable key configured');
    } else {
      console.log('❌ Stripe publishable key missing');
    }
    
    console.log('\n🎯 Ready to test! Visit:');
    console.log('   http://localhost:3000/gigs/6884bcb27ae0450c8d310161');
    console.log('\n📝 Test Steps:');
    console.log('   1. Login as: buyer@test.com / password123');
    console.log('   2. Select a package');
    console.log('   3. Click "Continue to Payment"');
    console.log('   4. Fill requirements form');
    console.log('   5. Click "Proceed to Payment"');
    console.log('   6. Use test card: 4242 4242 4242 4242');
    console.log('   7. Complete payment');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure servers are running:');
      console.log('   cd server && npm run dev');
      console.log('   cd client && npm start');
    }
  }
};

quickPaymentTest();