export const scoreModule = {
	namespaced: true,
	state: {
		score: 0,
		linesToLevelUp: 2,
		scoringPoints: [0, 40, 100, 300, 1200],
		level: 0,
	},
	getters: {
		level(state) {
			return state.level
		},
	},
	mutations: {
		updateScore(state, lines) {
			state.linesToLevelUp -= lines
			state.score += (state.level + 1) * state.scoringPoints[lines]
			if (state.linesToLevelUp <= 0) {
				state.linesToLevelUp += 10
				state.level++
			}
		},
	},
	actions: {
		updateValue({ commit }, payload) {
			commit('updateValue', payload)
		},
	},
}
