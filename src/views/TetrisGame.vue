<template>
	<div class="tetris-game flex-center">
		<GameBoard />
		<NextPieces />
	</div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue'
import NextPieces from '@/components/NextPieces.vue'
export default {
	name: 'TetrisGame',
	components: {
		GameBoard,
		NextPieces,
	},
	created() {
		this.$store.commit('initPieces')
	},
}
</script>
