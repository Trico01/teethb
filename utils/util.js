const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  var hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const day_or_night = Math.floor(hour/12)
  hour = hour % 12

  if (day_or_night==1) {
    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')} ${"PM"}`
  }else{
    return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')} ${"AM"}`
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}
