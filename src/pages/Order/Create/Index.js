import React from 'react'
import FooterToolbar from '@/components/FooterToolbar';
import { Form, Card, Button, Row, Col, Input, Select, Radio, Icon, Popover } from 'antd'
import { connect } from 'dva';
import { isEmpty, isJSON } from '@/utils/Index'
import Styles from '../Index.less';
import Sku_sell from './Sku_sell'
const FormItem = Form.Item
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
const Option = Select.Option;

let skuDetail = [];

@connect(({ order, loading }) => ({ order, loading: loading.models.order }))
@Form.create()
export default class Index extends React.Component {

	state = {
		activeKey: '1',  //当前激活的Tab面板
		width: '100%',
		memberAddressData: [],
		isNeedInvoice: 0, //是否需要发票
		invoiceTitleType: 'personal', //是个人还是公司赠票
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
				<li key={key} className={Styles.errorListItem} onClick={() => scrollToField(key)}>
					<Icon type="cross-circle-o" className={Styles.errorIcon} />
					<div className={Styles.errorMessage}>{errors[key][0]}</div>
				</li>
			);
		});
		return (
			<span className={Styles.errorIcon}>
				<Popover
					title="表单校验信息"
					content={errorList}
					overlayClassName={Styles.errorPopover}
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

	//是否需要发票
	onNeedInvoiceHandelChange = (e) => {
		this.setState({ isNeedInvoice: e.target.value })
	}

	//是个人还是公司赠票
	onInvoiceTitleTypeHandelChange = (e) => {
		this.setState({ invoiceTitleType: e.target.value })
	}

	//数据提交
	handleSubmit = (e) => {

		const { order: { currentItem, modalType, memberData }, dispatch, form } = this.props;

		const { memberAddressData } = this.state

		e.preventDefault();
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values.skuDetail = skuDetail
				console.info('values ===', JSON.stringify(values))

				let map = {}, destOrder = [];
				if (!isEmpty(skuDetail)) {
					for (let i = 0; i < skuDetail.length; i++) {
						let skuItem = skuDetail[i];
						if (!map[skuItem.tenantId]) {
							destOrder.push({
								shopId: skuItem.tenantId,
								orderItems: [skuItem]
							});
							map[skuItem.tenantId] = skuItem;
						} else {
							for (let j = 0; j < destOrder.length; j++) {
								let dj = destOrder[j];
								if (dj.shopId == skuItem.tenantId) {
									dj.orderItems.push(skuItem);
									break;
								}
							}
						}
					}
				}
				let member = memberData.filter(item => item.id = values.memberId)[0]
				let memberAddress = memberAddressData.filter(item => item.id == values.receiverAddressId)[0]
				let orderFormData = [];
				if (!isEmpty(destOrder)) {
					for (let i = 0; i < destOrder.length; i++) {
						let orderItem = {}
						orderItem.shopId = destOrder[i].shopId
						orderItem.memberId = member.id
						orderItem.memberName = member.loginName
						orderItem.payType = values.payType
						orderItem.totalFee = values.totalFee
						orderItem.postFee = 0.0
						orderItem.receiverAddressId = values.receiverAddressId
						orderItem.receiverName = memberAddress.receiver
						orderItem.receiverRegion = memberAddress.region
						orderItem.receiverAddress = memberAddress.address
						orderItem.receiverMobile = memberAddress.mobile
						orderItem.receiverPhone = memberAddress.telephone
						orderItem.needInvoice = values.needInvoice
						orderItem.invoiceType = values.invoiceType
						orderItem.invoiceTitleType = values.invoiceTitleType
						orderItem.invoiceTitle = values.invoiceTitle
						orderItem.invoiceNo = values.invoiceNo
						orderItem.invoiceContent = values.invoiceContent
						orderItem.shopMemo = values.shopMemo
						orderItem.orderItems = []
						if (!isEmpty(destOrder[i].orderItems)) {
							for (let j = 0; j < destOrder[i].orderItems.length; j++) {
								let item = destOrder[i].orderItems[j]
								console.info('item ===', JSON.stringify(item))
								let orderItemTemp = {
									shopId: item.tenantId,
									memberId: member.id,
									memberName: member.loginName,
									categoryId: item.categoryId,
									categoryName: item.categoryName,
									brandId: item.brandId,
									brandName: item.brandName,
									goodsId: item.goodsId,
									goodsName: item.goodsName,
									skuId: item.id,
									skuCode: item.productCode,
									skuBarCode: item.barCode,
									skuImage: item.skuImage,
									skuPrice: item.salePrice,
									totalFee: item.salePrice,
									payment: item.salePrice,
								}
								orderItem.orderItems.push(orderItemTemp)
							}
						}
						orderFormData.push(orderItem)
					}
				}
				console.info('orderFormData ===', JSON.stringify(orderFormData))

				// let formData = {
				// 	shopId: '',
				// 	memberId: '',
				// 	memberName: '',
				// 	payType: '',
				// 	totalFee: '',
				// 	payment: '',
				// 	postFee: '',
				// 	receiverAddressId: '',
				// 	receiverRegion: '',
				// 	receiverAddress: '',
				// 	receiverMobile: '',
				// 	receiverPhone: '',
				// 	needInvoice: '',
				// 	invoiceType: '',
				// 	invoiceTitleType: '',
				// 	invoiceTitle: '',
				// 	invoiceNo: '',
				// 	invoiceContent: '',
				// 	shopMemo: '',
				// 	orderItems: [{
				// 		shopId: '',
				// 		memberId: '',
				// 		memberName: '',
				// 		categoryId: '',
				// 		waresId: '',
				// 		waresName: '',
				// 		skuId: '',
				// 		skuCode: '',
				// 		skuImage: '',
				// 		skuPrice: '',
				// 		totalFee: '',
				// 		payment: '',
				// 	}],
				// }

				dispatch({
					type: `order/${modalType}`,
					payload: orderFormData[0],
				});
			}
		});
	}

	render() {
		const { order: { currentItem, modalType, memberData, skuData }, loading, form: { getFieldDecorator, getFieldValue } } = this.props;

		const { width, memberAddressData, isNeedInvoice, invoiceTitleType } = this.state

		// console.info('memberData ===', memberData)
		// console.info('skuData ===', skuData)

		const sku_sell_props = {
			skuData: skuData,
			onSkuChange(sku) {
				skuDetail = sku
				// console.info('skuDetail ===', JSON.stringify(skuDetail))
			}
		}

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
				<Form onSubmit={this.handleSubmit}>
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
									<Radio.Group onChange={this.onNeedInvoiceHandelChange}>
										<Radio value={1}>需要</Radio>
										<Radio value={0}>不需要</Radio>
									</Radio.Group>
								)}
							</FormItem>
						</Col>
					</Row>
					{isNeedInvoice ? (
						<div>
							<Row>
								<Col xl={{ span: 8 }}>
									<FormItem label="发票类型:"   {...formItemLayout}>
										{getFieldDecorator('invoiceType', {
											initialValue: (modalType === 'create') ? 'normal' : currentItem.invoiceType,
											rules: [
												{
													required: true,
													message: '发票类型不能为空',
												},
											],
										})(
											<Select placeholder="请选择发票类型">
												<Option key={'normal'}>普通发票</Option>
												<Option key={'electronicNormal'}>电子普通发票</Option>
												<Option key={'addedInvoice'}>增值税专用发票</Option>
											</Select>
										)}
									</FormItem>
								</Col>
							</Row>
							<Row>
								<Col xl={{ span: 8 }}>
									<FormItem label="发票抬头:"   {...formItemLayout}>
										{getFieldDecorator('invoiceTitleType', {
											initialValue: (modalType === 'create') ? 'personal' : currentItem.invoiceTitleType,
											rules: [
												{
													required: true,
													message: '发票类型不能为空',
												},
											],
										})(
											<Radio.Group onChange={this.onInvoiceTitleTypeHandelChange}>
												<Radio value={'personal'}>个人</Radio>
												<Radio value={'company'}>公司</Radio>
											</Radio.Group>
										)}
									</FormItem>
								</Col>
							</Row>
							{(isNeedInvoice && invoiceTitleType === 'company') ? (
								<Row>
									<Col xl={{ span: 8 }}>
										<FormItem label="发票抬头:"   {...formItemLayout}>
											{getFieldDecorator('invoiceTitle', {
												initialValue: (modalType === 'create') ? '' : currentItem.invoiceTitle,
												rules: [
													{
														required: true,
														message: '发票抬头不能为空',
													},
												],
											})(
												<Input />
											)}
										</FormItem>
									</Col>
									<Col xl={{ span: 8 }}>
										<FormItem label="纳税人识别号:"   {...formItemLayout}>
											{getFieldDecorator('invoiceNo', {
												initialValue: (modalType === 'create') ? '' : currentItem.invoiceNo,
												rules: [
													{
														required: true,
														message: '纳税人识别号不能为空',
													},
												],
											})(
												<Input />
											)}
										</FormItem>
									</Col>
								</Row>
							) : null}
							<Row>
								<Col xl={{ span: 8 }}>
									<FormItem label="增值税发票内容:"   {...formItemLayout}>
										{getFieldDecorator('invoiceContent', {
											initialValue: (modalType === 'create') ? 'goods' : currentItem.invoiceContent,
											rules: [
												{
													required: true,
													message: '增值税发票内容不能为空',
												},
											],
										})(
											<Radio.Group>
												<Radio value={'goods'}>商品明细</Radio>
												<Radio value={'category'}>商品分类</Radio>
											</Radio.Group>
										)}
									</FormItem>
								</Col>
							</Row>
						</div>
					) : null}
					<Sku_sell {...sku_sell_props} />
				</Form>


				<FooterToolbar style={{ width }}>
					{this.getErrorInfo()}
					<Button type="primary" onClick={this.handleSubmit} loading={loading}>商品提交</Button>
				</FooterToolbar>
			</Card >
		)

	}
}
