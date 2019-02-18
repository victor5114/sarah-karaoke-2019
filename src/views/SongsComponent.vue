<template>
  <div class="song-component-ctn full-h">
      <div class="song-component-list-ctn full-h">
        <div class="songs-button-ctn">
          <button class="songs-button songs-button-backward"></button>
        </div>
        <div class="songs-button-ctn">
          <button class="songs-button songs-button-forward"></button>
        </div>
      </div>
  </div>
</template>

        .parent{
  height: 100%;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import db from '@/lib/firestore';
import { Song } from '@/components/Songs/Song.vue';

@Component
export default class SongsComponent extends Vue {
  private page: number;
  private listSize: number;
  private songList: Array<Song>;
  private loadingState: Boolean;

  constructor () {
      super();
      this.page = 1;
      this.listSize = 10;
      this.songList = [];
      this.loadingState = true;
  }

  created () {
    db.collection("songs").get().then((querySnapshot) => {
      console.log(querySnapshot)
      const loadingList: Array<Song> = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `);
        console.log(doc.data());
        loadingList.push(doc.data() as Song);
      });
      this.songList = loadingList;
      this.loadingState = false;
    });
  }
}
</script>

<style lang="scss">
  .song-component-ctn {
    display: block;
    padding: 0 150px;

    .song-component-list-ctn {
      min-width: 400px;
      position: relative;

      .songs-button-ctn {
        height: 100%;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;

        .songs-button {
          width: 40px;
          height: 100px;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }

        .songs-button-backward {
          left: 0;
        }

        .songs-button-forward {
          right: 0;
        }
      }
    }
  }
</style>
