import { Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListCity } from "../../services/jobService";

function SearchForm() {
  const [city, setCity] = useState();
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await getListCity();
      const opts = res.map((c) => ({ label: c, value: c }));
      setOptions([{ label: "All", value: "All" }, ...opts]);
    };
    fetchAPI();
  }, []);

  const onSearch = (value) => {
    navigate(`/search?city=${city ?? "All"}&keyword=${value}`);
  };

  return (
    <div style={{ textAlign: "center", margin: "40px auto" }}>
      <Space.Compact block>
        <Select
          placeholder="Chọn thành phố"
          size="large"
          options={options}
          style={{ width: "30%" , marginRight:10 }}
          onChange={(val) => setCity(val)}
        />
        <Input.Search
          enterButton="Search"
          size="large"
          style={{ flex: 1 }}
          onSearch={onSearch}
        />
      </Space.Compact>
    </div>
  );
}

export default SearchForm;
