export default function AdminLoadingPage() {
  return (
    <>
      <div className='loading-page-background vh-100'>
        <div className='h-100 w-100' style={{backgroundColor:'rgba(0,0,0,0.2)'}}>
          <div className='container  h-100'>
            <div className='d-flex flex-column justify-content-center align-items-center  h-100'>
              <h1 className='mb-3 py-6'>
                Welcome
                <br />
                Nomad Partner
              </h1>
              <form className="input-width" >
                <div className='row g-3 border-bottom mb-7' >
                  <div className='col-sm-2'>
                    <label htmlFor='inputEmail' className='col-form-label'>
                      E-mail
                    </label>
                  </div>
                  <div className='col-sm-10'>
                    <input
                      type='email'
                      id='inputEmail'
                      className='form-control border-0'
                      aria-describedby='passwordHelpInline'
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className='row g-3 border-bottom mb-7'>
                  <div className='col-sm-2'>
                    <label htmlFor='inputPassword' className='col-form-label'>
                      password
                    </label>
                  </div>
                  <div className='col-sm-10'>
                    <input
                      type='password'
                      id='inputPassword'
                      className='form-control border-0'
                      aria-describedby='passwordHelpInline'
                    />
                  </div>
                </div>
                <div className='d-grid  '>
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
      </div>
    </>
  );
}
