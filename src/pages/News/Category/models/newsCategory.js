import { parse } from 'qs';
import { query, create, update, remove } from '@/services/api_self';
import { api_url, checkStatus }  from '@/utils/api_url';
import { Notification } from '@/components/Notification'


export default {
      namespace: 'newsCategory',
      state: {
            data: {
                  list: [],
                  pagination: {},
            },
            currentItem: {},
            modalType: 'create',
            modalVisible: false,
      },
      effects: {
            *query({ payload }, { call, put }) {
                  const response = yield call(query, { url: api_url.api_article_category_query, params: parse(payload) });
                  if(checkStatus(response)){
                        const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
                        yield put({
					type: 'save',
					payload: { data },
				});
                  }
            },
            *create({ payload }, { call, put }) {
			const response = yield call(create, { url: api_url.api_article_category_create, args: payload.item })
			if (checkStatus(response)) {
                        yield put({ type: 'hideModal' })
				Notification('success',  '创建成功!!!')
				const page = payload.params
				const response = yield call(query, { url: api_url.api_article_category_query, params: parse(page) });
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
			const id = yield select(({ newsCategory }) => newsCategory.currentItem.id)
			const newData = { ...payload.item, id }
			const response = yield call(update, { url: api_url.api_article_category_update, args: newData })
			if (checkStatus(response)) {
				yield put({ type: 'hideModal' })
				Notification('success', '编辑成功')
				const page = payload.params
				const response = yield call(query, { url: api_url.api_article_category_query, params: parse(page) });
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
			const response = yield call(remove, { url: api_url.api_article_category_remove,id: payload.id });
			if (checkStatus(response)) {
				Notification('success', '删除成功')
				const page = payload.params
				const response = yield call(query, { url: api_url.api_article_category_query, params: parse(page) });
				if (checkStatus(response)) {
					const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
					yield put({
						type: 'save',
						payload: { data },
					})
				}
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
