export const SLIDER_CONFIG = {
  totalSlidesQty: 7,
  centerSlideIndex: 3,
  default: {
    visibleSlidesQty: 5,
    shiftPrimary: -1,
    shiftPrev: 0,
    shiftNext: -2,
  },
  small: {
    visibleSlidesQty: 3,
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
