import { describe, it, expect } from 'jest';
import { mount } from '@vue/test-utils';
import Tab2Page from '@/views/Tab2Page.vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('Tab2Page.vue', () => {
  it('displays photos from usePhotoGallery', () => {
    const { photos } = usePhotoGallery();
    const wrapper = mount(Tab2Page);
    expect(wrapper.findAll('ion-img').length).toBe(photos.value.length);
  });

  it('calls takePhoto on fab button click', async () => {
    const { takePhoto } = usePhotoGallery();
    const wrapper = mount(Tab2Page);
    const fabButton = wrapper.find('ion-fab-button');
    await fabButton.trigger('click');
    expect(takePhoto).toHaveBeenCalled();
  });

  it('shows action sheet on photo click', async () => {
    const { photos } = usePhotoGallery();
    const wrapper = mount(Tab2Page);
    const photo = photos.value[0];
    const img = wrapper.find(`ion-img[src="${photo.webviewPath}"]`);
    await img.trigger('click');
    expect(actionSheetController.create).toHaveBeenCalled();
  });
});