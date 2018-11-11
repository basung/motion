import React from 'react'
import { Form, Input, Card, Select, Table, List, Avatar } from 'antd'
import Styles from '../Index.less';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'

@Form.create()
export default class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: props.value, //SKU的ID
			selectedRows: [], //SKU的明细
                  onSkuChange: props.onSkuChange,
                  totalFee: 0, //订单总费用
		}
	}

      rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                  
                  let totalFee = 0;
                  for(let index = 0; index < selectedRows.length; index ++){
                        totalFee += selectedRows[index].salePrice
                  }
                  this.setState({ selectedRowKeys, selectedRows, totalFee }, () => {
				this.state.onSkuChange(selectedRows)
			})
            }
      }

      render() {
            const { skuData } = this.props;

		// console.info('skuData ===', JSON.stringify(skuData))
		
		const { selectedRows, selectedRowKeys, totalFee } = this.state

            const columns = [{
                        title: '商品图片',
                        dataIndex: 'skuImage',
                        align: 'center',
                        render: (text) => text ? <a onClick={e => this.previewImage(text)}><img height={40} src={IMGURL + text} style={{ borderRadius: '5%' }} /></a> : <div style={{ height: '40px' }}></div>
                  },
                  {
                        title: '商品名称',
                        dataIndex: 'goodsName',
                        align: 'center',
                  },
                  {
                        title: 'SKU名称',
                        dataIndex: 'skuName',
                        align: 'center',
                  },
                  {
                        title: '规格',
                        dataIndex: 'skuSpec',
                        align: 'center',
                  },
                  {
                        title: '销售价格',
                        dataIndex: 'marketPrice',
                        align: 'center',
                  },
                  {
                        title: '市场价',
                        dataIndex: 'categoryName',
                        align: 'center',
                  },
                  {
                        title: '成本价',
                        dataIndex: 'costPrice',
                        align: 'center',
                  },
                  {
                        title: '商品库存',
                        dataIndex: 'stockNum',
                        align: 'center',
                  },
                  {
                        title: '生产编码',
                        dataIndex: 'productCode',
                        align: 'center',
                  },
                  {
                        title: '商品条码',
                        dataIndex: 'barCode',
                        align: 'center',
                  }]

            return (
                  <Card bordered={false} title={'选择要购买的商品'}>
				<List
					header={<div>您选择的商品</div>}
					footer={<div>商品总价: <span style={{color: 'red'}}> $ {totalFee}</span></div>}
					bordered
					dataSource={selectedRows}
					renderItem={item => (<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={IMGURL + item.skuImage} />}
							title={<a href="">{item.skuName} &nbsp; &nbsp; {'价格:' + item.salePrice} &nbsp; &nbsp; {'商品分类: ' + item.categoryName } &nbsp; &nbsp; {'商品品牌: ' + item.brandName }</a>}
							description={'商品规格:' + item.skuSpec}
							/>
					</List.Item>)}
				/>
				<h3 style={{ margin: '16px 0' }}>请在商品库中选择您需要购买的商品</h3>
                        <Table
                              className={Styles.table}
                              scroll={{ x: true }}
                              rowKey={record => record.id}
                              dataSource={skuData}
                              columns={columns}
                              rowSelection={this.rowSelection}
                              bordered
                        />
                  </Card>
            )

      }
}
