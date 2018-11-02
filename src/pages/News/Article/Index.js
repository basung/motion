import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';


@connect(({ article, loading }) => ({ article, loading: loading.models.article }))
export default class Index extends PureComponent {

      render() {

            const { location, children  } = this.props;

            return (
                  <PageHeaderWrapper tabActiveKey={location.pathname}>
                        {children}
                  </PageHeaderWrapper>
            );
      }
}
