<template lang="pug">

  .main-container
    p router link
    nav
      router-link(:to="$withRelative('/')") ja home /
      router-link(:to="$withRelative('test/')") ja test /
      router-link(:to="$withRelative('en/')") en home /
      router-link(:to="$withRelative('en/test')") en test /
    p external link
    nav
      a(:href="$withRelative('/')") ja home /
      a(:href="$withRelative('test/')") ja test /
      a(:href="$withRelative('en/')") en home /
      a(:href="$withRelative('en/test')") en test /
      a(:href="$lang.google" target="_blank") google: {{this.$lang.google}}

    Content(:custom="false")
    

    
</template>

<script>
import Vue from 'vue'

export default {
  components: {  },
  data () {
    return {
      isSidebarOpen: false
    }
  },

  computed: {
   
  },

  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },

  mounted () { 
    this.currentMetaTags = []
    const updateMeta = () => {
      document.title = this.$title
      document.documentElement.lang = this.$lang
      const meta = [
        {
          name: 'description',
          content: this.$description
        },
        ...(this.$page.frontmatter.meta || [])
      ]
      this.currentMetaTags = updateMetaTags(meta, this.currentMetaTags)
    }
    this.$watch('$page', updateMeta)
    updateMeta()    
  },

  beforeDestroy () {
    updateMetaTags(null, this.currentMetaTags)
  },
  methods: {

  }
}

function updateMetaTags (meta, current) {
  if (current) {
    current.forEach(c => {
      document.head.removeChild(c)
    })
  }
  if (meta) {
    return meta.map(m => {
      const tag = document.createElement('meta')
      Object.keys(m).forEach(key => {
        tag.setAttribute(key, m[key])
      })
      document.head.appendChild(tag)
      return tag
    })
  }
}
</script>

<style src="./styles/reset.styl" lang="stylus"></style>
