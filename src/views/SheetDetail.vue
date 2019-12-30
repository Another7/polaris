<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div>
            <SheetCoverInfo></SheetCoverInfo>
          </div>
          <div>
            <MusicList></MusicList>
          </div>
          <div>
            <PublishComment></PublishComment>
          </div>
          <div>
            <p>评论列表</p>
            <ShowComment :key="i" v-for="i in 10"></ShowComment>
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
    import {Component, Vue} from 'vue-property-decorator';
    import SheetCoverInfo from "@/components/SheetCoverInfo.vue";
    import MusicList from "@/components/MusicList.vue";
    import PublishComment from "@/components/PublishComment.vue";
    import ShowComment from "@/components/ShowComment.vue";

    @Component({
        components: {ShowComment, PublishComment, MusicList, SheetCoverInfo}
    })
    export default class SheetDetail extends Vue {

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
          width: 95%;
          margin: 0 auto;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;

          > div {
            margin-bottom: 20px;
          }

        }
      }
    }
  }

  .el-pagination {
    text-align: center;
  }
</style>
