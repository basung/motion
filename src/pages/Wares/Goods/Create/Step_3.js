import React, { PureComponent, Fragment } from 'react';
import { Form, Input, Button, Table, Divider, Popconfirm, message, Card } from 'antd'
import isEqual from 'lodash/isEqual';
import BraftEditor from '@/components/OnSelfBraftEditor'
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { isEmpty, generateUUID } from '@/utils/Index';
import Styles from '../Index.less';
const FormItem = Form.Item

const formItemLayout = { labelCol: { xs: { span: 24 }, sm: { span: 7 }, }, wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 10 }, }, };


@Form.create()
export default class Index extends React.Component {
	index = 0;
	cacheOriginData = {};
	constructor(props) {
		super(props);
		this.state = {
			data: [
				// {
				// 	key: generateUUID(),
				// 	ids: generateUUID(),
				// 	attrName: '',
				// 	attrValue: '',
				// 	editable: true,
				// 	isNew: true,
				// }
			],
			loading: false,
			value: [],

			//用户商品回显使用的临时变量
			newCurrentItem: {}
		};
	}

	componentDidMount() {
		this.props.onGetStepThreeContent(this)
	}

	getEditorContent = () => {
		let { data } = this.state
		let formData = {}
		const htmlContent = this.BraftEditorchild.getEditorContent()
		formData.goodsParameter = htmlContent
		formData.goodsAttributeList = data
		return formData
	}

	//创建属性值
	creatAttr = (e) => {
		const { data } = this.state;
		let attrData = {
			key: generateUUID(),
			ids: generateUUID(),
			attrName: '',
			attrValue: '',
			editable: true,
			isNew: true
		}
		data.push(attrData)
		this.setState({ data }, () => {

		})
	};


	//获取正在编辑的行
	getRowByKey(key, newData) {
		const { data } = this.state;
		return (newData || data).filter(item => item.key === key)[0];
	}

	saveRow(e, key) {
		e.persist();
		this.setState({ loading: true });
		setTimeout(() => {
			if (this.clickedCancel) {
				this.clickedCancel = false;
				return;
			}
			const target = this.getRowByKey(key) || {};
			if (!target.attrName || !target.attrValue) {
				message.error('请填写完整规格值信息。');
				e.target.focus();
				this.setState({
					loading: false,
				});
				return;
			}
			delete target.isNew;
			this.toggleEditable(e, key);
			const { data } = this.state;
			this.setState({
				loading: false,
			});
		}, 500);
	}

	cancel(e, key) {
		this.clickedCancel = true;
		e.preventDefault();
		const { data } = this.state;
		const newData = data.map(item => ({ ...item }));
		const target = this.getRowByKey(key, newData);
		if (this.cacheOriginData[key]) {
			Object.assign(target, this.cacheOriginData[key]);
			delete this.cacheOriginData[key];
		}
		target.editable = false;
		this.setState({ data: newData });
		this.clickedCancel = false;
	}


	/**
	 * 属性编辑
	 * @param {*} e 			记录编辑的值
	 * @param {*} fieldName 	记录编辑的是哪一个cell
	 * @param {*} key 		记录编辑的是那一列
	 */
	handleFieldChange(e, fieldName, key) {
		let { data } = this.state
		const target = data.filter(item => item.key == key)[0];
		// console.info('target ==', target)
		if (target) {
			target[fieldName] = e.target.value;
			this.setState({ data });
		}
	}

	//监听回车键
	handleKeyPress(e, key) {
		if (e.key === 'Enter') {
			this.saveRow(e, key);
		}
	}

	toggleEditable = (e, key) => {
		e.preventDefault();
		const { data } = this.state;
		const newData = data.map(item => ({ ...item }));
		const target = this.getRowByKey(key, newData);
		if (target) {
			// 进入编辑状态时保存原始数据
			if (!target.editable) {
				this.cacheOriginData[key] = { ...target };
			}
			target.editable = !target.editable;
			this.setState({ data: newData });
		}
	};

	remove(key) {
		const { data } = this.state;
		const newData = data.filter(item => item.key !== key);
		this.setState({ data: newData });
	}

