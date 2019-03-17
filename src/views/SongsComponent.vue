<template>
  <div class="song-component-ctn full-h">
      <div class="song-component-list-ctn full-h">
        <div class="songs-listing full-h">
          <ul v-if="songList.length > 0" class="songs-listing-list full-h">
            <transition-group name="song-listing-list" >
              <li v-bind:key="song.name + '-' + i" v-for="(song, i) in songList" class="songs-listing-elem">
                <resizable :onlyOnBreak="false" :wrapStyle="{height: '100%'}">
                  <div class="pos-rel full-h" slot-scope="resizableScope">
                    <div class="rank-song">
                      <div class="pos-abs flex-h-v-center full-h full-w">
                        <span class="text-pink" style="color: white; font-size: 4rem;">{{ i + 1}}</span>
                      </div>
                      <div class="pos-rel">
                        <div class="arrow-borders" :style="{right: `${-1 * resizableScope.cHeight / 2}px`, borderTop: `${resizableScope.cHeight / 2}px solid transparent`, borderBottom: `${resizableScope.cHeight / 2}px solid transparent`, borderLeft: `${resizableScope.cHeight / 2}px solid #716F70`}"></div>
                      </div>
                    </div>
                    <div v-if="song.name" class="song-definition g-flex-row full-h">
                      <div class="g-flex-2 pos-rel">
                        <div class="pos-abs full-h" style="left: 0px;padding-left:40px">
                          <div class="dib full-h pr10">
                            <div class="g-flex-justify-center g-flex-row-centered full-h">
                              <font-awesome-icon icon="music" style="font-size: 4rem;color: rgb(234, 129, 255)"/>
                            </div>
                          </div>
                          <div class="dib full-h pl10" style="vertical-align: middle;">
                            <h4 style="font-size:2rem;">{{song.name}}</h4>
                          </div>
                        </div>
                      </div>
                      <div class="g-flex-1 pos-rel">
                        <div class="pos-abs full-h" style="left: 0px;padding-left:0px">
                          <div class="dib full-h pr10">
                            <div class="g-flex-justify-center g-flex-row-centered full-h">
                              <img class="" src="../assets/icon/microphone.svg" :style="{maxHeight: `${resizableScope.cHeight - 20}px`}" alt="">
                            </div>
                          </div>
                          <div class="dib full-h pl10" style="vertical-align: middle;">
                            <h4 style="font-size:2rem;">{{song.artist}}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </resizable>
              </li>
            </transition-group>
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
import { Song, generateEmptySongs } from '@/components/Songs/Song.vue';
import SongsListingButton from '@/components/Songs/SongsListingButton.vue';
import Resizable from '@/components/Resizable.vue';

@Component({
  components: {
    'resizable': Resizable,
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
      const loadingList: Array<Song> = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        loadingList.push(doc.data() as Song);
      });

      // this.songList = [...loadingList, ...Array.from({length: 10}, (v, i) => generateEmptySongs())].splice(0, 10);
      this.songList = loadingList;
      setInterval(() => {
        this.songList = [...this.songList, generateEmptySongs(), generateEmptySongs()].splice(0, 10);
      }, 1000);

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
            .song-definition {
              padding-left: 8%;
            }
            .rank-song {
              position: absolute;
              left: 0;
              width: 8%;
              height: 100%;
              padding: 2px 0px;
              /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#292929+0,716f70+100 */
              background: rgb(41,41,41); /* Old browsers */
              background: -moz-linear-gradient(left, rgba(41,41,41,1) 0%, rgba(113,111,112,1) 100%); /* FF3.6-15 */
              background: -webkit-linear-gradient(left, rgba(41,41,41,1) 0%,rgba(113,111,112,1) 100%); /* Chrome10-25,Safari5.1-6 */
              background: linear-gradient(to right, rgba(41,41,41,1) 0%,rgba(113,111,112,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#292929', endColorstr='#716f70',GradientType=1 ); /* IE6-9 */

              .arrow-borders {
                position: absolute;
                top: -2px;
                width: 0;
                height: 0;
                right: -20px;
                clear: both;
              }

              &::before {
                content: '';
                /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#292929+0,716f70+100 */
                background-image: rgb(41,41,41); /* Old browsers */
                background-image: -moz-linear-gradient(top, rgba(41,41,41,1) 0%, rgba(113,111,112,1) 100%); /* FF3.6-15 */
                background-image: -webkit-linear-gradient(top, rgba(41,41,41,1) 0%,rgba(113,111,112,1) 100%); /* Chrome10-25,Safari5.1-6 */
                background-image: linear-gradient(to bottom, rgba(41,41,41,1) 0%,rgba(113,111,112,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                width: 100%;
                height: 2px;
                top: 0px;
                left: 0px;
                position:absolute;
              }

              // &::after {
              //   content: '';
              //   background-image: rgb(41,41,41); /* Old browsers */
              //   background-image: -moz-linear-gradient(top, rgba(41,41,41,1) 0%, rgba(113,111,112,1) 100%); /* FF3.6-15 */
              //   background-image: -webkit-linear-gradient(top, rgba(41,41,41,1) 0%,rgba(113,111,112,1) 100%); /* Chrome10-25,Safari5.1-6 */
              //   background-image: linear-gradient(to bottom, rgba(41,41,41,1) 0%,rgba(113,111,112,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              //   width: 100%;
              //   height:2px;
              //   left: 0px;
              //   bottom: 0px;
              //   position:absolute;
              // }
            }
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

          .song-listing-list-enter-active, .song-listing-list-leave-active {
            transition: all 1s;
          }
          .song-listing-list-enter, .song-listing-list-leave-to, .list-leave-active /* .list-leave-active below version 2.1.8 */ {
            opacity: 0;
            transform: translateY(30px);
          }
        }
      }
    }
  }
</style>
