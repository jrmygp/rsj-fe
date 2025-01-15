export const DataSideBar = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Reff',
      url: '',
      items: [],
      ref: '',
    },
    {
      title: 'Quotation',
      url: '/radix-logistics/quotation',
      items: [],
      ref: 'quotation',
    },
    {
      title: 'Booking Confirmation',
      url: '',
      items: [],
      ref: '',
    },
    {
      title: 'Invoice',
      url: '',
      items: [
        {
          title: 'Import',
          url: '/radix-logistics/invoice/import',
          ref: 'import',
        },
        {
          title: 'Export',
          url: '/radix-logistics/invoice/export',
          ref: 'export',
        },
        {
          title: 'Door to Door',
          url: '/radix-logistics/invoice/door-to-door',
          ref: 'door-to-door',
        },
      ],
      ref: 'invoice',
    },
    {
      title: 'Document',
      url: '',
      items: [
        {
          title: 'Link 1',
          url: '',
        },
        {
          title: 'Link 2',
          url: '',
        },
      ],
      ref: 'document',
    },
    {
      title: 'Master',
      url: '',
      items: [
        {
          title: 'Customer',
          url: '/radix-logistics/master-data/customer',
          ref: 'customer',
        },
        {
          title: 'Port',
          url: '/radix-logistics/master-data/port',
          ref: 'port',
        },
        {
          title: 'Cost Charge',
          url: '/radix-logistics/master-data/cost-charge',
          ref: 'cost-charge',
        },
        {
          title: 'Shipper',
          url: '/radix-logistics/master-data/shipper',
          ref: 'shipper',
        },
      ],
      ref: 'master-data',
    },
    {
      title: 'Data User',
      url: '/radix-logistics/user',
      items: [],
      ref: 'user',
    },
    {
      title: 'Logout',
      url: '',
      items: [],
      ref: '',
    },
  ],
};
