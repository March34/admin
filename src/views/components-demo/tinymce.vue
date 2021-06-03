<template>
  <div class="components-container">
    <aside>
      富文本编辑器请参考
      <a
        target="_blank"
        class="link-type"
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html"
      >Documentation</a>
    </aside>
    <div>
      <Tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
export default {
  name: 'TinymceDemo',
  data() {
    return {
      content: ``
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

