<template>
  <div id="container">
    <div>
      <div class="title">网易云音乐</div>
      <div class="items">
        <ul>
          <li><router-link to="/discoverMusic">发现音乐</router-link></li>
          <li><router-link to="/myMusic">我的音乐</router-link></li>
          <li><router-link to="/friend">朋友</router-link></li>
        </ul>
      </div>
      <div class="search-info">
        <div>
          <input class="search-music" placeholder="搜索音乐"></input>
        </div>
        <div>
          <span>创作者中心</span>
        </div>
        <div>
          <el-dropdown @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link">
              <i @click="login()" class="">
                <span>登录</span>
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class OneLevelMenu extends Vue {
        login() {

        }

        handleCommand() {

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
    @include centrality(space-around);
    .search-music{
      border-radius: 25px;
    }
  }


</style>
