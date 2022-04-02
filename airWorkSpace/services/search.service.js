import axios from 'axios'

const api = axios.create({
  baseURL: 'https://airworkspace-api.herokuapp.com/api'
})

export default {
  async search (query) {
    const response = await api.get(`/center?query=${query}`)
    return response.data
  }
}
