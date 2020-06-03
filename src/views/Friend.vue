<template>
  <div id="container">
    <div class="box">
      <div class="title">
        <span>动态</span>
      </div>
      <div class="moments">
        <div v-if="momentList.length === 0">暂无动态</div>
        <div :key="moment.id" class="moment" v-else v-for="moment in momentList">
          <div class="left">
            <el-avatar :src="'http://www.another.ren:8089/images/' + moment.creatorImage" shape="square"></el-avatar>
          </div>
          <div class="right">
            <div class="user">
              <div><span>{{moment.creatorNickName}}</span><span>分享单曲</span></div>
              <div>{{moment.publishTime}}</div>
            </div>
            <div class="text">
              <span>{{JSON.parse(moment.content).text}}</span>
            </div>
            <div class="music">
              <div>
                <el-avatar :src="'http://www.another.ren:8089/images/' + JSON.parse(moment.content).music.image"
                           shape="square"></el-avatar>
              </div>
              <div class="music-name-singer">
                <div>
                  {{JSON.parse(moment.content).music.name}}
                </div>
                <div>
                  {{JSON.parse(moment.content).music.singerName}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import EventBus from "@/utils/EventBus";

    @Component
    export default class Friend extends Vue {
        private momentList: Array<any> = [];
        private music: any = {};

        created() {
            console.log(this.momentList.length);
            // this.axios.get('/moments/follow', {
            //     params: {
            //         userId: this.$store.state.user.id
            //     }
            // }).then((response) => {
            //     console.log(response);
            //     let momentArray = response.data;
            //
            // });
            EventBus.$on('updateMoment', () => {
                this.axios.get('/moments/follow', {
                    params: {
                        userId: this.$store.state.user.id
                    }
                }).then((response) => {
                    console.log(response);
                    this.momentList = response.data;
                });
            });
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    background-color: #f5f5f5;

    > .box {
      width: 60%;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;

      > .title {
        width: 100%;

        > span {
          display: inline-block;
          width: 100%;
          font-size: 20px;
          border-bottom: #c20c0c solid 1px;
          padding-bottom: 10px;
        }
      }

      > .moments {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;

        > .moment {
          margin: 10px 0;
          display: flex;
          justify-content: flex-start;
          border-bottom: #99a9bf solid 1px;
          padding-bottom: 10px;

          > .left {
            width: 10%;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;

            > span {
              width: 60px;
              height: 60px;
            }
          }

          > .right {
            width: 90%;

            > .user {
              height: 60px;
              display: flex;
              justify-content: space-around;
              flex-direction: column;
            }

            > .text {
              margin-top: 10px;
              margin-bottom: 10px;
            }

            > .music {
              background-color: #f5f5f5;
              width: 100%;
              display: flex;
              justify-content: flex-start;

              > .music-name-singer {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
