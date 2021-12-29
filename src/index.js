import Button from '../packages/button'
import Icon from '../packages/icon'
import ChangeButton from '../packages/change-button'
import ChangeGroup from '../packages/change-group'
import Timeline from '../packages/timeline'
import TimelineItem from '../packages/timeline-item'
import RadioGroup from '../packages/radio-group'
import RadioCheck from '../packages/radio-check'
import Radio from '../packages/radio'
import VideoViewer from '../packages/video-viewer'
import AudioViewer from '../packages/audio-viewer'
import ImageViewer from '../packages/image-viewer'
// import Upload from '../packages/upload'

const components = {
  Button,
  Icon,
  ChangeButton,
  ChangeGroup,
  Timeline,
  TimelineItem,
  RadioGroup,
  RadioCheck,
  Radio,
  VideoViewer,
  AudioViewer,
  ImageViewer
  // Upload
}

const install = function (Vue) {
  Object.values(components).forEach(component => {
    Vue.component(component.name, component);
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Button,
  Icon,
  ChangeButton,
  ChangeGroup,
  Timeline,
  TimelineItem,
  RadioGroup,
  RadioCheck,
  Radio,
  VideoViewer,
  AudioViewer,
  ImageViewer
  // Upload
}
