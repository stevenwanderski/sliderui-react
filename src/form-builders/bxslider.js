export default {
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
      group: 'General',
      required: true,
      validations: {
        isNumeric: true
      }
    },
    {
      name: 'slideMargin',
      label: 'Slide Margin',
      default: 0,
      inputType: 'number',
      required: true,
      group: 'General',
      validations: {
        isNumeric: true
      }
    },
    {
      name: 'startSlide',
      label: 'Start Slide',
      default: 0,
      inputType: 'number',
      required: true,
      group: 'General',
      validations: {
        isNumeric: true
      }
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
      label: 'Start / Stop Controls Enabled',
      default: false,
      inputType: 'checkbox',
      group: 'Controls'
    }
  ]
};
