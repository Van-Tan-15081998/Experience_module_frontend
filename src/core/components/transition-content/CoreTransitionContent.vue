<template>
	<div class="core-transition-content">
		<Transition name="content">

			<slot name="transition-content-side"></slot>

		</Transition>
	</div>
</template>

<script>
export default {
	name: 'CoreTransitionContent'
}
</script>

<style scoped lang="scss">
.core-transition-content {
	padding: 5px;
}

.content-enter-active {
	transition: all 0.2s;
	animation: jump-jump-out 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}
.content-leave-active {
	transition: all 0.2s;
	animation: jump-jump-in 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}

.content-enter-from,
.content-leave-to {
	transform: translateX(0);
	opacity: 0;
}
@keyframes jump-jump-out {
	0% {
		transform: translateX(10px);
		opacity: 0;
	}

	100% {
		transform: translateX(0);
		opacity: 1;
	}
}
@keyframes jump-jump-in {
	0% {
		transform: translateX(0);
		opacity: 1;
	}

	100% {
		transform: translateX(10px);
		opacity: 0;
	}
}
</style>