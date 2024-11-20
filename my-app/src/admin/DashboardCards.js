import React from "react";
import "./DashboardCards.css";

const DashboardCards = () => {
  const cardsData = [
    { color: "orange", number: 363, text: "Sản phẩm" },
    { color: "green", number: 12, text: "Danh mục sản phẩm" },
    { color: "blue", number: 5, text: "Bài viết" },
    { color: "red", number: 2, text: "Danh mục bài viết" },
    { color: "purple", number: 0, text: "Danh sách liên hệ" },
    { color: "pink", number: 2, text: "Thành viên" },
    { color: "magenta", number: 5, text: "Đơn hàng chưa xử lý" },
    { color: "teal", number: 0, text: "Đơn hàng đã xử lý" },
  

  ];

  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className={`card ${card.color}`}
        >
          <h2>{card.number}</h2>
          <p>{card.text}</p>
          <button>Chi tiết</button>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
