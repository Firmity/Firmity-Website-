# Loading animation

Drop your Lottie file here to replace the default CSS "fluid orb" loading screen.

## How it works

`LoadingScreen` looks for a file at:

```
/public/animations/loading.lottie
```

- If that file exists, it plays on top of the orb.
- If it's missing (or the network blocks it), the app quietly falls back to the
  built-in animated orb — nothing breaks.

## Accepted formats

- `loading.lottie` — recommended (compressed dotLottie)
- `loading.json` — plain Lottie JSON also works; point `src` at it, e.g.
  `<LoadingScreen src="/animations/loading.json" />`

## Where to get one

- https://lottiefiles.com — search "facility", "doctor", "health check",
  "loading orb", etc. Download as **dotLottie (.lottie)** and rename to
  `loading.lottie`.

No rebuild is required — the file is served statically from `/public`.
After adding it, just refresh.
