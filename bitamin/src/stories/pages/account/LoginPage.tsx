import { useState, useCallback, useEffect } from 'react'
import axiosInstance, { setAccessToken } from 'api/axiosInstance' // 경로 수정
import useAuthStore from 'store/useAuthStore' // 경로 수정
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import styles from 'styles/account/LoginPage.module.css'
import Modal from '@/stories/organisms/Modal'
import { googleLogin, kakaoLogin } from '@/api/userAPI'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setCookie] = useCookies(['refreshToken']) // `cookies` 대신 `_`를 사용
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [responseData, setResponseData] = useState({})

  const {
    setAccessToken: setAuthAccessToken,
    setRefreshToken: setAuthRefreshToken,
  } = useAuthStore()

  const closeModal = () => {
    const { accessToken, refreshToken } = responseData.data
    console.log('Server response:', responseData.data) // 서버 응답 확인
    console.log('Access Token:', accessToken) // 토큰 확인
    console.log('Refresh Token:', refreshToken)

    setAccessToken(accessToken) // axiosInstance에 accessToken 설정
    setAuthAccessToken(accessToken) // zustand 상태 관리에 accessToken 설정
    setAuthRefreshToken(refreshToken) // zustand 상태 관리에 refreshToken 설정

    setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'strict', // 또는 'lax' 또는 'none'으로 설정
    })

    // 세션 스토리지에 인증 상태 저장
    sessionStorage.setItem('isAuthenticated', 'true')
    setModalOpen(false)
    navigate('/home')
  }

  const handleLogin = async () => {
    try {
      console.log('Login request data:', { email, password })
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      })
      setResponseData(response)
      setModalOpen(true)
    } catch (error: any) {
      console.error('Login error:', error.response || error.message)
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed'
      alert(`Login failed: ${errorMessage}`)
    }
  }

  const autoLogin = async (email:string,password:string) => {
    try {
      console.log('Login request data:', { email, password })
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      })
      setResponseData(response)
      setModalOpen(true)
    } catch (error: any) {
      console.error('Login error:', error.response || error.message)
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed'
      alert(`Login failed: ${errorMessage}`)
    }
  }

  const handleSignUp = useCallback(() => {
    navigate('/signup')
  }, [navigate])

  const handleGoogleLogin = () => {
    googleLogin()
  }

  const handleKakaoLogin = () => {
    kakaoLogin()
  }
  
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const emailQuery = query.get('email')
    const passwordQuery = query.get('password')
    if (emailQuery && passwordQuery) {
      autoLogin(emailQuery, passwordQuery)
    }
  }, [location.search])

  return (
    <>
      <div className={styles.div}>
        <div className={styles.backred} />
        <div className={styles.component66}>
          <div className={styles.component63}>
            <b className={styles.b}>로그인</b>
            <b className={styles.bitamin1}>BItAMin에 오신 것을 환영합니다.</b>
          </div>
          <div className={styles.component65}>
            <div className={styles.component65Child} />
            <div className={styles.component64}>
              <div className={styles.component61}>
                <div className={styles.component61Child} />
                <br />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className={styles.div11}
                />
              </div>
              <div className={styles.component62}>
                <div className={styles.component61Child} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className={styles.div11}
                />
              </div>
              <div className={styles.component55} onClick={handleLogin}>
                <div className={styles.component55Child}>
                  <b className={styles.b1}>로그인</b>
                </div>
              </div>
              <div className={styles.component56} onClick={handleSignUp}>
                <div className={styles.component56Child}>
                  <b className={styles.b2}>회원가입</b>
                </div>
              </div>

              <div className={styles.component60}>
                <div className={styles.component60Child} />
                <div className={styles.component60Item} />
                <div className={styles.component59} onClick={handleGoogleLogin}>
                  <img
                    className={styles.loginIcon}
                    alt="Google Login"
                    src="/src/assets/image/google.png"
                  />
                </div>
                <div className={styles.component57} onClick={handleKakaoLogin}>
                  <img
                    className={styles.loginIcon}
                    alt="Kakao Login"
                    src="/src/assets/image/kakao2.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="로그인"
          content="로그인 성공!"
          iconSrc="ri.RiCheckFill"
          onClose={closeModal}
          headerBackgroundColor="#FF713C"
          buttonBorderColor="#FF713C"
          buttonTextColor="#FF713C"
          imgColor="#FF713C"
        />
      )}
    </>
  )
}

export default LoginPage
