<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />

    <!-- headerBanner为系统的上下布局 -->
    <div
      v-if="headerBanner===0"
      class="setting-layout setting-layout-headerBanner-0"
    >
      <div class="headerBanner-header" :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <div class="headerBanner-content">
        <sidebar class="sidebar-container" />
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
          <tags-view v-if="needTagsView" />
          <app-main />
          <!-- <right-panel v-if="showSettings">
            <settings />
          </right-panel> -->
        </div>
      </div>
    </div>
    <!-- headerBanner为系统的左右布局 -->
    <div v-else-if="headerBanner===1" class="setting-layout setting-layout-headerBanner-1">
      <sidebar class="sidebar-container" />
      <div :class="{ hasTagsView: needTagsView }" class="main-container">
        <div class="system-header" :class="{ 'fixed-header': fixedHeader }">
          <navbar />
          <tags-view v-if="needTagsView" />
        </div>
        <app-main />
        <!-- <right-panel v-if="showSettings">
          <settings />
        </right-panel> -->
      </div>
    </div>
    <div v-else class="setting-layout setting-layout-headerBanner-2" :class="{ 'fixed-nav': fixedHeader }">
      <div class="headerBanner-header" :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <div class="headerBanner-content">
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      headerBanner: state => state.settings.headerBanner
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        'fixed-app-wrapper': this.fixedHeader,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  &.fixed-app-wrapper {
    overflow: hidden;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .setting-layout-headerBanner-1 {
    .tags-view-container{
      top:51px;
    }
    .fixed-header {
      width: calc(100% - 54px);
    }
  }
}

.mobile .fixed-header {
  width: 100%;
}
</style>
