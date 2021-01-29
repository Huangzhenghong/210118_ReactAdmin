import React, { Component } from 'react'
import {Button, Modal, message} from 'antd'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'

const { confirm } = Modal;
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),// 当前时间字符串
    weather: ''
  }

  getTime = ()=>{
    // 每隔一s获取当前时间，并更新状态
    this.intervalId = setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  getWeather = async ()=>{
    const {weather} = await reqWeather('大连市')
    this.setState({weather})
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if(item.key===path){
        title = item.title
      } else if(item.children){
        const cItem = item.children.find(cItem => cItem.key===path)
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title
  }

  
  // 退出登录提示框
  showConfirm = () => {
    confirm({
      title: '确定要退出吗?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk: ()=> {
        const user = memoryUtils.user
        storageUtils.removeUser(user)
        memoryUtils.user = {}
        this.props.history.replace('/login')
        message.success('退出成功!')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  componentDidMount() {
    // 获取当前时间
    this.getTime()
    // 获取当前天气
    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const user = memoryUtils.user
    const title = this.getTitle()
    const {currentTime, weather} = this.state
    return (
      <div className='header'>
        <div className='header-top'>
          <span>hello {user.username}</span>  
          <Button type='link' onClick={this.showConfirm}>退出</Button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>
            <span>{title}</span>
          </div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src="" alt=""/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
