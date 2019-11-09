const EnvironmentUtil = {
  getApiUrl: () => {
    let hostname = window.location.hostname
    if (hostname === 'localhost')
      return 'http://localhost:8080'
    else
      return 'http://69.87.223.249:8080'
  }
};

export default EnvironmentUtil;
