<template>
	<div>
		<div class="input_wrapper">
			<div class="input_label">{{ label }}</div>
			<div class="input_validator">
				<div class="core-app-style__checkbox">
					<label class="on-off">

						<slot name="input-side"></slot>
<!--						<input type="checkbox">-->
						<span class="slider round"></span>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CoreFormCheckbox',
		props: {
			label: {
				type: [String],
				default: 'Label'
			},
		}

	}
</script>

<style scoped>

</style>