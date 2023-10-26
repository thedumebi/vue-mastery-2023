import nProgress from 'nprogress'

/**
 * @param {import ('vue-router').Router} router 
 */
export default (router) => {
  router.beforeEach((_to, _from, next) => {
    nProgress.start()
    next()
  })

  router.afterEach(nProgress.done)
}
