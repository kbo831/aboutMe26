const DadukCard = {
    props: ['data', 'index', 'isExpanded'],
    emits: ['toggle'],
    template:`
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
                    <li><span class="tultip">말기</span> Spring Framework 기반 PMS(Project Management System) 및 AI 추천 시스템
                    </li>
                </ul>
            </div>
            <button  @click="$emit('toggle', data.id)" class="btn basic-btn">
                {{ isExpanded ? '상세설명 닫기' : '상세설명 보기' }}
            </button>
            <a class="btn basic-btn" href="https://github.com/TaengAndJong/DDit.git" target="_blank">원격저장소</a>

            <div v-show="isExpanded" class="desc-sc">
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
                        <a class="btn basic-btn" href="doc/ddit/programDesignGuid.7z" target="_blank">다지인가이드</a>
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
                        <a class="btn basic-btn" href="doc/ddit/recom_ai/01.데이터 수집 정의서.pdf" target="_blank">데이터수집
                            정의서</a>
                        <a class="btn basic-btn" href="doc/ddit/recom_ai/02.데이터 전처리 정의서의.pdf" target="_blank">데이터 전처리
                            정의서</a>
                        <a class="btn basic-btn" href="doc/ddit/recom_ai/03.신경망 구현 정의서.pdf" target="_blank">신경망 구현
                            정의서</a>
                        <a class="btn basic-btn" href="doc/ddit/recom_ai/04.예측 검증 정의서.pdf" target="_blank">예측 검증 정의서</a>
                        <a class="btn basic-btn" href="doc/ddit/recom_ai/DB.7z" target="_blank" download>데이터
                            SQL쿼리.zip</a>
                        <a class="btn basic-btn" href="doc/ddit/recom_ai/맛집추천_화면정의서.pdf" target="_blank">화면정의서</a>
                    </li>
                </ol>
                <ol class="common-list basic">
                    <li>
                        <span class="tultip">2차</span> <span class="tultip"> 음석인식 검색기능 </span>추가한 날씨, 연령, 성별에 따른 대전지역 맛집
                        추천
                    </li>
                    <li class="none-bulit">
                        <a class="btn basic-btn" href="doc/ddit/recom_ai/맛집추천_화면정의서_음성인식기능.pdf"
                            target="_blank">화면정의서</a>
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
        <li><strong class="title tultip">Backend</strong>Spring Framework, Spring Security, Java Servlet</li>
        <li><strong class="title tultip">Frontend</strong>JavaScript, jQuery, JSP, HTML5, CSS3, (AJAX 비동기 통신)</li>
        <li><strong class="title tultip">Database&ORM</strong>Oracle DB, MyBatis</li>
        <li><strong class="title tultip">AI&Data</strong>Python, 데이터 전처리 및 인공지능 신경망(Neural Network),음성 인식 API(TTS)</li>
        <li><strong class="title tultip">DevOps&Tools</strong>Maven,SVN</li>
    </ul>
</div>
    `
}

export default DadukCard