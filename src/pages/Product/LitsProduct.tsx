import { Button, Image, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { IProduct } from '../../interface/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import { Link } from 'react-router-dom'
function LitsProduct() {
    const queryClient = useQueryClient();
    const {data} = useQuery<IProduct[]>({
        queryKey : ["getAllProduct"],
        queryFn : async () =>{
        const res = await axios.get('http://localhost:3000/product')
        return res.data;
        }
    })
 const deleteMutation = useMutation({
    mutationFn : async (id:number) =>{
        await axios.delete(`http://localhost:3000/product/${id}`)
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["getAllProduct"]})
    }
    
 })

 
    const columns : ColumnsType<IProduct> = [
        {title: "Tên"  , dataIndex: "name"},
        {title: "giá"  , dataIndex: "price"},
        {title: "danh mục"  , dataIndex: "category"},
    {title: "Ảnh bìa cuốn sách", dataIndex: "image",

   render: (src:string) => <Image src={src} height={100}/> 
    }, 
        {title: "mô tả"  , dataIndex: "description"},
        {title: "Hành động",  
        render : (_, record)=>(
            <div>

            <Popconfirm
            title = "xóa sản phẩm"
            description ="bạn muốn xóa chứ"
             onConfirm={() => deleteMutation.mutate(record.id)}
            okText= "xóa"
            cancelText = "hủy"
            > 
                <Button               
                danger
                >
                xóa
                </Button>
            </Popconfirm>
            <Link to={`/productedit/${record.id}`}>
      <Button type="primary" className='ml-3'>
        Sửa
      </Button>
    </Link>
            </div>
        )
        },
    ]
  return (
        <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div>
        <Link to = "/productadd">
        <Button type="primary" className='m-4'>
            Thêm sản phẩm
        </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} rowKey="id"  />
      </div>
    </div>
  )
}

export default LitsProduct