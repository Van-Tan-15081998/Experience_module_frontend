<template>
    <v-runtime-template :template="parsedString" />
</template>
<script>
    import VRuntimeTemplate from "vue3-runtime-template";

    import CoreButton from "@/core/components/button/CoreButton";
    import KnowledgeUnit from "@/pages/Master/FavoriteApp/Knowledge/KnowledgeUnit.vue";

    export default {
        name: 'CoreDynamic',
        props: {
            string: {
                required: true,
                type: [String, Number]
            }
        },
        computed: {
          parsedString() {
              return this.string ? this.string.toString() : ''
          }
        },

        components: {
            VRuntimeTemplate,
            CoreButton,
            KnowledgeUnit
        },

        methods: {
            clickBtn(event) {
                console.log(event, this.parent.parent.parent.parent.parent.clickBtn(event))
            },

            executeEventMethod(event) {
                this.exEventBus.emit(event['eventName'], event['data'])
            }
        }
    };
</script>
