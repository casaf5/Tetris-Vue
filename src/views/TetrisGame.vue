<template>
	<div class="tetris-game flex-center">
		<GameBoard />
		<!-- <NextPiecesBoard /> -->
	</div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue'
import NextPiecesBoard from '@/components/NextPiecesBoard.vue'
export default {
	name: 'TetrisGame',
	components: {
		GameBoard,
		NextPiecesBoard,
	},
	created() {
		this.$store.commit('initPieces')
	},
}
</script>
