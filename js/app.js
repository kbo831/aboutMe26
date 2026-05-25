import { createApp } from 'vue';
import HeaderSection from './components/common/Header.js';
import ContentSection from './components/common/Content.js';
import FooterSection from './components/common/Footer.js';
// 여기에 Header, Projects 등도 똑같이 import




const App = {
    components: {
        'header-section': HeaderSection,
        'content-section': ContentSection,
        'footer-section': FooterSection,
        //추가할 섹션 작성
    },
    template: `
        <div>
            <!-- 헤더, 프로젝트 등 다른 컴포넌트들도 레이아웃에 배치 -->
            <header-section></header-section>
            <content-section></content-section>
            <footer-section></footer-section>
        </div>
    `
};

// 뷰 앱을 생성하고 index.html의 #app 태그에 마운트
createApp(App).mount('#app');

/*
app.js(모든 컴포넌트 조립)
분리된 컴포넌트들을 가져와서 최종적으로 #app에 연결하는 메인 컨트롤러 역할
*/
