<template>
  <div id="container">
    <div>
      <MusicList :musicList="musicList" playCount="348"></MusicList>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MusicList from "@/components/MusicList.vue";

    @Component({
        components: {MusicList}
    })
    export default class RecommendMusic extends Vue {
        private musicList: Array<any> = [];

        created() {
            this.axios.get('/recommend/music', {
                params: {
                    userId: this.$store.state.user.id
                }
            }).then((response) => {
                this.musicList.length = 0;
                this.musicList = response.data;
            })
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    width: 80%;
    margin: 0 auto;
  }
</style>
