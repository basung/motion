
import React, { PureComponent } from 'react';
import { Table, Modal, Button, Badge, Divider } from 'antd';
import { isJSON } from '@/utils/Index'
import moment from 'moment';
import { IMGURL } from '@/utils/api_evn'
import Styles from './Index.less';
const confirm = Modal.confirm


class StandardTable extends PureComponent {

      state = {
            selectedRowKeys: [],
            previewVisible: false,
            previewImageUrl: ''
      };

      //分页、排序、筛选变化时触发
      handleTableChange = (pagination, filters, sorter) => {
            this.props.onChange(pagination, filters, sorter);
      }

      //列表图片预览
      previewImage = (url) => {
            console.info('url ===', url)
            this.setState({ previewVisible: true, previewImageUrl: url})
      }

      onCancelPreviewImage = () => {
            this.setState({ previewVisible: false})
      }

      render() {
            const { selectedRowKeys } = this.state;
            const { data: { list, pagination }, loading, onCreateItem, onEditItem, onDeleteItem, } = this.props;

            const { previewImageUrl, previewVisible } = this.state

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
                        title: '状态',
                        dataIndex: 'isActive',
                        render: (text) => <span>{text
                              ? <Badge status="success" text="已启用" />
                              : <Badge status="warning" text="已禁用" />}</span>,
                        align: 'center',
                  },
                  {
                        title: '用户账号',
                        dataIndex: 'loginName',
                        align: 'center',
                  },
                  {
                        title: '用户昵称',
                        dataIndex: 'trueName',
                        align: 'center',
                  },
                  {
                        title: '头像',
                        dataIndex: 'avatar',
                        render: (text) => text ? <a onClick={e => this.previewImage(text)}><img height={40} src={IMGURL + text} style={{ borderRadius: '5%' }} /></a> : <div style={{ height: '40px' }}></div>,
                        align: 'center',
                  },
                  {
                        title: '账户金额',
                        dataIndex: 'advance',
                        align: 'center',
                  },
                  {
                        title: '会员积分',
                        dataIndex: 'memberPoints',
                        align: 'center',
                  },
                  {
                        title: '会员等级',
                        dataIndex: 'memberLevel',
                        align: 'center',
                  },
                  {
                        title: '订单数量',
                        dataIndex: 'orderNumber',
                        align: 'center',
                  },
                  {
                        title: '邮箱',
                        dataIndex: 'email',
                        align: 'center',
                        render: val => <a href={val} target="_blank">{val}</a>,
                  },
                  {
                        title: '电话',
                        dataIndex: 'telephone',
                        align: 'center',
                  },
                  {
                        title: '手机',
                        dataIndex: 'mobile',
                        align: 'center',
                  },
                  {
                        title: '区域',
                        dataIndex: 'memberRegions',
                        align: 'center',
                        render: (text) => <span>{isJSON(text)?JSON.parse(text).label:''}</span>,
                  },
                  {
                        title: '地址',
                        dataIndex: 'memberAddress',
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
                        title: '操作',
                        render: (record) => (
                              <div>
                                    <a onClick={e => onEditItem(record, e)}>详情</a>
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
                        <Modal
                              visible={previewVisible}
                              onCancel={this.onCancelPreviewImage}
                              footer={null}
                        >
                              <img src={IMGURL + previewImageUrl} width={'100%'} />
                        </Modal>
                  </div>
            );
      }
}

export default StandardTable;
