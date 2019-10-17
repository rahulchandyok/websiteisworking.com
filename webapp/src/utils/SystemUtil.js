const SystemUtil = {
  getLocale: () => {
    return Intl.DateTimeFormat().resolvedOptions().locale
  },
  getTimezone: () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}

export default SystemUtil
