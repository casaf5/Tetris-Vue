import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		nextShape: null,
		nextPieces: [],
		piecesTypes: ['O', 'L', 'J', 'Z', 'S', 'I', 'T'],
	},
	getters: {
		nextShape(state) {
			return state.nextShape
		},
	},
	mutations: {
		initPieces(state) {
			let pieces = [...state.piecesTypes]
			state.nextPieces = Array.from({ length: 4 }, () => {
				let idx = Math.floor(Math.random() * pieces.length)
				return pieces.splice(idx, 1)[0]
			})
			state.nextShape = state.nextPieces.shift()
		},
		addPiece(state) {
			let randIdx = Math.floor(Math.random() * 6)
			let shape = state.piecesTypes[randIdx]
			state.piecesTypes.splice(randIdx, 1)
			state.piecesTypes.push(shape)
			state.nextPieces.push(shape)
			state.nextShape = state.nextPieces.shift()
		},
	},
	actions: {},
	modules: {},
})
