import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button, Cascader, DatePicker, Radio } from 'antd';
import { connect } from 'dva';
import Styles from './Step_1.less';
import { beforeUpload, isJSON, isEmpty } from '@/utils/Index';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
import Regions from '@/utils/regions'
import moment from 'moment';
import 'moment/locale/zh-cn';
const FormItem = Form.Item
const Option = Select.Option;
const optionsRegions = Regions.regions.data;

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
let region = '';

@Form.create()
class BaseView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			memberId: '',
			region: {},
			imageUrl: this.props.type === 'create' ? '' : this.props.item.avatar,
		};
	}

	componentDidMount() {

		const { item } = this.props
		this.setState({ memberId: item.id, avatar: item.avatar })

	}

	//图片上传
	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ uploading: true });
			return;
		}
		if (info.file.status === 'done') {
			let response = info.file ? info.file.response : false
			if (response && response.status == 200) {
				this.setState({ imageUrl: response.data.filePath, uploading: false }, () => {
					console.info('this.state.imageUrl ===', this.state.imageUrl)
				})
			}
		}
	}

	//地区选择后的触发事件
	onChangeSelect = (value, selectedOptions) => {
		region = { label: '', value: [] };
		for (let i = 0; i < selectedOptions.length; i++) {
			region.label += selectedOptions[i].label + '/';
			region.value.push(selectedOptions[i].value)
		}
		this.setState({ region },() => { })
	}


	//数据提交
	handleSubmit = (e) => {
		const { item, onOk, form: { validateFields, getFieldsValue } } = this.props
		const { imageUrl, region } = this.state
		validateFields((e) => {
			if (e) { return }

			const data = {...getFieldsValue()}
			const formData = item;
			formData.loginName = item.loginName
			formData.trueName = data.trueName
			formData.memberLevel = data.memberLevel
			formData.memberRegions = !isEmpty(region.value) ? JSON.stringify(region) : item.memberRegions,
			formData.memberAddress = data.memberAddress
			formData.mobile = data.mobile
			formData.telephone = data.telephone
			formData.email = data.email
			formData.birthday = data.birthday
			formData.sex = data.sex
			formData.isActive = data.isActive
			formData.isActive = data.isActive
			formData.avatar = imageUrl ? imageUrl : item.avatar
			formData.version = item.version
			// console.info('formData ===', JSON.stringify(formData))
			onOk(formData)
		})
	}

	render() {
		const { item, type, form: { getFieldDecorator } } = this.props;

		const { imageUrl } = this.state

		return (
			<div className={Styles.baseView}>
				<div className={Styles.left}>
					<Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
						<FormItem label={'登录账号'}>
							{getFieldDecorator('loginName', {
								initialValue: item.loginName,
								rules: [
									{
										required: true,
										message: '登录账号不能为空',
									},
								],
							})(<Input placeholder="长度<64,必填" maxLength={64} disabled={true} />)}
						</FormItem>
						<FormItem label="会员真实姓名:" >
							{getFieldDecorator('trueName', {
								initialValue: item.trueName,
								rules: [
									{
										required: false,
										message: '会员真实姓名不能为空',
									},
								],
							})(<Input placeholder="长度<64" maxLength={64} />)}
						</FormItem>
						<FormItem label="会员等级:" >
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
						<FormItem label="会员所在地区:" >
							{getFieldDecorator('memberRegions', {
								initialValue: (type === 'update' ? (isJSON(item.memberRegions) ? JSON.parse(item.memberRegions).value : '') : ''),
								rules: [
									{
										required: false,
										message: '会员所在地区不能为空',
									},
								],
							})(<Cascader options={optionsRegions} onChange={this.onChangeSelect} placeholder="请选择地区" />)}
						</FormItem>
						<FormItem label="会员所在地址:" >
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
						<FormItem label="手机号" >
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
						<FormItem label="电话" >
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
						<FormItem label="邮箱" >
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
						<FormItem label="出生日期" >
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
						<FormItem>
							<Button type="primary" htmlType="submit">
								<FormattedMessage
									id="app.settings.basic.update"
									defaultMessage="Update Information"
								/>
							</Button>
						</FormItem>
					</Form>
				</div>
				<div className={Styles.right}>
					<Form onSubmit={this.handleSubmit}>
						<FormItem label="性别" >
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
						<FormItem label="是否启用" >
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
					<Fragment>
						<div className={Styles.avatar_title}>
							<FormattedMessage id="app.settings.basic.avatar" defaultMessage="Avatar" />
						</div>
						<div className={Styles.avatar}>
							<img src={imageUrl ? (IMGURL + imageUrl) : (IMGURL + item.avatar)} alt="avatar" style={{ borderRadius: '50%' }} />
						</div>
						<Upload
							name="uploadFile"
							headers={{ Authorization: getLocalStorageEnhance('Authorization') }}
							showUploadList={false}
							action={IMGUPURL}
							beforeUpload={beforeUpload}
							onChange={this.handleChange}
						>
							<div className={Styles.button_view}>
								<Button icon="upload"> <FormattedMessage id="app.settings.basic.change-avatar" defaultMessage="Change avatar" /> </Button>
							</div>
						</Upload>
					</Fragment>
				</div>
			</div>
		);
	}
}

export default BaseView;
