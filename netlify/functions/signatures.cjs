const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Set CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Fetch signatures
      const { data, error } = await supabase
        .from('signatures')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    if (event.httpMethod === 'POST') {
      const { message } = JSON.parse(event.body);

      // Validate input
      if (!message || message.length > 100) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid message' })
        };
      }

      // Add signature
      const { data, error } = await supabase
        .from('signatures')
        .insert([{ message }])
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 