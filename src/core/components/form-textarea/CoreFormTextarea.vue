<template>
	<div>
		<div class="input_wrapper">
			<div class="input_header_above">

				<div class="action_change_paragraph_structure">
					<div class="highlight_block">
						<div
							@click="onChooseTextStructure('text_structure_style_20')"
							class="item">
							<div class="text_structure_style_20">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_21')"
							class="item">
							<div class="text_structure_style_21">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_22')"
							class="item">
							<div class="text_structure_style_22">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_23')"
							class="item">
							<div class="text_structure_style_23">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_24')"
							class="item">
							<div class="text_structure_style_24">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_25')"
							class="item">
							<div class="text_structure_style_25">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_26')"
							class="item">
							<div class="text_structure_style_26">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_27')"
							class="item">
							<div class="text_structure_style_27">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_28')"
							class="item">
							<div class="text_structure_style_28">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_29')"
							class="item">
							<div class="text_structure_style_29">
								Para
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_30')"
							class="item">
							<div class="text_structure_style_30">
								Para
							</div>
						</div>

            <div class="divider"></div>

            <div
                @click="onChooseTextStructure('text_structure_style_40')"
                class="item">
              <div class="text_structure_style_40">
                Para
              </div>
            </div>
            <div
                @click="onChooseTextStructure('text_structure_style_41')"
                class="item">
              <div class="text_structure_style_41">
                Para
              </div>
            </div>
            <div
                @click="onChooseTextStructure('text_structure_style_42')"
                class="item">
              <div class="text_structure_style_42">
                Para
              </div>
            </div>
					</div>
				</div>

				<input v-model="imageSourceOnline" type="text">
				<button
					@click="onAddImageOnline"
					class="core-app-style__button fit-width-size blue-harmony-color icon-effect-zoom-in"
				>
					Add image
				</button>
			</div>
			<div class="input_header">

				<div class="input_label">{{ label }}</div>

				<div class="action_change_text_structure">
					<div class="highlight_block">
						<div
							@click="onChooseTextStructure('text_structure_style_1')"
							class="item">
							<div class="text_structure_style_1">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_2')"
							class="item">
							<div class="text_structure_style_2">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_3')"
							class="item">
							<div class="text_structure_style_3">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_4')"
							class="item">
							<div class="text_structure_style_4">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_5')"
							class="item">
							<div class="text_structure_style_5">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_6')"
							class="item">
							<div class="text_structure_style_6">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_7')"
							class="item">
							<div class="text_structure_style_7">
								Abc
							</div>
						</div>
					</div>

					<div class="highlight_text">
						<div
							@click="onChooseTextStructure('text_structure_style_8')"
							class="item">
							<div class="text_structure_style_8">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_9')"
							class="item">
							<div class="text_structure_style_9">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_10')"
							class="item">
							<div class="text_structure_style_10">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_11')"
							class="item">
							<div class="text_structure_style_11">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_12')"
							class="item">
							<div class="text_structure_style_12">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_13')"
							class="item">
							<div class="text_structure_style_13">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_14')"
							class="item">
							<div class="text_structure_style_14">
								Abc
							</div>
						</div>
						<div
							@click="onChooseTextStructure('text_structure_style_15')"
							class="item">
							<div class="text_structure_style_15">
								Abc
							</div>
						</div>

            <div class="divider"></div>

            <div
                @click="onChooseTextStructure('text_structure_style_60')"
                class="item-2">
              <div class="text_structure_style_60">
                Conversation
              </div>
            </div>
            <div
                @click="onChooseTextStructure('text_structure_style_61')"
                class="item">
              <div class="text_structure_style_61">
                Left
              </div>
            </div>
            <div
                @click="onChooseTextStructure('text_structure_style_62')"
                class="item">
              <div class="text_structure_style_62">
                Right
              </div>
            </div>

					</div>
				</div>
			</div>
			<div
				:class="{'error': isShowError}"
				class="input_validator">

				<slot name="input-side"></slot>

				<Transition name="notification">
					<div v-if="isShowError" class="input_validator_status">
						<div class="input_icon">
							<i class="bi bi-exclamation-lg"></i>
						</div>
					</div>
				</Transition>

			</div>

			<Transition name="notification">
				<div
					v-if="isShowError"
					class="core-app-style__notification input-error-notification">
					{{ error }}
				</div>
			</Transition>
		</div>
	</div>
