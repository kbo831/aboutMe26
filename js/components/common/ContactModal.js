export default{
    name : 'ContactModalSection', 
    props: {
            show: Boolean
        },
    methods: {
        copyEmail() {
            navigator.clipboard.writeText('kbo8311@gmail.com');
            alert('이메일이 복사 완료');
        },
        copyCall() {
            navigator.clipboard.writeText('010-2747-6924');
            alert('전화번호 복사 완료');
        },
        openChat(){
            window.open(
            'https://open.kakao.com/o/sBqsDE4h',
            '_blank',
            'noopener,noreferrer'
            );
        }
    },
    emits: ['close'],
    template : `

    <div v-if="show" class="contact-modal">
        <div class="modal-content">
            <h2>연락</h2>
                        <!-- skip-card -->
            <div class="skip-card">
                <a href="#" class="link first-card" target="_blank" title="카카오 1대1 오픈채팅연결" @click="openChat">
                    <div class="link-inner">
                        <h3 class="bold ">
                           카카오톡
                        </h3>
                        <span class="bg bg01"></span>
                    </div>
                </a>
                <button href="#" class="link second-card" title="전화번호 복사"  @click="copyCall">
                    <div class="link-inner">
                        <h3 class="bold ">
                            전화
                        </h3>
                        <span class="bg bg02"></span>
                    </div>
                </button>
                <button href="#" class="link third-card" title="이메일 복사"  @click="copyEmail">
                    <div class="link-inner">
                        <h3 class="bold ">
                            이메일
                        </h3>
                        <span class="bg bg03"></span>
                    </div>
                </button>
            </div>
            <!-- skip-card -->


            <button  class="btn basic-btn" @click="$emit('close')">
                닫기
            </button>
          </div>
    </div>

    `


}