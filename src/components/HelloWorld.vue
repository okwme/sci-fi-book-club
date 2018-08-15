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
        :sitekey="google">
      </vue-recaptcha>
      <button :disabled="status==='submitting'" type="submit" class="button"></button>
      <div v-if="status">{{status}}</div>
      <div v-if="serverError">{{serverError}}</div>
      <div v-if="sucessfulServerResponse">{{sucessfulServerResponse}}</div>
    </form>


    <!-- Begin MailChimp Signup Form -->
<div id="mc_embed_signup">
<form action="https://club.us18.list-manage.com/subscribe/post?u=6da71990ae231989fb097187b&amp;id=a1f732c8eb" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">

<div class="mc-field-group">
	<label for="mce-EMAIL">Join The Newsletter: </label>
	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
</div>
	<div id="mce-responses" class="clear">
		<div class="response" id="mce-error-response" style="display:none"></div>
		<div class="response" id="mce-success-response" style="display:none"></div>
	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_6da71990ae231989fb097187b_a1f732c8eb" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" style="display:none"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->
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
      serverError: '',
      google: '6LfD3lwUAAAAAJQ_Sr7ZP9ec-hVa-R-WbLKxnMaF'
    }
  },
  methods: {
    submit: function() {
      this.status = 'submitting'
      this.$refs.recaptcha.execute()
    },
    onCaptchaVerified: function(recaptchaToken) {
      const self = this
      self.status = 'submitting'
      self.$refs.recaptcha.reset()
      axios
        .post('/slack', {
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
