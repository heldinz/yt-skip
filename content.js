const DEBUG = false;
const INTERVAL = 50;

const durationSelector = '.ytp-ad-duration-remaining';
const muteBtnSelector = '.ytp-mute-button.ytp-button';
const muteBtnToolTipAttr = 'data-title-no-tooltip';
const overlaySelector = '.ytp-ad-player-overlay-skip-or-preview';
const skipBtnSelector = '.ytp-ad-skip-button-modern.ytp-button';
const videoSelector = '.video-stream.html5-main-video';

function mute() {
	const muteBtn = document.querySelector(muteBtnSelector);
	
	if (muteBtn) {
		const tooltip = muteBtn.getAttribute(muteBtnToolTipAttr);
		
		if (tooltip && typeof (tooltip) === 'string' && tooltip.toLowerCase() === 'mute') {
			muteBtn.click();
		
			observe(document.body, () => {
				const durationEl = document.querySelector(durationSelector);
				if (!durationEl) {
					if (DEBUG) console.debug('Countdown over, unmuting');
					muteBtn.click();
					initialize();
					return true;
				}
			});
		} else {
			console.log('Already muted, not muting');
		}
	} else {
		console.error('No mute button found');
	}
}

function handleOverlay() {
	if (DEBUG) console.debug('Handling overlay');
  const skipBtn = document.querySelector(skipBtnSelector);
	const durationEl = document.querySelector(durationSelector);

  if (skipBtn) {
		if (DEBUG) console.debug('Skip button found, skipping');
    skipBtn.click();
		initialize();
  } else if (durationEl) {
		if (DEBUG) console.debug('No skip button found, muting');
		mute();
	} else {
		if (DEBUG) console.debug('Not an ad, doing nothing');
	}
}

function waitForOverlayToDisplay() {
	if (DEBUG) console.debug('Waiting for overlay');
	
	setTimeout(function check() {
    const overlay = document.querySelector(overlaySelector);
		
    if (overlay) {
			if (DEBUG) console.debug('Overlay displayed');
			handleOverlay();
    } else {
      setTimeout(check, INTERVAL);
    }
  }, INTERVAL);
}

function initialize() {
	if (DEBUG) console.debug('Initializing...');
	waitForOverlayToDisplay();
}

initialize();
