<template>
  <div>
    <!-- <fr-button icon="fr-icon-loading" type="text" fill="red" disabled textDirection="rtl">测试按钮</fr-button> -->
    <fr-button size="mini" :key="2" fill="#4682B4">测试按钮1</fr-button>
    <fr-button size="mini" :key="0" loading fill="#4682B4">测试按钮2</fr-button>
    <fr-button icon="fr-icon-loading" size="mini" :key="1" disabled fill="#4682B4">测试按钮3</fr-button>
    <fr-button icon="fr-icon-heart-fill" size="mini" :key="3" fill="#4682B4">测试按钮4</fr-button>
    <fr-button icon="fr-icon-heart-fill" size="mini" fill="#4682B4" @click="handleVideoShow">视频</fr-button>
    <fr-button icon="fr-icon-heart-fill" size="mini" fill="#4682B4" @click="handleAudioShow">音频</fr-button>
    <fr-button icon="fr-icon-heart-fill" size="mini" fill="#4682B4" @click="handleImageShow">图片</fr-button>
    <fr-radio-group v-model="radioValue1" text-color="#4682B4">
      <fr-radio-check :label="1">备选项1</fr-radio-check>
      <fr-radio-check :label="2">备选项2</fr-radio-check>
    </fr-radio-group>
    <fr-change-group v-model="change1" @change="handleChange" size="mini" fill="#4682B4">
      <fr-change-button label="上海"></fr-change-button>
      <fr-change-button label="北京"></fr-change-button>
      <fr-change-button label="广州"></fr-change-button>
      <fr-change-button label="深圳"></fr-change-button>
    </fr-change-group>
    <fr-video-viewer
      v-if="videoShow"
      :initialIndex="1"
      :urlList="videoList"
      :on-close="handeVideoClose"
      arrowPosition="actions"
    ></fr-video-viewer>
    <fr-audio-viewer
      v-if="audioShow"
      :initialIndex="2"
      :urlList="audioList"
      :on-close="handeAudioClose"
      arrowPosition="actions"
    ></fr-audio-viewer>
    <fr-image-viewer
      v-if="imageShow"
      :initialIndex="0"
      :urlList="imageList"
      :on-close="handleImageClose"
      arrowPosition="actions"
    ></fr-image-viewer>
    <i class="fr-icon-loading"></i>
    <!-- <fr-timeline align="justify" :reverse="true">
      <fr-timeline-item timestamp="2021-05-10" size="large">树形测试1</fr-timeline-item>
      <fr-timeline-item timestamp="2021-05-11">树形测试2</fr-timeline-item>
      <fr-timeline-item timestamp="2021-05-12">树形测试3</fr-timeline-item>
    </fr-timeline>

    <fr-timeline align="left">
      <fr-timeline-item timestamp="2021-05-10" size="large">树形测试1</fr-timeline-item>
      <fr-timeline-item timestamp="2021-05-11">树形测试2</fr-timeline-item>
      <fr-timeline-item timestamp="2021-05-12">树形测试3</fr-timeline-item>
    </fr-timeline>

    <fr-timeline>
      <fr-timeline-item timestamp="2021-05-10" size="large" placement="top">树形测试1</fr-timeline-item>
      <fr-timeline-item timestamp="2021-05-11">树形测试2</fr-timeline-item>
      <fr-timeline-item timestamp="2021-05-12">树形测试3</fr-timeline-item>
    </fr-timeline> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: 'fly robin',
      change1: '',
      radioValue1: '',
      videoShow: false,
      videoList: [
        'https://kiway-bkpt-test.oss-cn-shenzhen.aliyuncs.com/czgj/media/20210602/20210602155328sfgwi.mp4',
        '../assets/video1.mp4',
        '../assets/video2.mp4'
      ],
      audioShow: false,
      audioList: ['../assets/normal video3.mp3', '../assets/video1.mp3', '../assets/video2.mp3'],
      imageShow: false,
      imageList: [
        '../assets/1C3FD0C713EE9D104CCBA9B7AF115732.png',
        '../assets/5D0CC80D5FDA7DCF3009E19D6A296B2F.png',
        '../assets/5E3D97001D97A3EEB9E156FD2248CECB.png'
      ]
    }
  },
  mounted() {},
  methods: {
    handleVideoShow() {
      this.videoShow = true
    },
    handeVideoClose() {
      this.videoShow = false
    },
    handleAudioShow() {
      this.audioShow = true
    },
    handeAudioClose() {
      this.audioShow = false
    },
    handleImageShow() {
      this.imageShow = true
    },
    handleImageClose() {
      this.imageShow = false
    },

    handleChange(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
}
</script>
