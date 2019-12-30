<template>
  <div id="container">
    <div id="left">
      <span class="circle"></span>
      <span class="title">热门推荐</span>
      <ul>
        <li>华语</li>
        <span>|</span>
        <li>流行</li>
        <span>|</span>
        <li>摇滚</li>
        <span>|</span>
        <li>民谣</li>
        <span>|</span>
        <li>电子</li>
      </ul>
    </div>
    <div id="right">
      <div>更多</div>
      <div class="arrow">&rarr;</div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class SubTitle extends Vue {

    }
</script>

<style scoped lang="scss">
  #container {
    background-color: #ffffff;
    height: 50px;
    display: flex;
    border-bottom: 2px solid #C10D0C;

    #left {
      display: flex;
      align-items: center;
      width: 50%;

      .circle {
        display: block;
        width: 10px;
        height: 10px;
        margin-left: 20px;
        border-radius: 10px;
        border: 5px solid #c10d0c;
      }

      .title {
        display: inline-block;
        margin-left: 20px;
        font-size: 20px;
      }

      ul {
        width: 60%;
        list-style: none;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        margin-left: 30px;

        li {
          font-size: 15px;
        }
      }
    }

    #right {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .arrow {
        color: red;
        margin-left: 10px;
        margin-right: 20px;
        font-size: 20px;
      }
    }
  }


</style>
