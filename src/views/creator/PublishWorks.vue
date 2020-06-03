<template>
  <div id="container">
    <!--      专辑编辑页-->
    <el-row>
      <el-col :span="12">
        <el-form :model="albumForm" :rules="rules" label-width="100px" ref="albumForm">
          <el-form-item label="专辑名称" prop="title">
            <el-input v-model="albumForm.title"></el-input>
          </el-form-item>
          <el-form-item label="专辑描述" prop="description">
            <el-input :rows="3" type="textarea" v-model="albumForm.description"></el-input>
          </el-form-item>
          <el-form-item label="专辑图片" prop="image">
            <el-upload
                    :before-upload="beforeAlbumUpload"
                    :on-success="handleAlbumSuccess"
                    :show-file-list="false"
                    accept="image/*"
                    action="http://www.another.ren:8989/test/upload"
                    class="avatar-uploader"
                    name="files">
              <img :src="imageUrl" alt="专辑图片" class="avatar" v-if="imageUrl">
              <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="专辑歌曲" prop="musicList">
            <el-upload
                    :before-upload="typeVerify"
                    :file-list="fileList"
                    :on-success="changeFileList"
                    accept="audio/*"
                    action="http://www.another.ren:8989/test/upload"
                    multiple
                    name="files">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitAlbum('albumForm')" type="primary" v-if="!publishSuccess">发布</el-button>
            <el-button type="info" v-else>已发布</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Form} from "element-ui";

    @Component
    export default class PublishWorks extends Vue {
        private imageUrl: string = '';
        private albumForm = {
            title: '',
            description: '',
            image: '',
            musicList: Array<object>()
        };
        private fileList = [];
        private rules = {
            title: [
                {
                    required: true,
                    message: '请输入专辑名称',
                    trigger: 'blur'
                }
            ],
            description: [
                {
                    required: true,
                    message: '请输入专辑描述',
                    trigger: 'blur'
                }
            ],
            image: [
                {
                    required: true,
                    message: '请上传专辑封面',
                    trigger: 'blur'
                }
            ],
            musicList: [
                {
                    required: true,
                    message: '请上传专辑歌曲',
                    trigger: 'blur'
                }
            ]
        };
        private publishSuccess: boolean = false;

        // 音频文件类型校验
        typeVerify(file: any) {
            if (file.type.indexOf('audio/') === 0) {
                return true;
            } else {
                this.$message.error("请上传音频文件");
                return false;
            }
        }

        beforeAlbumUpload(file: any) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }

        // 专辑图片上传后的处理
        handleAlbumSuccess(res: any, file: any) {
            console.log(res);
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.albumForm.image = res[0].url;
        }


        /**
         * 发布专辑
         * @param formName
         */
        submitAlbum(formName: string) {
            (this.$refs[formName] as Form).validate((valid: boolean) => {
                if (valid) {
                    this.axios.post('/albums', {
                        title: this.albumForm.title,
                        description: this.albumForm.description,
                        singerId: this.$store.state.singer.id,
                        singerName: this.$store.state.singer.nickName,
                        image: this.albumForm.image,
                        collectionMusic: JSON.stringify(this.albumForm.musicList),
                        status: 0
                    }).then((response) => {
                        console.log(response.data);
                        let album = response.data;
                        if (album.id != 0) {
                            this.$message.success('专辑发布成功！！！');
                            //TODO 跳转到作品数据页面
                            this.$router.push('myAlbum');
                        }
                    });
                } else {
                    console.log('error submit');
                    return false;
                }
            });
        }

        changeFileList(response: Array<object>, file: any, fileList: any) {
            this.albumForm.musicList.push(response[0]);
        }
    }
</script>

<style lang="scss" scoped>
  #container {
    > div {
      padding: 10px 0;
    }
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    /*border-radius: 6px;*/
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
