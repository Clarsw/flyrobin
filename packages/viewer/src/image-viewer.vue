<template>
  <transition name="viewer-fade">
    <div
      tabindex="-1"
      ref="fr-image-viewer__wrapper"
      class="fr-image-viewer__wrapper"
      :style="{ 'z-index': viewerZIndex }"
    >
      <div class="fr-image-viewer__mask" @click.self="handleMaskClick"></div>
      <!-- CLOSE -->
      <span class="fr-image-viewer__btn fr-image-viewer__close" @click="hide">
        <i class="fr-icon-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle && arrowPosition != 'actions'">
        <span
          class="fr-image-viewer__btn fr-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <i class="fr-icon-arrow-left-bold" />
        </span>
        <span
          class="fr-image-viewer__btn fr-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <i class="fr-icon-arrow-right-bold" />
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="fr-image-viewer__btn fr-image-viewer__actions">
        <div class="fr-image-viewer__actions__inner">
          <i
            class="fr-icon-arrow-left-bold"
            :class="{ 'is-disabled': !infinite && isFirst }"
            @click="prev"
            v-if="!isSingle && arrowPosition == 'actions'"
          />
          <i class="fr-icon-zoom-out" @click="handleActions('zoomIn')"></i>
          <i class="fr-icon-zoom-in" @click="handleActions('zoomOut')"></i>
          <i class="fr-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="fr-image-viewer__actions__divider"></i>
          <i class="fr-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
          <i class="fr-icon-refresh" @click="handleActions('clocelise')"></i>
          <i
            class="fr-icon-arrow-right-bold"
            :class="{ 'is-disabled': !infinite && isLast }"
            @click="next"
            v-if="!isSingle && arrowPosition == 'actions'"
          />
        </div>
      </div>
      <!-- CANVAS -->
      <div class="fr-image-viewer__canvas">
        <img
          v-for="(url, i) in urlList"
          v-if="i === index"
          ref="img"
          class="fr-image-viewer__img"
          :key="url"
          :src="currentImg"
          :style="imgStyle"
          @load="handleImgLoad"
          @error="handleImgError"
          @mousedown="handleMouseDown"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { on, off } from '../../../src/utils/dom'
import { rafThrottle, isFirefox } from '../../../src/utils/util'
const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'fr-icon-fullscreen-expand'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'fr-icon-fullscreen-shrink'
  }
}

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

export default {
  name: 'FrImageViewer',

  componentName: 'FrImageViewer',

  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onSwitch: {
      type: Function,
      default: () => {}
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
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
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
    currentImg() {
      return this.urlList[this.index]
    },
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`
      }
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%'
      }
      return style
    },
    viewerZIndex() {
      return 9999
    }
  },
  watch: {
    index: {
      handler: function (val) {
        this.reset()
        this.onSwitch(val)
      }
    },
    currentImg(val) {
      this.$nextTick((_) => {
        const $img = this.$refs.img[0]
        if (!$img.complete) {
          this.loading = true
        }
      })
    }
  },
  methods: {
    hide() {
      this.onClose()
    },

    deviceSupportInstall() {
      this._mouseWheelHandler = rafThrottle((e) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail
        if (delta > 0) {
          this.handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false
          })
        } else {
          this.handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false
          })
        }
      })
      on(document, 'keydown', this._keyDownHandler)
      on(document, mousewheelEventName, this._mouseWheelHandler)
    },
    deviceSupportUninstall() {
      off(document, 'keydown', this._keyDownHandler)
      off(document, mousewheelEventName, this._mouseWheelHandler)
      this._keyDownHandler = null
      this._mouseWheelHandler = null
    },

    handleMouseDown(e) {
      if (this.loading || e.button !== 0) return

      const { offsetX, offsetY } = this.transform
      const startX = e.pageX
      const startY = e.pageY
      this._dragHandler = rafThrottle((ev) => {
        this.transform.offsetX = offsetX + ev.pageX - startX
        this.transform.offsetY = offsetY + ev.pageY - startY
      })
      on(document, 'mousemove', this._dragHandler)
      on(document, 'mouseup', (ev) => {
        off(document, 'mousemove', this._dragHandler)
      })

      e.preventDefault()
    },

    handleImgLoad(e) {
      this.loading = false
    },
    handleImgError(e) {
      this.loading = false
      e.target.alt = '加载失败'
    },
    handleMaskClick() {
      if (this.maskClosable) {
        this.hide()
      }
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    },
    toggleMode() {
      if (this.loading) return

      const modeNames = Object.keys(Mode)
      const modeValues = Object.values(Mode)
      const index = modeValues.indexOf(this.mode)
      const nextIndex = (index + 1) % modeNames.length
      this.mode = Mode[modeNames[nextIndex]]
      this.reset()
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
    },
    handleActions(action, options = {}) {
      if (this.loading) return
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      }
      const { transform } = this
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
          }
          break
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
          break
        case 'clocelise':
          transform.deg += rotateDeg
          break
        case 'anticlocelise':
          transform.deg -= rotateDeg
          break
      }
      transform.enableTransition = enableTransition
    }
  },
  mounted() {
    this.deviceSupportInstall()
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
    this.$refs['fr-image-viewer__wrapper'].focus()
  },
  destroyed() {
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
