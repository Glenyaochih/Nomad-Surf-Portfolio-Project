import OutlineButton from '../../components/button/outlineButton';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import {
  setIsMember,
  userSigninAsync,
  userSignupAsync,
} from '../../redux/slice/front/user/userSlice';
import {
  selectIsMember,
  selectUserLoading,
  selectUserLogin,
} from '../../redux/slice/front/user/userSelectors';
import ScreenLoading from '../../components/loadings/ScreenLoading';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export default function UserLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMember = useSelector(selectIsMember);
  const userLoading = useSelector(selectUserLoading);
  const isUserLogin = useSelector(selectUserLogin);

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched' });

  const onSubmitUser = (data) => {
    const { ...user } = data;
    if (isMember) {
      dispatch(userSigninAsync(user));
    } else {
      dispatch(userSignupAsync(user));
    }
    reset();
  };

  useEffect(() => {
    const userToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)usersToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = userToken;
    if (isUserLogin) {
      navigate('/');
    }
  }, [isUserLogin, navigate]);
  return (
    <>
      <div className='member-login'>
        <div className='container'>
          {/*===== 麵包屑區塊 =====*/}
          <section>
            <div className='py-5'>
              <nav aria-label='breadcrumb '>
                <ol className='breadcrumb mb-0 py-2 '>
                  <li className='breadcrumb-item text-neutral-60 '>
                    <a
                      className='fs-8 fs-md-7 text-neutral-60'
                      href='#'
                      lang='zh-TW'
                    >
                      首頁
                    </a>
                  </li>
                  <li
                    className='breadcrumb-item text-neutral-60'
                    aria-current='page'
                  >
                    會員登入
                  </li>
                </ol>
              </nav>
            </div>
          </section>

          {/*===== From區塊 =====*/}
          <section>
            <div className='d-flex justify-content-center py-md-14 pb-11'>
              <div className='bg-neutral-10  rounded-4 px-5 py-11 input-box w-100'>
                <h5 className='text-center mb-11'>
                  {isMember ? '登入會員' : '註冊會員'}
                </h5>
                <form onSubmit={handleSubmit(onSubmitUser)}>
                  <div className='mb-7'>
                    <label
                      htmlFor='memberEmail'
                      className='form-label fs-9 text-neutral-60'
                    >
                      會員帳號
                    </label>
                    <input
                      {...register('email', {
                        required: '請填入會員帳號',
                        pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
                        message: 'Email 格式不正確',
                      })}
                      type='email'
                      className={`form-control ${errors.email && 'is-invalid'}`}
                      id='memberEmail'
                      placeholder='請輸入會員帳號'
                      autoComplete='user-account'
                    />
                    {errors.email && (
                      <div className='invalid-feedback'>
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className='mb-7'>
                    <label
                      htmlFor='memberPassword'
                      className='form-label fs-9 text-neutral-60'
                    >
                      密碼
                    </label>
                    <input
                      {...register('password', {
                        required: '請輸入密碼',
                        minLength: { value: 8, message: '密碼至少8碼' },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/,
                          message:
                            '密碼必須包含至少一個大寫字母、一個小寫字母、一個數字和一個特殊字符',
                        },
                      })}
                      type='password'
                      className={`form-control ${errors.password && 'is-invalid'}`}
                      id='memberPassword'
                      placeholder='請輸入會員密碼'
                      autoComplete='current-password'
                    />
                    {errors.password && (
                      <div className='invalid-feedback'>
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                  {isMember !== true && (
                    <div className='mb-7'>
                      <label
                        htmlFor='memberName'
                        className='form-label fs-9 text-neutral-60'
                      >
                        使用者名稱
                      </label>
                      <input
                        {...register('name', {
                          required: {
                            value: true,
                            message: '請輸入使用者名稱',
                          },
                        })}
                        type='text'
                        className={`form-control ${errors.name && 'is-invalid'}`}
                        id='memberName'
                        placeholder='請輸入會員名稱'
                      />
                      {errors.name && (
                        <div className='invalid-feedback'>
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                  )}

                  <div className='d-grid'>
                    <button
                      type='submit'
                      className='btn btn-primary-100 rounded-2'
                    >
                      {isMember ? '立即登入' : '立即註冊'}
                    </button>
                  </div>
                </form>
                <hr className='mt-11 mb-7' />
                <div className='d-flex justify-content-center'>
                  <h6 className='fs-7 me-3'>
                    {isMember ? '還不是會員?' : '已經是會員?'}
                  </h6>
                  <OutlineButton
                    btnName={isMember ? '點此註冊' : '點此登入'}
                    event={() =>
                      isMember
                        ? dispatch(setIsMember(false))
                        : dispatch(setIsMember(true))
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <ScreenLoading loadingSource={userLoading} />
      </div>
    </>
  );
}
