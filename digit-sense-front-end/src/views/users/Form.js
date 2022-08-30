import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormLabel,
  CRow,
  CInputGroup,
  CFormInput,
  CForm,
  CInputGroupText,
  CFormTextarea,
  CImage,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
const UserForm = () => {
  const params = useParams()
  const [validated, setValidated] = useState(false)

  //Input Variable
  const [fullName, setfullName] = useState('')
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [age, setage] = useState(0)
  const [address, setaddress] = useState('')
  const [profilePicture, setprofilePicture] = useState('')
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      userFormInput()
    }
    setValidated(true)
  }
  function userFormInput() {
    var uid = params.id
    var inputType = {
      url: `${process.env.REACT_APP_API_URL}/api/user/add`,
      method: 'POST',
      type: 'TAMBAH',
    }
    var body = {
      fullName: fullName,
      email: email,
      username: username,
      password: password,
      age: age,
      address: address,
      profilePicture: profilePicture,
      role: 'user',
    }
    console.log('Data User Body =>', body)
    if (uid !== '0') {
      inputType = {
        url: `${process.env.REACT_APP_API_URL}/api/user/update/${uid}`,
        method: 'PUT',
        type: 'UPDATE',
      }
      delete body.password
    }
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
        console.log(`${inputType.type} Data User Response =>`, data)
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
            setTimeout(() => {
              window.location.replace('/#/users')
              // window.location.reload()
            }, 2000)
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

  function getDataUser(uid) {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/get/` + uid, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let dataUser = data.data
        console.log('Detail Data User =>', data)
        setfullName(dataUser.fullName)
        setemail(dataUser.email)
        setusername(dataUser.username)
        setpassword(dataUser.password)
        setage(dataUser.age)
        setaddress(dataUser.address)
        setprofilePicture(dataUser.profilePicture)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (params.id !== '0') {
      getDataUser(params.id)
    }
  }, [params.id])

  return (
    <CRow>
      <CCol>
        <CCard>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCardHeader>
              <CRow>
                <CCol>
                  <strong>Tambah Data Pengguna</strong>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={6} md={6} xs={12}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CFormLabel>Full Name</CFormLabel>
                    </CInputGroupText>
                    <CFormInput
                      required
                      value={fullName ?? ''}
                      placeholder="Full Name"
                      autoComplete="fullName"
                      onChange={(event) => {
                        setfullName(event.target.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CFormLabel>Username</CFormLabel>
                    </CInputGroupText>
                    <CFormInput
                      required
                      value={username ?? ''}
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(event) => {
                        setusername(event.target.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CFormLabel>Age</CFormLabel>
                    </CInputGroupText>
                    <CFormInput
                      required
                      value={age ?? 0}
                      placeholder="Age"
                      autoComplete="age"
                      type="number"
                      onChange={(event) => {
                        setage(parseInt(event.target.value))
                      }}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} md={6} xs={12}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CFormLabel>Email</CFormLabel>
                    </CInputGroupText>
                    <CFormInput
                      required
                      value={email ?? ''}
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(event) => {
                        setemail(event.target.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CFormLabel>Password</CFormLabel>
                    </CInputGroupText>
                    <CFormInput
                      required
                      value={password ?? ''}
                      placeholder="Password"
                      autoComplete="password"
                      type="password"
                      onChange={(event) => {
                        setpassword(event.target.value)
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CFormLabel>Address</CFormLabel>
                    </CInputGroupText>
                    <CFormTextarea
                      required
                      value={address ?? ''}
                      placeholder="Address"
                      autoComplete="address"
                      onChange={(event) => {
                        setaddress(event.target.value)
                      }}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={12} md={6} sm={6}>
                  <CFormInput
                    type="file"
                    id="formFile"
                    label="Upload Photo"
                    placeholder="Upload Your Profile Picture"
                    feedbackinvalid="Harap Diisi"
                    onChange={async (event) => {
                      setprofilePicture(await toBase64(event.target.files[0]))
                    }}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol>
                  <CImage src={profilePicture} width={'20%'} />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CRow>
                <CCol className="d-flex flex-row-reverse">
                  <CButton
                    onClick={(event) => {
                      handleSubmit(event)
                    }}
                    color="success"
                  >
                    Save
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
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
    </CRow>
  )
}

export default UserForm
