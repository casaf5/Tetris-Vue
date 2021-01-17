import Vue from 'vue'
import Vuex from 'vuex'
import { piecesModule } from './modules/Pieces'
import { scoreModule } from './modules/Score'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		piecesModule,
		scoreModule,
	},
})
