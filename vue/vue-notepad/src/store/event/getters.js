export default {
  getEventList (state) {
    return state.event
  },
  getTodo (state) {
    return state.event.filter((d) => d.type === 1)
  },
  getDone (state) {
    return state.event.filter((d) => d.type === 2)
  },
  getCancel (state) {
    return state.event.filter((d) => d.type === 3)
  }
}
