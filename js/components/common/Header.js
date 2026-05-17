import {ref} from 'vue';

export default {
    name : 'HeaderSection', // 컴포넌트 이름
    setup(){ // js 코드 
        
        return {};
    },
    //html 마크업
    template: `
       <header class="main-header">
        <!-- Header-inner-->
        <div  id="header"  class="header-inner">
            <h1 class="logo">
                <a href="/aboutMe25" class="link">
                    <span class="sr-only">taeng's 로고</span>
                </a>
            </h1>
            <!-- Header gnb -->
            <div class="gnb" id="gnb">
                <!-- Header nav -->
                <nav class="gnb-nav" aria-label="주요 메뉴">
                    <ul class="nav-ul">
                        <li class="nav-li about">
                            <a href="./content/about/about.html" class="nav-link">
                            <span>소개</span>
                            </a>
                        </li>
                        <li class="nav-li portfolio">
                            <a href="./content/portfolio/portfolio.html" class="nav-link "><span>포트폴리오</span></a>
                        </li>
                        <li class="nav-li skill">
                            <a href="./content/skills/skills.html" class="nav-link"><span>기술</span></a>
                        </li>
                        <li class="nav-li contact">
                            <a href="./content/contact/contact.html" class="nav-link"><span>연락</span></a>
                        </li>
                    </ul>
                </nav>
                <!-- Header nav end -->
                <!--Mobile-Open top -->
                <button type="button" class="m_open-btn">
                        <span class="line-top"></span>
                        <span class="line-bottom"></span>
                </button>
                <!--Mobile-Open end-->
                <!--Mobile -->
               <div class="m_header">
                    <ul class="nav-ul">
                        <li class="nav-li about">
                            <a href="./content/about/about.html" class="nav-link">
                              <span>소개</span>
                            </a>
                        </li>
                        <li class="nav-li portfolio">
                            <a href="./content/portfolio/portfolio.html" class="nav-link"><span>포트폴리오</span></a>
                        </li>
                        <li class="nav-li skill">
                            <a href="./content/skills/skills.html" class="nav-link"><span>기술</span></a>
                        </li>
                        <li class="nav-li contact">
                            <a href="./content/contact/contact.html" class="nav-link"><span>연락</span></a>
                        </li>
                    </ul>
                </div>
                <!--Mobile end-->
            </div>
            <!-- Header gnb end-->
        </div>
        <!-- Header-inner end-->
    </header>
            
    `
    
};
