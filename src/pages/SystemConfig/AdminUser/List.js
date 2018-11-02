
import React, { PureComponent } from 'react';
import { Table, Modal, Button, Badge, Divider } from 'antd';
import moment from 'moment';
import { isEmpty } from '@/utils/utils'
import { IMGURL } from '@/utils/api_evn'
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

            function associatedType(type){
                  if(type === 'superAdmin' ){
                        return <Badge status="processing" text="管理员" />
                  }else if(type === 'tenant'){
                        return <Badge status="processing" text="租户" />
                  }else if(type === 'employee'){
                        return <Badge status="processing" text="雇员" />
                  }else if(type === 'supplier'){
                        return <Badge status="processing" text="供应商" />
                  }
            }

            const columns = [

                  {
                        title: '用户名',
                        dataIndex: 'loginName',
                        align: 'center',
                  },
                  {
                        title: '头像',
                        dataIndex: 'avatar',
                        render: (text) => text ? <img height={45} src={IMGURL + text} style={{ borderRadius: '50%' }} /> : <div style={{ height: '45px' }}></div>,
                        align: 'center',
                  },
                  {
                        title: '真实姓名',
                        dataIndex: 'trueName',
                        align: 'center',
                  },
                  {
                        title: '手机',
                        dataIndex: 'mobile',
                        align: 'center',
                  },
                  {
                        title: '电话',
                        dataIndex: 'telephone',
                        align: 'center',
                  },
                  {
                        title: '邮箱',
                        dataIndex: 'email',
                        align: 'center',
                  },
                  {
                        title: '性别',
                        dataIndex: 'sex',
                        render: (text) => <span>{text
                              ? <Badge status="success" text="男" />
                              : <Badge status="warning" text="女" />}</span>,
                        align: 'center',
                  },
                  {
                        title: '生日',
                        dataIndex: 'birthday',
                        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
                        align: 'center',
                  },
                  {
                        title: '关联角色',
                        dataIndex: 'roleId',
                        align: 'center',
                  },
                  {
                        title: '账号类型',
                        dataIndex: 'associatedType',
                        render: val => <span>{associatedType(val)}</span>,
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
                        fixed: 'right',
                        align: 'center',
                        width: 120,
                  },
            ];

            return (
                  <div>
                        <Button icon="plus" type="primary" onClick={onCreateItem} style={{ marginBottom: 10, marginRight: 10 }}>新增</Button>
                        <Table
                              className={Styles.table}
                              scroll={{ x: 2000 }}
                              loading={loading}
                              rowKey={record => record.id}
                              dataSource={list}
                              columns={columns}
                              bordered
                              pagination={paginationProps}
                              onChange={this.handleTableChange}
                        />
                  </div>
            );
      }
}

export default StandardTable;
