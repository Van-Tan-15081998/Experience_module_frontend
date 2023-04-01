<template>
    <div class="input-group mb-3">
        <input
                v-model="content"
                :type="type"
                class="form-control"/>
    </div>
</template>

<script>
    export default {
        name: "CoreFormInput",
        props: {
            value: {
                type: [Boolean, Number, String]
            },
            type: {
                type: [String],
                default: 'text'
            },
            min: {
                type: [Number, String],
                default: 0
            },
            max: {
                type: [Number, String],
                default: ''
            },
            round: {
                type: [Number],
                default: 0
            },
            defaultValue: {
                type: [Number, String],
                default: ''
            }
        },
        data () {
            return {
                content: this.value
            }
        },
        watch: {
            value (val) {
                this.content = val;
            },
            content (val) {
                this.$emit('change', val)
            }
        }
    }
</script>

<style scoped>

</style>