# Dev Helper Toolkit

A Chrome extension that bundles practical utilities for developers in one popup.

## Features

- Password generator
- Password history (stored with extension `storage` permission)
- URL encode/decode
- Base64 encode/decode
- JWT decode
- JSON formatter

## Tech

- Manifest V3
- HTML/CSS/JavaScript

## Project Structure

- `manifest.json`: extension manifest and permissions
- `popup.html`: popup UI
- `popup.css`: popup styles
- `popup.js`: utility logic and interactions
- `icons/`: extension icons

## Install from GitHub (Chrome)

### Option 1: Download ZIP

1. Open the repository on GitHub
2. Click **Code** > **Download ZIP**
3. Extract the ZIP file
4. Open Chrome and go to `chrome://extensions/`
5. Enable **Developer mode**
6. Click **Load unpacked**
7. Select the extracted `developer-tools-extension` folder

### Option 2: Clone the Repository

1. Clone the repo:
   `git clone git@github.com:vaishakhbn/developer-tools-extension.git`
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the cloned `developer-tools-extension` folder

## Run Locally (Chrome)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select this folder: `developer-tools-extension`
5. Pin the extension and click it to open the popup

## Development

- Update `popup.html`, `popup.css`, or `popup.js`
- Reload the extension from `chrome://extensions/` after changes

## License

No license is currently specified.
