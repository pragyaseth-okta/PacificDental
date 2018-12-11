<template>
  <div class="container-fluid mt-4">
    <br><br><br><br>
    <h1 class="h1" align="center">Add Application</h1><br>
    <b-row>
    <b-col lg="2">
    </b-col>
    <b-col lg="1">
    </b-col>
      <b-col lg="6">
        <b-card>
          <form @submit.prevent="submitApp">
            <b-form-group label="Application Name">
              <b-form-input type="text" v-model="model.appName"></b-form-input>
            </b-form-group>
            <b-form-group label="Application URL">
              <b-form-input type="text" v-model="model.appUrl"></b-form-input>
            </b-form-group>
            <b-form-group label="User Name">
              <b-form-input type="text" v-model="model.userName"></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input type="password" v-model="model.password"></b-form-input>
            </b-form-group>
            <div>
              <b-row>
                <b-col/>
                <b-col>
                  <b-btn type="submit" variant="success" v-b-modal.modal1>Submit</b-btn>
                </b-col>
                <b-col/>
                <b-col>
                  <b-btn type="reset" variant="success">&nbsp; Clear &nbsp;</b-btn>
                </b-col>
                <b-col/>
              </b-row>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
    <v-dialog/>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async submitApp () {
      this.model.response = await api.createApp(this.model)
      var title = ''
      var message = ''
      if (this.model.response === 'status: OK' || this.model.response === 'OK') {
        title = 'Success'
        message = 'You have added the credentials for your app'
      } else {
        title = 'Error'
        message = 'Please correct your input'
      }
      this.$modal.show('dialog', {
        title: `${title}`,
        text: `${message}`,
        buttons: [
          {
            title: 'Close'
          }
        ]
      })
      this.model = {} // reset form
    }
  }
}
</script>
