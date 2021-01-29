/*
要求：能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求:能格局接口文档定义接口请求函数
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// jsonp请求的接口请求函数
export const reqWeather = (city) => {
  return new Promise((resolve, reject)=>{
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&output=json&key=998c79863247483c35e21011501ebe07`
    return jsonp(url, {}, (err, data)=>{
      const {weather, reporttime} = data.lives[0]
      
      // 如果成功了
      if(!err && data.status==='1'){
        resolve({weather, reporttime})
        console.log(weather, reporttime);
      }
      else {
        // 如果失败了
        message.error('获取天气失败',err)
      }
    })

  })
}

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('manage/category/list', {parentId})

// 添加分类
export const reqAddCategorys = (parentId, categoryName) => ajax('manage/category/add', {parentId, categoryName}, 'POST')

// 更新分类
export const reqUpdateCategorys = ({categoryId, categoryName}) => ajax('manage/category/update', {categoryId, categoryName}, 'POST')