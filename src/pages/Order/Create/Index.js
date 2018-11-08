import React from 'react'
import FooterToolbar from '@/components/FooterToolbar';
import { Form, Card, Button, Row, Col, Input, Select, Radio } from 'antd'
import { connect } from 'dva';
import { isEmpty, isJSON } from '@/utils/Index'
import Styles from '../Index.less';
const FormItem = Form.Item
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
const Option = Select.Option;

@connect(({ order, loading }) => ({ order, loading: loading.models.order }))
@Form.create()
export default class Index extends React.Component {

	state = {
		activeKey: '1',  //当前激活的Tab面板
		width: '100%',
		memberAddressData: [],
	};

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'order/getRelationData'
		})
		window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeFooterToolbar);
	}

	getErrorInfo = () => {
		const { form: { getFieldsError } } = this.props;
		const errors = getFieldsError();
		const errorCount = Object.keys(errors).filter(key => errors[key]).length;
		if (!errors || errorCount === 0) {
			return null;
		}
		const scrollToField = fieldKey => {
			const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
			if (labelNode) {
				labelNode.scrollIntoView(true);
			}
		};
		const errorList = Object.keys(errors).map(key => {
			if (!errors[key]) {
				return null;
			}
			return (
				<li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
					<Icon type="cross-circle-o" className={styles.errorIcon} />
					<div className={styles.errorMessage}>{errors[key][0]}</div>
					<div className={styles.errorField}>{fieldLabels[key]}</div>
				</li>
			);
		});
		return (
			<span className={styles.errorIcon}>
				<Popover
					title="表单校验信息"
					content={errorList}
					overlayClassName={styles.errorPopover}
					trigger="click"
					getPopupContainer={trigger => trigger.parentNode}
				>
					<Icon type="exclamation-circle" />
				</Popover>
				{errorCount}
			</span>
		);
	};

	resizeFooterToolbar = () => {
		requestAnimationFrame(() => {
			const sider = document.querySelectorAll('.ant-layout-sider')[0];
			if (sider) {
				const width = `calc(100% - ${sider.style.width})`;
				const { width: stateWidth } = this.state;
				if (stateWidth !== width) {
					this.setState({ width });
				}
			}
		});
	};


	//下单人数据变化
	onMemberChangeHandle = (value) => {
		console.info('vlue ===', value)
		const { order: { memberData }, form } = this.props
		const memberItem = memberData.filter(item => item.id == value)[0]
		if (!isEmpty(memberItem) && !isEmpty(memberItem.memberAddressList) && memberItem.memberAddressList.length > 0) {
			this.setState({ memberAddressData: memberItem.memberAddressList }, () => {
				form.resetFields(['receiverAddressId']);
			})
		}
	}

	//数据提交
	handleSubmit(formData) {
		// const { order: { modalType }, dispatch } = this.props;
		// try {
		// 	// console.info('formData ===', JSON.stringify(formData))
		// 	dispatch({
		// 		type: `order/${modalType}`,
		// 		payload: formData,
		// 	});
		// } catch (err) {
		// 	message.error("数据提交失败,  失败原因: " + err);
		// }
	}

	render() {
		const { order: { currentItem, modalType, memberData, skuData }, loading, form: { getFieldDecorator, getFieldValue } } = this.props;

		const { width, memberAddressData } = this.state

		// console.info('memberData ===', memberData)
		// console.info('skuData ===', skuData)


		/**
		 * 下单人
		 */
		const memberChildren = [];
		if (!isEmpty(memberData) && memberData.length > 0) {
			for (let i = 0; i < memberData.length; i++) {
				memberChildren.push(<Option key={memberData[i].id}>{memberData[i].loginName}</Option>);
			}
		}

		/**
		 * 收货地址
		 */
		const memberAddressChildren = [];
		if (!isEmpty(memberAddressData) && memberAddressData.length > 0) {
			for (let i = 0; i < memberAddressData.length; i++) {
				memberAddressChildren.push(<Option key={memberAddressData[i].id}>{memberAddressData[i].receiver} _ {isJSON(memberAddressData[i].region) ? JSON.parse(memberAddressData[i].region).label : ''} _ {memberAddressData[i].address}</Option>);
			}
		}

		return (
			<Card title="创建订单" className={Styles.card} bordered={false}>
				<Form>
					<Row>
						<div style={{ marginLeft: '20px' }}>
							<div style={{ height: '15px', width: '5px', background: '#818cff', display: 'inline-block', marginRight: '5px' }}></div>
							<span style={{ fontSize: '16px', fontWeight: '1000' }}>下单人信息</span>
						</div>
						<Col xl={{ span: 8 }} >
							<FormItem label="下单人" {...formItemLayout}>
								{getFieldDecorator('memberId', {
									initialValue: (modalType === 'create') ? '' : currentItem.memberId,
									rules: [{ required: true, message: '请选择下单人' }],
								})(
									<Select placeholder="请选择下单人" showSearch optionFilterProp="children" onChange={this.onMemberChangeHandle}>
										{memberChildren}
									</Select>
								)}
							</FormItem>
						</Col>
						<Col xl={{ span: 16 }}>
							<FormItem label="收获地址:"   {...formItemLayout}>
								{getFieldDecorator('receiverAddressId', {
									initialValue: (modalType === 'create') ? '' : currentItem.receiverAddressId,
									rules: [
										{
											required: true,
											message: '收获地址不能为空',
										},
									],
								})(<Select placeholder="请选择收获地址">
									{memberAddressChildren}
								</Select>)}
							</FormItem>
						</Col>
						<div style={{ marginLeft: '20px' }}>
							<div style={{ height: '15px', width: '5px', background: '#818cff', display: 'inline-block', marginRight: '5px' }}></div>
							<span style={{ fontSize: '16px', fontWeight: '1000' }}>开票信息</span>
						</div>
						<Col xl={{ span: 8 }}>
							<FormItem label="是否需要开票:"   {...formItemLayout}>
								{getFieldDecorator('needInvoice', {
									initialValue: (modalType === 'create') ? 0 : currentItem.needInvoice,
									rules: [
										{
											required: true,
											message: '下单人不能为空',
										},
									],
								})(
									<Radio.Group>
										<Radio value={1}>需要</Radio>
										<Radio value={0}>不需要</Radio>
									</Radio.Group>
								)}
							</FormItem>
						</Col>
					</Row>
				</Form>


				<FooterToolbar style={{ width }}>
					{this.getErrorInfo()}
					<Button type="primary" onClick={this.validate} loading={loading}>商品提交</Button>
				</FooterToolbar>
			</Card>
		)

	}
}
