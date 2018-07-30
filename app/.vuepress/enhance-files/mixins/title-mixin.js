
//titleの表示のデフォルトの設定を上書きする。
// frontmatter > locale > configの順
export default {
  computed: {
    $title () {
      const page = this.$page
      const siteTitle = this.$siteTitle // locale.title || title
      const title = page.frontmatter.title || siteTitle
      
      return title
    }
  }
}