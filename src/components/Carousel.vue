<template>
  <div class="block">
    <el-carousel trigger="click" height="336px">
      <el-carousel-item :key="index" v-for="(image, index) in images">
        <img :src="image"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Carousel extends Vue {
        @Prop() private images: Array<string>;
        constructor(){
            super();
            this.images = new Array<string>();
            this.images.push(require("@/assets/girl.png"));
            this.images.push(require("@/assets/girl.png"));
            this.images.push(require("@/assets/girl.png"));
        }
    }
</script>

<style scoped lang="scss">
  #container {
    .block {
      text-align: center;
    }
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
