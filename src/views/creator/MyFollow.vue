<template>
  <div id="container">
    <div>
      <el-table :data="followTable" :show-header="false">
        <el-table-column width="60px">
          <template slot-scope="scope">
            <el-avatar :src="'http://www.another.ren:8089/images/' + scope.row.followImage" shape="square"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="followNickName"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class MyFollow extends Vue {
        private followTable: Array<any> = [];

        created() {
            this.axios.get('/follow/singerId', {
                params: {
                    singerId: this.$store.state.singer.id
                }
            }).then((response) => {
                console.log(response);
                this.followTable = response.data;
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>
