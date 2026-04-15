# Speeds

A userscript/addon for **Yandex Music** that allows changing the playback speed of tracks.

## Installation

### Setup

1. Clone the repository:

```bash
git clone https://github.com/diram1x/speeds.git
cd speeds
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
# Build all targets
npm run build

# Build for nextmusic (Yandex Music desktop app)
npm run build:nextmusic

# Build as a standalone userscript
npm run build:web
```

## Usage

Once installed, a numeric input field appears in the player bar. Simply:

1. Click the input to focus it
2. Enter a speed value (e.g., `1.5`, `2`, `0.75`)
3. Press **Enter** or click elsewhere to apply

The speed defaults to `1` (normal playback).

## Development

```bash
npm run dev
```

This starts the development mode using [`ymtm`](https://www.npmjs.com/package/@diram1x/ymtm).
