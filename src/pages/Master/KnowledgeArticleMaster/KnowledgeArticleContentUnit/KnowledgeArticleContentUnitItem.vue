<template>
	<div :id="data.knowledgeArticleContentUnitId + '-scroll-address'" class="hidden-item-for-shortcut"></div>
	<div class="knowledge-article-content-unit-item">
		<div class="header">
			<div class="title core-app-style__text c-label">
				<b>{{ index }} . {{ data.title }}</b>
			</div>
			<div class="actions">
				<button
					@click="onGoEditPage"
					class="core-app-style__button blue-harmony-color icon-effect-zoom-in">
					<i class="bi bi-pencil-fill"></i>
				</button>
				<button class="core-app-style__button red-harmony-color icon-effect-zoom-in">
					<i class="bi bi-trash3-fill"></i>
				</button>
			</div>
		</div>
		<div class="main-body">
			<div class="left">
				<div class="images">

					<div v-if="data.imageList">
						<div
							v-for="(item, index) in data.imageList"
							:key="index"
							class="image">
							<div class="core-app-style__container full-size">
								<img class="core-img-responsive" :src="'http://192.168.1.4:8000/' + item.imageSource" alt="">
							</div>
							<p class="image-title">Ảnh 1</p>
						</div>
					</div>

				</div>
			</div>

			<div class="center">
				<div class="content">
<!--					{{ data.unitContent }}-->
					<div v-html="data.unitContent"></div>
				</div>
			</div>

			<div class="right">
				<div class="related-content">
					C
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	name: 'KnowledgeArticleContentUnitItem',
	props: {
		index: {
			type: Number,
			default() {
				return 1;
			}
		},
		data: {
			type: Object, Array,
			default() {
				return null
			}
		},
	},
	methods: {
		onGoEditPage() {
			this.$router.push({ name: 'knowledge_article_content_unit_detail', query: { id: this.data.knowledgeArticleContentUnitId, actionMode: 'edit'}})
		}
	}
}
</script>

<style scoped lang="scss">
.hidden-item-for-shortcut {
	width: 100%;
	height: 2px;
}

.knowledge-article-content-unit-item {
	display: flex;
	flex-direction: column;

	padding: 0 10px;
	margin: 5px 5px 10px 5px;
	//background-color: #1b1f23;
	background-color: inherit;
	border-radius: 6px;
	border: 1px solid #626262;
	box-shadow: -2px -1px 2px 0px #262830,
	2px 1px 4px 0px #0e1013;

	.header {
		width: 100%;
		border-bottom: 1px solid #656565;
		height: 50px;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		align-content: center;

		.title {
			width: fit-content;
		}

		.actions {
			width: fit-content;
		}
	}

	.main-body {
		width: 100%;
		display: flex;
		flex-direction: row;

		.left {
			width: 20%;

			.images {
				width: 100%;
				padding: 5px 5px 0 0;

				.image {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;

					.image-title {
						font-size: 15px;
						margin-top: 2px;
					}
				}
			}
		}

		.center {
			width: 60%;

			padding: 0 10px;
			border-left: 1px dashed #656565;
			border-right: 1px dashed #656565;

			.content {
				padding: 5px 10px;
				background-color: #F5F6CF;
				white-space: pre-line;
				color: #555;
				font-size: 16px;
				line-height: 30px !important;
				text-align: justify;
			}
		}

		.right {
			width: 20%;
		}
	}
}
</style>