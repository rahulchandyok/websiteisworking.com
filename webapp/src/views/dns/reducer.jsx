let defaultState = {
  dnsRecords: {
    0: {
      ips: '',
      active: '',
      name: 'Mountain View, US '
    },
    // 1: {
    //   ips: '',
    //   name: 'Rio de Janeiro, Brazil'
    // },
    4: {
      ips: '',
      active: '',
      name: 'Lima, Perú'
    },
    2: {
      ips: '',
      active: '',
      name: 'Montreal, Canada'
    },
    17: {
      ips: '',
      active: '',
      name: 'Rajasthan, India'
    },
    13: {
      ips: '',
      active: '',
      name: 'Tokyo, Japan'
    },
    12: {
      ips: '',
      active: '',
      name: 'Beijing, China'
    },
    18: {
      ips: '',
      active: '',
      name: 'Cape Town, South Africa'
    },
    // 6: {
    //   //not correct
    //   ips: '',
    //   id: '',
    //   name: 'Christchurch, New Zealand'
    // },
    8: {
      ips: '',
      active: '',
      name: 'Paris, France'
    },
    19: {
      ips: '',
      active: '',
      name: 'Bursa, Turkey'
    },
    // 9: {
    //   //not correct
    //   ips: '',
    //   id: '',
    //   name: 'Vancouver, Canada'
    // },
    5: {
      ips: '',
      active: '',
      name: 'Buenos Aires, Argentina'
    },
    3: {
      ips: '',
      active: '',
      name: 'San Jose, Costa Rica'
    },
    1: {
      ips: '',
      active: '',
      name: 'Dallas, US '
    },
    14: {
      ips: '',
      active: '',
      name: 'Yogyakarta, Indonesia'
    },
    15: {
      ips: '',
      active: '',
      name: 'Jindabyne, Australia'
    },
    // 16: {
    //   //not correct
    //   ips: '',
    //   id: '',
    //   name: 'Amsterdam, Netherlands'
    // },
    7: {
      ips: '',
      active: '',
      name: 'Madrid, Spain'
    },
    11: {
      ips: '',
      active: '',
      name: 'Moscow, Russia'
    }
  },
  pingResponse: {},
  isDnsRecordsFetched: true
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_DNS_RECORDS': {
      let records = action.payload.records
      let defaultRecords = state.dnsRecords
      let newRecords = {}
      for (let i = 0; i < records.length; i++) {
        let obj = records[i]
        let key = Object.keys(obj)[0]
        let value = obj[key]
        let active
        if (value.length === 0 || value.indexOf('error') !== -1) active = false
        else active = true
        if (key in defaultRecords) {
          let newObj = Object.assign({}, defaultRecords[key], {
            ips: value,
            active: active
          })
          newRecords[key] = newObj
        }
      }
      return { ...state, dnsRecords: newRecords }
    }
    case 'TOGGLE_IS_DNS_RECORDS_FETCHED': {
      let isFetched =
        action.payload !== undefined
          ? action.payload
          : !state.isDnsRecordsFetched
      return { ...state, isDnsRecordsFetched: isFetched }
    }
    case 'CLEAR_DNS_DATA': {
      let { dnsRecords } = state
      let updateDnsRecords = JSON.parse(JSON.stringify(dnsRecords))
      updateDnsRecords.forEach(item => {
        delete item.status
      })
      return { ...state, dnsRecords: updateDnsRecords }
    }
    default:
      return state
  }
}
