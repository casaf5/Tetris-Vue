<template>
	<div class="next-pieces flex-center col">
		<h1 class="title">NEXT</h1>
		<div class="pieces flex col">
			<img v-for="shape in pieces" :src="require(`../assets/images/${shape}.svg`)" alt="shape" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'NextPiecesBoard',
	computed: {
		pieces() {
			return this.$store.getters.nextPieces
		},
	},
}
</script>

<style lang="scss" scoped></style>
