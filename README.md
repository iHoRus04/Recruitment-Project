# Recruitment-Project

**Recruitment-Project** là một hệ thống web hỗ trợ tuyển dụng, giúp kết nối giữa nhà tuyển dụng và ứng viên thông qua các chức năng quản lý việc làm, tạo hồ sơ ứng tuyển (CV), và quản trị thông tin công ty.

## 🌟 Demo
- Website: [https://recruitment-project-six.vercel.app](https://recruitment-project-six.vercel.app)

## 🚀 Chức năng chính

### Cho ứng viên:
- **Tìm kiếm và xem chi tiết việc làm:** Ứng viên có thể tìm kiếm công việc theo thành phố, kỹ năng, mức lương, v.v. và xem chi tiết tin tuyển dụng (mô tả công việc, quyền lợi, thông tin công ty).
- **Nộp hồ sơ ứng tuyển:** Ứng viên điền thông tin cá nhân, mô tả bản thân, liệt kê các dự án đã tham gia và gửi CV cho nhà tuyển dụng.
- **Quản lý hồ sơ đã ứng tuyển:** Xem lại danh sách các công việc đã ứng tuyển, trạng thái hồ sơ.

### Cho nhà tuyển dụng/công ty:
- **Đăng và quản lý tin tuyển dụng:** Tạo, chỉnh sửa, xoá bài đăng tuyển dụng, quản lý trạng thái (đang tuyển/hết tuyển).
- **Xem và quản lý CV ứng viên:** Duyệt hồ sơ ứng viên, xem chi tiết thông tin, cập nhật trạng thái xử lý hồ sơ.
- **Quản lý thông tin công ty:** Thông tin tổng quan, mô tả, quy mô, website, địa chỉ, thống kê ứng viên đã ứng tuyển.

## 🛠️ Công nghệ sử dụng

- **Frontend:** ReactJS, Ant Design, React Router
- **State Management:** Redux Toolkit
- **Backend/API:** Giao tiếp qua các service layer (jobService, cvService, companiesService)
- **Triển khai:** Vercel

## 📂 Cấu trúc chính

- `src/components/`: Các component như JobDetails, FormApply, JobItem, CompanyResult,...
- `src/services/`: Các service quản lý việc gọi API về jobs, cv, companies,...
- `src/pages/Dashboard/`: Các trang quản trị cho công ty (ManageCV, ManageJobs, CompanyStatistic,...)
- `src/routes/`: Định tuyến các trang chính của ứng dụng

## 💡 Hướng dẫn sử dụng

1. **Ứng viên:** Đăng ký tài khoản, tìm kiếm và ứng tuyển công việc phù hợp.
2. **Nhà tuyển dụng:** Đăng nhập, đăng tin tuyển dụng, quản lý và duyệt hồ sơ ứng viên.

## 📜 License

Dự án này sử dụng cho mục đích học tập/cá nhân. Vui lòng liên hệ để biết thêm thông tin về bản quyền.

---

**iHoRus04/Recruitment-Project**
