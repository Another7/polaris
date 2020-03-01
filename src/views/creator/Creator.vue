<template>
  <div id="container">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <div class="left">
              云上音乐
            </div>
          </el-col>
          <el-col :span="20">
            <div>
              <div class="right">
                <span>因为了解</span>
                <el-avatar
                        src="https://p1.music.126.net/SA5XL3t3I83OtVWMqNilyg==/18644418674164876.jpg?param=180y180"></el-avatar>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div>
            <el-row class="publish-works">
              <el-col>
                <router-link to="/publishWorks">发布作品</router-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-menu
                        active-text-color="red"
                        background-color="#fafafa"
                        default-active="1">
                  <el-menu-item index="1">
                    <span slot="title">首页</span>
                  </el-menu-item>
                  <el-menu-item index="2">
                    <span slot="title">作品数据</span>
                  </el-menu-item>
                  <el-menu-item index="3">
                    <span slot="title">粉丝中心</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Creator extends Vue {

    }
</script>

<style lang="scss" scoped>
  .el-header, .el-footer {
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #fafafa;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #fafafa;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-row {
    margin-bottom: 20px;

    > div {
      height: 100%;
    }
  }

  .left {
    text-align: center;
    color: red;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > span {
      margin-right: 30px;
    }
  }

  .publish-works {
    margin: 10px auto;

    a {
      display: inline-block;
      color: white;
      background-color: red;
      width: 100px;
      border-radius: 25px;
      padding: 10px 20px;
    }
  }
</style>
