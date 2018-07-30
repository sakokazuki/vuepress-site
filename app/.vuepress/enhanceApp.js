import TitleMixin from './enhance-files/mixins/title-mixin'
import CommonData from './enhance-files/mixins/common-data'
import store from './enhance-files/store'
import routersetup from './enhance-files/router'

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