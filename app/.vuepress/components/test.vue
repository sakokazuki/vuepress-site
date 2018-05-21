<template lang="pug">
  div
    h1 {{this.$lang.title}}
    h2 {{this.$lang.text}}
    p {{this.$lang.description_test}}
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
