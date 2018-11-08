import React from 'react'
import { Form, Input, TreeSelect, Button, Select } from 'antd'
const FormItem = Form.Item
import { isEmpty, getTrees } from '@/utils/utils';

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

            const { data: { pagination, filters }, categoryData, form: { getFieldDecorator } } = this.props;


            /**
             * 树状的算法
             * @params categoryData     代转化数组
             * @params parentId 起始节点
             */
            if (!isEmpty(categoryData) && categoryData.length > 0) {
                  for (let index = 0; index < categoryData.length; index++) {
                        categoryData[index].title = categoryData[index].name
                        categoryData[index].key = categoryData[index].id
                        categoryData[index].value = categoryData[index].id
                  }
            }
            let newCategoryData = (!isEmpty(categoryData) && categoryData.length > 0) ? getTrees(categoryData, 0) : [];


            return (
                  <Form onSubmit={this.handleSearch} layout="inline">
                        <FormItem>
                              {getFieldDecorator('name', {
                                    initialValue: pagination.name,
                              })(
                                    <Input placeholder="请输入文章标题" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('author', {
                                    initialValue: pagination.author,
                              })(
                                    <Input placeholder="请输入作者" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('newsSource', {
                                    initialValue: pagination.newsSource,
                              })(
                                    <Input placeholder="请输入来源" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('newsEditor', {
                                    initialValue: pagination.newsEditor,
                              })(
                                    <Input placeholder="请输入编辑" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('description', {
                                    initialValue: pagination.description,
                              })(
                                    <Input placeholder="请输入简介" style={{ width: '200px', marginBottom: '10px' }} />
                              )}
                        </FormItem>
                        <FormItem>
                              {getFieldDecorator('categoryId', {
                                    initialValue: pagination.categoryId,
                              })(
                                    <TreeSelect
                                          style={{ width: '200px', marginBottom: '10px' }}
                                          placeholder="请选择分类根节点"
                                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                          treeData={newCategoryData}
                                          treeDefaultExpandAll
                                    />
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
