<script>
    import DefaultLayout from "@/core/components/layouts/DefaultLayout";

    export default {
        name: "CoreBaseTable",
        components: {
            DefaultLayout
        },
        data () {
            return {
                url: '',
                urlAttribute: 'get_common_attribute',
                loading: false,
                loadingTable: false,
                loadingSearch: false,
                pagination: {
                    perPage: 15,
                    page: 1,
                    totalRecords: 0
                },
                filter: {},
                items: [],
                fields: [],
                isOpenForm: false,
                isOpenEditForm: false,
                isOpenFormDetail: false,
            }
        },
        methods: {
            openFormAdd(data = null) {
                this.isOpenForm = true;
                console.log(data);
            },
            openFormEdit(data = null) {
                this.isOpenForm = true;
                this.isOpenEditForm = true;
                console.log(data);
            },
            openFormDetail(data = null) {
                this.isOpenFormDetail = true;
                console.log(data);
            },
            closeForm() {
                this.isOpenForm = false;
                this.isOpenEditForm = false;
                this.isOpenFormDetail = false;
            }
        },
        created() {
            this.exEventBus.on('OPEN_FORM_ADD_EVENT', (data) => {
                this.openFormAdd(data);
            } )
            this.exEventBus.on('OPEN_FORM_EDIT_EVENT', (data) => {
                this.openFormEdit(data);
            } )
        }
    }
</script>

<style scoped>

</style>