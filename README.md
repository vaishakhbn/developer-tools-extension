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
