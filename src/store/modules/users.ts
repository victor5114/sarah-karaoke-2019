import Vue from 'vue';
// import usersResource, { formatUserForAPI } from '@/lib/resources/users';

interface IUserState {
  user: string;
}

const userState: IUserState = {
  user: '',
};

const userGetters = {
  user: (state: IUserState) => {
    return state.user;
  },
};

const mutations = {};
const actions = {};

export default {
  namespaced: true,
  state: userState,
  getters: userGetters,
  mutations,
  actions,
};
