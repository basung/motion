import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { isEmpty } from '@/utils/utils'
import List from './List';
import Modal from './Modal'
import Styles from './Index.less';

@connect(({ role, loading }) => ({ role, loading: loading.models.role }))
export default class Index extends PureComponent {

      state = {
            pagination: { pageIndex: 0, pageSize: 10 },
            filtersArg: {},
            sorter: {},
      };

      componentDidMount() {
            const { dispatch, role: { data } } = this.props;
            console.info('data ===', JSON.stringify(data))
            if((!isEmpty(data) && !isEmpty(data.pagination) && data.pagination.current > 0)){
                  const params = {
                        pageIndex: data.pagination.current-1,
                        pageSize: data.pagination.pageSize,
                        // sort: data.pagination.sorter.field,
                        // ...this.state.filtersArg,
                  };
                  dispatch({
                        type: 'role/query',
                        payload: { ...params },
                  });
            }else{
                  dispatch({
                        type: 'role/query',
                        payload: { ... this.state.pagination },
                  });
            }
      }

      // 列表分页、排序、筛选变化时触发
      handleTableChange = (pagination, filtersArg, sorter) => {
            this.state.pagination = pagination ? pagination : {}
            this.state.filtersArg = filtersArg ? filtersArg : {}
            this.state.sorter = pagination ? sorter : {}
            const { dispatch } = this.props;
            const params = {
                  pageIndex: this.state.pagination.current - 1,
                  pageSize: this.state.pagination.pageSize,
                  sort: this.state.sorter.field,
                  ...this.state.filtersArg,
            };
            dispatch({
                  type: 'role/query',
                  payload: params,
            });
      }

      render() {

            const { role: { data, currentItem, modalVisible, modalType }, dispatch, loading } = this.props;

            const { pagination, filtersArg, sorter } = this.state

            const listProps = {
                  onCreateItem() {
                        dispatch({
                              type: 'role/showModal',
                              payload: {
                                    modalType: 'create',
                              },
                        })
                  },
                  onRelationItem(id) {
                        dispatch({
                              type: 'role/relationPage',
                              payload: { id },
                        })
                  },
                  onEditItem(record) {
                        dispatch({
                              type: 'role/showModal',
                              payload: {
                                    modalType: 'update',
                                    currentItem: record,
                              },
                        })
                  },
                  onDeleteItem(id) {
                        const params = {
                              pageIndex: data.pagination.current - 1,
                              pageSize: data.pagination.pageSize,
                              sort: sorter.field,
                              ...filtersArg,
                        };
                        dispatch({
                              type: 'role/remove',
                              payload: { id, params }
                        })
                  },
            }

            const modalProps = {
                  item: modalType === 'create' ? {} : currentItem,
                  list: data.list,
                  type: modalType,
                  visible: modalVisible,
                  onOk(item) {
                        const params = {
                              pageIndex: data.pagination.current - 1,
                              pageSize: data.pagination.pageSize,
                              sort: sorter.field,
                              ...filtersArg,
                        };
                        dispatch({
                              type: `role/${modalType}`,
                              payload: { item, params }
                        })
                  },
                  onCancel() {
                        dispatch({
                              type: 'role/hideModal',
                        })
                  },
            }
            //为了消除Modal缓存数据的影响
            const ModalGen = () => <Modal {...modalProps} />

            return (
                  <Card bordered={false} className={Styles.card}>
                        <div className={Styles.tableList}>
                              <List
                                    loading={loading}
                                    data={data}
                                    onChange={this.handleTableChange}
                                    {...listProps}
                              />
                        </div>
                        <ModalGen />
                  </Card>
            );
      }
}
