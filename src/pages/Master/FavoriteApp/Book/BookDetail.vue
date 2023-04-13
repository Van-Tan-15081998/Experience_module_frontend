<template>
  <div>
    <h3>BookDetail</h3>
		{{itemId}}
  </div>
</template>

<script>
export default {
  name: 'BookDetail',
	props: {
		itemId : {
			type: Number,
			default: -1
		}
	}
}
</script>

<style scoped>

</style>