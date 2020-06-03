<template>
  <div id="container">
    <div>
      <el-form :model="formData" label-width="80px">
        <el-form-item label="歌单名称:">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <div class="cover">
            <el-upload
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess"
                    :show-file-list="false"
                    accept="image/*"
                    action="http://www.another.ren:8989/test/upload"
                    class="avatar-uploader"
                    name="files">
              <img :src="image" class="avatar" v-if="image">
              <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
          </div>
          <span>点击更换头像</span>
        </el-form-item>
        <el-form-item label="标签:">
          <div>
            <span class="selected-tag">
              <el-tag :key="tag.id" @close="deleteSelectedTag(tag)" closable
                      v-for="tag in selectedTags">{{tag.tagName}}</el-tag>
            </span>
            <span @click="selectTag">选择标签</span>
            <el-dialog
                    :visible.sync="tagDialogVisible"
                    title="选择标签">
              <div>选择合适的标，最多可选三个</div>
              <div class="box">
                <div :key="tagObject.categoryName" class="tag" v-for="tagObject in tags">
                  <span class="category">{{tagObject.categoryName}}</span>
                  <span class="tag-name">
                    <el-tag :key="tag.id" :type="backgroundColor(tag)"
                            @click="chooseTag(tag)" v-for="tag in tagObject.tagList">{{tag.tagName}}</el-tag>
                  </span>
                </div>
                <div style="width: 100%; text-align: center;margin: 10px 0">
                  <el-button @click="saveChooseTag" type="primary">关闭并保存</el-button>
                </div>
              </div>
            </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="介绍:">
          <el-input type="textarea" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="save" type="primary">保存</el-button>
          <el-button plain>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import EventBus from "@/utils/EventBus";

    @Component
    export default class EditSheet extends Vue {
        private sheetId: number = 0;
        private image: string = '';
        private formData = {
            id: 0,
            title: '',
            image: '',
            description: '',
            tag: new Array<any>()
        };
        private tagDialogVisible: boolean = false;

        // 标签渲染结构 key为标签分类，value为标签的array集合
        private tags: Array<any> = [];
        private selectedTempTags: Array<any> = [];
        private selectedTags: Array<any> = [];

        @Watch('sheetId')
        refreshFormData() {
            this.selectedTags.length = 0;
            this.selectedTempTags.length = 0;
            this.axios.get('/sheets', {
                params: {
                    sheetId: this.$route.params.sheetId
                }
            }).then((response) => {
                console.log(response);
                let sheet = response.data.data.musicSheet;
                this.image = 'http://www.another.ren:8089/images/' + sheet.image;
                this.formData.id = sheet.id;
                this.formData.image = sheet.image;
                this.formData.tag = sheet.tag;
                this.formData.description = sheet.description;
                this.formData.title = sheet.title;
                console.log(this.formData);
            })
        }

        created() {
            EventBus.$on('updateSheetEdit', (sheetId: number) => {
                this.sheetId = sheetId;
            });
            console.log(this.$route.params.sheetId);
        }

        handleAvatarSuccess(res: any, file: any) {
            this.image = URL.createObjectURL(file.raw);
            this.formData.image = res[0].url;
            console.log(res);
        }

        beforeAvatarUpload(file: any) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }

        save() {
            this.axios.put('/sheets', {
                id: this.formData.id,
                image: this.formData.image,
                title: this.formData.title,
                tag: JSON.stringify(this.formData.tag),
                description: this.formData.description,
            }).then((response) => {
                console.log(response);
                if (response.data === 1) {
                    EventBus.$emit('getCollectionSheet');
                    this.$message.success('保存成功');
                }
            })
        }

        backgroundColor(tag: any) {
            for (let i = 0; i < this.selectedTempTags.length; i++) {
                if (this.selectedTempTags[i].id === tag.id) {
                    return '';
                }
            }
            return 'info';
        }

        // 打开标签选择页面，获取标签数据
        selectTag() {
            this.tagDialogVisible = true;
            // 获取标签
            if (this.tags.length === 0) {
                this.axios.get('/tags/all').then((response) => {
                    let tagArray: Array<any> = response.data;
                    // 获取分类id
                    let categoryIdNameMap: Map<number, string> = new Map();
                    tagArray.forEach((tag) => {
                        categoryIdNameMap.set(tag.categoryId, tag.categoryName);
                    });
                    for (let [key, categoryName] of categoryIdNameMap) {
                        let tagList = tagArray.filter((tag) => {
                            return tag.categoryId === key;
                        });
                        let tagObject = {
                            categoryName: categoryName,
                            tagList: tagList
                        };
                        this.tags.push(tagObject);
                    }
                });
            }
        }

        chooseTag(tag: any) {
            // 取消选择标签
            for (let i = 0; i < this.selectedTempTags.length; i++) {
                if (this.selectedTempTags[i].id === tag.id) {
                    this.selectedTempTags.splice(i, 1);
                    return;
                }
            }
            // 选择标签数量限制
            if (this.selectedTempTags.length > 2) {
                this.$message.warning('最多选择三个标签');
                return;
            }
            this.selectedTempTags.push(tag);
        }

        saveChooseTag() {
            this.selectedTags = this.selectedTempTags;
            this.tagDialogVisible = false;
            this.formData.tag = new Array<number>();
            this.formData.tag.length = 0;
            this.selectedTags.forEach((tag) => {
                this.formData.tag.push(tag.id);
            });
        }

        deleteSelectedTag(deleteTag: any) {
            this.selectedTags = this.selectedTags.filter((tag) => {
                return tag.id != deleteTag.id;
            });
            this.selectedTempTags = this.selectedTags;
            this.formData.tag.length = 0;
            this.selectedTags.forEach((tag) => {
                this.formData.tag.push(tag.id);
            })
        }
    };
</script>

<style lang="scss" scoped>
  .selected-tag {
    margin-right: 20px;

    > span {
      margin-left: 10px;
    }
  }

  .box {
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .tag {
    margin: 5px 0;
    display: flex;
    justify-content: flex-start;


    .category {
      width: 10%;
    }

    .tag-name {
      width: 90%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      > span {
        width: 70px;
        text-align: center;
        margin-left: 20px;
        margin-top: 10px;
      }
    }
  }

  #container {
    padding: 10px;

    > div {
      width: 70%;
      margin-top: 40px;
    }
  }

  .cover {
    width: 140px;
    height: 140px;

    > span {
      width: 140px;
      height: 140px;
    }
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 140px;
    height: 140px;

    &:hover {
      border-color: #409EFF;
    }

    > .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }

  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }
</style>
