import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, Input, message, Select, InputNumber } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditProduct() {
  
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()


  const [form] = Form.useForm()

 
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/product/${id}`)
      return res.data
    },
    enabled: !!id, 
  })

  
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])


  const mutation = useMutation({
    mutationFn: async (values: any) => {
      await axios.put(`http://localhost:3000/product/${id}`, values)
    },
    onSuccess: () => {
      message.success("Cập nhật thành công")
      navigate("/productlist")
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi cập nhật")
    },
  })


  const onFinish = (values: any) => {
    mutation.mutate({
      ...values,
      price: Number(values.price),
    })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật sản phẩm</h1>

      <Form
        form={form}
        layout="vertical"
        className="space-y-6"
        onFinish={onFinish}
      >
      
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Không được để trống!" },
            { min: 3, message: "Tối thiểu 3 ký tự" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[
            { required: true, message: "Không được để trống!" },
            {
              validator: (_, value) => {
                if (value === undefined || value === "") {
                  return Promise.reject("Không được bỏ trống!")
                }
                if (Number(value) < 0) {
                  return Promise.reject("Giá không được âm!")
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Nhập giá" />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: "Chọn danh mục!" }]}
        >
          <Select
            placeholder="Chọn danh mục"
            options={[
              { label: "Iphone", value: "Iphone" },
              { label: "Samsung", value: "Samsung" },
            ]}
          />
        </Form.Item>

     
        <Form.Item
          label="Ảnh"
          name="image"
          rules={[{ required: true, message: "Nhập link ảnh!" }]}
        >
          <Input placeholder="Nhập link ảnh" />
        </Form.Item>

 
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input placeholder="Nhập mô tả" />
        </Form.Item>

        {/* Submit */}
        <Button type="primary" htmlType="submit" >
          Cập nhật
        </Button>
      </Form>
    </div>
  )
}

export default EditProduct
