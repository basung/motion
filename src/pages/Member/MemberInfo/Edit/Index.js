import React from 'react';
import { connect } from 'dva';
import { Tabs, Card, Button } from 'antd'
import Step_1 from './Step_1'
import Step_2 from './Step_2'
import Step_3 from './Step_3'
import Step_4 from './Step_4'

const TabPane = Tabs.TabPane;

@connect(({ memberInfo, loading }) => ({ memberInfo, loading: loading.models.memberInfo }))
export default class Index extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  memberId: '',
            };
      }

      componentDidMount() {

            const { dispatch } = this.props;
            let itemId = this.props.match.params.id
            if (itemId !== 'id') {
                  this.setState({ userId: itemId })
                  dispatch({
                        type: 'memberInfo/getById',
                        payload: {
                              id: itemId,
                              modalType: 'update',
                        },
                  });
                  dispatch({
                        type: 'memberInfo/getByAddress',
                        payload: {
                              id: itemId,
                        },
                  });
            }
      }

      render() {

            const { memberInfo: { currentItem, modalType, memberAddressData }, dispatch, form } = this.props;

            const step_one_props = {
                  item: currentItem,
                  type: modalType,
                  onOk(item) {
                        dispatch({
                              type: `memberInfo/${modalType}`,
                              payload: { item }
                        })
                  },
            }

            const step_two_props = {
                  item: currentItem,
                  type: modalType,
                  onOk(item) {
                        dispatch({
                              type: `memberInfo/${modalType}`,
                              payload: { item }
                        })
                  },
            }

            const step_three_props = {
                  item: currentItem,
                  type: modalType,
                  onOk(payload) {
                        dispatch({
                              type: `memberInfo/editPassword`,
                              payload: { ...payload }
                        })
                  },
            }

            const step_four_props = {
                  item: currentItem,
                  type: modalType,
                  memberAddressData: memberAddressData,
                  onAdd(item) {
                        dispatch({
                              type: `memberInfo/createAddress`,
                              payload: { item }
                        })
                  },
                  onEdit(item) {
                        dispatch({
                              type: `memberInfo/updateAddress`,
                              payload: { item }
                        })
                  },
                  onDelete(item) {
                        dispatch({
                              type: `memberInfo/removeAddress`,
                              payload: { item }
                        })
                  },
            }

            return (
                  <Card bordered={false}>
                        <Tabs tabPosition={'left'} >
                              <TabPane tab="基本设置" key="1" ><Step_1 {...step_one_props} /></TabPane>
                              <TabPane tab="资金设置" key="2" ><Step_2 {...step_two_props} /></TabPane>
                              <TabPane tab="安全设置" key="3" ><Step_3 {...step_three_props} /></TabPane>
                              <TabPane tab="收货地址" key="4" ><Step_4 {...step_four_props} /></TabPane>
                        </Tabs>
                  </Card>
            )

      }
}
