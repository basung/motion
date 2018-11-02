import { parse } from 'qs';
import router from 'umi/router';
import { query, create, update, remove, getByIds } from '@/services/api_self';
import { api_url, checkStatus } from '@/utils/api_url';
import { Notification } from '@/components/Notification'


export default {
      namespace: 'goods',
      state: {
            data: {
                  list: [],
                  pagination: {},
            },
            brandData: [],
            tagsData: [],
            categoryData: [],
            specData: [],
            currentItem: {},
            modalType: 'create',
      },
      effects: {
            *query({ payload }, { call, put }) {
                  const response = yield call(query, { url: api_url.api_wares_goods_query, params: parse(payload) });
                  if (checkStatus(response)) {
                        const data = { list: response.rows, pagination: { total: response.total, pageSize: response.pageSize, current: response.pageIndex + 1 } };
                        yield put({
                              type: 'save',
                              payload: { data },
                        });
                  }
            },
            *create({ payload }, { call, put }) {
                  const response = yield call(create, { url: api_url.api_wares_goods_create, args: payload })
                  if (checkStatus(response)) {
                        yield put({ type: 'hideModal' })
                        Notification('success', '创建成功!!!')
                        router.push('/wares/goods/list');
                  }
            },
            *update({ payload }, { select, call, put }) {
                  const id = yield select(({ goods }) => goods.currentItem.id)
                  const newData = { ...payload, id }
                  console.info('newData ===', JSON.stringify(newData))
                  const response = yield call(update, { url: api_url.api_wares_goods_update, args: newData })
                  if (checkStatus(response)) {
                        yield put({ type: 'hideModal' })
                        Notification('success', '编辑成功')
                        router.push('/wares/goods/list');
                  }
            },
            *remove({ payload }, { call, put }) {
                  const response = yield call(remove, { url: api_url.api_wares_goods_remove, id: payload.id });
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
                        router.push('/wares/goods/create');
                  } else if (payload.modalType === 'update') {
                        router.push('/wares/goods/edit/' + payload.id);
                  }
            },

            /**
             * 获取商品相关的数据
             * 规格、分类、品牌、标签
             */
            *getGoodsRelationData({ payload }, { call, put }) {
                  const brandResponse = yield call(query, { url: api_url.api_wares_brand_query, params: { pageIndex: 0, pageSize: 10000 } });
                  const tagsResponse = yield call(query, { url: api_url.api_wares_tags_query, params: { pageIndex: 0, pageSize: 10000 } });
                  const categoryResponse = yield call(query, { url: api_url.api_wares_category_query, params: { pageIndex: 0, pageSize: 10000 } });
                  const specResponse = yield call(query, { url: api_url.api_wares_spec_query, params: { pageIndex: 0, pageSize: 10000 } });
                  
                  if ( checkStatus(brandResponse) && checkStatus(tagsResponse) && checkStatus(categoryResponse) && checkStatus(specResponse) ) {
                        const brandData = brandResponse.rows
                        const tagsData = tagsResponse.rows
                        const categoryData = categoryResponse.rows
                        const specData = specResponse.rows
                        yield put({
                              type: 'save',
                              payload: { brandData: brandData,  tagsData: tagsData, categoryData: categoryData, specData: specData,  },
                        })
                  }
            },

            * getItemById({ payload }, { call, put }) {
                  const response = yield call(getByIds, { url: api_url.api_wares_goods_get, id: payload.id });
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
