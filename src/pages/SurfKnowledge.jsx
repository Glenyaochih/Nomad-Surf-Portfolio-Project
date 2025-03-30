

import { articlesData, courseData } from '../json/surfKnowledge.json'

export default function SurfKnowledge() {
	return (
		<>
			<section>
				<div className="surfKnowledge-banner">
					<div className="h-100 w-100 position-relative" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
						<div className="position-absolute top-50 start-50 translate-middle w-100">
							<h1 className="text-center mb-5 fs-4 fs-lg-1">
								認識你的<span className="text-primary-200">海上之翼</span>
							</h1>
							<h2 className="text-center fs-6 fs-lg-2">成為與大海溝通的浪人</h2>
						</div>
					</div>
				</div>
			</section>
			<div className="bg-primary-400">
				<div className="container ">
					<section className="pt-8 pb-5 pb-lg-8  pt-lg-13">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a className="" href="#">
										首頁
									</a>
								</li>
								<li className="breadcrumb-item active" aria-current="page">
									Library
								</li>
							</ol>
						</nav>
					</section>
					<section>
						<div className="pb-11 d-none d-lg-block" style={{ maxWidth: '416px' }}>
							<select className="form-select  mb-3" aria-label="Large select example">
								<option >衝浪知識</option>
								<option value="1">浪板知識</option>
								<option value="2">浪人生活</option>
								<option value="3">神人</option>
							</select>
						</div>
						<div className="d-lg-none">
							<div className="accordion" id="accordionPanelsStayOpenExample">
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
										文章選擇
										</button>
									</h2>
									<div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
										<div className="accordion-body">
											<div className="form-check">
												<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
												<label className="form-check-label" htmlFor="flexRadioDefault1">
												衝浪知識
												</label>
											</div>
											<div className="form-check">
												<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
												<label className="form-check-label" htmlFor="flexRadioDefault2">
												浪板知識
												</label>
											</div>
											<div className="form-check">
												<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
												<label className="form-check-label" htmlFor="flexRadioDefault2">
												浪人生活
												</label>
											</div>
											<div className="form-check">
												<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
												<label className="form-check-label" htmlFor="flexRadioDefault2">
												神人
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div className="row row-cols-1 row-cols-lg-2 gy-7">
							{articlesData.map((article, index) => {
								return (
									<div key={index} className="col">
										<a href="#" type="button">
											<div className="card rounded-4 surfKnowledge-card">
												<div className="card-body px-3 py-0">
													<h5 className="card-title text-center py-3 py-lg-7 m-0">{article.title}</h5>
													<img src={article.image} className="card-img-top rounded-4 object-fit-cover" alt="..." />
													<p className="card-text py-4 pt-lg-5 pb-lg-7">{article.content}</p>
												</div>
											</div>
										</a>
									</div>
								)
							})}
						</div>
						<div className="d-flex justify-content-end mt-15 position-relative">
							<a className="btn btn-lg d-none d-lg-block more-article " type="button" href="#">
								更多文章<span className="material-symbols-outlined fs-5 align-text-bottom">arrow_right</span>
							</a>
						</div>
						<div className="d-flex justify-content-end mt-sm-5 d-lg-none ">
							<a className="btn btn-sm more-article position-relative mt-12" type="button" href="#">
								更多文章<span className="material-symbols-outlined fs-5 align-text-bottom">arrow_right</span>
							</a>
						</div>
					</section>
				</div>
			</div>

			<div className="surfKnowledge-decoration" />
			<section>
				<div className="pt-9 d-lg-none">
					<div className="text-center">
						<h6 className="mb-3">想學習更多衝浪知識嗎？</h6>
						<p className="h7">從基礎到進階，量身打造你的衝浪課程</p>
					</div>
				</div>
				<div className="pt-9 d-none d-lg-block">
					<div className="text-center">
						<h4 className="mb-5">想學習更多衝浪知識嗎？</h4>
						<h5 className="h7">從基礎到進階，量身打造你的衝浪課程</h5>
					</div>
				</div>
			</section>
			<div className="container">
				<section className="pt-11 pb-13 pb-lg-16">
					<div className="px-18 d-none d-lg-block pt-13 pb-5">
						<div className="position-relative m-4">
							<div className="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: '1px' }}>
								<div className="progress-bar bg-primary-200" style={{ width: '100%' }}></div>
							</div>
							<div className="d-flex justify-content-center align-items-center position-absolute top-0 start-0 translate-middle  bg-primary-200 rounded-pill" style={{ width: '2.625rem', height: '2.625rem' }}>
								<h4 className="text-dark">1</h4>
							</div>
							<div className="d-flex justify-content-center align-items-center position-absolute top-0 start-50 translate-middle  bg-primary-200 rounded-pill" style={{ width: '2.625rem', height: '2.625rem' }}>
								<h4 className="text-dark">2</h4>
							</div>
							<div className="d-flex justify-content-center align-items-center position-absolute top-0 start-100 translate-middle  bg-primary-200 rounded-pill" style={{ width: '2.625rem', height: '2.625rem' }}>
								<h4 className="text-dark">3</h4>
							</div>
						</div>
					</div>

					<div className="row row-cols-sm-1  row-cols-lg-3 gy-7">
						{courseData.map((course, index) => {
							return (
								<div key={index} className="col">
									<a href="#" type="button" className="p-lg-5">
										<div className="card rounded-4 w-100">
											<div className="card-body px-3 py-4 align-middle">
												<div className="d-flex justify-content-center ">
													<div className=" pb-4 d-block d-lg-none">
														<img style={{ height: 30 }} src={course.crouseNum} width="100%" alt="third-party-img" />
													</div>
												</div>
												<div className="surfKnowledge-crouse-card">
													<img src={course.image} className="card-img-top rounded-4 object-fit-cover" alt="..." />
												</div>
												<p className="h7 text-center pt-3 pb-2">{course.title}</p>
												<div className="d-flex justify-content-center">
													<div style={{ maxWidth: '300px' }} className="border-top border-primary-200"></div>
												</div>
												<p className="text-center pt-5 pb-8">{course.courseQuantity}</p>
												<div className="d-flex justify-content-center">
													<button type="button" className="d-lg-none btn btn-outline-light btn-sm ">
														購買課程
													</button>
													<button type="button" className="d-none d-lg-block btn btn-outline-light">
														購買課程
													</button>
												</div>
											</div>
										</div>
									</a>
								</div>
							)
						})}
					</div>
				</section>
				<section>
					<div className="d-flex justify-content-center pb-2">
						<div className="pb-14 pb-lg-17 border-start border-primary-200"></div>
					</div>
					<div className="d-lg-none">
						<h6 className="text-center">認識衝浪知識後，來挑選更多商品吧</h6>
					</div>
					<div className="d-none d-lg-block">
						<h4 className="text-center">認識衝浪知識後，來挑選更多商品吧</h4>
					</div>
				</section>
				<section className="pt-11"></section>
			</div>
		</>
	)
}
