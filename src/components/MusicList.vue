<template>
  <div id="container">
    <table>
      <caption>
        <div>
          <span>歌曲列表</span>
          <span>{{musicList.length}}首歌</span>
          <span>播放{{playCount}}次</span>
        </div>
      </caption>
      <tr>
        <th></th>
        <th>歌曲标题</th>
        <th>歌手</th>
        <th>专辑</th>
      </tr>
      <tr v-for="(music, index) in this.musicList">
        <td align="center">
          <span style="margin-right: 50px">{{index + 1}}</span>
          <span class="title"><i @click="play(music)" class="el-icon-video-play"></i></span>
        </td>
        <td>
          <span @click="goMusic(music.id)" class="title">{{music.name}}</span>
        </td>
        <td class="title">{{music.singerName}}</td>
        <td class="title">{{music.belongAlbumName}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import EventBus from "@/utils/EventBus";

    const GreetingProps = Vue.extend({
        props: {
            musicList: Array,
            playCount: Number
        }
    });

    @Component
    export default class MusicList extends GreetingProps {
        goMusic(musicId: number) {
            let id = String(musicId);
            this.$router.push({
                name: 'music',
                params: {
                    musicId: id
                }
            });
            EventBus.$emit('updateMusicId', musicId);
        }

        play(musicParam: any) {
            let belongAlbumImageUrl = '';
            this.axios.get('/albums', {
                params: {
                    albumId: musicParam.belongAlbumId
                }
            }).then((response) => {
                console.log(response);
                belongAlbumImageUrl = 'http://www.another.ren:8089/images/' + response.data.data.image;
                let music = {
                    id: musicParam.id,
                    name: musicParam.name,
                    url: 'http://www.another.ren:8089/audios/' + musicParam.url,
                    belongAlbumImageUrl: belongAlbumImageUrl,
                    singer: musicParam.singerName,
                    singerId: musicParam.singerId
                };
                EventBus.$emit('addRecord', music);
            });
        }
    }
</script>

<style lang="scss" scoped>
  .title {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  #container {
    width: 100%;
  }

  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border-bottom: 1px darkgray solid;
    border-left: 1px darkgray solid;
    border-right: 1px darkgray solid;

    > caption {
      margin-bottom: 10px;

      > div {
        display: flex;

        > span:last-child {
          margin-left: auto;
          margin-right: 0;
        }

        > span:first-child {
          font-size: 20px;
        }

        > span {
          font-size: 12px;
          margin-left: 30px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

      }
    }
  }

  th {
    text-align: left;
    border-top: 2px solid red;
  }

  tr {
    height: 30px;
  }

  tr:nth-child(even) {
    background-color: #f7f7f7;
  }
</style>
