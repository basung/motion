import React from 'react'
import { Form, Input, Radio, Modal, Select, Upload, Icon } from 'antd'
import { beforeUpload } from '@/utils/fileUtils';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
class modal extends React.Component {

	state = {
		uploading: false,
		imageUrl:   this.props.type === 'create' ? '' : this.props.item.brandLogo  ,
	};

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ uploading: true });
			return;
		}
		if (info.file.status === 'done') {
			let response = info.file ? info.file.response : false
			if (response && response.status == 200) {
				this.setState({ imageUrl: response.data.filePath, uploading: false }, () => {

				})
			}
		}
	}

	render() {
		const { visible, type, list, item = {}, onOk, onCancel, form: { getFieldDecorator, validateFields, getFieldsValue } } = this.props

		//图片上传
		const uploadButton = (
			<div>
				<Icon type={this.state.uploading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">上传</div>
			</div>
		);
		const { imageUrl } = this.state;

		//提交方法
		function handleOk() {
			validateFields((errors) => {
				if (errors) { return }

				const data = {
					...getFieldsValue(),
					brandLogo: imageUrl,
					version: item.version,
				}
				onOk(data)
			})
		}

		const modalOpts = {
			title: `${type === 'create' ? '新增商品品牌' : '编辑商品品牌'}`,
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
					<FormItem label="品牌中文名称:"   {...formItemLayout}>
						{getFieldDecorator('brandName', {
							initialValue: item.brandName,
							rules: [
								{
									required: true,
									message: '品牌中文名称不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem label="品牌英文名称:"   {...formItemLayout}>
						{getFieldDecorator('brandEnName', {
							initialValue: item.brandEnName,
							rules: [
								{
									required: false,
									message: '品牌英文名称不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem {...formItemLayout} label="品牌Logo" >
						{getFieldDecorator('brandLogo', {
							initialValue: (type === 'create') ? '' : item.brandLogo,
							rules: [
								{
									required: true,
									message: '品牌Logo',
								},
							],
						})(
							<Upload
								name="uploadFile"
								listType="picture-card"
								className="avatar-uploader"
								headers={{ Authorization: getLocalStorageEnhance('Authorization') }}
								showUploadList={false}
								action={IMGUPURL}
								beforeUpload={beforeUpload}
								onChange={this.handleChange}
							>
								{imageUrl ?
									<img src={IMGURL + imageUrl} alt="avatar" width={'102px'} height={'102px'} /> :
									(type === 'create') ? uploadButton : <img src={IMGURL + item.brandLogo} alt="avatar" width={'102px'} height={'102px'} />}
							</Upload>
						)}
					</FormItem>
					<FormItem label="品牌官网地址:"   {...formItemLayout}>
						{getFieldDecorator('brandUrl', {
							initialValue: item.brandUrl,
							rules: [
								{
									required: false,
									message: '品牌官网地址不能为空',
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
					<FormItem label="品牌故事"   {...formItemLayout}>
						{getFieldDecorator('brandDesc', {
							initialValue: item.brandDesc,
						})(<TextArea placeholder="长度<255" maxLength={255} rows={4} />)}
					</FormItem>
				</Form>
			</Modal>
		)

	}
}
export default Form.create()(modal)
