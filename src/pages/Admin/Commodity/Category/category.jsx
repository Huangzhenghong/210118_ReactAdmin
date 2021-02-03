import React, { Component } from 'react'
import { Card, Button, Space, Table, message, Modal } from 'antd';
import {PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import {reqCategorys, reqAddCategorys, reqUpdateCategorys} from '../../../../api'
import AddForm from './add-from'
import UpdateForm from './update-from'


// 品类管理路由
export default class Category extends Component {
  
  state = {
    loading: false, // 是否正在获取数据中
    categorys: [], // 一级分类
    subCategorys: [], // 二级分类
    parentId: '0', // 当前需要显示的分类列表的父分类ID
    parentName: '', // 当前需要显示的分类列表的父分类名称
    showStatus: 0, //状态显示： 0：不显示 1：显示添加分类 2：显示更新分类 
  }

  // 初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name', // 显示数据对应的属性名
        render: text => <a>{text}</a>,
      },
    
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的页面标签
          <Space size="middle">
            <Button type='link' onClick={() => this.showUpdate(category)} >修改分类 </Button>
            {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
            {this.state.parentId==='0'?<Button type='link' onClick={()=>this.showSubCategorys(category)}>查看子分类</Button>:null}
            
          </Space>
        ),
      },
    ];
  }

  /* 
    异步获取一级/二级分类列表显示
    parentId: 如果没有指定根据状态中的parentId请求, 如果指定了根据指定的请求
  */

  getCategorys = async (parentId) => {

    // 在发请求前, 显示loading
    this.setState({loading: true})
    parentId = parentId || this.state.parentId
    // 发异步ajax请求, 获取数据
    const result = await reqCategorys(parentId)
    // 在请求完成后, 隐藏loading
    this.setState({loading: false})

    if(result.status===0){
      // 取出分类数组(可能是一级也可能二级的)
      const categorys = result.data
      if(parentId==='0'){
        // 更新一级分类状态
        this.setState({categorys})
      } else {
        // 更新二级分类状态
        this.setState({subCategorys: categorys})
      }
    } else {
      message.error('获取列表失败')
    }
  }

  // 显示指定一级分类对象的二级子列表
  showSubCategorys = (category) => {
    // 更新状态
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 在更新状态且重新运行render()后执行
      this.getCategorys()
    }
    // setState()不能立即获取最新的状态：因为setState是异步更新状态的
    )
  }

  // 显示指定一级分类列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  // 响应点击取消: 隐藏确定框
  handleCancel = () => {

    // 清除输入数据
    this.form.current.resetFields()
    // 隐藏确认框
    this.setState({
      showStatus: 0
    })
  }

  // 显示添加的确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 添加分类
  addCategorys = () => {
    console.log('addCategory');

    this.form.current.validateFields().then(async values =>{
      // 1.隐藏确认框
      this.setState({
        showStatus: 0
      })
      // 2.收集数据,并提交添加分类的请求
      const parentId = this.state.parentId
      const { categoryName} = values
      // console.log(parentId, categoryName);

      // 清空输入数据
      this.form.current.resetFields()

      const result = await reqAddCategorys(parentId, categoryName)
      if(result.status===0){
        // 3.重新获取分类列表
        if(parentId===this.state.parentId){
          this.getCategorys()
        } else if(parentId==='0') { // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
          this.getCategorys('0')
        }
      } else {
        message.error('添加分类失败')
      }
    })
  }

  // 显示修改的确认框
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category 
    // 更新状态
    this.setState({
      showStatus: 2
    })
  }

  // 更新分类
  updateCategorys = () => {
    console.log('updateCategorys');

    this.form.current.validateFields().then(async values =>{
      
      // 1.隐藏确定框
      this.setState({
        showStatus: 0
      })

      // 准备数据
      const categoryId = this.category._id
      const name = this.category.name
      let categoryName = this.form.current.getFieldValue(name)
      console.log(categoryId, categoryName);
      

      // 清空输入数据
      this.form.current.resetFields()
      // 2.发送请求
      const result = await reqUpdateCategorys({categoryId, categoryName})
      if(result.status===0){
        // 3.重新显示数据
        this.getCategorys()
      }
    })
  }



  // 为第一次render()准备数据
  componentWillMount() {
    this.initColumns()
  }

  // 执行异步任务：发异步ajax请求
  componentDidMount() {
    this.getCategorys()

    
  }

  render() {
    // 读取状态数据
    const {categorys, subCategorys, parentId, parentName, showStatus} = this.state
    // 读取指定的分类
    const category = this.category || {}
    // card的左侧
    const title = parentId==='0' ? "一级商品分类" : (
      <span>
        <Button type='link' onClick={this.showCategorys}>一级分类列表</Button>
        <ArrowRightOutlined />
        <span>{parentName}</span>
      </span>
    )
    // card的右侧
    const extra = (
      <Button type='primary' icon={<PlusOutlined/>} onClick={this.showAdd} >添加</Button>
    )
    // const {columns, data} = dataSource
    return (
      <Card  title={title} extra={extra}>
        <Table 
          bordered 
          rowKey='_id'
          columns={this.columns} 
          dataSource={parentId==='0' ? categorys : subCategorys}
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
          />
        <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategorys} onCancel={this.handleCancel}>
          <AddForm setForm={(form)=>{this.form = form}} categorys={categorys} parentId={parentId}/>
        </Modal>
        <Modal title="更新分类" visible={showStatus===2} onOk={this.updateCategorys} onCancel={this.handleCancel}>
          <UpdateForm setForm={(form)=>{this.form = form}} categoryName={category.name} />
        </Modal>
    </Card>

    
    )
  }
}
