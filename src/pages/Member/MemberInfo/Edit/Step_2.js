import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'umi/locale';
import { List, Modal, Icon, message, Select, InputNumber } from 'antd';
const Option = Select.Option;

function memberLevelFun(level) {
	switch (level) {
		case 1:
			return '普通会员';
		case 2:
			return '青铜会员';
		case 3:
			return '白银会员';
		case 4:
			return '黄金会员';
		case 5:
			return '白金会员';
		case 6:
			return '钻石会员';
		default:
			return '普通会员';
	}
}

class SecurityView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visibleModal: false,
			memberLevel: this.props.item ? this.props.item.memberLevel : '',
			advance: this.props.item ? this.props.item.advance : '',
			memberPoints: this.props.item ? this.props.item.memberPoints : '',
		};
	}



	//修改密码触发按钮
	onEditHandel = (e) => { this.showModal() }
	//修改密码弹出框方法
	showModal = () => { this.setState({ visibleModal: true }); }
	handleOk = (e) => {

		const { item, onOk } = this.props
		const { memberLevel, advance, memberPoints } = this.state
		const formData = item;
		formData.memberLevel = memberLevel;
		formData.advance = advance
		formData.memberPoints = memberPoints
		onOk(formData)
		this.setState({ visibleModal: false }); 
	}
	handleCancel = (e) => { this.setState({ visibleModal: false }); }

	onChangeMemberLevel = (value) => {
		this.setState({ memberLevel: value });
	}

	onChangeAdvance = (value) => {
		this.setState({ advance: value });
	}

	onChangeNewMemberPoints = (value) => {
		this.setState({ memberPoints: value });
	}

	render() {

		const { item, type } = this.props;

		const { visibleModal, memberLevel, advance, memberPoints } = this.state

		const getData = () => [
			{
				title: "会员等级",
				description: (
					<Fragment>
						{'当前会员等级 : '}
						<font className="strong">
							{item ? memberLevelFun(item.memberLevel): memberLevelFun(1)}
						</font>
					</Fragment>
				),
				actions: [
					<a onClick={e => this.onEditHandel()}>
						<FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
					</a>,
				],
			},
			{
				title: '账户余额',
				description: `当前会员账户余额 : ${item.advance}`,
			},
			{
				title: '会员积分',
				description: `当前会员积分 : ${item.memberPoints}`,
			},
		];

		const passwordModal = (<Modal
			width={600}
			title="修改密码"
			visible={this.state.visibleModal}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
		>
			<Select style={{ width: "100%" }} onChange={this.onChangeMemberLevel} value={memberLevel} style={{ width:'100%', marginBottom: '10px' }}>
				<Option value={1}>普通会员</Option>
				<Option value={2}>青铜会员</Option>
				<Option value={3}>白银会员</Option>
				<Option value={4}>黄金会员</Option>
				<Option value={5}>白金会员</Option>
				<Option value={6}>钻石会员</Option>
			</Select>
			<InputNumber
				placeholder="会员账余额"
				prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
				value={advance}
				onChange={this.onChangeAdvance}
				style={{ width:'100%', marginBottom: '10px' }}
			/>
			<InputNumber
				placeholder="会员积分"
				prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
				value={memberPoints}
				onChange={this.onChangeNewMemberPoints}
				style={{ width:'100%', marginBottom: '10px' }}
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
