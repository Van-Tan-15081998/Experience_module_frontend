<template>
	<div class="knowledge-article-content-unit-item">
		<div class="header">
			<div class="title">
				<b>{{ index }} . {{ data.title }}</b>
			</div>
			<div class="actions">
				<button
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
					<div class="image">
						<img src="https://live.staticflickr.com/65535/51495955589_0d692a8d07_c.jpg" alt="">
						<p class="image-title">Ảnh 1</p>
					</div>
					<div class="image">
						<img src="https://live.staticflickr.com/65535/51496207125_01fde41b23_c.jpg" alt="">
						<p class="image-title">Ảnh 2</p>
					</div>
				</div>
			</div>

			<div class="center">
				<div class="content">
					{{ data.unitContent }}
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
		}
	}
}
</script>

<style scoped lang="scss">
.knowledge-article-content-unit-item {
	display: flex;
	flex-direction: column;

	padding: 0 10px;
	margin-bottom: 10px;
	background-color: #1b1f23;
	border-radius: 6px;
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
				padding: 5px 0px;

				.image {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: center;

					img {
						width: 100%;
						height: auto;

						border-radius: 5px;
						margin-bottom: 5px;
					}

					.image-title {
						font-size: 15px;
					}
				}
			}
		}

		.center {
			width: 60%;
			padding: 5px 10px;
			margin: 0 5px;
			border-left: 1px dashed #656565;
			border-right: 1px dashed #656565;

			.content {

			}
		}

		.right {
			width: 20%;
		}
	}
}
</style>