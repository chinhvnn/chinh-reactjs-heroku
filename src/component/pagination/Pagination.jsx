import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const {totalPage, currentPage} = this.props;
    let startCountPage = (currentPage>3)?(currentPage - 2):1; 
    let endCountPage = (currentPage < totalPage-1)?(currentPage + 2):totalPage; 

    let arrPage = [];
      for (let i = startCountPage; i <= endCountPage; i++) {
        arrPage.push(i);
      }
    return (
      <ul className="pagination">
          {(totalPage>0 && currentPage>1) && (
        <li className="page-item">
          <a className="page-link" aria-label="Previous" name='previous' onClick={this.props.handlePagination} href="/#">
            «
          </a>
        </li>
          )}
        {
          (currentPage > 0) && arrPage.map((val,index) => (
            <li className="page-item" key={index}>
              <a className="page-link" id={val} name='choose' style={(val===currentPage)?{backgroundColor: '#c0d2f0'}:{backgroundColor:''}}
              onClick={this.props.handlePagination}
              href="/#">{val}</a>
            </li>
          ))
        }
        {(totalPage>0 && currentPage<totalPage) && (
        <li className="page-item">
          <a className="page-link" aria-label="Next" name='next' onClick={this.props.handlePagination} href="/#">
            »
          </a>
        </li>
        )}
      </ul>
    );
  }
}
