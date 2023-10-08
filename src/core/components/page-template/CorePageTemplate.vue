<template>
	<div class="core-page-template">
		<div class="core-page-template-background"></div>
		<div
			v-if="isLoadingPage"
			class="loading-page-side">
			<core-component-loader/>
		</div>

    <div class="box">
      <div
          v-if="isProcessingPage"
          class="loading-bar"></div>
    </div>

		<div class="page-title-side">
			{{ pageTitle }}
		</div>

		<div class="page-content-side">
			<div
				:class="{'expanded': leftSideExpanded}"
				class="left-side">
				<button
					@click="leftSideExpanded = !leftSideExpanded"
					class="btn-toggle-expand core-app-style__button blue-harmony-color icon-effect-zoom-in">
					<i v-if="leftSideExpanded" class="bi bi-skip-start"></i>
					<i v-else class="bi bi-skip-end"></i>
				</button>

<!--				<slot name="backButton"></slot>-->
				<core-back-button/>

				<div class="content-side">
					<slot name="leftSide"></slot>
				</div>

			</div>

			<div
				:class="{'width-full-on-all': !leftSideExpanded && !rightSideExpanded,
								'width-full-on-left': !leftSideExpanded && rightSideExpanded,
								'width-full-on-right': leftSideExpanded && !rightSideExpanded}"
				class="center-side">
				<div
					ref="hiddenTopElement"
					style="position: absolute; top: 0}"
				></div>


          <div v-if="isShowSearchBar"
              class="content-side-with-search-bar">
            <div class="searchBar">
              <slot name="searchBar"></slot>
            </div>
            <div class="content-side">
              <slot name="centerSide"></slot>
            </div>
          </div>


          <div v-else class="content-side">
            <slot name="centerSide"></slot>
          </div>


				<div
					ref="hiddenBottomElement"
					style="position: absolute; bottom: 0}"
				></div>
			</div>

			<div
				:class="{'expanded': rightSideExpanded}"
				class="right-side">
				<button
					@click="rightSideExpanded = !rightSideExpanded"
					class="btn-toggle-expand core-app-style__button blue-harmony-color icon-effect-zoom-in">
					<i v-if="rightSideExpanded" class="bi bi-skip-end"></i>
					<i v-else class="bi bi-skip-start"></i>
				</button>

				<div class="content-side core-display-flex__LTB">
					<slot name="rightSide"></slot>
				</div>

				<div class="btn-up-down">
					<button
						@click="onUp"
						class="core-app-style__button blue-harmony-color icon-effect-zoom-in">
						<i class="bi bi-chevron-double-up"></i>
					</button>
					<button
						@click="onDown"
						class="core-app-style__button blue-harmony-color icon-effect-zoom-in">
						<i class="bi bi-chevron-double-down"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CoreComponentLoader from "@/core/components/loader/CoreComponentLoader.vue";
import CoreBackButton from "@/core/components/back-button/CoreBackButton.vue";
export default {
	name: 'CorePageTemplate',
	components: {
		CoreComponentLoader,
		CoreBackButton
	},
	data() {
		return {
			leftSideExpanded: true,
			rightSideExpanded: true
		}
	},
	props: {
		pageTitle: {
			type: String,
			default: 'Title'
		},
		defaultLeftSideExpanded: {
			type: Boolean,
			default: true
		},
		defaultRightSideExpanded: {
			type: Boolean,
			default: true
		},
		isLoadingPage: {
			type: Boolean,
			default: true
		},
    isProcessingPage: {
      type: Boolean,
      default: false
    },
    isShowSearchBar: {
      type: Boolean,
      default: false
    }
	},
	mounted() {
		this.exEventBus.on(
			'SHORTCUT_GOTO_DETAIL',
			(data) => {
				// Get the DOM element by its ID
				const element = document.getElementById(data);

				// Scroll to the element smoothly
				element.scrollIntoView({ behavior: 'smooth' });
			}
		);
	},
	methods: {
		onUp() {
			this.$refs["hiddenTopElement"].scrollIntoView({ behavior: "smooth" });
		},
		onDown() {
			this.$refs["hiddenBottomElement"].scrollIntoView({ behavior: "smooth" });
		}
	}
}
</script>

