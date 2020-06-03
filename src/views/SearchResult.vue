<template>
  <div id="container">
    <div class="panel">
      <div>
        <el-row justify="center" type="flex">
          <el-col :span="8">
            <el-input @change="searchMusic" v-model="searchWord"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button icon="el-icon-search" type="primary">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-tabs @tab-click="changeTab" type="border-card">
          <el-tab-pane label="单曲">
            <el-table :data="musicTable" :show-header="false">
              <el-table-column>
                <template slot-scope="scope">
                  <i @click="play(scope.row)" class="el-icon-video-play"></i>
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span @click="goSingerPage(scope.row.singerId)"
                        style="margin-left: 10px">{{ scope.row.singer }}</span>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span @click="goAlbumPage(scope.row.belongAlbumId)" style="margin-left: 10px">《{{ scope.row.belongAlbumName }}》</span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="歌手">
            <div class="singer-box">
              <div class="singer" v-for="singer in singerTable">
                <el-avatar :src="singer.imageUrl" shape="square"></el-avatar>
                <span>{{singer.name}}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="专辑">
            <div class="album-box">
              <div class="album" v-for="album in albumTable">
                <el-avatar :src="album.imageUrl" shape="square"></el-avatar>
                <span>{{album.albumName}}</span>
                <span>{{album.singer}}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="用户">
            <div class="user-box">
              <el-table :data="userTable" :show-header="false">
                <el-table-column width="60px">
                  <template slot-scope="scope">
                    <el-avatar :src="scope.row.imageUrl" shape="square"></el-avatar>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <span @click="goUserHome(scope.row)">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" width="120px">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px; width:100px">
                      <el-button plain size="medium" type="info" v-if="scope.row.followed">已关注</el-button>
                      <el-button @click="follow(scope.row)" size="medium" v-else>关注</el-button>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import '@/utils/EventBus.ts'
    import EventBus from "@/utils/EventBus";

    @Component
    export default class SearchResult extends Vue {
        private searchWord: string = '';
        private musicTable: Array<any> = new Array<any>();
        private singerTable: Array<any> = new Array<any>();
        private albumTable: Array<any> = new Array<any>();
        private userTable: Array<any> = new Array<any>();

        created() {
            EventBus.$on('search', (searchWord: string) => {
                this.searchWord = searchWord;
            });
            if (this.$route.params.searchWord !== undefined) {
                this.searchWord = this.$route.params.searchWord;
            }
            // let music = {
            //     id: 123,
            //     name: '透明',
            //     url: 'http://www.another.ren:8089/audios/透明.mp3',
            //     belongAlbumImageUrl: 'http://www.another.ren:8089/images/another.jpg',
            //     singer: '邓紫棋',
            //     singerId: 123,
            //     belongAlbumName: '摩天动物园'
            // };
            // for (let i = 0; i < 20; i++) {
            //     this.musicTable.push(music);
            // }
        }

        // 搜索音乐
        @Watch('searchWord')
        searchMusic() {
            if (this.searchWord !== '' && this.searchWord !== undefined) {
                //查询歌曲
                this.axios.get('/musics/keyWord', {
                    params: {
                        keyWord: this.searchWord
                    }
                }).then((response) => {
                    let musicViewList = response.data;
                    this.musicTable.length = 0;
                    for (let musicView of musicViewList) {
                        let music = {
                            id: musicView.music.id,
                            name: musicView.music.name,
                            url: musicView.music.url,
                            belongAlbumImageUrl: musicView.belongAlbumImageUrl,
                            singer: musicView.music.singerName,
                            singerId: musicView.music.singerId,
                            belongAlbumName: musicView.music.belongAlbumName,
                            belongAlbumId: musicView.music.belongAlbumId
                        };
                        this.musicTable.push(music);
                    }
                });
            }
        }

        // 搜索歌手
        searchSinger() {
            if (this.searchWord !== '' && this.searchWord !== undefined) {
                // 查询歌手
                let singer = {
                    id: 123,
                    name: '邓紫棋',
                    imageUrl: require('@/assets/girl.png'),
                };
                this.singerTable.length = 0;
                for (let i = 0; i < 8; i++) {
                    this.singerTable.push(singer);
                }
            }
        }

        // 搜索专辑
        searchAlbum() {
            if (this.searchWord !== '' && this.searchWord !== undefined) {
                //TODO  查询专辑
                let album = {
                    id: 123,
                    albumName: '摩天动物园',
                    singer: '邓紫棋',
                    imageUrl: require('@/assets/girl.png'),
                };
                this.albumTable.length = 0;
                for (let i = 0; i < 8; i++) {
                    this.albumTable.push(album);
                }
            }
        }

        // 搜索用户
        searchUser() {
            if (this.searchWord !== '' && this.searchWord !== undefined) {
                // 查询用户
                this.axios.get('/users/keyWord', {
                    params: {
                        keyWord: this.searchWord,
                        userId: this.$store.state.user.id
                    }
                }).then((response) => {
                    console.log(response);
                    this.userTable.length = 0;
                    let userViewList = response.data;
                    for (let userView of userViewList) {
                        let user = {
                            id: userView.user.id,
                            name: userView.user.nickName,
                            imageUrl: 'http://www.another.ren:8089/images/' + userView.user.image,
                            followed: userView.followed
                        };
                        console.log(user);
                        this.userTable.push(user);
                    }
                });
            }
        }

        // 关注
        follow(row: any) {
            this.axios.post('/follow', {
                userId: this.$store.state.user.id,
                followId: row.id,
                followNickName: row.name,
                followImage: row.imageUrl.slice(row.imageUrl.lastIndexOf('/') + 1, row.imageUrl.length)
            }).then((response) => {
                row.followed = response.data;
            })
        }

        // 跳转到用户页面
        goUserHome(row: any) {
            console.log(row);
            console.log(row.id);
            this.$router.push({
                name: 'home',
                params: {
                    id: row.id
                }
            });
        }

        // tabs切换事件
        changeTab(tab: any) {
            switch (tab.index) {
                case '0':
                    this.searchMusic();
                    break;
                case '1':
                    this.searchSinger();
                    break;
                case '2':
                    this.searchAlbum();
                    break;
                case '3':
                    this.searchUser();
                    break;
                default:
                    break;
            }
        }

        play(row: any) {
            let music = {
                id: row.id,
                name: row.name,
                url: 'http://www.another.ren:8089/audios/' + row.url,
                belongAlbumImageUrl: 'http://www.another.ren:8089/images/' + row.belongAlbumImageUrl,
                singer: row.singer,
                singerId: row.singerId
            };
            EventBus.$emit('addRecord', music);
        }

        goSingerPage(singerId: number) {
            this.$router.push({name: 'singer', params: {}})
        }

        goAlbumPage(albumId: number) {

        }
    }
</script>

<style lang="scss" scoped>
  .central-position {
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

  .el-icon-video-play {
    font-size: 17px;

    &:hover {
      color: #2d7dca;
    }
  }

  .singer-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    > .singer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 140px;
      height: 161px;
      margin: 10px 10px;

      > span:first-child {
        width: 100%;
        height: 100%;
      }
    }
  }

  .album-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    > .album {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 140px;
      height: 182px;
      margin: 10px 10px;

      > span:first-child {
        width: 100%;
        height: 100%;
      }
    }
  }

  #container {
    min-height: 1000px;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;

    > .panel {
      width: 70%;
      background-color: #ffffff;

      > div {
        width: 90%;
        margin: 50px auto;
      }
    }

  }
</style>
