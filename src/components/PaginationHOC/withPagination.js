import React, { Component } from 'react';
import './pagination.css';

function withPagination(WrappedComponent) {
  return class WithPagination extends Component {
    constructor(props) {
      super(props);
      console.log(this.state);
      this.state = {
        currentPage: 1,
        totalCount: 0,
        itemsPerPage: 20,
        pageChangeCallBack: () => {}
      };
    }

    fetchItemsCount = (itemsCount, itemsLimit, onPageChangeCallback, resetPage) => {
        this.setState({
            totalCount: itemsCount,
            itemsPerPage: itemsLimit,
            pageChangeCallBack: onPageChangeCallback,
            currentPage: resetPage ? 1 : this.state.currentPage
        })
    }

    goToPage = (page) => {
      this.setState({ currentPage: page });
      this.state.pageChangeCallBack(page)
    };

    render() {
      const { totalCount, currentPage, itemsPerPage } = this.state;
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      return (
        <div>
          <WrappedComponent currentPage={currentPage} fetchItemsCount={this.fetchItemsCount} />
          {totalPages > 0 && <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={() => this.goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => this.goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>}
        </div>
      );
    }
  };
}

export default withPagination;
