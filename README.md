# YouTube Skip Ads Extension for Firefox

This Firefox extension will skip YouTube ads as soon as possible (in the case that a Skip button is available), or mute them if skipping is not possible.

This extension is unsigned, so it can only be installed in the [Developer Edition](https://www.mozilla.org/firefox/developer/), [Nightly](https://www.mozilla.org/firefox/nightly/all/), and [ESR](https://www.mozilla.org/firefox/organizations/) versions of Firefox. To use it in one of these browsers, you must also allow unsigned extensions.

## Allow unsigned extensions

1. Navigate to `about:config` in one of the above browsers.
2. Filter for the `xpinstall.signatures.required` preference
3. Toggle it to `false`

## Installation

### Download the extension

1. Navigate to the [Releases](https://github.com/heldinz/yt-skip/releases) page
1. Download the latest `yt-skip.xpi` file

### Install the extension

1. Navigate to `about:addons`
1. Click on the gear icon
1. Choose “Install Add-on From File...” from the context menu
1. Select the `yt-skip.xpi` file
