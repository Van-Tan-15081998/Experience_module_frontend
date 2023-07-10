<template>
	<input
		v-model="content"
		:type="type"
		:min="min"
		:max="max"
	/>
</template>

<script>
export default {
	name: 'CustomInput',
	props: {
		value: {
			type: [Boolean, Number, String]
		},
		type: {
			type: [String],
			default: 'text'
		},
		min: {
			type: [Number, String],
			default: 0
		},
		max: {
			type: [Number, String],
			default: ''
		},
		round: {
			type: [Number],
			default: 0
		},
		defaultValue: {
			type: [Number, String],
			default: ''
		}
	},
	data () {
		return {
			content: Number(this.value)
		}
	},
	watch: {
		value (val) {
			this.content = Number(val)
		},
		content (val) {
			switch (this.type) {
				case 'number': {
					if (val) {
						return this.$emit('input', Number(val))
					}
					return this.$emit('input', this.defaultValue)
				}
				default: {
					this.$emit('input', val)
				}
			}
		}
	}
}
</script>
