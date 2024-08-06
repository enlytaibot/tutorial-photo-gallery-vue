import { describe, it, expect } from 'vitest';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

describe('usePhotoGallery', () => {
  it('loads saved photos on mounted', async () => {
    // Mock the Preferences.get method
    const mockGet = vi.fn(() => Promise.resolve({ value: JSON.stringify([{ filepath: 'path/to/photo.jpg', webviewPath: 'path/to/photo.jpg' }]) }));
    vi.mock('@capacitor/preferences', () => ({
      Preferences: {
        get: mockGet,
      },
    }));

    const { photos } = usePhotoGallery();
    expect(photos.value).toHaveLength(1);
    expect(photos.value[0].filepath).toBe('path/to/photo.jpg');
  });

  it('saves a new photo', async () => {
    // Mock the Camera.getPhoto method
    const mockGetPhoto = vi.fn(() => Promise.resolve({ path: 'path/to/new/photo.jpg', webPath: 'path/to/new/photo.jpg' }));
    vi.mock('@capacitor/camera', () => ({
      Camera: {
        getPhoto: mockGetPhoto,
      },
    }));

    // Mock the Filesystem.writeFile method
    const mockWriteFile = vi.fn(() => Promise.resolve({ uri: 'file:///path/to/new/photo.jpg' }));
    vi.mock('@capacitor/filesystem', () => ({
      Filesystem: {
        writeFile: mockWriteFile,
      },
    }));

    const { takePhoto, photos } = usePhotoGallery();
    await takePhoto();
    expect(photos.value).toHaveLength(1);
    expect(photos.value[0].filepath).toBe('file:///path/to/new/photo.jpg');
  });

  it('deletes a photo', async () => {
    // Initial photo list
    const photos = ref([{ filepath: 'file:///path/to/photo.jpg', webviewPath: 'path/to/photo.jpg' }]);

    // Mock the Filesystem.deleteFile method
    const mockDeleteFile = vi.fn(() => Promise.resolve());
    vi.mock('@capacitor/filesystem', () => ({
      Filesystem: {
        deleteFile: mockDeleteFile,
      },
    }));

    const { deletePhoto } = usePhotoGallery();
    await deletePhoto(photos.value[0]);
    expect(photos.value).toHaveLength(0);
  });
});