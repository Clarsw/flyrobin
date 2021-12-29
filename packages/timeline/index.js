import FrTimeline from './src/main.vue'

FrTimeline.install = function (Vue) {
  Vue.component(FrTimeline.name, FrTimeline)
}

export default FrTimeline
