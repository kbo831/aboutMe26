const FaceLoginCard = {
    props: {
        data: Object,
        isExpanded: Boolean,
    },
    emits: ['toggle'],
    template:`
        
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
                <p>아이디 중복검증/이메일 OTP 인증 ➔ 동의 확인 ➔ 웹캠 촬영 ➔ Spring Boot 전송 및 2차검증 ➔ Python 서버 얼굴 임베딩 생성 ➔ pgvector 기반 얼굴 벡터
                    저장</p>
                <strong class="title desc-s_title">로그인흐름</strong>
                <p>웹캠 촬영 ➔ Python 서버 얼굴 임베딩 생성 ➔ pgvector 유사도 비교 ➔ Custom Provider 인증 ➔ 결과 처리</p>
            </div>

            <button @click="$emit('toggle', data.id)" class="btn basic-btn">
                {{ isExpanded ? '상세설명 닫기' : '상세설명 보기' }}
            </button>
            <a class="btn basic-btn" href="https://github.com/TaengAndJong/faceLogin.git" target="_blank">원격저장소</a>
            <a class="btn basic-btn" href="doc/UISpecification_faceLogin.pdf" target="_blank">화면정의서</a>
            <div v-show="isExpanded" class="desc-sc">
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
                <!-- 안내 
                                <h4 class="desc-title">한계점</h4>
                                    <ol class="desc-list basic">
                                        <li></li>
                                        <li></li>
                                    </ol>
                                안내 -->
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
        <li><strong class="title tultip">Backend</strong> Java(Spring Boot), Spring Security, Python</li>
        <li><strong class="title tultip">Database</strong> PostgreSQL, pgvector</li>
        <li><strong class="title tultip">AI & Vision</strong> Hugging Face</li>
        <li><strong class="title tultip">DevOps</strong> Docker</li>
    </ul>
</div>


        `
}

export default FaceLoginCard;