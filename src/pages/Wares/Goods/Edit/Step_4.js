import React from 'react'
import {  } from 'antd'
import BraftEditor from '@/components/OnSelfBraftEditor'
import { IMGUPURL, IMGURL } from '@/utils/api_evn'

export default class Index extends React.Component {

	state = { };

	componentDidMount() { 
		this.props.onGetStepFourContent(this)
	}

	getEditorContent = () => {
		const formData = { goodsDetails: this.BraftEditorchild.getEditorContent() }
		return formData
	}

	//富文本回调函数
	onGetContent = (ref) => {
		this.BraftEditorchild = ref
	}

	render() {

		const {  currentItem, modalType, loading } = this.props;

		const braftEditorProps = {
			// defaultValue: ('<p>这是一个<b>BraftEditor组件!!!!</b></p><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1539316389&di=4da2c9fb6e90cecdb1b515b5a471bc8c&src=http://img3.duitang.com/uploads/item/201608/05/20160805231205_CuWSk.jpeg" width="250px" height="250px" style="width:250px;height:250px"/></div>'),
			defaultValue: (modalType === 'create') ? '' : currentItem.goodsDetails,
			onGetContent: this.onGetContent,
			IMGUPURL: IMGUPURL,   //图片上传地址
			IMGURL: IMGURL,  //图片显示地址
			width: 1200
		}

		return (
			<div style={{ margin: '0 auto', width: '1200px', height:'800px',  textAlign: 'center' }} >
				<BraftEditor {...braftEditorProps} />
			</div>
		)

	}
}
