<template>
  <div id="container">
    <el-row justify="center" type="flex">
      <el-col :span="6" v-if="!isLogin">
        <el-form :model="administrator">
          <el-form-item label="账号">
            <el-input v-model="administrator.account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="administrator.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-else>
        <el-tabs @tab-click="handleClick" tab-position="left" v-model="activeName">
          <el-tab-pane label="歌手入驻" name="first">
            <el-table
                    :data="tableData"
                    style="width: 100%">
              <el-table-column
                      label="日期"
                      prop="date"
                      width="180">
              </el-table-column>
              <el-table-column
                      label="姓名"
                      prop="name"
                      width="180">
              </el-table-column>
              <el-table-column
                      label="地址"
                      prop="address">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="音乐审核" name="second">

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Administrator extends Vue {
        private activeName: string = "first";
        private isLogin: boolean = false;
        private administrator = {
            account: '',
            password: ''
        };
        private tableData = [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }];

        login() {
            this.isLogin = true;
        }

        handleClick(tab: any, event: Event) {
            let demo = {
                name: 'demo',
                age: 12
            };
            console.log(typeof demo);
            let another: string = JSON.stringify(demo);
            console.log(typeof another);
            let json = JSON.parse(another);
            console.log(json);
            console.log(another);
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    padding: 20px 20px;
  }
</style>
