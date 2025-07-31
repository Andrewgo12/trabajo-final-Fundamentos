import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class AuthService {
  constructor() {
    this.token = localStorage.getItem('auth_token')
    this.refreshToken = localStorage.getItem('refresh_token')
  }

  // Login with email and password
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al iniciar sesión')
      }

      const data = await response.json()
      
      // Store tokens
      this.token = data.token
      this.refreshToken = data.refreshToken
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)

      return {
        user: data.user,
        token: data.token
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  // Register new user
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al registrarse')
      }

      const data = await response.json()
      
      // Store tokens
      this.token = data.token
      this.refreshToken = data.refreshToken
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)

      return {
        user: data.user,
        token: data.token
      }
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  // Logout user
  async logout() {
    try {
      if (this.token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear tokens regardless of API call success
      this.token = null
      this.refreshToken = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_data')
    }
  }

  // Get current user
  async getCurrentUser() {
    if (!this.token) {
      return null
    }

    try {
      // Check if token is expired
      const decoded = jwtDecode(this.token)
      if (decoded.exp * 1000 < Date.now()) {
        await this.refreshAccessToken()
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to get user data')
      }

      const userData = await response.json()
      localStorage.setItem('user_data', JSON.stringify(userData))
      return userData
    } catch (error) {
      console.error('Get current user error:', error)
      await this.logout()
      return null
    }
  }

  // Refresh access token
  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Failed to refresh token')
      }

      const data = await response.json()
      
      this.token = data.token
      localStorage.setItem('auth_token', data.token)

      return data.token
    } catch (error) {
      console.error('Refresh token error:', error)
      await this.logout()
      throw error
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al enviar email de recuperación')
      }

      return await response.json()
    } catch (error) {
      console.error('Forgot password error:', error)
      throw error
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al restablecer contraseña')
      }

      return await response.json()
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al actualizar perfil')
      }

      const updatedUser = await response.json()
      localStorage.setItem('user_data', JSON.stringify(updatedUser))
      return updatedUser
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !this.isTokenExpired()
  }

  // Check if token is expired
  isTokenExpired() {
    if (!this.token) return true
    
    try {
      const decoded = jwtDecode(this.token)
      return decoded.exp * 1000 < Date.now()
    } catch {
      return true
    }
  }

  // Get stored user data
  getStoredUser() {
    const userData = localStorage.getItem('user_data')
    return userData ? JSON.parse(userData) : null
  }

  // Get auth token
  getToken() {
    return this.token
  }
}

export default new AuthService()