<style scoped lang="scss">
.core-page-template {
	position: relative;
	width: 100%;
	height: 100vh;
	background-color: inherit;

	.core-page-template-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #1F1F1F;
		background-image: url("http://192.168.1.4:8000/images/background-optimized-2.svg");
		background-repeat: repeat;
		background-size: 350px;
	}

	.loading-page-side {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

  .box {
    position: absolute;
    width: 100%;
    height: 1px;
    top: 45px;
    left: 0;

    @keyframes LoadingBar {
      0%  { transform: translateX(-100%) }
      100% { transform: translateX(100%) }
    }

    .loading-bar {
      display: block;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      overflow-x: hidden;
      background-color: #051937; /* use px color $primary-light */

      &:before {
        content: "";
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        //background-image: linear-gradient(to right, #656565, #4ca1af);
        background-image: linear-gradient(to right, #051937, #004d7a, #008793, #00bf72, #a8eb12);
        animation: LoadingBar 0.8s cubic-bezier(.5,.01,.51,1) infinite;
      }
    }
  }

	.page-title-side {
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 10px);
		height: 40px;

		overflow: hidden;
		text-overflow: ellipsis;

		padding: 5px 10px;
		margin: 5px;
		font-size: 16px;
		color: #6DC5CB;
		background-color: #1b1f23;
		border-radius: 6px;

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;

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

	.page-content-side {
		position: absolute;
		top: 50px;
		left: 0;
		width: 100%;
		height: calc(100vh - 50px);

		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		align-content: flex-start;

		.left-side {
			width: 80px;
			height: 100%;
			//overflow-y: scroll;
			background-color: inherit;
			transition: 0.2s;

			padding: 5px;

			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			align-content: flex-start;

			.btn-toggle-expand {
				width: 100%;
			}

			.content-side {
				width: 100%;
        height: calc(100% - 100px);
				opacity: 0;
        overflow: hidden;
			}

			&.expanded {
				width: 250px;

				.content-side {
					opacity: 1;
				}
			}
		}

		.center-side {
			position: relative;
			width: calc(100% - 500px);
			height: 100%;
			overflow-y: scroll;
      overflow-x: hidden;
			scroll-behavior: smooth;
			background-color: inherit;
			transition: 0.2s;

			padding: 0 5px;

			.content-side {

			}

      .content-side-with-search-bar {
        position: relative;
        height: 100%;
        width: 100%;

        .searchBar {
          position: absolute;
          height: 100px;
          width: 100%;
          background-color: transparent;
        }

        .content-side {
          position: absolute;
          top: 100px;
          height: calc(100% - 100px);
          width: 100%;
          overflow-y: scroll;
          border-top: 1px solid #626262;
          border-radius: 5px;
        }
      }

			&.width-full-on-all {
				width: calc(100% - 160px);
			}
			&.width-full-on-left {
				width: calc(100% - (80px + 250px));
			}
			&.width-full-on-right {
				width: calc(100% - (80px + 250px));
			}
		}

		.right-side {
			position: relative;
			width: 80px;
			height: 100%;
			overflow-y: scroll;
			background-color: inherit;
			transition: 0.2s;

			padding: 5px;

			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			align-content: flex-start;

			.btn-toggle-expand {
				width: 100%;
			}

			.content-side {
				width: 100%;
				opacity: 0;
			}

			&.expanded {
				width: 250px;

				.content-side {
					opacity: 1;
				}
			}

			.btn-up-down {
				position: absolute;
				left: 0;
				bottom: 100px;
				width: 50px;
				height: auto;
			}
		}
	}
}
</style>