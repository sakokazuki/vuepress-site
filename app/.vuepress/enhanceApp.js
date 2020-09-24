import store from './store'

//titleの表示のデフォルトの設定を上書きする。
// frontmatter > locale > configの順
const TitleOverwrite = {
  computed: {
    $title () {
      const page = this.$page
      const siteTitle = this.$siteTitle // locale.title || title
      const title = page.frontmatter.title || siteTitle

      return title
    }
  }
}


export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.mixin(TitleOverwrite);

  Vue.mixin({store: store})
}
