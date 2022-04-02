import axios from 'axios'

const api = axios.create({
  baseURL: 'https://airworkspace-api.herokuapp.com/api'
})

export default {
  async manageFavourite (id, token) {
    api.setHeader(token, token, 'common')
    const response = await api.put(`/user/profile/favourites/${id}`)
    return response
  }
}
