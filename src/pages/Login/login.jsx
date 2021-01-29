import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import logo from '../../assets/images/logo.png'
import './login.less'


export default class Login extends Component {

  render() {
    const onFinish = async (values) => {
      // console.log('Received values of form: ', values);
      const {username, password} = values
      const result = await reqLogin(username, password)
      if(result.status === 0){
        //提示登陆成功
        message.success('登陆成功')

        //保存user
        const user = result.data
        memoryUtils.user = user//保存到内存
        storageUtils.saveUser(user)//保存到local

        // 跳转到管理页面(不需要再回退到登录)
        this.props.history.replace('/')

      }else {//登录失败
        // 提示错误信息
        message.error(result.msg)
      }
    };

    // 判断用户已经登录
    const user = memoryUtils.user
    if(user && user._id){
      return <Redirect to='/' />
    }

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              //声明式验证：直接使用别人定义好的验证规则进行验证
              rules={[
                { required: true, message: '用户名必须输入!' },
                { min: 4, message: '用户名至少4位!' },
                { max: 12, message: '用户名不能超过12位!' },
                { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '用户名必须以英文字母开头,且只能由英文字母、数字或下划线组成!'}
                
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '密码必须输入!' },
                { min: 4, message: '密码至少4位!' },
                { max: 12, message: '密码不能超过12位!' },
                { pattern: /^[a-zA-Z0-9_]*$/, message: '密码只能由英文字母、数字或下划线组成!'}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}} />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
