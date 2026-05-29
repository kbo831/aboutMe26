import {ref,onMounted} from 'vue';

export default {

    name:"JobFitSection",
    setup(){
         onMounted(()=>{
                // html 문서 전체에서 괄호 내 태그 찾기 => CSS를 불러오는 <link> 태그 중에서, href(경로)에 about.css 포함된 태그 
                if (!document.querySelector('link[href*="jobFit.css"]')){ 
                    const link = document.createElement('link'); //태그 생성
                    link.rel = 'stylesheet';
                    link.href = './assets/css/content/jobFit.css';
                    document.head.appendChild(link); //head 태그에 추가
                }

                const wrapper = document.querySelector('.animation-wrapper');
                const centerTitle = document.querySelector('.center-title');
                if (wrapper) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // 화면에 도달하면 클래스 추가 (자동 펼치기)
                                wrapper.classList.add('is-visible');
                               
                                // 2초 후 자동 닫힘 (호버 유도)
                                setTimeout(() => {
                                    wrapper.classList.remove('is-visible'); 
                                }, 4000);

                                // 만약 딱 한 번만 실행되게 하고 싶다면 아래 주석 해제
                                // observer.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.7 // 섹션이 50% 보일 때 실행
                    });

                    // 감시 시작
                    observer.observe(wrapper);
                } 
                //애니메이션 end
            });
            //onMounted end

    },
      template: `
            <section class="sc sub-content" >
            
                <h2 id="suitability-title" class="sr-only">
                    AI 등장 전후 나와 개발직무의 적합성
                </h2>
                <div id="suitability" class="sc-inner">
                    <div class="animation-wrapper card-wrapper">
                        <!-- left -card -->
                        <div class="side-card left-card row-card">
                            <h3>
                                <span class="font-point">AI 이전</span>
                                원인을 추적하고 흐름을 연결하는 집요함
                            </h3>
                            <ul class="left-list">
                                <li>
                                    <strong class="title">흐름 중심의 사고</strong>
                                    입력-흐름-원인-결과를 논리적으로 연결하는 개발 프로세스 지향
                                </li>
                                <li>
                                    <strong class="title">집요한 문제 해결</strong>
                                    오류 발생 시 타협하지 않고 공식 문서와 로그를 분석하며 끝까지 디버깅
                                </li>
                                <li>
                                    <strong class="title">구조 파악과 문서화</strong>
                                    단순 암기보다 시스템 아키텍처를 분석하고, 해결 과정을 철저히 기록으로 자산화
                                </li>
                            </ul>
                        </div>
                        <!-- center -card -->
                        <div class="center-card row-card">
                            <span class="card-title center-title">개발 직무 적합성</span>
                            <div class="center-card-con">
                                <h3> 
                                    <span class="font-point">현재의 나</span>
                                    구조를 이해하고 깊게 몰입하는 성장형 개발자
                                </h3>
                                <ul class="left-list">
                                    <li>
                                        <strong class="title">구조이해 욕구</strong>
                                        "왜 그렇게 동작하는지" 원리와 연결 고리를 스스로 납득할 때까지 파헤침
                                    </li>
                                    <li>
                                        <strong class="title">깊은 몰입</strong>
                                        하나의 문제를 오래 붙잡고 고민하며 흐름을 완전히 내 것으로 만드는 집중력
                                    </li>
                                    <li>
                                        <strong class="title">회고와 개선</strong>
                                    매일 스스로를 돌아보고 부족한 점을 찾아 끊임없이 보완하는 성장 습관
                                    </li>
                                    <li>
                                        <strong class="title">사용자 공감</strong>
                                        사람의 심리와 불편함을 민감하게 포착하여 UX와 협업에서 시너지를 내는 감각
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- right -card -->
                        <div class="side-card right-card row-card">
                             <h3>
                                <span class="font-point">AI 이후</span>
                                AI의 결과를 의심하고 방향을 설정하는 리더십
                            </h3>
                            <ul class="left-list">
                                <li>
                                    <strong class="title">주도적 문제 정의</strong>
                                    AI에게 올바른 프롬프트를 던지기 위해, 문제의 본질과 방향성을 먼저 명확히 정의
                                </li>
                                <li>
                                    <strong class="title">비판적 사고와 재해석</strong>
                                    AI가 출력한 코드를 맹신하지 않고, 내가 이해한 방식으로 검증 및 리팩토링
                                </li>
                                <li>
                                    <strong class="title">가치 중심 개발</strong>
                                    단순 코더(Coder)를 넘어, 구조를 설계하고 AI 활용 생산성을 극대화하는 소프트웨어 엔지니어
                                </li>
                            </ul>
                        </div>
                         <!-- card end -->
                        <!-- 본질적인 디버깅 환경에 최적화된 인재 / 사고 성장형 개발자 / I를 도구로 지배하며 검증할 수 있는 인재 -->
                    </div>
                    <!-- 애니메이션 랩 end-->
                </div>
                 <!--  suitability end-->
            </section>
      
      `
}