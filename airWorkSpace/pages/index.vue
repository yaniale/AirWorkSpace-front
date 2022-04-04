<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card elevation="0">
        <SearchBar />
        <SearchResult v-if="$store.state.centers.length > 0" />
        <v-card v-else>
          <v-card-text>
            Donde quieres trabajar hoy?
          </v-card-text>
        </v-card>
      </v-card>
      <v-card />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
