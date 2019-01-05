<template>
    <div class="anim-ctn">
        <div class="anim-frame">

        </div>
        <div style="position: absolute">
            <slot name="main-app"></slot>
        </div>
    </div>   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Scene, PerspectiveCamera, WebGLRenderer, } from 'three';

@Component
export default class App extends Vue {

    private renderer: WebGLRenderer | undefined;
    private scene: Scene = new Scene();
    private camera: PerspectiveCamera = new PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    private particles: number;

    constructor () {
        super();
        this.renderer = new WebGLRenderer();
        this.scene = new Scene();
        this.camera = new PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
        this.particles = 100000;
    }
}
</script>

<style lang="scss">
.anim-ctn {
    position: relative;
    height: 100vh
}

.anim-frame {
    position: fixed; width: 100vw; height: 100vh;
}

</style>


