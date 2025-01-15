import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  try {
    // GET request - fetch signatures
    if (event.httpMethod === 'GET') {
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

    // POST request - add new signature
    if (event.httpMethod === 'POST') {
      const { name, mood } = JSON.parse(event.body);

      // Validate input
      if (!name || !mood) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Name and mood are required' })
        };
      }

      // Sanitize and limit input length
      const sanitizedName = name.slice(0, 30);
      const sanitizedMood = mood.slice(0, 50);

      const { data, error } = await supabase
        .from('signatures')
        .insert([
          {
            name: sanitizedName,
            mood: sanitizedMood
          }
        ])
        .select();

      if (error) throw error;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(data[0])
      };
    }

    // Method not allowed
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