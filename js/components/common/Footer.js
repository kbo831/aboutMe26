import {ref} from 'vue';

export default {
    name : 'FooterSection', // 컴포넌트 이름
    setup(){ // js 코드 
        return {};
    },
    //html 마크업
    template: `
            <footer  id="footer" class="main-footer" role="contentinfo">
                <div class="inner">
                    <p>&copy; 2025 김태은. All rights reserved.</p>
                </div>
            </footer>
    `
};
