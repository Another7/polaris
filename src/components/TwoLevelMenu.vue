<template>
  <div id="container">
    <div>
      <ul>
        <li>推荐</li>
        <li>排行榜</li>
        <li>歌单</li>
        <li>歌手</li>
        <li>新碟上架</li>
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
        justify-content: space-around;
        height: 35px;
        align-items: center;

        > li {
          color: #ffffff;
          width: 10%;
          display: flex;
          justify-content: center;
          border-radius: 100px;

          &:hover {
            background-color: #9b0909;
          }
        }
      }
    }
  }
</style>
