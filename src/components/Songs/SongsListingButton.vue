<template>
  <div class="songs-button-ctn">
    <button class="songs-button" :class="mode === 'left' ? 'songs-button-backward' : 'songs-button-forward'">
      <font-awesome-icon v-if="mode === 'left'" icon="caret-left" style="font-size: 4rem;"/>
      <font-awesome-icon v-else icon="caret-right" style="font-size: 4rem;"/>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SongsListingButton extends Vue {
  @Prop({default: 'left', validator: (v) => v === 'left' || v === 'right'}) private mode?: String;
}
</script>

<style lang="scss">

$width-button: 40px;

.songs-button-ctn {
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;

  .songs-button {
    width: $width-button;
    height: 100px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    border-top: 3px dotted #e5e5e5;
    border-bottom: 3px dotted #e5e5e5;
    box-shadow: inset 0 -1px 0 0 #e5e5e5, inset 0 1px 0 0 #e5e5e5, 0 1px 0 0 #e5e5e5, 0 -1px 0 0 #e5e5e5;
    cursor: pointer;
    z-index: 100;
  }

  .songs-button-backward {
    left: 0;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  .songs-button-forward {
    right: 0;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
}
</style>
