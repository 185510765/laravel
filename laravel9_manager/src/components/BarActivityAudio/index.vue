<template>
  <!-- 网吧活动 语音试听 -->
  <div style="display: inline-block">
    <img :src="img_src" class="audition" @click="getMusicUrl()" />
    <!-- <span class="audio_text">试听</span> -->
    <audio
      v-if="audioSrc"
      id="lol_daily_activity_audition"
      ref="lol_daily_activity_audition"
      :src="audioSrc"
    ></audio>
  </div>
</template>

<script>
  import * as musicList from '@/api/musicList.js';
  import { isEmpty } from '@/utils/common.js';

  export default {
    name: 'BarActivityAudio',
    props: {
      musicSrc: {
        type: String,
        default: '',
      },
      parentActiveDialogVisible: {
        type: Boolean,
        default: false,
      },
      row: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        img_src: require('@/static/manager/img/audio_play.png'),
        audioSrc: this.musicSrc,
        visible: this.parentActiveDialogVisible,
        items: this.row,
      };
    },
    watch: {
      // 如果如组件传递的是动态数据 用watch 如visible
      // parentActiveDialogVisible(val) {
      //   this.visible = val;
      //   if (!this.visible) {
      //     const audio = this.$refs.lol_daily_activity_audition;
      //     this.img_src = require('@/static/manager/img/audio_play.png');
      //     audio.load(); // 重载
      //   }
      // },
      // audioSrc() {
      //   return this.musicSrc;
      // },
    },
    mounted() {},
    methods: {
      // 获取歌曲播放地址
      async getMusicUrl() {
        const audio = this.$refs.lol_daily_activity_audition;
        console.log(this.$refs);
        console.log(this.$refs[0].lol_daily_activity_audition);

        if (
          !isEmpty(this.items.sz_source) &&
          !isEmpty(this.items.sz_source_music_id)
        ) {
          const params = {
            sz_source: this.items.sz_source,
            sz_source_music_id: this.items.sz_source_music_id,
          };
          const { data } = await musicList.getMusicUrl(params);
          if (data) {
            this.audioSrc = data.musicSrc;
          }
        } else {
          this.$baseMessage('暂无歌曲资源，请选择其他歌曲！', 'error');
        }
      },

      // 试听 播放 停止
      audition() {
        const audio = this.$refs.lol_daily_activity_audition;
        console.log(audio);
        if (audio.paused) {
          audio.play();
          this.img_src = require('@/static/manager/img/audio_pause.png');
        } else {
          audio.pause();
          this.img_src = require('@/static/manager/img/audio_play.png');
        }

        // 监听是否播放完毕
        const _this = this;
        audio.addEventListener('ended', function () {
          _this.img_src = require('@/static/manager/img/audio_play.png');
        });
      },
    },
  };
</script>

<style scoped>
  .audition {
    position: relative;
    top: 6px;
    margin-right: 20px;
    cursor: pointer;
  }

  .audio_text {
    position: relative;
    top: -1px;
    margin-left: 5px;
  }
</style>
