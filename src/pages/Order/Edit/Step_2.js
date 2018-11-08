import React from 'react'
import { Form, Card, Select, Button, Alert, Checkbox, Table, message } from 'antd'
import { isEmpty, generateUUID, isJSON } from '@/utils/Index';
import isEqual from 'lodash/isEqual';
import Styles from '../Index.less';
import Sku_For_Spec from './Sku_For_Spec'
const Option = Select.Option;

//SKU数生成方法
function generateSKUTree(specArr_one, specArr_two) {
	if (!isEmpty(specArr_one) && specArr_one.length > 0 && !isEmpty(specArr_two) && specArr_two.specValueId.length > 0) {
		const skuList = []
		for (let i = 0; i < specArr_one.length; i++) {
			for (let j = 0; j < specArr_two.specValueId.length; j++) {
				let sku = {}
				sku = JSON.parse(JSON.stringify(specArr_one[i]))
				let key = specArr_two.specName
				let value = specArr_two.specValueId[j]
				sku[key] = value
				skuList.push(sku)
			}
		}
		return skuList
	} else return 0;
}

@Form.create()
export default class Index extends React.Component {

	state = {

		data: [],			//规格编辑列表数据
		specChildren: [],   	//规格值的下拉选择数据  specChildren.push(<Option key={specData[i].id}>{specData[i].specName}</Option>)
		specValue: {},		//规格值选择列表数据
		isMultiSpec: false,  	//是否开启规格

		//用于获取后端传来最新的规格数据
		newCurrentItem: {},
		specData: this.props.specData
	};

	//数据初始化
	componentDidMount() {
		//回调函数
		this.props.onGetStepTwoContent(this)

		//设置规格Select数据源
		const specChildren = [];
		const specData = this.props.specData;
		if (!isEmpty(specData) && specData.length > 0) {
			for (let i = 0; i < specData.length; i++) {
				specChildren.push(<Option key={specData[i].id}>{specData[i].specName}</Option>);
			}
		}
		this.setState({ specChildren: specChildren })
	}

	//设置回调函数
	getEditorContent = () => {
		let skuData = this.handleSubmit()
		return skuData
	}

	// 1、商品多规格设置
	isMultiSpecChange = (e) => {
		this.setState({ isMultiSpec: e.target.checked })
	}

