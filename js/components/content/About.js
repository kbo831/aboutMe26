import {ref,onMounted} from 'vue';

export default {
  name: "AboutSection", // 컴포넌트 이름
  setup() {
    // js 코드
    onMounted(()=>{
        // html 문서 전체에서 괄호 내 태그 찾기 => CSS를 불러오는 <link> 태그 중에서, href(경로)에 about.css 포함된 태그 
        if (!document.querySelector('link[href*="about.css"]')){ 
            const link = document.createElement('link'); //태그 생성
            link.rel = 'stylesheet';
            link.href = './assets/css/content/about.css';
            document.head.appendChild(link); //head 태그에 추가
        }
    });

    return {};
  },
  //html 마크업
  template: `
<div class="sc sub-content">
<!--가로스크롤 컨텐츠 시작-->
       <!--Trigger: 스크롤 감지 영역 (전체 가로 스크롤을 제어하는 영역) -->
        <div id="about" class="about-trigger-section">
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
                                            신문방송학과, 중어중문학과 졸업
                                        </li>
                                        <li>
                                            <strong class="desc-title">산동사범대학교</strong>
                                            한어국제교육학과 석사졸업
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
                               <span className="object img01"></span>
                                나를 설명하는 키워드
                              <span className="object img02"></span>
                            </h2>
                            <ul class="row-list keyword">
                                <li>
                                    <span className="object img01"></span>
                                    <h3>계획</h3>
                                    <p>지식 쌓는 부분으로 자기계발을 좋아해서 목표를 정해서 계획 세우는 것을 좋아함</p>
                                </li>
                                <li>
                                    <span className="object img02"></span>
                                    <h3>기록</h3>
                                     <p>관심분야에  대한  강의 듣고  유익한 내용에 대해서 기록하는 것 좋아함</p>
                                </li>
                                <li>
                                    <span className="object img03"></span>
                                    <h3>자아성찰</h3>
                                    <p>성취감에 살아가는 의미를 느껴서 성공여부 관계없이 계획에 따라 실행해 나아감</p>
                                
                                </li>
                            </ul>
                        </div>
                    </article>

                    <article class="about-slide bg04">
                        <div class="slide-inner sc-con">
                            <h2>
                             <span className="object img01"></span>
                            나의 강점
                              <span className="object img02"></span>
                            </h2>
            
                            <ul class="row-list strength">
                                <li>
                                    <h3>인내</h3>
                                    <p>목표나 맡은 일에 대해 어려운 일이 있어도인내하며 해결해 나아감</p>
                                </li>
                                <li>
                                    <h3>배려</h3>
                                     <p>기본적인 예의의 덕목이라 생각하기때문에 상대방을 먼저 살피려고 함</p>
                                </li>
                                <li>
                                    <h3>공감</h3>
                                    <p>상대방이 처한 환경이나 입장에 대해서 이해를 잘함</p>
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
                                    <h3>책임</h3>
                                    <p>맡은 바에 최선을 다하고 남에게 피해주지말자</p>
                                </li>
                                <li>
                                    <h3>청렴</h3>
                                     <p>거짓되게 살면 언젠가 돌아가니 진실되게 살자</p>
                                </li>
                                <li>
                                    <h3>예의</h3>
                                    <p>연령 상관없이 항상 예의있게 살자</p>
                                </li>
                            </ul>
                        </div>
                    </article>

                    <article class="about-slide bg06">
                        <div class="slide-inner sc-con">
                            <h2>타임라인</h2>
                            <ul class="activity">
                                <li class="li activity-list">
                                    <div class="link">
                                        <h3 class="con-title solid-title">경험/활동</h3>
                                            <ul class="desc">
                                                <li>
                                                    <span class="place tultip">대전정보문화산업진흥원</span>
                                                    <strong class="desc-title">정보보안 전문교육, 소프트웨어 개발보안 및 취약점관리
                                                        <span class="date">(25.12 ~ 25.12)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">익산시청</span>
                                                    <strong class="desc-title">초등 교육지비원 접수안내 및 등록 사무보조 단기아르바이트
                                                        <span class="date">(25.03 ~ 25.04)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">대덕인재개발원</span>
                                                    <strong class="desc-title">AI 기술을 활용한 소프트웨어 엔지니어링 과정
                                                        <span class="date">(23.08 ~ 24.04)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">그린아카데미</span>
                                                    <strong class="desc-title">플럽드러닝 디지털디자인(웹퍼블리셔)양성과정
                                                        <span class="date">(20.12 ~ 21.04)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">대전시사중국어학원</span>
                                                    <strong class="desc-title">
                                                        중국어 전임강사
                                                        <span class="date">(19.04 ~ 20.05)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">익산·대전</span>
                                                    <strong class="desc-title">
                                                        중국어 과외·아르바이트
                                                        <span class="date">(18.02 ~ 19.02)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">중국산동사범대학교</span>
                                                    <span class="tultip volunteer">자원봉사</span>
                                                    <strong class="desc-title">한국인 중국문화체험(제남의 예술과 역사) 중한통역 2박3일
                                                        <span class="date">(16.12)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">중국산동사범대학교</span>
                                                    <span class="tultip volunteer">자원봉사</span>
                                                    <strong class="desc-title">
                                                        부안교육청 초등학생 여름방학 중국어교육캠프 중한통역 2박3일
                                                        <span class="date">(16.9)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">여성가족부</span>
                                                    <span class="tultip volunteer">자원봉사</span>
                                                    <strong class="desc-title">
                                                        한중교류문화체험(중국인가정방문체험) 중한통역 1박2일
                                                        <span class="date">(16.5)</span>
                                                    </strong>
                                                    
                                                </li>
                                                <li>
                                                    <span class="place tultip">광서과학기술대학교</span>
                                                    <strong class="desc-title">
                                                        광서과학기술대학교 우석대학교 중국어교환학생
                                                        <span class="date">(12.08 ~ 13.08)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">여성가족부지원 미디어강사</span>
                                                    <span class="tultip social">사회활동</span>
                                                    <strong class="desc-title">
                                                        삼례초등학교 미디어강사
                                                        <span class="date">(11.06 ~ 12.05)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">제20기 전북방송아카데미 교육과정</span>
                                                    <span class="tultip social">대외활동</span>
                                                    <strong class="desc-title">
                                                        직업체험 및 방송교육이수
                                                        <span class="date">(10.11 ~ 11.01)</span>
                                                    </strong>
                                                </li>
                                                <li>
                                                    <span class="place tultip">우석대학교</span>
                                                    <span class="tultip">교내활동</span>
                                                    <strong class="desc-title">
                                                        교내 방송사 아나운서·방송엔지니어
                                                        <span class="date">(10.03 ~ 11.06)</span>
                                                    </strong>
                                                    
                                                </li>
                                            </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </article>

                </div>
            </div>

        </div>
    <!-- 가로스크롤 컨텐츠 끝 -->
</div>
    `,
};
