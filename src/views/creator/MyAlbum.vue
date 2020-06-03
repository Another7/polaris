<template>
  <div id="container">
    <div>
      <el-table :data="albumTable" style="width: 100%">
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                label="专辑名称"
                prop="title"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="发布时间" prop="createTime"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class MyAlbum extends Vue {
        private albumTable: Array<any> = [];

        created() {
            this.axios.get('/albums/singerId', {
                params: {
                    singerId: this.$store.state.singer.id
                }
            }).then((response) => {
                console.log(response);
                this.albumTable = response.data;
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>
