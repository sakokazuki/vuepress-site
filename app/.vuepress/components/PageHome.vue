<template lang="pug">
  div
    h1 home
    p blue text
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
  console.log("end async test");
}

const wait = ()=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve();
    }, 1000)
  })
}


</script>

<style lang="stylus" scoped>
p
  color: $blue
</style>


