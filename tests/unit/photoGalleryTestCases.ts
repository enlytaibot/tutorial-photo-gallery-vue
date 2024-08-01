import { describe, it, expect } from 'jest';
import { mount } from '@vue/test-utils';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { photos, takePhoto, deletePhoto } from '@/composables/usePhotoGallery';

describe('usePhotoGallery', () => {
  it('should initialize photos array', () => {
    const { photos } = usePhotoGallery();
    expect(photos.value).toEqual([]);
  });

  it('takes a photo and adds to photos array', async () => {
    const { takePhoto, photos } = usePhotoGallery();
    await takePhoto();
    expect(photos.value.length).toBeGreaterThan(0);
  });

  it('deletes a photo from the photos array', async () => {
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    await takePhoto();
    const initialCount = photos.value.length;
    await deletePhoto(photos.value[0]);
    expect(photos.value.length).toBeLessThan(initialCount);
  });
});