import React, { PureComponent } from 'react';
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'


export default class Index extends PureComponent {

      state = {
            editorState: '',
      }

      async componentDidMount() {

            // 1、假设此处从服务端获取html格式的编辑器内容
            // const htmlContent = await fetchEditorContent()

            // 2、使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
            // this.setState({
            //       editorState: BraftEditor.createEditorState(htmlContent)
            // })


            // 3、将raw格式的数据转换成editorState
            // const rawString = `{"blocks":[{"key":"9hu83","text":"Hello World!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":6,"length":5,"style":"BOLD"},{"offset":6,"length":5,"style":"COLOR-F32784"}],"entityRanges":[],"data":{}}],"entityMap":{}}`;
            // this.setState({
            //       editorState: EditorState.createFrom(rawString)
            // })

            // 4、将html字符串转换成editorState
            // const htmlString = `<p>Hello <b>World!</b></p>`
            // this.setState({
            //       editorState: BraftEditor.createEditorState(htmlString)
            // })

            this.props.onGetContent(this)

      }

      //获取编辑器的内容
      getEditorContent = () => {
            // 在编辑器获得焦点时按下ctrl+s会执行此方法
            // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
            const htmlContent = this.state.editorState.toHTML()
            // const result = await saveEditorContent(htmlContent)
            // console.info('htmlContent ===', htmlContent)
            return htmlContent
      }

      handleEditorChange = (editorState) => {
            this.setState({ editorState })
      }


      //预览
      preview = () => {
            if (window.previewWindow) {
                  window.previewWindow.close()
            }
            window.previewWindow = window.open()
            window.previewWindow.document.write(this.buildPreviewHtml())
            window.previewWindow.document.close()
      }
      buildPreviewHtml() {
            return `
              <!Doctype html>
              <html>
                <head>
                  <title>Preview Content</title>
                  <style>
                    html,body{
                      height: 100%;
                      margin: 0;
                      padding: 0;
                      overflow: auto;
                      background-color: #f1f2f3;
                    }
                    .container{
                      box-sizing: border-box;
                      width: 1000px;
                      max-width: 100%;
                      min-height: 100%;
                      margin: 0 auto;
                      padding: 30px 20px;
                      overflow: hidden;
                      background-color: #fff;
                      border-right: solid 1px #eee;
                      border-left: solid 1px #eee;
                    }
                    .container img,
                    .container audio,
                    .container video{
                      max-width: 100%;
                      height: auto;
                    }
                    .container p{
                      white-space: pre-wrap;
                      min-height: 1em;
                    }
                    .container pre{
                      padding: 15px;
                      background-color: #f1f1f1;
                      border-radius: 5px;
                    }
                    .container blockquote{
                      margin: 0;
                      padding: 15px;
                      background-color: #f1f1f1;
                      border-left: 3px solid #d1d1d1;
                    }
                  </style>
                </head>
                <body>
                  <div class="container">${this.state.editorState.toHTML()}</div>
                </body>
              </html>
            `
      }



      render() {

            const { defaultValue } = this.props

            const { editorState } = this.state

            const controls = ['undo', 'redo', 'separator',
                  'font-size', 'font-family', 'line-height', 'letter-spacing', 'separator',
                  'text-color', {
                        key: 'bold', // 使用key来指定控件类型
                        // title: '加粗选中文字哦', // 自定义控件title
                        // text: '点我加粗', // 使用自定义文案来代替默认图标(B)，此处也可传入jsx
                  },
                  'italic', 'underline', 'strike-through', 'separator',
                  'superscript', 'subscript', 'remove-styles', 'emoji', 'text-align', 'separator',
                  'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
                  'link', 'separator', 'hr', 'separator',
                  'media', 'separator',
                  {
                        key: 'clear', // 使用key来指定控件类型
                        title: '清除内容', // 自定义控件title
                        text: (<div style={{ color: '#3498db' }}><strong>清除内容</strong></div>), // 使用自定义文案来代替默认图标(B)，此处也可传入jsx
                  }, 'separator',];

            //自定义组件
            const extendControls = [
                  {
                        key: 'my-button', // 控件唯一标识，必传
                        type: 'button',
                        title: '这是一个自定义的按钮', // 指定鼠标悬停提示文案
                        className: 'my-button', // 指定按钮的样式名
                        html: '<div style="color: #3498db" ><b>确定按钮</b></div>', // 指定在按钮中渲染的html字符串
                        text: '确定按钮', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
                        onClick: () => {
                              console.log('Hello World!');
                              this.getEditorContent();
                        },
                  },
                  {
                        key: 'custom-button',
                        type: 'button',
                        html: '<div style="color: #3498db" ><b>预览</b></div>', // 指定在按钮中渲染的html字符串
                        text: '预览',
                        onClick: this.preview
                  }
            ]

            const myUploadFn = (param) => {
                  const serverURL = 'http://upload-server'
                  const xhr = new XMLHttpRequest
                  const fd = new FormData()
                  const successFn = (response) => {
                        // 假设服务端直接返回文件上传后的地址
                        // 上传成功后调用param.success并传入上传后的文件地址
                        param.success({
                              url: xhr.responseText,
                              meta: {
                                    id: 'xxx',
                                    title: 'xxx',
                                    alt: 'xxx',
                                    loop: true, // 指定音视频是否循环播放
                                    autoPlay: true, // 指定音视频是否自动播放
                                    controls: true, // 指定音视频是否显示控制栏
                                    poster: 'http://xxx/xx.png', // 指定视频播放器的封面
                              }
                        })
                  }
                  const progressFn = (event) => {
                        // 上传进度发生变化时调用param.progress
                        param.progress(event.loaded / event.total * 100)
                  }

                  const errorFn = (response) => {
                        // 上传发生错误时调用param.error
                        param.error({
                              msg: 'unable to upload.'
                        })
                  }
                  xhr.upload.addEventListener("progress", progressFn, false)
                  xhr.addEventListener("load", successFn, false)
                  xhr.addEventListener("error", errorFn, false)
                  xhr.addEventListener("abort", errorFn, false)
                  fd.append('file', param.file)
                  xhr.open('POST', serverURL, true)
                  xhr.send(fd)
            }
            //媒体文件配置
            const media = {
                  uploadFn: myUploadFn,
            }
            const editorProps = {
                  contentFormat: 'html',
                  defaultValue: EditorState.createFrom(defaultValue),
                  value: editorState,
                  onChange: this.handleEditorChange,
                  onSave: this.getEditorContent,
                  controls: controls,
                  lineHeights: [0, 1, 1.2, 1.5, 1.75, 2, 2.5, 3, 4],
                  extendControls: extendControls,  //指定自定义的控件，目前支持button、dropdown、modal和component这四种类型
                  // media: media,
                  ref:'htmlContent',

            }
            return (

                  <BraftEditor {...editorProps} style={{ textAlain: 'center', background: 'aliceblue', width: 1000, border: "solid 1px #00000040", borderRadius: '5px', boxShadow: "0 10px 20px #ffffff" }} />

            );
      }
}




