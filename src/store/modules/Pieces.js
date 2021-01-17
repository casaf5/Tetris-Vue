export const piecesModule = {
	state: {
		nextShape: null,
		nextPieces: [],
		piecesTypes: ['O', 'L', 'J', 'Z', 'S', 'I', 'T'],
	},
	getters: {
		nextShape(state) {
			return state.nextPieces.shift()
		},
		nextPieces(state) {
			return state.nextPieces
		},
	},
	mutations: {
		initPieces(state) {
			let pieces = [...state.piecesTypes]
			state.nextPieces = Array.from({ length: 4 }, () => {
				let idx = Math.floor(Math.random() * pieces.length)
				return pieces.splice(idx, 1)[0]
			})
		},
		addPiece(state) {
			let randIdx = Math.floor(Math.random() * 4)
			let shape = state.piecesTypes[randIdx]
			state.piecesTypes.splice(randIdx, 1)
			state.piecesTypes.push(shape)
			state.nextPieces.push(shape)
		},
	},
}
