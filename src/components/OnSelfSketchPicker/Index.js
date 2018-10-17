import React, { PureComponent } from 'react';
import { Alert } from 'antd';
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'



export default class Index extends PureComponent {

      state = {
            displayColorPicker: false,
            color: '',
            colorHex: '',
      };

      async componentDidMount() {

            const { color, colorHex } = this.state
            this.setState({
                  color: this.props.color
            })

      }

      handleClick = () => {
            this.setState({ displayColorPicker: !this.state.displayColorPicker })
      };

      handleClose = () => {
            this.setState({ displayColorPicker: false })
      };

      handleChange = (color) => {
            this.setState({ color: color.rgb, colorHex: color.hex },() => {
                  this.props.onChangeHandler(color.rgb, color.hex)
            })
      };

      render() {

            const { color, colorHex } = this.state

            const styles = reactCSS({
                  'default': {
                        color: {
                              width: '60px',
                              height: '20px',
                              borderRadius: '2px',
                              background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                        },
                        swatch: {
                              padding: '5px',
                              background: '#fff',
                              borderRadius: '1px',
                              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                              display: 'inline-block',
                              cursor: 'pointer',
                        },
                        popover: {
                              position: 'absolute',
                              zIndex: '2',
                        },
                        cover: {
                              position: 'fixed',
                              top: '0px',
                              right: '0px',
                              bottom: '0px',
                              left: '0px',
                        },
                  },
            });
            return (
                  <div>
                        <div style={styles.swatch} onClick={this.handleClick}>
                              <div style={styles.color} />
                        </div>
                        {this.state.displayColorPicker ? <div style={styles.popover}>
                              <div style={styles.cover} onClick={this.handleClose} />
                              <SketchPicker width={250} color={this.state.color} onChange={this.handleChange} />
                        </div> : null}
                  </div>
            );
      }
}




