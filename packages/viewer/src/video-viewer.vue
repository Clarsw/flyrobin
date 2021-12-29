<template>
  <transition name="viewer-fade">
    <div
      tabindex="-1"
      ref="fr-video-viewer__wrapper"
      class="fr-video-viewer__wrapper"
      :style="{ 'z-index': viewerZIndex }"
    >
      <div class="fr-video-viewer__mask" @click.self="handleMaskClick"></div>
      <!-- CLOSE -->
      <span class="fr-video-viewer__btn fr-video-viewer__close" @click="hide">
        <i class="fr-icon-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle && arrowPosition != 'actions'">
        <span
          class="fr-video-viewer__btn fr-video-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <i class="fr-icon-arrow-left-bold" />
        </span>
        <span
          class="fr-video-viewer__btn fr-video-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <i class="fr-icon-arrow-right-bold" />
        </span>
      </template>
      <!-- ACTIONS -->
      <template v-if="arrowPosition == 'actions'">
        <div class="fr-video-viewer__btn fr-video-viewer__actions">
          <div class="fr-video-viewer__actions__inner">
            <i
              class="fr-icon-arrow-left-bold"
              :class="{ 'is-disabled': !infinite && isFirst }"
              @click="prev"
              v-if="!isSingle"
            />
            <i
              class="fr-icon-arrow-right-bold"
              :class="{ 'is-disabled': !infinite && isLast }"
              @click="next"
              v-if="!isSingle"
            />
          </div>
        </div>
      </template>
      <!-- CANVAS -->
      <div class="fr-video-viewer__canvas" :style="videoWrapStyle">
        <video
          v-for="(url, i) in urlList"
          v-if="i === index"
          ref="video"
          :key="url"
          class="fr-video-viewer__video"
          :src="currentVideo"
          controls
          :style="videoStyle"
        ></video>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'FrVideoViewer',

  componentName: 'FrVideoViewer',

  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    arrowPosition: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      index: this.initialIndex,
      infinite: true
    }
  },

  computed: {
    isSingle() {
      return this.urlList.length <= 1
    },
    isFirst() {
      return this.index === 0
    },
    isLast() {
      return this.index === this.urlList.length - 1
    },
    currentVideo() {
      return this.urlList[this.index]
    },
    viewerZIndex() {
      return 9999
    },
    videoStyle() {
      const style = {}
      style.maxWidth = style.maxHeight = '100%'
      style.transform = `scale(${1}) rotate(${0}deg)`
      return style
    },
    videoWrapStyle() {
      const style = {}
      if (this.arrowPosition != 'actions') return style
      style.height = 'calc(100% - 84px)'
      return style
    }
  },

  watch: {
    index: {
      handler: function (val) {
        //
      }
    },
    currentVideo(val) {
      this.$nextTick((_) => {
        //
      })
    }
  },

  methods: {
    hide() {
      this.onClose()
    },
    handleMaskClick() {
      if (this.maskClosable) {
        this.hide()
      }
    },
    prev() {
      if (this.isFirst && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index - 1 + len) % len
    },
    next() {
      if (this.isLast && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index + 1) % len
    }
  }
}
</script>
