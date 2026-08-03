window.__TRAE_PROCESS_BACKUP__ = window.__TRAE_PROCESS_BACKUP__ || [];
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-07-30",
  task: "해안투자 정적 홈페이지 신규 제작",
  process: [
    "원본 사이트의 메인/회사소개/사업영역/오시는길/서비스안내 구조 분석",
    "동일 복제 대신 유사한 분위기의 독립 디자인 방향 결정",
    "페이지별 폴더 분리 구조 설계",
    "공통 스타일시트와 공통 스크립트 작성",
    "메인 및 내부 페이지 HTML 생성",
    "배경 및 섹션용 이미지 3종 생성",
    "편집 가이드 문서 작성",
    "브라우저 미리보기 검수 예정"
  ],
  outputs: {
    root: [
      "index.html",
      "conversation_backup.js",
      "process_backup.js",
      "EDIT_GUIDE.md"
    ],
    pages: [
      "pages/about/index.html",
      "pages/business/index.html",
      "pages/service/index.html",
      "pages/location/index.html",
      "pages/news/index.html",
      "pages/reviews/index.html"
    ]
  }
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-07-30",
  task: "실행 링크 제공",
  process: [
    "루트 엔트리 파일이 index.html인지 확인",
    "사용자가 바로 열 수 있도록 파일 링크 제공"
  ],
  outputs: {
    entry: "index.html"
  }
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-07-31",
  task: "디자인 최신화(세련된 트렌드 적용)",
  process: [
    "Pretendard Variable 적용으로 타이포그래피 현대화",
    "딥 네이비/골드 기반에 블루 포인트 추가로 고급 핀테크 톤 강화",
    "버튼/카드 상호작용(hover/active) 개선 및 그림자 톤 조정",
    "모바일 메뉴 오픈 방식 개선(absolute 배치 제거, header wrap 구조)",
    "헤더 스크롤 상태 반영(is-scrolled) 및 reduced-motion 대응"
  ],
  files: [
    "assets/css/style.css",
    "assets/js/site.js",
    "index.html"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-07-31",
  task: "헤더/폰트 통일 변경",
  process: [
    "상단 헤더 배경을 흰색(#fff)으로 고정",
    "사이트 전체 폰트를 Noto Sans KR로 통일(pretendard import 제거)"
  ],
  files: [
    "assets/css/style.css"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-07-31",
  task: "메인 첫 화면 버튼 스타일 통일",
  process: [
    "index.html의 첫 화면 CTA 버튼 클래스 확인",
    "상담 문의와 회사소개 보기를 사업영역 보기와 같은 pill--ghost 스타일로 변경"
  ],
  files: [
    "index.html"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-07-31",
  task: "헤더 간격 제거 및 메뉴 정리",
  process: [
    "헤더를 fixed로 변경해 메인 첫 화면과 바로 붙도록 조정",
    "메인 히어로 높이를 100vh로 맞춤",
    "전체 페이지 헤더에서 고객후기 네비 메뉴 삭제",
    "전체 페이지 헤더 우측 상담 문의 CTA 삭제"
  ],
  files: [
    "assets/css/style.css",
    "index.html",
    "pages/about/index.html",
    "pages/business/index.html",
    "pages/service/index.html",
    "pages/location/index.html",
    "pages/news/index.html",
    "pages/reviews/index.html"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-08-03",
  task: "Git 원격 저장소 설정 및 푸시",
  process: [
    "현재 폴더가 상위 저장소 하위 폴더임을 확인",
    "Vercel 배포 충돌 방지를 위해 현재 폴더를 독립 Git 저장소로 초기화",
    "main 브랜치 생성 후 전체 사이트 파일 커밋",
    "origin을 firsthome.git으로 연결",
    "GitHub 원격 저장소로 main 브랜치 푸시"
  ],
  files: [
    "conversation_backup.js",
    "process_backup.js",
    "index.html",
    "assets/",
    "pages/"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-08-03",
  task: "공지사항 고정 NOTICE + 관리자만 작성 기능",
  process: [
    "사용자 제공 이미지의 공지 문구를 텍스트로 반영",
    "문구 중 '강사는 ...' 부분을 '회원은 본 홈페이지에 글을 쓸 수 없습니다'로 수정",
    "data/notices.json을 기준으로 메인/공지사항 페이지에 NOTICE와 목록을 동적 로드",
    "관리자 페이지(/admin)에서 관리자 키로 공지 추가/저장 가능하도록 구성",
    "Vercel API(/api/notices)에서 관리자 요청만 GitHub 커밋으로 반영되게 구현"
  ],
  files: [
    "data/notices.json",
    "assets/js/notices.js",
    "api/notices.js",
    "admin/index.html",
    "index.html",
    "pages/news/index.html",
    "VERCEL_ENV.md"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-08-03",
  task: "회사명 변경(나인투자)",
  process: [
    "전체 페이지 회사명/푸터/브랜드 마크를 나인투자로 변경"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-08-03",
  task: "특정 표기 문자열 제거",
  process: [
    "공지 렌더링 로직에서 특정 표기 문자열 자동 제거 처리 추가",
    "공통 스크립트에서 모든 화면 텍스트 노드의 특정 표기 문자열 자동 제거 처리 추가"
  ],
  files: [
    "assets/js/notices.js",
    "assets/js/site.js"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-08-03",
  task: "로고 아이콘 적용",
  process: [
    "사용자가 추가한 malon-logo-icon.svg 파일을 사이트 메인 로고로 적용",
    "모든 페이지 헤더의 브랜드 마크를 SVG 이미지로 교체",
    "공통 CSS에서 로고 마크 영역을 이미지 표시에 맞게 조정"
  ],
  files: [
    "malon-logo-icon.svg",
    "assets/css/style.css",
    "index.html",
    "pages/about/index.html",
    "pages/business/index.html",
    "pages/service/index.html",
    "pages/location/index.html",
    "pages/news/index.html",
    "pages/reviews/index.html",
    "admin/index.html"
  ]
});
window.__TRAE_PROCESS_BACKUP__.push({
  timestamp: "2026-08-03",
  task: "로고 교체(n-logo-core)",
  process: [
    "새로 추가된 n-logo-core.svg 파일 확인",
    "기존 로고 참조를 전 페이지에서 n-logo-core.svg로 교체",
    "메인/내부/관리자 페이지 헤더 로고를 동일 SVG로 통일"
  ],
  files: [
    "n-logo-core.svg",
    "index.html",
    "pages/about/index.html",
    "pages/business/index.html",
    "pages/service/index.html",
    "pages/location/index.html",
    "pages/news/index.html",
    "pages/reviews/index.html",
    "admin/index.html"
  ]
});
