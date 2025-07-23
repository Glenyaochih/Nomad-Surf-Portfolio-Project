import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import {
  adminLoginAsync,
  checkAuthStatusAsync,
  setAccount,
} from '../../redux/slice/admin/adminLoginSlice';
import ScreenLoading from '../../components/loadings/ScreenLoading';

export default function AdminLoginPage() {
  const dispatch = useDispatch();

  const inputAccount = (e) => {
    const { value, name } = e.target;
    dispatch(setAccount({ value, name }));
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(adminLoginAsync());
  };
  useEffect(() => {
    const token = document.cookie.replace(
      //重新加入token 執行驗證
      /(?:(?:^|.*;\s*)nomadsToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    dispatch(checkAuthStatusAsync());
  }, [dispatch]);

  return (
    <>
      <div className='loading-page-background vh-100'>
        <div
          className='h-100 w-100'
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <div className='container  h-100 text-white'>
            <div className='d-flex flex-column justify-content-center align-items-center  h-100'>
              <h1 className='mb-3 py-6'>
                Welcome
                <br />
                Nomad Partner
              </h1>
              <form onSubmit={loginHandler} className='input-width'>
                <div className='row g-3 border-bottom mb-7'>
                  <div className='col-md-2'>
                    <label htmlFor='inputEmail' className='col-form-label'>
                      E-mail
                    </label>
                  </div>
                  <div className='col-md-10'>
                    <input
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      name='username'
                      type='email'
                      id='inputEmail'
                      className='form-control border-0'
                      aria-describedby='passwordHelpInline'
                      onChange={inputAccount}
                    />
                  </div>
                </div>
                <div className='row g-3 border-bottom mb-7'>
                  <div className='col-md-2'>
                    <label htmlFor='inputPassword' className='col-form-label'>
                      password
                    </label>
                  </div>
                  <div className='col-md-10'>
                    <input
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      name='password'
                      type='password'
                      id='inputPassword'
                      className='form-control border-0'
                      aria-describedby='passwordHelpInline'
                      onChange={inputAccount}
                    />
                  </div>
                </div>
                <div className='d-grid'>
                  <button
                    type='submit'
                    className='btn btn-outline-light rounded-pill'
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ScreenLoading />
      </div>
    </>
  );
}
