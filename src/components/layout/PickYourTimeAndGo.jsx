import OutlineButton from '../button/outlineButton';

const service = [
  {
    title: '查詢最佳衝浪時機',
    img: 'img/homePage/wave-condition.webp',
    destination: '/wave',
  },
  {
    title: '查離我最近的沖澡地點',
    img: 'img/homePage/shower-stop.webp',
    destination: '/shower-map',
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
                        <OutlineButton
                          btnName={'來去看看'}
                          btnColor={'primary-40'}
                          isArrowVisible={true}
                          destination={item.destination}
                        />
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
