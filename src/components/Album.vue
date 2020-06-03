<template>
  <div id="container">
    <div class="box">
      <div>
        <div class="left">
          <el-avatar :src="image" shape="circle"></el-avatar>
        </div>
        <div class="right">
          <div>
            <div>
              专辑：<span>{{album.name}}</span>
            </div>
            <div>
              歌手：<span>
              <router-link
                      :to="{ name: 'singer', params: { userId: album.singerId }}">{{album.singerName}}</router-link>
            </span>
            </div>
            <div>
              发行时间：<span>{{album.createTime}}</span>
            </div>
            <div>
              <el-button type="primary">播放</el-button>
              <el-button>收藏</el-button>
              <el-button>分享</el-button>
            </div>
            <div>
              简介：<span>{{album.description}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="music">
        <el-table
                :data="musicTable"
                style="width: 100%">
          <el-table-column
                  type="index"
                  width="50">
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <i @click="play(scope.row)" class="el-icon-video-play"></i>
            </template>
          </el-table-column>
          <el-table-column label="歌曲标题" prop="name">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="歌手" prop="singer">
            <template slot-scope="scope">
              <span>{{scope.row.singer}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Album extends Vue {
        private image: string = '';
        private album = {
            id: 0,
            image: '',
            name: '',
            singerName: '',
            singerId: 0,
            collectionMusic: '',
            description: '',
            createTime: ''
        };

        private musicTable: Array<any> = [];

        created() {
            console.log(this.$route.params.albumId);
            this.axios.get('/albums', {
                params: {
                    albumId: this.$route.params.albumId
                }
            }).then((response) => {
                let albumResult = response.data.data;
                this.image = 'http://www.another.ren:8089/images/' + albumResult.image;
                this.album.id = albumResult.id;
                this.album.image = albumResult.image;
                this.album.name = albumResult.title;
                this.album.singerName = albumResult.singerName;
                this.album.singerId = albumResult.singerId;
                this.album.createTime = albumResult.createTime;
                this.album.description = albumResult.description;
                this.album.collectionMusic = albumResult.collectionMusic;
                let musicList = JSON.parse(this.album.collectionMusic);
                console.log(musicList);
                this.musicTable.length = 0;
                for (let musicResult of musicList) {
                    let music = {
                        id: '',
                        name: musicResult.fileName,
                        url: musicResult.url,
                        singer: this.album.singerName
                    };
                    this.musicTable.push(music);
                    console.log('musicTable');
                    console.log(this.musicTable);
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;

    margin: 0 auto;
    background-color: #f5f5f5;

    > .box {
      width: 70%;
      margin: 0 auto;
      min-height: 600px;
      background-color: #ffffff;

      > div {
        width: 90%;
        margin: 0 auto;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;

        > .left {
          width: 20%;

          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;

          > span {
            width: 140px;
            height: 140px;
          }
        }

        > .right {
          width: 70%;
          min-height: 300px;

          > div {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            > * {
              margin-top: 20px;
            }
          }
        }

        > .music {
          width: 100%;

          > div {
            width: 100%;
          }
        }
      }
    }
  }
</style>
