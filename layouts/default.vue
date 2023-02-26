<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.font-audiowide {
  font-family: 'Audiowide', cursive;
}
.font-play {
  font-family: 'Play', sans-serif;
  animation: pulsate 0.91s ease-in-out infinite alternate;
}
@keyframes pulsate {
  100% {
    text-shadow: 0 0 1px #fff, 0 0 1.5px #fff, 0 0 2.5px #fff, 0 0 2px #fec47f,
      0 0 5px #fec47f, 0 0 10px #fec47f, 0 0 12px #fec47f, 0 0 15px #fec47f;
  }

  0% {
    text-shadow: 0 0 0.5px #fff, 0 0 1px #fff, 0 0 1.5px #fff, 0 0 1px #fec47f,
      0 0 3px #fec47f, 0 0 6px #fec47f, 0 0 9px #fec47f, 0 0 12px #fec47f;
  }
}
</style>
