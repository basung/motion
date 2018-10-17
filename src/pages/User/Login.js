import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
	login,
	submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
	state = {
		type: 'account',
		autoLogin: true,
	};

	onTabChange = type => {
		this.setState({ type });
	};

	onGetCaptcha = () =>
		new Promise((resolve, reject) => {
			this.loginForm.validateFields(['mobile'], {}, (err, values) => {
				if (err) {
					reject(err);
				} else {
					const { dispatch } = this.props;
					dispatch({
						type: 'login/getCaptcha',
						payload: values.mobile,
					})
						.then(resolve)
						.catch(reject);
				}
			});
		});

	handleSubmit = (err, values) => {
		const { type } = this.state;
		if (!err) {
			const { dispatch } = this.props;
			dispatch({
				type: 'login/login',
				payload: {
					...values,
					type,
				},
			});
		}
	};

	changeAutoLogin = e => {
		this.setState({
			autoLogin: e.target.checked,
		});
	};

	renderMessage = content => (
		<Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
	);

	render() {
		const { login, submitting } = this.props;
		const { type, autoLogin } = this.state;
		return (
			<div className={styles.main}>
				<Login
					defaultActiveKey={type}
					onTabChange={this.onTabChange}
					onSubmit={this.handleSubmit}
					ref={form => {
						this.loginForm = form;
					}}
				>
					<Tab key="account" tab={(<span style={{color: '#fff'}}>账户密码登录</span>)}>
						{login.status === 'error' &&
							login.type === 'account' &&
							!submitting &&
							this.renderMessage('账户或密码错误（admin/888888）')}
						<UserName name="userName" placeholder="admin/user" />
						<Password
							name="password"
							placeholder="123456/123456"
							onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
						/>
					</Tab>
					<Tab key="mobile" tab={(<span style={{color: '#fff'}}>手机号登录</span>)}>
						{login.status === 'error' &&
							login.type === 'mobile' &&
							!submitting &&
							this.renderMessage('验证码错误')}
						<Mobile name="mobile" />
						<Captcha name="captcha" countDown={120} onGetCaptcha={this.onGetCaptcha} />
					</Tab>
					<div>
						<Checkbox style={{float: 'left'}} checked={autoLogin} onChange={this.changeAutoLogin}><span style={{color: '#fff'}}>自动登录</span></Checkbox>
						<a style={{ float: 'right' }} href=""><span style={{color: '#fff'}}>忘记密码</span></a>
					</div>
					<Submit loading={submitting}>登录</Submit>
					<div className={styles.other}>
						<span style={{color: '#fff'}}>其他登录方式</span>
            				<Icon type="alipay-circle" className={styles.icon} theme="outlined" />
						<Icon type="taobao-circle" className={styles.icon} theme="outlined" />
						<Icon type="weibo-circle" className={styles.icon} theme="outlined" />
						<Link className={styles.register} to="/User/Register"><span style={{ color: '#fff' }}>注册账户</span></Link>
					</div>
				</Login>
			</div>
		);
	}
}

export default LoginPage;
