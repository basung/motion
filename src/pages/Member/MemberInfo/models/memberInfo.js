import { parse } from 'qs';
import router from 'umi/router';
import { query, create, update, remove, getByIds, editMemberPassword, query_all } from '@/services/api_self';
import { api_url, checkStatus }  from '@/utils/api_url';
import { Notification } from '@/components/Notification'


export default {
      namespace: 'memberInfo',
      state: {
            data: {
                  list: [],
                  pagination: {},
            },
            memberAddressData: [],
            currentItem: {},
            modalType: 'create',
            modalVisible: false,
      },
      effects: {
            *query({ payload }, { call, put }) {
                  const response = yield call(query, { url: api_url.api_member_memberInfo_query, params: parse(payload) });
                  if(checkStatus(response)){
                        const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
                        yield put({
					type: 'save',
					payload: { data },
				});
                  }
            },
            *create({ payload }, { call, put }) {
			const response = yield call(create, { url: api_url.api_member_memberInfo_create, args: payload.item })
			if (checkStatus(response)) {
                        // yield put({ type: 'hideModal' })
				Notification('success',  '创建成功!!!')
				yield put({
					type: 'query',
					payload: { ...payload.params }
				})
			}else{
                        yield put({
                              type: 'showModal'
                        })
                  }
            },
            *update({ payload }, { select, call, put }) {
			const id = yield select(({ memberInfo }) => memberInfo.currentItem.id)
			const newData = { ...payload.item, id }
			const response = yield call(update, { url: api_url.api_member_memberInfo_update, args: newData })
			if (checkStatus(response)) {
				Notification('success', '编辑成功')
			}
            },
            *editPassword({ payload }, { select, call, put }) {
			const response = yield call(editMemberPassword, payload)
			if (checkStatus(response)) {
				Notification('success', '密码修改成功')
			}
            },
            *remove({ payload }, { call, put }) {
			const response = yield call(remove, { url: api_url.api_member_memberInfo_remove,id: payload.id });
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
                        router.push('/member/memberInfo/edit/id');
                  } else if (payload.modalType === 'update') {
                        router.push('/member/memberInfo/edit/' + payload.id);
                  }
		},
		*getById({ payload }, { call, put }) {
                  const response = yield call(getByIds, { url: api_url.api_member_memberInfo_get, id: payload.id });
                  if (checkStatus(response)) {
                        const currentItem = response.data
                        yield put({
                              type: 'save',
                              payload: { currentItem, modalType: payload.modalType },
                        })
                  }
            },
            *getByAddress({ payload }, { call, put }) {
                  const response = yield call(query_all, { url: api_url.api_member_memberAddress_query + '?memberId=' + payload.id });
                  if (checkStatus(response)) {
                        const memberAddressData = response.rows
                        yield put({
                              type: 'save',
                              payload: { memberAddressData },
                        })
                  }
            },
            *createAddress({ payload }, { call, put }) {
                  console.info('payload ===', JSON.stringify(payload))
			const response = yield call(create, { url: api_url.api_member_memberAddress_create, args: payload.item })
			if (checkStatus(response)) {
				Notification('success',  '创建成功!!!')
				yield put({
					type: 'getByAddress',
					payload: { id: payload.item.memberId }
				})
			}
            },
            *updateAddress({ payload }, { select, call, put }) {
			const response = yield call(update, { url: api_url.api_member_memberAddress_update, args: payload.item })
			if (checkStatus(response)) {
                        Notification('success', '编辑成功')
                        yield put({
					type: 'getByAddress',
					payload: { id: payload.item.memberId }
				})
			}
            },
            *removeAddress({ payload }, { call, put }) {
			const response = yield call(remove, { url: api_url.api_member_memberAddress_remove,id: payload.item.id });
			if (checkStatus(response)) {
				Notification('success', '删除成功')
				yield put({
					type: 'getByAddress',
					payload: { id : payload.item.memberId }
				})
			}
		},

      },
      reducers: {
            save(state, action) {
                  return { ...state, ... action.payload };
            },
            showModal(state, action) {
			return { ...state, ...action.payload, modalVisible: true }
            },
            hideModal(state) {
			return { ...state, modalVisible: false }
		},
      },
};
