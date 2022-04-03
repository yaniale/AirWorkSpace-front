export const state = () => ({
  centers: [],
  showDescription: [],
  monthShortName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
})

export const mutations = {
  addCenters (state, centers) {
    state.centers = centers
    state.showDescription = []
    state.centers.forEach((element) => {
      state.showDescription.push(false)
    })
  }
}

export const actions = {
  async login (state, { email, password }) {
    const { data } = await this.$auth.loginWith('local', { data: { email, password } })
    return data
  }
}
