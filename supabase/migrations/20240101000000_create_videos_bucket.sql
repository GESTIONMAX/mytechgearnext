-- Migration pour créer le bucket videos et configurer les permissions

-- Créer le bucket videos s'il n'existe pas
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos',
  'videos',
  true,
  104857600, -- 100MB limit
  ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/quicktime']
)
ON CONFLICT (id) DO NOTHING;

-- Politique pour permettre la lecture publique des vidéos
CREATE POLICY IF NOT EXISTS "Public video access" ON storage.objects
FOR SELECT USING (bucket_id = 'videos');

-- Politique pour permettre l'upload aux utilisateurs authentifiés
CREATE POLICY IF NOT EXISTS "Authenticated users can upload videos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'videos'
  AND auth.role() = 'authenticated'
);

-- Politique pour permettre la mise à jour aux utilisateurs authentifiés
CREATE POLICY IF NOT EXISTS "Authenticated users can update videos" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'videos'
  AND auth.role() = 'authenticated'
);

-- Politique pour permettre la suppression aux utilisateurs authentifiés
CREATE POLICY IF NOT EXISTS "Authenticated users can delete videos" ON storage.objects
FOR DELETE USING (
  bucket_id = 'videos'
  AND auth.role() = 'authenticated'
);