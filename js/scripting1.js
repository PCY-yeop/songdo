

document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll('[data-target]');
  const sections = document.querySelectorAll('.page-section');
  const mainSections = document.querySelectorAll(
    '#main-hero, .benefit-box, .premium, .subway-section, .contact-banner, .main-banner'
  );
  const header = document.getElementById('header');
  const menuTabs = document.querySelector('.menu-tabs');
  const logoLink = document.getElementById('logoLink'); // ✅ 중앙 로고

  let isContentMode = false;

  // 📌 상단 메뉴 클릭 시 섹션 전환 + 탭 초기화
  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.dataset.target;

      // 모든 section 비활성화
      sections.forEach(sec => sec.classList.remove('active'));

      // 타겟 section 활성화
      const targetSection = document.getElementById(target);
      targetSection?.classList.add('active');

      // 메인 콘텐츠 숨김
      mainSections.forEach(el => el.style.display = 'none');

      // 헤더 색상 고정
      header.classList.add('scrolled');
      menuTabs.classList.add('scrolled');

      // 상태 플래그 + 위치 맨 위
      isContentMode = true;
      window.scrollTo(0, 0);

      // ✅ 해당 섹션 내 탭 초기화
      const tabButtons = targetSection?.querySelectorAll('.tab-button');
      const tabContents = targetSection?.querySelectorAll('.tab-content');

      if (tabButtons?.length && tabContents?.length) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
      }

      // 사이드 패널 닫기
      document.getElementById('sidePanel')?.classList.remove('show');
    });
  });

  // ✅ 로고 클릭 시 메인 화면 복귀
  if (logoLink) {
    logoLink.addEventListener('click', function (e) {
      e.preventDefault();

      // 모든 섹션 숨기고
      sections.forEach(sec => sec.classList.remove('active'));

      // 메인 콘텐츠 다시 보이기
      mainSections.forEach(el => el.style.display = '');

      // 헤더 색상 원래대로
      header.classList.remove('scrolled');
      menuTabs.classList.remove('scrolled');

      // 위치 맨 위로
      window.scrollTo(0, 0);
      isContentMode = false;

      // 사이드 패널 닫기
      document.getElementById('sidePanel')?.classList.remove('show');
    });
  }

  // 📌 스크롤 이벤트 (메인화면에서만 동작)
  window.addEventListener('scroll', function () {
    if (isContentMode) return;

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      menuTabs.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
      menuTabs.classList.remove('scrolled');
    }
  });

  // 📌 탭 버튼 클릭 시 콘텐츠 전환
  const allTabButtons = document.querySelectorAll(".tab-button");
  const allTabContents = document.querySelectorAll(".tab-content");

  allTabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const parentSection = button.closest('.page-section');
      const sectionButtons = parentSection.querySelectorAll('.tab-button');
      const sectionContents = parentSection.querySelectorAll('.tab-content');

      // 버튼 전환
      sectionButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // 콘텐츠 전환
      const targetId = button.dataset.tab;
      sectionContents.forEach(content => {
        content.classList.remove("active");
        if (content.id === targetId) {
          content.classList.add("active");
        }
      });
    });
  });
});

// ✅ 사이드 메뉴 토글 함수
function toggleSidePanel() {
  const panel = document.getElementById("sidePanel");
  panel.classList.toggle("show");
}

function goToReservationForm() {
  // 모든 section 비활성화
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });

  // 메인 콘텐츠 보이기
  document.querySelectorAll(
    '#main-hero, .benefit-box, .premium, .subway-section, .contact-banner, .main-banner'
  ).forEach(el => {
    el.style.display = '';
  });

  // 스크롤 상태 초기화
  isContentMode = false;

  // 스크롤 맨 위
  window.scrollTo(0, 0);

  // 헤더 색 고정 유지
  const header = document.getElementById('header');
  const menuTabs = document.querySelector('.menu-tabs');
  header.classList.add('scrolled');
  menuTabs.classList.add('scrolled');

  // ✅ 메뉴 탭 a의 .active 제거
  document.querySelectorAll('.menu-tabs a').forEach(link => {
    link.classList.remove('active');
  });

  // 폼 위치로 스크롤
  setTimeout(() => {
    document.querySelector('.contact-banner')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// 애니메이션
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // ⭐ 재실행을 위한 리셋 과정
      el.classList.remove('visible');

      // animation 속성 제거 → 다시 설정
      el.style.animation = 'none';
      el.offsetHeight; // 강제 리플로우 (repaint trigger)
      el.style.animation = '';
      
      // 다시 visible 부여
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.hero-animate').forEach(el => {
  observer.observe(el);
});
document.querySelectorAll('.contact-animate').forEach(el => {
  observer.observe(el);
});



document.addEventListener('DOMContentLoaded', function () {
  // 오늘 날짜로 기본 설정
  flatpickr("#visit-date", {
    dateFormat: "Y-m-d",
    defaultDate: new Date() // 오늘 날짜
  });

  // 시간만 보이게 하고, 기본값을 12:00 PM으로 설정
  flatpickr("#visit-time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    time_24hr: false,
    defaultDate: "12:00" // 12:00 PM
  });
});