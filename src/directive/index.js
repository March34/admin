import waves from './waves/waves'
import drag from './el-drag-dialog/drag'

export default (Vue) => {
  Vue.directive('waves', waves)
  Vue.directive('el-drag-dialog', drag)
}
