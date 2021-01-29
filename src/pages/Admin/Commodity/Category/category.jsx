import React, { Component } from 'react'
import { Card, Button, Space, Table, message, Modal } from 'antd';
import {PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import {reqCategorys, reqAddCategorys, reqUpdateCategorys} from '../../../../api'


// 品类管理路由
export default class Category extends Component {
  
  state = {
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
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
    
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的页面标签
          <Space size="middle">
            <Button type='link' onClick={this.showUpdate} >修改分类 </Button>
            {this.state.parentId==='0'?<Button type='link' onClick={()=>this.showSubCategorys(category)}>查看子分类</Button>:null}
            
          </Space>
        ),
      },
    ];
  }

  // 异步获取一级/二级分类列表显示
  getCategorys = async () => {
    const {parentId} = this.state
    const result = await reqCategorys(parentId)
    if(result.status===0){
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

  // 隐藏添加/更新分类
  handleCancel = () => {
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
    // const result = reqAddCategorys('0', '电脑办公')
    // if(result.status===0){
    //   const categorys = result.data
    //   this.setState({categorys})
    // } else {
    //   message.error('添加分类失败')
    // }
  }

  // 显示修改的确认框
  showUpdate = () => {
    this.setState({
      showStatus: 2
    })
  }

  // 更新分类
  updateCategorys = () => {
    console.log('updateCategorys');
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
          <p>添加</p>
          
        </Modal>
        <Modal title="更新分类" visible={showStatus===2} onOk={this.updateCategorys} onCancel={this.handleCancel}>
          <p>修改</p>
          
        </Modal>
      
      

    </Card>

    
    )
  }
}
