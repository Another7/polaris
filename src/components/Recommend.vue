<template>
  <div id="container">
    <div class="carousel">
      <Carousel></Carousel>
    </div>
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div>
            <SubTitle></SubTitle>
          </div>
          <div class="sheet-cover">
            <SheetCover :key="sheet.id" :sheet="sheet" v-for="sheet in sheetList"></SheetCover>
          </div>
          <div v-if="$store.state.user.isLogin">
            <ClassifyTitle _title="个性化推荐"></ClassifyTitle>
          </div>
          <div class="sheet-cover" v-if="$store.state.user.isLogin">
            <div class="recommend">
              <div @click="recommendMusic" class="cover">
                <el-avatar :src="recommendCover" shape="square"></el-avatar>
              </div>
              <div class="title">
                <span>每日推荐</span>
              </div>
            </div>
            <SheetCover :key="recommendSheet.id" :sheet="recommendSheet"
                        v-for="recommendSheet in recommendSheetList"></SheetCover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Carousel from "@/components/Carousel.vue";
    import ClassifyTitle from "@/components/ClassifyTitle.vue";
    import SubTitle from "@/components/SubTitle.vue";
    import SheetCover from "@/components/SheetCover.vue";
    import SimpleMusicList from "@/components/SimpleMusicList.vue";

    @Component({
        components: {SimpleMusicList, SheetCover, SubTitle, ClassifyTitle, Carousel}
    })
    export default class Recommend extends Vue {
        private sheetList: Array<any> = [];
        private recommendSheetList: Array<any> = [];
        private recommendCover: string = require("@/assets/recommend.jpg");

        created() {
            this.axios.get('/recommend/musicSheet', {
                params: {
                    userId: 1
                }
            }).then((response) => {
                this.recommendSheetList.length = 0;
                this.recommendSheetList = response.data;
            });
            this.axios.get('/sheets/recommend', {
                params: {
                    userId: null
                }
            }).then((response) => {
                this.sheetList = response.data;
            })
        }

        recommendMusic() {
            this.$router.push({
                name: 'recommendMusic'
            });
        }
    }
</script>

<style lang="scss" scoped>
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

          .sheet-cover {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            > .recommend {
              > .cover {
                width: 140px;
                height: 140px;

                > span {
                  width: 140px;
                  height: 140px;
                }
              }

              > .title {
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }

          .music-list {
            margin: 20px 0;
            border-top: 1px darkgrey solid;
            border-bottom: 1px darkgrey solid;
            display: flex;
            justify-content: space-between;

            > div:first-child {
              border-left: 1px darkgrey solid;
            }

            > div {
              width: 33.33%;
              border-right: 1px darkgrey solid;
            }
          }
        }
      }
    }
  }
</style>
