import React from 'react'
import { Form, Input, Radio, Modal } from 'antd'
const FormItem = Form.Item
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
class modal extends React.Component {

	render() {
		const { visible, type, list, item = {}, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props

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
			title: `${type === 'create' ? '新增物流公司' : '编辑物流公司'}`,
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
					<FormItem label="物流公司名称:"   {...formItemLayout}>
						{getFieldDecorator('name', {
							initialValue: item.name,
							rules: [
								{
									required: true,
									message: '物流公司名称不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem label="物流公司代码:"   {...formItemLayout}>
						{getFieldDecorator('code', {
							initialValue: item.code,
							rules: [
								{
									required: false,
									message: '物流公司代码不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem label="物流公司网址:"   {...formItemLayout}>
						{getFieldDecorator('website', {
							initialValue: item.website,
							rules: [
								{
									required: false,
									message: '物流公司网址不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem label="物流公司查询网址:"   {...formItemLayout}>
						{getFieldDecorator('requestUrl', {
							initialValue: item.requestUrl,
							rules: [
								{
									required: false,
									message: '物流公司查询网址不能为空',
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
				</Form>
			</Modal>
		)

	}
}
export default Form.create()(modal)
