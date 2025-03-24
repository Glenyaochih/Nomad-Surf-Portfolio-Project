import { useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/css'

export default function RecommendCarousel() {
	const [carouselData] = useState([
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-bottom-view.png' },
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-front-view.png' },
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-bottom-view.png' },
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-front-view.png' },
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-bottom-view.png' },
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-front-view.png' },
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-bottom-view.png' },
		{ title: 'GP-1', content: 'POP UP EASY', image: 'public/products/short-board-01-front-view.png' },
	])

	return (
		<div className='py-15'>
			<h1 className='mb-13'>推薦商品</h1>
			<Swiper spaceBetween={24} slidesPerView={4}>
				{carouselData.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className="position-relative">
							<img src={slide.image} alt="Card-1-img" />
							<div className="position-absolute top-50 start-50 translate-middle">
								<h2>{slide.title}</h2>
								<p>{slide.content}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
