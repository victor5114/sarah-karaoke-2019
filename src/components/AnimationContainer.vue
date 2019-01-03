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
import THREE from 'three';

@Component
export default class App extends Vue {
    private renderer: THREE.WebGLRenderer | undefined;
}
</script>

<style lang="scss">
.anim-ctn {
    position: relative;
}

.anim-frame {
    position: fixed; width: 100vw; height: 100vh;
}

</style>


