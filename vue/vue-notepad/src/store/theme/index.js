import * as func from '../function'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = func.theme_local.get() || {
  theme: 'blue'
}

export default {
  state,
  actions,
  getters,
  mutations
}
