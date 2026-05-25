import {ref}  from 'vue';
import AboutSection from '../../components/content/About.js';
import PortfolioSection from '../../components/content/Portfolio.js';
import TimeLineSection from '../../components/content/TimeLine.js';
import JobFitSection from '../../components/content/JobFit.js';

export default {
    name : 'ContentSection',
    components: {
        'about-section': AboutSection,
        'portfolio-section': PortfolioSection,
        'timeLine-section' : TimeLineSection,
        'jobFit-section': JobFitSection,
        //추가할 섹션 작성
    },
    setup(){
        return {};
    },
    template:`
    <section class="content">
        <about-section></about-section>
        <timeLine-section></timeLine-section>
        <jobFit-section></jobFit-section>
        <portfolio-section></portfolio-section>
    </section>
    `
};