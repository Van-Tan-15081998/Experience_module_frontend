<script>
    // import {cloneDeep, isObject, isArray} from 'lodash';


    export default {
        name: "CoreBaseForm",
        data () {
            return {
                url: '',
                loadingFormData: false,
                formData: null,
                loadingProcessing: false,
                cloneFormData: null,
                errors: null
            }
        },
        props: {
            propDataToForm: {
                type: Object,
                default: () => ({})
            },
            isEditForm: {
                type: Boolean,
                default: false
            },
        },
        created() {
            this.initData();
        },
        watch: {
            loadingFormData (value) {
                this.exEventBus.emit('LOADING_MODAL', value)
            }
        },
        methods: {
            initData() {
                let app = this;
                this.loadingFormData = true;

                //-----Get data form-----//

                setInterval(() => {app.loadingFormData = false}, 3000);
            },
            loadFormData() {

            },
            loadAttribute() {

            },
            getAttribute() {

            },
            save() {
                this.loadingProcessing = true;
            },
            delete() {

            },
            getFormData() {

            },
            close() {
                this.loadingProcessing = false;
            },
            back() {

            },
            reset() {
                if(this.isEditForm) {
                    console.log('1')
                } else {
                    console.log('2')
                }
            }
        }
    }
</script>

<style scoped>

</style>