import React, { Component } from 'react'
import {Form, Select, Input} from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option

// 添加分类的from组件
export default class AddForm extends Component {
  form = React.createRef()

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.setForm(this.form)
  }

  render() {
    const {categorys, parentId} = this.props
    return (
      <Form ref={this.form}>
        <Form.Item
          name = {parentId}
          initialValue = {parentId}
          
        >
          <Select>
            <Option value='0'>一级分类</Option>
            {
              categorys.map( c => <Option value={c._id}>{c.name}</Option>)
            }
            
          </Select>
        </Form.Item>
        <Form.Item
          name = {'categoryName'}
          initialValue = ''
          rules = {[
            {required: true, message:'分类名称必须输入!'}
          ]}
        >
          <Input placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    )
  }
}