	//2、设置规格Select数据源
	static getDerivedStateFromProps(nextProps, preState) {
		if (isEqual(nextProps.specData, preState.specData)) {
			if (isEqual(nextProps.currentItem, preState.newCurrentItem)) {
				return null
			} else {
				let { currentItem } = nextProps
				let specData = nextProps.specData;
				let skuList = currentItem.goodsSkuList;
				let data = isJSON(currentItem.goodsSpec) ? JSON.parse(currentItem.goodsSpec) : [];  // 已选规格数据
				let specValue = {}
				if (!isEmpty(skuList) && skuList.length > 0) {
					for (let index = 0; index < skuList.length; index++) {
						skuList[index].key = skuList[index].id
					}
				}
				//更新规格名select数据,让已选择的规格项失效
				let disabledId = [];
				if (!isEmpty(data) && data.length > 0) {
					for (let i = 0; i < data.length; i++) {
						if (!isEmpty(data[i].specId)) {
							disabledId.push(data[i].specId)
						}
					}
				}
				const specChildren = [];
				if (!isEmpty(specData) && specData.length > 0) {
					for (let i = 0; i < specData.length; i++) {
						const target = disabledId.filter(item => specData[i].id === item)[0];
						if (!isEmpty(target)) {
							specChildren.push(<Option disabled={true} key={specData[i].id}>{specData[i].specName}</Option>);
						} else {
							specChildren.push(<Option disabled={false} key={specData[i].id}>{specData[i].specName}</Option>);
						}
					}
				}
				//更新选择的规则项的规格值数据
				if (!isEmpty(specData) && specData.length > 0 && !isEmpty(data) && data.length > 0) {
					for (let index = 0; index < data.length; index++) {
						let specItem = specData.filter(item => data[index].key === item.id)[0];
						if (!isEmpty(specItem) && !isEmpty(specItem.specItems) && specItem.specItems.length > 0) {
							let specItems = specItem.specItems
							const specValueChildren = [];
							for (let i = 0; i < specItems.length; i++) {
								specValueChildren.push(<Option key={specItems[i].specValue}>{specItems[i].specValue}</Option>);
							}
							specValue[data[index].key] = specValueChildren
						}
					}
				}
				return {
					isMultiSpec: currentItem.specType === 3 ? true : false,
					data: data,
					specValue: specValue,
					specChildren: specChildren,
					skuList: skuList,
					newCurrentItem: currentItem,
				};
			}
		} else {
			const specData = nextProps.specData;
			if (isEqual(nextProps.currentItem, preState.newCurrentItem)) {
				let data = isJSON(nextProps.currentItem.goodsSpec) ? JSON.parse(nextProps.currentItem.goodsSpec) : [];  // 已选规格数据
				//更新规格名select数据,让已选择的规格项失效
				let disabledId = [];
				if (!isEmpty(data) && data.length > 0) {
					for (let i = 0; i < data.length; i++) {
						if (!isEmpty(data[i].specId)) {
							disabledId.push(data[i].specId)
						}
					}
				}
				const specChildren = [];
				if (!isEmpty(specData) && specData.length > 0) {
					for (let i = 0; i < specData.length; i++) {
						const target = disabledId.filter(item => specData[i].id === item)[0];
						if (!isEmpty(target)) {
							specChildren.push(<Option disabled={true} key={specData[i].id}>{specData[i].specName}</Option>);
						} else {
							specChildren.push(<Option disabled={false} key={specData[i].id}>{specData[i].specName}</Option>);
						}
					}
				}
				return {
					specData: nextProps.specData,
					specChildren: specChildren
				};
			} else {
				let { currentItem } = nextProps
				let skuList = currentItem.goodsSkuList;
				let data = isJSON(currentItem.goodsSpec) ? JSON.parse(currentItem.goodsSpec) : [];  // 已选规格数据
				let specValue = {}
				if (!isEmpty(skuList) && skuList.length > 0) {
					for (let index = 0; index < skuList.length; index++) {
						skuList[index].key = skuList[index].id
					}
				}
				//更新规格名select数据,让已选择的规格项失效
				let disabledId = [];
				if (!isEmpty(data) && data.length > 0) {
					for (let i = 0; i < data.length; i++) {
						if (!isEmpty(data[i].specId)) {
							disabledId.push(data[i].specId)
						}
					}
				}
				const specChildren = [];
				if (!isEmpty(specData) && specData.length > 0) {
					for (let i = 0; i < specData.length; i++) {
						const target = disabledId.filter(item => specData[i].id === item)[0];
						if (!isEmpty(target)) {
							specChildren.push(<Option disabled={true} key={specData[i].id}>{specData[i].specName}</Option>);
						} else {
							specChildren.push(<Option disabled={false} key={specData[i].id}>{specData[i].specName}</Option>);
						}
					}
				}
				//更新选择的规则项的规格值数据
				if (!isEmpty(specData) && specData.length > 0 && !isEmpty(data) && data.length > 0) {
					for (let index = 0; index < data.length; index++) {
						let specItem = specData.filter(item => data[index].key === item.id)[0];
						if (!isEmpty(specItem) && !isEmpty(specItem.specItems) && specItem.specItems.length > 0) {
							let specItems = specItem.specItems
							const specValueChildren = [];
							for (let i = 0; i < specItems.length; i++) {
								specValueChildren.push(<Option key={specItems[i].specValue}>{specItems[i].specValue}</Option>);
							}
							specValue[data[index].key] = specValueChildren
						}
					}
				}
				return {
					isMultiSpec: currentItem.specType === 3 ? true : false,
					data: data,
					specValue: specValue,
					skuList: skuList,
					newCurrentItem: currentItem,
					specData: nextProps.specData,
					specChildren: specChildren
				};
			}
		}
	}

	//3、添加规格数据
	create = () => {
		const newData = [...this.state.data];
		let createItem = { key: (new Date()).valueOf(), specId: '', specName: '', specValueId: [] }
		newData.push(createItem);
		this.setState({ data: newData })
	}

