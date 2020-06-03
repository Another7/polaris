<template>
  <div id="container">
    <div>
      <div class="cover">
        <img :src="'http://www.another.ren:8089/images/' + this.sheetCover.sheet.image"
             style="width: 200px; height: 200px;">
      </div>
      <div class="info">
        <div class="title">
          <div>歌单</div>
          <div>{{sheetCover.sheet.title}}</div>
        </div>
        <div class="creator">
          <div>
            <img :src="'http://www.another.ren:8089/images/' + this.sheetCover.creatorImage">
          </div>
          <div>
            <router-link to="#">{{sheetCover.sheet.creatorNickName}}</router-link>
          </div>
          <div>
            <span>{{sheetCover.sheet.createTime}} 创建</span>
          </div>
        </div>
        <div class="operation">
          <el-button @click="collectionSheet" type="primary" v-if="!collected">收藏</el-button>
          <el-button type="info" v-else>已收藏</el-button>
        </div>
        <div class="tag" v-if="JSON.parse(this.sheetCover.sheet.tag).length > 0">
          <div>标签：</div>
          <div>
            <el-tag :key="tag" v-for="tag in this.tags">{{tag}}</el-tag>
          </div>
        </div>
        <div v-if="this.sheetCover.sheet.description">
          介绍:
          <br/>
          {{sheetCover.sheet.description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    const GreetingProps = Vue.extend({
        props: {
            sheetCover: Object,
            tags: Array
        }
    });
    @Component
    export default class SheetCoverInfo extends GreetingProps {
        private collected: boolean = false;

        /**
         * 收藏歌单
         */
        collectionSheet() {
            this.axios.post('/UserCollectionSheet', {
                userId: this.$store.state.user.id,
                sheetId: this.sheetCover.sheet.id,
                sheetTitle: this.sheetCover.sheet.title,
                sheetImage: this.sheetCover.sheet.image
            }).then((response) => {
                console.log(response);
                if (response.data === 1) {
                    this.$message.success('收藏成功');
                    this.collected = true;
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
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
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>
