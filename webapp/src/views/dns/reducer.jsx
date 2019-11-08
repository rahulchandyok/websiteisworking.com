let defaultState = {
  dnsRecords: [
    {
      ips: '',
      ips_with_link: '',
      latitude: '38',
      longitude: '-122',
      name: 'Holtsville NY, United States',
      provider: ' Opendns',
      country: 'us'
    },
    // {
    //   ips: '',
    //   ips_with_link: '',
    //   latitude: '39',
    //   longitude: '-77',
    //   name: 'Canoga Park, CA, United States',
    //   provider: ' Sprint',
    //   country: 'us'
    // },
    // {
    //   ips: '',
    //   ips_with_link: '',
    //   latitude: '41',
    //   longitude: '-73',
    //   name: 'Holtsville NY, United States',
    //   provider: ' Opendns',
    //   country: 'us'
    // },
    // {
    //   ips: '',
    //   ips_with_link: '',
    //   latitude: '37',
    //   longitude: '-122',
    //   name: 'Mountain View CA, United States',
    //   provider: ' Google',
    //   country: 'us'
    // },
    // {
    //   ips: '',
    //   ips_with_link: '',
    //   latitude: '41',
    //   longitude: '-74',
    //   name: 'New York, United States',
    //   provider: 'Columbia University',
    //   country: 'us'
    // },
    {
      ips: '',
      ips_with_link: '',
      latitude: '44',
      longitude: '-80',
      name: 'Barrie, Canada',
      provider: 'Rogers Comm',
      country: 'ca'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '57',
      longitude: '61',
      name: 'Yekaterinburg, Russian Federation',
      provider: ' Skydns',
      country: 'ru'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '-26',
      longitude: '29',
      name: 'Cullinan, South Africa',
      provider: 'Liquid Telecommunications Ltd',
      country: 'za'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '53',
      longitude: '6',
      name: 'Dalfsen, Netherlands',
      provider: 'Plinq Bv',
      country: 'nl'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '49',
      longitude: '2',
      name: 'Argenteuil, France',
      provider: 'Renater',
      country: 'fr'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '40',
      longitude: '-4',
      name: 'Madrid, Spain',
      provider: 'Telefonica de Espana',
      country: 'es'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '47',
      longitude: '10',
      name: 'Zizers, Switzerland',
      provider: 'Oskar Emmenegger',
      country: 'ch'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '47',
      longitude: '10',
      name: 'Schwarzach, Austria',
      provider: 'Russmedia IT GmbH',
      country: 'at'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '52',
      longitude: '-2',
      name: 'Gloucester, United Kingdom',
      provider: 'Fasthosts Internet',
      country: 'gb'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '56',
      longitude: '10',
      name: 'Midtjylland, Denmark',
      provider: ' NM NET APS',
      country: 'dk'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '51',
      longitude: '9',
      name: 'Germany',
      provider: '.NET Foundation',
      country: 'de'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '26',
      longitude: '-100',
      name: 'Monterrey, Mexico',
      provider: 'Marcatel Com',
      country: 'mx'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '-23',
      longitude: '-43',
      name: 'Barra da Tijuca, Brazil',
      provider: 'Mundivox LTDA',
      country: 'br'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '3',
      longitude: '102',
      name: 'Subang Jaya, Malaysia',
      provider: 'HeiTech Padu Bhd',
      country: 'my'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '-38',
      longitude: '145',
      name: 'Research, Australia',
      provider: 'Cloudflare Inc',
      country: 'au'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '1',
      longitude: '104',
      name: 'Singapore',
      provider: 'Ntt Singapore Pte',
      country: 'sg'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '23',
      longitude: '114',
      name: 'Shenzhen, China',
      provider: 'Shenzhen Sunrise Technology Co.',
      country: 'cn'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '37',
      longitude: '31',
      name: 'Antalya, Turkey',
      provider: 'Teknet Yazlim',
      country: 'tr'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '28',
      longitude: '75',
      name: 'Udaipur, India',
      provider: 'Net4U Technology',
      country: 'in'
    },
    {
      ips: '',
      ips_with_link: '',
      latitude: '34',
      longitude: '73',
      name: 'Islamabad, Pakistan',
      provider: ' PERN',
      country: 'pk'
    }
  ],
  pingResponse: {},
  isDnsRecordsFetched: true
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DNS_RECORDS': {
      return { ...state, dnsRecords: action.payload.records };
    }
    case 'TOGGLE_IS_DNS_RECORDS_FETCHED': {
      let isFetched =
        action.payload !== undefined
          ? action.payload
          : !state.isDnsRecordsFetched;
      return { ...state, isDnsRecordsFetched: isFetched };
    }
    case 'CLEAR_DNS_DATA': {
      let { dnsRecords } = state;
      let updateDnsRecords = JSON.parse(JSON.stringify(dnsRecords));
      updateDnsRecords.forEach(item => {
        delete item.status;
      });
      return { ...state, dnsRecords: updateDnsRecords };
    }
    default:
      return state;
  }
};
