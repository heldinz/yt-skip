let videoEl;

function waitForElementToDisplay(selector, interval, callback) {
  setTimeout(function check() {
    const element = document.querySelector(selector);

    if (element) {
			const volume = videoEl.volume;
			videoEl.volume = 0;
      callback(volume);
    } else {
      setTimeout(check, interval);
    }
  }, interval);
}

function skip(volume) {
  const button = document.querySelector('.ytp-ad-skip-button-modern.ytp-button');

  if (button) {
    button.click();
		videoEl.volume = volume;
		initialize();
  } else {
		const durationEl = document.querySelector('.ytp-ad-duration-remaining');
		const remaining = durationEl.innerText.split(':');
		const seconds = (remaining[0] * 60) + remaining[1];
		setTimeout(function wait() {
			videoEl.volume = volume;
			initialize();
		}, seconds*1000)
	}
}

function initialize() {
	videoEl = document.querySelector('.video-stream.html5-main-video');
	waitForElementToDisplay('.ytp-ad-player-overlay-skip-or-preview', 100, skip);
}

initialize();
