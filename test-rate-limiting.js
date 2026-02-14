#!/usr/bin/env node

/**
 * Rate Limiting Test Script
 * 
 * This script demonstrates how rate limiting works by making
 * multiple requests to test the limits.
 */

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8888/api/v1';

// Test configurations
const tests = [
  {
    name: 'General Rate Limit Test',
    endpoint: '/users',
    method: 'GET',
    maxRequests: 105, // Should trigger limit at 100
    delay: 100, // 100ms between requests
  },
  {
    name: 'Auth Rate Limit Test',
    endpoint: '/auth/login',
    method: 'POST',
    body: { email: 'test@test.com', password: 'wrongpassword' },
    maxRequests: 7, // Should trigger limit at 5
    delay: 1000, // 1 second between requests
  },
  {
    name: 'Registration Rate Limit Test',
    endpoint: '/users/register',
    method: 'POST',
    body: { 
      name: 'Test User', 
      email: 'test@example.com', 
      password: 'password123',
      role: 'user'
    },
    maxRequests: 5, // Should trigger limit at 3
    delay: 2000, // 2 seconds between requests
  }
];

/**
 * Make a single request to the API
 */
async function makeRequest(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    return {
      status: response.status,
      headers: {
        'rate-limit-limit': response.headers.get('rate-limit-limit'),
        'rate-limit-remaining': response.headers.get('rate-limit-remaining'),
        'rate-limit-reset': response.headers.get('rate-limit-reset'),
        'rate-limit-policy': response.headers.get('rate-limit-policy'),
      },
      data,
    };
  } catch (error) {
    return {
      status: 0,
      error: error.message,
    };
  }
}

/**
 * Delay execution
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Run a single test
 */
async function runTest(test) {
  console.log(`\n🧪 Running: ${test.name}`);
  console.log(`📍 Endpoint: ${test.method} ${test.endpoint}`);
  console.log(`📊 Max Requests: ${test.maxRequests}`);
  console.log(`⏱️  Delay: ${test.delay}ms\n`);

  let rateLimitHit = false;
  let successfulRequests = 0;
  let rateLimitedRequests = 0;

  for (let i = 1; i <= test.maxRequests; i++) {
    console.log(`📤 Request ${i}/${test.maxRequests}: `, end = '');

    const result = await makeRequest(test.endpoint, test.method, test.body);

    if (result.status === 429) {
      console.log(`🚫 RATE LIMITED (${result.status})`);
      rateLimitHit = true;
      rateLimitedRequests++;
    } else if (result.status >= 200 && result.status < 300) {
      console.log(`✅ SUCCESS (${result.status})`);
      successfulRequests++;
      
      // Show rate limit headers if available
      if (result.headers['rate-limit-remaining']) {
        console.log(`   📊 Remaining: ${result.headers['rate-limit-remaining']}/${result.headers['rate-limit-limit']}`);
      }
    } else {
      console.log(`❌ ERROR (${result.status}): ${result.data?.message || result.data?.error || 'Unknown error'}`);
    }

    // Stop test if rate limit is hit
    if (rateLimitHit && i < test.maxRequests) {
      console.log(`\n🛑 Stopping test - Rate limit hit!`);
      console.log(`📈 Results: ${successfulRequests} successful, ${rateLimitedRequests} rate limited`);
      break;
    }

    // Delay between requests
    if (i < test.maxRequests && !rateLimitHit) {
      await delay(test.delay);
    }
  }

  return {
    testName: test.name,
    successfulRequests,
    rateLimitedRequests,
    rateLimitHit,
  };
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('🚀 Starting Rate Limiting Tests');
  console.log('🌐 Base URL:', BASE_URL);
  console.log('⏰ Started at:', new Date().toISOString());

  const results = [];

  for (const test of tests) {
    const result = await runTest(test);
    results.push(result);
    
    // Wait between tests
    console.log('\n⏳ Waiting 5 seconds before next test...\n');
    await delay(5000);
  }

  // Summary
  console.log('\n📊 TEST SUMMARY');
  console.log('=' .repeat(50));
  
  results.forEach(result => {
    console.log(`\n🧪 ${result.testName}:`);
    console.log(`   ✅ Successful: ${result.successfulRequests}`);
    console.log(`   🚫 Rate Limited: ${result.rateLimitedRequests}`);
    console.log(`   🎯 Rate Limit Hit: ${result.rateLimitHit ? 'YES' : 'NO'}`);
  });

  console.log('\n🎉 Rate Limiting Tests Complete!');
  console.log('⏰ Finished at:', new Date().toISOString());
}

/**
 * Check if server is running
 */
async function checkServer() {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    return response.status !== 0;
  } catch (error) {
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Checking if server is running...');
  
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running!');
    console.log('💡 Please start the server with: npm run dev');
    console.log('📍 Server should be running on: http://localhost:8888');
    process.exit(1);
  }

  console.log('✅ Server is running!');
  
  await runAllTests();
}

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Run the tests
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runAllTests, makeRequest, checkServer };
