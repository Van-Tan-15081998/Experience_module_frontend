<template>
	<div
		:class="{'expanded': contentListSideExpanded}"
		class="core-transition-content-list-expand">
		<div
			class="header-side">
			<div class="header-title">
				{{ title }}
			</div>

      <div>
        <button
            @click="contentListClass = 'sequential'"
            class="core-app-style__button green-harmony-color icon-effect-zoom-in">
          <i class="bi bi-list-columns-reverse"></i>
        </button>
        <button
            @click="contentListClass = 'grid-one-column'"
            class="core-app-style__button green-harmony-color icon-effect-zoom-in">
          <i class="bi bi-view-stacked"></i>
        </button>
        <button
            @click="contentListClass = 'grid-two-columns'"
            class="core-app-style__button green-harmony-color icon-effect-zoom-in">
          <i class="bi bi-grid-fill"></i>
        </button>
        <button
            @click="contentListClass = 'grid-three-columns'"
            class="core-app-style__button green-harmony-color icon-effect-zoom-in">
          <i class="bi bi-grid-3x3-gap-fill"></i>
        </button>
        <button
            @click="contentListClass = 'horizontal'"
            class="core-app-style__button green-harmony-color icon-effect-zoom-in">
          <i class="bi bi-layout-three-columns"></i>
        </button>

        <button
            @click="contentListSideExpanded = !contentListSideExpanded"
            class="core-app-style__button green-harmony-color icon-effect-zoom-in">
          <i v-if="contentListSideExpanded" class="bi bi-caret-up-fill"></i>
          <i v-else class="bi bi-caret-down-fill"></i>
        </button>
      </div>
		</div>

		<Transition name="content">

<!--			<div-->
<!--				v-if="contentListSideExpanded"-->
<!--        :class="{'limit-height': contentListClass === 'horizontal'}"-->
<!--				class="content-list-side">-->
<!--				<div ref="contentListWrapper"-->
<!--            @mousedown="scrollContent($event, 'mousedown')"-->
<!--            @mouseleave="isMouseDown = false"-->
<!--            @mouseup="isMouseDown = false"-->
<!--            @mousemove="scrollContent($event, 'mousemove')"-->
<!--            :class="contentListClass"-->
<!--            class="content-list-wrapper">-->
<!--					<slot name="contentListSide"></slot>-->
<!--				</div>-->
<!--			</div>-->

      <div
          v-if="contentListSideExpanded"
          :class="{'limit-height': contentListClass === 'horizontal'}"
          class="content-list-side"
          ref="contentListSideRef"
      >
        <div ref="contentListWrapper"
             :class="contentListClass"
             class="content-list-wrapper"
             :style="{height: contentListClass === 'horizontal' ? fitWithWidthOfContentListSide + 'px' : null}"
        >
          <div class="content-list-detail">
            <slot name="contentListSide"></slot>
          </div>
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
    lengthOfContentList: {
      type: Number,
      default: 0
    }
	},
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.contentListSideRef) {
        this.fitWithWidthOfContentListSide = this.$refs.contentListSideRef.offsetWidth - 20;
      }
    });
  },
  data() {
		return {
			contentListSideExpanded: true,

      contentListSequential: false,
      contentListOneColumn: false,
      contentListTwoColumns: false,
      contentListThreeColumns: false,

      contentListClass: '',

      scrollLeft: 0,
      isMouseDown: false,
      startX: 0,

      fitWithWidthOfContentListSide: null
		}
	},
  methods: {

  },
  watch: {
    fitWithWidthOfContentListSide (value) {
      console.log(value)
    },

    contentListSideExpanded (value) {
      if(value) {
        this.$nextTick(() => {
          if (this.$refs.contentListSideRef) {
            this.fitWithWidthOfContentListSide = this.$refs.contentListSideRef.offsetWidth - 20;
          }
        });
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
.core-transition-content-list-expand {
	position: relative;
	width: 100%;
	height: auto;
	overflow: hidden;

	border: 1px solid #626262;
	border-radius: 6px;
	background-color: #1b1f23;
	box-shadow: -4px -2px 4px 0px #262830,
	4px 2px 6px 0px #111316;
	cursor: pointer;
	user-select: none;

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

		padding: 10px;

		//border-radius: 6px;
		//background-color: #1b1f23;
		//box-shadow: -4px -2px 4px 0px #262830,
		//4px 2px 6px 0px #111316;
		//cursor: pointer;
		//user-select: none;

		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		align-content: center;

		z-index: 10;

		.header-title {
			font-size: 16px;
			font-weight: 600;
		}
	}

	.content-list-side {
		position: relative;
		width: calc(100% - 10px);
		height: auto;
		padding: 10px;
		margin: 5px;

		z-index: 5;
		// Đặt z-index = 5 ( < z-index của header-side, nhằm ẩn bên dưới header-side khi bật tắt expand)

		.content-list-wrapper {
			position: relative;
			z-index: 6;
			// Đặt z-index = 6 để nội dung của content-side có thể thao tác được ( > 5 & < 10)

      .content-list-detail {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto auto auto;
        grid-column-gap: 50px;
      }
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

			//&:after {
			//	content: '';
			//	position: absolute;
			//	left: 0;
			//	top: 0;
			//	right: 0;
			//	bottom: 0;
			//	border-radius: 6px;
			//	box-shadow: 2px 2px 2px 0px #111316 inset,
			//	-2px -2px 2px 0px #262830 inset;
			//}
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