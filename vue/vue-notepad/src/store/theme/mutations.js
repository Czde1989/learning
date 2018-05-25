import * as func from '../function'

export default {
  SWITCHTHEME (state, obj) {
    state.theme = obj.theme
    func.theme_local.set(state)
  }
}
