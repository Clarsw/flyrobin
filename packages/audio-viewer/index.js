import FrAudioViewer from '../viewer/src/audio-viewer.vue';

FrAudioViewer.install = function (Vue) {
  Vue.component(FrAudioViewer.name, FrAudioViewer)
};

export default FrAudioViewer;
