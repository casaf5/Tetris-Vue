<template>
	<transition name="fade">
		<div class="game-over-screen flex-center col">
			<h5 class="title">Game Over !</h5>
		</div>
	</transition>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.fade-enter {
	opacity: 0;
	transform: scale(0);
}

.fade-enter-active,
.fade-leave-active {
	transition: 1s ease-in;
}

.fade-leave-to {
	opacity: 0;
	transform: scale(0);
}
</style>
