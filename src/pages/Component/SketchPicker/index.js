import React, { PureComponent } from 'react';
import { Alert } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SketchPicker from '@/components/OnSelfSketchPicker'



export default class Index extends PureComponent {

      state = {
            displayColorPicker: false,
            color: {
                  r: '241',
                  g: '112',
                  b: '19',
                  a: '1',
            },
            colorHex: '',
      };

      onChangeHandler = (color, colorHex) => {
            console.info('color ===', color)
            console.info('colorHex ===', colorHex)
            this.setState({ color, colorHex })
      }

      render() {

            const { color, colorHex } = this.state

            const sketchPickerProps = {
                  color: color,
                  onChangeHandler: this.onChangeHandler
            }

            return (
                  <PageHeaderWrapper>
                        <Alert message={"颜色Hex值: " + colorHex + "; 颜色RGB值: " + color.r + "," + color.g + "," + color.b + "," + color.a} type="success" style={{ marginBottom: 20 }} />
                        <SketchPicker {...sketchPickerProps} />
                  </PageHeaderWrapper>
            );
      }
}




