import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar8 from './../../assets/images/avatars/8.jpg'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem
          // href="#"
          onClick={() => {
            localStorage.clear()
            toast.success(`Logout Berhasil`, {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setTimeout(() => {
              window.location.replace('/#/login')
              window.location.reload()
            }, 2000)
          }}
        >
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
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
    </CDropdown>
  )
}

export default AppHeaderDropdown
