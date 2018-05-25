const LocalEvent = function (item) {
  this.get = function () {
    return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
  }
  this.set = function (obj) {
    localStorage.setItem(item, JSON.stringify(obj))
  }
  this.clear = function () {
    localStorage.removeItem(item)
  }
}

export const local = new LocalEvent('ad_notepad')
// eslint-disable-next-line
export const theme_local = new LocalEvent('ad_theme')
export const getDate = () => {
  const date = new Date()
  const month = parseInt(date.getMonth()) + 1
  return date.getFullYear() + '-' + month + '-' + date.getDate()
}
