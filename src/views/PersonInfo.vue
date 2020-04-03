<template>
  <div id="container">
    <div class="personInfo">
      <span class="title">个人设置</span>
      <el-tabs style="height: 200px;" tab-position="top">
        <el-tab-pane label="基本设置">
          <div class="basic-setting">
            <el-form :model="personInfo" label-width="40px">
              <el-form-item label="昵称">
                <el-input v-model="personInfo.nickName"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        :show-file-list="false"
                        accept="image/*"
                        action="http://www.another.ren:8989/test/upload"
                        class="avatar-uploader"
                        name="files">
                  <img :src="imageUrl" class="avatar" v-if="imageUrl">
                  <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                </el-upload>
                <span>点击更换头像</span>
              </el-form-item>
              <el-form-item label="介绍">
                <el-input type="textarea" v-model="personInfo.description"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="personInfo.gender">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                  <el-radio :label="2">保密</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="生日">
                <div class="block">
                  <el-date-picker
                          placeholder="选择日期"
                          type="date"
                          v-model="personInfo.birthday"
                          value-format="yyyy-MM-dd HH-mm-ss">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="personInfo.address"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="save" type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="隐私设置">努力开发中、、、</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class PersonInfo extends Vue {
        private imageUrl: string = '';
        private personInfo = {
            id: 123,
            nickName: '因为了解',
            gender: 0,
            description: '',
            birthday: '',
            address: '',
            imageUrl: 'http://www.another.ren:8089/images/another.jpg'
        };

        mounted() {
            this.axios.get('/users', {
                params: {
                    userId: this.$store.state.user.id
                }
            }).then((response) => {
                let user = response.data;
                console.log('user');
                console.log(user);
                this.personInfo.id = user.id;
                this.personInfo.birthday = user.birthday;
                this.personInfo.gender = user.gender === null ? 0 : user.gender;
                this.personInfo.nickName = user.nickName;
                this.personInfo.address = user.address;
                this.personInfo.description = user.description;
                // this.personInfo.imageUrl = user.image;
                this.imageUrl = 'http://www.another.ren:8089/images/' + user.image;
                console.log(this.personInfo);
            });
        }

        save() {
            console.log(this.personInfo);
            //TODO 更新保存用户个人信息
            this.axios.put('/users', {
                id: this.personInfo.id,
                nickName: this.personInfo.nickName,
                gender: this.personInfo.gender,
                description: this.personInfo.description,
                birthday: this.personInfo.birthday,
                address: this.personInfo.address,
                image: this.personInfo.imageUrl
            }).then((response) => {
                console.log(response);
                this.$message.success('保存成功');
            });
        }

        handleAvatarSuccess(res: any, file: any) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.personInfo.imageUrl = res[0].url;
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
    }
</script>

<style lang="scss" scoped>
  #container {
    display: flex;
    justify-content: center;
    min-height: 1000px;
    background-color: #f5f5f5;

    > .personInfo {
      width: 70%;
      padding: 20px;
      background-color: #ffffff;

      > .title {
        font-size: 25px;
      }

      .basic-setting {
        width: 50%;
      }
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
