<template>
  <i :class="'fr-icon' + name"></i>
</template>

<script>
export default {
  name: 'FrIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
