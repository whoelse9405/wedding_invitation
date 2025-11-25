# 🎨 커스터마이징 가이드

이 문서는 청첩장을 여러분의 정보에 맞게 수정하는 방법을 상세히 안내합니다.

## 목차

1. [필수 수정 사항](#-필수-수정-사항)
2. [디자인 커스터마이징](#-디자인-커스터마이징)
3. [이미지 교체](#️-이미지-교체)
4. [기능 커스터마이징](#-기능-커스터마이징)
5. [문제 해결](#-문제-해결)

## 📝 필수 수정 사항

### 1. 신랑/신부 정보

#### `src/components/Intro.tsx`
```typescript
const groomName = "신랑 이름";
const brideName = "신부 이름";
const weddingDate = "2026년 1월 25일 (토요일) 오후 2시 30분";
```

#### `src/components/Invitation.tsx`
```typescript
// 초대 메시지 수정
const message = `
  여러분만의 특별한 초대 메시지를
  이곳에 작성하세요.
`;

// 부모님 정보
const groomParents = {
  father: "신랑 아버지",
  mother: "신랑 어머니"
};
const brideParents = {
  father: "신부 아버지",
  mother: "신부 어머니"
};
```

### 2. 결혼식 일정 및 장소

#### `src/components/DateTime.tsx`
```typescript
const weddingDate = '2026-01-25';  // YYYY-MM-DD 형식
const weddingDateTime = new Date('2026-01-25T14:30:00');
const venue = "예식장 이름";
const floor = "3층 그랜드홀";
```

### 3. 예식장 위치 정보

#### `src/components/Location.tsx`
```typescript
const venueName = '예식장 이름';
const venueAddress = '서울특별시 강남구 테헤란로 123';
const venuePhone = '02-1234-5678';
const lat = 37.5665;  // 실제 위도로 변경 필수!
const lng = 126.9780; // 실제 경도로 변경 필수!
```

**좌표 찾는 방법:**
1. [카카오맵](https://map.kakao.com)에서 예식장 검색
2. 우클릭 → "여기가 어디?" 클릭
3. 위도, 경도 확인 및 복사

#### 교통 안내 수정
```typescript
// 주차 정보
const parkingInfo = [
  { name: "제1 주차장", address: "주소", note: "도보 5분, 2시간 무료" },
  { name: "제2 주차장", address: "주소", note: "추가 정보" }
];

// 버스 노선
const busInfo = {
  station: "정류장 이름",
  lines: ["141번", "242번", "3412번"]
};

// 지하철 노선
const subwayInfo = [
  { line: "9호선", stations: ["선정릉역 4번 출구", "언주역 5번 출구"] },
  { line: "분당선", stations: ["선정릉역 10번 출구"] }
];
```

### 4. 피로연 정보 (선택사항)

#### `src/components/Reception.tsx`
피로연이 있는 경우 활성화하고 정보를 수정하세요:
```typescript
const receptionVenue = "피로연 장소";
const receptionAddress = "피로연 주소";
const receptionDate = "2026년 1월 17일 토요일 오전 10시";
const lat = 33.25381330431267;  // 피로연 장소 위도
const lng = 126.42511348753668; // 피로연 장소 경도
```

피로연이 없는 경우 `src/App.tsx`에서 해당 컴포넌트를 주석 처리하세요:
```typescript
// <Reception />
```

### 5. 연락처 정보

#### `src/components/Contact.tsx`
```typescript
const contacts = {
  groom: {
    name: '신랑 이름',
    phone: '010-1234-5678',
    father: { 
      name: '아버지 이름', 
      phone: '010-1111-2222',
      relation: '아버지'
    },
    mother: { 
      name: '어머니 이름', 
      phone: '010-3333-4444',
      relation: '어머니'
    }
  },
  bride: {
    name: '신부 이름',
    phone: '010-8765-4321',
    father: { 
      name: '아버지 이름', 
      phone: '010-5555-6666',
      relation: '아버지'
    },
    mother: { 
      name: '어머니 이름', 
      phone: '010-7777-8888',
      relation: '어머니'
    }
  }
};
```

### 6. 계좌번호 (축의금)

#### `src/components/Account.tsx`
```typescript
interface AccountInfo {
  bank: string;
  account: string;
  holder: string;
}

const groomAccounts: AccountInfo[] = [
  { 
    bank: '신한은행', 
    account: '110-123-456789', 
    holder: '신랑이름' 
  },
  { 
    bank: '국민은행', 
    account: '123456-01-123456', 
    holder: '신랑아버지' 
  }
];

const brideAccounts: AccountInfo[] = [
  { 
    bank: '우리은행', 
    account: '1002-123-456789', 
    holder: '신부이름' 
  },
  { 
    bank: '하나은행', 
    account: '123-456789-12345', 
    holder: '신부아버지' 
  }
];
```

**계좌번호 복사 기능**은 자동으로 작동합니다.

### 7. Footer 정보

#### `src/components/Footer.tsx`
```typescript
<div className="footer-content">
  <p className="footer-names">신랑이름 · 신부이름</p>
  <p className="footer-date">2026. 01. 25</p>
  <p className="footer-copyright">
    © 2026 Wedding Invitation
  </p>
</div>
```

## 🎨 디자인 커스터마이징

### 색상 테마 변경

#### `src/styles/global.css`
```css
:root {
  /* 메인 색상 */
  --primary-color: #8B4513;      /* 브라운 계열 메인 */
  --secondary-color: #A0522D;    /* 브라운 계열 보조 */
  --accent-color: #D4AF37;       /* 골드 포인트 */
  
  /* 텍스트 색상 */
  --text-primary: #333;          /* 기본 텍스트 */
  --text-secondary: #666;        /* 보조 텍스트 */
  --text-light: #999;            /* 연한 텍스트 */
  
  /* 배경 색상 */
  --background: #FAF9F6;         /* 기본 배경 */
  --background-white: #FFFFFF;   /* 흰색 배경 */
  --background-light: #F5F5F5;   /* 연한 배경 */
  
  /* 라인 색상 */
  --border-color: #E0E0E0;       /* 기본 테두리 */
  --divider-color: #DEDEDE;      /* 구분선 */
}
```

**색상 조합 추천:**
- **로맨틱 핑크**: `#FFB6C1`, `#FFC0CB`, `#FFD1DC`
- **엘레강트 보라**: `#9370DB`, `#DDA0DD`, `#E6E6FA`
- **내추럴 그린**: `#90EE90`, `#98FB98`, `#F0FFF0`
- **클래식 네이비**: `#000080`, `#4169E1`, `#B0C4DE`

### 폰트 변경

#### 1. Google Fonts에서 폰트 선택
[Google Fonts](https://fonts.google.com)에서 원하는 폰트를 선택합니다.

#### 2. `index.html`에 추가
```html
<head>
  <!-- 기존 폰트 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- 새로운 폰트 추가 -->
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
```

#### 3. `src/styles/global.css`에 적용
```css
:root {
  --font-kr: 'Noto Serif KR', serif;
  --font-kr-serif: 'Noto Serif KR', serif;
  --font-en: 'Great Vibes', cursive;
}

body {
  font-family: var(--font-kr);
}
```

### 레이아웃 조정

#### 섹션 순서 변경
`src/App.tsx`에서 컴포넌트 순서를 변경하세요:
```typescript
<div className="App">
  <SplashScreen />
  <Intro />
  <Invitation />
  <DateTime />
  <Gallery />        {/* 위치 변경 가능 */}
  <Location />
  <Reception />      {/* 필요시 제거 */}
  <Contact />
  <Account />
  <Guestbook />
  <Share />
  <Blank />
  <Footer />
</div>
```

#### 섹션 간격 조정
`src/styles/global.css`:
```css
.section {
  padding: 60px 20px;  /* 상하 간격 조정 */
}
```

## 🖼️ 이미지 교체

### 메인 커버 이미지

#### 1. 이미지 준비
- **권장 크기**: 1920 x 1080px 이상
- **권장 용량**: 1MB 이하
- **권장 포맷**: JPG, WebP

#### 2. 이미지 추가
`public/images/main/` 폴더에 이미지 파일을 추가합니다.

#### 3. 코드 수정
`src/components/Intro.tsx`:
```typescript
<div className="intro-image">
  <img 
    src="/images/main/cover.jpg"  // 파일명 변경
    alt="Wedding Cover" 
    loading="eager"
  />
</div>
```

### 갤러리 이미지

#### 1. 이미지 준비
- **권장 크기**: 1200 x 1200px (정사각형)
- **권장 용량**: 각 500KB 이하
- **권장 개수**: 6-12장

#### 2. 이미지 추가
`public/images/gallery/` 폴더에 이미지들을 추가합니다.

#### 3. 코드 수정
`src/components/Gallery.tsx`:
```typescript
const images = [
  '/images/gallery/photo1.jpg',
  '/images/gallery/photo2.jpg',
  '/images/gallery/photo3.jpg',
  '/images/gallery/photo4.jpg',
  '/images/gallery/photo5.jpg',
  '/images/gallery/photo6.jpg',
];
```

### 이미지 최적화

#### 온라인 도구
- [TinyPNG](https://tinypng.com/) - PNG/JPG 압축
- [Squoosh](https://squoosh.app/) - 다양한 포맷 압축
- [ImageOptim](https://imageoptim.com/) - Mac 전용

#### 명령줄 도구
```bash
# ImageMagick 설치
brew install imagemagick

# 이미지 리사이징
magick convert input.jpg -resize 1920x1080 -quality 85 output.jpg

# WebP 변환
magick convert input.jpg -quality 85 output.webp
```

## 🔧 기능 커스터마이징

### 배경 음악 설정

자세한 내용은 [MUSIC_GUIDE.md](./MUSIC_GUIDE.md)를 참고하세요.

### 스플래시 화면 설정

자세한 내용은 [SPLASH_SCREEN_GUIDE.md](./SPLASH_SCREEN_GUIDE.md)를 참고하세요.

### 카카오맵 API 설정

자세한 내용은 [KAKAO_MAP_GUIDE.md](./KAKAO_MAP_GUIDE.md)를 참고하세요.

### 애니메이션 조정

자세한 내용은 [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md)를 참고하세요.

### 카카오톡 공유 설정

#### 1. Kakao Developers 앱 등록
1. [Kakao Developers](https://developers.kakao.com) 접속
2. **내 애플리케이션** → **애플리케이션 추가하기**
3. 앱 이름 입력 후 저장

#### 2. 플랫폼 등록
1. **앱 설정** → **플랫폼** → **Web 플랫폼 등록**
2. 사이트 도메인 입력:
   - 개발: `http://localhost:5173`
   - 배포: `https://whoelse9405.github.io`

#### 3. JavaScript 키 발급
**앱 키** 탭에서 **JavaScript 키** 복사

#### 4. 코드에 적용
`index.html`:
```html
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
  Kakao.init('YOUR_JAVASCRIPT_KEY'); // 발급받은 키
</script>
```

`src/components/Share.tsx`:
```typescript
const handleKakaoShare = () => {
  if (window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '신랑♥신부 결혼합니다',
        description: '2026년 1월 25일 오후 2시 30분',
        imageUrl: 'https://whoelse9405.github.io/images/main/cover.jpg',
        link: {
          mobileWebUrl: 'https://whoelse9405.github.io/wedding_invitation_code',
          webUrl: 'https://whoelse9405.github.io/wedding_invitation_code'
        }
      }
    });
  }
};
```

### 방명록 기능

#### Google Forms 사용
1. [Google Forms](https://forms.google.com) 새 양식 만들기
2. 질문 추가:
   - 이름 (단답형)
   - 축하 메시지 (장문형)
3. **보내기** → **<> 임베드** → 코드 복사
4. `src/components/Guestbook.tsx`에 적용:

```typescript
<iframe 
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
  width="100%" 
  height="800" 
  frameBorder="0"
>
  로드 중...
</iframe>
```

## 🚀 배포 전 체크리스트

### 필수 확인사항
- [ ] 신랑/신부 이름 확인
- [ ] 결혼식 날짜/시간 확인
- [ ] 예식장 주소 및 좌표 확인
- [ ] 연락처 정보 확인
- [ ] 계좌번호 확인
- [ ] 부모님 정보 확인

### 이미지 확인
- [ ] 메인 커버 이미지 교체
- [ ] 갤러리 이미지 교체
- [ ] 이미지 용량 최적화 (각 1MB 이하)
- [ ] 모든 이미지 로딩 테스트

### 기능 확인
- [ ] 전화 연결 테스트
- [ ] 문자 전송 테스트  
- [ ] 계좌번호 복사 테스트
- [ ] 카카오맵 표시 확인
- [ ] 카카오톡 공유 테스트
- [ ] 배경음악 재생 테스트

### 디바이스별 테스트
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad
- [ ] 데스크톱 (Chrome, Safari, Edge)

### 빌드 및 배포
- [ ] `npm run build` 오류 없음
- [ ] `vite.config.ts`의 `base` 설정 확인
- [ ] GitHub Pages 배포 성공
- [ ] 실제 URL에서 동작 확인

## 🐛 문제 해결

### 이미지가 표시되지 않을 때

**원인 1**: 이미지 경로 오류
```typescript
// 잘못된 경로
src="images/main/cover.jpg"      // ❌

// 올바른 경로
src="/images/main/cover.jpg"     // ✅ (맨 앞에 / 필요)
```

**원인 2**: 이미지 파일 위치
- `public/images/` 폴더에 있어야 함
- 대소문자 구분 주의

**원인 3**: 배포 후 경로 문제
`vite.config.ts`:
```typescript
export default defineConfig({
  base: '/wedding_invitation_code/',  // 저장소 이름과 일치
});
```

### 스타일이 적용되지 않을 때

**해결 방법 1**: CSS import 확인
```typescript
import '../styles/ComponentName.css';  // 컴포넌트 상단
```

**해결 방법 2**: 캐시 삭제
- 브라우저: Cmd/Ctrl + Shift + R (강력 새로고침)
- 개발 서버: 재시작

**해결 방법 3**: CSS 우선순위 확인
```css
/* 우선순위가 낮음 */
.button { }

/* 우선순위가 높음 */
.section .button { }
```

### 카카오맵이 표시되지 않을 때

**원인 1**: JavaScript 키 미등록
- Kakao Developers에서 키 발급 확인

**원인 2**: 도메인 미등록
- 플랫폼 설정에 도메인 추가

**원인 3**: 좌표 오류
```typescript
// 올바른 형식
const lat = 37.5665;   // 숫자형
const lng = 126.9780;  // 숫자형
```

### 빌드가 실패할 때

```bash
# 1. node_modules 삭제 및 재설치
rm -rf node_modules package-lock.json
npm install

# 2. 캐시 삭제
npm run build -- --force

# 3. TypeScript 오류 확인
npm run type-check
```

### 모바일에서 레이아웃이 깨질 때

`src/styles/global.css`:
```css
/* viewport 설정 확인 */
html {
  font-size: 16px;
}

/* 모바일 미디어 쿼리 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}
```

## 📞 추가 도움말

### 관련 문서
- [README.md](./README.md) - 프로젝트 개요
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드
- [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md) - 애니메이션
- [KAKAO_MAP_GUIDE.md](./KAKAO_MAP_GUIDE.md) - 카카오맵
- [MUSIC_GUIDE.md](./MUSIC_GUIDE.md) - 배경음악
- [SPLASH_SCREEN_GUIDE.md](./SPLASH_SCREEN_GUIDE.md) - 스플래시

### 문의
- GitHub Issues: 버그 리포트 및 기능 제안
- GitHub Discussions: 질문 및 토론

---

**💡 팁**: 로컬에서 충분히 테스트한 후 배포하세요!
