const DEBUG = false;
const INTERVAL = 50;

const durationSelector = '.ytp-ad-duration-remaining';
const muteBtnSelector = '.ytp-mute-button.ytp-button';
const muteBtnToolTipAttr = 'data-title-no-tooltip';
const overlaySelector = '.ytp-ad-player-overlay-skip-or-preview';
const skipBtnSelector = '.ytp-ad-skip-button-modern.ytp-button';

function observe(node, callback, options) {
  const observer = new MutationObserver((mutations, ob) => {
    const result = callback(mutations, ob);
    if (result) disconnect();
  });

  observer.observe(
    node,
    Object.assign(
      {
        childList: true,
        subtree: true,
      },
      options,
    ),
  );
  const disconnect = () => observer.disconnect();
  return disconnect;
}

function skip(skipBtn) {
	if (DEBUG) console.debug('Skip button found, skipping');
	skipBtn.click();
	initialize();
}

function waitAfterMute(muteBtn, unmute=true) {
	if (DEBUG) console.debug('Starting observer');
	const overlay = document.querySelector(overlaySelector);

	observe(overlay, () => {
		const skipBtn = document.querySelector(skipBtnSelector);
		const durationEl = document.querySelector(durationSelector);

		if (skipBtn) {
			skip(skipBtn);
			return true;
		} else if (!durationEl) {
			if (DEBUG) console.debug('Countdown over');
			if (unmute) {
				if (DEBUG) console.debug('Unmuting');
				muteBtn.click();
			}
			initialize();
			return true;
		}
	});
}

function mute() {
	const muteBtn = document.querySelector(muteBtnSelector);
	
	if (muteBtn) {
		const tooltip = muteBtn.getAttribute(muteBtnToolTipAttr);
		
		if (tooltip && typeof (tooltip) === 'string' && tooltip.toLowerCase() === 'mute') {
			muteBtn.click();
			waitAfterMute(muteBtn);
		} else {
			console.debug('Already muted, not muting');
			waitAfterMute(muteBtn, false);
		}
	} else {
		console.error('No mute button found');
		initialize();
	}
}

function handleOverlay() {
	if (DEBUG) console.debug('Handling overlay');
  const skipBtn = document.querySelector(skipBtnSelector);
	const durationEl = document.querySelector(durationSelector);

  if (skipBtn) {
    skip(skipBtn);
  } else if (durationEl) {
		if (DEBUG) console.debug('No skip button found, muting ad');
		mute();
	} else {
		if (DEBUG) console.debug('Not an ad, reinitializing');
		initialize();
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
