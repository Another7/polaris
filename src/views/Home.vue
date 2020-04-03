<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div class="cover">
            <div>
              <el-avatar :size="140" :src="personInfo.image" shape="square"></el-avatar>
            </div>
            <div>
              <div class="nick-name">
                <span>{{personInfo.nickName}}</span>
                <el-button @click="editPersonInfo">编辑个人资料</el-button>
              </div>
              <div class="data">
                <span>动态：{{personInfo.momentsNumber}}</span>|
                <span>关注：{{personInfo.followNumber}}</span>|
                <span>粉丝：{{personInfo.followerNumber}}</span>
              </div>
              <div>
                <span>所在地：{{personInfo.address}}</span>
              </div>
            </div>
          </div>
          <ClassifyTitle _title="听歌排行"></ClassifyTitle>
          <!--          <MusicList></MusicList>-->
          <!--          <ClassifyTitle _title="我创建的歌单"></ClassifyTitle>-->
          <!--          <SheetCover></SheetCover>-->
          <div class="music-rank">
            <el-table :data="musicRank" :show-header="false">
              <el-table-column
                      type="index"
                      width="50">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <i class="el-icon-video-play"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.singer }}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.playNumber }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ClassifyTitle from "@/components/ClassifyTitle.vue";
    import MusicList from "@/components/MusicList.vue";
    import SheetCover from "@/components/SheetCover.vue";

    @Component({
        components: {SheetCover, MusicList, ClassifyTitle}
    })
    export default class Home extends Vue {
        private personInfo = {
            id: 0,
            image: require('@/assets/TIM4.jpg'),
            nickName: '因为了解',
            momentsNumber: 0,
            followNumber: 0,
            followerNumber: 0,
            address: '华夏'
        };
        private musicRank: Array<any> = new Array<any>();

        created() {
            let music = {
                id: 123,
                name: '透明',
                singer: '邓紫棋',
                playNumber: 0
            };
            for (let i = 0; i < 10; i++) {
                this.musicRank.push(music);
            }
        }

        editPersonInfo() {
            this.$router.push('personInfo');
        }

    }
</script>

<style lang="scss" scoped>
  i {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  span {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  #container {
    .item {
      background-color: #f5f5f5;

      .content-border {
        width: 70%;
        min-width: 900px;
        margin: 0 auto;
        background-color: #ffffff;
        border-left: 1px darkgray solid;
        border-right: 1px darkgray solid;

        .content {
          width: 95%;
          margin: 0 auto;
          background-color: #ffffff;
          display: flex;
          justify-content: space-between;
          flex-direction: column;

          > .cover {
            margin-top: 20px;
            height: 140px;
            display: flex;
            justify-content: space-between;

            > div:first-child {
              width: 20%;
            }

            > div:last-child {
              width: 80%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;

              > .nick-name {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }

              > .data {
                > span {
                  margin-right: 10px;
                }
              }
            }
          }

          > .music-rank {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
