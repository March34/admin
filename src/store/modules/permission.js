// 设置动态路由
import Layout from '@/layout'
import { getRouters } from '@/api/user'
import { constantRoutes } from '@/router'

/**
 * 动态路由整合
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const routerArray = routes.filter(item => {
    if (item.component) {
      if (item.component === 'Layout') {
        // Layout组件特殊处理
        item.component = Layout
        if (item.children) {
          if (item.children.length > 1) {
            item.alwaysShow = true
          } else {
            item.alwaysShow = false
          }
        } else {
          item.children.push(item)
          item.alwaysShow = false
        }
      } else {
        try {
          item.component = process.env.NODE_ENV === 'development' ? require(`@/views${item.component}`).default : import('@/views' + item.component)
        } catch (e) {
          item.component = process.env.NODE_ENV === 'development' ? require(`@/views/error-page/404`).default : import('@/views/error-page/404')
          console.log(e)
          console.log('%c mischieff温馨提示---------------模板路径配置有误 %c', 'color:red;')
        }
      }
    }
    if (item.children && item.children.length) {
      item.children = filterAsyncRoutes(item.children)
    }
    if (item.children && item.children.length === 0) {
      delete item.children
    }
    return true
  })
  return routerArray
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  getRouters({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getRouters()
        .then(response => {
          const asyncRouters = filterAsyncRoutes(response.data, roles) // 整合后的动态路由
          const accessedRoutes = [...asyncRouters, { path: '*', redirect: '/404', hidden: true }]
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
