<template>
	<div class="next-pieces-board">
		<header>NEXT</header>
		<table class="next-board">
			<tr>
				<td></td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'NextPiecesBoard',
	props: {
		pieces: {
			type: Array,
		},
	},
}
</script>

<style lang="scss" scoped></style>
