export default async (request, context) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const orderData = await request.json();

    // Validate required fields
    if (!orderData.customerName || !orderData.customerPhone || !orderData.customerAddress) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Log order (in production, you'd send email or save to database)
    console.log('New Order Received:', JSON.stringify(orderData, null, 2));

    // Here you could integrate with:
    // - Email service (SendGrid, Mailgun)
    // - Database (Supabase, FaunaDB)
    // - SMS service (Twilio)
    // - Slack/Discord webhook for notifications

    return new Response(JSON.stringify({
      success: true,
      message: 'Order received successfully',
      orderId: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
