<template>
	<div>
		<div
			class="core-app-style core-neumorphism-style core-display-flex__LTB"
			:class="darkMode ? 'dark-mode' : 'white-mode'">
			<div>

				<label class="on-off">
					<input
						v-model="darkMode"
						type="checkbox" id="changeColor">
					<span class="slider round"></span>
				</label>

				<div class="core-app-style__container">
					<button class="core-app-style__button">
						Text button
					</button>

					<hr>

					<button class="core-app-style__button active">
						Text button (active)
					</button>

					<hr>

					<button class="core-app-style__button success-color-press">
						Text button (success-color-press)
					</button>

					<hr>

					<button class="core-app-style__button active success-color-active">
						Text button (active - success-color-active)
					</button>

					<hr>

					<button class="core-app-style__button success-color">
						Text button (success-color)
					</button>
					<br>
					<button class="core-app-style__button green-basic-color">
						Text button (green-basic-color)
					</button>
					<br>
					<button class="core-app-style__button green-harmony-color">
						Text button (green-harmony-color)
					</button>
					<br>
					<button class="core-app-style__button red-harmony-color">
						Text button (red-harmony-color)
					</button>

					<hr>

					<button class="core-app-style__button small-size">
						Text button (Small size)
					</button>

					<hr>

					<button class="core-app-style__button red-harmony-color">
						<i class="bi bi-search"></i>
					</button>
					<button class="core-app-style__button green-harmony-color icon-effect-zoom-in">
						<i class="bi bi-search"></i>
					</button>
					<button class="core-app-style__button yellow-harmony-color icon-effect-zoom-out">
						<i class="bi bi-search"></i>
					</button>

					<hr>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Pattern-04',
	data() {
		return {
			darkMode: true,
		}
	}
}
</script>

