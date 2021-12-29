import FrVideoViewer from '../viewer/src/video-viewer.vue';

FrVideoViewer.install = function (Vue) {
  Vue.component(FrVideoViewer.name, FrVideoViewer)
};

export default FrVideoViewer;
