<template>
  <div class="hello">
    <form @submit.prevent="submit">
      <label>Join the Slack:</label>
      <input v-model="email" required placeholder="" class="" name="email" type="email" />
      <vue-recaptcha
        ref="recaptcha"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
        size="invisible"
        sitekey="6LfD3lwUAAAAAJQ_Sr7ZP9ec-hVa-R-WbLKxnMaF">
      </vue-recaptcha>
      <button :disabled="status==='submitting'" type="submit" class="button"></button>
      <div v-if="status">{{status}}</div>
      <div v-if="serverError">{{serverError}}</div>
      <div v-if="sucessfulServerResponse">{{sucessfulServerResponse}}</div>
    </form>
<!--     <label>Join the Mailinglist:</label><input disabled placeholder="email" />
 -->  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      email: '',
      status: '',
      sucessfulServerResponse: '',
      serverError: ''
    }
  },
  methods: {
    submit: function() {
      // this.status = "submitting";
      this.$refs.recaptcha.execute()
    },
    onCaptchaVerified: function(recaptchaToken) {
      const self = this
      self.status = 'submitting'
      self.$refs.recaptcha.reset()
      axios
        .post('/.netlify/functions/slack', {
          email: self.email,
          recaptchaToken: recaptchaToken
        })
        .then(response => {
          if (response.data.ok) {
            self.sucessfulServerResponse = 'Thank you, please check your email'
            self.email = ''
          } else {
            self.sucessfulServerResponse = response.data
          }
        })
        .catch(err => {
          self.serverError = getErrorMessage(err)

          // helper to get a displayable message to the user
          function getErrorMessage(err) {
            let responseBody
            responseBody = err.response
            if (!responseBody) {
              responseBody = err
            } else {
              responseBody = err.response.data || responseBody
            }
            return responseBody.message || JSON.stringify(responseBody)
          }
        })
        .then(() => {
          self.status = ''
        })
    },
    onCaptchaExpired: function() {
      this.$refs.recaptcha.reset()
    }
  },
  components: {
    VueRecaptcha
  }
}
</script>

<style >
</style>
