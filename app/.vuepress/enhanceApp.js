import TitleMixin from './mixins/title-mixin'
import CommonData from './mixins/common-data'
import store from './store'
import routersetup from './router'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.mixin(TitleMixin);
  Vue.mixin(CommonData);

  Vue.mixin({store: store})
  routersetup(router);

}