
import {ref,onMounted} from 'vue';

export default {
  name: "TimeLineSection", // 컴포넌트 이름
  setup() {
    // js 코드
    const isExpanded = ref(false); //setup 스코프에서만 살아있는 변수

    // 더보기 버튼 클릭 함수 -> 더보기 버튼을 누르면 실행
        const toggleTimeline = async () => {
            isExpanded.value = true;  // 처음 보여줄 리스트 보여줌(v-show 작동)
            
            // vue가  isExpanded를 true로 바꿔서  HTML에 새로운 <li> 태그들
            await nextTick(); //그려질 때까지  잠깐 기다린 후
            observeTimelineItems();  //숨겨진 나머지 아이템들에도 감시자 붙이기
        };
        
        // 아래에서 위로 올라오는 스크롤 감시 함수
        const observeTimelineItems = () => {
            //.observed가 붙지 않은 돔요소 전부 지칭
            const items = document.querySelectorAll('.timeline-item:not(.observed)');
            
            //브라우저의 observer 객체 생성하여 호출
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    //entry.isIntersecting = 감시 중인 아이템이 화면에 들어는지
                    if (entry.isIntersecting) {
                        // 화면에 들어오면 애니메이션 클래스 작동
                        entry.target.classList.add('is-visible');
                        // 한번 실행된 것은 중복 감시하지 않도록 제거
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15 // 리스트가 화면에 15% 정도 보이기 시작하면 바로 트리거
            });

            items.forEach(item => {
                observer.observe(item);
                item.classList.add('observed'); // 중복 등록 방지용 마킹
            });
        };

    onMounted(()=>{
        // html 문서 전체에서 괄호 내 태그 찾기 => CSS를 불러오는 <link> 태그 중에서, href(경로)에 about.css 포함된 태그 
        if (!document.querySelector('link[href*="timeLine.css"]')){ 
            const link = document.createElement('link'); //태그 생성
            link.rel = 'stylesheet';
            link.href = './assets/css/content/timeLine.css';
            document.head.appendChild(link); //head 태그에 추가
        }

        // 첫 화면에 보이는 상단 4개 항목 감시 시작
        observeTimelineItems();
    });

    return {
        // setup 스코프 밖에서 사용할 수 있도록 반환 ( template에서 사용하기 위함)
        isExpanded, // 원래 문법 isExpanded : isExpanded
        toggleTimeline // ES6 축양형
    };
  },
  //html 마크업
 template: 
`

  <section class="sc sub-content">
    <div id="timeline" class="sc-inner">
        <ul class="activity">
            <li class="li activity-list">
                <div class="link">
                    <h2>경험/활동</h2>
                    <ul class="desc">
                        <li class="timeline-item">
                            <span class="place tultip">대전정보문화산업진흥원</span>
                            <strong class="desc-title">정보보안 전문교육, 소프트웨어 개발보안 및 취약점관리
                                <span class="date">(25.12 ~ 25.12)</span>
                            </strong>
                        </li>
                        <li class="timeline-item">
                            <span class="place tultip">익산시청</span>
                            <strong class="desc-title">초등 교육지비원 접수안내 및 등록 사무보조 단기아르바이트
                                <span class="date">(25.03 ~ 25.04)</span>
                            </strong>
                        </li>
                        <li class="timeline-item">
                            <span class="place tultip">대덕인재개발원</span>
                            <strong class="desc-title">AI 기술을 활용한 소프트웨어 엔지니어링 과정
                                <span class="date">(23.08 ~ 24.04)</span>
                            </strong>
                        </li>
                        <li class="timeline-item">
                            <span class="place tultip">그린아카데미</span>
                            <strong class="desc-title">플럽드러닝 디지털디자인(웹퍼블리셔)양성과정
                                <span class="date">(20.12 ~ 21.04)</span>
                            </strong>
                        </li>


                        <!-- template 가상태그 -->
                       <div v-show="isExpanded" class="more-activity-wrapper">\
                            <ul class="supplementary-desc">
                                <li class="timeline-item">
                                    <span class="place tultip">대전시사중국어학원</span>
                                    <strong class="desc-title">
                                        중국어 전임강사
                                        <span class="date">(19.04 ~ 20.05)</span>
                                    </strong>
                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">익산·대전</span>
                                    <strong class="desc-title">
                                        중국어 과외·아르바이트
                                        <span class="date">(18.02 ~ 19.02)</span>
                                    </strong>
                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">중국산동사범대학교</span>
                                    <span class="tultip volunteer">자원봉사</span>
                                    <strong class="desc-title">한국인 중국문화체험(제남의 예술과 역사) 중한통역 2박3일
                                        <span class="date">(16.12)</span>
                                    </strong>
                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">중국산동사범대학교</span>
                                    <span class="tultip volunteer">자원봉사</span>
                                    <strong class="desc-title">
                                        부안교육청 초등학생 여름방학 중국어교육캠프 중한통역 2박3일
                                        <span class="date">(16.9)</span>
                                    </strong>
                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">여성가족부</span>
                                    <span class="tultip volunteer">자원봉사</span>
                                    <strong class="desc-title">
                                        한중교류문화체험(중국인가정방문체험) 중한통역 1박2일
                                        <span class="date">(16.5)</span>
                                    </strong>

                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">광서과학기술대학교</span>
                                    <strong class="desc-title">
                                        광서과학기술대학교 우석대학교 중국어교환학생
                                        <span class="date">(12.08 ~ 13.08)</span>
                                    </strong>
                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">여성가족부지원 미디어강사</span>
                                    <span class="tultip social">사회활동</span>
                                    <strong class="desc-title">
                                        삼례초등학교 미디어강사
                                        <span class="date">(11.06 ~ 12.05)</span>
                                    </strong>
                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">제20기 전북방송아카데미 교육과정</span>
                                    <span class="tultip social">대외활동</span>
                                    <strong class="desc-title">
                                        직업체험 및 방송교육이수
                                        <span class="date">(10.11 ~ 11.01)</span>
                                    </strong>
                                </li>
                                <li class="timeline-item">
                                    <span class="place tultip">우석대학교</span>
                                    <span class="tultip">교내활동</span>
                                    <strong class="desc-title">
                                        교내 방송사 아나운서·방송엔지니어
                                        <span class="date">(10.03 ~ 11.06)</span>
                                    </strong>

                                </li>
                            </ul>
                        </div>
                        <!-- 더보기 컨텐츠 end-->
                    </ul>
                    <!-- tileline content li end -->
                </div>
                <div class="more-btn-container" v-if="!isExpanded">
                    <button @click="toggleTimeline" class="btn-more">과거 활동 더보기</button>
                </div>
                <!-- link end-->
            </li>
        </ul>
    </div>
</section>

`
}