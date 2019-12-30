<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div class="navigation">
            <div v-for="i in 5">
              <p>推荐</p>
              <div>
                <a href="#">推荐歌手</a>
              </div>
              <div>
                <a href="#">入驻歌手</a>
              </div>
            </div>
          </div>
          <div class="sub-content">
            <div>
              <ClassifyTitle _title="入驻歌手" _showMore="true"></ClassifyTitle>
              <div>
                <div v-for="i in 12">
                  <img src="../assets/TIM4.jpg">
                  <a href="">I Miss You</a>
                </div>
              </div>
            </div>
            <div>
              <ClassifyTitle _title="入驻歌手" _showMore="true"></ClassifyTitle>
              <div>
                <div v-for="i in 12">
                  <img src="../assets/TIM4.jpg">
                  <a href="">I Miss You</a>
                </div>
              </div>
            </div>
            <div>
              <a v-for="i in 48">累不累</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ClassifyTitle from "@/components/ClassifyTitle.vue";

    @Component({
        components: {ClassifyTitle}
    })
    export default class Singer extends Vue {

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
          border-left: 1px darkgray solid;
          border-right: 1px darkgray solid;
          display: flex;

          .navigation {
            width: 20%;
            border-right: 1px darkgray solid;
            background-color: #f9f9f9;

            > div {
              width: 80%;
              margin: 20px auto;
              border-bottom: 1px darkgray solid;
              display: flex;
              flex-direction: column;
              height: 100px;
              justify-content: space-around;

              > p {
                font-size: 20px;
              }

              > div {
                padding: 5px 0;

                > a {
                  margin-left: 20px;
                }

                &:hover {
                  background-color: aqua;
                  cursor: pointer;
                }
              }
            }

            > div:last-child {
              border-bottom: none;
            }
          }

          .sub-content {
            width: 80%;
            background-color: #ffffff;

            > div {
              width: 90%;
              margin-top: 20px;
              margin-left: auto;
              margin-right: auto;

              > div {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                /*包含图片和标题*/
                > div {
                  display: flex;
                  flex-direction: column;
                  margin-top: 20px;

                  > img {
                    width: 150px;
                    height: 150px;
                  }
                }
              }
            }

            > div:last-child {
              margin-top: 40px;
              border-top: 1px darkgray dashed;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              > a {
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
              }
            }
          }
        }
      }
    }

  }
</style>
