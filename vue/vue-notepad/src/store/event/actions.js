export default {
  add_event: ({commit}, param) => commit('ADDEVENT', {items: param}),
  done_event: ({commit}, param) => commit('EVENTDONE', {id: param}),
  todo_event: ({commit}, param) => commit('EVENTTODO', {id: param}),
  cancel_event: ({commit}, param) => commit('EVENTCANCEL', {id: param}),
  clear_event: ({commit}) => commit('CLEAREVENT'),
  del_event: ({commit}, param) => commit('DELEVENT', param),
  edit_event: ({commit}, param) => commit('EDITEVENT', param),
  upload_event: ({commit}, param) => commit('UPLOADEVENT', param)
}
