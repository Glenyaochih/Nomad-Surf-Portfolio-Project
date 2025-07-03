import { useState } from 'react';
import OutlineButton from '../../components/button/outlineButton';
import { useDispatch } from 'react-redux';
import { userSignupAsync } from '../../redux/slice/front/user/userSlice';

export default function MemberLoadingPage() {
  const [isMember, setIsMember] = useState(false);
  const dispatch = useDispatch();
  const data = {
    email: '77777888@gmail.com',
    password: 'asdf',
    firstName: 'asdf',
    lastName: 'Monge',
    age: 32,
  };
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
                      className='fs-8 fs-sm-7 text-neutral-60'
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
            <div className='d-flex justify-content-center py-14'>
              <div className='bg-neutral-10  rounded-4 px-5 py-11 input-box w-100'>
                <h5 className='text-center mb-11'>
                  {isMember ? '登入會員' : '註冊會員'}
                </h5>
                <form onSubmit={() => dispatch(userSignupAsync(data))}>
                  <div className='mb-7'>
                    <label
                      htmlFor='memberAccountInput'
                      className='form-label fs-9 text-neutral-60'
                    >
                      會員帳號
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='memberAccountInput'
                      placeholder='請輸入會員帳號'
                    />
                  </div>
                  <div className='mb-7'>
                    <label
                      htmlFor='memberAccountInput'
                      className='form-label fs-9 text-neutral-60'
                    >
                      密碼
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='memberAccountInput'
                      placeholder='請輸入會員密碼'
                    />
                  </div>
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
                  <OutlineButton btnName={isMember ? '點此註冊' : '點此登入'} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
