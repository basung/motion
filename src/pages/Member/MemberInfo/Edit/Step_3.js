import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { List, Modal, Input, Icon, message } from 'antd';
// import { getTimeDistance } from '@/utils/utils';

const passwordStrength = {
	strong: (
		<font className="strong">
			<FormattedMessage id="app.settings.security.strong" defaultMessage="Strong" />
		</font>
	),
	medium: (
		<font className="medium">
			<FormattedMessage id="app.settings.security.medium" defaultMessage="Medium" />
		</font>
	),
	weak: (
		<font className="weak">
			<FormattedMessage id="app.settings.security.weak" defaultMessage="Weak" />
			Weak
    </font>
	),
};

class SecurityView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visibleModal: false,
			newPassword: '',
			newPassword_repeat:''
		};
	}



	//修改密码触发按钮
	onEditPasswordHandel = (e) => { this.showModal() }
	//修改密码弹出框方法
	showModal = () => { this.setState({ visibleModal: true }); }
	handleOk = (e) => {
		
		
		const { item, type, onOk } = this.props
		const { newPassword, newPassword_repeat } = this.state
		if(newPassword !== newPassword_repeat){
			message.error("两次密码输入不一致！")
		}else if(newPassword.length < 6){
			message.error("密码长度不得少于6位！")
		}else {

			const formData = {
				id: item.id,
				password: newPassword
			}
			onOk(formData)
			this.setState({ visibleModal: false }); 
		}
	}
	handleCancel = (e) => { this.setState({ visibleModal: false }); }


	onChangeNewPassword = (e) => {
		this.setState({ newPassword: e.target.value });
	}

	onChangeNewPassword_repeat = (e) => {
		this.setState({ newPassword_repeat: e.target.value });
	}

	render() {

		const { item, type } = this.props;

		const { visibleModal, newPassword, newPassword_repeat } = this.state

		const getData = () => [
			{
				title: formatMessage({ id: 'app.settings.security.password' }, {}),
				description: (
					<Fragment>
						{formatMessage({ id: 'app.settings.security.password-description' })}：
						    {passwordStrength.strong}
					</Fragment>
				),
				actions: [
					<a onClick={e => this.onEditPasswordHandel()}>
						<FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
					</a>,
				],
			},
			{
				title: formatMessage({ id: 'app.settings.security.phone' }, {}),
				description: `${formatMessage(
					{ id: 'app.settings.security.phone-description' },
					{}
				)}：${item.mobile}`,
				actions: [
					<a>
						<FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
					</a>,
				],
			},
			{
				title: formatMessage({ id: 'app.settings.security.email' }, {}),
				description: `${formatMessage(
					{ id: 'app.settings.security.email-description' },
					{}
				)}：${item.email}`,
				actions: [
					<a>
						<FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
					</a>,
				],
			},
		];

		const passwordModal = (<Modal
			width={600}
			title="修改密码"
			visible={this.state.visibleModal}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
		>
			<Input
				placeholder="请输入您的新密码, 至少6位密码， 区分大小写"
				prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
				value={newPassword}
				onChange={this.onChangeNewPassword}
				style={{marginBottom: '10px'}}
			/>
			<Input
				placeholder="请重复输入您的新密码, 至少6位密码， 区分大小写"
				prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
				value={newPassword_repeat}
				onChange={this.onChangeNewPassword_repeat}
			/>
		</Modal>)

		return (
			<Fragment>
				<List
					itemLayout="horizontal"
					dataSource={getData()}
					renderItem={item => (
						<List.Item actions={item.actions}>
							<List.Item.Meta title={item.title} description={item.description} />
						</List.Item>
					)}
				/>
				{passwordModal}
			</Fragment>
		);
	}
}

export default SecurityView;
