
import React, { PureComponent } from 'react';
import { Table, Modal, Button, Badge, Divider, Popover } from 'antd';
import { isEmpty, getTrees } from '@/utils/utils'
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
                        title: '品牌中文名称',
                        dataIndex: 'brandName',
                        align: 'center',
                  },
                  {
                        title: '品牌英文名称',
                        dataIndex: 'brandEnName',
                        align: 'center',
                  },
                  {
                        title: '头像',
                        dataIndex: 'brandLogo',
                        render: (text) => text ? <a onClick={e => this.previewImage(text)}><img height={40} src={IMGURL + text} style={{ borderRadius: '5%' }} /></a> : <div style={{ height: '40px' }}></div>,
                        align: 'center',
                  },
                  {
                        title: '品牌官网地址',
                        dataIndex: 'brandUrl',
                        align: 'center',
                        render: val => <a href={val} target="_blank">{val}</a>,
                  },
                  {
                        title: '品牌故事',
                        dataIndex: 'brandDesc',
                        align: 'center',
                        render: val => <Ellipsis length={30} tooltip >{val}</Ellipsis>,
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
