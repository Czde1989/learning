import * as type from './types'
import * as func from '../function'

export default {
  [type.ADDEVENT] (state, obj) {
    state.count++
    obj.items.id = state.count
    state.event.unshift(obj.items)
    func.local.set(state)
  },
  [type.EVENTDONE] (state, obj) {
    let item
    for (let i = 0; i < state.event.length; i++) {
      if (state.event[i].id === obj.id) {
        state.event[i].type = 2
        state.event[i].time = func.getDate()
        item = state.event[i]
        state.event.splice(i, 1)
        break
      }
    }
    state.event.unshift(item)
    func.local.set(state)
  },
  [type.EVENTTODO] (state, obj) {
    let item
    for (let i = 0; i < state.event.length; i++) {
      if (state.event[i].id === obj.id) {
        state.event[i].type = 1
        state.event[i].time = func.getDate()
        item = state.event[i]
        state.event.splice(i, 1)
        break
      }
    }
    state.event.unshift(item)
    func.local.set(state)
  },
  [type.EVENTCANCEL] (state, obj) {
    let item
    for (let i = 0; i < state.event.length; i++) {
      if (state.event[i].id === obj.id) {
        state.event[i].type = 3
        state.event[i].time = func.getDate()
        item = state.event[i]
        state.event.splice(i, 1)
        break
      }
    }
    state.event.unshift(item)
    func.local.set(state)
  },
  [type.CLEAREVENT] (state) {
    state.event = []
    func.local.clear()
  },
  [type.DELEVENT] (state, info) {
    if (state.event[info.index].id === info.id) {
      state.event.splice(info.index, 1)
    } else {
      state.event.filter((d, i) => {
        if (d.id === info.id) {
          state.event.splice(i, 1)
        }
      })
    }
    func.local.set(state)
  },
  [type.EDITEVENT] (state, info) {
    if (state.event[info.index].id === info.id) {
      state.event[info.index].content = info.content
    } else {
      state.event.filter((d) => {
        if (d.id === info.id) {
          d.content = info.content
        }
      })
    }
    func.local.set(state)
  },
  [type.UPLOADEVENT] (state, data) {
    data = JSON.parse(data)
    state.event = data.event.event
    state.count = data.event.count
    func.local.set(state)
  }
}
