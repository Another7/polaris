<template>
  <div id="container">
    <el-row align="middle" type="flex">
      <el-col :span="4">
        <el-avatar
                src="https://p1.music.126.net/SA5XL3t3I83OtVWMqNilyg==/18644418674164876.jpg?param=180y180"></el-avatar>
      </el-col>
      <el-col :span="20">
        因为了解
      </el-col>
    </el-row>
    <el-row>
      <el-col>音乐创作</el-col>
    </el-row>
    <el-row justify="center" type="flex">
      <el-col>
        <el-button @click="apply" v-if="!authentication">申请入驻</el-button>
        <div v-else>
          歌手作品数据
        </div>
      </el-col>
    </el-row>
    <el-row hidden="hidden">
      <el-col>
        <el-button
                @click="showMessage"
                plain>
          已申请，等待管理员审核。
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Index extends Vue {
        private authentication: boolean = false;

        apply() {
            this.axios.post('singers', {
                email: '',
                password: ''
            }).then((response) => {
                console.log(response);
                this.showMessage();
            }).catch((error) => {
                console.log(error);
                this.showMessage();
            });
        }

        showMessage() {
            this.$notify({
                title: '已申请',
                message: '等待审核',
                type: 'success'
            });
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    background-color: #ffffff;
    padding: 20px 0;

    > .el-row {
      margin-bottom: 20px;
    }

    .el-col-4 {
      text-align: center;
    }

    .el-col-24 {
      text-align: center;
    }
  }
</style>
