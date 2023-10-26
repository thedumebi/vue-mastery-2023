// vite uses lodash internally. it's already installed
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

export default {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/*.vue', { eager: true })

    Object.entries(baseComponents).forEach(([path, module]) => {
      const componentName = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            // .replace(/^\.\//, '')
            .replace(/\.\w+$/, '')
        )
      )

      //   console.log({ path, componentName })

      app.component(`Base${componentName}`, module.default || module)
    })
  }
}
