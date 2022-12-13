import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import VueMultiselect from 'vue-multiselect'

export default ({ $axios, store }, inject) => {
  Vue.use(Vue2Filters)
  Vue.component('vue-multiselect', VueMultiselect)

  Vue.filter('truncate', function (text, length, clamp) {
    text = text || '';
    clamp = clamp || '...';
    length = length || 30;

    if (text.length <= length) return text;

    let tcText = text.slice(0, length - clamp.length);
    let last = tcText.length - 1;

    while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

    // Fix for case when text don't have any `space`
    last = last || length - clamp.length;

    tcText =  tcText.slice(0, last);

    return tcText + clamp;
  });


}