	//4、规格列表触发的onChange事件
	handleChange(value, key, column) {

		const newData = [...this.state.data];   				//规格编辑列表数据
		const specData = [...this.props.specData];			//后台返回的规格数据
		const target = newData.filter(item => key === item.key)[0];	//获取正在编辑的行
		const specValue = { ...this.state.specValue }

		if (target) {
			if (column == 'specId') {
				const specItem = specData.filter(item => value === item.id)[0];
				if (specItem) {
					target[column] = value;
					target['key'] = value;
					target['specName'] = specItem.specName

					//更新规格名select数据,让已选择的规格项失效
					let disabledId = [];
					for (let i = 0; i < newData.length; i++) {
						if (!isEmpty(newData[i].specId)) {
							disabledId.push(newData[i].specId)
						}
					}
					const specChildren = [];
					if (!isEmpty(specData) && specData.length > 0) {
						for (let i = 0; i < specData.length; i++) {
							const target = disabledId.filter(item => specData[i].id === item)[0];
							if (!isEmpty(target)) {
								specChildren.push(<Option disabled={true} key={specData[i].id}>{specData[i].specName}</Option>);
							} else {
								specChildren.push(<Option disabled={false} key={specData[i].id}>{specData[i].specName}</Option>);
							}
						}
					}

					//更新选择的规则项的规格值数据
					if (!isEmpty(specItem.specItems) && specItem.specItems.length > 0) {
						let specItems = specItem.specItems
						const specValueChildren = [];
						for (let i = 0; i < specItems.length; i++) {
							specValueChildren.push(<Option key={specItems[i].specValue}>{specItems[i].specValue}</Option>);
						}
						specValue[value] = specValueChildren
					}
					this.setState({ specValue: specValue, data: newData, specChildren: specChildren }, () => { })

				}
			} else if (column == 'specValueId') {
				target[column] = value
				this.setState({ data: newData }, () => {
					//根据选择的规格生成SKU
					let skuList = this.generateSKU(newData)
					this.setState({ skuList: skuList })
				})
			}
		}
	}


	//根据选择的规格生成SKU
	//newData数据格式:  [{"key":"acb9f74e-43bf-4f32-b844-aa215512ff4e","specId":"acb9f74e-43bf-4f32-b844-aa215512ff4e","specName":"尺码","specValueId":["12寸","14寸"]},{"key":"a5c7bfb8-973e-47eb-892d-5e6058d8d8a0","specId":"a5c7bfb8-973e-47eb-892d-5e6058d8d8a0","specName":"颜色","specValueId":["红色","黑色"]}]
	generateSKU = (newData) => {
		let skuList = [];
		if (!isEmpty(newData) && newData.length > 0) {
			let depth = newData.length;
			if (!isEmpty(newData[0].specName) && newData[0].specValueId.length > 0) {
				for (let i = 0; i < newData[0].specValueId.length; i++) {
					let sku = {}
					let key = newData[0].specName;
					let value = newData[0].specValueId[i]
					sku[key] = value
					skuList.push(sku);
				}
			}
			for (let i = 1; i < depth; i++) {
				skuList = generateSKUTree(skuList, newData[i])
			}
		}
		//当前sku数据结构
		// [{"内存大小":"256G","尺码":"11寸"},{"内存大小":"1028G","尺码":"11寸"}]
		if (!isEmpty(skuList) && skuList.length > 0) {
			for (let i = 0; i < skuList.length; i++) {
				let skuSpec = JSON.stringify(skuList[i])
				skuList[i].skuSpec = skuSpec
			}
		}
		if (skuList != 0 && !isEmpty(skuList)) {
			for (let i = 0; i < skuList.length; i++) {
				skuList[i].key = 'SKU' + generateUUID();
				skuList[i].salePrice = '';
				skuList[i].marketPrice = '';
				skuList[i].costPrice = '';
				skuList[i].skuImage = '';
				skuList[i].skuName = '';
				skuList[i].skuUnit = '';
				skuList[i].stockNum = '';
				skuList[i].productCode = 'SKU' + generateUUID();
				skuList[i].barCode = '';
			}
		}
		return skuList
	}

