import { parse } from 'qs';
import router from 'umi/router';
import { query, create, update, remove, getByIds, postByParams } from '@/services/api_self';
import { api_url, checkStatus } from '@/utils/api_url';
import { Notification } from '@/components/Notification'


export default {
	namespace: 'role',
	state: {
		data: {
			list: [],
			pagination: {},
		},
		currentItem: {},
		modalType: 'create',
		modalVisible: false,

		permission: [],
		rolePermission: [],
	},
	effects: {
		*query({ payload }, { call, put }) {
			const response = yield call(query, { url: api_url.api_role_query, params: parse(payload) });
			if (checkStatus(response)) {
				const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
				yield put({
					type: 'save',
					payload: { data },
				});
			}
		},
		*create({ payload }, { call, put }) {
			const response = yield call(create, { url: api_url.api_role_create, args: payload.item })
			if (checkStatus(response)) {
				yield put({ type: 'hideModal' })
				Notification('success', '创建成功!!!')
				const page = payload.params
				const response = yield call(query, { url: api_url.api_role_query, params: {} });
				// const response = yield call(query, { url: api_url.api_role_query, params: parse(page) });
				if (checkStatus(response)) {
					const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
					yield put({
						type: 'save',
						payload: { data },
					})
				}
			}
		},
		*update({ payload }, { select, call, put }) {
			const id = yield select(({ role }) => role.currentItem.id)
			const newData = { ...payload.item, id }
			const response = yield call(update, { url: api_url.api_role_edit, args: newData })
			if (checkStatus(response)) {
				yield put({ type: 'hideModal' })
				Notification('success', '编辑成功')
				const page = payload.params
				const response = yield call(query, { url: api_url.api_role_query, params: parse(page) });
				if (checkStatus(response)) {
					const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
					yield put({
						type: 'save',
						payload: { data },
					})
				}
			}
		},
		*remove({ payload }, { call, put }) {
			const response = yield call(remove, { url: api_url.api_role_remove, id: payload.id });
			if (checkStatus(response)) {
				Notification('success', '删除成功')
				const page = payload.params
				const response = yield call(query, { url: api_url.api_role_query, params: parse(page) });
				if (checkStatus(response)) {
					const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
					yield put({
						type: 'save',
						payload: { data },
					})
				}
			}
		},
		/**
		 * 管理页面跳转
		 */
		*relationPage({ payload }, { call, put }) {
			let itemId = payload.id
			router.push('/system/role/relationPermission/' + itemId);
		},

		/**
		 *  获取角色管理的权限
		 */
		*getRoleRelationPermission({ payload }, { call, put }) {
			const responsePermission = yield call(query, { url: api_url.api_permission_query, params: { pageIndex: 0, pageSize: 10000 } })
			const responseRolePermission = yield call(getByIds, { url: api_url.api_role_relation_permission, id: payload.id })
			if (checkStatus(responsePermission) && checkStatus(responseRolePermission)) {
				const permission = responsePermission.rows;
				const rolePermission = responseRolePermission.data
				yield put({
					type: 'save',
					payload: { permission, rolePermission }
				})
			}
		},

		/**
		 * 设置角色管理的权限
		 */
		*setRoleRelationPermission({ payload }, { call, put }) {
			const response = yield call(postByParams, { url: api_url.api_role_add_permissions, args: '?permissions=' + payload.permissions + '&roleId=' + payload.roleId })
			if (checkStatus(response)) {
				Notification('success', '权限设置成功')
				const responsePermission = yield call(query, { url: api_url.api_permission_query, params: { pageIndex: 0, pageSize: 10000 } })
				const responseRolePermission = yield call(getByIds, { url: api_url.api_role_relation_permission, id: payload.roleId })
				if (checkStatus(responsePermission) && checkStatus(responseRolePermission)) {
					const permission = responsePermission.rows;
					const rolePermission = responseRolePermission.data
					yield put({
						type: 'save',
						payload: { permission, rolePermission }
					})
				}
			}
		},

		/**
		 * 从编辑页面返回列表页面
		 */
		*backPage({ payload }, { call, put }) {
			console.info('payload ==',JSON.stringify(payload))
		},

	},
	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
		showModal(state, action) {
			return { ...state, ...action.payload, modalVisible: true }
		},
		hideModal(state) {
			return { ...state, modalVisible: false }
		},
	},
};
