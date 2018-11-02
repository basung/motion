import { parse } from 'qs';
import router from 'umi/router';
import { query, create, update, remove, getByIds } from '@/services/api_self';
import { api_url, checkStatus } from '@/utils/api_url';
import { Notification } from '@/components/Notification'


export default {
	namespace: 'adminUser',
	state: {
		data: {
			list: [],
			pagination: {},
		},
		currentItem: {},
		roleData: [],
		modalType: 'create',
	},
	effects: {
		*query({ payload }, { call, put }) {
			const response = yield call(query, { url: api_url.api_adminUser_query, params: parse(payload) });
			const responseRole = yield call(query, { url: api_url.api_role_query, params: { pageIndex: 0, pageSize: 10000 } });
			if (checkStatus(response) && checkStatus(responseRole)) {
				let pagination = { ...payload }
				pagination.total = response.total
				pagination.pageSize = response.pageSize
				pagination.current = response.pageIndex + 1
				const data = { list: response.rows, pagination: { ...pagination } };
				// const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
				const roleData = responseRole.rows
				yield put({
					type: 'save',
					payload: { data, roleData },
				});
			}
		},
		*create({ payload }, { call, put }) {
			const response = yield call(create, { url: api_url.api_adminUser_create, args: payload })
			if (checkStatus(response)) {
				Notification('success', '创建成功!!!')
				router.push('/system/adminUser/adminUserList');
			}
		},
		*update({ payload }, { select, call, put }) {
			const id = yield select(({ adminUser }) => adminUser.currentItem.id)
			const newData = { ...payload, id }
			const response = yield call(update, { url: api_url.api_adminUser_edit, args: newData })
			if (checkStatus(response)) {
				Notification('success', '编辑成功')
				router.push('/system/adminUser/adminUserList');
			}
		},
		*remove({ payload }, { call, put }) {
			const response = yield call(remove, { url: api_url.api_adminUser_remove, id: payload.id });
			if (checkStatus(response)) {
				Notification('success', '删除成功')
				yield put({
					type: 'query',
					payload: { ...payload.params }
				})
			}
		},
		*toCreatePage({ payload }, { call, put }) {

			yield put({
				type: 'save',
				payload: { modalType: payload.modalType },
			})

			if (payload.modalType === 'create') {
				router.push('/system/adminUser/adminUserEdit/id');
			} else if (payload.modalType === 'update') {
				router.push('/system/adminUser/adminUserEdit/' + payload.id);
			}
		},

		*getUserById({ payload }, { call, put }) {
			const response = yield call(getByIds, { url: api_url.api_adminUser_get, id: payload.id });
			if (checkStatus(response)) {
				const currentItem = response.data
				yield put({
					type: 'save',
					payload: { currentItem, modalType: payload.modalType },
				})
			}
		},

		*getRole({ payload }, { call, put }) {
			const response = yield call(query, { url: api_url.api_role_query, params: { pageIndex: 0, pageSize: 10000 } });
			if (checkStatus(response)) {
				const roleData = response.rows
				yield put({
					type: 'save',
					payload: { roleData },
				})
			}
		},

	},
	reducers: {
		save(state, action) {
			return { ...state, ...action.payload };
		},
		showModal(state, action) {
			return { ...state, ...action.payload }
		},
		hideModal(state) {
			return { ...state }
		},
	},
};
