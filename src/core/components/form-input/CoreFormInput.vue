<template>
    <div>
			<div class="input_wrapper">
				<div v-if="label!==''" class="input_label">{{ label }}</div>
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
						class="core-app-style__notification">
						<div
							class="notification-wrapper input-error-notification">
							{{ error }}
						</div>
					</div>
				</Transition>

        <div
            v-if="isShowInputActions"
            class="input_actions">
          <button
              @click="onPasteInputData"
              class="core-app-style__button fixed-width-size-60 yellow-harmony-color icon-effect-zoom-in">
            <i v-if="inputValuePastedFromClipboard"
               class="bi bi-clipboard-check"></i>
            <i v-else class="bi bi-clipboard"></i>
            <span>P</span>
          </button>
          <button
              @click="onCopyInputData"
              class="core-app-style__button fixed-width-size-60 blue-harmony-color icon-effect-zoom-in">
            <i v-if="inputValueCopiedToClipboard"
               class="bi bi-clipboard-check"></i>
            <i v-else class="bi bi-clipboard-plus"></i>
            <span>C</span>
          </button>
          <button
              @click="$emit('onDeleteInputData')"
              class="core-app-style__button fixed-width-size-60 red-harmony-color icon-effect-zoom-in">
            <i class="bi bi-x-square"></i>
            <span>D</span>
          </button>
        </div>
			</div>
		</div>
</template>

<script>
	export default {
		name: "CoreFormInput",
		props: {
			label: {
				type: [String],
				default: ''
			},

			error: {
				type: [String],
						default: ''
			},

      inputValue: {
        type: [String],
        default: ''
      },

      isShowInputActions: {
        type: Boolean,
        default: true
      },
		},
		data () {
			return {
        inputValueCopiedToClipboard: false,
        inputValuePastedFromClipboard: false
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
      onPasteInputData() {
        this.inputValuePastedFromClipboard = false;
        // Check if the browser supports the Clipboard API
        if (navigator.clipboard) {
          // Access the clipboard and retrieve data
          navigator.clipboard.readText().then(text => {
            if (text) {
              this.$emit('onPasteInputData', text);
              this.inputValuePastedFromClipboard = true;

              let me = this;

              setTimeout(function() {
                me.inputValuePastedFromClipboard = false;
              }, 2000);
            }
          }).catch(err => {
            console.error('Failed to read clipboard contents:', err);
          });
        } else {
          console.error('Clipboard API not supported');
        }
      },

      onCopyInputData() {
        this.inputValueCopiedToClipboard = false;
        // Check if the browser supports the Clipboard API
        if (navigator.clipboard) {
          if (this.inputValue) {
            // Write text to the clipboard
            navigator.clipboard.writeText(this.inputValue).then(() => {
              console.log('Text copied to clipboard:', this.inputValue);
              // Optionally, you can provide feedback or perform other actions upon successful copying
              this.inputValueCopiedToClipboard = true;

              let me = this;

              setTimeout(function() {
                me.inputValueCopiedToClipboard = false;
              }, 2000);

            }).catch(err => {
              console.error('Failed to copy text:', err);
            });
          }
        } else {
          console.error('Clipboard API not supported');
        }
      }
    }
	}
</script>

<style scoped lang="scss">

.input_actions {
  height: 50px;
  width: 100px;

  margin-top: 5px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;

  button {
    span {
      margin-left: 4px;
      color: #626262;
    }
  }
}

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
</style>