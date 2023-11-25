let videoEl;

function waitForElementToDisplay(selector, interval, callback) {
	// console.log('Waiting for ads');
  setTimeout(function check() {
		// console.log('Looking for', selector);
    const element = document.querySelector(selector);

    if (element) {
			// console.log('Found an ad container, muting');
			const volume = videoEl.volume;
			videoEl.volume = 0;
      callback(volume);
    } else {
			// console.log('Rechecking...');
      setTimeout(check, interval);
    }
  }, interval);
}

function skip(volume) {
  const button = document.querySelector('.ytp-ad-skip-button-modern.ytp-button');

  if (button) {
		// console.log('Found the skip button, clicking & restoring volume');
    button.click();
		videoEl.volume = volume;
		initialize();
  } else {
		// console.log('Waiting for unskippable ad to finish then unmuting');
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
	// console.log('Initializing...');
	videoEl = document.querySelector('.video-stream.html5-main-video');
	waitForElementToDisplay('.ytp-ad-player-overlay-skip-or-preview', 100, skip);
}

initialize();
