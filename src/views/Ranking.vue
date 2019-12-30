<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div class="navigation">
            <p>云音乐特色榜</p>
            <div class="nav-item" v-for="i in 5">
              <div>
                <img src="../assets/TIM5.jpg">
              </div>
              <div>
                <p>云音乐飙升榜</p>
                <p>每天更新</p>
              </div>
            </div>
            <p>全球媒体榜</p>
            <div class="nav-item" v-for="i in 5">
              <div>
                <img src="../assets/TIM5.jpg">
              </div>
              <div>
                <p>云音乐飙升榜</p>
                <p>每天更新</p>
              </div>
            </div>
          </div>
          <div class="sub-content">
            <div>
              <div class="cover-info">
                <div>
                  <img src="../assets/TIM2.jpg">
                </div>
                <div>
                  <p>你是我未曾拥有无法捕捉的亲昵</p>
                  <p>你是我朝夕相伴触手可及的虚拟</p>
                  <div>
                    <span>button</span>
                    <span>button</span>
                    <span>button</span>
                    <span>button</span>
                    <span>button</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <MusicList></MusicList>
            </div>
            <div>
              <PublishComment></PublishComment>
            </div>
            <div>
              <ShowComment v-for="i in 10"></ShowComment>
            </div>
            <div>
              <el-pagination
                      :total="100"
                      @current-change="demo"
                      background
                      layout="prev, pager, next">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MusicList from "@/components/MusicList.vue";
    import PublishComment from "@/components/PublishComment.vue";
    import ShowComment from "@/components/ShowComment.vue";

    @Component({
        components: {ShowComment, PublishComment, MusicList}
    })
    export default class Ranking extends Vue {

    }
</script>

<style scoped lang="scss">
  #container {
    .item {
      background-color: #f5f5f5;

      .content-border {
        width: 70%;
        min-width: 900px;
        margin: 0 auto;
        background-color: #ffffff;

        .content {
          background-color: #ffffff;
          display: flex;
          justify-content: space-between;
          border-left: 1px darkgray solid;
          border-right: 1px darkgray solid;

          .navigation {
            border-right: 1px darkgray solid;
            width: 30%;
            background-color: #f9f9f9;

            > p {
              margin-top: 20px;
              margin-bottom: 10px;
            }

            .nav-item {
              display: flex;

              &:hover {
                background-color: #e6e6e6;
              }

              > div {
                height: 60px;
                margin: 2px auto;
              }

              > div:first-child {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30%;

                > img {
                  width: 50px;
                  height: 50px;
                }
              }

              > div:last-child {
                width: 70%;
                display: flex;
                justify-content: space-around;
                flex-direction: column;
              }
            }
          }

          .sub-content {
            width: 70%;

            > div {
              width: 95%;
              margin: 30px auto;

              .cover-info {
                display: flex;

                > div:first-child {
                  width: 30%;

                  > img {
                    width: 150px;
                    height: 150px;
                  }
                }

                > div:last-child {
                  width: 70%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                }

              }
            }
          }
        }
      }
    }
  }

  .el-pagination {
    text-align: center;
  }
</style>
