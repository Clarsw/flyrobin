<script>
export default {
  name: 'FrTimeline',

  componentName: 'FrTimeline',

  props: {
    reverse: {
      type: Boolean,
      default: false
    },

    align: {
      type: String,
      default: ''
    }
  },

  provide() {
    return {
      timeline: this
    }
  },

  render() {
    const { reverse, align } = this
    const classes = {
      'fr-timeline': true,
      'is-reverse': reverse,
      'is-left': align === 'left',
      'is-justify': align === 'justify'
    }
    let slots = this.$slots.default || []
    if (reverse) {
      slots = slots.reverse()
    }
    return <ul class={classes}>{slots}</ul>
  }
}
</script>
