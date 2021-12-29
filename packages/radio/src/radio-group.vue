<template>
  <component :is="_frRadio" role="group" class="fr-radio-group">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'FrRadioGroup',

  componentName: 'FrRadioGroup',

  data() {
    return {}
  },

  props: {
    value: {},
    size: String,
    textColor: String,
    disabled: Boolean,
    fill: String
  },

  computed: {
    _frRadio() {
      return (this.$vnode.data || {}).tag || 'div'
    },

    radioGroupSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  created() {
    this.$on('handleChange', (value) => {
      this.$emit('change', value)
    })
  }
}
</script>
