<template>
  <div class="mixin-components-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>水波纹 waves v-directive</span>
      </div>
      <div class="component-item">
        <el-button v-waves type="primary"> 水波纹效果 </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ComponentMixinDemo'
}
</script>

<style scoped>
.mixin-components-container {
	background-color: #f0f2f5;
	padding: 20px;
	min-height: calc(100vh - 84px);
}
.component-item {
	min-height: 100px;
}
</style>
