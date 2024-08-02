import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('usePhotoGallery', () => {
  it('should initialize photos array', () => {
    const { photos } = usePhotoGallery();
    expect(photos.value).toEqual([]);
  });

  it('should take a photo and add to photos array', async () => {
    const { takePhoto, photos } = usePhotoGallery();
    await takePhoto();
    expect(photos.value.length).toBeGreaterThan(0);
  });

  it('should delete a photo from the photos array', async () => {
    const { takePhoto, deletePhoto, photos } = usePhotoGallery();
    await takePhoto(); // Add a photo first
    const photoToDelete = photos.value[0];
    await deletePhoto(photoToDelete);
    expect(photos.value).toEqual([]);
  });
});