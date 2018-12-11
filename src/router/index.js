import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddApplication from '@/components/AddApplication'
import Auth from '@okta/okta-vue'

const client = '0oaeyy53nggBiZ33a0h7'
const orgURL = 'https://seth.oktapreview.com'
const baseRedirect = 'http://localhost:8080'

Vue.use(Auth, {
  issuer: orgURL + '/oauth2/default',
  client_id: client,
  redirect_uri: baseRedirect + '/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/add-application',
      name: 'AddApplication',
      component: AddApplication,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
