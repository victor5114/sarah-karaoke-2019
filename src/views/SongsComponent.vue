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
    padding: 0 170px 40px 150px;

    .song-component-list-ctn {
      min-width: 400px;
      position: relative;
      min-height: 400px;

      .songs-listing {
        padding: 0px 50px;

        ul {
          background-color: white;

          li.songs-listing-elem {
            height: calc(100% / 10);
          }

          li:nth-child(odd) {
            /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#848484+100,c6c6c6+100&0+24,0.65+83,0.65+99 */
            background: -moz-linear-gradient(left, rgba(198,198,198,0) 24%, rgba(198,198,198,0.65) 83%, rgba(198,198,198,0.65) 99%, rgba(198,198,198,0.65) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(198,198,198,0) 24%,rgba(198,198,198,0.65) 83%,rgba(198,198,198,0.65) 99%,rgba(198,198,198,0.65) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(198,198,198,0) 24%,rgba(198,198,198,0.65) 83%,rgba(198,198,198,0.65) 99%,rgba(198,198,198,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00c6c6c6', endColorstr='#a6c6c6c6',GradientType=1 ); /* IE6-9 */
          }

          li:nth-child(even) {
            /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#d8d8d8+0,b7b7b7+100 */
            background: rgb(216,216,216); /* Old browsers */
            background: -moz-linear-gradient(left, rgba(216,216,216,1) 0%, rgba(183,183,183,1) 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(left, rgba(216,216,216,1) 0%,rgba(183,183,183,1) 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to right, rgba(216,216,216,1) 0%,rgba(183,183,183,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d8d8d8', endColorstr='#b7b7b7',GradientType=1 ); /* IE6-9 */
          }
        }
      }
    }
  }
</style>
