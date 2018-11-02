import React from 'react'
import { Form, Input, Radio, Modal, Upload, Icon } from 'antd'
import SketchPicker from '@/components/OnSelfSketchPicker'
import { beforeUpload } from '@/utils/fileUtils';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
import { isJSON } from '@/utils/Index'
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
class modal extends React.Component {

	state = {
		uploading: false,
		imageUrl:   this.props.type === 'create' ? '' : this.props.item.tagsLogo,
		displayColorPicker: false,
		color: this.props.type === 'create' ? {
                  r: '241',
                  g: '112',
                  b: '19',
                  a: '1',
		} : isJSON(this.props.item.tagsColor) ? JSON.parse(this.props.item.tagsColor) : {
                  r: '241',
                  g: '112',
                  b: '19',
                  a: '1',
		},
            colorHex: this.props.type === 'create' ? '#f17013' : this.props.item.tagsColorHex,
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

	onChangeColorHandler = (color, colorHex) => {
            console.info('color ===', color)
            console.info('colorHex ===', colorHex)
            this.setState({ color, colorHex })
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
		const { imageUrl, color, colorHex  } = this.state;

		const sketchPickerProps = {
                  color: color,
                  onChangeHandler: this.onChangeColorHandler
            }

		//提交方法
		function handleOk() {
			validateFields((errors) => {
				if (errors) { return }

				const data = {
					...getFieldsValue(),
					tagsLogo: imageUrl,
					tagsColor: JSON.stringify(color),
					tagsColorHex: colorHex,
					version: item.version,
				}
				onOk(data)
			})
		}

		const modalOpts = {
			title: `${type === 'create' ? '新增商品标签' : '编辑商品标签'}`,
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
					<FormItem label="标签名称:"   {...formItemLayout}>
						{getFieldDecorator('tagsName', {
							initialValue: item.tagsName,
							rules: [
								{
									required: true,
									message: '标签名称名称不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem label="标签颜色:"   {...formItemLayout}>
						{getFieldDecorator('tagsColor', {
							initialValue: item.tagsColor,
							rules: [
								{
									required: false,
									message: '标签颜色不能为空',
								},
							],
						})(<SketchPicker {...sketchPickerProps} />)}
					</FormItem>
					<FormItem {...formItemLayout} label="标签Logo" >
						{getFieldDecorator('tagsLogo', {
							initialValue: (type === 'create') ? '' : item.tagsLogo,
							rules: [
								{
									required: true,
									message: '标签Logo',
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
									(type === 'create') ? uploadButton : <img src={IMGURL + item.tagsLogo} alt="avatar" width={'102px'} height={'102px'} />}
							</Upload>
						)}
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
					<FormItem label="标签描述"   {...formItemLayout}>
						{getFieldDecorator('tagsDesc', {
							initialValue: item.tagsDesc,
						})(<TextArea placeholder="长度<255" maxLength={255} rows={4} />)}
					</FormItem>
				</Form>
			</Modal>
		)

	}
}
export default Form.create()(modal)
