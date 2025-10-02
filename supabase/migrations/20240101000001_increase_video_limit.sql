-- Migration pour augmenter la limite de taille des vidéos

-- Mettre à jour la limite du bucket videos à 500MB
UPDATE storage.buckets
SET file_size_limit = 524288000  -- 500MB en bytes
WHERE id = 'videos';