import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      login()
    }
  }
  function login() {
    var inputType = {
      url: `${process.env.REACT_APP_API_URL}/api/auth/login`,
      method: 'POST',
      type: 'TAMBAH',
    }
    var body = { username: username, password: password }
    console.log('Login Body =>', body)
    fetch(`${inputType.url}`, {
      method: inputType.method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Login Response =>`, data)
        if (data.hasOwnProperty('status')) {
          if (data.status === 'success') {
            toast.success(`Login Berhasil`, {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            localStorage.setItem('token', data.data.token)
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          } else {
            toast.error(`Login Gagal: ` + data.message, {
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
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(event) => {
                          setusername(event.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(event) => {
                          setpassword(event.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
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
    </div>
  )
}

export default Login
