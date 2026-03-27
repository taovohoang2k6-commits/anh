import { Button, Form, Input, Select } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddPage() {
const navigate = useNavigate();
 const mutation = useMutation({
    mutationFn: async (values: any) => {
      await axios.post("http://localhost:3000/books", values);
    },
     onSuccess: () => {
    navigate("/list")
  },
  });
   const onFinish = (values: any) => {
    mutation.mutate({
      ...values,
      quantity: Number(values.quantity), 
    });
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <Form layout="vertical" className="space-y-6" onFinish={onFinish}>
        {/* Text input */}
        <Form.Item label="title" name="title">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
               <Form.Item label="quantity" name="quantity">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
                <Form.Item label="coverImage" name="coverImage">
          <Input placeholder="Nhập thông tin" />
        </Form.Item>
        {/* Select */}
        <Form.Item label="genre" name="genre">
          <Select placeholder="Chọn danh mục" options={[

            {label: "tieu thuyet" , value : "tieu thuyet"},
            {label: " Khoa học" , value : " Khoa học"},
            {label: " Lịch sử" , value : " Lịch sử"},
          ]} />
        </Form.Item>

        {/* Submit button */}
        <Button type="primary" htmlType="submit" loading={mutation.isPending}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPage;
