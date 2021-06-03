<template>
  <div class="process">
    <div class="process-bar">
      <span v-for="(item, index) in navTabList" :key="index" :style="tabStyle()" :class="tabCls(item, index)" @click="!item.disabled && handleChange(index)">
        {{ item.label }}
      </span>
    </div>
    <div class="process-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Process',
  props: {
    value: {
      type: String,
      required: true,
      default: 'tabs1'
    }
  },
  data() {
    return {
      navTabList: null,
      active: this.value
    }
  },
  watch: {
    value: function(val) {
      this.active = val
    },
    active() {
      this.updateNav()
    }
  },
  methods: {
    getTabs() { // 流程标题
      return this.$children.filter(item => {
        return item.$options.name === 'processItem'
      })
    },
    tabCls(item, i) {
      console.log(item)
      return [
        'tabs-tab',
        `tabs-tab-${i}`,
        {
          'tabs-tab-active': item.name === this.active,
          'tabs-tab-disabled': !!item.disabled,
          'tabs-tab-first': item.name === this.navTabList[0].name,
          'tabs-tab-last': item.name === this.navTabList.length
        }
      ]
    },
    tabStyle() {
      return {
        'width': `calc(${((1 / this.navTabList.length).toFixed(4) * 100)}% - 5px)`
      }
    },
    updateNav() { // 获取标题，name,并放置到navList数组中
      const navTabList = this.getTabs().map((tab, index) => {
        return {
          label: tab.label,
          name: tab.name || index,
          show: tab.name === this.active,
          disabled: tab.disabled
        }
      })
      this.navTabList = navTabList
    },
    handleChange(i) {
      const thisNav = this.navTabList[i]
      const thisName = thisNav.name
      this.active = thisName
      this.$emit('input', thisName)
      this.$emit('on-click', thisName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/index.scss';
$bgColor: $baseColor;
$bgColorActive: #005bb7;
$bgColorDisabledActive: #a1cfff;
$barWidth: 5px;
$barHight: 42px;
$barHoverColor: rgba($bgColor, 0.95);
$barHoverColorActive: rgba($bgColorActive, 0.9);
$barHoverColorDisabledActive: rgba($bgColorDisabledActive, 0.9);
.process {
	.process-bar {
		width: 100%;
		.tabs-tab {
			padding: 0px 10px 0 30px;
			line-height: $barHight;
			background: $bgColor;
			margin-right: $barWidth;
			display: inline-block;
			color: #fff;
			text-align: center;
			position: relative;
			cursor: pointer;
			&:hover {
				background: $barHoverColor;
				&:after {
					border-left-color: $barHoverColor;
				}
				&:before {
					border-top-color: transparent;
					border-bottom-color: transparent;
				}
			}
			&:after {
				content: '';
				display: block;
				border-top: $barHight/2 solid transparent;
				border-bottom: $barHight/2 solid transparent;
				border-left: $barHight/2 solid $bgColor;
				position: absolute;
				right: -$barHight/2;
				top: 0;
				z-index: 10;
			}
			&:before {
				content: '';
				display: block;
				border-top: $barHight/2 solid $bgColor;
				border-bottom: $barHight/2 solid $bgColor;
				border-left: $barHight/2 solid #fff;
				position: absolute;
				left: 0px;
				top: 0;
			}
		}
		.tabs-tab-first {
			&:before {
				display: none;
			}
		}
		.tabs-tab-last {
			&:after {
				display: none;
			}
		}
		.tabs-tab-disabled {
			cursor: no-drop;
			background: $bgColorDisabledActive;
			&:after {
				border-left-color: $bgColorDisabledActive;
			}
			&:before {
				border-top-color: $bgColorDisabledActive;
				border-bottom-color: $bgColorDisabledActive;
			}
			&:hover {
				background: $barHoverColorDisabledActive;
				&:after {
					border-left-color: $barHoverColorDisabledActive;
				}
				&:before {
					border-top-color: transparent;
					border-bottom-color: transparent;
				}
			}
		}
		.tabs-tab-active {
			background: $bgColorActive;
			&:after {
				border-left-color: $bgColorActive;
			}
			&:before {
				border-top-color: $bgColorActive;
				border-bottom-color: $bgColorActive;
			}
			&:hover {
				background: $barHoverColorActive;
				&:after {
					border-left-color: $barHoverColorActive;
				}
				&:before {
					border-top-color: transparent;
					border-bottom-color: transparent;
				}
			}
		}
	}
	.process-content {
		margin-top: 10px;
	}
}
</style>
