import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Alert, Row, Col, Checkbox, Tooltip, Icon, Button } from 'antd';
import router from 'umi/router';
import Styles from './Index.less';
import { isEmpty } from '@/utils/utils'

@connect(({ role, loading }) => ({ role, loading: loading.models.role }))
export default class Index extends PureComponent {

      state = {
            tableData: [],
            relationIds: [],
            roleId: '',
      };

      componentDidMount() {
            const { dispatch } = this.props;
            let itemId = this.props.match.params
            this.setState({ roleId: itemId.id })
            dispatch({
                  type: 'role/getRoleRelationPermission',
                  payload: { id: itemId.id },
            });
      }


      componentWillReceiveProps(nextProps) {

            //判断数据源是否改变
            if (nextProps.role != this.props.role) {

                  let permissionList = nextProps.role.permission
                  let rolePermissionList = nextProps.role.rolePermission

                  //1、初始化该角色已拥有的权限
                  let relationIds = []
                  for (let index = 0; index < rolePermissionList.length; index++) {
                        relationIds.push(rolePermissionList[index].id)
                  }

                  //2、将该角色已有的权限的 checked 设置为 true
                  if (!isEmpty(permissionList)) {
                        for (let i = 0; i < permissionList.length; i++) {
                              for (let j = 0; j < rolePermissionList.length; j++) {
                                    if (permissionList[i].id == rolePermissionList[j].id) {
                                          permissionList[i].checked = true
                                    }
                              }
                        }
                  }

                  // 3、拼接数据
                  const tableData = []
                  if (!isEmpty(permissionList)) {
                        for (let i = 0; i < permissionList.length; i++) {
                              if (permissionList[i].parentCode == '0') {
                                    let tableCell = []
                                    for (let j = 0; j < permissionList.length; j++) {
                                          if (permissionList[i].id == permissionList[j].parentCode) {
                                                tableCell.push(
                                                      <Col key={permissionList[j].id} span={2}>
                                                            <Checkbox value={permissionList[j].id} defaultChecked={permissionList[j].checked} onChange={this.onChange}>
                                                                  {permissionList[j].name} &nbsp;
                                                {permissionList[j].description ? (
                                                                        <Tooltip title={permissionList[j].description}>
                                                                              <Icon type="question-circle-o" style={{ color: '#8b96ff' }} />
                                                                        </Tooltip>
                                                                  ) : (<span></span>)}

                                                            </Checkbox>
                                                      </Col>
                                                )
                                          }
                                    }
                                    tableData.push(
                                          <tr key={permissionList[i].id}>
                                                <th style={{ paddingLeft: '20px', width: '100px' }} >
                                                      {permissionList[i].name} &nbsp;
                                    {permissionList[i].description ? (
                                                            <Tooltip title={permissionList[i].description}>
                                                                  <Icon type="question-circle-o" style={{ color: '#8b96ff' }} />
                                                            </Tooltip>
                                                      ) : (<span></span>)}
                                                </th>
                                                <td>
                                                      <Row style={{ margin: '10px' }}>
                                                            {tableCell}
                                                      </Row>
                                                </td>
                                          </tr>
                                    )
                              }
                        }
                  }
                  this.setState({ tableData, relationIds })
            }
      }


      onChange = (e) => {

            let { relationIds } = this.state

            //不需要去除重复,因为是checkBox
            if (e.target.checked) {
                  relationIds.push(e.target.value)
            } else {
                  let index = relationIds.indexOf(e.target.value);
                  if (index > -1) {
                        relationIds.splice(index, 1);
                  }
            }
            this.setState({ relationIds: relationIds }, () => {
                  console.info('relationIds ===', this.state.relationIds)
            })

      }

      render() {

            const { role: { data, currentItem, permission, rolePermission }, dispatch, loading } = this.props;

            // console.info('rolePermission ===', JSON.stringify(rolePermission))

            const { tableData, relationIds, roleId } = this.state

            function onSubmit() {

                  let permissions = ''
                  if (!isEmpty(relationIds)) {
                        permissions = relationIds[0];
                        for (let index = 1; index < relationIds.length; index++) {
                              permissions += ',' + relationIds[index]
                        }
                  }
                  console.info('permissions ===', permissions)
                  dispatch({
                        type: 'role/setRoleRelationPermission',
                        payload: { permissions: permissions, roleId: roleId, pagination: data.pagination },
                  });

            }

            function onCancel() {
                  router.push('/system/role')
            }

            return (
                  <Card bordered={false} className={Styles.card} >
                        <div>
                              <Alert message={(<div>角色权限明细</div>)} type="info" showIcon />
                        </div>
                        <table style={{ width: "100%" }}>
                              <tbody>
                                    {tableData}
                                    {/* <tr>
							<th>订单</th>
							<td>
								<Row style={{ margin: '10px' }}>
									<Col span={4}><Checkbox value="A">
										订单查看&nbsp;
                                                                  <Tooltip title="What do you want others to call you?">
											<Icon type="question-circle-o" style={{ color: 'rgb(249, 104, 104)' }} />
										</Tooltip>
									</Checkbox></Col>
								</Row>
							</td>
						</tr>
						<tr>
							<th width='100px' >订单</th>
							<td>
								<Row style={{ margin: '10px' }}>
									<Col span={4}><Checkbox value="A">
										订单查看&nbsp;
                                                                  <Tooltip title="What do you want others to call you?">
											<Icon type="question-circle-o" style={{ color: 'rgb(249, 104, 104)' }} />
										</Tooltip>
									</Checkbox></Col>
									<Col span={4}><Checkbox value="A">
										订单查看&nbsp;
                                                                  <Tooltip title="What do you want others to call you?">
											<Icon type="question-circle-o" style={{ color: 'rgb(249, 104, 104)' }} />
										</Tooltip>
									</Checkbox></Col>
								</Row>
							</td>
						</tr> */}
                              </tbody>
                        </table>
                        <div className={Styles.actions} >
                              <Button onClick={onSubmit} type="primary">保存</Button>
                              <Button onClick={onCancel} >返回</Button>
                        </div>
                  </Card>
            );
      }
}
