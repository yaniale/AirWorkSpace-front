export const state = () => ({
  centers: [],
  showDescription: []
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
