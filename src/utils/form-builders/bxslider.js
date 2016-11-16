const builder = [
  {
    name: 'mode',
    label: 'Mode',
    default: 'horizontal',
    inputType: 'select',
    options: [
      { value: 'horizontal', label: 'Horizontal' },
      { value: 'vertical', label: 'Vertical' }
    ],
    group: 'General'
  },
  {
    name: 'speed',
    label: 'Speed',
    default: 500,
    inputType: 'number',
    group: 'General'
  },
  {
    name: 'slideMargin',
    label: 'Slide Margin',
    default: 0,
    inputType: 'number',
    group: 'General'
  },
  {
    name: 'startSlide',
    label: 'Start Slide',
    default: 0,
    inputType: 'number',
    group: 'General'
  },
  {
    name: 'randomStart',
    label: 'Random Start',
    default: false,
    inputType: 'checkbox',
    group: 'General'
  },
  {
    name: 'pager',
    label: 'Pager',
    default: true,
    inputType: 'checkbox',
    group: 'Pager'
  },
  {
    name: 'pagerType',
    label: 'Pager Type',
    inputType: 'select',
    options: [
      { value: 'full', label: 'Full' },
      { value: 'short', label: 'Short' }
    ],
    group: 'Pager'
  }
]

export default builder;

// const settings = {
//   mode: 'horizontal',
//   speed: '765',
//   slideMargin: '0',
//   startSlide: '0',
//   randomStart: false,
//   infiniteLoop: true,
//   hideControlOnEnd: false,
//   ticker: false,
//   tickerHover: false,
//   adaptiveHeight: false,
//   adaptiveHeightSpeed: 500,
//   video: false,
//   responsive: true,
//   useCSS: true,
//   preloadImages: 'visible',
//   touchEnabled: true,
//   swipeThreshold: 50,
//   oneToOneTouch: true,
//   preventDefaultSwipeX: true,
//   preventDefaultSwipeY: false
// }
