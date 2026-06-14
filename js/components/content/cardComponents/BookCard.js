const BookCard = {
    props: ['data', 'index', 'isExpanded'],
    emits: ['toggle'],
    template:`
        <div class="li portfolio-card">
    <h3 class="link-title"><i class="num">02.</i>도서판매(the book)</h3>
    <div class="seperate-con">
        <div class="lst-con left">

            <h4 class="desc-title">프로젝트 설명</h4>
            <div class="desc-sc">
                <h5 class="title desc-b_title">React(Vite) 및 Spring Boot 기반의 역할별 권한 분리 도서 판매 서비스</h5>
                <p>
                    React와 고속 빌드 도구인 Vite를 사용한 프론트엔드와 Java/Spring Boot 기반의 백엔드를 독립적으로 구현하고 Spring Security Filter를 활용하여
                    일반 사용자와 관리자의 역할(Role)에 따른 권한 인가를 분리함으로써 각 권한에 맞는 서비스를 제공하도록 구축한 프로젝트
                </p>
                <p>(예외처리, 책임분리 수정 예정 - 6월 )</p>
            </div>
            <button @click="$emit('toggle', data.id)" class="btn basic-btn">
            {{ isExpanded ? '상세설명 닫기' : '상세설명 보기' }}
            </button>
            <a class="btn basic-btn" href="https://github.com/TaengAndJong/team01.git" target="_blank">원격저장소</a>
            <a class="btn basic-btn" href="doc/UISpecification_thebook.pdf" target="_blank">화면정의서</a>

            <div v-show="isExpanded" class="desc-sc">
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
        <li><strong class="title tultip">Backend</strong>Java(Spring Boot), Spring Security</li>
        <li><strong class="title tultip">Frontend</strong>JavaScript, CSS3, Sass, React</li>
        <li><strong class="title tultip">Database&ORM</strong>Oracle,postgresSQL, Mybatis</li>
        <li><strong class="title tultip">Animation</strong> Swiper, GSAP</li>
    </ul>
</div>
    `
}

export default BookCard