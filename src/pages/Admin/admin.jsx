import React, { Component } from 'react'
import { Layout } from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/Header'
import LeftNav from '../../components/Left_Nav'
import Home from './Home/home'
import Category from './Commodity/Category/category'
import Product from './Commodity/Product/product'
import User from './User/user'
import Role from './Role/role'
import Bar from './Chars/Bar/bar'
import Line from './Chars/Line/line'
import Pie from './Chars/Pie/pie'


const {Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 如果内存没有存储user ==> 当前没有登录
    if(!user || !user._id){
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{height: '100%'}}>
      <Sider>
        <LeftNav/>
      </Sider>
      <Layout>
        <Header/>
        <Content style={{margin: 20, backgroundColor: '#fff'}}>
          <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/category' component={Category}/>
            <Route path='/product' component={Product}/>
            <Route path='/user' component={User}/>
            <Route path='/role' component={Role}/>
            <Route path='/bar' component={Bar}/>
            <Route path='/line' component={Line}/>
            <Route path='/pie' component={Pie}/>
            <Redirect to='/home' />
          </Switch>
        </Content>
        <Footer style={{textAlign:'center', color:'#cccccc'}}>推荐使用谷歌浏览器,可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>
    )
  }
}
