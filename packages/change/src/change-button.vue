<template>
  <label
    class="fr-change-button"
    :class="[
      size ? 'fr-change-button--' + size : '',
      { 'is-active': value === label },
      { 'is-disabled': isDisabled },
      { 'is-focus': focus }
    ]"
    role="radio"
    :aria-checked="value === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <input
      class="fr-change-button__orig-radio"
      :value="label"
      type="radio"
      v-model="value"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span class="fr-change-button__inner" :style="value === label ? activeStyle : null">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import Emitter from '../../../src/mixins/emitter' //FIXME 路径问题

export default {
  name: 'FrChangeButton',

  mixins: [Emitter],

  props: {
    label: {},
    disabled: Boolean,
    name: String
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    value: {
      get() {
        return this._changeGroup.value
      },
      set(value) {
        this._changeGroup.$emit('input', value)
      }
    },
    _changeGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'FrChangeGroup') {
          parent = parent.$parent
        } else {
          return parent
        }
      }
      return false
    },
    activeStyle() {
      return {
        backgroundColor: this._changeGroup.fill || '',
        borderColor: this._changeGroup.fill || '',
        boxShadow: this._changeGroup.fill ? `-1px 0 0 0 ${this._changeGroup.fill}` : '',
        color: this._changeGroup.textColor || ''
      }
    },

    size() {
      return this._changeGroup.changeGroupSize || (this.$ELEMENT || {}).size
    },
    isDisabled() {
      return this.disabled || this._changeGroup.disabled
    },
    tabIndex() {
      return this.isDisabled || (this._changeGroup && this.value !== this.label) ? -1 : 0
    }
  },

  methods: {
    handleChange() {
      const oldValue = this.value
      this.$nextTick(() => {
        let args = { newValue: this.value, oldValue: oldValue }
        this.dispatch('FrChangeGroup', 'handleChange', args)
      })
    }
  }
}
</script>
