import apiClient from '../api/index.js'

const state = {
    authenticated: false,
    users_list: []
};

const actions = {
    async fetchUsersList ({ commit }) {
        try {
            commit('setUsersList', await apiClient.getUsersList());
        } catch (err) {
            throw err;
        }
    }
};

const mutations = {
    setUsersList (state, users_list) {
        state.users_list = users_list;
    },
    setAuthenticationState(state, authentication_state) {
        state.authenticated = authentication_state;
        localStorage.authenticated = authentication_state;
    }
};


export default {
    namespaced: true,
    state,
    actions,
    mutations,
}