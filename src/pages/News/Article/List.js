
import React, { PureComponent } from 'react';
import { Table, Modal, Button, Badge, Divider } from 'antd';
import moment from 'moment';
import { isEmpty } from '@/utils/utils'
import Ellipsis from '@/components/Ellipsis'
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

      //预览
      preview = (record) => {
            if (window.previewWindow) {
                  window.previewWindow.close()
            }
            window.previewWindow = window.open()
            window.previewWindow.document.write(this.buildPreviewHtml(record))
            window.previewWindow.document.close()
      }
      buildPreviewHtml(record) {
            return `
              <!Doctype html>
              <html>
                <head>
                  <title>Preview Content</title>
                  <style>
                    html,body{
                      height: 100%;
                      margin: 0;
                      padding: 0;
                      overflow: auto;
                      background-color: #f1f2f3;
                    }
                    .container{
                      box-sizing: border-box;
                      width: 1000px;
                      max-width: 100%;
                      min-height: 100%;
                      margin: 0 auto;
                      padding: 30px 20px;
                      overflow: hidden;
                      background-color: #fff;
                      border-right: solid 1px #eee;
                      border-left: solid 1px #eee;
                    }
                    .container img,
                    .container audio,
                    .container video{
                      max-width: 100%;
                      height: auto;
                    }
                    .container p{
                      white-space: pre-wrap;
                      min-height: 1em;
                    }
                    .container pre{
                      padding: 15px;
                      background-color: #f1f1f1;
                      border-radius: 5px;
                    }
                    .container blockquote{
                      margin: 0;
                      padding: 15px;
                      background-color: #f1f1f1;
                      border-left: 3px solid #d1d1d1;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                  <div style='text-align: center' >${record.name}</div>
                  ${record.details}
                  </div>
                </body>
              </html>
            `
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

            function associatedType(type) {
                  if (type === 'superAdmin') {
                        return <Badge status="processing" text="管理员" />
                  } else if (type === 'tenant') {
                        return <Badge status="processing" text="租户" />
                  } else if (type === 'employee') {
                        return <Badge status="processing" text="雇员" />
                  } else if (type === 'supplier') {
                        return <Badge status="processing" text="供应商" />
                  }
            }

            const columns = [

                  {
                        title: '分类',
                        dataIndex: 'categoryName',
                        align: 'center',
                  },
                  {
                        title: '标题',
                        dataIndex: 'name',
                        align: 'center',
                  },
                  {
                        title: '图片',
                        dataIndex: 'logo',
                        width: 70,
                        render: (text) => text ? <img height={60} src={IMGURL + text} style={{ borderRadius: '5%' }} /> : <div style={{ height: '60px' }}></div>,
                        align: 'center',
                  },
                  {
                        title: '作者',
                        dataIndex: 'author',
                        align: 'center',
                  },
                  {
                        title: '来源',
                        dataIndex: 'newsSource',
                        align: 'center',
                  },
                  {
                        title: '编辑',
                        dataIndex: 'newsEditor',
                        align: 'center',
                  },
                  {
                        title: '发布时间',
                        dataIndex: 'createTime',
                        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
                        align: 'center',
                  },
                  {
                        title: '简介',
                        dataIndex: 'description',
                        render: val => <Ellipsis length={20} tooltip >{val}</Ellipsis>,
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
                                    <a onClick={e => this.preview(record)}>预览</a>
                                    <Divider type="vertical" />
                                    <a onClick={e => onEditItem(record, e)}>编辑</a>
                                    <Divider type="vertical" />
                                    <a onClick={e => onDelete(record, e)}>删除</a>
                              </div>
                        ),
                        fixed: 'right',
                        align: 'center',
                        width: 180,
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
