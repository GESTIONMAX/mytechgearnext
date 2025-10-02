'use client';

import { createClient } from '@/lib/supabase/client';
import type {
    StorageBucket,
    StorageUploadOptions,
    UploadedImage,
} from '@/types/storage';
import { useState } from 'react';

export const useImageUpload = (bucket: StorageBucket) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressing, setCompressing] = useState(false);

  const uploadImage = async (
    file: File,
    options?: StorageUploadOptions
  ): Promise<UploadedImage | null> => {
    try {
      setUploading(true);
      setCompressing(true);
      setProgress(0);

      const supabase = createClient();

      // Générer le chemin de fichier
      const fileName = options?.generatePath
        ? `${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`
        : `${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;

      // Simuler le progrès d'upload
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      // Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: options?.cacheControl || '3600',
          upsert: options?.upsert || false,
        });

      clearInterval(progressInterval);

      if (error) {
        console.error('Erreur upload:', error);
        return null;
      }

      setProgress(100);

      // Récupérer l'URL publique
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      return {
        url: publicUrl,
        path: data.path,
        name: file.name,
        bucket,
        size: file.size,
        type: file.type,
      };
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      return null;
    } finally {
      setUploading(false);
      setCompressing(false);
      setProgress(0);
    }
  };

  const deleteImage = async (path: string): Promise<boolean> => {
    try {
      const supabase = createClient();
      const { error } = await supabase.storage.from(bucket).remove([path]);

      if (error) {
        console.error('Erreur suppression:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  };

  const uploadMultipleImages = async (
    files: File[],
    options?: StorageUploadOptions
  ): Promise<UploadedImage[]> => {
    const results: UploadedImage[] = [];

    for (const file of files) {
      const result = await uploadImage(file, options);
      if (result) {
        results.push(result);
      }
    }

    return results;
  };

  return {
    uploadImage,
    deleteImage,
    uploadMultipleImages,
    uploading,
    compressing,
    progress,
  };
};