	//5、 删除规格
	delete(key) {
		const newData = [...this.state.data];
		const specData = [...this.props.specData];
		if (!isEmpty(newData) && newData.length > 0) {
			for (let i = 0; i < newData.length; i++) {
				if (key == newData[i].key) {
					newData.splice(i, 1)
				}
			}
		}
		this.setState({ data: newData }, () => {
			//1、更新规格名select数据
			let disabledId = [];
			for (let i = 0; i < newData.length; i++) {
				if (!isEmpty(newData[i].specId)) {
					disabledId.push(newData[i].specId)
				}
			}
			const specChildren = [];
			if (!isEmpty(specData) && specData.length > 0) {
				for (let i = 0; i < specData.length; i++) {
					const target = disabledId.filter(item => specData[i].id === item)[0];
					if (!isEmpty(target)) {
						specChildren.push(<Option disabled={true} key={specData[i].id}>{specData[i].specName}</Option>);
					} else {
						specChildren.push(<Option disabled={false} key={specData[i].id}>{specData[i].specName}</Option>);
					}

				}
			}

			//2、根据选择的规格生成新的SKU
			let skuList = this.generateSKU(newData)

			//3、保存数据
			this.setState({ specChildren: specChildren, skuList: skuList })
		});
	}

	//6、 数据提交
	handleSubmit = () => {
		const { form } = this.props;
		let skuData = {}
		form.validateFieldsAndScroll((err, values) => {
			console.info('err ==', err)
			console.info('values ==', values)
			if (!err) {
				if (this.state.isMultiSpec) {
					if (values.skuList) {
						skuData = {
							goodsSpec: JSON.stringify(this.state.data),
							goodsSkuList: [...values.skuList],
							specType: 3
						}
					} else {
						skuData = { errors: true }
						message.error(' 请完善商品SKU数据!!! ')
					}
				} else {
					skuData = {
						goodsSpec: JSON.stringify(this.state.data),
						goodsSkuList: [],
						specType: 1
					}
				}
			}
		});
		console.info('skuData ==spec and sku data==', JSON.stringify(skuData))
		return skuData
	}

	render() {
		const { form: { getFieldDecorator } } = this.props;

		const { skuList, specChildren, specValue } = this.state

		//设置规格列表Columns数据
		const columns = [
			{
				title: '规格名',
				dataIndex: 'specId',
				width: '20%',
				render: (text, record) => {
					return (<Select style={{ width: '100%' }} defaultValue={text} onChange={e => this.handleChange(e, record.key, 'specId')} >{specChildren}</Select>);
				},
			}, {
				title: '规格值',
				dataIndex: 'specValueId',
				width: '70%',
				render: (text, record) => {
					return (<Select style={{ width: '100%' }} defaultValue={text} mode="tags" onChange={e => this.handleChange(e, record.key, 'specValueId')} >{specValue[record.key]}</Select>);
				},
			}, {
				title: '操作',
				dataIndex: 'operation',
				align: 'center',
				render: (text, record) => {
					return (
						<div className="editable-row-operations">
							<a onClick={() => this.delete(record.key)}>删除</a>
						</div>
					);
				},
			}
		];

		const skuListProps = {
			skuList: skuList
		}

		//已开启规格
		const isShowSpec = (
			<Form onSubmit={this.handleSubmit} >
				<Table bordered dataSource={this.state.data} columns={columns} pagination={false} />
				<div style={{ backgroundColor: '#eff1f8', height: 40, paddingLeft: 10, paddingTop: 10 }}>
					<span>商品SKU</span>
					<span style={{ color: '#dab187', marginLeft: '20px' }}>建议图片上传尺寸120*120像素。</span>
				</div>
				{getFieldDecorator('skuList', {
					initialValue: skuList,
				})(<Sku_For_Spec {...skuListProps} />)}
			</Form>
		)

		return (
			<Card bordered={false} className={Styles.card}>
				{this.state.isMultiSpec ? '' : (<Alert message="在未开启商品多规格状态下,系统将自动根据商品信息生成一个通用规格SKU产品; 适用于单规格商品。" type="error" />)}
				<div style={{ backgroundColor: '#eff1f8', height: 50, paddingTop: 10, paddingLeft: 10, marginTop: 10 }}>
					<Checkbox onChange={this.isMultiSpecChange} checked={this.state.isMultiSpec} >设置商品多规格</Checkbox>
					<Button type="primary" icon="plus" onClick={this.create} disabled={!this.state.isMultiSpec}  >添加规格</Button>
					<span style={{ color: '#dab187', marginLeft: '20px' }}>开启商品多规格功能后, 通过设置商品规格, 可以为商品添加多个SKU。</span>
				</div>
				{this.state.isMultiSpec ? isShowSpec : ''}
			</Card>
		)

	}
}
