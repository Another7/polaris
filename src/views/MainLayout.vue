<template>
  <!--应用主布局-->
  <div id="container">
    <div class="item">
      <OneLevelMenu></OneLevelMenu>
    </div>
    <div class="item">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="item">
      <Footer></Footer>
    </div>
    <div class="item">
      <MusicBar></MusicBar>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import OneLevelMenu from "@/components/OneLevelMenu.vue";
    import Footer from "@/components/Footer.vue";
    import TwoLevelMenu from "@/components/TwoLevelMenu.vue";
    import Carousel from "@/components/Carousel.vue";
    import ClassifyTitle from "@/components/ClassifyTitle.vue";
    import MusicBar from "@/components/MusicBar.vue";

    @Component({
        components: {MusicBar, ClassifyTitle, Carousel, TwoLevelMenu, Footer, OneLevelMenu}
    })
    export default class HelloWorld extends Vue {
        @Prop() private msg!: string;
    }
</script>

<style lang="scss" scoped>
  @import "../styles/common.css";

  #container {
  }
</style>
