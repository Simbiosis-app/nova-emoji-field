Nova.booting((Vue, router, store) => {
  Vue.component('index-nova-emoji-field', require('./components/IndexField'))
  Vue.component('detail-nova-emoji-field', require('./components/DetailField'))
  Vue.component('form-nova-emoji-field', require('./components/FormField'))
})
