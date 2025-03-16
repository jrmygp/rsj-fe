export const DataSideBar = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Quotation',
      url: '/radix-logistics/quotation',
      items: [],
      ref: 'quotation',
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
      title: 'Shipment',
      url: '/radix-logistics/shipment',
      items: [],
      ref: 'shipment',
    },
    {
      title: 'Document',
      url: '',
      items: [
        {
          title: 'Surat Tugas',
          url: '/radix-logistics/document/surat-tugas',
          ref: 'surat-tugas',
        },
        {
          title: 'Surat Jalan',
          url: '/radix-logistics/document/surat-jalan',
          ref: 'surat-jalan',
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
        {
          title: 'Warehouse',
          url: '/radix-logistics/master-data/warehouse',
          ref: 'warehouse',
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
  ],
};
