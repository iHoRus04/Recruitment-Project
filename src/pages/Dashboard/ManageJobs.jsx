import { Button, Flex, Space, Table, Tag } from "antd";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getCompanyJobs } from "../../services/jobService";
import EditJob from "../../components/EditJob";
import DeleteJob from "../../components/DeleteJob";

function ManageJobs() {
  const id = Cookies.get("id");
  const [data, setData] = useState([]);

  // ✅ khai báo fetchAPI bằng useCallback để tránh bị recreate khi re-render
  const fetchAPI = useCallback(async () => {
    const res = await getCompanyJobs(id);
    setData(res.reverse());
  }, [id]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const columns = [
    {
      title: "Tên công việc",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <div
          style={{ width: 250, display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Mức lương",
      key: "salary",
      dataIndex: "salary",
    },
    {
      title: "Thời gian bắt đầu",
      key: "createAt",
      dataIndex: "createAt",
    },
    {
      title: "Thời gian kết thúc",
      key: "expiryAt",
      dataIndex: "expiryAt",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) =>
        status ? (
          <Tag color="success">Đang tuyển</Tag>
        ) : (
          <Tag color="error">Hết tuyển</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space direction="vertical" align="center">
          <Link to={`/admin/manage-jobs/${record.id}`} state={{ record }}>
            Xem chi tiết
          </Link>
          {/* ✅ Truyền fetchAPI xuống để reload bảng sau khi Edit */}
          <EditJob record={record} onUpdate={fetchAPI} />
          <DeleteJob record={record} onUpdate={fetchAPI}/>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Flex justify="space-between" align="center">
        <h2>Danh sách việc làm</h2>
        <Button type="primary">
          <Link to={"/admin/create-job"}>Thêm việc làm</Link>
        </Button>
      </Flex>
      <Table dataSource={data} rowKey={"id"} columns={columns} />
    </div>
  );
}

export default ManageJobs;
