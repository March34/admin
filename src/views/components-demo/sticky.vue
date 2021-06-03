<template>
  <div class="components-container">
    <aside>固定元素</aside>

    <div v-for="(item, index) in text" :key="'a' + index">
      <span v-if="index < 10">{{ item }}</span>
    </div>

    <sticky :z-index="1000" :sticky-top="200" class-name="sub-navbar">
      <el-button type="primary"> 顶部固定</el-button>
    </sticky>
    <div v-for="(item, index) in text" :key="'c' + index">{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: 'StickyDemo',
  data() {
    return {
      text: []
    }
  },
  created() {
    const textArr = 'M'.repeat(60)
    this.text = textArr
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.components-container div {
	margin: 10px;
}

.time-container {
	display: inline-block;
}
</style>
