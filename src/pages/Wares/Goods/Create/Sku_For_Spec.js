
import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, Popconfirm, Button, InputNumber, Upload, Icon } from 'antd';
import Styles from '../Index.less';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { generateUUID, getLocalStorageEnhance, beforeUpload, getBase64, isJSON } from '@/utils/Index'


class EditableTable extends React.Component {
      constructor(props) {
            super(props);
            /**
             * loading  图片上传加载动画标志
             * data     sku列表数据
             */
            this.state = { loading: false, data: props.skuList };
      }


      componentDidMount() {
            this.setState({ data: this.props.skuList })
      }

      componentWillUpdate(nextProps) {
            if (nextProps.skuList != this.props.skuList) {
                  this.setState({ data: nextProps.skuList })
            }
      }


      /**
       * 
       * @param {*} value     当前修改的cell值
       * @param {*} key       当前选中行的key     
       * @param {*} column    当前修改的cell所在列的名称
       * 
       */
      handleChange(value, key, column) {
            if (column == 'skuImage') {
                  if (value.file.status === 'uploading') {
                        this.setState({ uploading: true });
                        return;
                  }
                  if (value.file.status === 'done') {
                        let response = value.file ? value.file.response : false
                        if (response && response.status == 200) {
                              const { data } = this.state;
                              const target = data.filter(item => key === item.key)[0] //获取正在编辑的行
                              if (target) {
                                    target[column] = response.data.filePath;
                                    this.setState({ data: data, uploading: false }, () => {
                                          const { onChange } = this.props;
                                          onChange(data);
                                    });
                              }
                        }
                  }
            } else {
                  const { data } = this.state  //获取sku列表数据
                  const target = data.filter(item => key === item.key)[0] //获取正在编辑的行
                  if (target) {
                        target[column] = value;
                        this.setState({ data: data }, () => {
                              const { onChange } = this.props;
                              onChange(data);
                        });
                  }
            }
      }

      /**
       * 删除列表中的某一行
       * @param {*} key 
       */
      deleteSkuItem(key) {
            const { data } = this.state;
            const { onChange } = this.props;
            const newData = data.filter(item => item.key !== key);
            this.setState({ data: newData });
            onChange(newData);
      }

      render() {

            // console.info('this.props ===', JSON.stringify(this.props))

            const { data } = this.state

            // console.info('data ===', JSON.stringify(data))

            //生成列表columns数据
            const columns = [{
                  title: '主图',
                  dataIndex: 'skuImage',
                  width: '5%',
                  align: 'center',
                  render: (text, record) => {
                        return (
                              <Upload
                                    name="uploadFile"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    headers={{ Authorization: getLocalStorageEnhance('Authorization') }}
                                    showUploadList={false}
                                    action={IMGUPURL}
                                    beforeUpload={beforeUpload}
                                    onChange={e => this.handleChange(e, record.key, 'skuImage')}
                              >
                                    {text ? <img src={IMGURL + text} alt="avatar" width={'102px'} height={'102px'} /> : uploadButton}
                              </Upload>
                        )
                  },
            },
            {
                  title: 'SKU名称',
                  dataIndex: 'skuName',
                  align: 'center',
                  width: 120,
                  render: (text, record) => { return <Input style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e.target.value, record.key, 'skuName')} /> },
            },
            {
                  title: '销售价',
                  dataIndex: 'salePrice',
                  align: 'center',
                  width: 60,
                  render: (text, record) => { return <InputNumber style={{ margin: '-5px 0', width: '90%', border: '1px dashed red' }} value={text} onChange={e => this.handleChange(e, record.key, 'salePrice')} /> },
            },
            {
                  title: '市场价',
                  dataIndex: 'marketPrice',
                  align: 'center',
                  width: 60,
                  render: (text, record) => { return <InputNumber style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e, record.key, 'marketPrice')} /> },
            },
            {
                  title: '成本价',
                  dataIndex: 'costPrice',
                  align: 'center',
                  width: 60,
                  render: (text, record) => { return <InputNumber style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e, record.key, 'costPrice')} /> },
            },
            {
                  title: '库存',
                  dataIndex: 'stockNum',
                  align: 'center',
                  width: 60,
                  render: (text, record) => { return <InputNumber style={{ margin: '-5px 0', width: '90%', border: '1px dashed red' }} value={text} onChange={e => this.handleChange(e, record.key, 'stockNum')} /> },
            },
            {
                  title: '商品编码',
                  dataIndex: 'productCode',
                  align: 'center',
                  render: (text, record) => { return <Input style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e.target.value, record.key, 'productCode')} /> },
                  width: 150,
            },
            {
                  title: '商品条码',
                  dataIndex: 'barCode',
                  align: 'center',
                  render: (text, record) => { return <Input style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e.target.value, record.key, 'barCode')} /> },
                  width: 150,
            },
            {
                  title: '商品规格',
                  dataIndex: 'skuSpec',
                  align: 'center',
                  render: (text, record) => {
                        let spec_Json = isJSON(text) ? JSON.parse(text) : {}
                        let spec_Str = ''
                        for (let index in spec_Json) {
                              spec_Str += index + ':' + spec_Json[index] + ';'
                        }
                        return spec_Str
                  },
                  width: 150,
            },
            {
                  title: '操作',
                  dataIndex: 'operation',
                  align: 'center',
                  width: 60,
                  render: (text, record) => {
                        return (
                              <div className="editable-row-operations">
                                    <a onClick={() => this.deleteSkuItem(record.key)}>删除</a>
                              </div>
                        );
                  },
            }
            ];
            const uploadButton = (
                  <div >
                        <Icon style={{ fontSize: 24, }} type={this.state.loading ? 'loading' : 'plus'} />
                        <div className="ant-upload-text"></div>
                  </div>
            );

            return (
                  <div className={Styles.editable} >
                        <Table bordered dataSource={data} rowKey={'ids'} columns={columns} pagination={false} />
                  </div>
            )
      }
}

export default EditableTable