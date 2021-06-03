/* 系统基础 */
import RightPanel from './RightPanel/' // 布局-顶部
import Breadcrumb from './Breadcrumb/' // 面包屑
import Hamburger from './Hamburger/' // 收缩
import Screenfull from './Screenfull/' // 全屏
import ThemePicker from './ThemePicker/' // 系统按钮颜色
import MisDialog from './MisDialog/' // 系统弹框

import Tinymce from './Tinymce/' // 富文本编辑器
import Sticky from './Sticky/' // 固定
import BackToTop from './BackToTop/' // 返回顶部
import DndList from './DndList/' // 拖拽列表
import Kanban from './Kanban/' // 拖拽项
import scrollNum from './scrollNum/' // 滚动数字
import misCharge from './misCharge/' // 滚动数字
import process from './process/process' // 流程图组件
import processItem from './process/process-item' // 流程图子组件
export default {
  install(Vue) {
    Vue.component('RightPanel', RightPanel)
    Vue.component('Breadcrumb', Breadcrumb)
    Vue.component('Hamburger', Hamburger)
    Vue.component('Screenfull', Screenfull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('MisDialog', MisDialog)

    Vue.component('Tinymce', Tinymce)
    Vue.component('Sticky', Sticky)
    Vue.component('BackToTop', BackToTop)
    Vue.component('DndList', DndList)
    Vue.component('Kanban', Kanban)
    Vue.component('scrollNum', scrollNum)
    Vue.component('misCharge', misCharge)
    Vue.component('process', process)
    Vue.component('processItem', processItem)
  }
}
