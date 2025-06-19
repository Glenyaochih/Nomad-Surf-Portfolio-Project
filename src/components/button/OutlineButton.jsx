import { Link } from 'react-router-dom';

export default function OutlineButton({
  btnName,
  btnColor,
  isVisible,
  isArrowVisible,
  type,
  event,
  disabled,
  destination,
}) {
  const commonProps = {
    style: { opacity: isVisible },
    className: `btn border-0  p-0 fw-normal text-${btnColor} fs-7 icon-link icon-link-hover text-nowrap`,
  };

  const iconSvg = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='bi ms-3 fs-5'
      viewBox='0 0 15 15'
      aria-hidden='true'
    >
      <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
    </svg>
  );
  if (destination) {
    return (
      <Link to={destination} onClick={event} type={type} {...commonProps}>
        {btnName}
        {isArrowVisible ? iconSvg : ''}
      </Link>
    );
  } else {
    return (
      <button disabled={disabled} type={type} onClick={event} {...commonProps}>
        {btnName} {isArrowVisible ? iconSvg : ''}
      </button>
    );
  }
}
