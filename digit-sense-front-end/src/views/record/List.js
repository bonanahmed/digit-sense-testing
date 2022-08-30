import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  //   CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import CustomPagination from 'src/components/CustomPagination'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const RecordList = () => {
  const [recordList, setrecordList] = useState([])
  const [page, setpage] = useState(1)
  const [pages, setpages] = useState(1)
  const [perpage] = useState(10)

  function getRecord() {
    let query = `?page=${page}&perpage=${perpage}`
    fetch(`${process.env.REACT_APP_API_URL}/api/record/list${query}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log('List Data Record =>', jsonResponse)
        setrecordList(jsonResponse.data)
        setpage(jsonResponse.page)
        setpages(jsonResponse.pages)
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    getRecord()
  }, [page])
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <strong>Record</strong>
            </CCol>
            {/* <CCol>
            <CButton size="sm">Add</CButton>
          </CCol> */}
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CustomPagination
            page={page}
            pages={pages}
            onChange={(value) => {
              setpage(value)
            }}
          />
          <CTable striped responsive bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">UHF ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">User Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {recordList.map((item, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">
                    {(page - 1) * perpage + (index + 1)}
                  </CTableHeaderCell>
                  <CTableDataCell>{item._id ?? 'Belum Ada'}</CTableDataCell>
                  <CTableDataCell>{`${item.userId}`}</CTableDataCell>
                  <CTableDataCell>
                    <>
                      <CRow>
                        <CCol>
                          <CButton
                            color="danger"
                            onClick={(event) => {
                              // deleteRecord(item._id)
                            }}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CCol>
                      </CRow>
                    </>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CustomPagination
            page={page}
            pages={pages}
            onChange={(value) => {
              setpage(value)
            }}
          />
        </CCardBody>
      </CCard>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default RecordList
