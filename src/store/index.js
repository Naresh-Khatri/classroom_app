import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state() {
      return {
        msgsData: [],
        userData: {
          name: '',
          email: '',
          photoURL: ''
        },
        socket:null,
      }
    },
    mutations: {
      setUserData(state, payload) {
        console.log('setUserData', payload)
        state.userData = payload
      },
      updateMsgsData(state, payload) {
        state.msgsData = payload
      },
      appendNewMsgData(state, payload) {
        state.msgsData.push(payload)
      },
      updateSocket(state, payload) {
        state.socket = payload
      },

    },

    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
