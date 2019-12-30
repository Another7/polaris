<template>
  <div id="container">
    <div class="item">
      <TwoLevelMenu></TwoLevelMenu>
    </div>
    <div class="item">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import TwoLevelMenu from "@/components/TwoLevelMenu.vue";
    @Component({
        components: {TwoLevelMenu}
    })
    export default class DiscoverMusic extends Vue {

    }
</script>

<style scoped lang="scss">

</style>
