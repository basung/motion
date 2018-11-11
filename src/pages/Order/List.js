
import React, { PureComponent } from 'react';
import { Table, Modal, Button, Badge, Divider, Popover } from 'antd';
import { isJSON } from '@/utils/Index'
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import Ellipsis from '@/components/Ellipsis'
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
            this.setState({ previewVisible: true, previewImageUrl: url })
      }

      onCancelPreviewImage = () => {
            this.setState({ previewVisible: false })
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

            function orderStatus(status) {
                  switch (status) {
                        case 1:
                              return (<Badge status="warning" text="未付款" />);
                        case 2:
                              return (<Badge status="processing" text="已付款等待发货" />);
                        case 3:
                              return (<Badge status="processing" text="已发货等待确认收货" />);
                        case 4:
                              return (<Badge status="success" text="已签收" />);
                        case 5:
                              return (<Badge status="processing" text="退货申请" />);
                        case 6:
                              return (<Badge status="processing" text="退货中" />);
                        case 7:
                              return (<Badge status="success" text="已退货" />);
                        case 8:
                              return (<Badge status="success" text="取消交易" />);
                        default:
                              return (<Badge status="success" text="未付款" />);
                  }
            }

            function orderPayStatus(status) {
                  switch (status) {
                        case 1:
                              return (<Badge status="warning" text="未付款" />);
                        case 2:
                              return (<Badge status="success" text="付款完成" />);
                        case 3:
                              return (<Badge status="success" text="待退款" />);
                        case 4:
                              return (<Badge status="processing" text="已退款" />);
                        default:
                              return (<Badge status="warning" text="未付款" />);
                  }
            }

            const columns = [

                  {
                        title: '订单编号',
                        dataIndex: 'orderNo',
                        align: 'center',
                  },
                  {
                        title: '订单状态',
                        dataIndex: 'orderStatus',
                        align: 'center',
                        render: (text) => orderStatus(text)
                  },
                  {
                        title: '支付状态',
                        dataIndex: 'orderPayStatus',
                        align: 'center',
                        render: (text) => orderPayStatus(text)
                  },
                  {
                        title: '订单总价',
                        dataIndex: 'totalFee',
                        align: 'center',
                  },
                  {
                        title: '支付金额',
                        dataIndex: 'payment',
                        align: 'center',
                  },
                  {
                        title: '物流费用',
                        dataIndex: 'postFee',
                        align: 'center',
                  },
                  {
                        title: '收件人',
                        dataIndex: 'receiverName',
                        align: 'center',
                  },
                  {
                        title: '收件人联系电话',
                        dataIndex: 'receiverPhone',
                        align: 'center',
                  },
                  {
                        title: '收件人联系手机',
                        dataIndex: 'receiverMobile',
                        align: 'center',
                  },
                  {
                        title: '收件区域',
                        dataIndex: 'receiverRegion',
                        align: 'center',
                        render: (text) => <span>{isJSON(text) ? JSON.parse(text).label : ''}</span>,
                  },
                  {
                        title: '收件地址',
                        dataIndex: 'receiverAddress',
                        align: 'center',
                  },
                  {
                        title: '商品买点',
                        dataIndex: 'buyingPoint',
                        align: 'center',
                        render: val => <Ellipsis length={10} tooltip >{val}</Ellipsis>,
                  },
                  {
                        title: '是否需要发票',
                        dataIndex: 'needInvoice',
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
