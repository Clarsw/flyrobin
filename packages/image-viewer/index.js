import FrImageViewer from '../viewer/src/image-viewer.vue'

FrImageViewer.install = function (Vue) {
  Vue.component(FrImageViewer.name, FrImageViewer)
}

export default FrImageViewer
