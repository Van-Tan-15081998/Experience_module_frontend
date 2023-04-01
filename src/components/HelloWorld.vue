<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <div class="container">
      <!--      teleport-->
      <button id="show-modal" @click="showModal = true">Show Modal</button>
      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <core-modal :show="showModal" @close="showModal = false">
          <template #header>
            <h3>custom header</h3>
          </template>
        </core-modal>
      </Teleport>
      <!--      teleport-->

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch demo modal
      </button>
      <core-button/>
      <core-button icon="fa-spin"/>
      <core-button
              :disable="true"
              text="Disabled Button"
      />
      <core-button
              background="primary"
              :btn-outline="true"
              text="Outline Button"
      />
      <core-button
              background="primary"
              text="Primary Button"
      />
      <core-button
              background="secondary"
              text="Secondary Button"
      />
      <core-button
              background="warning"
              text="Warning Button"
      />
      <core-button
              background="danger"
              text="Danger Button"
      />
      <core-button
              background="info"
              text="Info Button"
      />
      <core-button
              background="light"
              text="Light Button"
      />
      <core-button
              background="light"
              text-color="red"
              text="Color Text Button"
      />
      <core-button
              :loading="true"
              background="success"
              text="Danger Button"
      />

    </div>
    <div class="container">
      <core-button
              icon="fa fa-shopping-cart"
              :on-click-btn="clickBtn"
      />
      <core-table
              :items="items"
              :fields="fields"
      />
    </div>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    <div  class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import CoreButton from "@/core/components/button/CoreButton";
  import CoreTable from "@/core/components/table/CoreTable";
  import testingData from "@/core/components/table/TestingData";
  // import CoreBaseTable from "@/core/components/base/CoreBaseTable";
  import CoreModal from "@/core/components/modal/CoreModal";
  import CoreBaseTable from "@/core/components/base/CoreBaseTable";

export default {
  name: 'HelloWorld',
  extends:[CoreBaseTable],
  props: {
    msg: String
  },
  components: {
    CoreButton,
    CoreTable,
    // CoreBaseTable
    CoreModal
  },
  // extends: [CoreBaseTable],
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
    this.items = testingData.data;
    this.parsedPostData();

    this.exEventBus.on('TEST_EVENT', (data) => {
      console.log('EVENT DATA', data)
    } )
  },
  computed() {

  },
  methods: {
    parsedPostData() {
      if(this.items.length > 0) {
        this.items.forEach((element) => {
          element.title = this.buildPostTitle(element.title);
          element.author = this.buildPostAuthor(element.author);
        })

        console.log(this.items);
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
          time: '15:06',
        }
      }

      dataToSend = JSON.stringify(dataToSend).replaceAll("\"", "'")

      if(postAuthor) {
        if(postAuthor) {
          return `<core-button @click="executeEventMethod(${dataToSend})"  text="${postAuthor}" />`
                  + `<core-button icon="fa fa-search" @click="executeEventMethod(${dataToSend})" />`
                  + `<core-button icon="fa fa-edit" @click="executeEventMethod(${dataToSend})" />`
                  + `<core-button icon="fa fa-trash" @click="executeEventMethod(${dataToSend})" />`;
        }
        return '';
      }
    },
    clickBtn(event) {
      console.log('clickBtn_event', event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
