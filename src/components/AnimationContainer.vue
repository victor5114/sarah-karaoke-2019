<template>
    <div class="anim-ctn">
        <div class="anim-frame" ref="anim_frame" />
        <div class="main-app-ctn">
            <slot name="nav-header"></slot>
            <slot name="app-content"></slot>
        </div>
    </div>   
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    TextureLoader,
    ShaderMaterial,
    AdditiveBlending,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Points,
    VertexColors
} from 'three';
import { get } from 'lodash';
import {fragment, vertex} from '@/lib/Shaders';

@Component
export default class AnimationContainer extends Vue {
    @Prop(Number) private width!: number;
    @Prop(Number) private height!: number;

    private renderer: WebGLRenderer;
    private scene: Scene = new Scene();
    private camera: PerspectiveCamera;
    private particles: number;
    private geometry:BufferGeometry = new BufferGeometry();
    private particleSystem: Points;

    constructor () {
        super();
        this.renderer = new WebGLRenderer();
        this.scene = new Scene();
        this.scene.background = new Color( 0x2a2a2a );
        this.camera = new PerspectiveCamera( 40, this.width / this.height, 1, 10000 );
        this.particles = 50000;
        this.particleSystem = new Points();
    }

    private init () {
        this.camera.position.z = 100;
        const uniforms = {
            texture: { value: new TextureLoader().load('https://s3-eu-west-1.amazonaws.com/sarah-karaoke-2019/img/spark1.png') }
        };

        const shaderMaterial = new ShaderMaterial({
            uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            blending: AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: VertexColors
        });

        const radius = 200;
        
        const positions = [];
        const colors = [];
        const sizes = [];
        const color = new Color();

        for ( let i = 0; i < this.particles; i ++ ) {
            positions.push( ( Math.random() * 2 - 1 ) * radius );
            positions.push( ( Math.random() * 2 - 1 ) * radius );
            positions.push( ( Math.random() * 2 - 1 ) * radius );
            color.setHSL( i / this.particles, 1.0, 0.5 );
            colors.push( color.r, color.g, color.b );
            sizes.push( 20 );
        }

        // debugger;
        this.geometry.addAttribute( 'position', new Float32BufferAttribute( positions, 3 ) );
        this.geometry.addAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );
        this.geometry.addAttribute( 'size', new Float32BufferAttribute( sizes, 1 ).setDynamic( true ) );
        this.particleSystem = new Points(this.geometry, shaderMaterial );
        this.scene.add(this.particleSystem);

        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.width, this.height );
        this.$el.childNodes[0].appendChild(this.renderer.domElement);
    }

    private animate () { 
        requestAnimationFrame(this.animate);
        this.renderAnimation();
    }

    private renderAnimation() {
        const time = Date.now() * 0.005;
        this.particleSystem.rotation.z = 0.01 * time;
        const sizes = this.geometry.attributes.size.array;

        for (let i = 0; i < this.particles; i ++ ) {
            (sizes[ i ] as any) = 10 * ( 1 + Math.sin( 0.1 * i + time ) );
        }

        (this.geometry.attributes.size as Float32BufferAttribute).needsUpdate = true;
        this.renderer.render(this.scene, this.camera);
    }

    private mounted () {
        this.init();
        this.animate();
    }

    private updated() {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.width, this.height );
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

.main-app-ctn {
    position: relative;
    z-index: 1;
}

</style>


