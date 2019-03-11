<template>
  <div class="song-component-ctn full-h">
      <div class="song-component-list-ctn full-h">
        <div class="songs-listing full-h">
          <ul class="songs-listing-list full-h">
            <li v-bind:key="a" v-for="a in Array(10).map((a, i) => i)" class="songs-listing-elem">
              <div></div>
            </li>
          </ul>
        </div>
        <song-listing-button :mode="'left'"></song-listing-button>
        <song-listing-button :mode="'right'"></song-listing-button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import db from '@/lib/firestore';
import { Song } from '@/components/Songs/Song.vue';
import SongsListingButton from '@/components/Songs/SongsListingButton.vue';

@Component({
  components: {
    'song-listing-button': SongsListingButton,
  }
})
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
    padding: 0 150px 40px 150px;

    .song-component-list-ctn {
      min-width: 400px;
      position: relative;

      .songs-listing {
        padding: 0px 50px;

        ul {
          background-color: white;

          .songs-listing-elem {
            height: calc(100% / 10);
          }
        }
      }
    }
  }
</style>
