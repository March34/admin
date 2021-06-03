<template>
  <!-- tabs导航切换 -->
  <div id="tags-view-container" ref="tagsViewContainer" class="tags-view-container">
    <div ref="scrollPane" :style="{ left: scrollLeft + 'px' }" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :id="tag.path"
        ref="tag"
        :key="tag.path"
        v-waves
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </div>
    <span class="tags-view-btn tags-view-prev" @click="prev">
      <i class="el-icon-arrow-left" />
    </span>
    <span class="tags-view-btn tags-view-next" @click="next">
      <i class="el-icon-arrow-right" />
    </span>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'

export default {
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],

      // 滚动参数
      scrollLeft: 0,
      scrollStep: 100
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    prev() {
      if (this.scrollLeft + this.scrollStep < 0) {
        this.scrollLeft += this.scrollStep
      } else {
        this.scrollLeft = 0
      }
    },
    next() {
      const container = this.$refs['tagsViewContainer'].offsetWidth
      const scrollPane = this.$refs['scrollPane'].offsetWidth
      const scrollStep = this.scrollStep
      // 判断滚动条件
      // 1、打开菜单超过页面宽度
      // 2、滚动的菜单未超过最后一个
      if (scrollPane > container) {
        if ((scrollPane + this.scrollLeft) > container + scrollStep) {
          this.scrollLeft -= scrollStep
        } else {
          this.scrollLeft = container - scrollPane - 2
        }
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
        /* mischeiff 开始 */
        this.$nextTick(() => { // 添加时
          const container = this.$refs['tagsViewContainer'].offsetWidth
          const scrollPane = this.$refs['scrollPane'].offsetWidth
          // 如果添加多，自动滚动到最后一个
          if (scrollPane > container) {
            this.scrollLeft = container - scrollPane
          }
        })
        /* mischeiff 结束 */
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            // this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            /* mischeiff 开始 */
            const container = this.$refs['tagsViewContainer'].offsetWidth
            const scrollPane = this.$refs['scrollPane'].offsetWidth
            const thisTagLeft = document.getElementById(tag.to.path).offsetLeft
            // 判断如果滚动的左边在范围之内 mischieff
            if ((scrollPane - container) > thisTagLeft) {
              this.scrollLeft = -thisTagLeft
            } else {
              if (scrollPane > container) {
                this.scrollLeft = container - scrollPane
              }
            }
            /* mischeiff 结束 */
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        console.log(this.isActive(view))
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
        /* mischeiff 开始 */
        const container = this.$refs['tagsViewContainer'].offsetWidth
        const scrollPane = this.$refs['scrollPane'].offsetWidth
        console.log(scrollPane, container, this.scrollLeft)
        // 判断如果滚动的左边在范围之内 mischieff
        if (scrollPane > container) {
          this.scrollLeft = container - scrollPane
        } else {
          this.scrollLeft = 0
        }
        /* mischeiff 结束 */
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
        this.scrollLeft = 0
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
        this.scrollLeft = 0
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'home') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.tags-view-container {
	height: 34px;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	position: absolute;
	top: 0;
	right: 20px;
	left: 20px;
	.tags-view-wrapper {
		width: max-content;
		position: absolute;
		top: 0;
		transition: all 0.3s;
		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 26px;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			margin-top: 4px;
			user-select: none;
			overflow: hidden;
			&.active {
				background-color: $baseColor;
				color: #fff;
				border-color: $baseColor;
				&::before {
					content: '';
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}
		}
	}
	.tags-view-btn {
		position: absolute;
		top: 1px;
		height: 32px;
		width: 20px;
		line-height: 32px;
		text-align: center;
		cursor: pointer;
		background-color: #fff;
		z-index: 666;
		box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.12), 0 3px 0px 0 rgba(0, 0, 0, 0.04);
		&.tags-view-prev {
			left: -20px;
		}
		&.tags-view-next {
			right: -20px;
		}
	}
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		top: 34px !important;
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
	.tags-view-item {
		.el-icon-close {
			width: 16px;
			height: 16px;
			vertical-align: 2px;
			border-radius: 50%;
			text-align: center;
			transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
			transform-origin: 100% 50%;
			&:before {
				transform: scale(0.6);
				display: inline-block;
				vertical-align: -3px;
			}
			&:hover {
				background-color: #b4bccc;
				color: #fff;
			}
		}
	}
}
</style>
