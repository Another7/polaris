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
            <SheetCover v-for="i in 10"></SheetCover>
          </div>
          <div>
            <ClassifyTitle _title="个性化推荐"></ClassifyTitle>
          </div>
          <div class="sheet-cover">
            <SheetCover v-for="i in 5"></SheetCover>
          </div>
          <div>
            <ClassifyTitle _title="新碟上架" _showMore="true"></ClassifyTitle>
          </div>
          <div class="sheet-cover">
            <SheetCover v-for="i in 5"></SheetCover>
          </div>
          <div>
            <ClassifyTitle _title="榜单" _showMore="true"></ClassifyTitle>
          </div>
          <div class="music-list">
            <div>
              <SimpleMusicList></SimpleMusicList>
            </div>
            <div>
              <SimpleMusicList></SimpleMusicList>
            </div>
            <div>
              <SimpleMusicList></SimpleMusicList>
            </div>
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

          .sheet-cover {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
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
