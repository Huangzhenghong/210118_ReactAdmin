import React, { Component } from 'react'
import {Form, Input} from 'antd'
import PropTypes from 'prop-types'

// 更新分类的form组件
export default class UpdateForm extends Component {

  form = React.createRef()

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentDidMount() {
    // 将form对象通过setForm传递给父组件
    this.props.setForm(this.form)
    
  }

  render() {
    const {categoryName} = this.props
    // const {onFinish} = this.props.from

    return (
      <Form  ref={this.form} >
        <Form.Item
          name = {categoryName}
          initialValue = {categoryName} 
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
