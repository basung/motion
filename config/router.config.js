export default [
	// user
	{
		path: '/user',
		component: '../layouts/UserLayout/Index',
		routes: [
			{ path: '/user', redirect: '/user/login' },
			{ path: '/user/login', component: './User/Login' },
			{ path: '/user/register', component: './User/Register' },
			{ path: '/user/register-result', component: './User/RegisterResult' },
		],
	},
	// app
	{
		path: '/',
		component: '../layouts/BasicLayout',
		Routes: ['src/pages/Authorized'],
		authority: ['admin', 'user'],
		routes: [
			// dashboard
			{ path: '/', redirect: '/dashboard/analysis' },
			{
				path: '/dashboard',
				name: 'dashboard',
				icon: 'dashboard',
				routes: [
					{
						path: '/dashboard/analysis',
						name: 'analysis',
						component: './Dashboard/Analysis',
					},
					{
						path: '/dashboard/monitor',
						name: 'monitor',
						component: './Dashboard/Monitor',
					},
					{
						path: '/dashboard/workplace',
						name: 'workplace',
						component: './Dashboard/Workplace',
					},
				],
			},
			// forms
			{
				path: '/form',
				icon: 'form',
				name: 'form',
				routes: [
					{
						path: '/form/basic-form',
						name: 'basicform',
						component: './Forms/BasicForm',
					},
					{
						path: '/form/step-form',
						name: 'stepform',
						component: './Forms/StepForm',
						hideChildrenInMenu: true,
						routes: [
							{
								path: '/form/step-form',
								name: 'stepform',
								redirect: '/form/step-form/info',
							},
							{
								path: '/form/step-form/info',
								name: 'info',
								component: './Forms/StepForm/Step1',
							},
							{
								path: '/form/step-form/confirm',
								name: 'confirm',
								component: './Forms/StepForm/Step2',
							},
							{
								path: '/form/step-form/result',
								name: 'result',
								component: './Forms/StepForm/Step3',
							},
						],
					},
					{
						path: '/form/advanced-form',
						name: 'advancedform',
						authority: ['admin'],
						component: './Forms/AdvancedForm',
					},
				],
			},
			// list
			{
				path: '/list',
				icon: 'table',
				name: 'list',
				routes: [
					{
						path: '/list/table-list',
						name: 'searchtable',
						component: './List/TableList',
					},
					{
						path: '/list/basic-list',
						name: 'basiclist',
						component: './List/BasicList',
					},
					{
						path: '/list/card-list',
						name: 'cardlist',
						component: './List/CardList',
					},
					{
						path: '/list/search',
						name: 'searchlist',
						component: './List/List',
						routes: [
							{
								path: '/list/search',
								redirect: '/list/search/articles',
							},
							{
								path: '/list/search/articles',
								name: 'articles',
								component: './List/Articles',
							},
							{
								path: '/list/search/projects',
								name: 'projects',
								component: './List/Projects',
							},
							{
								path: '/list/search/applications',
								name: 'applications',
								component: './List/Applications',
							},
						],
					},
				],
			},
			{
				path: '/profile',
				name: 'profile',
				icon: 'profile',
				routes: [
					// profile
					{
						path: '/profile/basic',
						name: 'basic',
						component: './Profile/BasicProfile',
					},
					{
						path: '/profile/advanced',
						name: 'advanced',
						authority: ['admin'],
						component: './Profile/AdvancedProfile',
					},
				],
			},
			{
				name: 'result',
				icon: 'check-circle-o',
				path: '/result',
				routes: [
					// result
					{
						path: '/result/success',
						name: 'success',
						component: './Result/Success',
					},
					{ path: '/result/fail', name: 'fail', component: './Result/Error' },
				],
			},
			{
				name: 'exception',
				icon: 'warning',
				path: '/exception',
				routes: [
					// exception
					{
						path: '/exception/403',
						name: 'not-permission',
						component: './Exception/403',
					},
					{
						path: '/exception/404',
						name: 'not-find',
						component: './Exception/404',
					},
					{
						path: '/exception/500',
						name: 'server-error',
						component: './Exception/500',
					},
					{
						path: '/exception/trigger',
						name: 'trigger',
						hideInMenu: true,
						component: './Exception/TriggerException',
					},
				],
			},
			{
				name: 'account',
				icon: 'user',
				path: '/account',
				routes: [
					{
						path: '/account/center',
						name: 'center',
						component: './Account/Center/Center',
						routes: [
							{
								path: '/account/center',
								redirect: '/account/center/articles',
							},
							{
								path: '/account/center/articles',
								component: './Account/Center/Articles',
							},
							{
								path: '/account/center/applications',
								component: './Account/Center/Applications',
							},
							{
								path: '/account/center/projects',
								component: './Account/Center/Projects',
							},
						],
					},
					{
						path: '/account/settings',
						name: 'settings',
						component: './Account/Settings/Info',
						routes: [
							{
								path: '/account/settings',
								redirect: '/account/settings/base',
							},
							{
								path: '/account/settings/base',
								component: './Account/Settings/BaseView',
							},
							{
								path: '/account/settings/security',
								component: './Account/Settings/SecurityView',
							},
							{
								path: '/account/settings/binding',
								component: './Account/Settings/BindingView',
							},
							{
								path: '/account/settings/notification',
								component: './Account/Settings/NotificationView',
							},
						],
					},
				],
			},
			/**
			 * 自定义组件
			 */
			{
				name: 'component',
				icon: 'deployment-unit',
				path: '/component',
				routes: [
					// 自定义基础组件模版
					{
						path: '/component/braftEditor',
						name: 'braftEditor',
						component: './Component/BraftEditor',
					},
					{
						path: '/component/sketchPicker',
						name: 'sketchPicker',
						component: './Component/SketchPicker',
					},
					{
						path: '/component/qrcode',
						name: 'qrcode',
						component: './Component/Qrcode',
					},
					{
						path: '/component/motion',
						name: 'motion',
						component: './Component/Motion/Index.js',
					},
					{
						path: '/component/motion2',
						name: 'motion',
						component: './Component/Motion2/Index.js',
					},
				],
			},
			/**
			 * 系统配置模块
			 */
			{
				name: 'system',
				icon: 'safety',
				path: '/system',
				routes: [
					// 平台用户配置模块
					{
						path: '/system/adminUser',
						name: 'adminUser',
						component: './SystemConfig/AdminUser',
						hideChildrenInMenu: true,
						routes: [
							{
								path: '/system/adminUser',
								name: 'adminUser',
								redirect: '/system/adminUser/adminUserList',
							},
							// 管理用户列表
							{
								path: '/system/adminUser/adminUserList',
								name: 'adminUserList',
								component: './SystemConfig/AdminUser/AdminUserList',
							},
							// 管理用户编辑
							{
								path: '/system/adminUser/adminUserEdit/:id',
								name: 'adminUserEdit',
								component: './SystemConfig/AdminUser/Edit',
							},
						]
					},
					// 角色配置模块
					{
						path: '/system/role',
						name: 'role',
						component: './SystemConfig/Role',
						hideChildrenInMenu: true,
						routes: [
							{
								path: '/system/role',
								name: 'role',
								redirect: '/system/role/roleList',
							},
							// 角色管理权限列表
							{
								path: '/system/role/roleList',
								name: 'roleList',
								component: './SystemConfig/Role/RoleList',
							},
							// 角色管理权限模块
							{
								path: '/system/role/relationPermission/:id',
								name: 'relationPermission',
								component: './SystemConfig/Role/RelationPermission',
							},
						]
					},
					// 系统配置模块
					{
						path: '/system/permission',
						name: 'permission',
						component: './SystemConfig/Permission',
					},
				],
			},
			{
				component: '404',
			},
		],
	},
];
