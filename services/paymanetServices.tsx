export const processPayment = async (amount, currency) => {
  try {
    const response = await fetch('https://api.payment.com/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency }),
    });

    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      // Handle non-2xx HTTP status codes
      const errorData = await response.json();
      throw new Error(`Payment failed: ${errorData.message || 'Unknown error'}`);
    }

    // Parse and return the successful response data
    return await response.json();
  } catch (error) {
    // Handle network errors, response errors, or unexpected issues
    console.error('Payment processing failed:', error);
    throw new Error(`Payment processing failed: ${error.message || 'Unknown error'}`);
  }
};


