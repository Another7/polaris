<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div class="classify">
            <div class="left">
              <span>全部</span>
              <span @click="changePanel()">
                选择分类
              </span>
            </div>
            <div class="right">
              <span>最新</span>
              <span>热门</span>
            </div>
            <div class="classify-panel" v-if="showClassifyPanel">
              <div>
                <span><a href="#">全部风格</a></span>
              </div>
              <div v-for="i in 5">
                <div>语种</div>
                <div>
                  <ul>
                    <li>华语</li>
                    <span>|</span>
                    <li>欧美</li>
                    <span>|</span>
                    <li>日语</li>
                    <span>|</span>
                    <li>韩语</li>
                    <span>|</span>
                    <li>粤语</li>
                    <span>|</span>
                    <li>小语种</li>
                    <span>|</span>
                    <li>华语</li>
                    <span>|</span>
                    <li>欧美</li>
                    <span>|</span>
                    <li>日语</li>
                    <span>|</span>
                    <li>韩语</li>
                    <span>|</span>
                    <li>粤语</li>
                    <span>|</span>
                    <li>小语种</li>
                    <span>|</span>
                    <li>华语</li>
                    <span>|</span>
                    <li>欧美</li>
                    <span>|</span>
                    <li>日语</li>
                    <span>|</span>
                    <li>韩语</li>
                    <span>|</span>
                    <li>粤语</li>
                    <span>|</span>
                    <li>小语种</li>
                    <span>|</span>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="sheet">
            <SheetCover v-for="i in 20"></SheetCover>
          </div>
          <div class="page">
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
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import SheetCover from "@/components/SheetCover.vue";

    @Component({
        components: {SheetCover}
    })
    export default class Sheet extends Vue {
        @Prop({default: false}) showClassifyPanel!: boolean;

        changePanel() {
            console.log(this.showClassifyPanel);
            this.showClassifyPanel = !this.showClassifyPanel;
        }
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
        border-left: 1px darkgray solid;
        border-right: 1px darkgray solid;

        .content {
          width: 95%;
          margin: 0 auto;
          background-color: #ffffff;
          display: flex;
          justify-content: space-between;
          flex-direction: column;

          .classify {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #C10D0C;
            padding: 10px 0;
            position: relative;

            .left {
              > span {
                margin-right: 20px;
                font-size: 20px;
              }

              > span:last-child {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                background-color: #fafafa;
                border: 1px #c3c3c3 solid;
                padding-left: 10px;
                padding-right: 10px;
                border-radius: 5px;
              }
            }

            .right {
              margin-top: 10px;

              > span {
                padding: 5px;
                border-radius: 15%;
              }

              > span:first-child {
                color: #fff;
                background-color: #d20c0d;
              }

              > span:last-child {
                color: #000;
                background-color: #fcfcfc;
                border: 1px #d5d5d5 solid;
              }
            }

            .classify-panel {
              width: 70%;
              position: absolute;
              top: 60px;
              z-index: 1;
              background-color: #ffffff;
              border: 1px darkgray solid;
              box-shadow: -10px 10px 5px #888888;

              > div:first-child {
                border-bottom: 1px darkgrey solid;
              }

              > div {
                display: flex;
                align-items: center;
                height: 100%;

                > span {
                  display: flex;
                  margin-left: 20px;
                  align-items: center;

                  > a {
                    margin: 10px 20px;
                    border: 1px darkgray solid;
                    font-size: 13px;
                    padding: 5px 10px;
                    background-color: #ffffff;
                    color: #000;
                    border-radius: 10px;

                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }

                > div:first-child {
                  width: 20%;
                  display: flex;
                  align-self: stretch;
                  justify-content: center;
                  align-items: start;
                  border-right: 1px darkgrey solid;
                  padding-top: 10px;
                }

                > div:last-child {
                  width: 80%;
                  margin-bottom: 20px;
                  display: flex;
                  align-items: center;
                }

                > div {
                  > ul {
                    display: flex;
                    flex-wrap: wrap;

                    > li {
                      margin-left: 10px;
                      margin-top: 10px;

                      &:hover {
                        text-decoration: underline;
                        cursor: pointer;
                      }
                    }

                    > span {
                      margin: 0 10px;
                      margin-top: 10px;
                    }
                  }
                }
              }
            }
          }

          .sheet {
            width: 100%;
          }

          .page {
            margin: 10px auto;
          }
        }
      }
    }
  }
</style>
