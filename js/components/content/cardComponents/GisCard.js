const GisCard = {
    props: ['data', 'index', 'isExpanded'],
    emits: ['toggle'],
    template:` 
       <div class="li portfolio-card ">
    <h3 class="link-title">
        <i class="num">04.</i>GIS</h3>
    <div class="seperate-con">
        <div class="lst-con left">
            <h4 class="desc-title">프로젝트 설명</h4>
            <div class="desc-sc">
                <h5 class="title desc-b_title">설명 준비중</p>
               
            </div>
             <button @click="$emit('toggle', data.id)" class="btn basic-btn">
                {{ isExpanded ? '상세설명 닫기' : '상세설명 보기' }}
            </button>
            <a class="btn basic-btn"
                href="#" target="_blank">원격저장소</a><a class="btn basic-btn"
                href="#" target="_blank">화면정의서</a>
             <div v-show="isExpanded" class="desc-sc">
                <strong class="title">설명 준비중</strong>
                <ol class="register-list desc-list basic">
                    <li></li>
                </ol>
            </div>
        </div><!-- lst-con.left 끝-->
        <figure class="lst-con right">
            <div class="img-box">
                <div class="img-inner no-image">
                    <!-- <img src="assets/image/portfolio/theBook/theBook.jpg" alt="도서판매 이미지"> -->
                </div>
            </div>
        </figure>
    </div>
    <h4 class="desc-title">기술스택</h4>
    <ul class="list skill-list">
        <li>준비중</li>
        <!-- <li><strong class="title tultip">Backend</strong>Java(Spring Boot), Spring Security</li>
        <li><strong class="title tultip">Frontend</strong>JavaScript, CSS3, Sass, React</li>
        <li><strong class="title tultip">Database&amp;ORM</strong>Oracle,postgresSQL, Mybatis</li>-->
       
    </ul>
</div>
    `
}

export default GisCard;