<template>
  <div id="app">
    <a-scene embedded artoolkit="webcam">
  	<a-marker-camera preset="hiro">
      <a-box position='0 0.5 0' material='color: black'></a-box>
  	</a-marker-camera>
    </a-scene>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="sass">
body
  margin: 0
  overflow: hidden

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
</style>
