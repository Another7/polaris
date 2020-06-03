<template>
  <div id="container">
    <div class="item">
      <div class="content-border">
        <div class="content">
          <div class="cover">
            <div>
              <el-avatar :size="140" :src="image"
                         shape="square"></el-avatar>
            </div>
            <div>
              <div class="nick-name">
                <span>{{personInfo.nickName}}</span>
                <!--                如果是本人的-->
                <div v-if="this.personInfo.id === this.$store.state.user.id">
                  <el-button @click="editPersonInfo">编辑个人资料</el-button>
                </div>
                <div v-else>
                  <el-button @click="dialogVisible = true">发私信</el-button>
                  <el-button @click="cancelFollow" v-if="this.personInfo.followed">取消关注</el-button>
                  <el-button @click="follow" v-else>关注</el-button>
                  <el-button v-if="this.personInfo.isSinger">查看歌手页</el-button>
                </div>
                <el-dialog
                        :visible.sync="dialogVisible"
                        title="发送私信">
                  <div class="message">
                    <div>
                      <span>{{this.personInfo.nickName}}</span>
                    </div>
                    <div>
                      <el-input type="textarea" v-model="content"></el-input>
                    </div>
                    <div class="send-message">
                      <el-button @click="sendMessage" type="primary">确 定</el-button>
                    </div>
                  </div>
                </el-dialog>
              </div>
              <div class="data">
                <span>动态：{{personInfo.momentNumber}}</span>|
                <span>关注：{{personInfo.followNumber}}</span>|
                <span>粉丝：{{personInfo.followerNumber}}</span>
              </div>
              <div>
                <span>所在地：{{personInfo.address}}</span>
              </div>
            </div>
          </div>
          <ClassifyTitle _title="听歌排行"></ClassifyTitle>
          <!--          <MusicList></MusicList>-->
          <!--          <ClassifyTitle _title="我创建的歌单"></ClassifyTitle>-->
          <!--          <SheetCover></SheetCover>-->
          <div class="music-rank">
            <el-table :data="musicRank" :show-header="false">
              <el-table-column
                      type="index"
                      width="50">
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <i class="el-icon-video-play"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.singer }}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.playNumber }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        private image: string = '';
        private personInfo = {
            id: 0,
            image: '',
            nickName: '因为了解',
            momentNumber: 0,
            followNumber: 0,
            followerNumber: 0,
            address: '华夏',
            isSinger: false,
            followed: false
        };
        private message = {
            senderId: this.$store.state.user.id,
            senderNickName: this.$store.state.user.nickName,
            senderImage: this.$store.state.user.avatar,
            receiverId: this.personInfo.id,
            receiverNickName: this.personInfo.nickName,
            receiverImage: this.personInfo.image,
            content: ''
        };
        private content: string = '';
        private musicRank: Array<any> = new Array<any>();
        private dialogVisible: boolean = false;

        created() {
            this.personInfo.id = parseInt(this.$route.params.id);
            this.axios.get('/users/view', {
                params: {
                    userId: this.$store.state.user.id,
                    searchUserId: this.personInfo.id
                }
            }).then((response) => {
                let userView = response.data;
                let user = userView.user;
                this.image = 'http://www.another.ren:8089/images/' + user.image;
                this.personInfo.image = user.image;
                this.personInfo.nickName = user.nickName;
                this.personInfo.momentNumber = user.momentNumber;
                this.personInfo.followNumber = user.followNumber;
                this.personInfo.followerNumber = user.followerNumber;
                this.personInfo.address = user.address;
                this.personInfo.isSinger = userView.singer;
                this.personInfo.followed = userView.followed;
                console.log(this.personInfo);
            });
            let music = {
                id: 123,
                name: '透明',
                singer: '邓紫棋',
                playNumber: 0
            };
            for (let i = 0; i < 10; i++) {
                this.musicRank.push(music);
            }
        }

        editPersonInfo() {
            this.$router.push('personInfo');
        }

        // 取消关注
        cancelFollow() {
            this.axios.delete('follow', {
                params: {
                    userId: this.$store.state.user.id,
                    followId: this.personInfo.id
                }
            }).then((response) => {
                console.log(response);
                if (response.data === true) {
                    this.personInfo.followed = false;
                }
            })
        }

        // 关注
        follow() {
            this.axios.post('/follow', {
                userId: this.$store.state.user.id,
                followId: this.personInfo.id,
                followNickName: this.personInfo.nickName,
                followImage: this.personInfo.image
            }).then((response) => {
                if (response.data === true) {
                    this.personInfo.followed = true;
                }
            });

        }

        // 发送消息
        sendMessage() {
            this.dialogVisible = false;
            let content = {
                'text': this.content
            };
            this.message.receiverId = this.personInfo.id;
            this.message.receiverNickName = this.personInfo.nickName;
            this.message.receiverImage = this.personInfo.image;
            this.message.content = JSON.stringify(content);
            this.axios.post('/messages', this.message).then((response) => {
                console.log(response);
                this.$message.success('发送成功');
            });
        }

    }
</script>

<style lang="scss" scoped>
  i {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  span {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .message {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    > .send-message {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    > div {
      margin-top: 10px;
    }
  }

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

          > .cover {
            margin-top: 20px;
            height: 140px;
            display: flex;
            justify-content: space-between;

            > div:first-child {
              width: 20%;
            }

            > div:last-child {
              width: 80%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;

              > .nick-name {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }

              > .data {
                > span {
                  margin-right: 10px;
                }
              }
            }
          }

          > .music-rank {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
