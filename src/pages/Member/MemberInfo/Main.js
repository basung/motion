import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { isEmpty } from '@/utils/utils'
import List from './List';
import Modal from './Modal';
import Filter from './Filter'
import Styles from './Index.less';

@connect(({ memberInfo, loading }) => ({ memberInfo, loading: loading.models.memberInfo }))
export default class Index extends PureComponent {

      state = {
            pagination: { pageIndex: 0, pageSize: 10 },
            filtersArg: {},
            sorter: {},
      };

      componentDidMount() {
            const { dispatch, memberInfo: { data } } = this.props;
            if ((!isEmpty(data) && !isEmpty(data.pagination) && data.pagination.current > 0)) {
                  let pagination = data.pagination
                  pagination.pageIndex = pagination.current - 1
                  delete pagination.current
                  delete pagination.total
                  dispatch({
                        type: 'memberInfo/query',
                        payload: { ...pagination },
                  });
            } else {
                  dispatch({
                        type: 'memberInfo/query',
                        payload: { ... this.state.pagination },
                  });
            }
      }

      // 列表分页、排序、筛选变化时触发
      handleTableChange = (pagination, filtersArg, sorter) => {

            const { dispatch } = this.props;
            this.setState({ pagination: pagination, filtersArg: filtersArg, sorter: sorter }, () => {
                  const params = {
                        pageIndex: this.state.pagination.current - 1,
                        pageSize: this.state.pagination.pageSize,
                        sort: this.state.sorter.field,
                        ...this.state.filtersArg,
                  };
                  dispatch({
                        type: 'memberInfo/query',
                        payload: params,
                  });
            })
      }

      render() {

            const { memberInfo: { data, categoryData, currentItem, modalVisible, modalType }, dispatch, loading } = this.props;

            const { pagination, filtersArg, sorter } = this.state

            const listProps = {
                  onCreateItem() {
                        dispatch({
                              type: 'memberInfo/showModal',
                              payload: {
                                    modalType: 'create',
                              },
                        })
                  },
                  onEditItem(record) {
                        dispatch({
                              type: 'memberInfo/toCreatePage',
                              payload: {
                                    modalType: 'update',
                                    id: record.id,
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
                              type: 'memberInfo/remove',
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
                              type: `memberInfo/${modalType}`,
                              payload: { item, params }
                        })
                  },
                  onCancel() {
                        dispatch({
                              type: 'memberInfo/hideModal',
                        })
                  },
            }
            //为了消除Modal缓存数据的影响
            const ModalGen = () => <Modal {...modalProps} />

            return (
                  <Card bordered={false} className={Styles.card}>
                        <Filter
                              onChange={this.handleTableChange}
                              data={data}
                              categoryData={categoryData}
                        />
                        <List
                              loading={loading}
                              data={data}
                              onChange={this.handleTableChange}
                              {...listProps}
                        />
                        <ModalGen />
                  </Card>
            );
      }
}
