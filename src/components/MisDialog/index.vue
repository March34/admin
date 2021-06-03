<template>
  <div class="MisDialog">
    <el-dialog
      v-el-drag-dialog
      :custom-class="className"
      :width="`${width}px`"
      :fullscreen="fullscreen"
      top="10vh"
      :visible.sync="dialogVisible"
      :title="title"
    >
      <slot />
      <template slot="footer">
        <slot name="footer" class="dialog-footer" />
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MisDialog',
  props: {
    title: { // 标题
      type: String,
      default: '弹框'
    },
    className: {
      type: String,
      default: 'mis-dialog'
    },
    width: { // 弹框宽度
      type: Number,
      default: 680
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false // 弹框的显示
    }
  },
  watch: {
    dialogIsVisible(newV, oldV) {
      this.dialogVisible = newV
    }
  },
  methods: {
    closeDialog() {
      // this.$emit('close')
    },
    show() {
      this.dialogVisible = true
    },
    hide() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
.MisDialog {
  ::v-deep {
    .el-dialog {
      @include scrollbar(0, 8px);
      .el-dialog__body {
        max-height: 65vh;
        overflow: auto;
      }
      .el-dialog__footer {
        padding: 15px;
      }
    }
  }
}
</style>
