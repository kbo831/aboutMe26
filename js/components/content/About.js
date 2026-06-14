import {ref,onMounted,onUnmounted,nextTick} from 'vue';

export default {
  name: "AboutSection", // 컴포넌트 이름
  setup() {

    // js 코드
    let mm;

    // 마운트 될 때 css 태그 생성
    onMounted(()=>{
        // html 문서 전체에서 괄호 내 태그 찾기 => CSS를 불러오는 <link> 태그 중에서, href(경로)에 about.css 포함된 태그 
        if (!document.querySelector('link[href*="about.css"]')){ 
            const link = document.createElement('link'); //태그 생성
            link.rel = 'stylesheet';
            link.href = './assets/css/content/about.css';
            document.head.appendChild(link); //head 태그에 추가
        }

        //gsap 가로스크롤 코드
        //브라우저 창에 로드된 gsap에 ScrollTrigger 플러그인 등록
        gsap.registerPlugin(ScrollTrigger); //window. 생략 가능

        //view가 화면을 완벽히 그릴 때까지 기다림
        nextTick(() => {
            //gsap.matchMedia 생성 
            mm = gsap.matchMedia();

            //가로스크롤 애니메이션 실행 ( 768px이하로는 가로스크롤 사라짐)
            mm.add("(min-width: 1025px)", () => {
                    
                //전체 슬라이드 컨텐츠 감싸 상자
                const horizontalWrap = document.querySelector('.about-horizontal-wrap');
                const slides = document.querySelectorAll('.about-slide'); //자식슬라이드 전체 지칭
                const totalSlides= slides.length; //자식슬라이드 개수
                const navItems = document.querySelectorAll('.about-bookmark li');
              

            //함수형으로 선언해야 실시간(새로고침, 리사이징)으로 수치연산가능
            const portfolioTimeline =  gsap.to(horizontalWrap, {
                    x: () => { // 함수형으로 변경하여 실시간 변경
                        const totalWidth = horizontalWrap.scrollWidth;
                        const windowWidth = window.innerWidth;
                        return -(totalWidth - windowWidth);
                    },
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#about', // about-trigger-section(최상위 부모)
                        pin: true, //about-pin-container 뷰포트(최상위 부모 하위 자식) 
                        scrub: 1,
                        start: 'top top',
                        end: () => `+=${horizontalWrap.scrollWidth}`,
                        invalidateOnRefresh: true, // 새로고침,화면 리사이즈 수식 재 연산
                        
                        //snap 옵션 추가
                        snap:{
                            // 0부터 1 사이의 구간을 슬라이드 개수에 맞게 균등하게 나눔, -1은 슬라이드가 5개이면 4번이동이기때문에 -1!
                            snapTo: 1 /(totalSlides - 1), 
                            duration:{ min: 0, max: 0.5 }, // snap 애니메이션 시간
                            delay: 0.1, // snap 재사용 대기시간
                            ease: 'power1.inOut' // 부드러운 가속도 효과
                        },
                        //onUpdate - 스크롤 실시간 이동 감지
                        onUpdate:(self) =>{
                            const progress = self.progress; // 0 ~ 1 사이의 현재 진행도
                            // 현재 어떤 슬라이드가 활성화되어야 하는지 인덱스 계산 (반올림 처리로 snap과 동기화)
                            let activeIndex = Math.round(progress * (totalSlides - 1));
                            // 안전장치 (0 미만이나 최대 개수를 넘지 않도록 제한)
                            activeIndex = Math.max(0, Math.min(activeIndex, totalSlides - 1));

                          
                            // 네비게이션 아이템 클래스 토글
                            navItems.forEach((nav, idx) => {
                                const link = nav.querySelector('a');
                                if (idx === activeIndex) {
                                    link.classList.add('active');
                                } else {
                                    link.classList.remove('active');
                                }
                            });
                        }
                        //onUpdate end
                    }
                    //scrollTrigger end
                });
                //gsap.to end


                 //책갈피 클릭 기능
                    navItems.forEach((nav, idx) => {
                        // 클릭 이동
                        nav.addEventListener('click', (e) => {
                            e.preventDefault(); // <a> 태그의 기본 이동 기능 막기

                           //전체 a 에 책갈피 클래스 전체 제거
                           navItems.forEach(item => {
                                //nav(li) 하위의 a 태그 지칭
                                const link = item.querySelector('a'); 
                                // a 요소 있을 경우, 기존 active 제거
                                if (link) link.classList.remove('active');
                            });

                            //클릭한 책갈피 클래스 추가
                            const currentLink = nav.querySelector('a');
                            if (currentLink) currentLink.classList.add("active");
                            
                            // 전체 스크롤트리거의 시작(start)점과 끝(end)점 위치 구하기
                            const start = portfolioTimeline.scrollTrigger.start;
                            const end = portfolioTimeline.scrollTrigger.end;
                            const totalScrollDistance = end - start; // 고정되어 스크롤되는 총 길이

                            // 카드가 전환되는 지점의 비율(progress)을 계산
                            // 예: 카드 3개일 때 -> 0번 카드=0%, 1번 카드=50%, 2번 카드=100% 진행 지점
                            const targetProgress = idx / (totalSlides - 1);

                            // 계산된 비율을 바탕으로 브라우저가 이동해야 할 실제 스크롤 Y축 위치를 구하기
                            const targetScrollY = start + (totalScrollDistance * targetProgress);

                            // 4. window.scrollTo를 사용해 해당 위치로 스크롤 
                            window.scrollTo({
                                top: targetScrollY,
                                behavior: 'smooth' // 부드러운 스크롤 효과
                            });
                        });
                        
                        //스크롤 이동
                        

                    }); // 책갈피 클릭 스크롤 기능 end

            });
            //mm.add end
        });//nextTick end
    });
    //onMount end

    onUnmounted(() => {
        if (mm) mm.revert();
    });

    return {};
  },
  //html 마크업
  template: `
<section class="sc sub-content">
    
    <!--가로스크롤 컨텐츠 시작-->
       <!--Trigger: 스크롤 감지 영역 (전체 가로 스크롤을 제어하는 영역) -->
        <div id="about" class="about-trigger-section">
            <!-- 책갈피(Bookmark Nav): 화면 한쪽에 고정될 네비게이션 -->
            <nav class="about-bookmark">
                <ul>
                    <li class="active" data-slide="0">
                    <a href="#void">
                        <span class="sr-only"> about me</span></a>
                    </li>
                    <li data-slide="1">
                    <a href="#void">
                        <span class="sr-only">나를 설명하는 키워드</span></a>
                    </li>
                    <li data-slide="2">
                    <a href="#void">
                        <span class="sr-only">나의 강점</span></a>
                    </li>
                     <li data-slide="3">
                     <a href="#void">
                        <span class="sr-only">나의 가치관</span></a>
                     </li>
                </ul>
            </nav>
          <!-- Pin Container: 화면에 꽉 차게 고정될 뷰포트 구역 -->
            <div class="about-pin-container">
                <!--  Horizontal Target: 가로로 길게 연결된 실제 내용 -->
                <div class="about-horizontal-wrap">
                    
                    <!-- 실제 내용이 들어갈 페이지들 (가로 화면 가득 채움) 
                    <article class="about-slide bg01">
                        <div class="slide-inner sc-con">
                            <h2>
                                <span>자기소개</span>
                                <span>김태은</span>
                            </h2>
                        </div>
                    </article>-->

                    <article class="about-slide bg02">
                        <div class="slide-inner sc-con">
                           
                            <!--왼쪽 사진영역 -->
                            <div class="lst-con left">
                                <figure class="figure">
                                    <div class="img-box"  id="real-photo">
                                        <div class="img-inner">
                                            <img src="./assets/image/about/5.png" alt="김태은 캐릭터">
                                        </div>
                                    </div>
                                </figure>
                             </div>
                           <!--왼쪽 사진영역 끝 -->
                           <!--오른쪽 소개영역 -->
                           <div class="lst-con right">
                                <div class="object leaf"></div>
                                <h2>About Me</h2>
                                <h3 class="link-title">김태은<span class="small-text">여.1991.(만 34세)</span></h3>
                                <!-- 개인정보 -->
                                
                                <!-- 개인정보 -->
                                <!-- 경력 -->
                                <div class="info-row career">
                                    <h4 class="con-title">경력</h4>
                                    <ul class="desc">
                                        <li>
                                            <strong class="desc-title">지오넷</strong>
                                            <span>전략사업팀 · 사원/팀원 2년차· UI/UX개발 </span>
                                            <span>(21.05.03 ~ 23.05.12)</span>
                                        </li>
                                    </ul>
                                </div>
                                <!-- 경력 -->
                                <!-- 학력 -->
                                <div class="info-row education">
                                    <h4 class="con-title">학력</h4>
                                    <ul class="desc">
                                        <li>
                                            <strong class="desc-title">우석대학교</strong>
                                            신문방송학과, 중국어학과 졸업
                                        </li>
                                        <li>
                                            <strong class="desc-title">산동사범대학교</strong>
                                            국제한어교육학과 석사졸업
                                        </li>
                                    </ul>
                                </div>
                                <!-- 학력 -->
                                <!-- 자격증 -->
                                <div class="info-row license">
                                    <h4 class="con-title">자격증</h4>
                                    <ul class="desc">
                                        <li>
                                            <strong class="desc-title">정보처리기사
                                            </strong>
                                            <span>한국산업인력공단</span>
                                            <span>(24.12)</span>
                                        </li>
                                        <li>
                                            <strong class="desc-title">SQL개발자(SQLD)</strong>
                                            <span>한국데이터베이스진흥센터</span>
                                            <span>(24.09)</span>
                                        </li>
                                        <li>
                                            <strong class="desc-title">
                                                웹디자인기능사
                                            </strong>
                                            <span>한국산업인력공단</span>
                                            <span>(21.04)</span>
                                        </li>
                                        <li>
                                            <strong class="desc-title">
                                                GTQ(그래픽기술자격 1급)
                                            </strong>
                                            <span>한국생산성본부</span>
                                            <span>(21.02)</span>
                                        </li>
                                        <li>
                                            <strong class="desc-title">
                                            기타
                                            </strong>
                                            <ul class="desc">
                                                <li>한국사능력검정시험 1급 (20.11)</li>
                                                <li>워드프로세서 (12.08)</li>
                                                <li>한자실력 2급 (12.06)</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <!-- 학력 -->
                            </div>
                           <!--오른쪽 소개영역 끝 -->
                        </div>
                    </article>

                    <article class="about-slide bg03">
                        <div class="slide-inner sc-con">
                        
                            <h2>
                               <span class="object img01"></span>
                                나를 설명하는 키워드
                              <span class="object img02"></span>
                            </h2>
                            <ul class="row-list keyword">
                                <li>
                                    <span class="object img01"></span>
                                    <h3>'왜'라는 질문을 하는 </h3>
                                    <p>
                                        단순히 기능을 구현하는 것보다 왜 그렇게 동작하는지, 어떤 흐름으로 연결되는지를 이해하는 과정을 중요하게 생각합니다.
                                    </p>
                                </li>
                                <li>
                                    <span class="object img02"></span>
                                    <h3>깊게 몰입하는 </h3>
                                    <p>
                                        하나의 문제를 오래 붙잡고 원인을 분석하며 스스로 납득할 때까지 고민하는 성향입니다.
                                    </p>
                                </li>
                                <li>
                                    <span class="object img03"></span>
                                    <h3>끊임없이 성장하려는 </h3>
                                    <p>
                                       하루를 돌아보며 부족했던 점과 개선할 부분을 스스로 점검하는 시간을 중요하게 생각합니다.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </article>

                    <article class="about-slide bg04">
                        <div class="slide-inner sc-con">
                            <h2>
                             <span class="object img01"></span>
                                나의 강점
                              <span class="object img02"></span>
                            </h2>
            
                            <ul class="row-list strength">
                                <li>
                                    <h3>프로젝트 전체를 바라보는 시각</h3>
                                    <p>
                                    맡은 기능만 구현하는 것보다 프로젝트 전체 구조와 흐름을 함께 이해하려고 노력합니다. 팀 프로젝트에서는 프로젝트 통합과 공통 가이드 정리를 담당하며 전체 일관성을 높이기 위해 노력했습니다.
                                    </p>
                                </li>
                                <li>
                                    <h3>구조를 먼저 고민하는 개발 습관</h3>
                                     <p>개인 프로젝트에서 반복 수정 경험을 통해 공통 API 응답 구조, 예외 처리, 계층 분리의 중요성을 깨달았고 이후에는 구조를 먼저 설계하는 습관을 갖게 되었습니다.
                                    </p>
                                </li>
                                <li>
                                    <h3>사용자 관점에서 생각하는 개발</h3>
                                    <p>
                                        UI 퍼블리셔 경험을 바탕으로 단순히 기능이 동작하는 것보다 사용자가 자연스럽게 사용할 수 있는 화면과 흐름을 함께 고민합니다.
                                    </p>
                                </li>
                                 <li>
                                    <h3>끝까지 원인을 찾는 문제 해결 태도</h3>
                                    <p>
                                        오류가 발생하면 단순히 해결 방법을 적용하는 것이 아니라 원인을 분석하고 같은 문제가 반복되지 않도록 구조적인 해결 방법을 고민합니다.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </article>

                    <article class="about-slide bg05">
                        <div class="slide-inner sc-con">
                            <h2>나의 가치관</h2>
                            <span class="object img01"></span>
                             <ul class="column-list">
                                <li>
                                    <h3>존중</h3>
                                    <p>다양한 역할의 의견을 존중하는 것이 좋은 협업의 시작이라고 생각하며, 프로젝트에서도 공통 기준을 만들고 서로의 작업 방식을 이해하려고 노력했습니다.</p>
                                </li>
                                 <li>
                                    <h3>소통</h3>
                                    <p>협업에서는 명확한 기준이 중요하다고 생각하여 UI 가이드와 프로젝트 문서를 정리하며 팀원들이 같은 방향으로 개발할 수 있도록 노력했습니다.</p>
                                </li>
                                <li>
                                    <h3>성장</h3>
                                     <p>새로운 기술을 배우는 것보다 왜 필요한지 이해하는 과정을 중요하게 생각하며, 프로젝트 경험을 통해 부족한 부분을 지속적으로 보완하고 있습니다.</p>
                                </li>
                                <li>
                                    <h3>성찰</h3>
                                    <p>프로젝트를 마친 뒤 잘된 점보다 아쉬웠던 점을 먼저 돌아보며 다음 프로젝트에서는 같은 문제가 반복되지 않도록 개선하는 습관을 가지고 있습니다.</p>
                                </li>
                            </ul>
                        </div>
                    </article>
                    <!-- article컨텐츠 끝 -->
                </div>
            </div>

        </div>
    <!-- 가로스크롤 컨텐츠 끝 -->
    
</section>
    `,
};
