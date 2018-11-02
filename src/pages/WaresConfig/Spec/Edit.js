import React from 'react'
import router from 'umi/router';
import { Form, Input, Radio, Card, Select, Button, Upload, Icon, TreeSelect } from 'antd'
import { connect } from 'dva';
import Styles from './Index.less';
import TableForm from './TableForm';
const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item

const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 7 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 10 }, }, };

const submitFormLayout = { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 10, offset: 7 }, }, };

@connect(({ spec, loading }) => ({ spec, loading: loading.models.spec }))
@Form.create()
export default class Index extends React.Component {

	state = {
		uploading: false,
		imageUrl: '',
	};

	componentDidMount() {
		console.info('componentDidMount')
		const { dispatch } = this.props;
		let itemId = this.props.match.params.id
		console.info('itemId ===', itemId)
		if (itemId !== 'id') {
			dispatch({
				type: 'spec/getItemById',
				payload: {
					id: itemId,
					modalType: 'update',
				},
			});
		}
	}

	handleSubmit = e => {
		const { spec: { currentItem, modalType }, dispatch, form } = this.props;
		e.preventDefault();
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				values.version = currentItem.version
				console.info('values ===', JSON.stringify(values))
				dispatch({
					type: `spec/${modalType}`,
					payload: values,
				});
			}
		});
	};

	render() {
		const { spec: { currentItem, modalType }, loading, form: { getFieldDecorator, getFieldValue } } = this.props;

		function onCancel() {
			router.push('/waresConfig/spec/list')
		}

		let specItemData = [];
		if(modalType === 'create'){
			specItemData = []
		}else{
			if(currentItem && currentItem.specItems && currentItem.specItems.length > 0){
				let specItems = currentItem.specItems;
				for(let index = 0; index < specItems.length; index ++){
					specItems[index].key = specItems[index].id;
				}
				specItemData = specItems;
			}
		}

		return (
			<Card bordered={false} className={Styles.card}>
				<Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
					<FormItem {...formItemLayout} label="规格名称" >
						{getFieldDecorator('specName', {
							initialValue: (modalType === 'create') ? '' : currentItem.specName,
							rules: [
								{
									required: true,
									message: '规格名称不能为空',
								},
							],
						})(<Input placeholder="规格名称" />)}
					</FormItem>
					<FormItem label="规格备注"   {...formItemLayout}>
						{getFieldDecorator('specRemark', {
							initialValue: (modalType === 'create') ? 0 : currentItem.specRemark,
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
					<div className={Styles.editableCard}>
						<Card title="规格值编辑" bordered={true} >
							{getFieldDecorator('specItems', {
								initialValue: specItemData,
							})(<TableForm />)}
						</Card>
					</div>
					<FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
						<Button type="primary" htmlType="submit" loading={loading}>提交</Button>
						<Button style={{ marginLeft: 8 }} onClick={onCancel}>返回</Button>
					</FormItem>
				</Form>
			</Card>
		)

	}
}
