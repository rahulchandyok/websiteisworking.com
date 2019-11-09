import moment from 'moment'

const DateUtil = {
  getLocalDate: seconds => {
    return seconds ? new Date(seconds) : new Date()
  },
  formatDate: seconds => {
    return moment(seconds).format('DDt[h] MMM YYYY')
  },
  formatDay: seconds => {
    return moment(seconds).format('ddd')
  },
  formatTime: seconds => {
    return moment(seconds).format('LT')
  }
}

export default DateUtil
