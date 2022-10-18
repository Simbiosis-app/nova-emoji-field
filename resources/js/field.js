import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-nova-emoji-field', IndexField)
  app.component('detail-nova-emoji-field', DetailField)
  app.component('form-nova-emoji-field', FormField)
})
