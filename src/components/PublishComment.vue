<template>
  <div id="container">
    <div class="comment-number">
      <span>评论</span>
      <span>{{commentCount}}</span>
    </div>
    <div class="comment-area">
      <div class="comment-input">
        <img :src="'http://www.another.ren:8089/images/' + this.$store.state.user.avatar"/>
        <textarea placeholder="评论" style="resize: none" v-model="content"></textarea>
      </div>
    </div>
    <div class="comment-limit">
      <span>140</span>
      <span @click="publishComment" class="comment-button">
          评论
      </span>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import EventBus from "@/utils/EventBus";

    const GreetingProps = Vue.extend({
        props: {
            commentCount: Number,
            musicId: Number
        }
    });

    @Component
    export default class PublishComment extends GreetingProps {
        private content: string = '';

        publishComment() {
            this.axios.post('/comments', {
                type: 0,
                content: this.content,
                thumbNumber: 0,
                recordId: this.musicId,
                commentatorId: this.$store.state.user.id,
                commentatorNickName: this.$store.state.user.nickName,
                commentatorImage: this.$store.state.user.avatar
            }).then((response) => {
                console.log(response);
                if (response.data === 1) {
                    this.content = '';
                    EventBus.$emit('updateCommentCount');
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 150px;
  }

  #container > div {
    /*margin: 0 auto;*/
  }

  .comment-number {
    border-bottom: 2px solid #c20c0c;
  }

  .comment-number > span:first-child {
    font-size: larger;
    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
  }

  .comment-area {
  }

  .comment-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .comment-input > img {
    width: 50px;
    height: 50px;
  }

  textarea {
    height: 60px;
    width: 90%;

  }

  .comment-limit {
    text-align: right;
  }

  .comment-button {
    background-color: #2d7dca;
    color: white;
    padding: 2px 10px;
    cursor: pointer;
    margin-left: 10px;
  }
</style>
