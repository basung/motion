import React from 'react'
import router from 'umi/router';
import { Form, Input, Radio, Card, Select, Button, DatePicker, Upload, Icon } from 'antd'
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { beforeUpload } from '@/utils/fileUtils';
import { isEmpty } from '@/utils/utils';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
import Styles from './Index.less';
const Option = Select.Option;
const FormItem = Form.Item

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
// const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }

const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 7 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 10 }, }, };

const submitFormLayout = { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 10, offset: 7 }, }, };

@connect(({ adminUser, loading }) => ({ adminUser, loading: loading.models.adminUser }))
@Form.create()
export default class Index extends React.Component {

	state = {
		userId: '',
		uploading: false,
		imageUrl: '',
	};

	componentDidMount() {
		const { dispatch } = this.props;
		let itemId = this.props.match.params.id
		if (itemId !== 'id') {
			this.setState({ userId: itemId })
			dispatch({
				type: 'adminUser/getUserById',
				payload: {
					id: itemId,
					modalType: 'update',
				},
			});
		}
		dispatch({
			type: 'adminUser/getRole',
			payload: {},
		});
	}

	handleChange = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ uploading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			// getBase64(info.file.originFileObj, imageUrl => this.setState({
			// 	imageUrl: 'http://img.hb.aicdn.com/2f9d06d3572334f6061b77b0895efbc4706ff948690ea-93MzbL_fw658',
			// 	uploading: false,
			// },()=>{
			// 	console.info('info.file ====', JSON.stringify(info.file))
			// }));
			let response = info.file ? info.file.response : false
			if (response && response.status == 200) {
				this.setState({ imageUrl: response.data.filePath, uploading: false }, () => {

				})
			}
		}
	}

	handleSubmit = e => {
		const { adminUser: { currentItem, modalType, roleData }, dispatch, form } = this.props;
		e.preventDefault();
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values.version = currentItem.version
				values.avatar = this.state.imageUrl
				let roleItem = roleData.filter(item => item.id == values.roleId)
				if (!isEmpty(roleItem) && roleItem.length > 0) {
					values.roleName = roleItem[0].name
				}
				dispatch({
					type: `adminUser/${modalType}`,
					payload: values,
				});
			}
		});
	};


	render() {

		const { adminUser: { data, roleData, currentItem, modalType }, dispatch, loading, form: { getFieldDecorator, getFieldValue } } = this.props;

		//角色数据
		const roleList = [];
		if (!isEmpty(roleData) && roleData.length > 0) {
			for (let index = 0; index < roleData.length; index++) {
				roleList.push(<Option key={roleData[index].id}>{roleData[index].name}</Option>);
			}
		}

		//图片上传
		const uploadButton = (
			<div>
				<Icon type={this.state.uploading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">上传</div>
			</div>
		);
		const { imageUrl } = this.state;

		function onCancel() {
			router.push('/system/adminUser/adminUserList')
		}

		return (
			<Card bordered={false} className={Styles.card}>
				<Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
					<FormItem label="账号关联角色:"   {...formItemLayout}>
						{getFieldDecorator('roleId', {
							initialValue: (modalType === 'create') ? '' : currentItem.roleId,
							rules: [
								{
									required: true,
									message: '账号关联角色不能为空',
								},
							],
						})(
							<Select placeholder="请选择账号关联角色"
								showSearch
								optionFilterProp="children"
							>{roleList}</Select>
						)}
					</FormItem>
					<FormItem label="账号类型:"   {...formItemLayout}>
						{getFieldDecorator('associatedType', {
							initialValue: (modalType === 'create') ? '' : currentItem.associatedType,
							rules: [
								{
									required: true,
									message: '账号类型不能为空',
								},
							],
						})(
							<Select style={{ width: "100%" }}>
								<Option value="superAdmin">平台管理员</Option>
								<Option value="tenant">租户</Option>
								<Option value="employee">雇员</Option>
								<Option value="merchant">商家</Option>
								<Option value="supplier">供应商</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="登录账号" >
						{getFieldDecorator('loginName', {
							initialValue: (modalType === 'create') ? '' : currentItem.loginName,
							rules: [
								{
									required: true,
									message: '登录账号不能为空',
								},
							],
						})(<Input placeholder="平台登录账号" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="登录密码" >
						{getFieldDecorator('password', {
							initialValue: (modalType === 'create') ? '' : currentItem.password,
							rules: [
								{
									required: true,
									message: '登录密码不能为空',
								},
							],
						})(<Input placeholder="平台登录密码" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="真实姓名" >
						{getFieldDecorator('trueName', {
							initialValue: (modalType === 'create') ? '' : currentItem.trueName,
							rules: [
								{
									required: false,
									message: '请输入真实姓名',
								},
							],
						})(<Input placeholder="用户真实姓名" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="手机号" >
						{getFieldDecorator('mobile', {
							initialValue: (modalType === 'create') ? '' : currentItem.mobile,
							rules: [
								{
									required: true,
									message: '手机号不能为空',
								},
							],
						})(<Input placeholder="用户手机号" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="电话" >
						{getFieldDecorator('telephone', {
							initialValue: (modalType === 'create') ? '' : currentItem.telephone,
							rules: [
								{
									required: false,
									message: '请输入电话',
								},
							],
						})(<Input placeholder="用户电话号码" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="邮箱" >
						{getFieldDecorator('email', {
							initialValue: (modalType === 'create') ? '' : currentItem.email,
							rules: [
								{
									required: false,
									message: '请输入邮箱',
								},
							],
						})(<Input placeholder="用户邮箱" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="出生日期" >
						{getFieldDecorator('birthday', {
							initialValue: (modalType === 'create' ? moment(new Date(), dateFormat) : moment(moment(currentItem.birthday).format('YYYY-MM-DD HH:mm:ss'), dateFormat) ),
							rules: [
								{
									required: false,
									message: '请输入出生日期',
								},
							],
						})(<DatePicker style={{ width: '100%' }} placeholder={'请输入出生日期'} format={dateFormat} />)}
					</FormItem>
					<FormItem {...formItemLayout} label="性别" >
						{getFieldDecorator('sex', {
							initialValue: (modalType === 'create') ? '' : currentItem.sex,
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
					<FormItem {...formItemLayout} label="用户头像" >
						{getFieldDecorator('avatar', {
							initialValue: (modalType === 'create') ? '' : currentItem.avatar,
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
									(modalType === 'create') ? uploadButton : <img src={IMGURL + currentItem.avatar} alt="avatar" width={'102px'} height={'102px'} />}
							</Upload>
						)}
					</FormItem>
					<FormItem label="是否启用"  {...formItemLayout}>
						{getFieldDecorator('isActive', {
							initialValue: (modalType === 'create') ? 0 : currentItem.isActive,
						})(
							<Radio.Group>
								<Radio value={1}>启用</Radio>
								<Radio value={0}>禁用</Radio>
							</Radio.Group>
						)}
					</FormItem>


					<FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
						<Button type="primary" htmlType="submit" loading={loading}>提交</Button>
						<Button style={{ marginLeft: 8 }} onClick={onCancel}>返回</Button>
					</FormItem>
				</Form>

			</Card>
		)

	}
}
