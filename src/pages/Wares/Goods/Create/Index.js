import React from 'react'
import FooterToolbar from '@/components/FooterToolbar';
import { Form, Tabs, Card, Button, message } from 'antd'
import { connect } from 'dva';
import Styles from '../Index.less';
import StepOne from './Step_1';
import StepTwo from './Step_2';
import StepThree from './Step_3';
import StepFour from './Step_4';
const TabPane = Tabs.TabPane;

@connect(({ goods, loading }) => ({ goods, loading: loading.models.goods }))
@Form.create()
export default class Index extends React.Component {

	state = {
		activeKey: '1',  //当前激活的Tab面板
		width: '100%'
	};

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({
			type: 'goods/getGoodsRelationData'
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

	validate = () => {

		const { activeKey } = this.state

		const stepOneContent = this.stepOneChild.getEditorContent()
		const stepTwoContent = this.stepTwoChild.getEditorContent()
		const stepThreeContent = this.stepThreeChild.getEditorContent()
		const stepFourContent = this.stepFourChild.getEditorContent()

		if (activeKey === '1' && !stepOneContent.errors) {
			this.setState({ activeKey: '2' })
		} else if (activeKey === '2' && !stepTwoContent.errors) {
			this.setState({ activeKey: '3' })
		} else if (activeKey === '3') {
			this.setState({ activeKey: '4' })
		} else if (activeKey === '4') {
			if (stepOneContent.errors) {
				this.setState({ activeKey: '1' })
				message.error(' 请完善商品数据,再提交商品!!! ')
			} else if (stepTwoContent.errors) {
				this.setState({ activeKey: '2' })
				message.error(' 请完善商品SKU数据,再提交商品!!! ')
			} else {
				let formData = { ...stepOneContent, ...stepTwoContent, ...stepThreeContent, ...stepFourContent }
				this.handleSubmit(formData)
			}
		}
	};

	//数据提交
	handleSubmit(formData) {
		const { goods: { modalType }, dispatch } = this.props;
		try {
			// console.info('formData ===', JSON.stringify(formData))
			dispatch({
				type: `goods/${modalType}`,
				payload: formData,
			});
		} catch (err) {
			message.error("数据提交失败,  失败原因: " + err);
		}
	}

	//tab面板点击事件
	handleTabClick = (key) => {
		this.setState({ activeKey: key })
	}

	//商品基础信息
	onGetStepOneContent = (ref) => {
		this.stepOneChild = ref
	}

	//商品规格信息
	onGetStepTwoContent = (ref) => {
		this.stepTwoChild = ref
	}

	//商品扩展属性
	onGetStepThreeContent = (ref) => {
		this.stepThreeChild = ref
	}

	//富文本回调函数
	onGetStepFourContent = (ref) => {
		this.stepFourChild = ref
	}

	render() {
		const { goods: { currentItem, modalType, brandData, tagsData, categoryData, specData }, loading, form: { getFieldDecorator, getFieldValue } } = this.props;

		const { activeKey, width } = this.state

		const operations = <Button type="primary" >商品提交</Button>;

		const stepOneProps = {
			brandData: brandData,
			tagsData: tagsData,
			categoryData: categoryData,
			currentItem: currentItem,
			modalType: modalType,
			onGetStepOneContent: this.onGetStepOneContent,
		}

		const stepTwoProps = {
			specData: specData,
			currentItem: currentItem,
			modalType: modalType,
			onGetStepTwoContent: this.onGetStepTwoContent,
		}

		const stepThreeProps = {
			currentItem: currentItem,
			modalType: modalType,
			onGetStepThreeContent: this.onGetStepThreeContent,
		}

		const stepFourProps = {
			currentItem: currentItem,
			modalType: modalType,
			onGetStepFourContent: this.onGetStepFourContent,
		}

		return (
			<Card bordered={false} className={Styles.card}>
				<Tabs activeKey={activeKey} tabBarExtraContent={operations} tabPosition={'top'} onTabClick={this.handleTabClick}>
					<TabPane forceRender={true} tab="商品基础信息" key="1" ><StepOne {...stepOneProps} /></TabPane>
					<TabPane forceRender={true} tab="商品规格信息" key="2"><StepTwo {...stepTwoProps} /></TabPane>
					<TabPane forceRender={true} tab="商品扩展属性" key="3"><StepThree {...stepThreeProps} /></TabPane>
					<TabPane forceRender={true} tab="编辑商品详情" key="4"><StepFour {...stepFourProps} /></TabPane>
				</Tabs>
				<FooterToolbar style={{ width }}>
					{this.getErrorInfo()}
					<Button type="primary" onClick={this.validate} loading={loading}>商品提交</Button>
				</FooterToolbar>
			</Card>
		)

	}
}