	//富文本回调函数
	onGetContent = (ref) => {
		this.BraftEditorchild = ref
	}

	render() {
		const { currentItem, modalType, form: { getFieldDecorator, getFieldValue } } = this.props;

		const { loading, data } = this.state;

		// console.info('data ===', JSON.stringify(data))

		const columns = [
			{
				title: '属性名',
				dataIndex: 'attrName',
				key: 'attrName',
				width: '40%',
				align: 'center',
				render: (text, record) => {
					if (record.editable) {
						return (
							<div style={{ textAlign: 'center' }}>
								<Input
									autoFocus
									value={text}
									onChange={e => this.handleFieldChange(e, 'attrName', record.key)}
									onKeyPress={e => this.handleKeyPress(e, record.key)}
									placeholder="属性名 eg: 重量"
								/>
							</div>
						);
					}
					return text;
				},
			},
			{
				title: '属性值',
				dataIndex: 'attrValue',
				key: 'attrValue',
				width: '40%',
				align: 'center',
				render: (text, record) => {
					if (record.editable) {
						return (
							<div style={{ textAlign: 'center' }}>
								<Input
									value={text}
									onChange={e => this.handleFieldChange(e, 'attrValue', record.key)}
									onKeyPress={e => this.handleKeyPress(e, record.key)}
									placeholder="属性值 eg: 100KG"
								/>
							</div>
						);
					}
					return text;
				},
			},
			{
				title: '操作',
				key: 'action',
				align: 'center',
				render: (text, record) => {
					const { loading } = this.state;
					if (!!record.editable && loading) {
						return null;
					}
					if (record.editable) {
						if (record.isNew) {
							return (
								<span>
									<a onClick={e => this.saveRow(e, record.key)}>添加</a>
									<Divider type="vertical" />
									<Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
										<a>删除</a>
									</Popconfirm>
								</span>
							);
						}
						return (
							<span>
								<a onClick={e => this.saveRow(e, record.key)}>保存</a>
								<Divider type="vertical" />
								<a onClick={e => this.cancel(e, record.key)}>取消</a>
							</span>
						);
					}
					return (
						<span>
							<a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
							<Divider type="vertical" />
							<Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
								<a>删除</a>
							</Popconfirm>
						</span>
					);
				},
			},
		]

		const braftEditorProps = {
			// defaultValue: ('<p>这是一个<b>BraftEditor组件!!!!</b></p><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1539316389&di=4da2c9fb6e90cecdb1b515b5a471bc8c&src=http://img3.duitang.com/uploads/item/201608/05/20160805231205_CuWSk.jpeg" width="250px" height="250px" style="width:250px;height:250px"/></div>'),
			defaultValue: (modalType === 'create') ? '该处添加商品参数图片' : currentItem.goodsParameter,
			onGetContent: this.onGetContent,
			IMGUPURL: IMGUPURL,   //图片上传地址
			IMGURL: IMGURL,  //图片显示地址
			width: 980
		}

		return (
			<Fragment>
				<div style={{ border: '1px dashed #fff', width: '1000px', margin: '0 auto', padding: '10px', marginBottom: '20px' }}>
					<Card title="商品扩展属性设置" style={{ marginBottom: '20px' }}>
						<Form>
							<Form.Item>
								{getFieldDecorator('attrItemList', {
									initialValue: (modalType === 'create') ? '' : currentItem.attrItemList,
									rules: [{ required: true, message: '商品名称不能为空' }],
								})(
									<Table
										size={'small'}
										loading={loading}
										rowKey={'ids'}
										columns={columns}
										dataSource={data}
										pagination={false}
										bordered={true}
									/>
								)}
							</Form.Item>
						</Form>
						<div style={{ width: '900px', margin: '0 auto', textAlign: 'center' }}>
							<Button
								style={{ width: '100%', marginBottom: 8, textAlign: 'center' }}
								type="dashed"
								onClick={e => this.creatAttr()}
								icon="plus"
							>添加属性</Button>
						</div>
					</Card>
					<BraftEditor {...braftEditorProps} />
				</div>
			</Fragment>
		)

	}
}
