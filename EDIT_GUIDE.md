# 나인투자 사이트 편집 가이드

## 구조

- `index.html`: 메인 페이지
- `assets/css/style.css`: 전체 공통 스타일
- `assets/js/site.js`: 공통 스크립트
- `assets/images/`: 메인 및 서브 비주얼 이미지
- `pages/about/index.html`: 회사소개
- `pages/business/index.html`: 사업영역
- `pages/service/index.html`: 서비스안내
- `pages/location/index.html`: 오시는 길
- `pages/news/index.html`: 공지사항
- `pages/reviews/index.html`: 고객후기

## 자주 수정하는 곳

- 회사명: 각 페이지 상단 브랜드와 푸터 텍스트
- 번호 정보: 각 페이지 푸터와 표 안의 `0000` 형식 값
- 메인 문구: `index.html`
- 소개 문구: `pages/about/index.html`
- 사업영역 문구: `pages/business/index.html`
- 서비스 문구: `pages/service/index.html`

## 이미지 교체

- 메인 배경: `assets/images/hero_finance.jpg`
- 회사소개 이미지: `assets/images/about_team.jpg`
- 서비스 이미지: `assets/images/service_strategy.jpg`

## 스타일 수정 팁

- 색상: `assets/css/style.css` 상단 `:root`
- 버튼 스타일: `.pill`
- 메인 비주얼: `.hero`
- 서브 배너: `.sub-hero`
- 카드 영역: `.card`, `.mini-card`, `.faq-item`
