<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>
          <slot :user="user" name="name">
            {{ user.name }}
          </slot>
        </td>

        <td>
          <slot :user="user" name="email">
            {{ user.email }}
          </slot>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    users: null
  },
  beforeMount() {

  }
}
</script>

<style scoped>

</style>