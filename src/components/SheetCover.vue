<template>
  <div id="container">
    <div :sheetId="sheet.id" @click="sheetDetails(sheet.id)">
      <img :src="'http://www.another.ren:8089/images/' + sheet.image" alt="">
      <div class="shadow">
        <i class="el-icon-headset"></i>
        <span>{{sheet.totalPlayCount}}</span>
      </div>
      <router-link class="title" to="">{{sheet.title}}</router-link>
      <div v-if="showCreator">{{sheet.creatorNickName}}</div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    const GreetingProps = Vue.extend({
        props: {
            sheet: {}
        }
    });


    @Component
    export default class SheetCover extends GreetingProps {
        @Prop({default: false}) showCreator!: boolean;

        sheetDetails(id: Number) {
            let sheetId = String(id);
            this.$router.push({
                name: 'sheetDetail',
                params: {
                    sheetId: sheetId
                }
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
