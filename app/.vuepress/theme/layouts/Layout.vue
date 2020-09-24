<template lang="pug">
  .theme-container
    p hoge
    Content(:custom="false")
</template>


<script>
import Vue from 'vue'

export default {
  components: { },
  data () {
    return {}
  },
  computed: {

  },
  created () {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
      const localeHeadTags = (this.$localeConfig.head || []).map(this.renderHeadTag).join('\n ');
      this.$ssrContext.userHeadTags = `${this.$ssrContext.userHeadTags}\n ${localeHeadTags}`
    }
  },

  mounted () {
  },

  beforeDestroy () {
  },

  methods: {
    renderHeadTag (tag) {
      const { tagName, attributes, innerHTML, closeTag } = this.normalizeHeadTag(tag)
      return `<${tagName}${this.renderAttrs(attributes)}>${innerHTML}${closeTag ? `</${tagName}>` : ``}`
    },
    normalizeHeadTag (tag) {
      if (typeof tag === 'string') {
        tag = [tag]
      }
      const tagName = tag[0]
      return {
        tagName,
        attributes: tag[1] || {},
        innerHTML: tag[2] || '',
        closeTag: !(tagName === 'meta' || tagName === 'link')
      }
    },
    renderAttrs (attrs = {}) {
      const keys = Object.keys(attrs)
      if (keys.length) {
        keys.map(name =>{
          `${name}="${escape(attrs[name])}"`
        })

        return ' ' + keys.map(name => `${name}="${attrs[name]}"`).join(' ')
      } else {
        return ''
      }
    }
  }
}
</script>

