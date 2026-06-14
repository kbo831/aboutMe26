import { ref, onMounted, onUnmounted, nextTick } from "vue";
import FaceLoginCard from './cardComponents/FaceLoginCard.js';
import BookCard from './cardComponents/BookCard.js';
import DadukCard from './cardComponents/DadukCard.js';
import GisCard from './cardComponents/GisCard.js';

export default {
  name: "PortfolioSection", // 컴포넌트 이름
  setup() {
    //프로젝트 컴포넌트 데이터 전달 
    const items = ref([
        {
            id: "faceLogin",
            component: FaceLoginCard,
        },
        {
            id: "book",
            component: BookCard,
        },
        {
            id: "daduk",
            component: DadukCard,
        },
         {
            id: "gis",
            component: GisCard,
        },
    ]);

    // 프로젝트 상세보기 버튼 상태 관리
    const isExpanded = ref({});

    // 상세보기 토글 함수
    const toggleExpand = async (id) => {
      if (isExpanded.value[id] === undefined) {
        isExpanded.value[id] = false;
      }
      isExpanded.value[id] = !isExpanded.value[id];
      await nextTick();
    };

    const scrollToCard = (index) => {
      const cards = document.querySelectorAll(".portfolio-card");
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: "smooth", 
          block: "center", 
        });
      }
    };

    //unmounted에서 해제할 수 있도록 observer 변수를 상위에 선언
    let scrollObserver = null;
    let bookmarkObserver = null;

    // 포트폴리오 제목 & 카드 fade-in 애니메이션
    const initScrollAnimation = () => {

    const portfolioSection = document.querySelector(".sc-portfolio"); //전체 섹션
    const targets = document.querySelectorAll(".portfolio-title, .portfolio-card"); // 제목과 프로젝트 목록들
    const bookmarkNav = document.querySelector(".portfolio-bookmark"); // 책갈피

      if (targets.length === 0 && !portfolioSection) return; // 대상이 아무것도 없으면 중단

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            //감시 중인 요소가 '전체 포트폴리오 섹션'일 때
            if (entry.target === portfolioSection) {
                if (entry.isIntersecting) {
                    bookmarkNav?.classList.add("is-visible");    // 책갈피 등장
                } else {
                    bookmarkNav?.classList.remove("is-visible"); // 책갈피 사라짐
                }
            }
           else {  //감시 중인 요소가 기존 '제목'이나 '카드'일 때
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");        // 페이드인 애니메이션 켬
                } else {
                    entry.target.classList.remove("is-visible");     // 페이드인 애니메이션 끔
                }
            }
          });
          //끝
        },
       { threshold: [0.02, 0.3] }
      );
    if (portfolioSection) observer.observe(portfolioSection); // 전체 섹션 감시 등록
    targets.forEach((target) => observer.observe(target));    // 개별 제목/카드 감시 등록
    };

    // 책갈피 활성화 감시 함수
    const initBookmarkObserver = () => {
      const cards = document.querySelectorAll(".portfolio-card");
      const bookmarkItems = document.querySelectorAll(".portfolio-bookmark li");

      if (cards.length === 0 || bookmarkItems.length === 0) return;

      const bookmarkObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(cards).indexOf(entry.target);
              if (index !== -1) {
                bookmarkItems.forEach((item) => item.classList.remove("active"));
                bookmarkItems[index].classList.add("active");
              }
            }
          });
        },
        {
          rootMargin: "-20% 0px -40% 0px",
          threshold: 0.1, 
        }
      );

      cards.forEach((card) => bookmarkObserver.observe(card));
    };

    onMounted(() => {
      const csshref = "./assets/css/content/portfolio.css";
      let cssLink = document.querySelector(`link[href*="portfolio.css"]`);

      const startPortfolioLogic = async () => {
        await nextTick();
        initScrollAnimation();
        initBookmarkObserver(); 
      };

      if (!cssLink) {
        cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = csshref;
        document.head.appendChild(cssLink);

        cssLink.onload = () => {
          startPortfolioLogic();
        };
      } else {
        startPortfolioLogic();
      }
    });

    //unmounted의 진짜 역할: 페이지 이동 시 브라우저 메모리 최적화 및 에러 방지
    onUnmounted(() => {
      // 필요 시 인스턴스 해제 로직 작성 공간
        if (scrollObserver) scrollObserver.disconnect();
        if (bookmarkObserver) bookmarkObserver.disconnect();
    });

    return {
      isExpanded, 
      toggleExpand,
      scrollToCard, // 이제 스코프가 맞아 정상적으로 반환
        items,
      
    };
  },
  
  template: `
<section class="sc sub-content sc-portfolio">
    <div class="sc-inner">
        <h2 class="portfolio-title">Portfolio</h2>
        
        <nav class="portfolio-bookmark">
            <ul>
                <li class="active" data-slide="0">
                    <a href="#void" @click.prevent="scrollToCard(0)"><span>01.얼굴로그인</span></a>
                </li>
                <li data-slide="1">
                    <a href="#void" @click.prevent="scrollToCard(1)"><span>02.도서판매</span></a>
                </li>
                <li data-slide="2">
                    <a href="#void" @click.prevent="scrollToCard(2)"><span>03.PMS&AI추천</span></a>
                </li>
                 <!--<li data-slide="3">
                    <a href="#void" @click.prevent="scrollToCard(3)"><span>04.GIS</span></a>
                </li>-->
                 <!-- <li data-slide="3">
                    <a href="#void" @click.prevent="scrollToCard(3)"><span>04.추천시스템</span></a>
                </li> -->
            </ul>
        </nav>
        
        <div id="portfolio" class="portfolio-trigger-section">
            <div class="ul full-list    portfolio-scroll-wrap" >
                <div v-for="item in items" :key="item.id">
                    <component :is="item.component",
                    :data="item",
                    :is-expanded="isExpanded[item.id]"
                     @toggle="toggleExpand"
                    />
                </div>
            </div>
        </div>
    </div>
</section>
  `,
};