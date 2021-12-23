<template>
  <div id="app">
    <dapp/>
  </div>
</template>

<script>
import Dapp from './components/Dapp';

export default {
  name: 'App',
  components: {
    Dapp
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
