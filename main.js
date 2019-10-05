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
      document.getElementById('loader').style.display = 'none';
      document.getElementById('response').style.display = 'block';
      if (response['statusCode'] === 200 && response['isDown'] === false) {
        document.getElementById(
          'response'
        ).innerHTML = `<div class="res-container" id="success">
          <div id="website-success">${response['returnedUrl']}</div>
          <div class="white-cls">is working!</div>
          <img class="working-icon" src="images/working_icon.png" />
          </div>`;
      } else if (response['isDown'] === true && response['statusText'] === '') {
        document.getElementById(
          'response'
        ).innerHTML = `<div class="res-container" id="error">
          <div id="website-error">${response['returnedUrl']}</div>
          <div class="white-cls">is not working!</div>
          <img class="error-icon" src="images/not_working_icon.png" />
          </div>`;
      }
      else {
        document.getElementById(
          'response'
        ).innerHTML = `<div class="res-container" id="error">
          <div id="website-error">Uh oh! There was an error:</div>
          <div class="white-cls">It doesn't look like you entered a valid domain or service name.</div>
          <img class="error-icon" src="images/not_working_icon.png" />
          </div>`;
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
