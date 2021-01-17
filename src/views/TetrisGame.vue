<template>
	<div class="tetris-game flex-center">
		<ScoreBoard />
		<GameBoard />
		<NextPieces />
	</div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue'
import NextPieces from '@/components/NextPieces.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
export default {
	name: 'TetrisGame',
	components: {
		GameBoard,
		NextPieces,
		ScoreBoard,
	},
	created() {
		this.$store.commit('initPieces')
	},
}
</script>
