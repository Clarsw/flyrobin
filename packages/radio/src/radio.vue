<template>
  <label
    class="fr-radio"
    :class="[
      border && radioSize ? 'fr-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label }
    ]"
    role="radio"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span class="fr-radio__input" :class="{ 'is-disabled': isDisabled, 'is-checked': model === label }">
      <span class="fr-radio__inner" :style="model === label ? activeInnerStyle : null"> </span>
      <input
        ref="radio"
        class="fr-radio__original"
        :value="label"
        type="radio"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      />
    </span>
    <span class="fr-radio__label" :style="model === label ? activeStyle : null" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import Emitter from '../../../src/mixins/emitter'

export default {
  name: 'FrRadio',

  componentName: 'FrRadio',

  mixins: [Emitter],

  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String
  },

  data() {
    return {
      focus: false
    }
  },

  computed: {
    isGroup() {
      let parent = this.$parent
      while (parent) {
        if (parent.$options.componentName !== 'FrRadioGroup') {
          parent = parent.$parent
        } else {
          this._radioGroup = parent
          return true
        }
      }
      return false
    },

    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('FrRadioGroup', 'input', [val])
        } else {
          this.$emit('input', val)
        }
        this.$refs.radio && (this.$refs.radio.checked = this.model === this.label)
      }
    },
    radioSize() {
      const tempRadioSize = this.size || (this.$ELEMENT || {}).size
      return this.isGroup ? this._radioGroup.radioGroupSize || tempRadioSize : tempRadioSize
    },
    isDisabled() {
      return this.isGroup ? this._radioGroup.disabled || this.disabled || {}.disabled : this.disabled || {}.disabled
    },
    tabIndex() {
      return this.isDisabled || (this.isGroup && this.model !== this.label) ? -1 : 0
    },
    activeStyle() {
      return {
        color: this._radioGroup.textColor || ''
      }
    },
    activeInnerStyle() {
      return {
        backgroundColor: this._radioGroup.textColor || '',
        borderColor: this._radioGroup.textColor || ''
      }
    }
  },

  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit('change', this.model)
        this.isGroup && this.dispatch('FrRadioGroup', 'handleChange', this.model)
      })
    }
  }
}
</script>
