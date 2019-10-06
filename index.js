function getResponse(e) {
  let website = document.getElementById('domain').value;
  if (!website) return;

  fetchHistory(website);

  document.getElementById('loader').style.display = 'block';
  document.getElementById('response').style.display = 'none';
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
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
          <img alt="icon" class="working-icon" src="images/working_icon.png" />
          </div>`;
      } else if (response['isDown'] === true && response['statusText'] === '') {
        document.getElementById(
          'response'
        ).innerHTML = `<div class="res-container" id="error">
          <div id="website-error">${response['returnedUrl']}</div>
          <div class="white-cls">is not working!</div>
          <img alt="icon" class="error-icon" src="images/not_working_icon.png" />
          </div>`;
      } else {
        document.getElementById(
          'response'
        ).innerHTML = `<div class="res-container" id="error">
          <div id="website-error">Uh oh! There was an error:</div>
          <div class="white-cls">It doesn't look like you entered a valid domain or service name.</div>
          <img alt="icon" class="error-icon" src="images/not_working_icon.png" />
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
let homePage = `<div class="header">
<a href="https://www.websiteisworking.com/" title="check your website is working or not" class="logo"> <img alt="logo"
    src="images/logo.png" /></a>
<h4>Check your website is working globally or not?</h4>
</div>
<div class="container" id="container">
<div class="main-content">
  <div class="is-hidden-mobile large-pad"></div>
  <section>
    <div class="columns">
      <div class="box">
        <nav class="level">
          <div class="label"> Check your website is working or not ? </div>
          <div class="level-item">
            <input id="domain" placeholder="google.com" id="first_name" type="text" class="validate">
            <!-- <input id="domain" type="text" placeholder="google.com" autocapitalize="off" spellcheck="false"
                    autocorrect="off" autocomplete="off" value="" class="input is-medium is-focused" /> -->
            <button type="submit" class="button is-link is-medium" onclick="getResponse()">ping
            </button>
          </div>
        </nav>
      </div>
      <div id="loader">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="response">
      </div>
    </div>
  </section>
  <div class="content-info">
    <a href="https://www.websiteisworking.com/" title="check your website is working or not">
      <strong>USEFUL TIPS</strong>
    </a>
    <br>
    <ul class="list-item">
      <li>
        <strong>Clear your browser's cache:</strong> If your browser can not load a page, first clear the
        browser's cache
        and reload the page directly from the server (ctrl+f5).</li>
      <li>
        <strong>Disable security software:</strong> Failed page loads can be caused by anti-virus and firewall
        software as
        well. Disable them to make sure they don't block pages.</li>
      <li>
        <strong>There are other browsers:</strong> Try browsing with opera, firefox or chrome. You could also
        check the page
        from another computer and network.</li>
      <li>
        <strong>Restart computer:</strong> Remember that sometimes the most obvious solution is the best
        solution. Simply
        restart your computer and see what happens.</li>
    </ul>
    <div class="copyright" style="text-align: center; color: #a29c9c;">
      © 2019
      <a href="https://www.websiteisworking.com/"
        title="check your website is working or not">websiteisworking.com</a>
      | <span onclick="onNavItemClick()">Privacy Policy</span>
      <p style="margin: 0">Contact:
        <a href="mailto:contact@websiteisworking.com"
          title="check your website is working or not">contact@websiteisworking.com</a>
      </p>
    </div>
  </div>
</div>
<div class="history-container">
  <div class="history">
    <div class="white-cls center-cls font20">Recents</div>
    <div id="recent"></div>
  </div>
  <img alt="icon" class="recents-icon" src="images/recents_icon.png" />
</div>
</div>`;
let error = `<link rel="import" href="views/error.html">`,
  privacy = `<link rel="import" href="views/privacy.html">`;
routes = {
  '/': homePage,
  '/error': error,
  '/privacy': privacy
};

let contentDiv = document.getElementById('_layout');
let path = window.location.pathname;

if (!Object.keys(routes).includes(path)) {
  contentDiv.innerHTML = routes['/error'];
} else {
  contentDiv.innerHTML = routes[path];
}

let onNavItemClick = pathName => {
  if (!pathName) pathName = '/';
  window.history.pushState({}, pathName, window.location.origin + pathName);
  contentDiv.innerHTML = routes[pathName];
};
onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
};
