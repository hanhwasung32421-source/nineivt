# Vercel 환경변수 설정(필수)

## 목적

이 프로젝트는 **공지사항을 관리자만 작성**할 수 있게 되어 있습니다.

- 일반 사용자: `/pages/news/`에서 공지사항 조회만 가능
- 관리자: `/admin/`에서 공지 작성 → `/api/notices`가 GitHub에 `data/notices.json`을 커밋 → Vercel 자동 재배포

## Vercel Environment Variables

Vercel 프로젝트 Settings → Environment Variables에 아래를 추가하세요.

- `ADMIN_KEY`
  - 관리자 페이지에서 입력하는 비밀키
- `GITHUB_TOKEN`
  - GitHub Personal Access Token (repo 권한 필요)
- `GITHUB_OWNER`
  - 예: `hanhwasung32421-source`
- `GITHUB_REPO`
  - 예: `firsthome`
- `GITHUB_BRANCH`
  - 예: `main` (기본값 `main`)
- `GITHUB_FILE_PATH`
  - 예: `data/notices.json` (기본값 동일)

## 관리자 페이지

- `/admin/` 에서 공지 작성 가능
- 키가 없으면 저장(배포) 버튼이 동작하지 않습니다.

