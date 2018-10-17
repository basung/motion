import React from 'react'
import { Row, Col, Form, Input, InputNumber, Radio, Modal, Upload, Icon, Button, message, Select, DatePicker } from 'antd'
const FormItem = Form.Item
import { isEmpty } from '@/utils/utils';
const Option = Select.Option

class Filter extends React.Component {
      constructor(props) {
            super(props);
      }

      handleSearch = (e) => {
            e.preventDefault();
            const { form, data } = this.props;
            form.validateFields((err, values) => {
                  if (err) return;
                  const filters = {
                        ...values,
                  };
                  this.props.onChange(data.pagination, filters, {});
            });
      }

      handleFormReset = () => {
            const { form, data } = this.props;
            form.resetFields();
            this.props.onChange(data.pagination, {}, {});
      }

      render() {

            const { data, roleData, form: { getFieldDecorator }   } = this.props;

            //角色数据
		const roleList = [];
		if (!isEmpty(roleData) && roleData.length > 0) {
			for (let index = 0; index < roleData.length; index++) {
				roleList.push(<Option key={roleData[index].id}>{roleData[index].name}</Option>);
			}
		}

            return (
                  <Form onSubmit={this.handleSearch} layout="inline">
                        <FormItem>
                              {getFieldDecorator('loginName')(
                                    <Input placeholder="请输入用户登录名" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('trueName')(
                                    <Input placeholder="请输入用户真实名" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('mobile')(
                                    <Input placeholder="请输入用户手机" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('telephone')(
                                    <Input placeholder="请输入用户电话" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('email')(
                                    <Input placeholder="请输入用户邮箱" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('sex')(
                                    <Select placeholder="请选择性别" style={{ width: '200px', marginBottom: '10px' }}>
                                          <Option value={1} >男</Option>
                                          <Option value={0} >女</Option>
                                    </Select>
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('roleId')(
                                    <Select placeholder="请选择关联角色" style={{ width: '200px', marginBottom: '10px' }}>
                                          {roleList}
                                    </Select>
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('associatedType')(
                                    <Select placeholder="请选择账号类型" style={{ width: '200px', marginBottom: '10px' }}>
                                          <Option value="superAdmin">平台管理员</Option>
                                          <Option value="tenant">租户</Option>
                                          <Option value="employee">雇员</Option>
                                          <Option value="merchant">商家</Option>
                                          <Option value="supplier">供应商</Option>
                                    </Select>
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('isActive')(
                                    <Select placeholder="请选择账号状态" style={{ width: '200px', marginBottom: '10px' }}>
                                          <Option value={0} >已禁用</Option>
                                          <Option value={1} >已启用</Option>
                                    </Select>
                              )}
                        </FormItem>
                        <FormItem>
                              <Button type="primary" htmlType="submit">查询</Button>
                              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </FormItem>
                  </Form>
            )
      }
}

export default Form.create()(Filter)
