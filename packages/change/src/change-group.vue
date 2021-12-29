<template>
  <component :is="_frChange" role="group" class="fr-change-group">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'FrChangeGroup',

  componentName: 'FrChangeGroup',

  props: {
    value: {},
    size: String,
    fill: String,
    textColor: String,
    disabled: Boolean
  },

  computed: {
    _frChange() {
      return (this.$vnode.data || {}).tag || 'div'
    },
    changeGroupSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  created() {
    this.$on('handleChange', (value) => {
      const { newValue, oldValue } = value
      this.$emit('change', newValue, oldValue)
    })
  }
}
</script>
