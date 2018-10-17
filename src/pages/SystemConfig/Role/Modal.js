import React from 'react'
import { Form, Input, Radio, Modal, Select } from 'antd'
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
class modal extends React.Component {

	render() {
		const { visible, type, item = {}, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props

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
			title: `${type === 'create' ? '新增角色' : '编辑角色'}`,
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
					<FormItem label="角色名称:"   {...formItemLayout}>
						{getFieldDecorator('name', {
							initialValue: item.name,
							rules: [
								{
									required: true,
									message: '角色名称不能为空',
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
