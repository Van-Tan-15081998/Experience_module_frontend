<template>
    <div class="container">
        <button id="show-modal" @click="isOpenForm = true">Show Modal</button>
        <core-table
                :items="items"
                :fields="fields"
        />

        <Teleport to="body">
            <core-modal :show="isOpenForm" @close="isOpenForm = false">
                <template #header>
                    <h3>custom header</h3>
                </template>
                <template v-if="isOpenForm" #body>
                    <post-form :prop-data-to-form="{data: 'Form data'}" :is-edit-form="isOpenEditForm"/>
                </template>
                <slot name="footer">
                    default footer
                    <button
                            class="modal-default-button"
                            @click="closeForm()"
                    >OK</button>
                </slot>
            </core-modal>
        </Teleport>
    </div>
</template>

<script>
    import testingData from "@/core/components/table/TestingData";
    import CoreTable from "@/core/components/table/CoreTable";
    import PostForm from "@/components/Post/PostForm";
    // import PostDetail from "@/components/Post/PostDetail";
    import CoreModal from "@/core/components/modal/CoreModal";
    import CoreBaseTable from "@/core/components/base/CoreBaseTable";

    import "@/assets/style/core-style/Core-style.scss";

    export default {
        name: "PostList",
        extends: CoreBaseTable,
        components: {
            PostForm,
            CoreTable,
            CoreModal
        },
        data () {
            return {
                showModal: false,
                items: [],
                fields: [
                    {
                        key: 'no',
                        label: 'No',
                    },
                    {
                        key: 'id',
                        label: 'Post ID',
                    },
                    {
                        key: 'title',
                        label: 'Post Title',
                    },
                    {
                        key: 'content',
                        label: 'Post Content',
                    },
                    {
                        key: 'author',
                        label: 'Post Author',
                    }
                ]
            }
        },
        created() {
            console.log(this.isOpenForm);
            this.items = testingData.data;
            this.parsedPostData();

            this.exEventBus.on('TEST_EVENT', (data) => {
                console.log('EVENT DATA', data)
            } )
        },
        methods: {
            parsedPostData() {
                if(this.items.length > 0) {
                    this.items.forEach((element) => {
                        element.title = this.buildPostTitle(element.title);
                        element.author = this.buildPostAuthor(element.author);
                    })

                }
            },

            buildPostTitle(postTitle) {
                if(postTitle) {
                    return `<div><b>${postTitle}</b></div>`;
                }
                return '';
            },
            buildPostAuthor(postAuthor) {
                let dataToSend = {
                    eventName: 'TEST_EVENT',
                    data: {
                        title: 'Test thử thôi',
                        time: 'To Day',
                    }
                }

                let openFormAdd = {
                    eventName: 'OPEN_FORM_ADD_EVENT',
                    data: {
                        title: 'Test thử thôi',
                        time: 'To Day',
                    }
                }

                let openFormEdit = {
                    eventName: 'OPEN_FORM_EDIT_EVENT',
                    data: {
                        title: 'Test thử thôi',
                        time: 'To Day',
                    }
                }

                dataToSend = JSON.stringify(dataToSend).replaceAll("\"", "'")
                openFormAdd = JSON.stringify(openFormAdd).replaceAll("\"", "'")
                openFormEdit = JSON.stringify(openFormEdit).replaceAll("\"", "'")

                if(postAuthor) {
                    if(postAuthor) {
                        return `<core-button @click="executeEventMethod(${dataToSend})"  text="${postAuthor}" />`
                            + `<core-button icon="fa fa-search" @click="executeEventMethod(${openFormAdd})" />`
                            + `<core-button icon="fa fa-edit" @click="executeEventMethod(${openFormEdit})" />`
                            + `<core-button icon="fa fa-trash" @click="executeEventMethod(${dataToSend})" />`;
                    }
                    return '';
                }
            },
        }
    }
</script>

<style scoped>

</style>