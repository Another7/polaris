<template>
  <div id="container">
    <div class="cover">
      <img src="../assets/leaf.jpg">
      <div>
        <p>飙升榜</p>
      </div>
    </div>
    <table>
      <tr v-for="(music, index) in musicList">
        <td class="order">{{index + 1}}</td>
        <td class="musicName">
          <router-link :to="music.musicId">{{music.musicName}}</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class SimpleMusicList extends Vue {
        @Prop({
            default: () => [{
                musicId: "1234556",
                musicName: "你能听到我的心吗"
            }]
        }) musicList!: Array<any>;

        private mounded() {
            this.musicList = [];
            let item = {
                musicId: "1234556",
                musicName: "你能听到我的心吗"
            };
            for (let i = 0; i < 10; i++) {
                this.musicList.push(item);
            }
        }
    }
</script>

<style scoped lang="scss">
  #container {
    width: 100%;
  }

  .cover {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      width: 150px;
      height: 100px;
    }

    > img {
      height: 100px;
      width: 100px;
      margin: 10px
    }
  }

  table {
    table-layout: fixed;
    border-collapse: collapse;
    text-align: center;
    width: 100%;

    > tr {
      > td {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 40px;
        font-family: Arial, Helvetica, sans-serif;;
      }

      .order {
        width: 20%;
      }

      .musicName {
        width: 80%;
        text-align: left;
      }
    }
  }

  table tr:nth-child(even) {
    background-color: lightgray;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

</style>
