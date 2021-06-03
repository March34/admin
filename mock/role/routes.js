module.exports = [
	{
		path: '/guide',
		component: 'Layout',
		name: 'guide',
		meta: {
			title: '引导页',
			icon: 'component'
		},
		children: [
			{
				path: 'guide',
				component: '/guide',
				name: 'guide',
				meta: { title: '引导页' }
			}
		]
	},
	{
		path: '/components',
		component: 'Layout',
		redirect: 'noRedirect',
		name: 'ComponentDemo',
		meta: {
			title: '模块',
			icon: 'guide'
		},
		children: [
			{
				path: 'processDemo',
				component: '/components-demo/process-demo',
				name: 'processDemo',
				meta: { title: '流程' }
			},
			{
				path: 'tinymce',
				component: '/components-demo/tinymce',
				name: 'TinymceDemo',
				meta: { title: '富文本编辑器' }
			},
			{
				path: 'countTo',
				component: '/components-demo/count-to',
				name: 'countTo',
				meta: { title: '滚动数字' }
			},
			{
				path: 'sticky',
				component: '/components-demo/sticky',
				name: 'StickyDemo',
				meta: { title: '固定元素' }
			},
			{
				path: 'print',
				component: '/components-demo/print',
				name: 'print',
				meta: { title: '在线打印' }
			},
			{
				path: 'mixin',
				component: '/components-demo/mixin',
				name: 'ComponentMixinDemo',
				meta: { title: '按钮效果' }
			},
			{
				path: 'back-to-top',
				component: '/components-demo/back-to-top',
				name: 'BackToTopDemo',
				meta: { title: '返回顶部' }
			},
			{
				path: 'drag-dialog',
				component: '/components-demo/drag-dialog',
				name: 'DragDialogDemo',
				meta: { title: '弹框' }
			},
			{
				path: 'dnd-list',
				component: '/components-demo/dnd-list',
				name: 'DndListDemo',
				meta: { title: '穿梭器' }
			},
			{
				path: 'drag-kanban',
				component: '/components-demo/drag-kanban',
				name: 'DragKanbanDemo',
				meta: { title: '拖拽' }
			}
		]
	},
	{
		path: '/nested',
		component: 'Layout',
		redirect: '/nested/menu1/menu1-1',
		name: 'Nested',
		meta: {
			title: '多级菜单',
			icon: 'nested'
		},
		children: [
			{
				path: 'menu1',
				component: '/nested/menu1/index', // Parent router-view
				name: 'Menu1',
				meta: { title: '一级菜单 1' },
				redirect: '/nested/menu1/menu1-1',
				children: [
					{
						path: 'menu1-1',
						component: '/nested/menu1/menu1-1',
						name: 'Menu1-1',
						meta: { title: '二级菜单 1' }
					},
					{
						path: 'menu1-2',
						component: '/nested/menu1/menu1-2',
						name: 'Menu1-2',
						redirect: '/nested/menu1/menu1-2/menu1-2-1',
						meta: { title: '二级菜单 2' },
						children: [
							{
								path: 'menu1-2-1',
								component: '/nested/menu1/menu1-2/menu1-2-1',
								name: 'Menu1-2-1',
								meta: { title: '三级菜单 1' }
							},
							{
								path: 'menu1-2-2',
								component: '/nested/menu1/menu1-2/menu1-2-2',
								name: 'Menu1-2-2',
								meta: { title: '三级菜单 2' }
							}
						]
					},
					{
						path: 'menu1-3',
						component: '/nested/menu1/menu1-3',
						name: 'Menu1-3',
						meta: { title: '二级菜单 3' }
					}
				]
			},
			{
				path: 'menu2',
				name: 'Menu2',
				component: '/nested/menu2/index',
				meta: { title: '一级菜单 2' }
			}
		]
	},
	{
		path: '/error',
		component: 'Layout',
		name: 'error',
		meta: {
			title: '错误',
			icon: '404'
		},
		children: [
			{
				path: '404',
				component: '/error-page/404',
				name: '404',
				meta: { title: '404' }
			},
			{
				path: '401',
				component: '/error-page/401',
				name: '401',
				meta: { title: '401' }
			}
		]
	}
]
