<template>
  <div id="app">
    <div v-if="noWebGL" >
      {{noWebGLMessage}}
    </div>
    <resizable v-else :onlyOnBreak="false">
      <animation-container slot-scope="resizableScope" :width="resizableScope.cWidth" :height="resizableScope.cHeight">
        <router-view slot="main-app"/>
      </animation-container>
    </resizable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import WEBGL from '@/lib/WebGL.ts';
import AnimationContainer from '@/components/AnimationContainer.vue';
import Resizable from '@/components/Resizable.vue';

@Component({
  components: {
    'animation-container': AnimationContainer,
    'resizable': Resizable
  }
})
export default class App extends Vue {

  private noWebGL: boolean;

  constructor () {
    super();
    this.noWebGL = false;
  }

  // computed
  get noWebGLMessage () {
    return WEBGL.getWebGLErrorMessage();
  }


  private created () {
    if (WEBGL.isWebGLAvailable() === false) {
      this.noWebGL = true;
    }
  }
}
</script>
<style lang="scss">

body {
  color: #ffffff;
  // background-color: #000000;
  margin: 0px;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
