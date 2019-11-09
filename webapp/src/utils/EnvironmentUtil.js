const EnvironmentUtil = {
  getApiUrl: () => {
    let hostname = window.location.hostname
    if (hostname === 'localhost')
      return 'http://localhost:8080'
    else
      return hostname
  }
};

export default EnvironmentUtil;
