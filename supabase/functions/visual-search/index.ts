const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    const SERPAPI_KEY = Deno.env.get('SERPAPI_KEY');

    if (!SERPAPI_KEY) {
      return new Response(
        JSON.stringify({ error: 'SERPAPI_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use Google Lens via SerpAPI with the base64 image URL
    const params = new URLSearchParams({
      engine: 'google_lens',
      url: image,
      api_key: SERPAPI_KEY,
    });

    const response = await fetch(`https://serpapi.com/search.json?${params}`);
    const data = await response.json();

    // Parse visual matches into our product format
    const results = (data.visual_matches || []).slice(0, 8).map((item: any) => ({
      title: item.title || 'Untitled Product',
      price: item.price?.extracted_value ? `$${item.price.extracted_value}` : (item.price?.value || 'Price N/A'),
      source: item.source || 'Unknown',
      thumbnail: item.thumbnail || '',
      link: item.link || '#',
    }));

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Search error:', error);
    return new Response(
      JSON.stringify({ error: 'Search failed', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
