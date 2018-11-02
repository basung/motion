
import React, { PureComponent } from 'react';
import { Table, Modal, Button, Badge, Divider } from 'antd';
import { isEmpty, getTrees } from '@/utils/utils'
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import Styles from './Index.less';
const confirm = Modal.confirm


class StandardTable extends PureComponent {

      state = {
            selectedRowKeys: [],
      };

      //分页、排序、筛选变化时触发
      handleTableChange = (pagination, filters, sorter) => {
            this.props.onChange(pagination, filters, sorter);
      }

      render() {
            const { selectedRowKeys } = this.state;
            const { data: { list, pagination }, loading, onCreateItem, onEditItem, onDeleteItem, } = this.props;

            /**
             * 树状的算法
             * @params list     代转化数组
             * @params parentId 起始节点
             */
            let newList = (!isEmpty(list) && list.length > 0) ? getTrees(list, 0) : [];

            const onDelete = (record, e) => {
                  confirm({
                        title: '您确定要删除这条记录吗?',
                        okText: '确定',
                        cancelText: '取消',
                        onOk() {
                              onDeleteItem(record.id)
                        },
                  })
            }

            const paginationProps = {
                  showSizeChanger: true,
                  showQuickJumper: true,
                  hideOnSinglePage: false,
                  showTotal: total => `共 ${total} 条记录`,
                  ...pagination,
            };

            const columns = [

                  {
                        title: '分类名称',
                        dataIndex: 'name',
                        align: 'left',
                  },
                  {
                        title: '头像',
                        dataIndex: 'logo',
                        render: (text) => text ? <img height={40} src={IMGURL + text} style={{ borderRadius: '5%' }} /> : <div style={{ height: '40px' }}></div>,
                        align: 'center',
                  },
                  {
                        title: '描述',
                        dataIndex: 'description',
                        align: 'center',
                  },
                  {
                        title: '状态',
                        dataIndex: 'isActive',
                        render: (text) => <span>{text
                              ? <Badge status="success" text="已启用" />
                              : <Badge status="warning" text="已禁用" />}</span>,
                        align: 'center',
                  },
                  {
                        title: '操作',
                        render: (record) => (
                              <div>
                                    <a onClick={e => onEditItem(record, e)}>编辑</a>
                                    <Divider type="vertical" />
                                    <a onClick={e => onDelete(record, e)}>删除</a>
                              </div>
                        ),
                        align: 'center',
                        width: 120,
                  },
            ];

            return (
                  <div>
                        <Button icon="plus" type="primary" onClick={onCreateItem} style={{ marginBottom: 10, marginRight: 10 }}>新增</Button>
                        <Table
                              className={Styles.table}
                              scroll={{ x: true }}
                              loading={loading}
                              rowKey={record => record.id}
                              dataSource={newList}
                              columns={columns}
                              bordered
                              pagination={paginationProps}
                              onChange={this.handleTableChange}
                              defaultExpandAllRows = {true} //初始时，是否展开所有行
                              indentSize={50} //表格支持树形数据的展示，可以通过设置 indentSize 以控制每一层的缩进宽度。
                        />
                  </div>
            );
      }
}

export default StandardTable;
