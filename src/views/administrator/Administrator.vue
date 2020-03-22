<template>
  <div id="container">
    <el-row justify="center" type="flex">
      <el-col :span="6" v-if="!isLogin">
        <el-form :model="administrator">
          <el-form-item label="账号">
            <el-input v-model="administrator.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="administrator.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="20" v-else>
        <el-tabs @tab-click="changeTabs" tab-position="left" v-model="activeName">
          <el-tab-pane label="歌手入驻" name="first">
            <el-table
                    :data="singerTable"
                    style="width: 100%">
              <el-table-column
                      align="center"
                      type="index"
              >
              </el-table-column>
              <el-table-column
                      align="center"
                      label="账号"
                      prop="email"
              >
              </el-table-column>
              <el-table-column
                      align="center"
                      label="昵称"
                      prop="nickName"
                      tooltip-effect="dark"
              >
              </el-table-column>
              <el-table-column
                      align="center"
                      label="电话"
                      prop="tel">
              </el-table-column>
              <el-table-column
                      align="center"
                      label="申请时间"
                      prop="registerTime">
              </el-table-column>
              <el-table-column
                      align="center"
                      label="状态"
                      prop="authentication">
              </el-table-column>
              <el-table-column
                      align="center"
                      fixed="right"
                      label="操作"
              >
                <template slot-scope="scope">
                  <el-button @click="authenticationPass(scope.row)" size="small" type="primary">通过</el-button>
                  <el-button @click="authenticationRefuse(scope.row)" size="small" type="danger">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="音乐审核" name="second">
            <el-button @click="multiplePass" type="primary">批量通过</el-button>
            <el-button @click="multipleRefuse" type="danger">批量拒绝</el-button>
            <el-table
                    :data="musicTable"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    style="width: 100%">
              <el-table-column
                      type="selection">
              </el-table-column>
              <el-table-column
                      label="歌曲名称"
                      prop="name"
              ></el-table-column>
              <el-table-column
                      label="作者"
                      prop="singerName"
              ></el-table-column>
              <el-table-column
                      :filter-method="albumFilterMethod"
                      :filters="albumFilter"
                      label="所属专辑"
                      prop="belongAlbumName"
              ></el-table-column>
              <el-table-column
                      fixed="right"
                      label="操作"
                      width="300">
                <template slot-scope="scope">
                  <el-button @click="play(scope.row)" size="small">试听</el-button>
                  <el-button @click="musicPass(scope.row)" size="small" type="primary">通过</el-button>
                  <el-button @click="musicRefuse(scope.row)" size="small" type="danger">拒绝</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="首页轮播" name="third"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        watch: {
            isLogin: function (singerArray) {
                this.axios.get('/singers/all').then((response: any) => {
                    console.log(singerArray);
                    singerArray = response.data;
                    console.log(singerArray);
                    // 如何访问类Administrator中的数据呢？
                })
            }
        }
    })
    export default class Administrator extends Vue {
        private activeName: string = "first";
        private isLogin: boolean = false;
        private administrator = {
            account: '',
            password: ''
        };
        // 申请入驻歌手表格数据
        private singerTable = Array<any>();
        private musicTable = Array<any>();
        private albumFilter = Array<any>();
        private multipleSelection = Array<any>();


        created() {
            console.log('admin created');
            // let isLogin: string | null = sessionStorage.getItem('adminIsLogin');
            let isLogin: string | null = localStorage.getItem('adminIsLogin');
            if (isLogin !== null && isLogin === 'true') {
                this.isLogin = true;
                this.getSingers();
                console.log('自动登录');
            }
        }

        // 用户登录
        login() {
            this.axios.get('/administrator', {
                params: {
                    account: this.administrator.account,
                    password: this.administrator.password
                }
            }).then((response: any) => {
                if (response.data === '') {
                    this.$message.warning('账号或密码错误');
                } else if (response.data.id) {
                    // 登录成功
                    this.isLogin = true;
                    sessionStorage.setItem('adminIsLogin', 'true');
                    localStorage.setItem('adminIsLogin', 'true');
                    // 获取歌手数据
                    this.getSingers();
                }
            });
        }

        // 获取歌手申请入驻数据
        getSingers() {
            this.axios.get('/singers/all').then((response: any) => {
                console.log(response.data);
                let singerList: Array<object> = response.data;
                this.singerTable.length = 0;
                singerList.forEach((singer: any) => {
                    let tableRow = {
                        id: '',
                        email: '',
                        nickName: '',
                        tel: 0,
                        registerTime: '',
                        authentication: ''
                    };
                    tableRow.id = singer.id;
                    tableRow.email = singer.email;
                    tableRow.nickName = singer.nickName;
                    tableRow.tel = singer.tel;
                    tableRow.registerTime = singer.registerTime;
                    tableRow.authentication = singer.authentication ? '已认证' : '未认证';
                    this.singerTable.push(tableRow);
                });
            })
        }

        // 获取待审核音乐数据
        getMusics() {
            this.axios.get('/musics').then((response: any) => {
                console.log(response);
                this.albumFilter.length = 0;
                this.musicTable.length = 0;
                this.musicTable = response.data;

                this.musicTable.forEach((music: any) => {
                    let album = {
                        text: '',
                        value: ''
                    };
                    album.text = music.belongAlbumName;
                    album.value = music.belongAlbumName;
                    // 去重处理
                    let flag = true;
                    for (let i = 0; i < this.albumFilter.length; i++) {
                        if (this.albumFilter[i].value === album.value) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        this.albumFilter.push(album);
                    }
                })
            });
        }

        // 歌手认证通过
        authenticationPass(row: any) {
            this.axios.put('/singers', {
                id: row.id,
                authentication: true
            }).then((response: any) => {
                console.log(response.data);
            });
            this.singerTable.forEach((info, index) => {
                if (info.id === row.id) {
                    this.singerTable.splice(index, 1);
                }
            });
        }

        // 歌手认证拒绝
        authenticationRefuse(row: any) {
            this.axios.delete('/singers', {
                params: {
                    id: row.id
                }
            }).then((response: any) => {
                console.log(response);
            });
            this.singerTable.forEach((info, index) => {
                if (info.id === row.id) {
                    this.singerTable.splice(index, 1);
                }
            });
        }

        // 多选选择操作
        handleSelectionChange(val: any) {
            this.multipleSelection = val;
        }

        // 音乐审核通过
        musicPass(row: any) {
            this.axios.put('/musics/verify', {
                ids: row.id
            }).then((response: any) => {
                this.musicTable.forEach((music, index) => {
                    if (music.id === row.id) {
                        this.musicTable.splice(index, 1);
                    }
                });
                console.log(response);
            }).catch((error: any) => {
                console.log(error);
            });

        }

        // 音乐多选审核通过
        multiplePass() {
            if (this.multipleSelection.length > 0) {
                let ids: string = '';
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    ids += this.multipleSelection[i].id + ','
                }
                console.log(ids);
                this.axios.put('/musics/verify', {
                    ids: ids
                }).then((response: any) => {
                    // 更新待审核音乐表格
                    this.musicTable = this.musicTable.filter((music, index) => {
                        return !ids.includes(music.id);
                    });
                }).catch((error: any) => {
                    console.log(error);
                });
            }
        }

        // 音乐审核拒绝
        musicRefuse(row: any) {
            this.musicTable.forEach((music, index) => {
                if (music.id === row.id) {
                    this.musicTable.splice(index, 1);
                }
            });
        }

        // 音乐多选审核拒绝
        multipleRefuse() {

        }

        // 切换导航页
        changeTabs(tab: any, event: any) {
            // tab.index
            // 0. 歌手入驻
            // 1. 音乐审核
            // 2. 首页轮播
            console.log(tab.index);
            switch (tab.index) {
                case '0':
                    this.getSingers();
                    break;
                case '1':
                    this.getMusics();
                    break;
                default:
                    break;
            }
        }

        // 音乐试听
        play(row: any) {
        }

        // 专辑过滤器比较方法
        albumFilterMethod(value: any, row: any, column: any) {
            const property = column['property'];
            return row[property] === value;
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    padding: 10px 10px;
  }
</style>
