<template>
	<div>
		<div>Selected: {{ selected }}</div>

		<select v-model="selected">
			<option
				v-for="(item, index) in getOptions"
				:key="index"
				:value="item">{{item}}</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'CustomSelect',
	props: {
		value: {
			type: [Boolean, Number, String],
			default: null
		},
		options: {
			type: [Array]
		},
	},
	data () {
		return {
			selected: this.value,
		}
	},
	computed: {
		getOptions () {
			return this.options
		}
	},
	watch: {
		value (val) {
			this.selected = val
		},
		selected (val) {
			this.$emit('input', val)
			return this.$emit('change', val)
		}
	},
}
</script>

<style scoped>

</style>