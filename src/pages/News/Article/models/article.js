import { parse } from 'qs';
import router from 'umi/router';
import { query, create, update, remove, getByIds } from '@/services/api_self';
import { api_url, checkStatus } from '@/utils/api_url';
import { Notification } from '@/components/Notification'


export default {
      namespace: 'article',
      state: {
            data: {
                  list: [],
                  pagination: {},
            },
            currentItem: {},
            categoryData: [],
            modalType: 'create',
      },
      effects: {
            *query({ payload }, { call, put }) {
                  const response = yield call(query, { url: api_url.api_article_news_query, params: parse(payload) });
                  const responseCategory = yield call(query, { url: api_url.api_article_category_query, params: { pageIndex: 0, pageSize: 10000 } });
                  if (checkStatus(response) && checkStatus(responseCategory)) {
                        let pagination = { ...payload }
                        pagination.total = response.total
                        pagination.pageSize = response.pageSize
                        pagination.current = response.pageIndex + 1
                        const data = { list: response.rows, pagination: { ...pagination } };
                        // const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
                        const categoryData = responseCategory.rows
                        yield put({
                              type: 'save',
                              payload: { data, categoryData },
                        });
                  }
            },
            *create({ payload }, { call, put }) {
                  const response = yield call(create, { url: api_url.api_article_news_create, args: payload })
                  if (checkStatus(response)) {
                        Notification('success', '创建成功!!!')
                        router.push('/news/article/list');
                  }
            },
            *update({ payload }, { select, call, put }) {
                  const id = yield select(({ article }) => article.currentItem.id)
                  const newData = { ...payload, id }
                  const response = yield call(update, { url: api_url.api_article_news_update, args: newData })
                  if (checkStatus(response)) {
                        Notification('success', '编辑成功')
                        router.push('/news/article/list');
                  }
            },
            *remove({ payload }, { call, put }) {
                  const response = yield call(remove, { url: api_url.api_article_news_remove, id: payload.id });
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
                        router.push('/news/article/edit/id');
                  } else if (payload.modalType === 'update') {
                        router.push('/news/article/edit/' + payload.id);
                  }
            },

            *getNewsById({ payload }, { call, put }) {
                  const response = yield call(getByIds, { url: api_url.api_article_news_get, id: payload.id });
                  if (checkStatus(response)) {
                        const currentItem = response.data
                        yield put({
                              type: 'save',
                              payload: { currentItem, modalType: payload.modalType },
                        })
                  }
            },

            *getCategory({ payload }, { call, put }) {
                  const response = yield call(query, { url: api_url.api_article_category_query, params: { pageIndex: 0, pageSize: 10000 } });
                  if (checkStatus(response)) {
                        const categoryData = response.rows
                        yield put({
                              type: 'save',
                              payload: { categoryData },
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
