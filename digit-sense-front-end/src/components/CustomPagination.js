import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'
import PropTypes from 'prop-types'
const CustomPagination = ({ page, pages, onChange }) => {
  return (
    <CPagination aria-label="Page navigation example">
      {/* << */}
      <CPaginationItem
        aria-label="Previous"
        disabled={page == 1 ? true : false}
        onClick={(event) => {
          onChange(1)
        }}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>
      {/* < */}
      <CPaginationItem
        aria-label="Previous"
        disabled={page == 1 ? true : false}
        onClick={(event) => {
          onChange(page - 1)
        }}
      >
        <span aria-hidden="true">&lsaquo;</span>
      </CPaginationItem>
      {/* 1 */}
      <CPaginationItem
        active
        onClick={(event) => {
          onChange(page + 1)
        }}
      >
        {page}
      </CPaginationItem>
      {/* 2 */}
      {pages >= 2 && page < pages && (
        <CPaginationItem
          onClick={(event) => {
            onChange(page + 1)
          }}
        >
          {page + 1}
        </CPaginationItem>
      )}
      {/* 3 */}
      {pages >= 3 && page + 1 < pages && (
        <CPaginationItem
          onClick={(event) => {
            onChange(page + 2)
          }}
        >
          {page + 2}
        </CPaginationItem>
      )}
      <CPaginationItem
        aria-label="Next"
        disabled={page == pages ? true : false}
        onClick={(event) => {
          onChange(page <= 3 ? 3 : page + 1)
        }}
      >
        <span aria-hidden="true">&rsaquo;</span>
      </CPaginationItem>
      <CPaginationItem
        aria-label="Next"
        disabled={page == pages ? true : false}
        onClick={(event) => {
          onChange(pages)
        }}
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  )
}
CustomPagination.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.number,
  onChange: PropTypes.func,
}
export default CustomPagination
