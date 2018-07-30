import store from '../store'

export default router=>{
  async function afterEach(to, from, next) {
    store.dispatch('changeLang', to.path);
    await router.app.$nextTick()
  }

  router.afterEach(afterEach)
}