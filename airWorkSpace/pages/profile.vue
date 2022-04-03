<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title>
          <v-avatar size="56">
            <v-img alt="avatar" :src="$auth.$state.user.avatar" />
          </v-avatar>
          <span class="ml-5">
            Hello, i'm {{ $auth.$state.user.firstName }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="mx-2">
            User since {{ $store.state.monthShortName[new Date($auth.$state.user.created).getMonth()] }}
            {{ new Date($auth.$state.user.created).getFullYear() }}
            <v-divider />
          </div>
          <div class="my-10">
            <div class="city">
              <v-icon>mdi-home</v-icon>
              Lives in {{ $auth.$state.user.city }}, {{ $auth.$state.user.country }}
            </div>
          </div>
        </v-card-text>
        <div class="text-right mx-2 py-2">
          <v-btn @click.prevent="logout">
            Logout
          </v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProfilePage',
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
