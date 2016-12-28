import React from 'react';

const steps = [
  {
    step: 1,
    selector: '.button--add-slide',
    title: <div className='tour__title'>1. Add slides</div>,
    body: <div className='tour__body'>This is where you can upload images for the slider.</div>
  },
  {
    step: 2,
    selector: '.slider-layout__tab-link--preview',
    title: <div className='tour__title'>2. Preview the slider</div>,
    body: <div className='tour__body'>After adding slides, click here to see what the slider will look like. Feel free to switch back and forth as you make changes.</div>
  },
  {
    step: 3,
    selector: '.slider-settings__settings-header',
    title: <div className='tour__title'>3. Tweak slider settings</div>,
    body: <div className='tour__body'>Use these settings to change how the slider behaves.</div>,
    position: 'bottom'
  },
  {
    step: 4,
    selector: '.button--get-code',
    title: <div className='tour__title'>4. Finish up here</div>,
    body: <div className='tour__body'>Get the slider code and instructions on how to use it.</div>
  }
]

export default steps;