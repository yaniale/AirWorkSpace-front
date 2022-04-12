const utils = {
  getType (type) {
    switch (type) {
      case 'fixedDesk':
        return 'Fixed Desk'
      case 'hotDesk':
        return 'Flex Desk'
      case 'office':
        return 'Office'
      case 'meetingRoom':
        return 'Conference Room'
      case 'Fixed Desk':
        return 'fixedDesk'
      case 'Flex Desk':
        return 'hotDesk'
      case 'Office':
        return 'office'
      case 'Conference Room':
        return 'meetingRoom'
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
