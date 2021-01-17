<template>
	<div class="score-board flex-center col">
		<section class="title">SCORE</section>
		<h1>{{ score }}</h1>
		<section class="title">LEVEL</section>
		<h1>{{ level }}</h1>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'ScoreBoard',
	computed: {
		...mapState('scoreModule', ['level', 'score']),
	},
}
</script>
