<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import db from '@/lib/firestore';

@Component
export default class SongsComponent extends Vue {
  created () {
    console.log(process.env);
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  }
}
</script>

<style>

</style>
