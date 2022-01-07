import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import axios from 'axios'
import { api } from 'boot/axios'
import { prefix } from '../apiConfig'

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
          id: '',
          name: '',
          email: '',
          photoURL: '',
          status: 'online',
          rollNo: '19fh1a0546',
          regulation: 'R19',
          year: 'III',
          sem: 'I',
        },
        tab: 'home',
        socket: null,
        typingUsers: [
        ],
      }
    },
    mutations: {
      setUserStatus(state, status) {
        state.userData.status = status
      },
      setUserData(state, payload) {
        console.log('setUserData', payload)
        state.userData = payload
        localStorage.setItem('userData', JSON.stringify(state.userData))
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
      updateTab(state, payload) {
        console.log("go home", payload);
        state.tab = payload
      },
      addToTypingUsers(state, payload) {
        state.typingUsers.push(payload)
      },
      removeFromTypingUsers(state, payload) {
        state.typingUsers = state.typingUsers.filter(user => user.id != payload.id)
      }

    },
    actions: {
      getUserData({ commit }, user) {
        //gets the userInfo from API and replace default photoURL if custom 
        //is present and store it in the state
        api.post('/user/getUser',
          // .post('http://localhost:4000/user/getUser',
          { uid: user.uid }).then(res => {
            console.log(res.data)
            //set custom profile pic if exists
            if (res.data.customProfilePic) {
              // console.log(res.data.photoURL)
              res.data.photoURL = prefix + '/user/getPhotoURL/' + res.data.uid
              // res.data.photoURL = 'http://localhost:4000/user/getPhotoURL/' + res.data.uid
              // console.log(res.data.photoURL)
            }
            commit('setUserData', res.data)
          })
          .catch(err => console.log('error in updateUserData', err))
      },
      updateTypingUsers({ commit }, payload) {
        if (payload.typing == true) {
          commit('addToTypingUsers', payload)
          //timeout to remove user from typingUsers
          setTimeout(() => {
            commit('removeFromTypingUsers', payload)
          }, 50000)
        }
        else
          commit('removeFromTypingUsers', payload)
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