</template>

<script>
export default {
	name: "CoreFormTextArea",
	props: {
		label: {
			type: [String],
			default: 'Label'
		},

		error: {
			type: [String],
			default: ''
		},
	},
	data () {
		return {
			imageSourceOnline: ''
		}
	},
	computed: {
		isShowError() {
			if(this.error && this.error !== '') {
				return true;
			}
			return false;
		}
	},
	watch: {

	},
	methods: {
		onChooseTextStructure(textStructureStyle) {
			this.$emit('onChangeTextStructure', textStructureStyle);
		},
		onAddImageOnline() {
			if(this.imageSourceOnline !== '') {
				this.$emit('onAddImageOnline', this.imageSourceOnline);
			}
		}
	}
}
</script>

<style scoped lang="scss">
.notification-enter-active {
	transition: all 0.2s;
	animation: jump-jump-out 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}
.notification-leave-active {
	transition: all 0.2s;
	animation: jump-jump-in 0.2s cubic-bezier(0.21, 0.98, 0.6, 0.99) infinite alternate;
}

.notification-enter-from,
.notification-leave-to {
	transform: scaleY(0);
	opacity: 0;
}
@keyframes jump-jump-out {
	0% {
		transform: scale(0.5);
		opacity: 0;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}
@keyframes jump-jump-in {
	0% {
		transform: scale(1);
		opacity: 1;
	}

	100% {
		transform: scale(0.5);
		opacity: 0;
	}
}

.input_wrapper {

	.input_header_above {
		width: 100%;
		height: 35px;
		margin-bottom: 4px;

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		align-content: center;

		input {
			left: 0;
			top: 0;
			min-height: 35px;
			width: 250px;
			padding: 0 40px 0 15px;
			//border: none;
			outline: none;
			transition: 0.1s;

			//color: #626262;
			color: #6DC5CB;
			border-radius: 6px;
			border: 1px solid #626262;
			background-color: #1b1f23;
			box-shadow: -4px -2px 4px 0px #262830,
			4px 2px 6px 0px #111316;
			font-size: 16px;
		}

		.action_change_paragraph_structure {
			position: relative;
			width: fit-content;
			height: 35px;
			border-radius: 3px;
			background-color: white;
			margin-right: 5px;

			display: flex;
			flex-direction: row;

			.highlight_block {
				height: calc(100% - 8px);
				margin: 4px;
				display: flex;
				flex-direction: row;

				.item {
					.text_structure_style_20,
					.text_structure_style_21,
					.text_structure_style_22,
					.text_structure_style_23,
					.text_structure_style_24,
					.text_structure_style_25,
					.text_structure_style_26,
					.text_structure_style_27,
					.text_structure_style_28,
					.text_structure_style_29,
					.text_structure_style_30,
          .text_structure_style_40,
          .text_structure_style_41,
          .text_structure_style_42,
          {
						text-align: center;
						width: 100%;
						height: 100%;
						border-radius: 4px;
						box-sizing: border-box;
						border: 1px solid transparent;
						user-select: none;
						transition: 0.05s;

						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;

						&:hover {
							border: 1px solid #DDDBDD;
							cursor: pointer;
						}

						&:active {
							font-size: 15px;
						}
					}
				}

        .divider {
          height: 26px;
          width: 2px;
          background-color: #555555;
          margin-right: 5px;
        }

			}

			.highlight_block {
				.item {
					width: 50px;
					height: 100%;
					margin-right: 4px;

					.text_structure_style_20 {
						color: #2D2D2D;
						background-color: #90EE90;
					}

					.text_structure_style_21 {
						color: #2D2D2D;
						background-color: #F0E68C;
					}

					.text_structure_style_22 {
						color: #2D2D2D;
						background-color: #FFD700;
					}

					.text_structure_style_23 {
						color: #2D2D2D;
						background-color: #6fffe9;
					}

					.text_structure_style_24 {
						color: #2D2D2D;
						background-color: #bce784;
					}

					.text_structure_style_25 {
						color: #2D2D2D;
						background-color: #FF6347;
					}

					.text_structure_style_26 {
						color: #2D2D2D;
						background-color: #DCDCDC;
					}

					.text_structure_style_27 {
						color: #2D2D2D;
						background-color: transparent;
						border: 1px dashed #555555;
					}

					.text_structure_style_28 {
						color: #2D2D2D;
						background-color: #F4A460;
					}

					.text_structure_style_29 {
						color: #2D2D2D;
						background-color: #00FA9A;
					}

					.text_structure_style_30 {
						color: #2D2D2D;
						background-color: #D8BFD8;
					}

          .text_structure_style_40 {
            color: #2D2D2D;
            background-color: transparent;
            border-bottom: 2px solid #EA1537;
            transition: 0.2s;

            &:hover {
              background-color: #FFDBE3;
              border-bottom: 2px solid #EA1537;
            }
          }

          .text_structure_style_41 {
            color: #EA1537;
            text-decoration: line-through;
            background-color: transparent;
          }

          .text_structure_style_42 {
            color: #4A6EE0;
            background-color: transparent;
          }
				}

        .item-2 {
          width: 150px;
        }
			}
		}
	}

	.input_header {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;
    align-content: flex-start;
    font-size: 16px;

		.action_change_text_structure, .action_change_paragraph_structure {
      position: relative;
      min-width: 300px;
      height: 35px;
      margin-bottom: 6px;
      border-radius: 3px;
      background-color: white;
      display: flex;
      flex-direction: row;

			.highlight_block , .highlight_text {
				height: calc(100% - 8px);
				margin: 4px;
				border-right: 1px solid #626262;

				display: flex;
				flex-direction: row;

				.item, .item-2 {
					.text_structure_style_1,
					.text_structure_style_2,
					.text_structure_style_3,
					.text_structure_style_4,
					.text_structure_style_5,
					.text_structure_style_6,
					.text_structure_style_7,
					.text_structure_style_8,
					.text_structure_style_9,
					.text_structure_style_10,
					.text_structure_style_11,
					.text_structure_style_12,
					.text_structure_style_13,
					.text_structure_style_14,
					.text_structure_style_15,

          .text_structure_style_60,
          .text_structure_style_61,
          .text_structure_style_62,
          {
            width: 100%;
            height: 100%;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            border: 1px solid transparent;
            box-sizing: border-box;
            user-select: none;
            transition: 0.05s;

						&:hover {
							border: 1px solid #DDDBDD;
							cursor: pointer;
						}
						&:active {
							font-size: 15px;
						}
					}
				}
			}

			.highlight_block {
				.item {
					width: 50px;
					height: 100%;
					margin-right: 4px;

					.text_structure_style_1 {
						color: #555555;
						background-color: #F5F400;
					}

					.text_structure_style_2 {
						color: #555555;
						background-color: #B6FF1F;
					}

					.text_structure_style_3 {
						color: #ffffff;
						background-color: #f05230;
					}

					.text_structure_style_4 {
						border: 1px dashed #555555;
					}

					.text_structure_style_5 {
						background-color: #656565;
						color: #fecd35;
					}

					.text_structure_style_6 {
						background-color: #656565;
						color: #a4d037;
					}

					.text_structure_style_7 {
						background-color: #656565;
						color: #f05230;
					}
				}
			}

			.highlight_text {
				.item, .item-2 {
					width: 50px;
					height: 100%;
					margin-right: 4px;

					.text_structure_style_8 {
						font-weight: bold;
					}

					.text_structure_style_9 {
						font-weight: bold;
						color: #fecd35;
					}

					.text_structure_style_10 {
						font-weight: bold;
						color: #a4d037;
					}

					.text_structure_style_11 {
						font-weight: bold;
						color: #f05230;
					}

					.text_structure_style_12 {
						font-weight: 14;
					}

					.text_structure_style_13 {
						font-size: 18px;
					}

					.text_structure_style_14 {
						font-size: 20px;
					}

					.text_structure_style_15 {
						font-size: 24px;
					}
				}

        .item-2 {
          width: 120px;
        }
			}
		}
	}
}
</style>