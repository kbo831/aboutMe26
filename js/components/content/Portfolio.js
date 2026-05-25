import {ref,onMounted,onUnmounted} from 'vue';

export default {
    name : 'PortfolioSection', // 컴포넌트 이름
    setup(){ 
        // 포트폴리오 제목 fade-in 애니메이션 
        const initTitleObserver=()=>{
            //감시할 태그 제목
            const title = document.querySelector('.portfolio-title');
            if (!title) return; // 제목 없으면 코드 종료  

            //observer 객체 생성 
            const observer = new IntersectionObserver((entries)=>{
                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        //화면에 들어왔으면 클래스 추가 애니메이션 실행
                        entry.target.classList.add('is-visible');
                    }else{
                        entry.target.classList.remove('is-visible');
                    }
                });//entries end
                
            },{ // 제목이 화면 아래에서 위로 30% 보이면 애니메이션 트리거
                threshold: 0.3
            }); //observer end
            
            //제목 돔요소에 observer 감시 붙이기
           observer.observe(title);

        };//initTitleObserver end 
            
        // 포트폴리오 목록 gsap
        let portfolioTimeline;

        const initPortfolioScroll = () =>{
            const triggerSection = document.querySelector('.portfolio-trigger-section');
            const cards = document.querySelectorAll('.ul.full-list .li');
            const navItems = document.querySelectorAll('.portfolio-bookmark li');

            if (!triggerSection || cards.length === 0) return; // 이벤트 트리거  요소, 카드 요소  없으면 종료

            portfolioTimeline= gsap.timeline({
                
                scrollTrigger : {
                    trigger: triggerSection, // 애니메이션이 시작될 기준 구역
                    pin: true,// trigger 영역 고정
                    scrub: 1, //스크롤 휠의 움직임과 애니메이션 속도를 부드럽게 동기화,1초 딜레이
                    start: "top top", // trigger 영역 맨 위가 화면 맨 위에 닿을 때 시작
                    end: "+=300%", //스크롤을 아래로 300%만큼 내리는 동안 고정 유지

                    // 실시간 스크롤 위치(진행도)에 따라 왼쪽 책갈피 메뉴 활성화
                    onUpdate:(self)=>{
                        // self.progress는 전체 스크롤 진행도 (0.0 ~ 1.0)
                        const progress = self.progress;
                        const totalCards = cards.length; // 카드 전체 개수
                        let activeIndex = Math.min(Math.floor(progress * totalCards), totalCards - 1); 
                        
                        navItems.forEach((nav, idx) => {
                            if (idx === activeIndex) { //활성화 인덱스와 li의 idx가 동일하면
                                nav.classList.add('active'); //활성화 클래스 추가
                            } else {
                                nav.classList.remove('active');
                            }
                        });
                   }//onUpdate end
                }
            }); // gsap end

      
            //타임라인에 카드 올라오는 순서대로 동작 정의
           cards.forEach((card, idx) => {
                if (idx === 0) return; // 1번 카드는 이미 기본 배치되어 있으므로 패스

                    gsap.set(card, { y: "100%" });
                    portfolioTimeline.to(card, { 
                    y: "0%", 
                    ease: "none" 
                });
            });

        }//initPortfolioScroll end

        onMounted(()=>{
            // html 문서 전체에서 괄호 내 태그 찾기 => CSS를 불러오는 <link> 태그 중에서, href(경로)에 about.css 포함된 태그 
            if (!document.querySelector('link[href*="portfolio.css"]')){ 
                const link = document.createElement('link'); //태그 생성
                link.rel = 'stylesheet';
                link.href = './assets/css/content/portfolio.css';
                document.head.appendChild(link); //head 태그에 추가
            }
            
            setTimeout(() => {
                initTitleObserver();  // 돔요소와 css 링크 전부 렌더링 후 제목 페이드인 애니메이션 실행
                initPortfolioScroll();//gsap 스크롤 애니메이션 
            }, 100);
           
        });

        onUnmounted(() => {
                // 페이지를 이동하거나 컴포넌트가 사라질 때 고정된 스크롤 메모리를 해제해야 버그가 안 생김
                if (portfolioTimeline) {
                    portfolioTimeline.scrollTrigger.kill();
                    portfolioTimeline.kill();
                }
        });

        return {};
    },
    //html 마크업
    template: `
<section class="sc sub-content">
    <div class="sc-inner">
    
    <!-- Trigger 구역: 스크롤을 감지하고 전체를 고정(Pin)할 구역 -->
    <div id="portfolio" class="portfolio-trigger-section">
        <h2 class="portfolio-title">Portfolio</h2>
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
                    <!--Start: faceLogin -->
                    <li class="li">
                        <div  class="link">
                            <div class="lst-con left">
                                <h3 class="link-title"><i class="num">01.</i>
                                얼굴로그인
                                <a class="btn git icon" href="https://github.com/TaengAndJong/faceLogin.git" title="프로젝트 원격저장소 바로가기"  target="_blank">
                                        <span class="sr-only">프로젝트 원격저장소 바로가기 버튼</span>
                                </a>
                                </h3>
                                
                                <div class="desc">
                                    <p>회원가입 시, 아이디와 사용자 얼굴 </p>
                                    <strong class="desc-title">클라이언트</strong>                                
                                
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
                    <!--End: faceLogin -->
                    <!-- Start -->
                    <li class="li">
                        <div  class="link">
                            <div class="lst-con left">
                                    <h3 class="link-title"><i class="num">02.</i>사이드 프로젝트 준비중</h3>
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
                    <!-- thebook -->
                    <li class="li">
                        <div  class="link">
                            <div class="lst-con left">
                                <h3 class="link-title">
                                    <i class="num">03.</i>도서판매<small>(PC형)</small>
                                    <a class="btn git icon" href="https://github.com/TaengAndJong/team01.git" title="프로젝트 원격저장소 바로가기"  target="_blank">
                                            <span class="sr-only">프로젝트 원격저장소 바로가기 버튼</span>
                                    </a>
                                </h3>
                                <div class="desc">
                                    <p>일반회원과 관리자로 권한을 분리한 도서 판매 웹 서비스( 예외처리, 책임분리 수정 중 )</p>
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
                    <!-- End -->
                    
                </ul>
            <!-- 포트폴리오 ul -->
            </div>
        <!--스크롤 wrap-->
        </div>
    </div>
</section>
    `
    
};


/*
Math.min(Math.floor(progress * totalCards), totalCards - 1); 
Math.min(A,B) : A와 B 중 최소값 선택
progress : GSAP이 알려주는 현재 스크롤 진행도로 최소 0.0 ~ 최대 1.0
totalCards : 아이템의 개수 총 개수 
progress * totalCards : 

0.0 * 3  = 0 =>  Math.floor(0.0) = 0, 소수점 탈락
0.5 * 3 = 1.5 => Math.floor(1.5) = 1, 소수점 탈락
0.9 * 3 = 2.7 => Math.floor(2.7) = 2 
1.0 * 3 = 3.0 => Math.floor(3.0) = 3 

 ** totalCards - 1 의 중요성
전체 아이템의 개수가 3개라면 인덱스의 마지막 값은 2이기 때문에 3이 오면 에러가 생기기 때문에 
최종 인덱스값과 동일한 값을 맞추기 위해 -1을 해줌 
Math.min() 함수를 통해 '전체 아이템 갯수 -1'을 최소값으로 반환하여 마지막 인덱스에 맞춤

Math.min(A,B) 
= Math.min(0,totalCards-1)
= Math.min(0,2) = 0
= Math.min(1,2) = 1
= Math.min(3,2) = 2

*/