<template>
  <div id="container">
    <div class="box">
      <div>
        <div class="left">
          <el-avatar :src="image" shape="circle"></el-avatar>
        </div>
        <div class="right">
          <div>
            <div>
              单曲：<span>{{music.name}}</span>
            </div>
            <div>
              歌手：<span>
              <router-link
                      :to="{ name: 'singer', params: { userId: music.singerId }}">{{music.singerName}}</router-link>
            </span>
            </div>
            <div>
              所属专辑：<span>
              <router-link
                      :to="{ name: 'album', params: { albumId: music.belongAlbumId }}">{{music.belongAlbumName}}</router-link>
            </span>
            </div>
            <div>
              <el-button type="primary">播放</el-button>
              <el-button @click="shareDialogVisible = true" type="primary">分享</el-button>
              <el-dialog
                      :visible.sync="shareDialogVisible"
                      title="分享"
                      width="30%">
                <span class="share">
                  <el-input v-model="content.text"></el-input>
                  <el-card>
                      <label>单曲</label> {{music.name}}
                  </el-card>
                  <el-button @click="shareMusic" type="primary">分享</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
      <div>
        <publish-comment :commentCount="commentCount" :musicId="this.music.id"></publish-comment>
      </div>
      <div class="comment">
        <show-comment :comment="comment" :key="index" v-for="(comment, index) in commentList"></show-comment>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import EventBus from "@/utils/EventBus";
    import PublishComment from "@/components/PublishComment.vue";
    import ShowComment from "@/components/ShowComment.vue";

    @Component({
        components: {ShowComment, PublishComment}
    })
    export default class Music extends Vue {
        private image: string = '';
        private music = {
            id: 0,
            image: '',
            name: '',
            singerName: '',
            singerId: 0,
            belongAlbumName: '',
            belongAlbumId: 0
        };

        private musicId = 0;

        private commentCount = 0;
        private commentList = [];

        private shareDialogVisible = false;
        private content = {
            text: '',
            music: this.music,
            image: ''
        };

        @Watch('musicId')
        getMusicView() {
            console.log('music watched');
            // 获取音乐页面视图
            this.axios.get('/musics/view', {
                params: {
                    musicId: this.musicId
                }
            }).then((response) => {
                let musicView = response.data;
                let music = musicView.music;
                console.log(musicView);
                this.image = 'http://www.another.ren:8089/images/' + musicView.belongAlbumImageUrl;
                this.music.id = music.id;
                this.music.image = musicView.belongAlbumImageUrl;
                this.music.name = music.name;
                this.music.singerName = music.singerName;
                this.music.singerId = music.singerId;
                this.music.belongAlbumName = music.belongAlbumName;
                this.music.belongAlbumId = music.belongAlbumId;
            });
            // 获取该音乐评论
            this.axios.get('/comments', {
                params: {
                    musicId: this.musicId
                }
            }).then((response) => {
                let commentList = response.data;
                console.log(commentList);
                this.commentCount = commentList.length;
                this.commentList = commentList;

            })
        }

        created() {
            console.log(this.$route.params.musicId);
            this.musicId = parseInt(this.$route.params.musicId);
            EventBus.$on('updateMusicId', (musicId: number) => {
                this.musicId = musicId;
            });
            EventBus.$on('updateCommentCount', () => {
                // 获取该音乐评论
                this.axios.get('/comments', {
                    params: {
                        musicId: this.musicId
                    }
                }).then((response) => {
                    let commentList = response.data;
                    console.log(commentList);
                    this.commentCount = commentList.length;
                    this.commentList = commentList;
                })
            })
        }

        // 分享音乐到动态
        shareMusic() {
            this.axios.post('/moments', {
                creatorId: this.$store.state.user.id,
                creatorNickName: this.$store.state.user.nickName,
                creatorImage: this.$store.state.user.avatar,
                content: JSON.stringify(this.content),
                type: 0,
                thumbNumber: 0
            }).then((response) => {
                this.shareDialogVisible = false;
                console.log(response);
                if (response.data === 1) {
                    this.$message.success('分享成功');
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
  .share {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 300px;
  }

  #container {
    width: 100%;

    margin: 0 auto;
    background-color: #f5f5f5;

    > .box {
      width: 70%;
      margin: 0 auto;
      min-height: 600px;
      background-color: #ffffff;

      > div {
        width: 90%;
        margin: 0 auto;
        background-color: #ffffff;
        display: flex;
        justify-content: space-between;

        > .left {
          width: 20%;

          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;

          > span {
            width: 140px;
            height: 140px;
          }
        }

        > .right {
          width: 70%;
          min-height: 300px;

          > div {
            display: flex;
            justify-content: flex-start;
            flex-direction: column;

            > * {
              margin-top: 20px;
            }
          }
        }
      }

      .comment {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
