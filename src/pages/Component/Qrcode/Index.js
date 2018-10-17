import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import QRCode from 'qrcode.react'
import Center from '@/pages/Account/Center/Articles';

export default class Index extends PureComponent {

      render() {

            const qRcodeProps = {
                  value: 'http://facebook.github.io/react/',
                  renderAs: 'svg', //string ('canvas' 'svg')
                  size: 256,
                  bgColor: '#FFFFFF',
                  fgColor: '#0ece99',
                  level: 'H', //string ('L' 'M' 'Q' 'H')
            }

            return (
                  <PageHeaderWrapper>
                        <div style={{textAlign: 'center'}}>
                              <QRCode {...qRcodeProps} />
                        </div>
                  </PageHeaderWrapper>
            );
      }
}