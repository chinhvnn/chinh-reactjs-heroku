import React, { Component } from 'react'

export default class TextBox extends Component {
  render() {
    return (
      <div className="task-layout" style={{textAlign: "left"}}>
            <h4>CHỨC NĂNG: </h4>
            <p><i className="fa-solid fa-circle-plus"></i> : Thêm task (phím Enter hoặc click +)</p>
            <p><i className="fa-solid fa-pen-to-square"></i> : Update nội dung task (Enter hoặc click Apply để hoàn thành)</p>
            <p><i className="fa-solid fa-trash"></i> : Delete task</p>
            <p><i className="fa fa-check-circle"></i> : Tick vào task đã hoàn thành (từ Xám sang Xanh và ngược lại)</p>
            <p><i className="fa-solid fa-list-ol"></i> : Phân trang</p>
            <p><i className="fa-solid fa-arrow-down-short-wide"></i> : Filter và hiển thị số lượng mỗi loại task khác nhau </p>
            <p>Văn bản: Chữ tràn dòng sẽ hiện thị dấu ... </p>

        </div>
    )
  }
}
