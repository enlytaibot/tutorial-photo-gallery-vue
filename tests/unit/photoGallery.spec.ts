import { describe, it, expect } from 'vitest';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('usePhotoGallery', () => {
  it('loads saved photos on mounted', async () => {
    // Mock the Preferences.get to return a list of photos
    // Test if photos.value is populated correctly after loadSaved is called
  });

  it('takes a photo and adds it to the photos array', async () => {
    // Mock the Camera.getPhoto to return a mock photo object
    // Test if takePhoto adds a new photo to the photos array
  });

  it('deletes a photo from the photos array', async () => {
    // Add a mock photo to the photos array
    // Call deletePhoto with the mock photo
    // Test if the photo was removed from the photos array
  });
});