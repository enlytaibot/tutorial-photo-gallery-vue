import { describe, it, expect } from 'jest';
import { shallowMount } from '@vue/test-utils';
import Tab2Page from '@/views/Tab2Page.vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

describe('Tab2Page.vue', () => {
  it('should display the correct photo gallery title', () => {
    const wrapper = shallowMount(Tab2Page);
    const title = wrapper.find('ion-title');
    expect(title.text()).toBe('Photo Gallery');
  });

  it('should trigger photo taking when fab button is clicked', async () => {
    const { takePhoto } = usePhotoGallery();
    const takePhotoSpy = jest.spyOn({ takePhoto }, 'takePhoto');
    const wrapper = shallowMount(Tab2Page);
    const fabButton = wrapper.find('ion-fab-button');
    await fabButton.trigger('click');
    expect(takePhotoSpy).toHaveBeenCalled();
  });
});