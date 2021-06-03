<template>
  <div class="components-container">
    <process v-model="process.active">
      <process-item label="标签一" name="tabs1"> 标签一内容 </process-item>
      <process-item label="标签二" name="tabs2"> 标签二内容 </process-item>
      <process-item label="标签三" name="tabs3"> 标签三内容 </process-item>
      <process-item label="标签四" name="tabs4" disabled> 标签四内容 </process-item>
    </process>
  </div>
</template>

<script>
export default {
  name: 'ProcessDemo',
  data() {
    return {
      process: {
        active: 'tabs3'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
