import React from 'react'
import router from 'umi/router';
import { Form, Input, Radio, Card, Select, Button, Upload, Icon, TreeSelect } from 'antd'
import { connect } from 'dva';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { beforeUpload } from '@/utils/fileUtils';
import { isEmpty, getTrees } from '@/utils/utils';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
import BraftEditor from '@/components/OnSelfBraftEditor'
import Styles from './Index.less';
const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
// const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }

const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 7 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 10 }, }, };

const submitFormLayout = { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 10, offset: 7 }, }, };

@connect(({ article, loading }) => ({ article, loading: loading.models.article }))
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
				type: 'article/getNewsById',
				payload: {
					id: itemId,
					modalType: 'update',
				},
			});
		}
		dispatch({
			type: 'article/getCategory',
			payload: {},
		});
	}

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

	handleSubmit = e => {
		const { article: { currentItem, modalType, categoryData }, dispatch, form } = this.props;
		e.preventDefault();
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values.version = currentItem.version
				values.logo = this.state.imageUrl
				let categoryItem = categoryData.filter(item => item.id == values.categoryId)
				if (!isEmpty(categoryItem) && categoryItem.length > 0) {
					values.categoryName = categoryItem[0].name
				}
				values.details = this.BraftEditorchild.getEditorContent()
				dispatch({
					type: `article/${modalType}`,
					payload: values,
				});
			}
		});
	};

	//富文本回调函数
	onGetContent = (ref) => {
            this.BraftEditorchild = ref
      }


	render() {

		const { article: { data, categoryData, currentItem, modalType }, dispatch, loading, form: { getFieldDecorator, getFieldValue } } = this.props;

		/**
             * 树状的算法
             * @params categoryData     代转化数组
             * @params parentId 起始节点
             */
		if (!isEmpty(categoryData) && categoryData.length > 0) {
			for (let index = 0; index < categoryData.length; index++) {
				categoryData[index].title = categoryData[index].name
				categoryData[index].key = categoryData[index].id
				categoryData[index].value = categoryData[index].id
			}
		}
		let newCategoryData = (!isEmpty(categoryData) && categoryData.length > 0) ? getTrees(categoryData, 0) : [];
		let rootItem = {
			id : '0',
			key : '0',
			value: '0',
			title: '根节点分类'
		}
		newCategoryData.push(rootItem)
		let parentCodeUndefine = '0';


		//图片上传
		const uploadButton = (
			<div>
				<Icon type={this.state.uploading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">上传</div>
			</div>
		);
		const { imageUrl } = this.state;

		function onCancel() {
			router.push('/news/article/list')
		}

		const braftEditorProps = {
                  // defaultValue: ('<p>这是一个<b>BraftEditor组件!!!!</b></p><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1539316389&di=4da2c9fb6e90cecdb1b515b5a471bc8c&src=http://img3.duitang.com/uploads/item/201608/05/20160805231205_CuWSk.jpeg" width="250px" height="250px" style="width:250px;height:250px"/></div>'),
                  defaultValue:  (modalType === 'create') ? '' : currentItem.details,
                  onGetContent: this.onGetContent,
                  IMGUPURL : IMGUPURL,   //图片上传地址
                  IMGURL : IMGURL  //图片显示地址
            }

		return (
			<Card bordered={false} className={Styles.card}>
				<Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
					<FormItem label="所属分类 :"   {...formItemLayout}>
						{getFieldDecorator('categoryId', {
							initialValue: (modalType === 'create') ? parentCodeUndefine : currentItem.categoryId,
							rules: [
								{
									required: true,
									message: '所属分类不能为空',
								},
							],
						})(
							<TreeSelect
								placeholder="请选择分类根节点"
								style={{ width: '100%' }}
								dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
								treeData={newCategoryData}
								treeDefaultExpandAll
							/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="文章名" >
						{getFieldDecorator('name', {
							initialValue: (modalType === 'create') ? '' : currentItem.name,
							rules: [
								{
									required: true,
									message: '文章名不能为空',
								},
							],
						})(<Input placeholder="文章名称" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="作者" >
						{getFieldDecorator('author', {
							initialValue: (modalType === 'create') ? '' : currentItem.author,
							rules: [
								{
									required: false,
									message: '登录密码不能为空',
								},
							],
						})(<Input placeholder="文章原作者" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="文章来源" >
						{getFieldDecorator('newsSource', {
							initialValue: (modalType === 'create') ? '' : currentItem.newsSource,
							rules: [
								{
									required: false,
									message: '文章来源',
								},
							],
						})(<Input placeholder="文章来源" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="编辑" >
						{getFieldDecorator('newsEditor', {
							initialValue: (modalType === 'create') ? '' : currentItem.newsEditor,
							rules: [
								{
									required: false,
									message: '编辑',
								},
							],
						})(<Input placeholder="编辑" />)}
					</FormItem>
					<FormItem {...formItemLayout} label="文章图片" >
						{getFieldDecorator('logo', {
							initialValue: (modalType === 'create') ? '' : currentItem.logo,
							rules: [
								{
									required: true,
									message: '文章图片',
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
									(modalType === 'create') ? uploadButton : <img src={IMGURL + currentItem.logo} alt="avatar" width={'102px'} height={'102px'} />}
							</Upload>
						)}
					</FormItem>
					<FormItem label="描述"   {...formItemLayout}>
						{getFieldDecorator('description', {
							initialValue: (modalType === 'create') ? 0 : currentItem.description,
						})(<TextArea placeholder="长度<255" maxLength={255} rows={4} />)}
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
					<FormItem style={{ margin: '0 auto', width: '1000px', textAlign: 'center' }}>
						<BraftEditor { ...braftEditorProps} />
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
