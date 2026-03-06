INSERT INTO storage.buckets (id, name, public) VALUES ('search-images', 'search-images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Search images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'search-images');

CREATE POLICY "Anyone can upload search images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'search-images');

CREATE POLICY "Anyone can delete search images" ON storage.objects FOR DELETE USING (bucket_id = 'search-images');