import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider, Modal, Upload, Icon } from 'antd';
import isEqual from 'lodash/isEqual';
import Styles from './Index.less';
import { IMGUPURL, IMGURL } from '@/utils/api_evn'
import { getLocalStorageEnhance } from '@/utils/localStorageUtils'
import { beforeUpload } from '@/utils/fileUtils';

class TableForm extends PureComponent {
	index = 0;

	cacheOriginData = {};

	constructor(props) {
		super(props);

		this.state = {
			data: props.value,
			loading: false,
			/* eslint-disable-next-line react/no-unused-state */
			value: props.value,

			imageUrl: '',
			uploading: false,

			previewVisible: false,
			previewImageUrl: ''
		};
	}

	//列表图片预览
	previewImage = (url) => {
		console.info('url ===', url)
		this.setState({ previewVisible: true, previewImageUrl: url })
	}
	//关闭图片预览弹出框
	onCancelPreviewImage = () => {
		this.setState({ previewVisible: false })
	}

	static getDerivedStateFromProps(nextProps, preState) {
		if (isEqual(nextProps.value, preState.value)) {
			return null;
		}
		return {
			data: nextProps.value,
			value: nextProps.value,
		};
	}

	//获取正在编辑的行
	getRowByKey(key, newData) {
		const { data } = this.state;
		return (newData || data).filter(item => item.key === key)[0];
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

	newMember = () => {
		const { data } = this.state;
		const newData = data.map(item => ({ ...item }));
		newData.push({
			key: `NEW_TEMP_ID_${this.index}`,
			specValue: '',
			specLogo: '',
			editable: true,
			isNew: true,
		});
		this.index += 1;
		this.setState({ data: newData });
	};

	remove(key) {
		const { data } = this.state;
		const { onChange } = this.props;
		const newData = data.filter(item => item.key !== key);
		this.setState({ data: newData });
		onChange(newData);
	}

	handleKeyPress(e, key) {
		if (e.key === 'Enter') {
			this.saveRow(e, key);
		}
	}

	handleFieldChange(e, fieldName, key) {
		const { data } = this.state;
		const newData = data.map(item => ({ ...item }));
		const target = this.getRowByKey(key, newData);
		if (target) {
			target[fieldName] = e.target.value;
			this.setState({ data: newData });
		}
	}

	//图片上传事件
	handleFieldImageChange = (info, fieldName, key) => {
		console.info('fieldName ===', fieldName)
		console.info('key ===', key)
		if (info.file.status === 'uploading') {
			this.setState({ uploading: true });
			return;
		}
		if (info.file.status === 'done') {
			let response = info.file ? info.file.response : false
			if (response && response.status == 200) {

				// this.setState({ imageUrl: response.data.filePath, uploading: false }, () => {

				// })
				const { data, uploading } = this.state;
				const newData = data.map(item => ({ ...item }));
				const target = this.getRowByKey(key, newData);
				if (target) {
					target[fieldName] = response.data.filePath;
					this.setState({ data: newData, uploading: false });
				}
			}
		}
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
			if (!target.specValue || !target.specLogo) {
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
			const { onChange } = this.props;
			onChange(data);
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

	render() {

		const { imageUrl, previewImageUrl, previewVisible } = this.state

		//图片上传
		const uploadButton = (
			<div>
				<Icon type={this.state.uploading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">上传</div>
			</div>
		);

		const columns = [
			{
				title: '规格值',
				dataIndex: 'specValue',
				key: 'specValue',
				width: '60%',
				align: 'center',
				render: (text, record) => {
					if (record.editable) {
						return (
							<div style={{ textAlign: 'center' }}>
								<Input
									value={text}
									autoFocus
									onChange={e => this.handleFieldChange(e, 'specValue', record.key)}
									onKeyPress={e => this.handleKeyPress(e, record.key)}
									placeholder="规格值 eg: 红色"
								/>
							</div>
						);
					}
					return text;
				},
			},
			{
				title: '规格值图片',
				dataIndex: 'specLogo',
				key: 'specLogo',
				width: '200px',
				align: 'center',
				render: (text, record) => {
					if (record.editable) {
						return (
							<div style={{ marginLeft: '48px' }}>
								<Upload
									name="uploadFile"
									listType="picture-card"
									className="avatar-uploader"
									headers={{ Authorization: getLocalStorageEnhance('Authorization') }}
									showUploadList={false}
									action={IMGUPURL}
									beforeUpload={beforeUpload}
									onChange={info => this.handleFieldImageChange(info, 'specLogo', record.key)}
								>
									{text ? <img src={IMGURL + text} alt="avatar" width={'102px'} height={'102px'} /> : uploadButton}
								</Upload>
							</div>
						);
					}
					return (<a onClick={e => this.previewImage(text)}><img height={'102px'} src={IMGURL + text} style={{ borderRadius: '5%' }} /></a>);
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
		];

		const { loading, data } = this.state;

		return (
			<Fragment>
				<div className={Styles.editable}>
					<Table
						loading={loading}
						columns={columns}
						dataSource={data}
						pagination={false}
						// rowClassName={record => (record.editable ? Styles.editable : '')}
						bordered={true}
					/>
				</div>
				<Button
					style={{ width: '90%', marginTop: 16, marginBottom: 8, textAlign: 'center' }}
					type="dashed"
					onClick={this.newMember}
					icon="plus"
				>新增规格值</Button>
				<Modal
					visible={previewVisible}
					onCancel={this.onCancelPreviewImage}
					footer={null}
				>
					<img src={IMGURL + previewImageUrl} width={'100%'} />
				</Modal>
			</Fragment>
		);
	}
}

export default TableForm;
