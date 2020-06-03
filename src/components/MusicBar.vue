<template>
  <div id="another">
    <span @mouseenter="showOrHiddenMusicBar" class="show-music-bar"></span>
    <div id="music">
      <!--    <audio crossOrigin="anonymous" src="http://www.another.ren:8089/audios/透明.mp3"></audio>-->
      <audio :src="currentMusic.url" crossOrigin="anonymous"></audio>
      <div class="music-bar">
        <!--      播放按钮-->
        <div class="control-buttons">
          <svg @click="previousMusic" aria-hidden="true" class="icon">
            <use xlink:href="#icon-shangyishou"></use>
          </svg>
          <svg @click="playOrPause" aria-hidden="true" class="icon">
            <use :xlink:href="paused? '#icon-bofang':'#icon-zanting'"></use>
          </svg>
          <svg @click="nextMusic" aria-hidden="true" class="icon">
            <use xlink:href="#icon-xiayishou"></use>
          </svg>
        </div>
        <!--      专辑图片-->
        <div class="album">
          <el-avatar :size="50" :src="currentMusic.belongAlbumImageUrl" shape="square"></el-avatar>
        </div>
        <!--      进度条-->
        <div class="progress">
          <div class="title">
            <span @click="musicPage(currentMusic.id)">{{currentMusic.name}}</span>
            <span @click="singerPage(currentMusic.singerId)">{{currentMusic.singer}}</span>
          </div>
          <div class="bar">
            <!--          <el-progress :color="customColor" :format="format"-->
            <!--                       :percentage="percentage" :stroke-width="15"></el-progress>-->
            <el-slider :max="duration" :min="0" :show-tooltip="false" @change="changeCurrentTime"
                       v-model="currentTime"></el-slider>
            <div>
              <span>{{currentTime1}}</span>/<span>{{duration1}}</span>
            </div>
          </div>
        </div>
        <!--      功能按钮-->
        <div class="function-buttons">
          <svg @click="getMySheet" aria-hidden="true" class="icon">
            <use xlink:href="#icon-tianjiajiahaowubiankuang"></use>
          </svg>
          <el-dialog :modal="false"
                     :visible.sync="addVisible"
                     title="添加到歌单"
                     width="30%">
            <div class="add-music-sheet">
              <span :key="sheet.id" @click="addMusicToSheet(sheet.id, currentMusic.id)" v-for="sheet in createSheet">
                <div>
                  <el-avatar :src="sheet.image"></el-avatar>
                </div>
                <div>
                  <span>{{sheet.title}}</span>
                </div>
              </span>
            </div>
          </el-dialog>
          <svg aria-hidden="true" class="icon">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
          <svg @click="volumeVisible = !volumeVisible" aria-hidden="true" class="icon">
            <use :xlink:href="volume === 0? '#icon-icon-test1':'#icon-icon-test2'"></use>
          </svg>
          <div class="volume">
            <el-slider
                    @input="changeVolume"
                    height="100px"
                    v-if="volumeVisible"
                    v-model="volume"
                    vertical>
            </el-slider>
          </div>
          <svg @click="cycleMethod = (cycleMethod + 1 + 3) % 3" aria-hidden="true" class="icon">
            <use v-if="cycleMethod === 0" xlink:href="#icon-xunhuan1"></use>
            <use v-else-if="cycleMethod === 1" xlink:href="#icon-xunhuan"></use>
            <use v-else xlink:href="#icon-suiji"></use>
          </svg>
          <svg aria-hidden="true" class="icon">
            <use xlink:href="#icon-yinpinliebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import '@/utils/EventBus.ts';
    import EventBus from "@/utils/EventBus";

    @Component
    export default class MusicBar extends Vue {
        // 音频对象
        private audio: HTMLAudioElement = new Audio();
        private volume: number = 30;
        private volumeVisible: boolean = false;
        private paused: boolean = true;

        // 歌曲循环方式
        // 0.顺序播放
        // 1.单曲循环
        // 2.随机播放
        private cycleMethod: number = 0;
        // 音乐播放列表
        private playList: Array<any> = new Array<any>();
        private currentIndex: number = 0;
        private currentMusic: any = {};
        // 实际的音乐对象的播放进度
        private currentTime: number = 0;
        private duration: number = 0;
        // 实时显示的音乐播放进度,主要因为二者的显示格式不同
        private currentTime1: string = '00:00';
        private duration1: string = '00:00';

        private createSheet: Array<any> = [];
        private addVisible: boolean = false;

        @Watch('cycleMethod')
        changeCycleMethod() {

        }

        // 拖动进度条，改变音乐播放进度
        changeCurrentTime(value: number) {
            console.log(value);
            console.log(this.audio.duration);
            console.log(this.audio.currentTime);
            this.audio.currentTime = parseInt(String(value));
        }

        // 改变音乐播放的音量
        changeVolume(value: number) {
            this.audio.volume = value / 100;
        }

        created() {
            // let music = {
            //     id: 123,
            //     name: '透明',
            //     url: 'http://www.another.ren:8089/audios/透明.mp3',
            //     belongAlbumImageUrl: 'http://www.another.ren:8089/images/another.jpg',
            //     singer: '邓紫棋',
            //     singerId: 123
            // };
            // 添加播放记录
            EventBus.$on('addRecord', (music: any) => {
                // 避免同一首歌曲重复添加到播放列表
                let flag = true;
                for (let i = 0; i < this.playList.length; i++) {
                    if (this.playList[i].id === music.id) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    this.playList.push(music);
                }
                // 将正在播放的音乐设为传进来的音乐
                this.currentMusic = music;
                // 设定正在播放的音乐在播放列表的下标
                for (let i = 0; i < this.playList.length; i++) {
                    if (this.currentMusic.id === this.playList[i].id) {
                        this.currentIndex = i;
                        break;
                    }
                }
                // 设置播放音乐的源和声音
                this.audio.src = this.currentMusic.url;
                this.audio.volume = this.volume / 100;
                // 播放音乐
                this.audio.play();
                //更新进度条
                setInterval(() => {
                    // 实际的音乐播放进度和时长
                    this.currentTime = this.audio.currentTime;
                    this.duration = this.audio.duration;
                    // 展示的音乐播放进度和时长
                    let minute = parseInt(String(this.currentTime / 60));
                    let second = parseInt(String(this.currentTime % 60));
                    let minutePart: string = '';
                    let secondPart: string = '';
                    minutePart = minute < 10 ? '0' + minute : String(minute);
                    secondPart = second < 10 ? '0' + second : String(second);
                    this.currentTime1 = minutePart + ':' + secondPart;
                    minute = parseInt(String(this.audio.duration / 60));
                    second = parseInt(String(this.audio.duration % 60));
                    minutePart = minute < 10 ? '0' + minute : String(minute);
                    secondPart = second < 10 ? '0' + second : String(second);
                    this.duration1 = minutePart + ':' + secondPart;
                }, 1000);
                this.paused = false;
                // 显示musicBar
                setTimeout(() => {
                    let container = document.getElementById('another');
                    if (container !== null) {
                        container.style.bottom = '0px';
                    }
                }, 2000);
                // 隐藏musicBar
                setTimeout(() => {
                    let container = document.getElementById('another');
                    if (container !== null) {
                        container.style.bottom = '-50px';
                    }
                }, 5000);
            });
        }

        musicPage(id: string) {
            console.log(id);
        }

        singerPage(singerId: number) {
            console.log(singerId);
        }

        // 播放音乐列表上一首音乐
        previousMusic() {
            console.log('上一首');
            this.currentIndex = (this.currentIndex + this.playList.length - 1) % this.playList.length;
            this.currentMusic = this.playList[this.currentIndex];
            this.audio.src = this.playList[this.currentIndex].url;
            this.audio.play();
            this.paused = false;
        }

        // 暂停播放音乐
        playOrPause() {
            if (this.audio.paused) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
            this.paused = !this.paused;
        }

        // 播放音乐列表下一首音乐
        nextMusic() {
            console.log('下一首');
            this.currentIndex = (this.currentIndex + this.playList.length + 1) % this.playList.length;
            this.currentMusic = this.playList[this.currentIndex];
            this.audio.src = this.playList[this.currentIndex].url;
            this.audio.play();
            this.paused = false;
        }

        showOrHiddenMusicBar() {
            let container = document.getElementById('another');
            if (container !== null) {
                if (container.style.bottom == '-50px') {
                    container.style.bottom = '0px';
                } else if (container.style.bottom == '0px') {
                    container.style.bottom = '-50px';
                } else {
                    container.style.bottom = '-50px';
                }
            } else {
                console.log(container);
            }
        }

        // 获取歌单信息
        getMySheet() {
            if (this.audio.src != '') {
                this.addVisible = true;
                this.axios.get('/sheets/creatorId', {
                    params: {
                        creatorId: this.$store.state.user.id
                    }
                }).then((response) => {
                    let sheetList = response.data;
                    this.createSheet.length = 0;
                    for (let sheet of sheetList) {
                        sheet.image = 'http://www.another.ren:8089/images/' + sheet.image;
                        this.createSheet.push(sheet);
                    }
                });
            }
        }

        addMusicToSheet(sheetId: number, musicId: number) {
            console.log(sheetId + '---' + musicId);
            this.axios.get('/sheets/add', {
                params: {
                    sheetId: sheetId,
                    musicId: musicId
                }
            }).then((response) => {
                console.log(response);
                if (response.data === 1) {
                    this.addVisible = false;
                    this.$message.success('添加成功');
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
  /*水平垂直居中*/
  .central-position {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .volume {
    position: absolute;
    bottom: 50px;
    height: 120px;
    background-color: #99a9bf;
    @extend .central-position;

    > div {
      @extend .central-position;
    }
  }

  .add-music-sheet {
    > span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-top: #99a9bf solid 1px;
      padding: 5px;

      &:hover {
        background-color: #d9d9d9;
        cursor: pointer;
      }

      > div {
        margin-right: 10px;
      }

      > div:last-child {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
      }
    }

    > span:first-child {
      border-top: none;
    }

    /*> span:first-child {*/
    /*  display: flex;*/
    /*  justify-content: flex-start;*/
    /*  align-items: center;*/

    /*  > i {*/
    /*    height: 40px;*/
    /*    width: 40px;*/
    /*    font-size: 40px;*/
    /*  }*/
    /*}*/
  }

  #another {
    transition: bottom 1s;
    bottom: -50px;

    position: fixed;
    width: 100%;
    height: 55px;

    display: flex;
    justify-content: center;
    flex-direction: column;

    .show-music-bar {
      display: inline-block;
      width: 100%;
      height: 10px;
      /*background-color: #42b983;*/
    }

    > #music {
      height: 50px;
      background-color: #99a9bf;

      > .music-bar {
        margin: 0 auto;
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        > .control-buttons {
          @extend .central-position;
          height: 100%;
          width: 20%;
          justify-content: space-around;

          > svg {
            font-size: 50px;
            color: #fafafa;
          }
        }

        > .album {
          @extend .central-position;
          height: 100%;
          width: 10%;
        }

        > .progress {
          height: 100%;
          width: 55%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          > .title {
            @extend .central-position;
            justify-content: flex-start;
            height: 40%;

            > span {
              margin-left: 10px;
              color: #fafafa;

              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }

          > .bar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 60%;

            > div {
              margin-left: 10px;
            }

            > div:first-child {
              width: 70%;
            }
          }
        }

        > .function-buttons {
          width: 30%;
          height: 100%;
          @extend .central-position;
          justify-content: space-around;

          > svg {
            font-size: 30px;
            color: #fafafa;
          }
        }
      }
    }
  }

  .active {
    bottom: 0;
    transition: bottom 1s;

    position: fixed;
    width: 100%;
    height: 55px;

    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  /*修改element的display方式，使的歌曲时间和进度条在一条线上*/
  .el-progress {
    @extend .central-position;
  }
</style>
