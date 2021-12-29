<template>
  <li class="fr-timeline-item" :class="[`is-${align || ''}`]">
    <div class="fr-timeline-item__tail"></div>
    <div
      v-if="!$slots.dot"
      class="fr-timeline-item__node"
      :class="[`fr-timeline-item__node--${size || ''}`, `fr-timeline-item__node--${type || ''}`]"
      :style="{
        backgroundColor: color
      }"
    >
      <i v-if="icon" class="fr-timeline-item__icon" :class="icon"></i>
    </div>
    <div v-if="$slots.dot" class="fr-timeline-item__dot">
      <slot name="dot"></slot>
    </div>
    <div class="fr-timeline-item__wrapper">
      <div v-if="!hideTimestamp && placement === 'top'" class="fr-timeline-item__timestamp is-top">
        {{ timestamp }}
      </div>

      <div class="fr-timeline-item__content">
        <slot></slot>
      </div>

      <div v-if="!hideTimestamp && placement === 'bottom'" class="fr-timeline-item__timestamp is-bottom">
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>
<script>
export default {
  name: 'FrTimelineItem',

  inject: ['timeline'],

  props: {
    timestamp: String,

    hideTimestamp: {
      type: Boolean,
      default: false
    },

    placement: {
      type: String,
      default: 'bottom'
    },

    type: String,

    color: String,

    size: {
      type: String,
      default: 'normal'
    },

    icon: String
  },

  computed: {
    _timeline() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'FrTimeline') {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return false
    },

    align() {
      return this._timeline.align || (this.$ELEMENT || {}).align
    }
  }
}
</script>
