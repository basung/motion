import React, { Component, Fragment } from 'react';
import { Modal, Form, Select, Button, Table, Row, Col, Cascader, Input, Radio, Divider, Badge } from 'antd';
import { isJSON, isEmpty } from '@/utils/Index'
import Styles from '../Index.less'
import Regions from '@/utils/regions'
const FormItem = Form.Item
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
const optionsRegions = Regions.regions.data;
const confirm = Modal.confirm

@Form.create()
class MemberAddress extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visibleModal: false,
			editType: 'create',
			record: {},
			region: {},
		};
	}



	//地址事件触发按钮
	onAddressHandel = (editType, record) => {
		this.showModal(editType, record)
	}
	//修改地址弹出框方法
	showModal = (editType, record) => { this.setState({ visibleModal: true, editType: editType, record: record }); }
	handleOk = (e) => {

		const { item, type, onAdd, onEdit, form } = this.props

		const { region, editType, record } = this.state

		form.validateFieldsAndScroll((err, values)=> {
			if (!err) {
				
				values.region = !isEmpty(region.value) ? JSON.stringify(region) : record.region
				values.memberId = item.id
				if(editType === 'create'){
					onAdd(values)
				}
				if(editType === 'update'){
					values.version = record.version
					values.id = record.id
					onEdit(values)
				}
				this.setState({ visibleModal: false }); 
				
			}
		});

	}

	handleCancel = (e) => { this.setState({ visibleModal: false }); }


	onChangeNewPassword = (e) => {
		this.setState({ newPassword: e.target.value });
	}

	onChangeNewPassword_repeat = (e) => {
		this.setState({ newPassword_repeat: e.target.value });
	}

	//地区选择后的触发事件
	onChangeSelect = (value, selectedOptions) => {
		let region = { label: '', value: [] };
		for (let i = 0; i < selectedOptions.length; i++) {
			region.label += selectedOptions[i].label + '/';
			region.value.push(selectedOptions[i].value)
		}
		this.setState({ region },() => { })
	}

	render() {

		const { item, type, memberAddressData, onAdd, onEdit, onDelete, form: { getFieldDecorator } } = this.props;

		const { visibleModal, record, editType } = this.state

		const onDeleteItem = (record) => {
                  confirm({
                        title: '您确定要删除这条记录吗?',
                        okText: '确定',
                        cancelText: '取消',
                        onOk() {
                              onDelete(record)
                        },
                  })
            }

		const columns = [
			{
				title: '收货人',
				dataIndex: 'receiver',
				align: 'center',
			},
			{
				title: '收货人电话',
				dataIndex: 'telephone',
				align: 'center',
			},
			{
				title: '收货人手机',
				dataIndex: 'mobile',
				align: 'center',
			},
			{
				title: '收件地区',
				dataIndex: 'region',
				align: 'center',
				render: (text) => <span>{isJSON(text) ? JSON.parse(text).label : ''}</span>,
			},
			{
				title: '收件详细地址',
				dataIndex: 'address',
				align: 'center',
			},
			{
				title: '邮编',
				dataIndex: 'zip',
				align: 'center',
			},
			{
                        title: '是否是默认地址',
                        dataIndex: 'isMain',
                        render: (text) => <span>{text
                              ? <Badge status="success" text="是" />
                              : <Badge status="warning" text="否" />}</span>,
                        align: 'center',
                  },
			{
				title: '操作',
				render: (record) => (
					<div>
						<a onClick={e => this.onAddressHandel('update', record)}>编辑</a>
						<Divider type="vertical" />
						<a onClick={e => onDeleteItem(record, e)}>删除</a>
					</div>
				),
				fixed: 'right',
				align: 'center',
				width: 120,
			},
		];

		const passwordModal = (<Modal
			width={1000}
			title="收件地址"
			visible={this.state.visibleModal}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
		>
			<Form>
				<Row>
					<Col xl={{ span: 12 }}>
						<FormItem label="收件人:"   {...formItemLayout}>
							{getFieldDecorator('receiver', {
								initialValue: record.receiver,
								rules: [
									{
										required: true,
										message: '收件人不能为空',
									},
								],
							})(<Input placeholder="长度<64,必填" maxLength={64} />)}
						</FormItem>
					</Col>
					<Col xl={{ span: 12 }}>
						<FormItem {...formItemLayout} label="手机号" >
							{getFieldDecorator('mobile', {
								initialValue: (type === 'create') ? '' : record.mobile,
								rules: [
									{
										required: true,
										message: '手机号不能为空',
									},
								],
							})(<Input placeholder="用户手机号" />)}
						</FormItem>
					</Col>
					<Col xl={{ span: 12 }}>
						<FormItem {...formItemLayout} label="电话" >
							{getFieldDecorator('telephone', {
								initialValue: (type === 'create') ? '' : record.telephone,
								rules: [
									{
										required: true,
										message: '请输入电话',
									},
								],
							})(<Input placeholder="用户电话号码" />)}
						</FormItem>
					</Col>
					<Col xl={{ span: 12 }}>
						<FormItem label="收件地区:"   {...formItemLayout}>
							{getFieldDecorator('region', {
								initialValue: (editType === 'update' ? (isJSON(record.region) ? JSON.parse(record.region).value : '') : ''),
								rules: [
									{
										required: true,
										message: '收件地区不能为空',
									},
								],
							})(<Cascader options={optionsRegions} onChange={this.onChangeSelect} placeholder="请选择地区" />)}
						</FormItem>
					</Col>
					<Col xl={{ span: 12 }}>
						<FormItem label="收件详细地址:"   {...formItemLayout}>
							{getFieldDecorator('address', {
								initialValue: record.address,
								rules: [
									{
										required: true,
										message: '收件详细地址不能为空',
									},
								],
							})(<Input placeholder="长度<64,必填" maxLength={64} />)}
						</FormItem>
					</Col>
					<Col xl={{ span: 12 }}>
						<FormItem label="邮编:"   {...formItemLayout}>
							{getFieldDecorator('zip', {
								initialValue: record.zip,
								rules: [
									{
										required: false,
										message: '收件详细地址不能为空',
									},
								],
							})(<Input placeholder="长度<64,必填" maxLength={64} />)}
						</FormItem>
					</Col>
					<Col xl={{ span: 12 }}>
						<FormItem label="是否为默认地址"  {...formItemLayout}>
							{getFieldDecorator('isMain', {
								initialValue: (type === 'create') ? 0 : record.isMain,
							})(
								<Radio.Group>
									<Radio value={1}>是</Radio>
									<Radio value={0}>否</Radio>
								</Radio.Group>
							)}
						</FormItem>
					</Col>
				</Row>
			</Form>

		</Modal>)

		return (
			<Fragment>
				<Button icon="plus" type="primary" onClick={e => this.onAddressHandel('create', {})} style={{ marginBottom: 10, marginRight: 10 }}>新增收获地址</Button>
				<Table
					className={Styles.table}
					bordered={true}
					rowKey={record => record.id}
					dataSource={memberAddressData}
					columns={columns}
				/>
				{passwordModal}
			</Fragment>
		);
	}
}

export default MemberAddress;
