import { describe, it, expect } from 'jest';
import { mount } from '@vue/test-utils';
import Tab2Page from '@/views/Tab2Page.vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('Tab2Page.vue', () => {
  it('renders photo gallery', () => {
    const wrapper = mount(Tab2Page, {
      global: {
        plugins: [usePhotoGallery]
      }
    });
    expect(wrapper.text()).toContain('Photo Gallery');
  });

  it('takes a photo', async () => {
    const { takePhoto } = usePhotoGallery();
    const photo = await takePhoto();
    expect(photo).toBeDefined();
  });

  it('deletes a photo', async () => {
    const { deletePhoto, photos } = usePhotoGallery();
    const initialLength = photos.value.length;
    await deletePhoto(photos.value[0]);
    expect(photos.value.length).toBeLessThan(initialLength);
  });
});