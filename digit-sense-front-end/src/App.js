import React, { Component, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

let userData = {}
class App extends Component {
  constructor() {
    super()
    this.state = {
      hasLoggedIn: false,
    }
  }
  componentDidMount() {
    this.checkStatus()
  }
  checkStatus = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Check Status Response =>', data)
        if (data.status === 'success') {
          userData = data.data
          this.setState({
            hasLoggedIn: true,
          })
        }
      })
      .catch((error) => console.log(error))
  }
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            {this.state.hasLoggedIn ? (
              <Route path="*" name="Home" element={<DefaultLayout />} />
            ) : (
              <>
                <Route exact path="/login" name="Login Page" element={<Login />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route path="/" element={<Navigate to="login" replace />} />
                <Route path="*" element={<Navigate to="404" replace />} />
              </>
            )}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export { userData }
export default App
