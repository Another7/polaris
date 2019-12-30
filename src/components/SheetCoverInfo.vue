<template>
  <div id="container">
    <div>
      <div class="cover">
        <img src="../assets/TIM4.jpg" style="width: 200px; height: 200px;">
      </div>
      <div class="info">
        <div class="title">
          <div>歌单</div>
          <div>I love it when you call me Señorita</div>
        </div>
        <div class="creator">
          <div>
            <img src="../assets/TIM5.jpg">
          </div>
          <div>
            <a href="#">Senorita</a>
          </div>
          <div>
            <span>2019-06-06 创建</span>
          </div>
        </div>
        <div class="operation">
          <div>button</div>
          <div>button</div>
          <div>button</div>
          <div>button</div>
          <div>button</div>
        </div>
        <div class="tag">
          <div>标签：</div>
          <div>
            <span>欧美</span>
            <span>轻音乐</span>
            <span>舒缓</span>
          </div>
        </div>
        <div>
          介绍：
          <br/>
          I love it when you call me Señorita

            I love it when you call me Señorita
            I love it when you call me Señorita
            I love it when you call me Señorita
            I love it when you call me Señorita
            I love it when you call me Señorita
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class SheetCoverInfo extends Vue {

    }
</script>

<style scoped lang="scss">
  #container {
    width: 100%;

    > div {
      display: flex;
      margin: 10px auto;
    }

    .cover {
      width: 30%;
    }

    .info {
      width: 90%;

      > div {
        margin-bottom: 10px;
      }

      .title {
        display: flex;

        > div:first-child {
          width: 7%;
          height: 30px;
          color: white;
          background-color: red;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 10px;
        }

        > div:last-child {
          width: 80%;
          margin-left: 20px;
          font-size: 20px;
          display: flex;
          align-items: center;
        }
      }

      .creator {
        display: flex;
        align-items: center;
        justify-content: left;

        > div {
          margin-right: 20px;

          > img {
            width: 40px;
            height: 40px;
          }
        }
      }

      .operation {
        display: flex;

        > div {
          margin-right: 10px;
          width: 100px;
          height: 30px;
          background-color: cornflowerblue;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .tag {
        display: flex;

        > div:last-child {
          margin-left: 10px;

          > span {
            margin: 0 10px;
            color: #777777;
            background-color: #f5f5f5;
            padding: 5px 10px;
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>
