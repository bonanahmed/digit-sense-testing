import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import CustomPagination from 'src/components/CustomPagination'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom'

const UserList = () => {
  const [usersList, setusersList] = useState([])
  const [page, setpage] = useState(1)
  const [pages, setpages] = useState(1)
  const [perpage] = useState(10)

  function getUsers() {
    let query = `?page=${page}&perpage=${perpage}`
    fetch(`${process.env.REACT_APP_API_URL}/api/user/list${query}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log('List Data Users =>', jsonResponse)
        setusersList(jsonResponse.data)
        setpage(jsonResponse.page)
        setpages(jsonResponse.pages)
      })
      .catch((error) => console.log(error))
  }
  function deleteUsers(id) {
    var inputType = {
      url: `${process.env.REACT_APP_API_URL}/api/user/delete/${id}`,
      method: 'DELETE',
      type: 'Delete',
    }

    fetch(`${inputType.url}`, {
      method: inputType.method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`${inputType.type} Users Response =>`, data)
        if (data.hasOwnProperty('status')) {
          if (data.status === 'success') {
            toast.success(`${inputType.type} Data Berhasil`, {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            getUsers()
          } else {
            toast.error(`${inputType.type} Data Gagal: ` + data.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getUsers()
  }, [page])
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol>
              <strong>Users</strong>
            </CCol>
            <CCol>
              <Link to="/user/0">
                <CButton size="sm">Add</CButton>
              </Link>
            </CCol>
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
                <CTableHeaderCell scope="col">Profile Picture</CTableHeaderCell>
                <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Age</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {usersList.map((item, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">
                    {(page - 1) * perpage + (index + 1)}
                  </CTableHeaderCell>
                  <CTableHeaderCell>
                    <CImage width={'25%'} src={item.profilePicture} />
                  </CTableHeaderCell>
                  <CTableDataCell>{`${item.fullName}`}</CTableDataCell>
                  <CTableDataCell>{item.address ?? 'None'}</CTableDataCell>
                  <CTableDataCell>{item.age ?? '0'}</CTableDataCell>
                  <CTableDataCell>
                    <>
                      <CRow>
                        <CCol>
                          <CButton
                            color="danger"
                            onClick={(event) => {
                              deleteUsers(item._id)
                            }}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                          <Link to={`/user/${item._id}`}>
                            <CButton
                              color="info"
                              onClick={(event) => {
                                ;<CButton size="sm">Add</CButton>
                              }}
                            >
                              <CIcon icon={cilPencil} />
                            </CButton>
                          </Link>
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

export default UserList
