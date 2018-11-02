import React from 'react'
import { Form, Input, Radio, Modal, Select, Upload, Icon, TreeSelect } from 'antd'
import { isEmpty, getTrees } from '@/utils/utils';
import { beforeUpload } from '@/utils/fileUtils';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
const Option = Select.Option;
const FormItem = Form.Item
const { TextArea } = Input;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
class modal extends React.Component {

	state = {
		uploading: false,
		imageUrl: this.props.type === 'create' ? '' : this.props.item.categoryLogo,
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

		/**
             * 树状的算法
             * @params list     代转化数组
             * @params parentId 起始节点
             */
		if (!isEmpty(list) && list.length > 0) {
			for (let index = 0; index < list.length; index++) {
				list[index].title = list[index].categoryName
				list[index].key = list[index].id
				list[index].value = list[index].id
			}
		}
		let newList = (!isEmpty(list) && list.length > 0) ? getTrees(list, 0) : [];
		let rootItem = {
			id: '0',
			key: '0',
			value: '0',
			title: '根节点分类'
		}
		newList.push(rootItem)
		let parentCodeUndefine = '0';


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
					categoryLogo: imageUrl,
					version: item.version,
				}
				onOk(data)
			})
		}

		const modalOpts = {
			title: `${type === 'create' ? '新增商品分类' : '编辑商品分类'}`,
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
					<FormItem label="分类根节点:"   {...formItemLayout}>
						{getFieldDecorator('parentId', {
							initialValue: (type === 'create') ? parentCodeUndefine : item.parentId,
						})(
							<TreeSelect
								placeholder="请选择分类根节点"
								style={{ width: '100%' }}
								dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
								treeData={newList}
								treeDefaultExpandAll
							// onChange={this.onChange}
							/>
						)}
					</FormItem>
					<FormItem label="分类名称:"   {...formItemLayout}>
						{getFieldDecorator('categoryName', {
							initialValue: item.categoryName,
							rules: [
								{
									required: true,
									message: '分类名称不能为空',
								},
							],
						})(<Input placeholder="长度<64,必填" maxLength={64} />)}
					</FormItem>
					<FormItem {...formItemLayout} label="分类Logo" >
						{getFieldDecorator('categoryLogo', {
							initialValue: (type === 'create') ? '' : item.categoryLogo,
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
									(type === 'create') ? uploadButton : <img src={IMGURL + item.categoryLogo} alt="avatar" width={'102px'} height={'102px'} />}
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
					<FormItem label="分类描述"   {...formItemLayout}>
						{getFieldDecorator('categoryDesc', {
							initialValue: item.categoryDesc,
						})(<TextArea placeholder="长度<255" maxLength={255} rows={4} />)}
					</FormItem>
				</Form>
			</Modal>
		)

	}
}
export default Form.create()(modal)
