import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Table, Image , Button} from "antd";

import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";


interface Books {
  id:number;
  title:string;
  quantity:number;
  coverImage:string;
  genre:string
}
function ListPage() {

  const queryClient = useQueryClient();
  const { data } = useQuery<Books[]>({
    queryKey: ["getAllStories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/books");
      return res.data;
    },
  });
const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:3000/books/${id}`);
    },
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["getAllStories"] });
}
  });


  const columns:ColumnsType<Books> = [
    {title: "Tên sách", dataIndex: "title"},
    {title: "Số lượng", dataIndex: "quantity"},
    {title: "Ảnh bìa cuốn sách", dataIndex: "coverImage",

    render: (src:string) => <Image src={src} height={100}/> 
    },
    {title: "Thể loại", dataIndex: "genre"},
    {title: "action",

      render:(_, record) =>(
        <div>
          <Button
          danger className="m-3"
          onClick={()=>deleteMutation.mutate(record.id)}
          >xoa</Button>
          <Link to={`/edit/${record.id}`}>
  <Button type="primary">Sửa</Button>
</Link>
        </div>
      )
    },
  ]

  return (
    
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>

      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}

export default ListPage;
