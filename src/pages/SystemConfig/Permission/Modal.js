import React from 'react'
import { Form, Input, Radio, Modal, Select } from 'antd'
import { isEmpty } from '@/utils/utils';
const Option = Select.Option;
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
class modal extends React.Component {

	render() {
		const { visible, type, list, item = {}, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props

		//权限根节点数据组织
		const parentCodeList = [];
		const parentCodeFather = (
			<Option key={'0'}><span>根节点权限</span></Option>
		)
		parentCodeList.push(parentCodeFather)
		if (!isEmpty(list) && list.length > 0) {
			for (let index = 0; index < list.length; index++) {
				if (list[index].parentCode == 0) {
					parentCodeList.push(<Option key={list[index].id}>{list[index].name}</Option>);
				}
			}
		}
		let parentCodeUndefine = '0';

		//提交方法
		function handleOk() {
			validateFields((errors) => {
				if (errors) { return }
				const data = {
					...getFieldsValue(),
					version: item.version,
				}
				onOk(data)
			})
		}

		const modalOpts = {
			title: `${type === 'create' ? '新增权限' : '编辑权限'}`,
			visible,
			onOk: handleOk,
			onCancel,
			wrapClassName: "vertical-center-modal",
			width: 800,
			destroyOnClose: true,
			maskClosable: false,
		}
		return (
			<Modal {...modalOpts}>
				<Form>
					<FormItem label="权限父节点:"   {...formItemLayout}>
						{getFieldDecorator('parentCode', {
							initialValue: (type === 'create') ? parentCodeUndefine : item.parentCode ,
						})(
							<Select placeholder="请选择权限父节点"
								showSearch
								optionFilterProp="children"
							>{parentCodeList}</Select>
						)}
					</FormItem>
					<FormItem label="权限名称:"   {...formItemLayout}>
						{getFieldDecorator('name', {
							initialValue: item.name,
							rules: [
								{
									required: true,
									message: '权限名称不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem label="请求方式 :"   {...formItemLayout}>
						{getFieldDecorator('httpMethod', {
							initialValue: item.httpMethod,
							rules: [
								{
									required: true,
									message: '请求方式不能为空',
								},
							],
						})(
							<Select style={{ width: "100%" }}>
								<Option value="RESTFUL">RESTFUL</Option>
								<Option value="GET">GET</Option>
								<Option value="POST">POST</Option>
								<Option value="PUT">PUT</Option>
								<Option value="DELETE">DELETE</Option>
							</Select>
						)}
					</FormItem>
					<FormItem label="请求接口 :"   {...formItemLayout}>
						{getFieldDecorator('relationUrl', {
							initialValue: item.relationUrl,
							rules: [
								{
									required: true,
									message: '请求接口不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem label="是否启用"  {...formItemLayout}>
						{getFieldDecorator('isActive', {
							initialValue: (type === 'create') ? 0 : item.isActive,
						})(
							<Radio.Group>
								<Radio value={1}>启用</Radio>
								<Radio value={0}>禁用</Radio>
							</Radio.Group>
						)}
					</FormItem>
					<FormItem label="描述"   {...formItemLayout}>
						{getFieldDecorator('description', {
							initialValue: item.description,
						})(<TextArea placeholder="长度<255" maxLength={255} rows={4} />)}
					</FormItem>
				</Form>
			</Modal>
		)

	}
}
export default Form.create()(modal)
