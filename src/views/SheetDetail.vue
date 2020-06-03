<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div>
            <SheetCoverInfo :sheetCover="sheetCover" :tags="tags"></SheetCoverInfo>
          </div>
          <div>
            <MusicList :musicList="musicList" :playCount="sheetCover.sheet.totalPlayCount"></MusicList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import SheetCoverInfo from "@/components/SheetCoverInfo.vue";
    import MusicList from "@/components/MusicList.vue";
    import PublishComment from "@/components/PublishComment.vue";
    import ShowComment from "@/components/ShowComment.vue";

    @Component({
        components: {ShowComment, PublishComment, MusicList, SheetCoverInfo}
    })
    export default class SheetDetail extends Vue {
        private sheetCover = {
            creatorImage: '',
            sheet: {}
        };
        private tags: Array<any> = [];
        private musicList = [];
        // 1,2,3 的形式
        private musicIds = '';

        @Watch("musicIds")
        getCollectionMusic() {
            this.axios.get('/musics/batch', {
                params: {
                    musicIdList: this.musicIds
                }
            }).then((response) => {
                this.musicList = response.data;
            })
        }

        created() {
            this.axios.get('/sheets', {
                params: {
                    sheetId: this.$route.params.sheetId
                }
            }).then((response) => {
                let musicSheetView = response.data.data;
                this.sheetCover.creatorImage = musicSheetView.creatorImage;
                this.sheetCover.sheet = musicSheetView.musicSheet;
                let musicIdArray = JSON.parse(musicSheetView.musicSheet.collectionMusic);
                let musicIds = '';
                if (musicIdArray.length > 0) {
                    for (let id of musicIdArray) {
                        musicIds += id + ',';
                    }
                    this.musicIds = musicIds;
                }
                // 查询标签
                let tagId: Array<any> = JSON.parse(musicSheetView.musicSheet.tag);
                if (tagId.length > 0) {
                    console.log('查询标签');
                    for (let i = 0; i < tagId.length; i++) {
                        this.axios.get('/tags', {
                            params: {
                                tagId: tagId[i]
                            }
                        }).then((response) => {
                            let tag = response.data;
                            this.tags.push(tag.tagName);
                        })
                    }
                    console.log(this.tags);
                }
            })
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
