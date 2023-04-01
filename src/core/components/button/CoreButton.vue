<template>
    <div class="core-button">
        <button
                type="button"
                :class="parseClass"
                :disabled="disable"
        >
            <span v-if="loading"
                    class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <div v-else>
                <span v-if="isTextButton"
                        :style="{color: parseTextColor}"
                >

                {{ text }}
                </span>
                <span v-else-if="isIconButton">
                    <i :class="icon"></i>
                </span>
                <span v-else-if="isReloadingIcon">
                    <i v-if="reloading" class="fa fa-refresh fa-spin"></i>
                    <i v-else class="fa fa-refresh"></i>
                </span>
            </div>
        </button>
    </div>
</template>

<script>
    export default {
        name: "CoreButton",
        props: {
            reloading: {
                type: [Boolean],
                default: false
            },
            loading: {
                type: [Boolean],
                default: false
            },
            text: {
                type: [String, Number],
                default: 'default'
            },
            textColor: {
                type: String,
                default: 'default'
            },
            background: {
                type: String,
                default: 'success'
            },
            disable: {
                type: Boolean,
                default: false
            },
            btnOutline: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: 'default'
            },
            isReloadIcon: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            }
        },
        computed: {
            parseClass() {
                if(this.isIconButton) {
                    return 'btn btn-outline-' + this.background + this.addingSize();
                }
                if(this.btnOutline) {
                    return 'btn btn-outline-' + this.background + this.addingSize();
                }
                return 'btn btn-' + this.background + this.addingSize();
            },
            parseTextColor() {
                if(this.textColor.toString() !== 'default') {
                    return this.textColor;
                }
                return '';
            },
            isTextButton() {
                if(this.icon.toString() === 'default' && this.text.toString() !== 'default') {
                    return true;
                }
                return false;
            },
            isTextIconButton() {
                if(this.icon.toString() !== 'default' && this.text.toString() !== 'default') {
                    return true;
                }
                return false;
            },
            isReloadingIcon() {
                if(this.icon.toString() === 'default' && this.isReloadIcon && this.text.toString() === 'default') {
                    return true;
                }
                return false;
            },
            isIconButton() {
                if(this.icon.toString() !== 'default' && !this.isReloadIcon && this.text.toString() === 'default') {
                    return true;
                }
                return false;
            },
        },
        methods: {
            addingSize() {
                return ' ' + this.size;
            }
        }
    }
</script>

<style scoped lang="scss">
.core-button {
    width: fit-content;
}
</style>