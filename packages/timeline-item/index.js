import FrTimelineItem from '../timeline/src/item.vue';

FrTimelineItem.install = function (Vue) {
  Vue.component(FrTimelineItem.name, FrTimelineItem)
};

export default FrTimelineItem;
