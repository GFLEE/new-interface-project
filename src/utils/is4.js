import { UserManager } from 'oidc-client'
import store from '@/store'

const userManager = new UserManager({
    authority: "https://localhost:5000",
    client_id: 'interface.core.ui',
    scope: "openid profile InterfaceAPI",
    response_type: "id_token token",
    redirect_uri:  window.location.origin + '/callback',
    post_logout_redirect_uri: "http://localhost:5000/",
    loadUserInfo: false
    
})

userManager.events.addUserSignedOut(async() => {
  store.dispatch('user/logout')
  account.logout()
})

class Account {
  async login() {
    await userManager.signinRedirect()
  }

  async logout() {
    await userManager.signoutRedirect()
  }

  async getAcessToken() {
    const user = await userManager.signinRedirectCallback()
    return user ? user.access_token : null
  }

  async getNewAcessToken() {
    const user = await userManager.signinSilentCallback()
    return user ? user.access_token : null
  }
}

const account = new Account()

export const getAcessToken = async() => account.getAcessToken()
export const getNewAcessToken = async() => account.getNewAcessToken()
export const login = async() => account.login()
export const logout = async() => account.logout()

export default account
