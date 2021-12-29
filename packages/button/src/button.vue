<template>
  <button
    class="fr-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :type="nativeType"
    :style="[styleObject]"
    :class="[
      type ? 'fr-button--' + type : '',
      size ? 'fr-button--' + size : '',
      {
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled || loading
      }
    ]"
  >
    <span class="text-con" :class="[textDirection, { 'is-icon': icon || loading }]">
      <i class="fr-icon-loading" v-if="loading"></i>
      <i :class="icon" v-if="icon && !loading"></i>
      <span v-if="$slots.default"><slot></slot></span>
    </span>
  </button>
</template>
<script>
export default {
  name: 'FrButton',
  inject: {},
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    fill: {
      type: String,
      default: ''
    },
    stroke: {
      type: String,
      default: ''
    },
    textDirection: {
      type: String,
      default: 'ltr'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    round: Boolean,
    circle: Boolean
  },
  computed: {
    styleObject() {
      if (this.type === 'text') {
        return {}
      } else {
        if (this.loading || this.disabled) return {}
        if (this.type !== 'default') return {}
        if (this.fill) return { backgroundColor: this.fill, borderColor: this.fill, color: '#fff' }
        if (this.stroke) return { backgroundColor: '#fff', color: this.stroke, borderColor: this.stroke }
        return {}
      }
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
