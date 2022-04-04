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
    const month = this.$store.state.monthShortName[new Date(date).getMonth()]
    const year = new Date(date).getFullYear()
    const day = new Date(date).getDate()
    return `${day}, ${month} ${year}`
  }
}

module.exports = utils
