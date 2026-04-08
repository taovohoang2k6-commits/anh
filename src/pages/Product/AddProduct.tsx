import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message, Select } from 'antd'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn : async (values : any) =>{
            await axios.post("http://localhost:3000/product", values)
        },
        onSuccess:()=>{
        message.success("thêm thành công")
        navigate('/productlist')
        }
    });
    const onFinish = (values : any) =>{
        mutation.mutate({
            ...values
        })
    }
  return (
      <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form layout="vertical" className="space-y-6" onFinish={onFinish}>
        {/* Text input */}
        <Form.Item label="name" name="name">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
               <Form.Item label="price" name="price">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        {/* Select */}
        <Form.Item label="category" name="category">
          <Select placeholder="Chọn danh mục" options={[
            {label:"Iphone", value : "Iphone" },
            {label:"sunsumg", value : "sunsumg" },
          ]} />
        </Form.Item>
               <Form.Item label="image" name="image">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
               <Form.Item label="description" name="description">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        {/* Submit button */}
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddProduct