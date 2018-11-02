import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Card } from 'antd';
import List from './List';
import Modal from './Modal'
import Styles from './Index.less';

@connect(({ category, loading }) => ({ category, loading: loading.models.category }))
export default class Index extends PureComponent {

      state = {
            pagination: { pageIndex: 0, pageSize: 1000 },
            filtersArg: {},
            sorter: {},
      };

      componentDidMount() {
            const { dispatch } = this.props;
            dispatch({
                  type: 'category/query',
                  payload: { ... this.state.pagination },
            });
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
                  type: 'category/query',
                  payload: params,
            });
      }

      render() {

            const { category: { data, currentItem, modalVisible, modalType }, dispatch, loading } = this.props;

            const { pagination, filtersArg, sorter } = this.state

            const listProps = {
                  onCreateItem() {
                        dispatch({
                              type: 'category/showModal',
                              payload: {
                                    modalType: 'create',
                              },
                        })
                  },
                  onEditItem(record) {
                        dispatch({
                              type: 'category/showModal',
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
                              type: 'category/remove',
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
                              type: `category/${modalType}`,
                              payload: { item, params }
                        })
                  },
                  onCancel() {
                        dispatch({
                              type: 'category/hideModal',
                        })
                  },
            }
            //为了消除Modal缓存数据的影响
            const ModalGen = () => <Modal {...modalProps} />

            return (
                  <PageHeaderWrapper>
                        <Card bordered={false} className={Styles.card}>
                              <List
                                    loading={loading}
                                    data={data}
                                    onChange={this.handleTableChange}
                                    {...listProps}
                              />
                        </Card>
                        <ModalGen />
                  </PageHeaderWrapper>
            );
      }
}
