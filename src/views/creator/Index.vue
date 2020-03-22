<template>
  <div id="container">
    <el-row justify="center" type="flex">
      <el-col v-if="singerStatus === 1">
        <div style="margin-bottom: 20px">还未入驻歌手？</div>
        <el-button @click="apply" type="primary">申请入驻</el-button>
      </el-col>
      <el-col v-else-if="singerStatus === 2">
        <div>
          已申请入驻，请耐心等待审核。
        </div>
      </el-col>
      <el-col v-else-if="singerStatus === 3">
        <div>
          <el-button @click="publishWorks" type="primary">发布专辑</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Index extends Vue {
        private user = {
            id: '',
            nickName: '',
            isLogin: false,
            account: '',
            avatar: 'https://p1.music.126.net/SA5XL3t3I83OtVWMqNilyg==/18644418674164876.jpg?param=180y180'
        };
        // 1.未申请
        // 2.已申请，审核中
        // 3.已认证
        private singerStatus = 0;

        created() {
            let user: string | null = sessionStorage.getItem('user');
            if (user !== null) {
                this.user = JSON.parse(user);
                console.log('Index 中的user');
                console.log(this.user);
            }
            // 查询歌手信息，判断歌手状态
            this.axios.get('/singers', {
                params: {
                    email: this.user.account
                }
            }).then((response) => {
                let singer = response.data;
                // 未申请入驻歌手
                if (singer === null || singer === undefined || singer === '') {
                    this.singerStatus = 1;
                } else {
                    // 已申请入驻
                    this.singerStatus = singer.authentication ? 3 : 2;
                    if (this.singerStatus === 3) {
                        this.$store.commit('passAuthentication', singer);
                    }
                }
            }).catch((reason) => {
                console.log(reason);
            });
        }

        // 申请歌手认证
        apply() {
            if (this.singerStatus === 1) {
                this.axios.post('/singers', {
                    email: this.user.account,
                    password: '123456',
                    nickName: this.user.nickName,
                    authentication: false,
                    userId: this.user.id
                }).then((response) => {
                    //TODO 状态整理
                    if (response.data.code === 1) {
                        this.singerStatus = 2;
                    } else if (response.data.code === 2) {
                        this.singerStatus = 2;
                    }
                    this.singerStatus = 2;
                    this.showMessage();
                }).catch((error) => {
                    console.log(error);
                    this.showMessage();
                });
            }
        }

        showMessage() {
            this.$notify({
                title: '已申请',
                message: '等待审核',
                type: 'success'
            });
        }

        publishWorks() {
            this.$router.push('publishWorks');
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    background-color: #ffffff;
    padding: 20px 0;

    > .el-row {
      margin-bottom: 20px;
    }

    .el-col-4 {
      text-align: center;
    }

    .el-col-24 {
      text-align: center;
    }
  }
</style>
