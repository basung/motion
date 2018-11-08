import React from 'react'
import { Form, Input, InputNumber, Radio, Modal, message, Select, Table, Tree, Divider, Row, Col } from 'antd'
import Regions from '@/utils/regions'
import { isEmpty } from '@/utils/utils'
import Styles from './Index.less';

const FormItem = Form.Item
const { TextArea } = Input;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const optionsRegions = Regions.regions.data;


const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } }
const carriageListLayout = { labelCol: { span: 2 }, wrapperCol: { span: 21 } }

class modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			text: '',
			count: 1,
			regionsModalVisible: false,
			checkedKeys: [],
			checkedRegions: [],
			// key: '',
		}
	}

	componentDidMount() {
		let type = this.props.type
		let items = this.props.item.carriageTemplates
		if (type === 'create') {
			const data = [
				{
					key: 0,
					text: ('全国默认地区'),
					checkedKeys: [],
					regions: [],
					firstWeight: 1,
					firstPrice: 0,
					additionalWeight: 0,
					additionalPrice: 0,
					isDefault: 1,
				}
			];
			this.setState({ data: data })
		} else {
			if (!isEmpty(items) && items.length > 0) {
				const data = []
				for (let i = 0; i < items.length; i++) {
					let text = []
					let checkedKeys = []
					if (items[i].isDefault == 1) {
						text = '全国默认地区'
					} else {
						if (!isEmpty(items[i].regions) && items[i].regions.length > 0) {
							for (let j = 0; j < items[i].regions.length; j++) {
								text.push(<span key={items[i].regions[j].regionCode}>{items[i].regions[j].regionName}<Divider type="vertical" /></span>)
								checkedKeys.push(items[i].regions[j].regionCode)
							}
						}
					}
					let item = {
						key: items[i].id,
						text: text,
						checkedKeys: checkedKeys,
						regions: items[i].regions,
						firstWeight: items[i].firstWeight,
						firstPrice: items[i].firstPrice,
						additionalWeight: items[i].additionalWeight,
						additionalPrice: items[i].additionalPrice,
						isDefault: items[i].isDefault,
					}
					data.push(item)
				}
				this.setState({ data: data })
			}
		}
	}

	regionsModal = (key) => {
		this.setState({ regionsModalVisible: true, key: key })
	}

	handleOk = () => {
		this.setState({ regionsModalVisible: false })
	}

	handleCancel = () => {
		this.setState({ regionsModalVisible: false })
	}

	renderTreeNodes = (data) => {
		return data.map((item) => {
			if (item.children) {
				return (
					<TreeNode title={item.label} key={item.id} dataRef={item}>
						{this.renderTreeNodesChildren(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode {...item} />;
		});
	}
	renderTreeNodesChildren = (data) => {
		return data.map((item) => {
			return <TreeNode title={item.label} key={item.id} />;
		});
	}

	onCheck = (checkedKeys, info) => {

		const newData = [...this.state.data];
		const target = newData.filter(item => this.state.key === item.key)[0];   //获取当前行数据

		let checkedRegions = []
		if (!isEmpty(info.checkedNodes) && info.checkedNodes.length > 0) {
			let checkedNodes = info.checkedNodes

			for (let i = 0; i < checkedNodes.length; i++) {
				let checkedRegion = {
					regionCode: checkedNodes[i].key,
					regionName: checkedNodes[i].props.title
				}
				checkedRegions.push(checkedRegion)
			}
		}
		let text = []
		if (!isEmpty(checkedRegions) && checkedRegions.length > 0) {
			for (let i = 0; i < checkedRegions.length; i++) {
				text.push(
					<span key={checkedRegions[i].regionCode}>{checkedRegions[i].regionName}<Divider type="vertical" /></span>
				)
			}
		}
		target.checkedKeys = checkedKeys
		target.regions = checkedRegions
		target.text = text
		this.setState({ checkedKeys: checkedKeys, checkedRegions: checkedRegions, text: text, data: newData }, () => {
			// console.info('this.state.data ===', JSON.stringify(this.state.data))
		});
	}

	/**
       * 
       * @param {string} value      输入的当前值
       * @param {string} skuId        当前行的skuId
       * @param {string} column     当前列的名称
       * 
       */
	handleChange(value, record, column) {

		const newData = [...this.state.data];
		const target = newData.filter(item => record.key === item.key)[0];   //获取当前行数据
		if (target) {
			target[column] = value;
		}
		this.setState({ data: newData })
	}

	create = (key) => {
		const { count, data } = this.state;
		const newData = {
			key: this.state.count.toString(),
			text: [],
			checkedKeys: [],
			regions: [],
			firstWeight: 1,
			firstPrice: 0,
			additionalWeight: 0,
			additionalPrice: 0,
		};
		this.setState({
			data: [...data, newData],
			count: count + 1,
		});
	}

	onDelete = (key) => {
		const dataSource = [...this.state.data];
		if (dataSource.length > 1) {
			this.setState({ data: dataSource.filter(item => key !== item.key) });
		} else {
			message.error(`至少录入一个运费模版。`);
		}

	}

	handleOkSubmit = () => {
		this.props.form.validateFields((errors) => {
			if (errors) {
				return
			}

			const { companyData } = this.props
			const tempData = { ...this.props.form.getFieldsValue() };
			const carriageTemplates = this.state.data.filter(item => item.text.length != 0)

			//物流公司数据处理
			let company = companyData.filter(item => item.id == tempData.companyId)[0]
			if (company) {
				tempData.companyName = company.name
			}

			const data = {
				...tempData,
				carriageTemplates: carriageTemplates,
				isActive: Number(tempData.isActive),
				version: this.props.item ? this.props.item.version : 0,
			}
			this.props.onOk(data)
		})
	}

	render() {
		const { visible, type, item = {}, companyData, onOk, onCancel, form: { getFieldDecorator } } = this.props

		const modalOpts = {
			title: `${type === 'create' ? '新增运费模版' : '编辑运费模版'}`,
			visible,
			onOk: this.handleOkSubmit,
			onCancel,
			wrapClassName: "vertical-center-modal",
			width: 1000,
			destroyOnClose: true,
			maskClosable: false,
		}

		//物流公司数据处理
		const companyChild = [];
		if (!isEmpty(companyData) && companyData.length > 0) {
			for (let index = 0; index < companyData.length; index++) {
				companyChild.push(<Option key={companyData[index].id}>{companyData[index].name}</Option>);
			}
		}

		const regionsModal = (
			<Modal
				title="区域选择"
				visible={this.state.regionsModalVisible}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
				style={{ height: 500 }}
			>
				<Tree
					checkable
					onCheck={this.onCheck}
					checkedKeys={this.state.data.filter(item => this.state.key === item.key)[0] ? this.state.data.filter(item => this.state.key === item.key)[0].checkedKeys : []}
				>
					{this.renderTreeNodes(optionsRegions)}
				</Tree>
			</Modal>
		)

		const columns = [
			{
				title: '操作',
				align: 'center',
				width: 100,
				key: Math.random(),
				render: (text, record) => {
					return (record.text !== '全国默认地区') ? (
						<div>
							<a onClick={e => this.create(record.key)} style={{ border: 0, marginRight: 10 }}>
								<span className={Styles.custom_theme}>添加</span>
							</a>
							<a onClick={e => this.onDelete(record.key)} style={{ border: 0, marginRight: 10 }}>
								<span className={Styles.custom_theme}>删除</span>
							</a>
						</div>
					) : (<div>
						<a onClick={e => this.create(record.key)}>
							<span className={Styles.custom_theme}>添加</span>
						</a></div>)
				}

			}, {
				title: '配送区域',
				dataIndex: 'regions',
				render: (text, record) => {
					return (
						<div>
							{record.text}
							&nbsp;
							{(record.text !== '全国默认地区') ? (<span style={{ display: 'inline-block', textAlign: 'right' }}>
								<a onClick={e => this.regionsModal(record.key)} >选择区域</a>
							</span>) : (<span></span>)}

						</div>
					)
				}
			}, {
				title: '首重(KG)',
				dataIndex: 'firstWeight',
				align: 'center',
				width: 100,
				render: (text, record) => { return <InputNumber min={0} max={99999} style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e, record, 'firstWeight')} /> },
			}, {
				title: '首费(¥)',
				dataIndex: 'firstPrice',
				align: 'center',
				width: 100,
				render: (text, record) => { return <InputNumber min={0} max={99999} style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e, record, 'firstPrice')} /> },
			}, {
				title: '续重(KG)',
				dataIndex: 'additionalWeight',
				align: 'center',
				width: 100,
				render: (text, record) => { return <InputNumber min={0} max={99999} style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e, record, 'additionalWeight')} /> },
			}, {
				title: '续费(¥)',
				dataIndex: 'additionalPrice',
				align: 'center',
				width: 100,
				render: (text, record) => { return <InputNumber min={0} max={99999} style={{ margin: '-5px 0', width: '90%' }} value={text} onChange={e => this.handleChange(e, record, 'additionalPrice')} /> },
			}
		];


		return (
			<Modal {...modalOpts}>
				<Form>
					<Row>
						<Col xl={{ span: 12 }}>
							<FormItem label="模版名称:"   {...formItemLayout}>
								{getFieldDecorator('name', {
									initialValue: item.name,
									rules: [
										{
											required: true,
											message: '模版名称不能为空',
										},
									],
								})(<Input placeholder="长度<64,必填" maxLength={64} />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="计费类型:"   {...formItemLayout}>
								{getFieldDecorator('chargingType', {
									initialValue: item ? item.chargingType : 'piece',
									rules: [
										{
											required: true,
											message: '请选择计费类型'
										}
									]
								})(<Select onChange={this.onChange}>
									<Option value="piece">按件计费</Option>
									<Option value="weight">按重计费</Option>
								</Select>)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="配送方式:"   {...formItemLayout}>
								{getFieldDecorator('companyId', {
									initialValue: item ? item.companyId : '',
									rules: [
										{
											required: true,
											message: '请选择配送方式'
										}
									]
								})(<Select onChange={this.onChange}>
									{companyChild}
								</Select>)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="状态" {...formItemLayout}>
								{getFieldDecorator('isActive', {
									initialValue: item ? Boolean(item.isActive) : true,
								})(
									<Radio.Group>
										<Radio value>启用</Radio>
										<Radio value={false}>禁用</Radio>
									</Radio.Group>
								)}
							</FormItem>
						</Col>
						<Col xl={{ span: 24 }}>
							<FormItem label="描述"   {...carriageListLayout}>
								{getFieldDecorator('carriageDesc', {
									initialValue: item ? item.carriageDesc : '',
								})(<TextArea rows={2} />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 24 }}>
							<FormItem label="运费设置:"  {...carriageListLayout}>
								<Table bordered dataSource={this.state.data} columns={columns} pagination={false} rowKey={record => record.key} />
							</FormItem>
						</Col>
					</Row>
				</Form>
				{regionsModal}
			</Modal>
		)
	}
}
export default Form.create()(modal)
