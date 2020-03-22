<template>
  <div id="container">
    <div :sheetId="sheet.id" @click="sheetDetails(sheet.id)">
      <img :src="sheet.img" alt="">
      <div class="shadow">
        <i class="el-icon-headset"></i>
        <span>67万</span>
      </div>
      <router-link class="title" to="">{{sheet.title}}</router-link>
      <div v-if="showCreator">{{sheet.creator}}</div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Sheet} from "@/domain/Sheet";

    @Component
    export default class SheetCover extends Vue {
        @Prop({
            default: () => (
                {
                    "id": 123,
                    "title": "demo",
                    "img": require("../assets/leaf.jpg"),
                    "playNumber": 0,
                    "creator": "another",
                    "creatorId": 0
                }
            )
        })
        sheet!: Sheet;
        @Prop({default: false}) showCreator!: boolean;

        sheetDetails(id: Number) {
            this.$router.push({
                path: '/sheetDetail'
            });
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    display: inline-flex;

    > div {
      position: relative;
      width: 140px;
      height: 180px;
      margin: 10px 15px;
      text-align: left;
    }
  }

  .title {
    text-align: left;
  }

  img {
    width: inherit;
    height: 140px;
  }

  a {
    color: black;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .shadow {
    position: absolute;
    bottom: 40px;
    width: 100%;
    background-color: rgba(52, 52, 52, .5);
  }

  .shadow > span {
    color: #ccc;
  }

  .el-icon-headset {
    margin-left: 10px;
    color: #ccc;
  }
</style>
