<template>
  <div id="container">
    <div>
      <div class="sheet-info">
        <div class="cover">
          <el-avatar :src="sheet.image" shape="square"></el-avatar>
        </div>
        <div class="info">
          <div>
            <span>歌单：{{sheet.title}}</span>
            <el-button @click="editSheet(sheet.id)" plain style="margin-left: 100px" v-if="showEditButton">编辑
            </el-button>
            <el-button @click="deleteSheet(sheet.id)" plain style="margin-left: 10px" v-if="showDeleteButton">删除
            </el-button>
          </div>

          <div class="creator">
            <span><el-avatar :src="sheet.creatorAvatar"></el-avatar></span>
            <span>{{sheet.creatorName}}</span>
            <span>创建日期：{{sheet.createTime}}</span>
          </div>
          <div>
            <el-button type="primary">播放</el-button>
            <el-button type="primary">分享</el-button>
          </div>
          <div v-if="sheet.tags.length > 0">
            <span>标签：</span>
            <span class="tags">
              <el-tag>demo</el-tag>
              <el-tag>demo</el-tag>
              <el-tag>demo</el-tag>
            </span>
          </div>
          <div v-if="sheet.description !== ''">
            简介：<span>{{sheet.description}}</span>
          </div>
        </div>
      </div>
      <div class="music">
        <el-table
                :data="sheet.musicTable"
                style="width: 100%">
          <el-table-column
                  type="index"
                  width="50">
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <i @click="play(scope.row)" class="el-icon-video-play"></i>
            </template>
          </el-table-column>
          <el-table-column label="歌曲名称">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="歌手">
            <template slot-scope="scope">
              <span>{{scope.row.singerName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="专辑">
            <template slot-scope="scope">
              <span>{{scope.row.belongAlbumName}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import EventBus from "@/utils/EventBus";

    @Component
    export default class MySheet extends Vue {
        private sheetId: number = 0;
        private sheet: any = {
            id: 123,
            title: 'Another',
            image: require('@/assets/TIM5.jpg'),
            creatorId: 12,
            creatorName: '高鱼',
            creatorAvatar: require('@/assets/TIM5.jpg'),
            createTime: '2020-03-04',
            tags: [],
            description: '',
            musicTable: []
        };

        private showEditButton: boolean = true;
        private showDeleteButton: boolean = true;

        @Watch('sheetId')
        refreshSheet() {
            console.log('sheetId = ' + this.sheetId);
            this.axios.get('/sheets', {
                params: {
                    sheetId: this.sheetId
                }
            }).then((response) => {
                console.log(response.data.data);
                let sheetView = response.data.data;
                let sheet = sheetView.musicSheet;
                this.sheet.id = sheet.id;
                this.sheet.title = sheet.title;
                this.sheet.image = 'http://www.another.ren:8089/images/' + sheet.image;
                this.sheet.creatorId = sheet.creatorId;
                this.sheet.creatorName = sheet.creatorName;
                this.sheet.creatorAvatar = 'http://www.another.ren:8089/images/' + sheetView.creatorImage;
                this.sheet.createTime = sheet.createTime;
                this.sheet.musicTable = sheetView.musicList;
            })
        }

        created() {
            EventBus.$on('updateSheetId', (sheetId: number, showButton: boolean) => {
                this.sheetId = sheetId;
                this.showEditButton = showButton;
                this.showDeleteButton = showButton;
            });
            this.sheetId = parseInt(this.$route.params.sheetId);
            // let music = {
            //     id: 123,
            //     name: '过活',
            //     singer: '高鱼',
            //     singerId: 12,
            //     album: '过活',
            //     albumId: 1234
            // };
            // this.sheet.musicTable.length = 0;
            // for (let i = 0; i < 10; i++) {
            //     this.sheet.musicTable.push(music);
            // }
        }

        editSheet(sheetId: number) {
            let id = String(sheetId);
            EventBus.$emit('updateSheetEdit', id);
            this.$router.push({name: 'editSheet', params: {sheetId: id}});
        }

        deleteSheet(sheetId: number) {
            let id = String(sheetId);
            this.axios.delete('/sheets', {
                params: {
                    sheetId: id
                }
            }).then((response) => {
                console.log(response);
                if (response.data === 1) {
                    this.$message.success('删除成功');
                }
            })
        }
    };
</script>

<style lang="scss" scoped>
  .tags {
    > span {
      margin-right: 10px;
    }
  }

  .sheet-info {
    display: flex;
    margin-top: 30px;

    > .cover {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40%;
      height: 200px;

      > span {
        width: 200px;
        height: 200px;
      }
    }

    > .info {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      > .creator {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        > span {
          margin-right: 10px;
        }
      }
    }

  }

  .music {
    margin-top: 20px;
  }
</style>
