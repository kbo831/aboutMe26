import {ref}  from 'vue';
import AboutSection from '../../components/content/About.js';
import PortfolioSection from '../../components/content/Portfolio.js';

export default {
    name : 'ContentSection',
    components: {
        'about-section': AboutSection,
        'portfolio-section': PortfolioSection,
        //추가할 섹션 작성
    },
    setup(){
        return {};
    },
    template:`
    <section class="content">
        <about-section></about-section>
        <portfolio-section></portfolio-section>
    </section>
    `
};