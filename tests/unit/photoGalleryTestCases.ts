import { describe, it, expect } from 'jest';
import { mount } from '@vue/test-utils';
import Tab2Page from '@/views/Tab2Page.vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('Tab2Page.vue', () => {
  it('renders photo gallery and triggers actions correctly', async () => {
    const wrapper = mount(Tab2Page, {
      global: {
        plugins: [usePhotoGallery]
      }
    });

    // Check if the component is rendered
    expect(wrapper.find('ion-page').exists()).toBeTruthy();

    // Simulate take photo action
    await wrapper.vm.takePhoto();
    expect(wrapper.vm.photos.length).toBeGreaterThan(0);

    // Simulate delete photo action
    const initialPhotoCount = wrapper.vm.photos.length;
    await wrapper.vm.deletePhoto(wrapper.vm.photos[0]);
    expect(wrapper.vm.photos.length).toBeLessThan(initialPhotoCount);
  });
});