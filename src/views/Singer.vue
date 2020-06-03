<template>
  <div id="container">
    <div class="box">
      <div class="content">
        <div>
          <span><em>邓紫棋</em></span>
        </div>
        <div class="cover">
          <el-avatar :src="image" fit="fill" shape="square"></el-avatar>

        </div>
        <div>
          <el-tabs type="border-card">
            <el-tab-pane label="热门作品">
              <el-table
                      :data="hotMusic"
                      :show-header="false"
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
                <el-table-column prop="name">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="albumName">
                  <template slot-scope="scope">
                    <span>{{scope.row.albumName}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="所有专辑">

            </el-tab-pane>
            <el-tab-pane label="歌手简介">

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Singer extends Vue {
        private image: string = require('@/assets/TIM2.jpg');
        private hotMusic: Array<any> = [];
        private allAlbum: Array<any> = [];
        private description = {};

        created() {
            let music = {
                id: 123,
                name: '过活',
                singerId: 12,
                singerName: '高鱼',
                albumName: '过活',
                albumId: 1234
            };
            this.hotMusic.length = 5;
            this.hotMusic.fill(music, 0, 5);
        }

    }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    background-color: #f5f5f5;

    > .box {
      width: 70%;
      margin: 0 auto;
      background-color: #ffffff;

      > .content {
        width: 80%;
        margin: 0 auto;
        padding-top: 20px;

        > div {
          margin-top: 10px;
        }

        > .cover {
          width: 100%;

          > span {
            width: 100%;
            height: 300px;
          }
        }
      }
    }
  }
</style>
