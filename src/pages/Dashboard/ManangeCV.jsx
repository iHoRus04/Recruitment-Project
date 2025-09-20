import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCompanyCV } from "../../services/cvService";
import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { getJobs } from "../../services/jobService";
import dayjs from "dayjs";
import DeleteCV from "../../components/DeleteCV";

function ManageCV() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = Cookies.get("id");

  const fetchAPI = useCallback(async () => {
    setLoading(true);
    try {
      const [cvList, jobList] = await Promise.all([
        getCompanyCV(id),
        getJobs(),
      ]);

      const res = cvList.map((item) => ({
        ...item,
        job: jobList.find((job) => Number(job.id) === Number(item.idJob)),
      }));

      setData(res);
    } catch (err) {
      console.error("Lỗi khi load CV:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const columns = [
    {
      title: "Tên công việc",
      key: "jobName",
      render: (_, record) =>
        record.job ? (
          record.job.name
        ) : (
          <Tag color="default">Job đã xoá</Tag>
        ),
    },
    {
      title: "Họ tên ứng viên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt",
      render: (text) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      filters: [
        { text: "Đã đọc", value: true },
        { text: "Chưa đọc", value: false },
      ],
      onFilter: (value, record) => record.statusRead === value,
      render: (_, record) =>
        record.statusRead ? (
          <Tag color="green">Đã đọc</Tag>
        ) : (
          <Tag color="red">Chưa đọc</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space direction="vertical" align="center">
          <Link to={`/admin/manage-cv/${record.id}`} state={{ record }}>
            Xem chi tiết
          </Link>
          <DeleteCV record={record} onUpdate={fetchAPI} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: "100vh" }}>
      <h2 style={{ marginBottom: 16 }}>Danh sách CV</h2>
      <Table
        dataSource={data}
        rowKey="id"
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: 900 }}
        style={{ background: "#fff", borderRadius: 12, overflow: "hidden" }}
      />
    </div>
  );
}

export default ManageCV;
