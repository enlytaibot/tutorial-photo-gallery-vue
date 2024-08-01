import { describe, it, expect } from 'jest';
import { mount } from '@vue/test-utils';
import Tab2Page from '@/views/Tab2Page.vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('Tab2Page.vue', () => {
  it('displays photos from usePhotoGallery', () => {
    const wrapper = mount(Tab2Page, {
      global: {
        plugins: [usePhotoGallery]
      }
    });
    expect(wrapper.findAll('ion-img').length).toEqual(wrapper.vm.photos.length);
  });

  it('can take a photo', async () => {
    const { takePhoto } = usePhotoGallery();
    await takePhoto();
    expect(usePhotoGallery().photos.length).toBeGreaterThan(0);
  });

  it('can delete a photo', async () => {
    const { photos, deletePhoto } = usePhotoGallery();
    const initialLength = photos.length;
    await deletePhoto(photos[0]);
    expect(photos.length).toBeLessThan(initialLength);
  });
});