<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>Sci Fi<br>Book Club</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: 'arial', serif;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1200px;
  margin: auto;
  color: Gray;
  font-size: 24px;
  padding: 1em;
}
input {
  padding: 10px 5px;
  width: 100%;
  max-width: 400px;
  font-size: 24px;
  margin: 1em auto 0 auto;
  border: 0;
  border-bottom: 1px solid gray;
}

button {
  display: none;
}
</style>
