export default function DarkButtonLinearG({ btnName, btnType, type, event }) {
  return (
    <button
      type={type}
      onClick={event}
      style={{ letterSpacing: '10%' }}
      className={`btn ${btnType} btn-lg border border-white icon-link icon-link-hover d-inline-block fs-7 fs-sm-6 rounded-pill px-9`}
      lang='zh-TW'
    >
      {btnName}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='bi ms-3 fs-5'
        viewBox='0 1 15 15'
        aria-hidden='true'
      >
        <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
      </svg>
    </button>
  );
}
