
<script>
export default {
	name: 'CoreTemplate',

	data() {
		return {
			isOpenModal: false,
		}
	},

	mounted() {
		this.exEventBus.on('CLOSE_MODAL', ()=> {
			this.isOpenModal = false
		});
	},
}
</script>

<style scoped>

</style>