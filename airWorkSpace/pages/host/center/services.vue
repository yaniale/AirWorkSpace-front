<template>
  <v-row>
    <v-col>
      <v-card flat>
        <v-card-title>
          <v-icon class="mr-5" @click="$router.push({ path: '/host/center/allotment', component:'AllotmentPage'})">
            mdi-chevron-left
          </v-icon> Select services
        </v-card-title>
      </v-card>
      <v-card>
        <v-container fluid>
          <v-checkbox
            v-model="agendaManagement"
            class="my-0 py-0"
            label="Agenda Management"
          />
          <v-checkbox
            v-model="virtualOffice"
            class="my-0 py-0"
            label="Virtual Office"
          />
          <v-checkbox
            v-model="meetingRooms"
            class="my-0 py-0"
            label="Meeting Rooms"
          />
          <v-checkbox
            v-model="reception"
            class="my-0 py-0"
            label="Reception"
          />
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn to="/host/center">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ServicesPages',
  data () {
    return {
      agendaManagement: false,
      virtualOffice: false,
      meetingRooms: false,
      reception: false,
      flipcharte: false,
      parking: false,
      aC: false,
      access24: false,
      printer: false

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
