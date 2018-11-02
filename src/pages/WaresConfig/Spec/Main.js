import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import List from './List';
import Styles from './Index.less';

@connect(({ spec, loading }) => ({ spec, loading: loading.models.spec }))
export default class Index extends PureComponent {

      state = {
            pagination: { pageIndex: 0, pageSize: 1000 },
            filtersArg: {},
            sorter: {},
      };

      componentDidMount() {
            const { dispatch } = this.props;
            dispatch({
                  type: 'spec/query',
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
                  type: 'spec/query',
                  payload: params,
            });
      }

      render() {

            const { spec: { data }, dispatch, loading } = this.props;

            const { filtersArg, sorter } = this.state

            const listProps = {
                  onCreateItem() {
                        dispatch({
                              type: 'spec/toCreatePage',
                              payload: {
                                    modalType: 'create',
                              },
                        })
                  },
                  onEditItem(record) {
                        dispatch({
                              type: 'spec/toCreatePage',
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
                              type: 'spec/remove',
                              payload: { id, params }
                        })
                  },
            }

            return (
                        <Card bordered={false} className={Styles.card}>
                              <List
                                    loading={loading}
                                    data={data}
                                    onChange={this.handleTableChange}
                                    {...listProps}
                              />
                        </Card>
            );
      }
}
