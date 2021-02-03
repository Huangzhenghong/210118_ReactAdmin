import React, { Component } from 'react'
import { Card, Select, Input, Button, Table} from 'antd'

const Option = Select.Option
// Product的默认子路由
export default class ProductHome extends Component {

  state = {
    products: [], //商品的数组
  }

  // 初始化table的列的数组
  initColumns = () => {
    this.columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
    ]
  }
 

  UNSAFE_componentWillMount() {
    this.initColumns()
  }

  render() {

    const {products} = this.state
    
    

    const title = (
      <span>
        <Select value='0' style={{width:150}}>
          <Option value='0'>按名称搜索</Option>
          <Option value='1'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width:200, margin:'0 15px'}} />
        <Button type='primary'>查询</Button>
      </span>
    )

    const extra = (<Button type='primary'>添加商品</Button>)

    return (
      <Card title={title} extra={extra}> 
        <Table 
        dataSource={products} 
        columns={this.columns} 

        >

        </Table>;
      </Card>
    )
  }
}
