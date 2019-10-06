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
let homePage = `
      <div class="header">
        <a href="https://www.websiteisworking.com/" title="check your website is working or not" class="logo"> <img
            alt="logo" src="images/logo.png" /></a>
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
let error = `
<a href="https://www.websiteisworking.com/"  class="back-to-home">Go back to home</a>
<div class="background">
<div class="ground"></div>

</div>
<div class="error-container">
<div class="left-section">
  <div class="inner-content">
    <h1 class="heading">404</h1>
    <p class="subheading">Looks like the page you were looking for is no longer here.</p>
  </div>
</div>
<div class="right-section">
  <svg class="svgimg" xmlns="http://www.w3.org/2000/svg" viewBox="51.5 -15.288 385 505.565">
      <g class="bench-legs">
        <path d="M202.778,391.666h11.111v98.611h-11.111V391.666z M370.833,390.277h11.111v100h-11.111V390.277z M183.333,456.944h11.111
        v33.333h-11.111V456.944z M393.056,456.944h11.111v33.333h-11.111V456.944z" />
      </g>
      <g class="top-bench">
        <path d="M396.527,397.917c0,1.534-1.243,2.777-2.777,2.777H190.972c-1.534,0-2.778-1.243-2.778-2.777v-8.333
        c0-1.535,1.244-2.778,2.778-2.778H393.75c1.534,0,2.777,1.243,2.777,2.778V397.917z M400.694,414.583
        c0,1.534-1.243,2.778-2.777,2.778H188.194c-1.534,0-2.778-1.244-2.778-2.778v-8.333c0-1.534,1.244-2.777,2.778-2.777h209.723
        c1.534,0,2.777,1.243,2.777,2.777V414.583z M403.473,431.25c0,1.534-1.244,2.777-2.778,2.777H184.028
        c-1.534,0-2.778-1.243-2.778-2.777v-8.333c0-1.534,1.244-2.778,2.778-2.778h216.667c1.534,0,2.778,1.244,2.778,2.778V431.25z"
        />
      </g>
      <g class="bottom-bench">
        <path d="M417.361,459.027c0,0.769-1.244,1.39-2.778,1.39H170.139c-1.533,0-2.777-0.621-2.777-1.39v-4.86
        c0-0.769,1.244-0.694,2.777-0.694h244.444c1.534,0,2.778-0.074,2.778,0.694V459.027z" />
        <path d="M185.417,443.75H400c0,0,18.143,9.721,17.361,10.417l-250-0.696C167.303,451.65,185.417,443.75,185.417,443.75z" />
      </g>
      <g id="lamp">
        <path class="lamp-details" d="M125.694,421.997c0,1.257-0.73,3.697-1.633,3.697H113.44c-0.903,0-1.633-2.44-1.633-3.697V84.917
        c0-1.257,0.73-2.278,1.633-2.278h10.621c0.903,0,1.633,1.02,1.633,2.278V421.997z"
        />
        <path class="lamp-accent" d="M128.472,93.75c0,1.534-1.244,2.778-2.778,2.778h-13.889c-1.534,0-2.778-1.244-2.778-2.778V79.861
        c0-1.534,1.244-2.778,2.778-2.778h13.889c1.534,0,2.778,1.244,2.778,2.778V93.75z" />
        
        <circle class="lamp-light" cx="119.676" cy="44.22" r="40.51" />
        <path class="lamp-details" d="M149.306,71.528c0,3.242-13.37,13.889-29.861,13.889S89.583,75.232,89.583,71.528c0-4.166,13.369-13.889,29.861-13.889
        S149.306,67.362,149.306,71.528z"/>
        <radialGradient class="light-gradient" id="SVGID_1_" cx="119.676" cy="44.22" r="65" gradientUnits="userSpaceOnUse">
          <stop  offset="0%" style="stop-color:#FFFFFF; stop-opacity: 1"/>
          <stop  offset="50%" style="stop-color:#EDEDED; stop-opacity: 0.5">
            <animate attributeName="stop-opacity" values="0.0; 0.5; 0.0" dur="5000ms" repeatCount="indefinite"></animate>
          </stop>
          <stop  offset="100%" style="stop-color:#EDEDED; stop-opacity: 0"/>
        </radialGradient>
        <circle class="lamp-light__glow" fill="url(#SVGID_1_)" cx="119.676" cy="44.22" r="65"/>
        <path class="lamp-bottom" d="M135.417,487.781c0,1.378-1.244,2.496-2.778,2.496H106.25c-1.534,0-2.778-1.118-2.778-2.496v-74.869
        c0-1.378,1.244-2.495,2.778-2.495h26.389c1.534,0,2.778,1.117,2.778,2.495V487.781z" />
      </g>
    </svg>
</div>
</div>`,
  privacy = `<link rel="import" href="view/privacy.html">`;
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
