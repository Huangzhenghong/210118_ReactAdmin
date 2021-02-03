import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductHome from './Product_Home'
import ProductAddUpdate from './Product_AddUpdate'
import ProductDetail from './Product_Detail'


// 商品管理路由
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact /> {/* exact 开启完全匹配*/}
        <Route path='/product/addupdate' component={ProductAddUpdate} />
        <Route path='/product/detail' component={ProductDetail} />
        <Redirect to='/product' />
      </Switch>
    )
  }
}
