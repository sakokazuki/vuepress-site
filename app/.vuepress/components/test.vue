<template lang="pug">
  div
    h1 test
    p {{this.$localeConfig.test}}
</template>

<script>
import Vue from 'vue'

export default {
  components: {  },


  computed: {

  },

  created () {
  },

  mounted () {

  },
  methods: {

  }
}

</script>

<style lang="stylus">

.content
  p
    color: $red
    
</style>

<!-- <style src="./styles/main.styl" lang="stylus"></style> -->
