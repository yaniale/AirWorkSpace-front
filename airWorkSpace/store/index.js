export const state = () => ({
  centers: [],
  showDescription: []
  // token: ''
})

export const mutations = {
  addCenters (state, centers) {
    state.centers = centers
    state.showDescription = []
    state.centers.forEach((element) => {
      state.showDescription.push(false)
    })
  }
  // addToken (state, token) {
  //   state.token = token
  // }
}

export const actions = {
  async login (state, { email, password }) {
    const { data } = await this.$auth.loginWith('local', { data: { email, password } })
    return data
  }
}
