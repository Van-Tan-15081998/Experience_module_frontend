<template>
	<div
		:class="{'expanded': contentListSideExpanded}"
		class="core-transition-content-list-expand">
		<div
			@click="contentListSideExpanded = !contentListSideExpanded"
			class="header-side">
			<div class="header-title">
				{{ title }}
			</div>

			<div class="btn-toggle-expand">
				<i v-if="contentListSideExpanded" class="bi bi-caret-up-fill"></i>
				<i v-else class="bi bi-caret-down-fill"></i>
			</div>
		</div>

		<Transition name="content">

			<div
				v-if="contentListSideExpanded"
				class="content-list-side">
				<div class="content-side">
					<slot name="contentListSide"></slot>
				</div>
			</div>

		</Transition>

	</div>
</template>

<script>
export default {
	name: 'CoreTransitionContentListExpand',
	props: {
		title: {
			type: String,
			default: 'Title'
		},
	},
	data() {
		return {
			contentListSideExpanded: true
		}
	}
}
</script>

<style scoped lang="scss">
.core-transition-content-list-expand {
	position: relative;
	width: 100%;
	height: auto;
	overflow: hidden;
	padding: 5px;

	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: end;
	align-content: center;

	.header-side {
		position: relative;
		width: 100%;
		height: 40px;

		padding: 0 10px;
		margin: 5px;

		border-radius: 6px;
		background-color: #1b1f23;
		box-shadow: -4px -2px 4px 0px #262830,
		4px 2px 6px 0px #111316;
		cursor: pointer;
		user-select: none;

		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		align-content: center;

		z-index: 10;

		.header-title {
			font-size: 16px;
		}

		.btn-toggle-expand {
			i {
				transition: 0.2s;
			}
		}
	}

	.content-list-side {
		position: relative;
		width: calc(100% - 20px);
		height: auto;
		padding: 10px;
		margin: 5px;

		z-index: 5;
		// Đặt z-index = 5 ( < z-index của header-side, nhằm ẩn bên dưới header-side khi bật tắt expand)

		.content-side {
			position: relative;
			z-index: 6;
			// Đặt z-index = 6 để nội dung của content-side có thể thao tác được ( > 5 & < 10)
		}

		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			border-radius: 6px;
			box-shadow: 2px 2px 2px 0px #111316 inset,
			-2px -2px 2px 0px #262830 inset;
		}
	}


	&.expanded {

		.header-side {

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				border-radius: 6px;
				box-shadow: 2px 2px 2px 0px #111316 inset,
				-2px -2px 2px 0px #262830 inset;
			}
		}
	}
}

.content-enter-active {
	transition: all 0.2s;
	animation: fall-fall-out 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}
.content-leave-active {
	transition: all 0.2s;
	animation: fall-fall-in 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}

.content-enter-from,
.content-leave-to {
	transform: translateY(-20px);
	opacity: 0;
}
@keyframes fall-fall-out {
	0% {
		transform: translateY(-20px);
		transform-origin: top;
		opacity: 0;
	}

	100% {
		transform: translateY(0);
		transform-origin: top;
		opacity: 1;
	}
}
@keyframes fall-fall-in {
	0% {
		transform: translateY(0);
		transform-origin: top;
		opacity: 1;
	}

	100% {
		transform: translateY(-20px);
		transform-origin: top;
		opacity: 0;
	}
}
</style>