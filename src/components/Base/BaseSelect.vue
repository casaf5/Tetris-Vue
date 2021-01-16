<template>
	<div class="base-select">
		<label for="b-select"> {{ label }} </label>
		<select id="b-select" v-model="selected" @change="emitSelected">
			<option v-for="option in options" value="option">{{ option }}</option>
		</select>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			required: true,
		},
		label: {
			type: String,
		},
	},
	data() {
		return {
			selected: '',
		};
	},
	methods: {
		emitSelected() {
			this.$emit('select', this.selected);
		},
	},
};
</script>
