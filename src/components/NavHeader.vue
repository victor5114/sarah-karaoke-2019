<template>
    <nav class="nav-header">
        <ul class="nav-list flex-h-v-center">
            <li class="nav-elem">
                <router-link to="/songs" >
                    <img class="picto-nav __img" src="../assets/icon/karaoke.svg" alt="">
                </router-link>
            </li>
            <li class="nav-elem">
                <router-link to="/users" >
                    <img class="picto-nav" src="../assets/icon/teammate.svg" alt="">
                </router-link>
            </li>
            <li class="nav-elem">
                <router-link to="/track-link">
                    <img class="picto-nav " src="../assets/icon/album.svg" alt="">
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Album from '@/assets/album.svg';

@Component
export default class NavHeader extends Vue {
    private Album: any
}
</script>

<style lang="scss">
.nav-header {
    
    ul.nav-list {
        list-style-type: none;

        li.nav-elem {
            height: 130px;
            margin: 20px 10px 0px 10px;
            
        }

        li.nav-elem {
            a {
                border-top: 3px dotted #e5e5e5;
                border-bottom: 3px dotted #e5e5e5;
                box-shadow: inset 0 -1px 0 0 #e5e5e5, inset 0 1px 0 0 #e5e5e5, 0 1px 0 0 #e5e5e5, 0 -1px 0 0 #e5e5e5;
                margin-bottom: 1px;

                background: #3d2a32;
                background: -moz-linear-gradient(-45deg, #3d2a32 0%, #3d2a32 25%, #1e539e 50%, #ff3083 75%, #7800a8 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(-45deg, #3d2a32 0%,#3d2a32 25%,#1e539e 50%,#ff3083 75%,#7800a8 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(135deg, #3d2a32 0%,#3d2a32 25%,#1e539e 50%,#ff3083 75%,#7800a8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                background-size: 400% 400%;
                background-repeat: no-repeat;
                display: block;
                height: 100%;
                color: #fff;
                position: relative;
                cursor: pointer;
                background-position: 0% 0%;
                transition: .5s all;
                
                img {
                    left: 0;
                    top: 0;
                    background-size: cover;
                    z-index: 1;
                    opacity: .9;
                    mix-blend-mode: screen;
                    height: 130px;
                    padding: 20px;
                }


                &:hover {
                    background-position: 100% 100%;
                }

                &.router-link-active {
                    background-position: 100% 100%;
                    background: -moz-linear-gradient(-45deg, #ff3083 0%, #7800a8 25%, #3aac43 50%, #31f59a 75%, #08c9cf 100%); /* FF3.6-15 */
                    background: -webkit-linear-gradient(-45deg, #ff3083 0%,#7800a8 25%,#3aac43 50%,#31f59a 75%,#08c9cf 100%); /* Chrome10-25,Safari5.1-6 */
                    background: linear-gradient(135deg, #ff3083 0%,#7800a8 25%,#3aac43 50%,#31f59a 75%,#08c9cf 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                }
            }
        }

        li.nav-elem:first-child {
            a {
                border-top-left-radius: 15px;
                border-bottom-left-radius: 15px;
            }
        }

        li.nav-elem:last-child {
            a {
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
            }
        }
    }
}

</style>
