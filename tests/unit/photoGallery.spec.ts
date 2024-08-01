import { describe, it, expect } from 'vitest';
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

  it('calls takePhoto when camera fab button is clicked', async () => {
    const wrapper = mount(Tab2Page, {
      global: {
        plugins: [usePhotoGallery]
      }
    });
    await wrapper.find('ion-fab-button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('takePhoto');
  });

  it('calls deletePhoto when delete action is selected', async () => {
    const wrapper = mount(Tab2Page, {
      global: {
        plugins: [usePhotoGallery]
      }
    });
    const photo = wrapper.vm.photos[0];
    await wrapper.vm.showActionSheet(photo);
    expect(wrapper.emitted()).toHaveProperty('deletePhoto');
  });
});