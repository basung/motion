import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import BraftEditor from '@/components/OnSelfBraftEditor';


export default class Index extends PureComponent {

      onGetContent = (ref) => {
            this.BraftEditorchild = ref
      }

      getEditorContent = (e) => {
            let content = this.BraftEditorchild.getEditorContent()
            console.info('content ===', content)
      }

      render() {

            const braftEditorProps = {
                  defaultValue: ('<p>这是一个<b>BraftEditor组件!!!!</b></p><div class="media-wrap image-wrap align-center" style="text-align:center"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1539316389&di=4da2c9fb6e90cecdb1b515b5a471bc8c&src=http://img3.duitang.com/uploads/item/201608/05/20160805231205_CuWSk.jpeg" width="250px" height="250px" style="width:250px;height:250px"/></div>'),
                  onGetContent: this.onGetContent,
            }

            return (
                  <PageHeaderWrapper>
                        <div style={{ margin: '0 auto', width: '1000px', textAlign: 'center' }} >
                              <Button onClick={this.getEditorContent} type="primary" style={{marginBottom: '20px'}} >提交按钮</Button>
                              <BraftEditor {...braftEditorProps} />
                        </div>
                  </PageHeaderWrapper>
            );
      }
}




