<template>
	<header class="grid-container">
		<div class="site-header-wrapper grid-pos-center flex align-center space-between">
			<section class="logo flex align-center">
				<img class="logo-img" src="@/assets/images/tetris-logo.png" alt="tetris-logo" />
				<h2>Tetris</h2>
			</section>
			<nav>
				<ul class="flex-center nav-links" :class="{ open: menuIsOpen }">
					<router-link tag="li" to="about">Play! </router-link>
					<router-link tag="li" to="contact">Leader Board </router-link>
					<router-link tag="li" to="special">About </router-link>
				</ul>
			</nav>
			<section class="hamburger" @click="openMenu" />
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			menuIsOpen: false,
		};
	},
	methods: {
		openMenu() {
			this.menuIsOpen = !this.menuIsOpen;
		},
	},
};
</script>
