<template>
  <div id="container">
    <img :src="'http://www.another.ren:8089/images/' + this.comment.commentatorImage"/>
    <div>
      <div class="comment">
        <a href="">{{comment.commentatorNickName}}</a>：{{comment.content}}
      </div>
      <div class="little-pie">
          <span class="left">
            <span>{{comment.createTime}}</span>
          </span>
        <span class="right">
            <span>点赞</span>
            |
            <span>回复</span>
          </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    const GreetingProps = Vue.extend({
        props: {
            comment: Object
        }
    });
    @Component
    export default class ShowComment extends GreetingProps {

    }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px dotted #ccc;
    margin-top: 10px;
  }

  #container > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
  }

  a {
    text-decoration: none;
  }

  .little-pie {
    display: flex;
    justify-content: space-between;
  }

  img {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    margin-right: 10px;
  }
</style>
