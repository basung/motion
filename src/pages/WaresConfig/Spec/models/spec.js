import { parse } from 'qs';
import router from 'umi/router';
import { query, create, update, remove, getByIds } from '@/services/api_self';
import { api_url, checkStatus } from '@/utils/api_url';
import { Notification } from '@/components/Notification'


export default {
      namespace: 'spec',
      state: {
            data: {
                  list: [],
                  pagination: {},
            },
            currentItem: {},
            modalType: 'create',
      },
      effects: {
            *query({ payload }, { call, put }) {
                  const response = yield call(query, { url: api_url.api_wares_spec_query, params: parse(payload) });
                  if (checkStatus(response)) {
                        const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
                        yield put({
                              type: 'save',
                              payload: { data },
                        });
                  }
            },
            *create({ payload }, { call, put }) {
                  const response = yield call(create, { url: api_url.api_wares_spec_create, args: payload })
                  if (checkStatus(response)) {
                        yield put({ type: 'hideModal' })
                        Notification('success', '创建成功!!!')
                        router.push('/waresConfig/spec/list');
                  }
            },
            *update({ payload }, { select, call, put }) {
                  const id = yield select(({ spec }) => spec.currentItem.id)
                  const newData = { ...payload, id }
                  console.info('newData ===', JSON.stringify(newData))
                  const response = yield call(update, { url: api_url.api_wares_spec_update, args: newData })
                  if (checkStatus(response)) {
                        yield put({ type: 'hideModal' })
                        Notification('success', '编辑成功')
                        router.push('/waresConfig/spec/list');
                  }
            },
            * remove({ payload }, { call, put }) {
                  const response = yield call(remove, { url: api_url.api_wares_spec_remove, id: payload.id });
                  if (checkStatus(response)) {
                        Notification('success', '删除成功')
                        yield put({
                              type: 'query',
                              payload: { ...payload.params }
                        })
                  }
            },
            * toCreatePage({ payload }, { call, put }) {

                  yield put({
                        type: 'save',
                        payload: { modalType: payload.modalType },
                  })

                  if (payload.modalType === 'create') {
                        router.push('/waresConfig/spec/edit/id');
                  } else if (payload.modalType === 'update') {
                        router.push('/waresConfig/spec/edit/' + payload.id);
                  }
            },
            * getItemById({ payload }, { call, put }) {
                  const response = yield call(getByIds, { url: api_url.api_wares_spec_get, id: payload.id });
                  if (checkStatus(response)) {
                        const currentItem = response.data
                        yield put({
                              type: 'save',
                              payload: { currentItem, modalType: payload.modalType },
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
