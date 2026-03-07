import { MdOutlineFilterAlt } from 'react-icons/md';

export default function ShowerMapFilter() {
  return (
    <div className='dropdown ' data-bs-auto-close='outside'>
      <button
        type='button'
        className='btn btn-light rounded-2'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <MdOutlineFilterAlt />
      </button>
      <ul className='dropdown-menu dropdown-menu-end ps-5'>
        <li>
          <div className='form-check text-align-center'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='wave'
            />
            <label className='form-check-label' htmlFor='wave'>
              浪點
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
}
