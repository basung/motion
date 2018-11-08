import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Tabs, Button } from 'antd';
import List from './List';
import Styles from './Index.less';
const TabPane = Tabs.TabPane;

@connect(({ order, loading }) => ({ order, loading: loading.models.order }))
export default class Index extends PureComponent {

      state = {
            pagination: { pageIndex: 0, pageSize: 1000 },
            filtersArg: {},
            sorter: {},
            activeKey: '0',  //当前激活的Tab面板
      };

      componentDidMount() {
            const { dispatch } = this.props;
            dispatch({
                  type: 'order/query',
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
                  type: 'order/query',
                  payload: params,
            });
      }

      render() {

            const { order: { data }, dispatch, loading } = this.props;

            const { filtersArg, sorter, activeKey } = this.state

            const operations = <Button type="primary" >添加订单</Button>;

            const listProps = {
                  onCreateItem() {
                        dispatch({
                              type: 'order/toCreatePage',
                              payload: {
                                    modalType: 'create',
                              },
                        })
                  },
                  onEditItem(record) {
                        dispatch({
                              type: 'order/toCreatePage',
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
                              type: 'order/remove',
                              payload: { id, params }
                        })
                  },
            }

            return (
                  <Card bordered={false} className={Styles.card}>
                        <List loading={loading} data={data} onChange={this.handleTableChange} {...listProps} />
                  </Card>
            );
      }
}
