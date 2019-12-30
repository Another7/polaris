<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div>
            <div>
              <img src="../assets/TIM4.jpg">
            </div>
            <div>
              <div>因为了解2016</div>
              <div>动态|关注|粉丝</div>
              <div>
                <p>所在地</p>
                <p>账号</p>
              </div>
            </div>
          </div>
          <ClassifyTitle _title="听歌排行"></ClassifyTitle>
          <MusicList></MusicList>
          <ClassifyTitle _title="我创建的歌单"></ClassifyTitle>
          <SheetCover></SheetCover>
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

          > div {
            display: flex;
            justify-content: space-between;

            > div:first-child {
              width: 20%;

              > img {
                width: 150px;
                height: 150px;
              }
            }

            > div:last-child {
              width: 80%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            }
          }
        }
      }
    }
  }
</style>
