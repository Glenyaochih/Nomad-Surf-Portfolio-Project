import Marquee from 'react-fast-marquee';

export default function NavbarMarquee() {
  return (
    <div className=' bg-dark  py-2 '>
      <Marquee pauseOnHover={false} direction='left'>
        <a
          className='text'
          href='#'
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <h6 className='fs-8 text-center text-white'>
            夏季熱血促銷 |滿千免運，現在買板送腳繩 ; 購買兩萬以上的衝浪板，鰭
            (FINs) 打8折
          </h6>
        </a>
      </Marquee>
    </div>
  );
}
