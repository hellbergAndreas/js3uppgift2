const ROOT_URL = "https://frebi.willandskill.eu/"
const API_URL = `${ROOT_URL}api/v1/`

export default class {
  async login(user) {
    const url = `${ROOT_URL}api-token-auth/`
    const payload = user
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async activateUser(uid, token) {
    const url = `${ROOT_URL}auth/users/activate`
    const payload = { uid, token }
    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async register(user) {
    const url = `${ROOT_URL}auth/users/`
    const payload = user

    return fetch(url, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async getCurrentUser() {
    const url = `${ROOT_URL}api/v1/me/`

    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }
  async addCustomer(customer) {
    const url = `${API_URL}customers`
    const payload = customer
    return fetch(url, {
      method: "POST",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }
  async getCustomers() {
    const url = `${API_URL}customers/`
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }
  async getCustomer(id) {
    const url = `${API_URL}customers/${id}/`
    return fetch(url, {
      headers: this.getPrivateHeaders(),
    })
  }
  async deleteCustomer(id) {
    const url = `${API_URL}customers/${id}/`
    return fetch(url, {
      method: "DELETE",
      headers: this.getPrivateHeaders(),
    })
  }

  async updateCustomer(id, fieldValues) {
    const payload = fieldValues
    const url = `${API_URL}customers/${id}/`
    return fetch(url, {
      method: "PUT",
      headers: this.getPrivateHeaders(),
      body: JSON.stringify(payload),
    })
  }

  getPublicHeaders() {
    return {
      "Content-Type": "application/json",
    }
  }
  getPrivateHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getSessionToken()}`,
    }
  }
  setSessionToken(token) {
    sessionStorage.setItem("sessionToken", token)
  }
  getSessionToken() {
    return sessionStorage.getItem("sessionToken")
  }
}
