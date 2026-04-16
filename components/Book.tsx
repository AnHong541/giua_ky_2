"use client";

import bookService, { BookType } from "@/services/book/book.service";
import { useState, useEffect } from "react";

// Antd
import { Table, Image, Modal, Input, Button } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

export default function BookList() {
  // Điền thông tin họ tên, mã số sinh viên của các bạn vào đây
  const thongTinSV = {
    fullName: "TranVoHongAn",
    studentId: "124000721",
  };

  const columns = [
    { title: "Book ID", dataIndex: "bookId", key: "bookId" },
    {
      title: "Tên sách",
      dataIndex: "bookName",
      key: "bookName",
    },
    {
      title: "Ảnh bìa",
      dataIndex: "bookCover",
      key: "bookCover",
      render: (url: string)=> {
        return(
          <div>
            <Image src={url} alt="Anh Bia" width={100}/>
          </div>
        )
      }
    },
    {
      title: "Mô tả",
      dataIndex: "bookDescription",
      key: "bookDescription",
      ellipsis: true,
    },
    {
      title: "Giá",
      dataIndex: "bookPrice",
      key: "bookPrice",
    },
    {
      title: "Thể loại",
      dataIndex: "bookGenre",
      key: "bookGenre",
    },
    {
      title: "Chức năng",
      key: "actions",
      width: 200,
      render: (item: BookType) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            ghost
            icon={<EditOutlined />}
            onClick={() => openUpdateModal(item)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(item)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  // state dữ liệu book
  const [bookData, setBookData] = useState<BookType[]>([]);

  // state modal
  const [modalUpdate, setModalUpdate] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  // state giá trị form cho inputs
  const [bookName, setBookName] = useState("");
  const [bookCover, setBookCover] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");

  // reset form
  const resetForm = () => {
    setSelectedBookId("");
    setBookName("");
    setBookCover("");
    setBookDescription("");
    setBookPrice("");
    setBookGenre("");
  };

  // Hàm lấy dữ liệu book và gán vô bookData
  const fetchBookData = async () => {
    const data = await bookService.getAllBooks();
    setBookData(data);
  };

  // Chạy hàm lấy dữ liệu khi load trang web
  useEffect(() => {
    fetchBookData();
  }, []);

  // Mở modal Thêm/Sửa
  const openUpdateModal = (book: BookType | null) => {
    setModalUpdate(true);
  };
  // Đóng modal Thêm/Sửa
  const closeUpdateModal = () => {
    setModalUpdate(false);
  }

  // Mở modal Xóa
  const openDeleteModal = (book: BookType) => {
    setDeleteModal(true);
  };
  // Đóng modal Xóa
  const closeDeleteModal = () => {
    setDeleteModal(false);
  }
  const handupdateBook = async ()=> {
    const payload = {
      bookName: bookName,
      bookCover: bookCover,
      bookDescription: bookDescription,
      bookPrice: bookPrice, 
      bookGenre: bookGenre}
     await bookService.addBook(payload);
     closeUpdateModal();
  }
 
  
  // Thực hiện chức năng thêm, sửa, xóa cho dữ liệu book

  return (
    <div className="max-w-7xl mx-auto p-3">
      {/* Thông tin sinh viên */}
      <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">THI GIỮA KỲ</h2>
          <div className="flex gap-4">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm border border-blue-100">
              Họ tên: {thongTinSV.fullName || "___"}
            </span>
            <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm border border-purple-100">
              MSSV: {thongTinSV.studentId || "___"}
            </span>
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => openUpdateModal(null)}
          className="rounded-md"
        >
          Thêm sách mới
        </Button>
      </div>

      {/* Bảng antd */}
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <Table
          dataSource={bookData}
          columns={columns}
          rowKey="bookId"
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Modal Thêm/Sửa */}
      <Modal
        title="Thêm / Cập nhật sách"
        open={modalUpdate}
        onCancel={closeUpdateModal}
        onOk={handupdateBook}
        okText="Lưu dữ liệu"
        cancelText="Hủy"
        centered
      >
        <hr className="my-4" />
        <div className="space-y-4">
          <div>
      
            <label className="block font-bold mb-1">Tên sách</label>
            <Input size="large" placeholder="Nhập tên sách..." value={bookName} onChange={(name)=>setBookName(name.target.value)}/>
          </div>
          <div>
            <label className="block font-bold mb-1">Link ảnh bìa</label>
            <Input size="large" placeholder="URL hình ảnh..." value={bookCover} onChange={(Image)=>setBookCover(Image.target.value)}/>
          </div>
          <div>
            <label className="block font-bold mb-1">Thể loại</label>
            <Input size="large" placeholder="Ví dụ: Trinh thám,..." value={bookGenre} onChange={(Genre)=>setBookGenre(Genre.target.value)} />
          </div>
          <div>
            <label className="block font-bold mb-1">Mô tả</label>
            <Input.TextArea rows={3} placeholder="Nhập mô tả sách..." value={bookDescription} onChange={(description)=>setBookDescription(description.target.value)}/>
          </div>
          <div>
            <label className="block font-bold mb-1">Giá bán</label>
            <Input size="large" placeholder="Ví dụ: 150000" type="number" value={bookPrice} onChange={(price)=>setBookPrice(price.target.value)}/>
          </div>
        </div>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        open={deleteModal}
        onCancel={closeDeleteModal}
        // onOk={}
        okText="Xóa"
        okButtonProps={{ danger: true }}
        cancelText="Hủy"
        centered
      >
        <div className="text-center p-4 text-red-500">
          <ExclamationCircleOutlined className="text-5xl mb-4" />
          <h3 className="text-xl font-bold">Xác nhận xóa</h3>
          <p className="text-gray-700">
            Quyển sách này sẽ bị xóa khỏi hệ thống.
          </p>
        </div>
      </Modal>
    </div>
  );
}
