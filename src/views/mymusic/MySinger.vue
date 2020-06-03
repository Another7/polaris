<template>
  <div id="container">
    <div>
      <span class="title">我的关注</span>
      <div v-for="singer in singerList">
        <el-avatar :src="'http://www.another.ren:8089/images/' + singer.followImage" shape="square"></el-avatar>
        <span>{{singer.followNickName}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class MySinger extends Vue {
        private singerList: Array<any> = [];

        created() {
            this.axios.get('/follow/userId', {
                params: {
                    userId: this.$store.state.user.id
                }
            }).then((response) => {
                console.log(response);
                this.singerList.length = 0;
                this.singerList = response.data;
            });
            // let singer = {
            //     id: 123,
            //     name: '高鱼',
            //     image: require('@/assets/TIM1.jpg')
            // };
            // this.singerList.length = 0;
            // for (let i = 0; i < 6; i++) {
            //     this.singerList.push(singer);
            // }
        }

    }
</script>

<style lang="scss" scoped>
  #container {
    > div {
      width: 90%;
      margin: 40px auto;

      > .title {
        width: 100%;
        display: inline-block;
        font-size: 40px;
        border-bottom: #9b0909 solid 2px;
      }

      > div {
        display: flex;
        align-items: center;
        height: 100px;
        border-bottom: #99a9bf solid 1px;
        padding: 10px 0;

        > span {
          height: 80px;
          width: 80px;
          margin-right: 20px;
        }
      }
    }
  }
</style>
