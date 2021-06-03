/*
  element: 元素ID
  popover: {
    title: 步骤名,
    description: 步骤描述,
    position: popover位置,
    offset: 偏移量,
  },
  padding:
*/
const settings = {
  position: 'bottom', // popover位置
  closeBtnText: '关闭',
  nextBtnText: '下一步',
  prevBtnText: '上一步'
}
const doneBtnText = '666' // 最后一个按钮
const stageBackground = '#fff'
const steps = [
  {
    element: '#hamburger-container',
    stageBackground,
    popover: {
      title: 'Hamburger',
      description: 'Open && Close sidebar',
      ...settings
    }
  },
  {
    element: '#breadcrumb-container',
    stageBackground,
    popover: {
      title: 'Breadcrumb',
      description: 'Indicate the current page location',
      ...settings
    }
  },
  {
    element: '#screenfull',
    stageBackground,
    popover: {
      title: 'Screenfull',
      description: 'Set the page into fullscreen',
      ...settings,
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    stageBackground,
    popover: {
      title: 'Tags view',
      description: 'The history of the page you visited',
      ...settings,
      doneBtnText
    },
    padding: 0
  }
]

export default steps
