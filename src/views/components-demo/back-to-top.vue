<template>
  <div class="components-container">
    <aside>
      当页面滚动到指定位置时，“返回顶部”按钮将显示在右下角
      <br>您可以自定义按钮的样式，显示/隐藏，外观高度，返回高度。如果需要文本提示，则可以在外部使用element-ui
      el-tooltip元素
    </aside>
    <div class="placeholder-container">
      <div v-for="(item, index) in text" :key="'a' + index">
        {{ item }}
      </div>
    </div>
    <!-- you can add element-ui's tooltip -->
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="0"
        transition-name="fade"
      />
    </el-tooltip>
  </div>
</template>

<script>

export default {
  name: 'BackToTopDemo',
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      text: []
    }
  },
  created() {
    const textArr = 'M'.repeat(60)
    this.text = textArr
  }
}
</script>

<style scoped>
.placeholder-container div {
  margin: 10px;
}
</style>
