# 💒 모바일 청첩장

현대적이고 아름다운 반응형 모바일 청첩장 웹사이트

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

## 🎯 프로젝트 정보

- **기술 스택**: React + TypeScript + Vite
- **스타일링**: Custom CSS with animations
- **배포**: GitHub Pages
- **지도**: Kakao Map API

## ✨ 주요 기능

### 🎨 디자인
- ✅ 반응형 모바일 우선 디자인
- ✅ 부드러운 스크롤 애니메이션
- ✅ 커스텀 SVG 아이콘 (교통수단)
- ✅ 스플래시 스크린
- ✅ 배경 음악 플레이어

### 📅 정보 섹션
- ✅ 메인 커버 (신랑 & 신부 정보)
- ✅ 청첩장 메시지
- ✅ 결혼식 일정 및 D-Day 카운터
- ✅ 예식장 위치 (카카오맵 연동)
- ✅ 피로연 안내

### 🖼️ 인터랙티브
- ✅ 이미지 갤러리 (라이트박스)
- ✅ 연락처 (전화/문자 바로 연결)
- ✅ 계좌번호 복사 기능
- ✅ 방명록
- ✅ 카카오톡 공유하기

### 🚗 교통안내
- ✅ 주차 정보
- ✅ 버스 노선
- ✅ 지하철 노선
- ✅ 자동차 길찾기
- ✅ 카카오맵/네이버지도 연동

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone git@github.com:whoelse9405/wedding_invitation_code.git
cd wedding_invitation_code

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 배포

```bash
npm run deploy
```

GitHub Pages로 자동 배포됩니다.

## 📁 프로젝트 구조

```
wedding_invitation_code/
├── public/
│   ├── bgm.mp3              # 배경 음악
│   ├── favicon.ico          # 파비콘
│   └── images/
│       ├── main/            # 메인 커버 이미지
│       ├── gallery/         # 갤러리 이미지들
│       └── icon/            # SVG 아이콘
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── Intro.tsx       # 메인 커버
│   │   ├── Invitation.tsx  # 청첩장 메시지
│   │   ├── DateTime.tsx    # 일정 및 D-Day
│   │   ├── Gallery.tsx     # 이미지 갤러리
│   │   ├── Location.tsx    # 예식장 위치 (본식)
│   │   ├── Reception.tsx   # 피로연 위치
│   │   ├── Contact.tsx     # 연락처
│   │   ├── Account.tsx     # 계좌번호
│   │   ├── Guestbook.tsx   # 방명록
│   │   ├── Share.tsx       # 카카오톡 공유
│   │   ├── Footer.tsx      # 푸터
│   │   ├── Blank.tsx       # 여백
│   │   └── SplashScreen.tsx # 스플래시 화면
│   ├── styles/             # CSS 스타일
│   │   ├── global.css      # 전역 스타일 및 테마
│   │   └── *.css           # 컴포넌트별 스타일
│   ├── hooks/              # 커스텀 훅
│   │   └── useScrollAnimation.ts
│   ├── utils/              # 유틸리티 함수
│   │   └── helpers.ts
│   ├── App.tsx             # 메인 앱 컴포넌트
│   └── main.tsx            # 앱 진입점
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md               # 이 파일
├── DEPLOYMENT.md           # 배포 가이드
├── CUSTOMIZATION.md        # 커스터마이징 가이드
├── ANIMATION_GUIDE.md      # 애니메이션 가이드
├── KAKAO_MAP_GUIDE.md      # 카카오맵 설정 가이드
├── MUSIC_GUIDE.md          # 배경음악 설정 가이드
├── SPLASH_SCREEN_GUIDE.md  # 스플래시 화면 가이드
└── PRD.md                  # 프로젝트 요구사항 문서
```

## 🔧 커스터마이징

상세한 커스터마이징 방법은 [CUSTOMIZATION.md](./CUSTOMIZATION.md)를 참고하세요.

### 빠른 시작

#### 1. 신랑/신부 정보 변경

`src/components/Intro.tsx` 파일에서 정보를 수정하세요:

```typescript
const groomName = "신랑 이름";
const brideName = "신부 이름";
const weddingDate = "2026년 1월 25일 (토요일) 오후 2시 30분";
```

#### 2. 예식장 정보 변경

`src/components/Location.tsx`에서 장소와 좌표를 수정하세요:

```typescript
const venueName = "예식장 이름";
const venueAddress = "예식장 주소";
const lat = 37.123456;  // 위도
const lng = 127.123456; // 경도
```

#### 3. 이미지 교체

- **메인 이미지**: `public/images/main/` 폴더에 이미지 추가
- **갤러리 이미지**: `public/images/gallery/` 폴더에 이미지 추가
- 이미지는 1MB 이하로 최적화 권장

#### 4. 배경 음악 변경

`public/bgm.mp3` 파일을 원하는 음악으로 교체하세요.

## 📚 가이드 문서

- [🚀 배포 가이드](./DEPLOYMENT.md) - GitHub Pages 배포 방법
- [🎨 커스터마이징 가이드](./CUSTOMIZATION.md) - 상세 커스터마이징 방법
- [✨ 애니메이션 가이드](./ANIMATION_GUIDE.md) - 애니메이션 설정
- [🗺️ 카카오맵 가이드](./KAKAO_MAP_GUIDE.md) - 카카오맵 API 설정
- [🎵 배경음악 가이드](./MUSIC_GUIDE.md) - 배경음악 설정
- [🎬 스플래시 화면 가이드](./SPLASH_SCREEN_GUIDE.md) - 스플래시 화면 설정

## 🎨 테마 색상

`src/styles/global.css`에서 색상 테마를 변경할 수 있습니다:

```css
:root {
  --primary-color: #8B4513;      /* 메인 브라운 컬러 */
  --secondary-color: #A0522D;    /* 보조 브라운 컬러 */
  --accent-color: #D4AF37;       /* 골드 포인트 컬러 */
  --text-primary: #333;          /* 기본 텍스트 */
  --text-secondary: #666;        /* 보조 텍스트 */
  --background: #FAF9F6;         /* 배경색 */
}
```

## 🛠️ 기술 스택 상세

- **React 18.3.1**: UI 라이브러리
- **TypeScript 5.6.2**: 타입 안전성
- **Vite 5.4.10**: 빠른 빌드 도구
- **Kakao Map API**: 지도 표시
- **CSS3**: 애니메이션 및 스타일링
- **GitHub Pages**: 무료 호스팅

## 🌐 브라우저 지원

- Chrome (최신 버전)
- Safari (최신 버전)
- Firefox (최신 버전)
- Edge (최신 버전)
- 모바일 브라우저 (iOS Safari, Android Chrome)

## 📱 반응형 디자인

- 모바일 우선 디자인
- 태블릿 및 데스크톱 지원
- 다양한 화면 크기 최적화

## 🤝 기여

버그 리포트나 기능 제안은 Issues를 통해 제출해주세요.

## 📄 라이선스

MIT License

## 💌 문의

프로젝트 관련 문의사항이 있으시면 Issues를 통해 연락주세요.

---

Made with ❤️ for a beautiful wedding
