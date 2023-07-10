<template>
		<div>
				<h1>Shopping Cart Example</h1>
				<hr>
				<h2>Products</h2>
				<ProductList/>
				<hr>
				<ShoppingCart/>
				<hr>
				<custom-input
					v-model="inputData"
				>

				</custom-input>

			<hr>

				<custom-select
					v-model="selectedValue"
					@change="(value) => selectedValue = value"
					:value="selectedValue"
					:options="selectOptionData"
				></custom-select>
		</div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'

import CustomInput from "@/pages/Test/components/CustomInput.vue";
import CustomSelect from "@/pages/Test/components/CustomSelect.vue";
export default {
	name: 'TestVuex',
	components: { ProductList, ShoppingCart, CustomInput, CustomSelect },
	data() {
		return {
			inputData: '',
			selectedValue: 2,
			selectOptionData: [1, 2, 3, 4, 5]
		}
	},
	watch: {
		inputData(value) {
			console.log('inputData changed', value)
		},
		selectedValue(value) {
			console.log('selectedValue changed', value)
		}
	}
}
</script>