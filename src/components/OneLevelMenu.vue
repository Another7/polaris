<template>
  <div id="container">
    <div>
      <div class="title">网易云音乐</div>
      <div class="items">
        <ul>
          <li>
            <router-link to="/discoverMusic">发现音乐</router-link>
          </li>
          <li>
            <router-link to="/myMusic">我的音乐</router-link>
          </li>
          <li>
            <router-link to="/friend">朋友</router-link>
          </li>
        </ul>
      </div>
      <div class="search-info">
        <div>
          <input class="search-music" placeholder="搜索音乐"></input>
        </div>
        <div>
          <el-button @click="creator" round size="mini">创作者中心</el-button>
        </div>
        <div>
          <el-dropdown placement="bottom" v-if="!this.$store.state.user.isLogin">
            <span class="el-dropdown-link">
              <el-avatar size="medium"
                         src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--          <el-button round size="mini" >Welcome</el-button>-->
          <el-button @click="loginFormVisible = true" round size="mini" v-else>登录</el-button>
          <el-dialog :visible.sync="loginFormVisible" title="登录">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item label="账号" prop="email">
                <el-input v-model="loginForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
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
                <el-input v-model="registerForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password"></el-input>
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
    // import * as api from '../requests/api'

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

        submitForm(formName: string) {
            (this.$refs[formName] as Form).validate((valid: boolean) => {
                if (valid) {
                    // api.apiUserLogin(this.loginForm);
                    this.axios.get('/singers/login', {
                        params: this.loginForm
                    }).then((response) => {
                        console.log(response);
                        let data = response.data.data;
                        let code = data.code;
                        // 1 表示登录成功
                        if (code === '1') {
                            console.log('1');
                            this.loginFormVisible = false;
                            store.commit('login', {
                                account: data.entity.email
                            });
                            // 2 表示账号密码不匹配，登录失败
                        } else if (code === '2') {
                            console.log('2')
                            // 0 表示该账号未注册
                        } else if (code === '0') {
                            console.log('0')
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }

        register(formName: string) {
            (this.$refs[formName] as Form).validate((valid: boolean) => {
                if (valid) {
                    this.axios.post('/singers', {
                        email: this.registerForm.email,
                        password: this.registerForm.password,
                        nickName: '',
                        authentication: false
                    }).then((response) => {
                        console.log(response);
                        let data = response.data.data;
                        let code = data.code;
                        // 0 表示注册失败
                        if (code === '0') {
                            // 1 表示注册成功
                            alert('注册失败, 请稍后重试');
                        } else if (code === '1') {
                            alert('注册成功');
                            this.registerFormVisible = false;
                            // 2 表示该账号已被注册
                        } else if (code === '2') {
                            alert('该账号已被注册，是否忘记密码?');
                        }

                    }).catch((error) => {
                        console.log(error);
                    });
                }
            });
        }

        creator() {
            let routeUrl = this.$router.resolve({
                path: '/creator'
            });
            window.open(routeUrl.href, '_blank');
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
      height: 20px;
    }
  }
</style>
