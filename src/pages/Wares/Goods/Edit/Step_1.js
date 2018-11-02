import React from 'react'
import { Form, Input, Card, Select, Modal, Upload, Icon, TreeSelect, Row, Col, message } from 'antd'
import isEqual from 'lodash/isEqual';
import { isEmpty, getTrees } from '@/utils/utils';
import { beforeUpload } from '@/utils/fileUtils';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
import Styles from '../Index.less';
const { TextArea } = Input;
const Option = Select.Option;

@Form.create()
export default class Index extends React.Component {

	state = {
		//图片主图上传
		uploading: false,
		imageUrl: this.props.type === 'create' ? '' : this.props.currentItem.goodsDefaultImage,

		// 图片Banner上传
		previewVisible: false,
		previewImage: '',
		thumbnail: '',
		fileList: [],

		//用户商品回显使用
		newCurrentItem: {}
	};

	componentDidMount() {
		this.props.onGetStepOneContent(this)
	}

	//图片回显
	static getDerivedStateFromProps(nextProps, preState) {
		if (!isEqual(nextProps.currentItem, preState.newCurrentItem)) {
			let { currentItem, modalType } = nextProps
			let fileList = []
			if (modalType === 'update' && !isEmpty(currentItem) && !isEmpty(currentItem.goodsImageList) && currentItem.goodsImageList.length > 0) {
				let goodsImageList = currentItem.goodsImageList
				for (let index = 0; index < goodsImageList.length; index++) {
					let file = {};
					file = {
						uid: goodsImageList[index].id,
						name: 'xxx.png',
						status: 'done',
						url: IMGURL + goodsImageList[index].imagePath,
						path: goodsImageList[index].imagePath,
					}
					fileList.push(file);
				}
				return {
					fileList: fileList,
					newCurrentItem: currentItem,
				};
			} else {
				return null
			}
		} else {
			return null
		}
	}

	getEditorContent = () => {

		const { imageUrl, fileList } = this.state
		const { brandData, tagsData, categoryData, currentItem } = this.props

		let formData = {}
		this.props.form.validateFieldsAndScroll((errors) => {
			if (errors) {
				formData = { errors: true }
				message.error(' 请完善商品数据!!! ')
				return
			}
			const data = {
				...this.props.form.getFieldsValue(),
			}

			//商品tags处理
			let tagsArr = data.tagsList
			let tagsList = []
			if (!isEmpty(tagsData) && tagsData.length > 0 && !isEmpty(tagsArr) && tagsArr.length > 0) {
				for (let i = 0; i < tagsArr.length; i++) {
					for (let j = 0; j < tagsData.length; j++) {
						if (tagsArr[i] == tagsData[j].id) {
							let tag = {
								goodsTagsId: tagsData[j].id,
								goodsTagsName: tagsData[j].tagsName,
								goodsName: data.goodsName,
							}
							tagsList.push(tag)
						}
					}
				}
			}
			data.goodsTagsList = tagsList;

			//商品分类处理
			let category = categoryData.filter(item => item.id == data.categoryId)[0]
			if (category) {
				data.categoryName = category.categoryName
			}

			//商品品牌处理
			let brand = brandData.filter(item => item.id == data.brandId)[0]
			if (brand) {
				data.brandName = brand.brandName
			}

			//商品主图
			data.goodsDefaultImage = imageUrl
			//图片列表数据
			// console.info('fileList ==商品基础信息==', JSON.stringify(fileList))
			const goodsImageList = [];
			for (let i = 0; i < fileList.length; i++) {
				if (fileList[i].url) {
					let image = { imagePath: fileList[i].path }
					goodsImageList.push(image)
				} else {
					let image = { imagePath: fileList[i].response.data.filePath }
					goodsImageList.push(image)
				}
			}
			data.goodsImageList = goodsImageList
			// console.info('data ==商品基础信息==', JSON.stringify(data))

			data.version = currentItem.version
			data.tenantId = currentItem.tenantId
			data.creator = currentItem.creator
			formData = data
		})
		return formData
	}

	//图片上传主图
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