<!--<style scoped lang="scss">-->
<!--.core-app-style {-->
<!--	width: 100%;-->
<!--	min-height: 100vh;-->
<!--	padding: 50px;-->

<!--	/// FLEXIBLE DISPLAY-->
<!--	.display-flex__center {-->
<!--		// 📗📗📗📗📗📗📗📗📗📗📗📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗           🌸-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->

<!--		display: flex;-->
<!--		flex-wrap: wrap;-->
<!--		justify-content: center;-->
<!--		align-items: center;-->
<!--		align-content: center;-->

<!--		&.no-wrap {-->
<!--			flex-wrap: nowrap !important;-->
<!--		}-->
<!--	}-->
<!--	.display-flex__LRTB {-->
<!--		// Left to Right & Top to Bottom-->
<!--		// 📗📗📗📗📗📗📗📗📗📗📗📗-->
<!--		// 📗🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸-->
<!--		// 📗🌸🌸🌸🌸🌸-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->

<!--		display: flex;-->
<!--		flex-direction: row;-->
<!--		flex-wrap: wrap;-->
<!--		justify-content: flex-start;-->
<!--		align-items: center;-->
<!--		align-content: flex-start;-->

<!--		&.no-wrap {-->
<!--			flex-wrap: nowrap !important;-->
<!--		}-->
<!--	}-->
<!--	.display-flex__LTB {-->
<!--		// Left & Top to Bottom-->
<!--		// 📗📗📗📗📗📗📗📗📗📗📗📗-->
<!--		// 📗🌸-->
<!--		// 📗🌸-->
<!--		// 📗🌸-->
<!--		// 📗🌸-->
<!--		// 📗🌸-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->

<!--		display: flex;-->
<!--		flex-direction: column;-->
<!--		flex-wrap: wrap;-->
<!--		justify-content: flex-start;-->
<!--		align-items: flex-start;-->
<!--		align-content: flex-start;-->

<!--		&.no-wrap {-->
<!--			flex-wrap: nowrap !important;-->
<!--		}-->
<!--	}-->
<!--	.display-flex__center-vertical {-->
<!--		// Left to Right & Top to Bottom & Center of Vertical Orientation-->
<!--		// 📗📗📗📗📗📗📗📗📗📗📗📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗🌸🌸🌸🌸🌸-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->

<!--		display: flex;-->
<!--		flex-direction: row;-->
<!--		flex-wrap: wrap;-->
<!--		justify-content: flex-start;-->
<!--		align-items: center;-->
<!--		align-content: center;-->

<!--		&.no-wrap {-->
<!--			flex-wrap: nowrap !important;-->
<!--		}-->
<!--	}-->
<!--	.display-flex__center-horizontal {-->
<!--		// Left to Right & Top to Bottom & Center of Horizontal Orientation-->
<!--		// 📗📗📗📗📗📗📗📗📗📗📗📗-->
<!--		// 📗           🌸-->
<!--		// 📗           🌸-->
<!--		// 📗           🌸-->
<!--		// 📗           🌸-->
<!--		// 📗           🌸-->
<!--		// 📗-->
<!--		// 📗-->
<!--		// 📗-->

<!--		display: flex;-->
<!--		flex-direction: column;-->
<!--		flex-wrap: wrap;-->
<!--		justify-content: flex-start;-->
<!--		align-items: center;-->
<!--		align-content: center;-->

<!--		&.no-wrap {-->
<!--			flex-wrap: nowrap !important;-->
<!--		}-->
<!--	}-->

<!--	&.classic-style {-->

<!--		/// COMPONENTS-->
<!--		.core-app-style__alert {-->

<!--		}-->

<!--		.core-app-style__table {-->

<!--		}-->

<!--		.core-app-style__badge {-->

<!--		}-->

<!--		.core-app-style__breadcrumb {-->

<!--		}-->

<!--		.core-app-style__button {-->

<!--		}-->

<!--		.core-app-style__card {-->

<!--		}-->

<!--		.core-app-style__dropdown {-->

<!--		}-->

<!--		.core-app-style__list-group {-->

<!--		}-->

<!--		.core-app-style__modal {-->

<!--		}-->

<!--		.core-app-style__navbar {-->

<!--		}-->

<!--		.core-app-style__pagination {-->

<!--		}-->

<!--		.core-app-style__notification {-->
<!--			&.success {-->

<!--			}-->

<!--			&.warning {-->

<!--			}-->

<!--			&.error {-->

<!--			}-->
<!--		}-->

<!--		/// FORMS-->
<!--		.core-app-style__form {-->

<!--			.label {-->

<!--			}-->

<!--			.validation {-->

<!--			}-->

<!--			.core-app-style__input {-->

<!--				input {-->

<!--				}-->
<!--			}-->

<!--			.core-app-style__checkbox {-->

<!--			}-->

<!--			.core-app-style__radio {-->

<!--			}-->
<!--		}-->

<!--		.core-app-style__label {-->

<!--		}-->

<!--		.core-app-style__loader {-->

<!--		}-->

<!--	}-->

<!--	&.dark-mode-style {-->

<!--	}-->

<!--	&.neumorphism-style {-->

<!--		/// Checkbox change mode __Start-->
<!--		.on-off-->
<!--		{-->
<!--			position: relative;-->
<!--			width: 80px;-->
<!--			height: 40px;-->
<!--			margin: 15px;-->
<!--			font: 500 10px arial;-->
<!--		}-->

<!--		.on-off input-->
<!--		{-->
<!--			opacity: 0;-->
<!--			width: 0;-->
<!--			height: 0;-->
<!--		}-->

<!--		.slider-->
<!--		{-->
<!--			position: absolute;-->
<!--			cursor: pointer;-->
<!--			top: 0;-->
<!--			left: 0;-->
<!--			right: 0;-->
<!--			bottom: 0;-->
<!--			border-radius: 100px;-->
<!--			background: #f2f3f7;-->
<!--			box-shadow: inset -2px -2px 5px rgba(255,255,255,1), inset 3px 3px 5px rgba(0,0,0,0.07);-->
<!--			transition: 0.4s ease ease;-->
<!--		}-->
<!--		.slider:before-->
<!--		{-->
<!--			position: absolute;-->
<!--			content:"Bk";-->
<!--			text-align: center;-->
<!--			line-height: 30px;-->
<!--			width: 30px;-->
<!--			height: 30px;-->
<!--			left: 8px;-->
<!--			bottom: 5px;-->
<!--			background: #f2f3f7;-->
<!--			box-shadow: -2px -2px 5px rgba(255,255,255,1), 3px 3px 5px rgba(0,0,0,0.07);-->
<!--			border-radius: 100px;-->
<!--			transition: 0.4s;-->
<!--		}-->
<!--		input:checked + .slider-->
<!--		{-->
<!--			background: #1C1E24;-->
<!--			box-shadow: inset -2px -2px 6px rgba(255,255,255,0.05),-->
<!--			inset 2px 2px 6px rgba(0,0,0,0.5);-->
<!--			transition:0.4s;-->
<!--		}-->

<!--		input:checked + .slider:before-->
<!--		{-->
<!--			content: "WH";-->
<!--			transform: translateX(36px);-->
<!--			background: #1C1E24;-->
<!--			box-shadow: -2px -2px 6px rgba(255,255,255,0.05),-->
<!--			2px 2px 6px rgba(0,0,0,0.5);-->
<!--			color: #f2f3f7;-->
<!--			width: 30px;-->
<!--			height: 30px;-->
<!--			left: 8px;-->
<!--			bottom: 5px;-->
<!--			transition: 0.4s;-->
<!--		}-->
<!--		/// Checkbox change mode __End-->

<!--		&.white-mode {-->

<!--			background-color: #f2f3f7;-->

<!--			/// COMPONENTS-->
<!--			.core-app-style__alert {-->

<!--			}-->

<!--			.core-app-style__table {-->

<!--			}-->

<!--			.core-app-style__badge {-->

<!--			}-->

<!--			.core-app-style__breadcrumb {-->

<!--			}-->

<!--			.core-app-style__button {-->

<!--			}-->

<!--			.core-app-style__card {-->

<!--			}-->

<!--			.core-app-style__dropdown {-->

<!--			}-->

<!--			.core-app-style__list-group {-->

<!--			}-->

<!--			.core-app-style__modal {-->

<!--			}-->

<!--			.core-app-style__navbar {-->

<!--			}-->

<!--			.core-app-style__pagination {-->

<!--			}-->

<!--			.core-app-style__notification {-->
<!--				&.success {-->

<!--				}-->

<!--				&.warning {-->

<!--				}-->

<!--				&.error {-->

<!--				}-->
<!--			}-->

<!--			/// FORMS-->
<!--			.core-app-style__form {-->

<!--				.label {-->

<!--				}-->

<!--				.validation {-->

<!--				}-->

<!--				.core-app-style__input {-->

<!--					input {-->

<!--					}-->
<!--				}-->

<!--				.core-app-style__checkbox {-->

<!--				}-->

<!--				.core-app-style__radio {-->

<!--				}-->
<!--			}-->

<!--			.core-app-style__label {-->

<!--			}-->

<!--			.core-app-style__loader {-->

<!--			}-->

<!--			.core-app-style__skeleton {-->

<!--			}-->
<!--		}-->

<!--		&.dark-mode {-->

<!--			background-color: #1b1f23;-->

<!--			color: #626262;-->
<!--			font-family: cursive;-->

<!--			///  Demo __Start-->
<!--			/// Demo __End-->

<!--			/// COMPONENTS-->
<!--			.core-app-style__alert {-->

<!--			}-->

<!--			.core-app-style__table {-->

<!--			}-->

<!--			.core-app-style__badge {-->

<!--			}-->

<!--			.core-app-style__breadcrumb {-->

<!--			}-->

<!--			button.core-app-style__button {-->
<!--				color: #626262;-->
<!--				min-width: 40px;-->
<!--				height: 35px;-->
<!--				margin: 5px;-->
<!--				padding: 0 10px;-->
<!--				border-radius: 6px;-->
<!--				background-color: #1b1f23;-->
<!--				position: relative;-->
<!--				outline: none;-->
<!--				border: none;-->
<!--				box-shadow: -4px -2px 4px 0px #262830,-->
<!--				4px 2px 6px 0px #111316;-->
<!--				cursor: pointer;-->
<!--				font-size: 14px;-->
<!--				font-family: cursive;-->

<!--				i {-->
<!--					font-size: 14px;-->
<!--				}-->

<!--				transition: 0.2s;-->

<!--				&:hover {-->
<!--					color: #626262;-->
<!--				}-->

<!--				&:active {-->
<!--					&.icon-effect-zoom-in {-->
<!--						i {-->
<!--							font-size: 12px;-->
<!--						}-->
<!--					}-->
<!--					&.icon-effect-zoom-out {-->
<!--						i {-->
<!--							font-size: 15px;-->
<!--						}-->
<!--					}-->
<!--				}-->

<!--				&:active, &:focus {-->
<!--					&:after {-->
<!--						content: '';-->
<!--						position: absolute;-->
<!--						left: 0;-->
<!--						top: 0;-->
<!--						right: 0;-->
<!--						bottom: 0;-->
<!--						border-radius: 6px;-->
<!--						box-shadow: 2px 2px 2px 0px #111316 inset,-->
<!--						-2px -2px 2px 0px #262830 inset;-->
<!--					}-->

<!--					&.success-color-press {-->
<!--						color: #B6FF1F;-->
<!--					}-->

<!--					/// Basic color-->
<!--					&.green-basic-color-press {-->
<!--						color: #BAE600;-->
<!--					}-->
<!--					&.navi-basic-color-press {-->
<!--						color: #428194;-->
<!--					}-->
<!--					&.orange-basic-color-press {-->
<!--						color: #F59500;-->
<!--					}-->
<!--					&.pink-basic-color-press {-->
<!--						color: #FA709E;-->
<!--					}-->
<!--					&.grey-basic-color-press {-->
<!--						color: #7D79A2;-->
<!--					}-->
<!--					&.yellow-basic-color-press {-->
<!--						color: #F6C31F;-->
<!--					}-->
<!--					&.red-basic-color-press {-->
<!--						color: #F7834B;-->
<!--					}-->
<!--					&.violet-basic-color-press {-->
<!--						color: #C964AE;-->
<!--					}-->
<!--					&.gray-basic-color-press {-->
<!--						color: #9AA5BA;-->
<!--					}-->


<!--					/// Outstanding Color-->
<!--					&.yellow-outstanding-color-press {-->
<!--						color: #F1DD00;-->
<!--					}-->
<!--					&.red-outstanding-color-press {-->
<!--						color: #E32B30;-->
<!--					}-->
<!--					&.blue-outstanding-color-press {-->
<!--						color: #554DFF;-->
<!--					}-->
<!--					&.green-outstanding-color-press {-->
<!--						color: #4CBB17;-->
<!--					}-->
<!--					&.orange-outstanding-color-press {-->
<!--						color: #F27405;-->
<!--					}-->

<!--					/// Harmony Color-->
<!--					&.yellow-harmony-color-press {-->
<!--						color: #F6FB45;-->
<!--					}-->
<!--					&.red-harmony-color-press {-->
<!--						color: #E96066;-->
<!--					}-->
<!--					&.blue-harmony-color-press {-->
<!--						color: #A7E1FF;-->
<!--					}-->
<!--					&.green-harmony-color-press {-->
<!--						color: #56FF7C;-->
<!--					}-->
<!--					&.orange-harmony-color-press {-->
<!--						color: #E58E33;-->
<!--					}-->
<!--					&.violet-harmony-color-press {-->
<!--						color: #C787DF;-->
<!--					}-->
<!--					&.navy-harmony-color-press {-->
<!--						color: #6DC5CB;-->
<!--					}-->

<!--				}-->

<!--				&.active {-->
<!--					&:after  {-->
<!--						content: '';-->
<!--						position: absolute;-->
<!--						left: 0;-->
<!--						top: 0;-->
<!--						right: 0;-->
<!--						bottom: 0;-->
<!--						border-radius: 6px;-->
<!--						box-shadow: 2px 2px 2px 0 #111316 inset,-->
<!--						-2px -2px 2px 0px #262830 inset;-->
<!--					}-->

<!--					&.success-color-active  {-->
<!--						color: #B6FF1F;-->
<!--					}-->

<!--					/// Basic color-->
<!--					&.green-basic-color-active {-->
<!--						color: #BAE600;-->
<!--					}-->
<!--					&.navi-basic-color-active {-->
<!--						color: #428194;-->
<!--					}-->
<!--					&.orange-basic-color-active {-->
<!--						color: #F59500;-->
<!--					}-->
<!--					&.pink-basic-color-active {-->
<!--						color: #FA709E;-->
<!--					}-->
<!--					&.grey-basic-color-active {-->
<!--						color: #7D79A2;-->
<!--					}-->
<!--					&.yellow-basic-color-active {-->
<!--						color: #F6C31F;-->
<!--					}-->
<!--					&.red-basic-color-active {-->
<!--						color: #F7834B;-->
<!--					}-->
<!--					&.violet-basic-color-active {-->
<!--						color: #C964AE;-->
<!--					}-->
<!--					&.gray-basic-color-active {-->
<!--						color: #9AA5BA;-->
<!--					}-->


<!--					/// Outstanding Color-->
<!--					&.yellow-outstanding-color-active {-->
<!--						color: #F1DD00;-->
<!--					}-->
<!--					&.red-outstanding-color-active {-->
<!--						color: #E32B30;-->
<!--					}-->
<!--					&.blue-outstanding-color-active {-->
<!--						color: #554DFF;-->
<!--					}-->
<!--					&.green-outstanding-color-active {-->
<!--						color: #4CBB17;-->
<!--					}-->
<!--					&.orange-outstanding-color-active {-->
<!--						color: #F27405;-->
<!--					}-->

<!--					/// Harmony Color-->
<!--					&.yellow-harmony-color-active {-->
<!--						color: #F6FB45;-->
<!--					}-->
<!--					&.red-harmony-color-active {-->
<!--						color: #E96066;-->
<!--					}-->
<!--					&.blue-harmony-color-active {-->
<!--						color: #A7E1FF;-->
<!--					}-->
<!--					&.green-harmony-color-active {-->
<!--						color: #56FF7C;-->
<!--					}-->
<!--					&.orange-harmony-color-active {-->
<!--						color: #E58E33;-->
<!--					}-->
<!--					&.violet-harmony-color-active {-->
<!--						color: #C787DF;-->
<!--					}-->
<!--					&.navy-harmony-color-active {-->
<!--						color: #6DC5CB;-->
<!--					}-->

<!--				}-->

<!--				&.success-color {-->
<!--					color: #B6FF1F;-->
<!--				}-->

<!--				/// Basic color-->
<!--				&.green-basic-color {-->
<!--					color: #BAE600;-->
<!--				}-->
<!--				&.navi-basic-color {-->
<!--					color: #428194;-->
<!--				}-->
<!--				&.orange-basic-color {-->
<!--					color: #F59500;-->
<!--				}-->
<!--				&.pink-basic-color {-->
<!--					color: #FA709E;-->
<!--				}-->
<!--				&.grey-basic-color {-->
<!--					color: #7D79A2;-->
<!--				}-->
<!--				&.yellow-basic-color {-->
<!--					color: #F6C31F;-->
<!--				}-->
<!--				&.red-basic-color {-->
<!--					color: #F7834B;-->
<!--				}-->
<!--				&.violet-basic-color {-->
<!--					color: #C964AE;-->
<!--				}-->
<!--				&.gray-basic-color {-->
<!--					color: #9AA5BA;-->
<!--				}-->


<!--				/// Outstanding Color-->
<!--				&.yellow-outstanding-color {-->
<!--					color: #F1DD00;-->
<!--				}-->
<!--				&.red-outstanding-color {-->
<!--					color: #E32B30;-->
<!--				}-->
<!--				&.blue-outstanding-color {-->
<!--					color: #554DFF;-->
<!--				}-->
<!--				&.green-outstanding-color {-->
<!--					color: #4CBB17;-->
<!--				}-->
<!--				&.orange-outstanding-color {-->
<!--					color: #F27405;-->
<!--				}-->

<!--				/// Harmony Color-->
<!--				&.yellow-harmony-color {-->
<!--					color: #F6FB45;-->
<!--				}-->
<!--				&.red-harmony-color {-->
<!--					color: #E96066;-->
<!--				}-->
<!--				&.blue-harmony-color {-->
<!--					color: #A7E1FF;-->
<!--				}-->
<!--				&.green-harmony-color {-->
<!--					color: #56FF7C;-->
<!--				}-->
<!--				&.orange-harmony-color {-->
<!--					color: #E58E33;-->
<!--				}-->
<!--				&.violet-harmony-color {-->
<!--					color: #C787DF;-->
<!--				}-->
<!--				&.navy-harmony-color {-->
<!--					color: #6DC5CB;-->
<!--				}-->

<!--				&.small-size {-->
<!--					padding: 0px 10px;-->
<!--					height: 28px;-->
<!--					min-width: 30px;-->
<!--					font-size: 12px;-->
<!--				}-->
<!--				&.full-size  {-->

<!--				}-->

<!--			}-->

<!--			.core-app-style__card {-->

<!--			}-->

<!--			.core-app-style__container {-->
<!--				padding: 15px;-->
<!--				background-color: #1b1f23;-->
<!--				border-radius: 15px;-->
<!--				box-shadow: -4px -2px 4px 0px #262830,-->
<!--				4px 2px 6px 0px #0e1013;-->
<!--			}-->

<!--			.core-app-style__dropdown {-->

<!--			}-->

<!--			.core-app-style__list-group {-->

<!--			}-->

<!--			.core-app-style__modal {-->

<!--			}-->

<!--			.core-app-style__navbar {-->

<!--			}-->

<!--			.core-app-style__pagination {-->

<!--			}-->

<!--			.core-app-style__notification {-->
<!--				&.success {-->

<!--				}-->

<!--				&.warning {-->

<!--				}-->

<!--				&.error {-->

<!--				}-->
<!--			}-->

<!--			/// FORMS-->
<!--			.core-app-style__form {-->

<!--				.label {-->

<!--				}-->

<!--				.validation {-->

<!--				}-->

<!--				.core-app-style__input {-->

<!--					input {-->

<!--					}-->
<!--				}-->

<!--				.core-app-style__checkbox {-->

<!--				}-->

<!--				.core-app-style__radio {-->

<!--				}-->
<!--			}-->

<!--			.core-app-style__label {-->

<!--			}-->

<!--			.core-app-style__loader {-->

<!--			}-->

<!--			.core-app-style__skeleton {-->

<!--			}-->
<!--		}-->
<!--	}-->

<!--	&.black-white-style {-->

<!--	}-->
<!--}-->
<!--</style>-->