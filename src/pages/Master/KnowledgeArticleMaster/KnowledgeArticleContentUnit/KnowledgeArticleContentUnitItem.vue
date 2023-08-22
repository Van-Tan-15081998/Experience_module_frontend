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
        <div class="content">
          <div
              v-if="data.unitContentLeftSide"
              class="content-detail" v-html="data.unitContentLeftSide"></div>
        </div>
			</div>

			<div class="center">
				<div class="content">
					<div class="content-detail" v-html="data.unitContent"></div>
				</div>
			</div>

			<div class="right">
        <div class="content">
          <div v-if="data.unitContentRightSide"
              class="content-detail" v-html="data.unitContentRightSide"></div>
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
    margin-bottom: 10px;

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
    margin-bottom: 10px;

		.left, .right {
			width: 20%;

      .content {
        padding: 5px 10px;
        background-color: #F5F6CF;

        .content-detail {
          white-space: pre-line;
          color: #555;
          font-size: 17px;
          line-height: 30px !important;
          text-align: justify;
          font-weight: 500;

          letter-spacing: -0.3px;
          font-family: "Open Sans", sans-serif;
        }
      }
		}

    .left {
      padding: 0 10px 0 0;
      .content {
        overflow: hidden;
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
      }
    }
    .right {
      padding: 0 0 0 10px;
      .content {
        overflow: hidden;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
      }
    }

		.center {
			width: 60%;

			padding: 0 10px;
			border-left: 1px dashed #656565;
			border-right: 1px dashed #656565;

			.content {
        height: 100%;
				padding: 5px 10px;
				background-color: #F5F6CF;

        .content-detail {
          white-space: pre-line;
          color: #555;
          font-size: 17px;
          line-height: 30px !important;
          text-align: justify;
          font-weight: 500;

          letter-spacing: -0.3px;
          font-family: "Open Sans", sans-serif;
        }
			}
		}
	}
}
</style>