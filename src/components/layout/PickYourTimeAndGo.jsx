const service = [
  { title: '查詢最佳衝浪時機', img: 'img/homePage/wave-condition.webp' },
  {
    title: '查離我最近的沖澡地點',
    img: 'img/homePage/shower-stop.webp',
  },
];

export default function PickYourTimeAndGo() {
  return (
    <>
      <div className='bg-neutral-40 py-7 py-sm-14'>
        <div className='container'>
          <div className='mb-7'>
            <h4 className='text-center' lang='zh-TW '>
              隨時出發 <span lang='en'>Pick Your time and GO!</span>
            </h4>
          </div>
          <div className='row row-cols-1 row-cols-sm-2 gy-7'>
            {service.map((item, index) => {
              return (
                <div className='col' key={index}>
                  <div className='card text-bg-dark rounded-4 wave-condition'>
                    <img
                      src={item.img}
                      className='card-img object-fit-cover rounded-4 '
                      alt='wave-condition'
                    />
                    <div className='card-img-overlay p-0 d-flex align-items-center'>
                      <div className='ms-7'>
                        <h5 className='card-title mb-5'>{item.title}</h5>
                        <button className='btn border-0  p-0 fw-normal text-primary-100 fs-7 icon-link icon-link-hover fs-sm-6'>
                          來去看看
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='bi ms-3 fs-5'
                            viewBox='0 0 15 15'
                            aria-hidden='true'
                          >
                            <path d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z' />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
