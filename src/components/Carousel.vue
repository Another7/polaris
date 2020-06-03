<template>
  <div class="block">
    <el-carousel height="336px" trigger="click">
      <el-carousel-item :key="index" v-for="(image, index) in images">
        <img :src="image" alt=""/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Carousel extends Vue {
        private images!: Array<string>;
        // constructor() {
        //     super();
        //     this.images = new Array<string>();
        //     this.images.push(require("@/assets/girl.png"));
        //     this.images.push(require("@/assets/girl.png"));
        //     this.images.push(require("@/assets/girl.png"));
        // }
        created() {
            this.images = new Array<string>();
            this.images.push(require("@/assets/leaf.jpg"));
            this.images.push(require("@/assets/TIM7.jpg"));
            this.images.push(require("@/assets/desktop.jpg"));
        }
    }
</script>

<style lang="scss" scoped>
  .block {
    text-align: center;
  }

  img {
    width: 70%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
