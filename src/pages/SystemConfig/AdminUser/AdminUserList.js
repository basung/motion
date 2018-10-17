import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { isEmpty } from '@/utils/utils'
import List from './List';
import Filter from './Filter'
import Styles from './Index.less';

@connect(({ adminUser, loading }) => ({ adminUser, loading: loading.models.adminUser }))
export default class Index extends PureComponent {

      state = {
            pagination: { pageIndex: 0, pageSize: 10 },
            filtersArg: {},
            sorter: {},
      };

      componentDidMount() {
            const { dispatch, adminUser: { data } } = this.props;
            if ((!isEmpty(data) && !isEmpty(data.pagination) && data.pagination.current > 0)) {
                  const params = {
                        pageIndex: data.pagination.current - 1,
                        pageSize: data.pagination.pageSize,
                        // sort: data.pagination.sorter.field,
                        // ...this.state.filtersArg,
                  };
                  dispatch({
                        type: 'adminUser/query',
                        payload: { ...params },
                  });
            } else {
                  dispatch({
                        type: 'adminUser/query',
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
                        type: 'adminUser/query',
                        payload: params,
                  });
            })
      }

      render() {

            const { adminUser: { data, roleData, currentItem, modalVisible, modalType }, dispatch, loading } = this.props;

            const { pagination, filtersArg, sorter } = this.state

            const listProps = {
                  onCreateItem() {
                        dispatch({
                              type: 'adminUser/toCreatePage',
                              payload: {
                                    modalType: 'create',
                              },
                        })
                  },
                  onEditItem(record) {
                        dispatch({
                              type: 'adminUser/toCreatePage',
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
                              type: 'adminUser/remove',
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
                              type: `adminUser/${modalType}`,
                              payload: { item, params }
                        })
                  },
                  onCancel() {
                        dispatch({
                              type: 'adminUser/hideModal',
                        })
                  },
            }

            return (
                  <Card bordered={false} className={Styles.card}>
                        <div className={Styles.tableList}>
                              <div className={Styles.tableListForm}>
                                    <Filter
                                          onChange={this.handleTableChange}
                                          data={data}
                                          roleData={roleData}
                                    />
                              </div>
                              <List
                                    loading={loading}
                                    data={data}
                                    onChange={this.handleTableChange}
                                    {...listProps}
                              />
                        </div>
                  </Card>
            );
      }
}
