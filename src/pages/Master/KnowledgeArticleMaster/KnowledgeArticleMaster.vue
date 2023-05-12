<template>
	<div class="master">
		<div
			class="left-content"
			:class="{'isExpanded': isExpanded}"
		>
			<div class="master-menu">
				<div
					@click="toggleExpand"
					class="toggle-master-menu">
					<i v-if="isExpanded" class="bi bi-chevron-bar-left"></i>
					<i v-else class="bi bi-chevron-bar-right"></i>
				</div>
				<ul>
					<router-link to="/master/knowledge_article_master/subject/list">
						<li>
							<div class="menu-item">
								<div class="menu-icon"><i class="bi bi-journal-text"></i></div>
								<div class="menu-label">Subject</div>
							</div>
						</li>
					</router-link>
				</ul>
			</div>
		</div>
		<div class="page-content">

			<transition name="router-anim">
				<router-view></router-view>
			</transition>

		</div>
	</div>
</template>

<script>
export default {
	name: 'KnowledgeArticleMaster',
	data() {
		return {
			isExpanded: false
		}
	},
	methods: {
		toggleExpand() {
			this.isExpanded = !this.isExpanded;
		}
	}
}
</script>

<style scoped lang="scss">
.master {
	position: absolute;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

.left-content {
	width: 30px;
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	transition: 0.5s;
	border-right: 1px solid #948C6A;

.master-menu {
	width: 30px;
	height: 100%;
	transition: 0.5s;

.toggle-master-menu {
	height: 30px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

&:hover {
	background-color: white;
	cursor: pointer;

i {
	color: #EB8600;
}
}

i {
	font-size: 18px;
	color: #85EDEE;
}
}

ul {
a {
	text-decoration: none;
}

li {
	background-color: white;
	min-height: 30px;
	height: fit-content;
	list-style: none;

.menu-item {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: flex-start;
	line-height: 30px;
	font-size: 14px;

.menu-icon {
	margin: 0px 5px;
	transition: 0.5s;
	color: #36382e;
}

.menu-label {
	width: 100%;
	height: 100%;
	opacity: 0;
	display: none;
	transition: 0.5s;
	color: #36382e;
}
}

&:hover {
	background-color: #B6FF1F;
	cursor: pointer;
 }
}
}
}

&.isExpanded {
	width: 160px;

.master-menu {
	width: 160px;

ul {
li {
.menu-item {
	justify-content: flex-start;

.menu-label {
	opacity: 1;
	display: block;
}
}
}
}
}
}
}

.page-content {
	position: relative;
	width: 100%;
	height: 100%;
//background-image: url('https://live.staticflickr.com/65535/52762317120_902d6d20ca_h.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	overflow: hidden;
}



.router-anim-enter-active {
	animation: coming 0.2s;
	animation-delay: 0.2s;
	opacity: 0;
}
.router-anim-leave-active {
	animation: going 0.2s;
}
@keyframes going {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(-20px);
		opacity: 0;
	}
}
@keyframes coming {
	from {
		transform: translateX(-20px);
		opacity: 0;
	}
	to {
		transform: translateX(0px);
		opacity: 1;
	}
}
}
</style>