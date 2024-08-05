import { describe, it, expect } from 'jest';
import { mount } from '@vue/test-utils';
import Tab2Page from '@/views/Tab2Page.vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('Tab2Page.vue', () => {
  it('displays photos', () => {
    const wrapper = mount(Tab2Page);
    expect(wrapper.findAll('ion-col').length).toBe(usePhotoGallery().photos.length);
  });

  it('takes a new photo', async () => {
    const { takePhoto, photos } = usePhotoGallery();
    await takePhoto();
    expect(photos.value.length).toBeGreaterThan(0);
  });

  it('deletes a photo', async () => {
    const { deletePhoto, photos } = usePhotoGallery();
    const initialLength = photos.value.length;
    await deletePhoto(photos.value[0]);
    expect(photos.value.length).toBeLessThan(initialLength);
  });
});