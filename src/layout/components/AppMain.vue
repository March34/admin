<template>
  <section id="app-main" class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  // .app-main {
  //   /* 84 = navbar + tags-view = 50 + 34 */
  //   min-height: calc(100vh - 84px);
  // }

  // .fixed-header + .app-main {
  //   padding-top: 84px;
  // }
  .app-main {
    padding: 0;
  }

  .fixed-header + .app-main {
    position: absolute;
    top: 84px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
}
</style>

<style lang="scss">
</style>
