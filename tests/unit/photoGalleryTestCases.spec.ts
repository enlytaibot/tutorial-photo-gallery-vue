import { describe, it, expect } from 'vitest';
import { photos, takePhoto, deletePhoto } from '@/composables/usePhotoGallery';

describe('Photo Gallery Composables', () => {
  it('should initialize photos array as empty', () => {
    expect(photos.value).toEqual([]);
  });

  it('should add a photo when takePhoto is called', async () => {
    await takePhoto();
    expect(photos.value.length).toBeGreaterThan(0);
  });

  it('should remove a photo when deletePhoto is called', async () => {
    const initialLength = photos.value.length;
    await deletePhoto(photos.value[0]);
    expect(photos.value.length).toBeLessThan(initialLength);
  });
});