import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

export function rafThrottle(fn) {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}

export const isFirefox = function () {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i);
};
