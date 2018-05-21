import Vue from 'vue'

export default {
  computed: {
    $title () {
      const page = this.$page
      const siteTitle = this.$siteTitle

      //　意図的にfrontmatterのタイトルは使わない 
      // const selfTitle = page.frontmatter.home ? null : (
      //   page.frontmatter.title || // explicit title
      //   page.title // inferred title
      // )
      const defaultTitle = 'default title defined by header-mixin.js';
      const title = siteTitle !== undefined ? siteTitle : defaultTitle;
      return title
    }
  }
}