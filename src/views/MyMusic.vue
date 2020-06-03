<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div class="navigation">
            <el-menu>
              <el-menu-item @click="goMySinger" index="1">
                <span slot="title">我的关注</span>
              </el-menu-item>
            </el-menu>
            <el-collapse>
              <el-collapse-item name="1" title="创建的歌单">
                <div>
                  <el-menu>
                    <el-menu-item :key="sheet.id" @click="goMySheet(sheet.id, true)" v-for="(sheet) in createSheet">
                      <span class="avatar"><el-avatar :src="sheet.image" shape="square"></el-avatar></span>
                      <span slot="title">{{sheet.title}}</span>
                    </el-menu-item>
                    <el-menu-item>
                      <div style="margin: 0 auto">
                        <el-button @click="newSheetVisible = true" type="primary">新建歌单</el-button>
                        <el-dialog
                                :visible.sync="newSheetVisible"
                                title="新建歌单"
                                width="30%">
                          <span>
                            <el-input placeholder="请输入歌单名称" v-model="newSheetName"></el-input>
                          </span>
                          <span class="dialog-footer" slot="footer">
                            <el-button @click="newSheetVisible = false">取 消</el-button>
                            <el-button @click="createNewSheet" type="primary">确 定</el-button>
                          </span>
                        </el-dialog>
                      </div>
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-collapse-item>
              <el-collapse-item name="2" title="收藏的歌单">
                <div>
                  <el-menu>
                    <el-menu-item :key="sheet.id" @click="goMySheet(sheet.id, false)" v-for="sheet in collectSheet">
                      <span class="avatar"><el-avatar :src="sheet.image" shape="square"></el-avatar></span>
                      <span slot="title">{{sheet.name}}</span>
                    </el-menu-item>
                  </el-menu>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="sub-content">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ClassifyTitle from "@/components/ClassifyTitle.vue";
    import EventBus from "@/utils/EventBus";

    @Component({
        components: {ClassifyTitle}
    })
    export default class MyMusic extends Vue {
        private createSheet: Array<any> = [];
        private collectSheet: Array<any> = [];
        private newSheetVisible: boolean = false;
        private newSheetName: string = '';

        created() {
            // 查询用户创建的歌单
            EventBus.$on('getCollectionSheet', () => {
                this.axios.get('/sheets/creatorId', {
                    params: {
                        creatorId: this.$store.state.user.id
                    }
                }).then((response) => {
                    let sheetList = response.data;
                    this.createSheet.length = 0;
                    for (let sheet of sheetList) {
                        sheet.image = 'http://www.another.ren:8089/images/' + sheet.image;
                        this.createSheet.push(sheet);
                    }
                });
            });
            // 查询用户收藏的歌单
            EventBus.$on('getCollectionSheetByUserId', () => {
                this.axios.get('/UserCollectionSheet/userId', {
                    params: {
                        userId: this.$store.state.user.id
                    }
                }).then((response) => {
                    console.log(response);
                    let collectionSheet = response.data;
                    this.collectSheet.length = 0;
                    for (let cSheet of collectionSheet) {
                        let sheet = {
                            id: cSheet.sheetId,
                            name: cSheet.sheetTitle,
                            image: 'http://www.another.ren:8089/images/' + cSheet.sheetImage
                        };
                        this.collectSheet.push(sheet);
                    }
                })
            });

            // console.log('myMusic');
            // let sheet = {
            //     id: 123,
            //     name: '明智之举',
            //     image: require('@/assets/TIM3.jpg')
            // };
            // this.collectSheet.length = 0;
            // for (let i = 0; i < 3; i++) {
            //     this.createSheet.push(sheet);
            //     this.collectSheet.push(sheet);
            // }
        }

        // 新建歌单
        createNewSheet() {
            console.log(this.newSheetName);
            this.newSheetVisible = false;
            this.axios.post('/sheets', {
                title: this.newSheetName,
                creatorId: this.$store.state.user.id,
                creatorNickName: this.$store.state.user.nickName,
                image: 'IU.jpg',
                collectionNumber: 0,
                totalPlayCount: 0,
                shareCount: 0,
                collectionMusic: JSON.stringify([])
            }).then((response) => {
                console.log(response);
                if (response.data === 1) {
                    EventBus.$emit('getCollectionSheet');
                    this.$message.success('创建成功');
                }
            })
        }

        goMySinger() {
            this.$router.push({path: 'mySinger'});
        }

        goMySheet(id: number, showButton: boolean) {
            let sheetId: string = String(id);
            this.$router.push({
                name: 'mySheet',
                params: {
                    sheetId: sheetId
                }
            });
            EventBus.$emit('updateSheetId', sheetId, showButton);
        }
    }
</script>

<style lang="scss" scoped>
  .avatar {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-right: 10px;

    > span {
      width: 100%;
      height: 100%;
    }
  }

  .el-menu-item {
    display: flex;
    padding: 0 10px;
  }

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
          }

          .sub-content {
            width: 80%;
            background-color: #ffffff;
          }
        }
      }
    }

  }
</style>
