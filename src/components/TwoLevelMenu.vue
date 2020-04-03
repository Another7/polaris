<template>
  <div id="container">
    <div>
      <ul>
        <li><router-link to="/recommend">推荐</router-link></li>
        <li><router-link to="/ranking">排行榜</router-link></li>
        <li><router-link to="/sheet">歌单</router-link></li>
        <li><router-link to="/singer">歌手</router-link></li>
        <li><router-link to="/newMusic">新碟上架</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class TwoLevelMenu extends Vue {

    }
</script>

<style scoped lang="scss">
  #container {
    width: 100%;
    background-color: #c20c0c;

    > div {
      width: 55%;
      margin: 0 auto;
      text-align: center;

      ul {
        display: flex;
        width: 100%;
        list-style: none;
        justify-content: space-around;
        height: 35px;
        min-width: 700px;
        align-items: center;
        margin: 0 auto;

        > li {
          color: #ffffff;
          width: 10%;
          display: flex;
          justify-content: center;
          border-radius: 100px;

          &:hover {
            background-color: #9b0909;
          }

          > a {
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
