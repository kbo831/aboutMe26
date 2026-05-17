import {ref,onMounted} from 'vue';

export default {
    name : 'PortfolioSection', // 컴포넌트 이름
    setup(){ 
         // js 코드
    onMounted(()=>{
        // html 문서 전체에서 괄호 내 태그 찾기 => CSS를 불러오는 <link> 태그 중에서, href(경로)에 about.css 포함된 태그 
        if (!document.querySelector('link[href*="portfolio.css"]')){ 
            const link = document.createElement('link'); //태그 생성
            link.rel = 'stylesheet';
            link.href = '../../assets/css/content/portfolio.css';
            document.head.appendChild(link); //head 태그에 추가
        }
    });
        return {};
    },
    //html 마크업
    template: `
<div class="sc sub-content">
    <!-- Trigger 구역: 스크롤을 감지하고 전체를 고정(Pin)할 구역 -->
    <div id="portfolio" class="portfolio-trigger-section">

    <!-- 책갈피(Bookmark Nav): 화면 한쪽에 고정될 네비게이션 -->
    <nav class="portfolio-bookmark">
        <ul>
            <li class="active" data-slide="0"><a href="#void"><span>01. 도서판매</span></a></li>
            <li data-slide="1"><a href="#void"><span>02. 얼굴로그인</span></a></li>
            <li data-slide="2"><a href="#void"><span>03. 준비중</span></a></li>
        </ul>
    </nav>
    <!-- Scroll Wrap: 실제 세로로 움직이거나 고정되어 굴러갈 콘텐츠 상자 -->
    <div class="portfolio-scroll-wrap">
            <!-- 포트폴리오 ul -->
            <ul class="ul full-list">
                <!-- thebook -->
                <li class="li">
                    <div  class="link">
                        <div class="lst-con left">
                            <h3 class="link-title">
                              <i class="num">01.</i>도서판매<small>(PC형)</small>
                               <a class="btn git icon" href="https://github.com/TaengAndJong/team01" title="프로젝트 원격저장소 바로가기"  target="_blank">
                                    <span class="sr-only">프로젝트 원격저장소 바로가기 버튼</span>
                              </a>
                            </h3>
                            <div class="desc">
                                <p>일반회원과 관리자로 권한을 분리한 도서 판매 웹 서비스</p>
                                <strong class="desc-title">클라이언트</strong>                                
                                <p>회원가입, 마이페이지(찜·개인정보·배송지 관리), 장바구니, 결제, 도서 조회 및 검색 기능을 이용 가능
                                    <a href="https://www.tjbook.store" class="btn go-btn" title="클라이언트 바로가기 새창열림" target="_blank">
                                        <span>go</span>
                                        <i class="icon arrow_black"></i>
                                    </a>
                                </p>
                                <strong class="desc-title">관리자</strong>
                                <p>방문자 통계, 페이지 클릭뷰, 도서 등록/수정/삭제, 게시판 문의 관리 기능을 통해 전체 사이트를 운영 가능
                                    <a href="https://www.tjbook.store/admin" class="btn go-btn" title="관리자 바로가기 새창열림" target="_blank">
                                        <span>go</span>
                                        <i class="icon arrow_black"></i>
                                    </a>
                                </p>
                                <strong class="desc-title">사용기술</strong>
                                <ul class="skill">
                                    <!-- Programming Languages -->
                                    <li>
                                        <i class="skill-icon java"></i>
                                        <p class="sr-only">java</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon sql"></i>
                                        <p class="sr-only">oracle sql</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon js"></i>
                                        <p class="sr-only">javascript</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon css"></i>
                                        <p class="sr-only">css</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon sass"></i>
                                        <p class="sr-only">sass</p>
                                    </li>
                                    <!-- Frameworks & Back-end -->
                                    <li>
                                        <i class="skill-icon react"></i>
                                        <p class="sr-only">react</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon spring_boot"></i>
                                        <p class="sr-only">spring boot</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon spring_security"></i>
                                        <p class="sr-only">spring security</p>
                                    </li>
                                    <!--  Libraries -->
                                    <li>
                                        <i class="skill-icon swiper"></i>
                                        <p class="sr-only">swiper</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon gsap"></i>
                                        <p class="sr-only">gsap</p>
                                    </li>
                                    <!--  Design Tools -->
                                    <li>
                                        <i class="skill-icon figma"></i>
                                        <p class="sr-only">figma</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon ps"></i>
                                        <p class="sr-only">photoshop</p>
                                    </li>
                                    <!-- Tools & Editors -->
                                    <li>
                                        <i class="skill-icon vscode"></i>
                                        <p class="sr-only">vscode</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon intelliJ"></i>
                                        <p class="sr-only">intelliJ</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon vite"></i>
                                        <p class="sr-only">vite</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner">
                                    <img src="../../assets/image/portfolio/theBook/theBook.jpg" alt="도서판매포트폴리오 이미지">
                                </div>
                            </div>
                        </figure>
                    </div>
                </li>
                <!-- thebook -->
                <!-- Start -->
                <li class="li">
                    <div  class="link">
                        <div class="lst-con left">
                            <h3 class="link-title"><i class="num">02.</i>얼굴로그인</h3>
                            <div class="desc">
                                <p>회원가입 시, 얼굴이미지를 촬영하여</p>
                                <strong class="desc-title">클라이언트</strong>                                
                                <p>회원가입, 마이페이지(찜·개인정보·배송지 관리), 장바구니, 결제, 도서 조회 및 검색 기능을 이용 가능</p>
                                <strong class="desc-title">관리자</strong>
                                <p>방문자 통계, 페이지 클릭뷰, 도서 등록/수정/삭제, 게시판 문의 관리 기능을 통해 전체 사이트를 운영 가능</p>
                                <strong class="desc-title">구축언어</strong>
                                <ul class="skill">
                                    <li>
                                        <i class="skill-icon java"></i>
                                        <p class="sr-only">java</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon react"></i>
                                        <p class="sr-only">react</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon vite"></i>
                                        <p class="sr-only">vite</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon spring_boot"></i>
                                        <p class="sr-only">spring boot</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon spring_security"></i>
                                        <p class="sr-only">spring security</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon sass"></i>
                                        <p class="sr-only">sasse</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon figma"></i>
                                        <p class="sr-only">figma</p>
                                    </li>
                                    <li>
                                        <i class="skill-icon photoshop"></i>
                                        <p class="sr-only">photoshop</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner">
                                    <img src="../../assets/image/portfolio/theBook/theBook.jpg" alt="도서판매포트폴리오 이미지">
                                </div>
                            </div>
                        </figure>
                    </div>
                </li>
                <!-- End -->
                <!-- Start -->
                <li class="li">
                    <div  class="link">
                        <div class="lst-con left">
                                <h3 class="link-title"><i class="num">03.</i>사이드 프로젝트 준비중</h3>
                                <div class="desc">
                                    <p>일반회원과 관리자로 권한을 분리한 도서 판매 웹 서비스</p>
                                    <strong class="desc-title">클라이언트</strong>                                
                                    <p>회원가입, 마이페이지(찜·개인정보·배송지 관리), 장바구니, 결제, 도서 조회 및 검색 기능을 이용 가능</p>
                                    <strong class="desc-title">관리자</strong>
                                    <p>방문자 통계, 페이지 클릭뷰, 도서 등록/수정/삭제, 게시판 문의 관리 기능을 통해 전체 사이트를 운영 가능</p>
                                </div>
                        </div>
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner">
                                    <img src="../../assets/image/portfolio/theBook/theBook.jpg" alt="도서판매포트폴리오 이미지">
                                </div>
                            </div>
                        </figure>
                    </div>
                </li>
                <!-- End -->
            </ul>
            <!-- 포트폴리오 ul -->
        </div>
        <!--스크롤 wrap-->
    </div>
</div>
    `
    
};
