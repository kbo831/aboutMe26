import { ref, onMounted, onUnmounted, nextTick } from "vue";

export default {
  name: "PortfolioSection", // 컴포넌트 이름
  setup() {
    // 프로젝트 상세보기 버튼 상태 관리
    const isExpanded = ref({});

    // 상세보기 토글 함수
    const toggleExpand = async (id) => {
      if (isExpanded.value[id] === undefined) {
        isExpanded.value[id] = false;
      }
      isExpanded.value[id] = !isExpanded.value[id];
      await nextTick();
    };

    const scrollToCard = (index) => {
      const cards = document.querySelectorAll(".portfolio-card");
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth", 
          block: "center", 
        });
      }
    };

    //unmounted에서 해제할 수 있도록 observer 변수를 상위에 선언
    let scrollObserver = null;
    let bookmarkObserver = null;

    // 포트폴리오 제목 & 카드 fade-in 애니메이션
    const initScrollAnimation = () => {

    const portfolioSection = document.querySelector(".sc-portfolio"); //전체 섹션
    const targets = document.querySelectorAll(".portfolio-title, .portfolio-card"); // 제목과 프로젝트 목록들
    const bookmarkNav = document.querySelector(".portfolio-bookmark"); // 책갈피

      if (targets.length === 0 && !portfolioSection) return; // 대상이 아무것도 없으면 중단

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            //감시 중인 요소가 '전체 포트폴리오 섹션'일 때
            if (entry.target === portfolioSection) {
                if (entry.isIntersecting) {
                    bookmarkNav?.classList.add("is-visible");    // 책갈피 등장
                } else {
                    bookmarkNav?.classList.remove("is-visible"); // 책갈피 사라짐
                }
            }
           else {  //감시 중인 요소가 기존 '제목'이나 '카드'일 때
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");        // 페이드인 애니메이션 켬
                } else {
                    entry.target.classList.remove("is-visible");     // 페이드인 애니메이션 끔
                }
            }
          });
          //끝
        },
       { threshold: [0.02, 0.3] }
      );
    if (portfolioSection) observer.observe(portfolioSection); // 전체 섹션 감시 등록
    targets.forEach((target) => observer.observe(target));    // 개별 제목/카드 감시 등록
    };

    // 책갈피 활성화 감시 함수
    const initBookmarkObserver = () => {
      const cards = document.querySelectorAll(".portfolio-card");
      const bookmarkItems = document.querySelectorAll(".portfolio-bookmark li");

      if (cards.length === 0 || bookmarkItems.length === 0) return;

      const bookmarkObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(cards).indexOf(entry.target);
              if (index !== -1) {
                bookmarkItems.forEach((item) => item.classList.remove("active"));
                bookmarkItems[index].classList.add("active");
              }
            }
          });
        },
        {
          rootMargin: "-20% 0px -40% 0px",
          threshold: 0.1, 
        }
      );

      cards.forEach((card) => bookmarkObserver.observe(card));
    };

    onMounted(() => {
      const csshref = "./assets/css/content/portfolio.css";
      let cssLink = document.querySelector(`link[href*="portfolio.css"]`);

      const startPortfolioLogic = async () => {
        await nextTick();
        initScrollAnimation();
        initBookmarkObserver(); 
      };

      if (!cssLink) {
        cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = csshref;
        document.head.appendChild(cssLink);

        cssLink.onload = () => {
          startPortfolioLogic();
        };
      } else {
        startPortfolioLogic();
      }
    });

    //unmounted의 진짜 역할: 페이지 이동 시 브라우저 메모리 최적화 및 에러 방지
    onUnmounted(() => {
      // 필요 시 인스턴스 해제 로직 작성 공간
        if (scrollObserver) scrollObserver.disconnect();
        if (bookmarkObserver) bookmarkObserver.disconnect();
    });

    return {
      isExpanded, 
      toggleExpand,
      scrollToCard, // 이제 스코프가 맞아 정상적으로 반환됩니다.
    };
  },
  
  template: `
<section class="sc sub-content sc-portfolio">
    <div class="sc-inner">
        <h2 class="portfolio-title">Portfolio</h2>
        
        <nav class="portfolio-bookmark">
            <ul>
                <li class="active" data-slide="0">
                    <a href="#void" @click.prevent="scrollToCard(0)"><span>01.얼굴로그인</span></a>
                </li>
                <li data-slide="1">
                    <a href="#void" @click.prevent="scrollToCard(1)"><span>02.도서판매</span></a>
                </li>
                <li data-slide="2">
                    <a href="#void" @click.prevent="scrollToCard(2)"><span>03.PMS&AI추천</span></a>
                </li>
                <li data-slide="3">
                    <a href="#void" @click.prevent="scrollToCard(3)"><span>04.GIS</span></a>
                </li>
                 <!-- <li data-slide="3">
                    <a href="#void" @click.prevent="scrollToCard(3)"><span>04.추천시스템</span></a>
                </li> -->
            </ul>
        </nav>
        
        <div id="portfolio" class="portfolio-trigger-section">
            <div class="ul full-list portfolio-scroll-wrap">
                
                <div class="li portfolio-card">
                    <h3 class="link-title"><i class="num">01.</i>얼굴로그인</h3>
                    <div class="seperate-con">
                        <div class="lst-con left">
                            <h4 class="desc-title">프로젝트 설명</h4>
                            <div class="desc-sc">
                                <h5 class="title desc-b_title">얼굴 인식(MediaPipe)기반 다중 인증(MFA)을 활용한 보안 로그인 시스템</h5>
                                <p>Webcam 이미지에서 MediaPipe로 얼굴 벡터를 추출하고, Redis와 JWT를 활용해 2차 인증을 구현한 보안 프로젝트입니다.</p>
                            </div>
                            
                            <div class="desc-sc">
                                <strong class="title desc-S_title">회원가입 흐름</strong>
                                <p>아이디 중복검증/이메일 OTP 인증 ➔ 동의 확인 ➔ 웹캠 촬영 ➔ Spring Boot 전송 및 2차검증 ➔ Python 서버 얼굴 임베딩 생성 ➔ pgvector 기반 얼굴 벡터 저장</p> 
                                <strong class="title desc-s_title">로그인흐름</strong>
                                <p>웹캠 촬영 ➔ Python 서버 얼굴 임베딩 생성 ➔ pgvector 유사도 비교 ➔ Custom Provider 인증 ➔ 결과 처리</p>
                            </div>
                             
                            <button @click="toggleExpand('faceLogin')" class="btn basic-btn">
                                {{ isExpanded['faceLogin'] ? '상세설명 닫기' : '상세설명 보기' }}
                            </button>
                            <a class="btn basic-btn" href="https://github.com/TaengAndJong/faceLogin.git" target="_blank">원격저장소</a>
                            <a class="btn basic-btn" href="doc/UISpecification_faceLogin.pdf" target="_blank">화면정의서</a>
                            <div v-show="isExpanded['faceLogin']" class="desc-sc">
                                <strong class="title">&#9654;&nbsp;회원가입 상세</strong>
                                <ol class="register-list desc-list basic">
                                    <li>사용자 아이디 중복 여부를 확인</li>
                                    <li>이메일 OTP 인증 (javaMail, Redis TTL 캐시 사용)</li>
                                    <li>웹캠 이미지 Spring Boot 서버로 전송</li>
                                    <li>RegisterReqDto 데이터 2차 검증 수행</li>
                                    <li>Python 서버에 얼굴 이미지 분석 요청</li>
                                    <li>MediaPipe + ResNet 기반 512차원 얼굴 벡터 반환</li>
                                    <li>MyBatis를 사용하여 users, facevector 테이블에 저장</li>
                                </ol>
                                <strong class="title">&#9654;&nbsp;로그인 상세</strong>
                                <ol class="login-list desc-list basic">
                                    <li>웹캠 이미지를 Spring Boot 서버로 전송</li>
                                    <li>Face Login Service를 거쳐 Python 서버로 파일 전달</li>
                                    <li>ResNet 모델로 512차원 얼굴 임베딩 벡터 생성 후 반환</li>
                                    <li>미인증(Pre-Auth) 토큰 생성 후 Custom AuthenticationProvider 전달</li>
                                    <li>pgvector를 사용하여 코사인 유사도 비교 검증</li>
                                    <li>결과에 따라 인증 성공, OTP 추가 인증, 실패 분기</li>
                                    <li>인증 성공 시 SecurityContext에 저장 및 최종 응답</li>
                                </ol>
                                <strong class="title">&#9654;&nbsp;이메일 OTP 상세</strong>
                                <ol class="email-list desc-list basic">
                                    <li>이메일과 OTP 인증 타입(login/register) 서버 전송</li>
                                    <li>Redis Key 생성 및 6자리 랜덤 OTP 코드 3분 만료 설정 저장</li>
                                    <li>JavaMailSender를 통한 OTP 코드 발송</li>
                                    <li>BindingResult 및 SmartValidator를 활용한 동적 검증</li>
                                    <li>인증 완료 시 새로운 JWT 토큰 재발급 및 쿠키 설정 응답</li>
                                </ol>
                            </div>
                        </div>
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner">
                                     <img src="assets/image/portfolio/faceLogin/faceLogin.jpg" alt="얼굴로그인 이미지">
                                </div>
                            </div>
                        </figure>
                    </div>
                    <h4 class="desc-title">기술스택</h4>
                    <ul class="list skill-list">
                        <li><strong class="title tultip">Backend</strong> Java, Spring Boot, Spring Security, Python</li>
                        <li><strong class="title tultip">Database</strong> PostgreSQL, pgvector</li>
                        <li><strong class="title tultip">AI & Vision</strong> Hugging Face</li>
                        <li><strong class="title tultip">DevOps</strong> Docker</li>
                    </ul>
                </div>

                <div class="li portfolio-card">
                    <h3 class="link-title"><i class="num">02.</i>도서판매(the book)</h3>
                    <div class="seperate-con">
                        <div class="lst-con left">
                            
                            <h4 class="desc-title">프로젝트 설명</h4>
                            <div class="desc-sc">
                               <h5 class="title desc-b_title">React(Vite) 및 Spring Boot 기반의 역할별 권한 분리 도서 판매 서비스</h5>
                                <p>
                                    React와 고속 빌드 도구인 Vite를 사용한 프론트엔드와 Java/Spring Boot 기반의 백엔드를 독립적으로 구현하고 Spring Security Filter를 활용하여 일반 사용자와 관리자의 역할(Role)에 따른 권한 인가를 분리함으로써 각 권한에 맞는 서비스를 제공하도록 구축한 프로젝트
                                </p>
                                <p>(예외처리, 책임분리 수정 예정 - 6월 )</p>
                            </div>
                            <button @click="toggleExpand('book')" class="btn basic-btn">
                                {{ isExpanded['book'] ? '상세설명 닫기' : '상세설명 보기' }}
                            </button>
                            <a class="btn basic-btn" href="https://github.com/TaengAndJong/team01.git" target="_blank">원격저장소</a>
                            <a class="btn basic-btn" href="doc/UISpecification_thebook.pdf" target="_blank">화면정의서</a>

                             <div v-show="isExpanded['book']" class="desc-sc">
                               <strong class="title">&#9654;&nbsp;공통 권한</strong>
                                <ol class="common-list desc-list basic">
                                    <li>사용자 메인 화면 조회</li>
                                    <li>로그인 화면 조회</li>
                                    <li>회원가입</li>
                                    <li>도서 조회 / 검색</li>
                                </ol>
                                <!-- 사용자 -->
                                <strong class="title">&#9654;&nbsp;회원 권한</strong>
                                <ol class="user-list desc-list basic">
                                    <li>회원가입</li>
                                    <li>로그인</li>
                                    <li class="none-bulit">
                                        <strong class="title">&#9654;&nbsp;마이페이지</strong>
                                        <ol class="mypage-list desc-list basic">
                                            <li>개인정보 조회 / 수정</li>
                                            <li>배송지 등록 / 수정 / 삭제</li>
                                            <li>결제내역 조회 / 취소</li>
                                            <li>장바구니 상품 결제 후 재추가</li>
                                            <li>찜 목록 등록 / 해제 / 상품 상세 이동</li>
                                        </ol>

                                        <strong class="title">&#9654;&nbsp;장바구니</strong>
                                        <ol class="cart-list desc-list basic">
                                            <li>상품 추가 / 삭제</li>
                                        </ol>

                                        <strong class="title">&#9654;&nbsp;결제</strong>
                                        <ol class="pay-list desc-list basic">
                                            <li>단건 / 전체 / 바로 구매</li>
                                        </ol>
                                    </li>
                                </ol>
                                <!-- 사용자-->
                                <!-- 관리자-->
                                <strong class="title">&#9654;&nbsp;관리자 권한 - 도서 관리</strong>
                                <ol class="book-list desc-list basic">
                                    <li>도서 조회 / 등록 / 수정 / 삭제</li>
                                </ol>

                                <strong class="title">&#9654;&nbsp;관리자 권한 - 문의 관리</strong>
                                <ol class="qna-list desc-list basic">
                                    <li>문의 답변 / 답변 / 수정/ 삭제</li>
                                </ol>
                                <!-- 관리자-->
                                
                            </div>
                            <!-- desc-sc 끝-->
                        </div>
                        <!-- lst-con.left 끝-->
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner">
                                    <img src="assets/image/portfolio/theBook/theBook.jpg" alt="도서판매 이미지">
                                </div>
                            </div>
                        </figure>
                    </div>
                    <h4 class="desc-title">기술스택</h4>
                    <ul class="list skill-list">
                        <li><strong class="title tultip">Languages</strong> Java, JavaScript, SQL</li>
                        <li><strong class="title tultip">Front-end</strong> HTML5, CSS3, Sass, React</li>
                        <li><strong class="title tultip">Back-end</strong> Spring Boot, Spring Security</li>
                        <li><strong class="title tultip">Animation</strong> Swiper, GSAP</li>
                    </ul>
                </div>
                <!-- daeduk -->
                <div class="li portfolio-card">
                    <h3 class="link-title"><i class="num">03.</i>AI기술을 활용한 소프트엔지니어링</h3>
                    <div class="seperate-con">
                        <div class="lst-con left">
                            <h4 class="desc-title">프로젝트 설명</h4>
                            <div class="desc-sc">
                                <h5 class="title desc-b_title">대덕인재개발원 프로젝트</h5>
                                <ul>
                                    <li><span class="tultip">초기</span> Java CLI기반 호텔예약시스템</li>
                                    <li><span class="tultip">중기</span> Java Web(Servlet, JSP, MVC 패턴) 기반 학사 관리 시스템 </li>
                                    <li><span class="tultip">말기</span> Spring Framework 기반 PMS(Project Management System) 및 AI 추천 시스템</li>
                                </ul>
                            </div>
                            <button @click="toggleExpand('gis')" class="btn basic-btn">
                                {{ isExpanded['gis'] ? '상세설명 닫기' : '상세설명 보기' }}
                            </button>
                             <a class="btn basic-btn" href="https://github.com/TaengAndJong/DDit.git" target="_blank">원격저장소</a>
                            
                            <div v-show="isExpanded['gis']" class="desc-sc">
                                 <strong class="title">Project Management System(팀)</strong>
                                <ol class="common-list basic">
                                    <li>
                                        <strong class="tultip">데이터베이스</strong>
                                        Oracle DB와 SQL 매퍼 프레임워크 MyBatis를 사용하여 데이터 관리 및 자바 객체 매핑
                                    </li>
                                    <li>
                                        <strong class="tultip">보안</strong>
                                        Spring Security 기반 사용자 인증(Authentication) 및 인가(Authorization) 처리
                                    </li>
                                    <li>
                                        <strong class="tultip">서버</strong>
                                        Spring Framework 기반 MVC 패턴 적용 및 REST API 제공
                                    </li>
                                    <li>
                                        <strong class="tultip">프론트</strong>
                                        JSP를 활용한 화면 구성 및 JavaScript(AJAX)를 이용한 비동기 통신 구현
                                    </li>
                                    <li class="none-bulit">
                                        <a class="btn basic-btn" href="doc/ddit/navi_프로젝트_계획서.pdf" target="_blank">프로젝트 계획서</a>
                                        <a class="btn basic-btn" href="doc/ddit/navi_프로세스 흐름도.pdf" target="_blank">프로세스 흐름도</a>
                                        <a class="btn basic-btn" href="doc/ddit/navi_PMS_화면정의.pdf" target="_blank">화면정의서</a>
                                    </li>
                                </ol>
                                <strong class="title">PMS(개인)</strong>
                                 <ol class="common-list basic">
                                    <li>관리자 페이지를 제외한 전체 UI 레이아웃 및 전체 스타일 구축</li>
                                    <li>프로그램 디자인(UI) 가이드 제작</li>
                                    <li>공통 UI 및 스타일 정리</li>
                                    <li>메인 대시보드 개발 : 프로젝트 현황 수치 출력과 우수 사원 출력 기능 </li>  
                                   
                                </ol>
                                <strong class="title">AI 추천시스템(개인)</strong>
                                 <ol class="common-list basic">
                                    <li>
                                        <span class="tultip">1차</span>날씨, 연령, 성별에 따른 대전지역 맛집 추천
                                    </li>
                                    <li class="none-bulit">
                                        <a class="btn basic-btn" href="doc/ddit/recom_ai/01.데이터 수집 정의서.pdf" target="_blank">데이터수집 정의서</a>
                                        <a class="btn basic-btn" href="doc/ddit/recom_ai/02.데이터 전처리 정의서의.pdf" target="_blank">데이터 전처리 정의서</a>
                                        <a class="btn basic-btn" href="doc/ddit/recom_ai/03.신경망 구현 정의서.pdf" target="_blank">신경망 구현 정의서</a>
                                        <a class="btn basic-btn" href="doc/ddit/recom_ai/04.예측 검증 정의서.pdf" target="_blank">예측 검증 정의서</a>
                                        <a class="btn basic-btn" href="doc/ddit/recom_ai/DB.7z" target="_blank" download>데이터 SQL쿼리.zip</a>
                                        <a class="btn basic-btn" href="doc/ddit/recom_ai/맛집추천_화면정의서.pdf" target="_blank">화면정의서</a>
                                    </li>
                                </ol>
                                 <ol class="common-list basic">
                                    <li>
                                        <span class="tultip">2차</span> <span class="tultip"> 음석인식 검색기능 </span>추가한 날씨, 연령, 성별에 따른 대전지역 맛집 추천
                                    </li>
                                    <li class="none-bulit">
                                        <a class="btn basic-btn" href="doc/ddit/recom_ai/맛집추천_화면정의서_음성인식기능.pdf" target="_blank">화면정의서</a>
                                    </li>
                                </ol>
                            </div>

                        </div>
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner">
                                  <img src="assets/image/portfolio/ddit/PMS.jpg" alt="GIS 이미지">
                                </div>
                            </div>
                        </figure>
                    </div>
                    <h4 class="desc-title">기술스택</h4>
                    <ul class="list skill-list">
                        <li><strong class="title tultip">Backend</strong> Python, FastAPI</li>
                        <li><strong class="title tultip">Database</strong> PostgreSQL, PostGIS</li>
                    </ul>
                </div>
                <!-- daeduk -->
                  <!-- GIS -->
                <div class="li portfolio-card is-visible">
                    <h3 class="link-title"><i class="num">04.</i>GIS</h3>
                    <div class="seperate-con">
                        <div class="lst-con left">
                            <h4 class="desc-title">프로젝트 설명</h4>
                            <div class="desc-sc">
                                <h5 class="title desc-b_title">공간 데이터 활용 시스템</h5>
                                <p>프로젝트 준비중</p>
                            </div><button class="btn basic-btn">상세설명 보기</button><a class="btn basic-btn"
                                href="https://github.com/TaengAndJong" target="_blank">원격저장소</a>
                            <div class="desc-sc" style="display: none;"> 상세보기 준비중 </div>
                        </div>
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner"><span
                                        class="no-image"></span><!-- <img src="../../assets/image/common/noImage.png" alt="GIS 이미지"> -->
                                </div>
                            </div>
                        </figure>
                    </div>
                    <h4 class="desc-title">기술스택</h4>
                    <ul class="list skill-list">
                        <li><strong class="title tultip">Backend</strong> Python, FastAPI</li>
                        <li><strong class="title tultip">Database</strong> PostgreSQL, PostGIS</li>
                    </ul>
                </div>
                <!-- GIS -->
                <!-- LLM  -->
                <div class="li portfolio-card is-visible">
                    <h3 class="link-title"><i class="num">05.</i>추천 시스템</h3>
                    <div class="seperate-con">
                        <div class="lst-con left">
                            <h4 class="desc-title">프로젝트 설명</h4>
                            <div class="desc-sc">
                                <h5 class="title desc-b_title">음악 추천 시스템</h5>
                                <p>프로젝트 준비중</p>
                            </div><button class="btn basic-btn">상세설명 보기</button><a class="btn basic-btn"
                                href="https://github.com/TaengAndJong" target="_blank">원격저장소</a>
                            <div class="desc-sc" style="display: none;"> 상세보기 준비중 </div>
                        </div>
                        <figure class="lst-con right">
                            <div class="img-box">
                                <div class="img-inner"><span
                                        class="no-image"></span><!-- <img src="../../assets/image/common/noImage.png" alt="추천시스템 이미지"> -->
                                </div>
                            </div>
                        </figure>
                    </div>
                    <h4 class="desc-title">기술스택</h4>
                    <ul class="list skill-list">
                        <li><strong class="title tultip">Backend</strong> Python, FastAPI</li>
                        <li><strong class="title tultip">Database</strong> PostgreSQL, PostGIS</li>
                    </ul>
                </div>
                <!-- LLM -->
            </div>
        </div>
    </div>
</section>
  `,
};