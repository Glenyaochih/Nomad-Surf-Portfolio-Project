import { useState } from "react";

export default function AdminManagementPage() {
  const [openTest,setOpenTest]=useState(true)
  return (
    <>
      <div className='backend d-flex vh-100'>
        <section className='aside col-2 web'>
          <div className='d-flex flex-column justify-content-between flex-shrink-0 text-white bg-primary-400 h-100 pt-9 px-7 pb-7'>
            <div>
              <a
                href='/'
                className='d-flex align-items-center mb-12 text-white text-decoration-none'
              >
                <img
                  className='img-fluid'
                  src='../assets/images/Ocean-Wings-logo-lg.svg'
                />
              </a>
              <ul className='nav nav-pills flex-column'>
                <li>
                  <a href='#' className='nav-link text-white fs-6 mb-9'>
                    顧客管理
                  </a>
                </li>
                <li>
                  <a href='#' className='nav-link text-white fs-6 mb-9'>
                    商品管理
                  </a>
                </li>
                <li>
                  <a href='#' className='nav-link text-white fs-6 mb-9'>
                    商品上架
                  </a>
                </li>
                <li>
                  <a href='#' className='nav-link text-white fs-6 mb-9'>
                    心得牆
                  </a>
                </li>
              </ul>
            </div>
            <button className='btn btn-primary-400 border py-3'>登出</button>
          </div>
        </section>

        <section className='main col-12 col-lg-10 mt-10'>
          <div className='app'>
            <div className='d-flex flex-row align-items-center justify-content-between mb-8'>
              <div className='d-flex align-items-center'>
                <i
                  className='bi bi-list text-white fs-3 me-4'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseExample'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                ></i>
                <img
                  src='../assets/images/backendIcon.png'
                  className='img-fluid'
                />
              </div>
              <i className='bi bi-search text-white fs-5'></i>
            </div>

            <div className='collapse appNav' id='collapseExample'>
              <div className='d-flex flex-column justify-content-between text-white bg-primary-500 px-3'>
                <div>
                  <ul className='nav nav-pills flex-column'>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        顧客管理
                      </a>
                    </li>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        商品管理
                      </a>
                    </li>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        商品上架
                      </a>
                    </li>
                    <li>
                      <a href='#' className='nav-link text-white fs-6 mb-9'>
                        心得牆
                      </a>
                    </li>
                  </ul>
                </div>
                <button className='btn btn-primary-400 border mb-3 mt-18'>
                  會員登入
                </button>
              </div>
            </div>
          </div>

          <div className='web'>
            <div className='d-flex justify-content-between align-items-center pb-7'>
              <i className='bi bi-search text-white fs-5 web'></i>
              <div className='d-flex justify-content-center align-items-center'>
                <div className='userImage rounded-circle bg-white fs-5 me-3'>
                  A
                </div>
                <div className='text-white fs-6'>Alice</div>
              </div>
            </div>
          </div>

          <div className='banner mb-4'>
            <h5 className='fs-5 mt-4 mb-7'>商品管理</h5>

            <div className='d-flex justify-content-between align-items-center'>
              <select
                className='form-select bg-primary-400 text-white h-100'
                aria-label='Default select example'
                defaultValue='defaultOptionValue'
              >
                <option value='defaultOptionValue'>類別</option>
                <option value='商品編號'>商品編號</option>
                <option value='商品名稱'>商品名稱</option>
                <option value='階級'>階級</option>
                <option value='價格'>價格</option>
              </select>
              <button className='btn btn-primary-500 text-white border deleteButton px-4'>
                <i className='bi bi-trash text-white me-1'></i>刪除
              </button>
            </div>
          </div>

          <div className='table-responsive pt-4'>
            <div
              className='table-container'
              data-bs-spy='scroll'
              data-bs-target='#productTableBody'
              data-bs-offset='0'
              tabIndex='0'
            >
              <table className='table productManager rounded-table table-container table-hover'>
                <thead className=''>
                  <tr>
                    <th scope='col' className=''>
                      <input
                        className='form-check-input me-2'
                        type='checkbox'
                        value=''
                        id='flexCheckDefault'
                      />
                      <label
                        className='form-check-label mt-1'
                        htmlFor='flexCheckDefault'
                      >
                        #
                      </label>
                    </th>
                    <th scope='col'>商品編號</th>
                    <th scope='col'>商品名稱</th>
                    <th scope='col'>商品類型</th>
                    <th scope='col'>階級</th>
                    <th scope='col'>價格</th>
                    <th scope='col'>數量</th>
                    <th scope='col'>狀態</th>
                    <th scope='col'>折價券</th>
                    <th scope='col'>圖片</th>
                    <th scope='col'>描述</th>
                    <th scope='col'>功能鍵</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='tableBorder'>
                    <th scope='col'>
                      <input
                        className='form-check-input me-2'
                        type='checkbox'
                        value=''
                        id='flexCheckDefault'
                      />
                      <label className='mt-1' htmlFor='flexCheckDefault'>
                        1
                      </label>
                    </th>
                    {openTest?
                    <>
                    <td>td#AHAGA68</td>
                    <td>奧本海默板</td>
                    <td>長板</td>
                    <td>高</td>
                    <td>12000</td>
                    <td>20</td>
                    <td>下架</td>
                    <td>是</td>
                    <td className='py-6'>
                      
                      <img
                      style={{height:'88px', width:'88px'}}
                        src='https://firebasestorage.googleapis.com/v0/b/glenyao-e1435.appspot.com/o/surfboard%2F2023-Christenson%2BSurfboards-OP%2BSeries-27%20(1).jpg?alt=media&token=08070ece-0ddf-4dee-bea0-4f8a3e7a7dad'
                        className='rounded object-fit-cover'
                      />
                  
                    </td>
                    <td className='py-8'>
                      商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
                    </td>
                    <td className=''>
                      <i className='bi bi-pencil-fill text-white'></i>
                    </td>
                    </>:<>
                    <td>td#AHAGA68</td>
                    <td>奧本海默板</td>
                    <td>長板</td>
                    <td>高</td>
                    <td>12000</td>
                    <td>20</td>
                    <td>下架</td>
                    <td>是</td>
                    <td className='py-6'>
                      
                      <img
                      style={{height:'88px', width:'88px'}}
                        src='https://firebasestorage.googleapis.com/v0/b/glenyao-e1435.appspot.com/o/surfboard%2F2023-Christenson%2BSurfboards-OP%2BSeries-41.jpg?alt=media&token=87ea3367-9be4-4aba-ab0c-05d8ed91c368'
                        className='rounded object-fit-cover'
                      />
                  
                    </td>
                    <td className='py-8'>
                      商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
                    </td>
                    <td className=''>
                      <i className='bi bi-pencil-fill text-white'></i>
                    </td>
                    </>

                    }
                   
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='pagination mt-8 mb-6'>
            <div className='info text-white d-flex align-items-center'>
              1-10 / 100 筆
              <select className='form-select bg-primary-400 text-white ms-4 me-2'>
                <option>10 筆</option>
                <option>20 筆</option>
                <option>30 筆</option>
                <option>50 筆</option>
              </select>
              / 每頁
            </div>
            <div className='web'>
              <div className='pages d-flex justify-content-center align-items-center ms-15 me-13'>
                <button className='pagesButton'>1</button>
                <button className='pagesButton'>2</button>
                <button className='pagesButton'>3</button>
                <i className='bi bi-three-dots fs-3 text-white mx-3'></i>
                <button className='pagesButton'>10</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
