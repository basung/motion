import React from 'react'
import { Form, Input, Radio, Modal, Select, Upload, Icon, DatePicker, Row, Col, Cascader } from 'antd'
import { beforeUpload } from '@/utils/fileUtils';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
import Regions from '@/utils/regions'
import moment from 'moment';
import 'moment/locale/zh-cn';
const FormItem = Form.Item
const Option = Select.Option;
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
const optionsRegions = Regions.regions.data;

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
let region = '';

class modal extends React.Component {

	state = {
		uploading: false,
		imageUrl: this.props.type === 'create' ? '' : this.props.item.brandLogo,
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

	//地区选择后的触发事件
	onChangeSelect = (value, selectedOptions) => {
		//let region = '';
		// console.log('value ===', JSON.stringify(value));
		// console.log('selectedOptions ==',JSON.stringify(selectedOptions));
		region = { label: '', value: [] };
		for (let i = 0; i < selectedOptions.length; i++) {

			region.label += selectedOptions[i].label + '/';
			region.value.push(selectedOptions[i].value)

		}
		// for(let i = 0; i < selectedOptions.length; i ++){
		//   region += selectedOptions[i].label + '/' + selectedOptions[i].value + '/'
		// }

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
					avatar: imageUrl,
					version: item.version,
				}
				if(type === 'create'){
					data.memberRegions = JSON.stringify(region)
				}else{
					data.memberRegions = !isEmpty(region.value) ? JSON.stringify(region) : currentItem.memberRegions
				}
				onOk(data)
			})
		}

		const modalOpts = {
			title: `${type === 'create' ? '新增会员' : '编辑会员'}`,
			visible,
			onOk: handleOk,
			onCancel,
			wrapClassName: "vertical-center-modal",
			width: 1200,
			destroyOnClose: false,
			maskClosable: false,
		}
		return (
			<Modal {...modalOpts}>
				<Form>
					<Row>
						<Col xl={{ span: 12 }}>
							<FormItem label="会员登录名:"   {...formItemLayout}>
								{getFieldDecorator('loginName', {
									initialValue: item.loginName,
									rules: [
										{
											required: true,
											message: '会员登录名不能为空',
										},
									],
								})(<Input placeholder="长度<20,必填" maxLength={20} />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="会员登录密码:"   {...formItemLayout}>
								{getFieldDecorator('password', {
									initialValue: item.password,
									rules: [
										{
											required: true,
											message: '会员登录密码不能为空',
										},
									],
								})(<Input placeholder="长度<20,必填" maxLength={20} />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="会员真实姓名:"   {...formItemLayout}>
								{getFieldDecorator('trueName', {
									initialValue: item.trueName,
									rules: [
										{
											required: false,
											message: '会员真实姓名不能为空',
										},
									],
								})(<Input placeholder="长度<64,必填" maxLength={64} />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="会员等级:"   {...formItemLayout}>
								{getFieldDecorator('memberLevel', {
									initialValue: item.memberLevel,
									rules: [
										{
											required: false,
											message: '会员等级不能为空',
										},
									],
								})(
									<Select style={{ width: "100%" }}>
										<Option value={1}>等级一</Option>
										<Option value={2}>等级二</Option>
										<Option value={3}>等级三</Option>
									</Select>
								)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="会员所在地区:"   {...formItemLayout}>
								{getFieldDecorator('memberRegions', {
									initialValue: item.memberRegions,
									rules: [
										{
											required: false,
											message: '会员所在地区不能为空',
										},
									],
								})(<Cascader options={optionsRegions} onChange={this.onChangeSelect} placeholder="请选择地区" />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem label="会员所在地址:"   {...formItemLayout}>
								{getFieldDecorator('memberAddress', {
									initialValue: item.memberAddress,
									rules: [
										{
											required: false,
											message: '会员所在地址不能为空',
										},
									],
								})(<Input placeholder="长度<64,必填" maxLength={64} />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem {...formItemLayout} label="手机号" >
								{getFieldDecorator('mobile', {
									initialValue: (type === 'create') ? '' : item.mobile,
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
									initialValue: (type === 'create') ? '' : item.telephone,
									rules: [
										{
											required: false,
											message: '请输入电话',
										},
									],
								})(<Input placeholder="用户电话号码" />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem {...formItemLayout} label="邮箱" >
								{getFieldDecorator('email', {
									initialValue: (type === 'create') ? '' : item.email,
									rules: [
										{
											required: false,
											message: '请输入邮箱',
										},
									],
								})(<Input placeholder="用户邮箱" />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem {...formItemLayout} label="出生日期" >
								{getFieldDecorator('birthday', {
									initialValue: (type === 'create' ? moment(new Date(), dateFormat) : moment(moment(item.birthday).format('YYYY-MM-DD HH:mm:ss'), dateFormat)),
									rules: [
										{
											required: false,
											message: '请输入出生日期',
										},
									],
								})(<DatePicker style={{ width: '100%' }} placeholder={'请输入出生日期'} format={dateFormat} />)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem {...formItemLayout} label="性别" >
								{getFieldDecorator('sex', {
									initialValue: (type === 'create') ? '' : item.sex,
									rules: [
										{
											required: false,
											message: '请输入性别',
										},
									],
								})(
									<Radio.Group>
										<Radio value={1}>男</Radio>
										<Radio value={0}>女</Radio>
									</Radio.Group>
								)}
							</FormItem>
						</Col>
						<Col xl={{ span: 12 }}>
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
						</Col>
						<Col xl={{ span: 12 }}>
							<FormItem {...formItemLayout} label="用户头像" >
								{getFieldDecorator('avatar', {
									initialValue: (type === 'create') ? '' : item.avatar,
									rules: [
										{
											required: false,
											message: '请输入用户头像',
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
											(type === 'create') ? uploadButton : <img src={IMGURL + item.avatar} alt="avatar" width={'102px'} height={'102px'} />}
									</Upload>
								)}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Modal>
		)

	}
}
export default Form.create()(modal)
