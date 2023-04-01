<template>
    <div class="container-fluid">
        <div class="page-title">
            <h3>Page Title</h3>
        </div>

        <slot name="search-field" />

        <slot name="table" />
    </div>
</template>

<script>
    export default {
        name: "DefaultLayout",
        props: {
            pageTitle: {
                type: [String, Boolean],
                default: false
            },
            loadingSearch: {
                type: Boolean,
                default: false
            },
            loadingTable: {
                type: Boolean,
                default: false
            },
            totalSearch: {
                type: Number,
                default: 2
            },
            screenId: {
                type: [String, Number],
                default: ''
            },
        }
    }
</script>

<style scoped>

</style>