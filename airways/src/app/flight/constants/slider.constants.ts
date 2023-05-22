export const SLIDER_CONFIG = {
  default: {
    totalSlidesQty: 7,
    visibleSlidesQty: 5,
    centerSlideIndex: 3,
    shiftPrimary: -1,
    shiftPrev: 0,
    shiftNext: -2,
  },
  small: {
    totalSlidesQty: 7,
    visibleSlidesQty: 3,
    centerSlideIndex: 3,
    shiftPrimary: -2,
    shiftPrev: -1,
    shiftNext: -3,
  },
};

export enum SliderAnimationEnum {
  Trigger = 'moveSlider',
  PrimaryState = 'primary',
  PrevState = 'prev',
  NextState = 'next',
}
