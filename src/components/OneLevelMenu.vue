<template>
  <div id="container">
    <div>
      <div class="title">云上音乐</div>
      <div class="items">
        <ul>
          <li>
            <router-link to="/discoverMusic">发现音乐</router-link>
          </li>
          <li>
            <!--            <router-link to="/myMusic">我的音乐</router-link>-->
            <span @click="goMyMusic">我的音乐</span>
          </li>
          <li>
            <!--            <router-link to="/friend">朋友</router-link>-->
            <span @click="goFriend">朋友</span>
          </li>
        </ul>
      </div>
      <div class="search-info">
        <div>
          <label>
            <el-input @change="searchMusic" placeholder="搜索音乐" style="width: 120px" v-model="searchWord"></el-input>
          </label>
        </div>
        <div>
          <el-button @click="creator" round size="mini">创作者中心</el-button>
        </div>
        <div>
          <el-dropdown @command="handleCommand" placement="bottom" v-if="this.$store.state.user.isLogin">
            <span class="el-dropdown-link">
              <el-avatar :src="'http://www.another.ren:8089/images/' + this.$store.state.user.avatar"
                         size="medium"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="myIndex">我的主页</el-dropdown-item>
              <el-dropdown-item command="music">音乐页面</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="loginFormVisible = true" round size="mini" v-else>登录</el-button>
          <el-dialog :visible.sync="loginFormVisible" title="登录">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item label="账号" prop="email">
                <el-input placeholder="邮箱" v-model="loginForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
              <el-button @click="registerFormVisible = true">注 册</el-button>
              <el-button @click="submitForm('loginForm')" type="primary">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog :visible.sync="registerFormVisible" title="注册">
            <el-form :model="registerForm" :rules="rules" ref="registerForm">
              <el-form-item label="账号" prop="email">
                <el-input placeholder="邮箱" v-model="registerForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input placeholder="密码" type="password" v-model="registerForm.password"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
              <el-button @click="registerFormVisible = false">取 消</el-button>
              <el-button @click="register('registerForm')" type="primary">注 册</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Form} from "element-ui";
    import store from '@/store';
    import EventBus from "@/utils/EventBus";

    @Component
    export default class OneLevelMenu extends Vue {
        private loginFormVisible = false;
        private registerFormVisible = false;
        private loginForm = {
            email: '',
            password: ''
        };
        private registerForm = {
            email: "",
            password: ""
        };
        private rules = {
            email: [
                {
                    required: true,
                    message: '请输入邮箱',
                    trigger: 'blur'
                },
                {
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: ['blur', 'change']
                }
            ],
            password: [{
                required: true,
                message: '请输入密码',
                trigger: 'blur'
            }]
        };

        private searchWord: string = '';

        created() {
            console.log("created");
            // 默认登录，便于调试
            // store.commit('login', {
            //     id: 2,
            //     account: '123456@qq.com',
            //     nickName: '车同轨书同文',
            //     avatar: 'http://p2.music.126.net/X7f92tSJ-b0_sC1u9tgAyQ==/109951163654227442.jpg?param=177y177'
            // });
        }

        handleCommand(command: string) {
            switch (command) {
                case 'myIndex':
                    this.$router.push({
                        name: 'home',
                        params: {
                            id: this.$store.state.user.id
                        }
                    });
                    break;
                case 'music':
                    this.$router.push({
                        name: 'music',
                        params: {
                            musicId: '11'
                        }
                    });
                    break;
                case 'loginOut':
                    store.commit('loginOut');
                    this.$router.push('/recommend');
                    break;
                default:
                    break;
            }
        }

        submitForm(formName: string) {
            (this.$refs[formName] as Form).validate((valid: boolean) => {
                if (valid) {
                    this.axios.get('/users/login', {
                        params: this.loginForm
                    }).then((response) => {
                        console.log(response);
                        let data = response.data;
                        let code = data.code;
                        // 1 表示登录成功
                        if (code === '1') {
                            this.loginFormVisible = false;
                            store.commit('login', {
                                account: data.entity.email,
                                avatar: data.entity.image,
                                nickName: data.entity.nickName,
                                id: data.entity.id
                            });
                            // 2 表示账号密码不匹配，登录失败
                        } else if (code === '2') {
                            this.$message('密码错误');
                            console.log('2');
                            // 0 表示该账号未注册
                        } else if (code === '0') {
                            this.$message('账号未注册');
                            console.log('0')
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                    this.loginFormVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }

        // 用户注册
        register(formName: string) {
            (this.$refs[formName] as Form).validate((valid: boolean) => {
                if (valid) {
                    this.axios.post('/users', {
                        email: this.registerForm.email,
                        password: this.registerForm.password,
                        notification: JSON.stringify({
                            "thumbsUp": 1,
                            "message": 1,
                            "commit": 1
                        }),
                        nickName: '',
                        authentication: false
                    }).then((response) => {
                        console.log(response);
                        let data = response.data;
                        let code = data.code;
                        // 0 表示注册失败
                        if (code === '0') {
                            // 1 表示注册成功
                            this.$message.error('注册失败，请稍后重试');
                        } else if (code === '1') {
                            this.$message.success('注册成功');
                            // 2 表示该账号已被注册
                        } else if (code === '2') {
                            this.$message.warning('该账号已被注册，是否忘记密码?');
                        }
                        this.registerFormVisible = false;
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            });
        }

        // 跳转至创作者中心
        creator() {
            if (!this.$store.state.user.isLogin) {
                this.$message.warning('请先登录');
                return false;
            } else {
                // 通过session存储用户登录信息
                sessionStorage.setItem('user', JSON.stringify(this.$store.state.user));
                let routeUrl = this.$router.resolve({
                    path: '/creator'
                });
                window.open(routeUrl.href, '_blank');
            }
        }

        // 用户搜索音乐
        searchMusic(word: string) {
            // 首次跳转过去
            if (this.searchWord !== '') {
                if (this.$route.name !== 'searchResult') {
                    this.$router.push({
                        name: 'searchResult',
                        params: {
                            searchWord: this.searchWord
                        }
                    });
                    // 如果是已经跳转，则直接更新searchWord，搜索结果页面监听searchWord
                } else if (this.$route.name === 'searchResult') {
                    EventBus.$emit('search', this.searchWord);
                }
            }
        }

        goMyMusic() {
            if (!this.$store.state.user.isLogin) {
                this.$message.warning('请先登录');
            } else {
                EventBus.$emit('getCollectionSheet');
                EventBus.$emit('getCollectionSheetByUserId');
                this.$router.push('myMusic');
            }
        }

        goFriend() {
            if (!this.$store.state.user.isLogin) {
                this.$message.warning('请先登录');
            } else {
                EventBus.$emit('updateMoment');
                this.$router.push('friend');
            }
        }
    }
</script>

<style lang="scss" scoped>
  $themeColor: #242424;
  $fontColor: #ffffff;

  // 水平 垂直 居中
  @mixin centrality($horizontal: center, $vertical: center) {
    display: flex;
    justify-content: $horizontal;
    align-items: $vertical;
  }

  @function avgWidth($number) {
    @return percentage(1 / $number);
  }

  #container {
    width: 100%;
    height: 70px;
    background-color: $themeColor;
    color: $fontColor;
    min-width: 1000px;
    display: flex;

    > div {
      display: flex;
      width: 90%;
      margin: 0 auto;
    }
  }

  .title {
    width: 20%;
    @include centrality;
  }

  .items {
    width: 50%;
    @include centrality;

    > ul {
      width: 100%;
      height: 100%;
      @include centrality(center);

      li {
        height: 100%;
        color: #cccccc;
        // 按照li的个数均分宽度
        width: avgWidth(3);
        @include centrality;

        &:hover {
          background-color: #000000;
          cursor: pointer;
          color: #ffffff;
        }

        > a {
          color: #cccccc;
        }
      }
    }
  }

  .search-info {
    width: 30%;
    @include centrality(space-between);

    .search-music {
      border-radius: 25px;
      height: 10px;
    }
  }
</style>
