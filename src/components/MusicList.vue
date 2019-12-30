<template>
  <div id="container">
    <table>
      <caption>
        <div>
          <span>歌曲列表</span>
          <span>10首歌</span>
          <span>播放23283次</span>
        </div>
      </caption>
      <tr>
        <th></th>
        <th>歌曲标题</th>
        <th>时长</th>
        <th>歌手</th>
        <th>专辑</th>
      </tr>
      <tr v-for="(music, index) in musicList">
        <td>{{index + 1}}</td>
        <td><a href="#">{{music.title}}</a></td>
        <td>{{music.duration}}</td>
        <td>{{music.singer}}</td>
        <td>{{music.album}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Music} from "@/domain/Music";

    @Component
    export default class MusicList extends Vue {
        @Prop({default: []}) musicList!: Array<Music>;

        constructor() {
            super();
            this.musicList = new Array<Music>();
            let music = new Music();
            music.id = 1;
            music.title = "Señorita";
            music.album = "Señorita";
            music.duration = "03:07";
            music.singer = "Camila Cabello";
            for (let i = 0; i < 10; i++) {
                this.musicList.push(music);
            }
        }
    }
</script>

<style scoped lang="scss">
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
          align-items: end;
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
