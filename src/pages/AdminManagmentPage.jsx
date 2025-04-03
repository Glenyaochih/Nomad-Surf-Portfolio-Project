

export default function AdminManagementPage() {
  return (
    <>
      <div class='backend d-flex vh-100'>
        <section class='aside col-2 web'>
          <div class='d-flex flex-column justify-content-between flex-shrink-0 text-white bg-primary-400 h-100 pt-9 px-7 pb-7'>
            <div>
              <a
                href='/'
                class='d-flex align-items-center mb-12 text-white text-decoration-none'
              >
                <img
                  class='img-fluid'
                  src='../assets/images/Ocean-Wings-logo-lg.svg'
                />
              </a>
              <ul class='nav nav-pills flex-column'>
                <li>
                  <a href='#' class='nav-link text-white fs-6 mb-9'>
                    顧客管理
                  </a>
                </li>
                <li>
                  <a href='#' class='nav-link text-white fs-6 mb-9'>
                    商品管理
                  </a>
                </li>
                <li>
                  <a href='#' class='nav-link text-white fs-6 mb-9'>
                    商品上架
                  </a>
                </li>
                <li>
                  <a href='#' class='nav-link text-white fs-6 mb-9'>
                    心得牆
                  </a>
                </li>
              </ul>
            </div>
            <button class='btn btn-primary-400 border py-3'>登出</button>
          </div>
        </section>

        <section class='main col-12 col-lg-10 mt-10'>
          <div class='app'>
            <div class='d-flex flex-row align-items-center justify-content-between mb-8'>
              <div class='d-flex align-items-center'>
                <i
                  class='bi bi-list text-white fs-3 me-4'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseExample'
                  aria-expanded='false'
                  aria-controls='collapseExample'
                ></i>
                <img src='../assets/images/backendIcon.png' class='img-fluid' />
              </div>
              <i class='bi bi-search text-white fs-5'></i>
            </div>

            <div class='collapse appNav' id='collapseExample'>
              <div class='d-flex flex-column justify-content-between text-white bg-primary-500 px-3'>
                <div>
                  <ul class='nav nav-pills flex-column'>
                    <li>
                      <a href='#' class='nav-link text-white fs-6 mb-9'>
                        顧客管理
                      </a>
                    </li>
                    <li>
                      <a href='#' class='nav-link text-white fs-6 mb-9'>
                        商品管理
                      </a>
                    </li>
                    <li>
                      <a href='#' class='nav-link text-white fs-6 mb-9'>
                        商品上架
                      </a>
                    </li>
                    <li>
                      <a href='#' class='nav-link text-white fs-6 mb-9'>
                        心得牆
                      </a>
                    </li>
                  </ul>
                </div>
                <button class='btn btn-primary-400 border mb-3 mt-18'>
                  會員登入
                </button>
              </div>
            </div>
          </div>

          <div class='web'>
            <div class='d-flex justify-content-between align-items-center pb-7'>
              <i class='bi bi-search text-white fs-5 web'></i>
              <div class='d-flex justify-content-center align-items-center'>
                <div class='userImage rounded-circle bg-white fs-5 me-3'>A</div>
                <div class='text-white fs-6'>Alice</div>
              </div>
            </div>
          </div>

          <div class='banner mb-4'>
            <h5 class='fs-5 mt-4 mb-7'>商品管理</h5>

            <div class='d-flex justify-content-between align-items-center'>
              <select
                class='form-select bg-primary-400 text-white h-100'
                aria-label='Default select example'
              >
                <option selected>類別</option>
                <option value='商品編號'>商品編號</option>
                <option value='商品名稱'>商品名稱</option>
                <option value='階級'>階級</option>
                <option value='價格'>價格</option>
              </select>
              <button class='btn btn-primary-500 text-white border deleteButton px-4'>
                <i class='bi bi-trash text-white me-1'></i>刪除
              </button>
            </div>
          </div>

          <div class='table-responsive pt-4'>
            <div
              class='table-container'
              data-bs-spy='scroll'
              data-bs-target='#productTableBody'
              data-bs-offset='0'
              tabindex='0'
            >
              <table class='table productManager rounded-table table-container table-hover'>
                <thead class=''>
                  <tr>
                    <th scope='col' class=''>
                      <input
                        class='form-check-input me-2'
                        type='checkbox'
                        value=''
                        id='flexCheckDefault'
                      />
                      <label
                        class='form-check-label mt-1'
                        for='flexCheckDefault'
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
                  <tr class='tableBorder'>
                    <th scope='col' class=''>
                      <input
                        class='form-check-input me-2'
                        type='checkbox'
                        value=''
                        id='flexCheckDefault'
                      />
                      <label class='mt-1' for='flexCheckDefault'>
                        1
                      </label>
                    </th>
                    <td>td#AHAGA68</td>
                    <td>奧本海默板</td>
                    <td>長板</td>
                    <td>高</td>
                    <td>12000</td>
                    <td>20</td>
                    <td>下架</td>
                    <td>是</td>
                    <td class='py-6'>
                      <img
                        src='https://fakeimg.pl/88/'
                        class='img-fluid rounded'
                      />
                    </td>
                    <td class='py-8'>
                      商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述商品描述
                    </td>
                    <td class=''>
                      <i class='bi bi-pencil-fill text-white'></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class='pagination mt-8 mb-6'>
            <div class='info text-white d-flex align-items-center'>
              1-10 / 100 筆
              <select class='form-select bg-primary-400 text-white ms-4 me-2'>
                <option>10 筆</option>
                <option>20 筆</option>
                <option>30 筆</option>
                <option>50 筆</option>
              </select>
              / 每頁
            </div>
            <div class='web'>
              <div class='pages d-flex justify-content-center align-items-center ms-15 me-13'>
                <button class='pagesButton'>1</button>
                <button class='pagesButton'>2</button>
                <button class='pagesButton'>3</button>
                <i class='bi bi-three-dots fs-3 text-white mx-3'></i>
                <button class='pagesButton'>10</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
