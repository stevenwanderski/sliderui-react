const formBuilder = {
  fields: [
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
      default: 'full',
      options: [
        { value: 'full', label: 'Full' },
        { value: 'short', label: 'Short' }
      ],
      group: 'Pager'
    },
    {
      name: 'controls',
      label: 'Controls Enabled',
      default: true,
      inputType: 'checkbox',
      group: 'Controls'
    },
    {
      name: 'autoControls',
      label: 'Start / Sttop Controls Enabled',
      default: false,
      inputType: 'checkbox',
      group: 'Controls'
    }
  ],
  validations: {
    speed: null
  }
};

function formDefaults() {
  let obj = {};
  formBuilder.fields.forEach((item) => {
    obj[item.name] = item.default;
  });
  return obj;
}

export { formBuilder, formDefaults };
