const utils = {
  getType (type) {
    switch (type) {
      case 'fixedDesk':
        return 'Mesa Fija'
      case 'hotDesk':
        return 'Mesa flexible'
      case 'office':
        return 'Oficina'
      case 'meetingRoom':
        return 'Sala de conferencias'
    }
  },
  formatDate (date) {
    const monthShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthShortName[new Date(date).getMonth()]
    const year = new Date(date).getFullYear()
    const day = new Date(date).getDate()
    return `${day}, ${month} ${year}`
  },
  capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

module.exports = utils
