<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


export type Song = {
  name: string;
  artist: string;
  link: string;
  creationDate: Date;
};

@Component
export default class SongsListing extends Vue {
}
</script>

<style>

</style>
