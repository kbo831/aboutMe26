import {ref} from 'vue';

export default {
    name : 'HeaderSection', // 컴포넌트 이름
    setup(){ // js 코드 
        
        const isOpenBtn = ref(false);

        return {};
    },
    //html 마크업
    template: `
       <header class="main-header">
        <!-- Header-inner-->
        <div  id="header"  class="header-inner">
            <h1 class="logo">
                <a href="/aboutMe26" class="link">
                    <span class="sr-only">taeng's 로고</span>
                </a>
            </h1>
            <!-- Header gnb -->
            <div class="gnb" id="gnb">
                <!-- Header nav -->
                <nav class="gnb-nav" aria-label="주요 메뉴">
                    <ul class="nav-ul">
                    <li class="nav-li contact">
                            <a  class="nav-link" href="https://app.notion.com/p/Git-git-github-37431ef0839480d19504e642e84443f4?v=d83e7c2af2484bfc9ccdbd4071d79068&source=copy_link" target="_blank" rel="noopener noreferrer" title="노션 새창열림"> <span>노션</span></a>
                        </li>
                        <li class="nav-li contact">
                            <button type="button" href="#void" @click="$emit('open-contact')" class="nav-link">
                                <span>연락</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                <!-- Header nav end -->
            </div>
            <!-- Header gnb end-->
        </div>
        <!-- Header-inner end-->
    </header>
    `
    
};
