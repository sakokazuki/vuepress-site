<template lang="pug">
  div
    h1 home
    p {{this.$localeConfig.text}}

    img(:src="$withBase('/img/icon.jpg')")

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

  },
  data () {
    return {}
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