	//图片上传Banner
	handleBannerCancel = () => this.setState({ previewVisible: false })
	handleBannerPreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	}
	handleBannerChange = ({ fileList }) => this.setState({ fileList })

	render() {
		const { currentItem, modalType, brandData, tagsData, categoryData, form: { getFieldDecorator } } = this.props;

		const { imageUrl, previewVisible, previewImage, fileList } = this.state

		//商品标签回显示
		const goodsTagsArr = []
		if (modalType === 'update' && !isEmpty(currentItem) && !isEmpty(currentItem.goodsTagsList) && currentItem.goodsTagsList.length > 0) {
			let goodsTagsListTemp = currentItem.goodsTagsList
			for (let index = 0; index < goodsTagsListTemp.length; index++) {
				goodsTagsArr.push(goodsTagsListTemp[index].goodsTagsId)
			}
		}

		/**
		 * 商品分类使用
             * 树状的算法
             * @params list     代转化数组
             * @params parentId 起始节点
             */
		if (!isEmpty(categoryData) && categoryData.length > 0) {
			for (let index = 0; index < categoryData.length; index++) {
				categoryData[index].title = categoryData[index].categoryName
				categoryData[index].key = categoryData[index].id
				categoryData[index].value = categoryData[index].id
			}
		}
		let catergoryChild = (!isEmpty(categoryData) && categoryData.length > 0) ? getTrees(categoryData, 0) : [];

		/**
		 * 商品品牌
		 */
		const brandChild = [];
		if (!isEmpty(brandData) && brandData.length > 0) {
			for (let index = 0; index < brandData.length; index++) {
				brandChild.push(<Option key={brandData[index].id}>{brandData[index].brandName}</Option>);
			}
		}

		/**
		 * 商品标签
		 */
		const tagsChildren = [];
		if (!isEmpty(tagsData) && tagsData.length > 0) {
			for (let i = 0; i < tagsData.length; i++) {
				tagsChildren.push(<Option key={tagsData[i].id}>{tagsData[i].tagsName}</Option>);
			}
		}

		//商品主图上传
		const uploadButton = (
			<div>
				<Icon type={this.state.uploading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">上传</div>
			</div>
		);

		return (
			<div>
				<Card title="商品分类信息" className={Styles.card} bordered={false}>
					<Form layout="vertical">
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品类型">
									{getFieldDecorator('goodsType', {
										initialValue: (modalType === 'create') ? 1 : currentItem.goodsType,
										rules: [{ required: true, message: '请选择商品类型' }],
									})(<Select style={{ width: "100%" }}>
										<Option value={1}>实物商品(物流发货)</Option>
										<Option value={2}>虚拟商品(无需物流)</Option>
									</Select>)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
								<Form.Item label="商品分类">
									{getFieldDecorator('categoryId', {
										initialValue: (modalType === 'create') ? '' : currentItem.categoryId,
										rules: [{ required: true, message: '请选择商品所属分类' }],
									})(
										<TreeSelect
											placeholder="请选择商品分类"
											style={{ width: '100%' }}
											dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
											treeData={catergoryChild}
											treeDefaultExpandAll
										/>
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
								<Form.Item label="商品标签">
									{getFieldDecorator('tagsList', {
										initialValue: (modalType === 'create') ? [] : goodsTagsArr,
										rules: [{ required: false, message: '请选择商品标签' }],
									})(
										<Select placeholder="请选择商品标签" mode="tags" showSearch optionFilterProp="children">
											{tagsChildren}
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品品牌">
									{getFieldDecorator('brandId', {
										initialValue: (modalType === 'create') ? '' : currentItem.brandId,
										rules: [{ required: true, message: '请选择商品品牌' }],
									})(
										<Select placeholder="请选择商品所属品牌" showSearch optionFilterProp="children">
											{brandChild}
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
				<div style={{ height: '30px', width: "120%", background: "#f2f4f6" }}></div>
				<Card title="商品基础信息" className={Styles.card} bordered={false}>
					<Form layout="vertical">
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品名称">
									{getFieldDecorator('goodsName', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsName,
										rules: [{ required: true, message: '商品名称不能为空' }],
									})(
										<Input placeholder="请输入商品名称, 长度 < 64" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
								<Form.Item label="商品编码">
									{getFieldDecorator('goodsCode', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsCode,
										rules: [{ required: false, message: '请输入商品编码' }],
									})(
										<Input placeholder="请输入商品编码" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
								<Form.Item label="商品条码">
									{getFieldDecorator('barCode', {
										initialValue: (modalType === 'create') ? '' : currentItem.barCode,
										rules: [{ required: false, message: '请输入商品条码' }],
									})(
										<Input placeholder="请输入商品条码" />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品销售价格">
									{getFieldDecorator('salePrice', {
										initialValue: (modalType === 'create') ? '' : currentItem.salePrice,
										rules: [{ required: true, message: '商品销售价格不能为空' }],
									})(
										<Input placeholder="请输入商品销售价格" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
								<Form.Item label="商品市场价格">
									{getFieldDecorator('marketPrice', {
										initialValue: (modalType === 'create') ? '' : currentItem.marketPrice,
										rules: [{ required: false, message: '商品市场价格能为空' }],
									})(
										<Input placeholder="请输入商品市场价格" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
								<Form.Item label="商品成本价格">
									{getFieldDecorator('costPrice', {
										initialValue: (modalType === 'create') ? '' : currentItem.costPrice,
										rules: [{ required: false, message: '商品成本价格不能为空' }],
									})(
										<Input placeholder="请输入商品成本价格" />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品买点">
									{getFieldDecorator('buyingPoint', {
										initialValue: (modalType === 'create') ? '' : currentItem.buyingPoint,
										rules: [{ required: true, message: '商品买点不能为空' }],
									})(
										<Input placeholder="请输入商品买点, 长度 < 64" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
								<Form.Item label="商品积分">
									{getFieldDecorator('goodsScore', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsScore,
										rules: [{ required: false, message: '商品积分不能为空' }],
									})(
										<Input placeholder="请输入商品积分" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
								<Form.Item label="商品最小购买量">
									{getFieldDecorator('minBuy', {
										initialValue: (modalType === 'create') ? 1 : currentItem.minBuy,
										rules: [{ required: false, message: '商品最小购买量不能为空' }],
									})(
										<Input placeholder="请输入商品最小购买量" />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品单位">
									{getFieldDecorator('goodsUnit', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsUnit,
										rules: [{ required: false, message: '请选择商品单位' }],
									})(
										<Input placeholder="请选择商品单位" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
								<Form.Item label="商品关键词">
									{getFieldDecorator('goodsKeyword', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsKeyword,
										rules: [{ required: false, message: '商品商品关键词' }],
									})(
										<TextArea maxLength={255} rows={4} placeholder="例如：进口奶粉，幼儿奶粉   逗号分隔,长度<256" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
								<Form.Item label="商品简介">
									{getFieldDecorator('goodsBrief', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsBrief,
										rules: [{ required: false, message: '商品简介' }],
									})(
										<TextArea maxLength={255} rows={4} placeholder="例如：进口奶粉，幼儿奶粉   逗号分隔,长度<256" />
									)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
				<div style={{ height: '30px', width: "120%", background: "#f2f4f6" }}></div>
				<Card title="商品生产信息" className={Styles.card} bordered={false}>
					<Form layout="vertical">
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品生产厂家">
									{getFieldDecorator('manufacturer', {
										initialValue: (modalType === 'create') ? '' : currentItem.manufacturer,
										rules: [{ required: false, message: '商品生产厂家不能为空' }],
									})(
										<Input placeholder="请输入商品生产厂家" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
								<Form.Item label="商品货号">
									{getFieldDecorator('productNumber', {
										initialValue: (modalType === 'create') ? '' : currentItem.productNumber,
										rules: [{ required: false, message: '请输入商品货号' }],
									})(
										<Input placeholder="请输入商品货号" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
								<Form.Item label="商品重量">
									{getFieldDecorator('goodsWeight', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsWeight,
										rules: [{ required: false, message: '请选择商品重量' }],
									})(
										<Input placeholder="请选择商品重量" />
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品库存">
									{getFieldDecorator('stockNum', {
										initialValue: (modalType === 'create') ? '' : currentItem.stockNum,
										rules: [{ required: true, message: '商品库存不能为空' }],
									})(
										<Input placeholder="请输入商品库存" />
									)}
								</Form.Item>
							</Col>
							<Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
								<Form.Item label="无库存是否可购买">
									{getFieldDecorator('noStockBuy', {
										initialValue: (modalType === 'create') ? 0 : currentItem.noStockBuy,
										rules: [{ required: true, message: '请选择库存状态' }],
									})(
										<Select style={{ width: "100%" }}>
											<Option value={0}>可购买(无库存状态)</Option>
											<Option value={1}>不可购买(无库存状态)</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
				<div style={{ height: '30px', width: "120%", background: "#f2f4f6" }}></div>
				<Card title="商品图片信息" className={Styles.card} bordered={false}>
					<Form layout="vertical">
						<Row gutter={16}>
							<Col lg={6} md={12} sm={24}>
								<Form.Item label="商品列表图片">
									{getFieldDecorator('goodsDefaultImage', {
										initialValue: (modalType === 'create') ? '' : currentItem.goodsDefaultImage,
										rules: [{ required: false, message: '商品列表图片不能为空' }],
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
												(modalType === 'create') ? uploadButton : <img src={IMGURL + currentItem.goodsDefaultImage} alt="avatar" width={'102px'} height={'102px'} />}
										</Upload>
									)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
					<Form layout="vertical">
						<Row gutter={16}>
							<Col lg={24} md={12} sm={24}>
								<Form.Item label="商品Banner图">
									{getFieldDecorator('imageList', {
										initialValue: (modalType === 'create') ? '' : currentItem.imageList,
										rules: [{ required: false, message: '商品Banner图不能为空' }],
									})(
										<div className="clearfix">
											<Upload
												name="uploadFile"
												listType="picture-card"
												headers={{ Authorization: getLocalStorageEnhance('Authorization') }}
												action={IMGUPURL}
												fileList={fileList}
												onPreview={this.handleBannerPreview}
												onChange={this.handleBannerChange}
											>
												{fileList.length >= 10 ? null : uploadButton}
											</Upload>
											<Modal visible={previewVisible} footer={null} onCancel={this.handleBannerCancel}>
												<img alt="example" style={{ width: '100%' }} src={previewImage} />
											</Modal>
										</div>
									)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
			</div>
		)

	}
}
