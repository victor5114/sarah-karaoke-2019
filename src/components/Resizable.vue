<template>
  <div class="resizable" v-bind:style="wrapStyle" ref="resizable">
    <slot :cWidth="containerWidth" :cHeight="containerHeight" :cSize="containerSize" ></slot>
  </div>
</template>

<script lang="ts">

// import DataSource from '../store/source';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IBreakpoints, defaultBreakpoints } from '@/lib/screenUtility';
import ElementMediaQuery from '@/lib/ElementMediaQuery';
import { get } from 'lodash';
import { Maybe } from 'maybe-monad';

@Component
export default class Resizable extends Vue {
    // Props
    @Prop({ default: () => defaultBreakpoints }) private breakpoints!: IBreakpoints;
    @Prop({ default: true }) private onlyOnBreak!: boolean; // Default true saves unecessary computation
    @Prop({ default: false }) private noWrap!: boolean;
    @Prop({ default: () => Object.create({}) }) private wrapStyle!: object;
    // Data
    private containerWidth: number = 0;
    private containerHeight: number = 0;
    private containerSize: string = '';
    private ElementMediaQuery: ElementMediaQuery | undefined;

    private onWidthChange () {
      const htmlElem = (this.$refs.resizable as HTMLElement);
      const cW = parseInt(get(htmlElem, 'dataset.width', 0), 10);
      const cH = parseInt(get(htmlElem, 'dataset.height', 0), 10);
      const cS = get(htmlElem, 'dataset.size');

      if (this.onlyOnBreak) {
        if (this.containerSize !== cS) {
            this.containerWidth = cW;
            this.containerHeight = cH;
            this.containerSize = cS;
        }
      } else {
          this.containerWidth = cW;
          this.containerHeight = cH;
          this.containerSize = cS;
      }
    }

    private mounted() {
        const htmlElem = (this.$refs.resizable as HTMLElement);

        this.ElementMediaQuery = new ElementMediaQuery(
          (htmlElem as HTMLElement),
          this.breakpoints
        );

        Maybe.nullToMaybe(this.ElementMediaQuery)
          .do((o: ElementMediaQuery) => o.register());

        (htmlElem as HTMLElement).addEventListener(
          'onWidthChange',
          this.onWidthChange,
          false
        );

        this.containerWidth = get(htmlElem, 'clientWidth', 0);
        this.containerHeight = get(htmlElem, 'clientHeight', 0);
        this.containerSize = get(htmlElem, 'dataset.size');
    }

    private beforeDestroy() {
      const htmlElem = (this.$refs.resizableContainer as HTMLElement);
      Maybe.nullToMaybe(this.ElementMediaQuery)
        .do((o: ElementMediaQuery) => o.unregister());
      
      Maybe.nullToMaybe(htmlElem)
        .do((e: HTMLElement) => e.removeEventListener('onWidthChange', this.onWidthChange));
    }
}
</script>