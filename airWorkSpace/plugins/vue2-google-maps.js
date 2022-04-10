import Vue from 'vue'
import * as google from
  '~/node_modules/vue2-google-maps/src/main'

Vue.use(google, {
  load: {
    key: 'AIzaSyCw64feQUiXW63IUphR-PbYzkPwl61g2fA',
    libraries: 'places'
  }
})
