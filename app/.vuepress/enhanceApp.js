import HeaderMixin from './enhance-files/header-mixin'
import CustomDataMixin from './enhance-files/custom-data-mixin'
import PathFunc from './enhance-files/path-func'
export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.mixin(CustomDataMixin);
  Vue.mixin(HeaderMixin);
  Vue.prototype.$withRelative = PathFunc;
}