document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Shaka Player
  shaka.polyfill.installAll();

  if (shaka.Player.isBrowserSupported()) {
    // Create a Player instance
    const player = new shaka.Player(document.getElementById('video'));

    // Attach event handlers
    player.addEventListener('error', onErrorEvent);

    // Load the MPD file
    player.load('https://drmlive.in/sports/Astro/default.mpd').then(function() {
      console.log('The video has been loaded!');
    }).catch(onError);

    // Configure player settings
    player.configure({
      drm: {
        clearKeys: {
          '03c2e0af2f8159f9f0ce9b5dbc865f10': 'cd84ed136b0cc71f8ab8cd4d4f6a2e4c'
        }
      },
      seekBarColors: {
        base: 'rgba(255,255,255,.2)',
        buffered: 'rgba(255,255,255,.4)',
        played: 'rgb(255,0,0)'
      }
    });
  } else {
    console.error('Browser not supported!');
  }

  // Handle errors
  function onErrorEvent(event) {
    console.error('Error code', event.detail);
  }

  function onError(error) {
    console.error('Error loading video:', error);
  }
});
