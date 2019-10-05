function getResponse(e) {
  let website = document.getElementById('domain').value;
  if (!website) return;

  fetchHistory(website);

  document.getElementById('loader').style.display = 'block';
  document.getElementById('response').style.display = 'none';
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      console.log(response);
      document.getElementById('loader').style.display = 'none';
      document.getElementById('response').style.display = 'block';
      if (response['statusCode'] === 200 && response['isDown'] === false) {
        document.getElementById('website-success').innerHTML =
          response['returnedUrl'];
        document.getElementById('success').style.display = 'block';
        document.getElementById('error').style.display = 'none';
      } else if (response['isDown'] === true && response['statusText'] === '') {
        document.getElementById('website-error').innerHTML =
          response['returnedUrl'];
        document.getElementById('error-reason').innerHTML =
          'is not working!';
        document.getElementById('success').style.display = 'none';
        document.getElementById('error').style.display = 'block';
      }
      else {
        document.getElementById('website-error').innerHTML =
          "Uh oh! There was an error:";
        document.getElementById('error-reason').innerHTML =
          "It doesn't look like you entered a valid domain or service name.";
        document.getElementById('success').style.display = 'none';
        document.getElementById('error').style.display = 'block';
      }
    }
  };
  xhttp.open('GET', 'https://api.downfor.cloud/httpcheck/' + website, true);
  xhttp.send();
}
function fetchHistory(website) {
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches'));
  if (!recentSearches) recentSearches = '';
  if (website)
    recentSearches =
      `<div class="recent-searches">${website}</div>` + recentSearches;
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  document.getElementById('recent').innerHTML = recentSearches;
}
