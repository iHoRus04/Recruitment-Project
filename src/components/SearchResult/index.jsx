import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getJobs } from "../../services/jobService";
import { getCompany } from "../../services/companiesService";
import { Tag, Empty, Spin } from "antd";
import JobItem from "../JobItem";

function SearchResult() {
  const [params] = useSearchParams();
  const citySearch = params.get("city") || "All";
  const keyword = params.get("keyword") || "";
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jobRes, companyRes] = await Promise.all([
          getJobs(),
          getCompany(),
        ]);

      
        const companyMap = Object.fromEntries(companyRes.map((c) => [c.id, c]));

      
        const filtered = jobRes.filter((item) => {
          const matchCity =
            citySearch === "All" || item.city?.includes(citySearch);
          const matchKeyword =
            !keyword ||
            item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.tags?.some((tag) =>
              tag.toLowerCase().includes(keyword.toLowerCase())
            );
          return matchCity && item.status && matchKeyword;
        });

        setJobs(filtered);
        setCompanies(companyMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [citySearch, keyword]);

  return (
    <div style={{ padding: "24px" ,flex:1}}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>
        {params.size > 0 ? "🔍 Kết quả tìm kiếm" : "Danh sách công việc"}
      </h2>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Tag color="blue">Thành phố: {citySearch}</Tag>
        <Tag color="green">Keyword: {keyword || "Không có"}</Tag>
      </div>

      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        {jobs.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
               gap: "20px",
            }}
          >
            {jobs.map((item) => (
              <JobItem
                key={item.id}
                item={item}
                company={companies[item.idCompany]}
              />
            ))}
          </div>
        ) : (
          <Empty
            description="Không tìm thấy công việc phù hợp"
            style={{ marginTop: 50 }}
          />
        )}
      </Spin>
    </div>
  );
}

export default SearchResult;
