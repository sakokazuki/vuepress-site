<template lang="pug">
  div
    h1 {{this.$lang.title}}
    h2 {{this.$lang.text}}
    p {{this.$lang.description_home}}

    img(:src="$withRelative('img/icon.jpg')")

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
    asyncFunc();
  },
  methods: {

  }
}

const asyncFunc = async ()=>{
  await wait();
}

const wait = ()=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    }, 1000)
  })
}


</script>

<style lang="stylus">
.content
  p
    color: $blue
</style>

