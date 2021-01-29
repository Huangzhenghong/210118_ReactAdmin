import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu } = Menu;
class LeftNav extends Component {

  // 根据menu的数据数组生成对应的标签数组
  // 使用map() + 递归调用
  getMenuNodes = (menuList) => {
    // 得到当前请求的路径
    const path = this.props.location.pathname

    return menuList.map(item => {
      if(!item.children){
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key===path)
        // 如果存在,说明当前item的子列表需要打开
        if(cItem){
          this.openKey = item.key
        }
        
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  componentWillMount(){
    this.menuNodes =this.getMenuNodes(menuList)
  }

  render() {
    // 得到当前请求的路径
    const path = this.props.location.pathname
    const openKey = this.openKey
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt="" />
          <h1>后台管理系统</h1>
        </Link>

        <div style={{ width: 200 }}>
          <Menu
            selectedKeys={[path]} //默认选中
            defaultOpenKeys={[openKey]}
            mode="inline"
            theme="dark"
          >
            {
              this.menuNodes
            }
          </Menu>
        </div>
      </div>


    )
  }
}

/*
 withRouter高阶组件:
 包装非路由组件,返回一个新的组件
 新的组件向非路由组件传递3个属性:history/ location/ match
*/
export default withRouter(LeftNav)
