<template>
  <div v-show="active" class="process-item">
    <slot v-if="!disabled" />
  </div>
</template>

<script>
export default {
  name: 'ProcessItem',
  props: {
    name: {
      type: String,
      require: true,
      default: '标签一'
    },
    label: {
      type: String,
      default: ''
    },
    disabled: Boolean
  },
  computed: {
    active() {
      const active = this.$parent.active === (this.name || this.index)
      return active
    }
  },
  mounted() {
    this.updateNav()
  },
  methods: {
    updateNav() {
      this.$parent.updateNav()
    }
  }

}
</script>
<style lang="scss" scoped>
</style>
