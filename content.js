const DEBUG = true;

const overlaySelector = '.ytp-ad-player-overlay-skip-or-preview';
const muteBtnSelector = '.ytp-mute-button.ytp-button';
const muteBtnToolTipAttr = 'data-title-no-tooltip';
const skipBtnSelector = '.ytp-ad-skip-button-modern.ytp-button';
const durationSelector = '.ytp-ad-duration-remaining';

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

function waitForOverlayToDisplay() {
	if (DEBUG) console.debug('Waiting for overlay');

	observe(document.body, () => {
	  const overlay = document.querySelector(overlaySelector);

		if (overlay) {
			if (DEBUG) console.debug('Overlay displayed');
			skipOrMute();
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

function skipOrMute() {
	if (DEBUG) console.debug('Dealing with overlay');
  const skipBtn = document.querySelector(skipBtnSelector);

  if (skipBtn) {
		if (DEBUG) console.debug('Skip button found, skipping');
    skipBtn.click();
		initialize();
  } else {
		if (DEBUG) console.debug('No skip button found, muting');
		mute();
	}
}

function initialize() {
	if (DEBUG) console.debug('Initializing...');
	waitForOverlayToDisplay();
}

initialize();
