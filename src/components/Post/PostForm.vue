<template>
    <div>
        <h3>Form Post</h3>
        <h2 v-if="isEditForm">Edit Form</h2>
        <h2 v-else>Add Form</h2>
        <p>Title</p>
        <div class="input-group mb-3">
            <input
                    v-model="dataForm.title"
                    type="text" class="form-control" placeholder="Title">
        </div>
        <p>Content</p>
        <div class="input-group mb-3">
            <input
                    v-model="dataForm.content"
                    type="text" class="form-control" placeholder="Content">
        </div>
        <div class="core-flex-inline-class">
            <core-button
                    text="Submit"
                    @click="onSubmit"
                    :loading="loadingProcessing"
                    size="btn-sm"
                    :disable="loadingProcessing"
            />
            <core-button
                    text="Reset"
                    @click="reset"
                    size="btn-sm"
                    background="warning"
            />
            <core-button
                    text="Close"
                    @click="close"
                    background="secondary"
                    size="btn-sm"
            />
        </div>
    </div>
</template>

<script>
    import CoreBaseForm from "@/core/components/base/CoreBaseForm";
    import CoreButton from "@/core/components/button/CoreButton";

    export default {
        name: "PostForm",
        extends: CoreBaseForm,
        components: {
            CoreButton
        },
        created() {
            // console.log(this.$options.properties)
        },
        watch: {
            'dataForm.title' (val) {
                console.log('___watch___:' + val);
            },
            'dataForm.content' (val) {
                console.log('___watch___:' + val);
            }
        },
        data() {
            return {
                dataForm: {
                    title: 'this is title',
                    content: 'this is content'
                }
            }
        },
        methods: {
            onSubmit() {
                this.save();
                console.log('Submit');
            },
        }
    }
</script>

<style scoped>

</style>