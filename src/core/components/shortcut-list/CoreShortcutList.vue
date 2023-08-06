<template>
	<div v-if="getList.length > 0">
		<div class="shortcut-list-wrapper">
			<div v-for="(item, index ) in getList" :key="index" @click="goto(item[idString] + '-scroll-address')" class="shortcut-item"
			>
				{{ item[titleString] }}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CoreShortcutList",
	props: {
		list : {
			type: [Array],
			default() {
				return [];
			}
		},
		idString: {
			type: [String],
			default() {
				return 'id';
			}
		},
		titleString: {
			type: [String],
			default() {
				return 'title'
			}
		},
		callbackGoto: {
			type: [Function],
			default() {
				return null;
			}
		}
	},
	computed: {
		getList() {
			return this.list.length > 0 ? this.list : [];
		}
	},

	methods: {
		goto(address = '') {
			this.exEventBus.emit(
				'SHORTCUT_GOTO_DETAIL',
				address
			);
		}
	}
}
</script>

<style scoped lang="scss">
.shortcut-list-wrapper {
	margin: 10px;

	.shortcut-item {
		min-height: 35px;
		margin: 5px;
		padding: 5px 5px 5px 10px;
		font-size: 15px;
		cursor: pointer;
		user-select: none;
		border: 1px solid #626262;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border-right: none;
		color: lightgrey;
		transition: 0.1s;
		transform-origin: right;

		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		align-content: center;

		&:hover {
			border-color: #ffc517;
		}

		&:active {
			border-color: orange;
			transform: scaleX(0.96);
		}

		&.selected {
			font-size: 18px;
			border-color: orange;
			color: yellow;
		}
	}
}
</style>