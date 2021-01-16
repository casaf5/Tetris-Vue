<template>
	<div class="base-input flex col">
		<label for="b-input"> {{ label }} </label>
		<input id="b-input" type="text" v-model="inputData" :placeholder="text" @input="emitInput" />
	</div>
</template>

<script>
export default {
	name: 'BaseInput',
	props: {
		text: {
			type: String,
		},
		label: {
			type: String,
		},
	},
	data() {
		return {
			inputData: '',
		};
	},
	methods: {
		emitInput() {
			this.$emit('input', this.inputData);
		},
	},
};
</script>
