# 커스터마이징 가이드

이 문서는 청첩장을 여러분의 정보에 맞게 수정하는 방법을 안내합니다.

## 📝 필수 수정 사항

### 1. 결혼식 정보 수정

#### 날짜 및 시간
`src/components/DateTime.tsx` 파일을 수정하세요:

```typescript
const weddingDate = '2026-01-25';  // YYYY-MM-DD 형식
const weddingDateTime = new Date('2026-01-25T14:30:00');  // 시간 포함
```

#### 신랑/신부 이름
`src/components/Intro.tsx` 파일의 이름을 수정하세요:

```typescript
<span className="groom-name">신랑이름</span>
<span className="bride-name">신부이름</span>
```

### 2. 초대 메시지 및 부모님 정보

`src/components/Invitation.tsx` 파일을 수정하세요:

```typescript
// 초대 메시지 수정
<p className="invitation-message">
  여러분만의 메시지를 입력하세요
</p>

// 부모님 정보 수정
<p className="parent-names">
  <span>아버지 이름</span>
  <span>어머니 이름</span>
</p>
```

### 3. 예식장 정보

`src/components/Location.tsx` 파일을 수정하세요:

```typescript
const venueName = '예식장 이름';
const venueAddress = '서울특별시 강남구 테헤란로 123';
const venuePhone = '02-1234-5678';
const venueFloor = '3층 그랜드홀';
const lat = 37.5665;  // 실제 위도
const lng = 126.9780; // 실제 경도
```

### 4. 연락처 정보

`src/components/Contact.tsx` 파일의 연락처를 수정하세요:

```typescript
const contacts = {
  groom: {
    name: '신랑 이름',
    phone: '010-1234-5678',
    father: { name: '아버지 이름', phone: '010-1111-2222' },
    mother: { name: '어머니 이름', phone: '010-3333-4444' },
  },
  bride: {
    name: '신부 이름',
    phone: '010-8765-4321',
    father: { name: '아버지 이름', phone: '010-5555-6666' },
    mother: { name: '어머니 이름', phone: '010-7777-8888' },
  },
};
```

### 5. 계좌번호

`src/components/Account.tsx` 파일의 계좌정보를 수정하세요:

```typescript
const groomAccounts: AccountInfo[] = [
  { bank: '은행명', account: '계좌번호', holder: '예금주' },
  // ...
];

const brideAccounts: AccountInfo[] = [
  { bank: '은행명', account: '계좌번호', holder: '예금주' },
  // ...
];
```

### 6. Footer 정보

`src/components/Footer.tsx` 파일을 수정하세요:

```typescript
<p className="footer-names">
  신랑이름 · 신부이름
</p>
<p className="footer-date">
  2026. 01. 25
</p>
```

## 🎨 디자인 커스터마이징

### 색상 테마 변경

`src/styles/global.css` 파일의 `:root` 변수를 수정하세요:

```css
:root {
  --primary-color: #d4a5a5;      /* 메인 컬러 */
  --secondary-color: #f5e6e8;    /* 서브 컬러 */
  --accent-color: #9d7b7b;       /* 강조 컬러 */
  --text-primary: #333333;       /* 기본 텍스트 색상 */
  --text-secondary: #666666;     /* 보조 텍스트 색상 */
}
```

### 폰트 변경

`index.html`의 Google Fonts 링크를 수정하거나:

```html
<link href="https://fonts.googleapis.com/css2?family=원하는폰트&display=swap" rel="stylesheet" />
```

`src/styles/global.css`의 폰트 변수를 수정하세요:

```css
:root {
  --font-kr: '원하는 한글 폰트', sans-serif;
  --font-kr-serif: '원하는 세리프 폰트', serif;
  --font-en: '원하는 영문 폰트', cursive;
}
```

## 🖼️ 이미지 교체

### 메인 커버 이미지
1. `public/images/main/` 폴더에 이미지 추가
2. `src/components/Intro.tsx` 파일에서 이미지 경로 수정:

```typescript
<img 
  src="/images/main/your-image.jpg"  // 실제 이미지 파일명으로 수정
  alt="Wedding Cover" 
/>
```

### 갤러리 이미지
1. `public/images/gallery/` 폴더에 이미지들 추가
2. `src/components/Gallery.tsx` 파일의 이미지 배열 수정:

```typescript
const images = [
  '/images/gallery/photo1.jpg',
  '/images/gallery/photo2.jpg',
  '/images/gallery/photo3.jpg',
  // ... 원하는 만큼 추가
];
```

### 이미지 최적화 팁
- 이미지 크기: 1920px 이하 권장
- 파일 용량: 1MB 이하 권장
- 포맷: WebP 또는 JPEG 사용
- 온라인 압축 도구 활용 (TinyPNG, Squoosh 등)

## 🎵 BGM 추가 (선택사항)

`public/` 폴더에 음악 파일을 추가하고, `src/App.tsx`에 오디오 플레이어를 추가할 수 있습니다:

```typescript
import { useEffect, useRef } from 'react';

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 사용자 상호작용 후 재생
    const playAudio = () => {
      audioRef.current?.play();
      document.removeEventListener('click', playAudio);
    };
    document.addEventListener('click', playAudio);
    return () => document.removeEventListener('click', playAudio);
  }, []);

  return (
    <div className="App">
      <audio ref={audioRef} loop>
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
      </audio>
      {/* 나머지 컴포넌트 */}
    </div>
  );
}
```

## 📱 카카오톡 공유 설정

### 1. Kakao Developers 앱 등록
1. https://developers.kakao.com 접속
2. 내 애플리케이션 → 애플리케이션 추가하기
3. 앱 이름 입력 후 저장

### 2. 플랫폼 등록
1. 앱 설정 → 플랫폼 → Web 플랫폼 등록
2. 사이트 도메인 입력 (예: https://username.github.io)

### 3. JavaScript Key 발급
1. 앱 키 탭에서 JavaScript 키 복사

### 4. 코드에 적용
`index.html`의 `</body>` 태그 앞에 추가:

```html
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
<script>
  Kakao.init('YOUR_JAVASCRIPT_KEY'); // 발급받은 키 입력
</script>
```

`src/utils/helpers.ts`의 `shareKakao` 함수 주석 해제:

```typescript
if (!kakao.isInitialized()) {
  kakao.init('YOUR_JAVASCRIPT_KEY'); // 발급받은 키 입력
}
```

## 🗺️ 지도 API 추가 (선택사항)

### 카카오맵
1. Kakao Developers에서 지도 API 활성화
2. JavaScript 키 사용
3. `src/components/Location.tsx`에 카카오맵 추가:

```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=bec50c733a82838b1925e8800a64f447&autoload=false`;
  document.head.appendChild(script);
  
  script.onload = () => {
    kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3
      };
      const map = new kakao.maps.Map(container, options);
      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
        map: map
      });
    });
  };
}, []);
```

## 💬 방명록 설정

### Google Forms 사용
1. Google Forms에서 새 양식 만들기
2. 질문 추가 (이름, 축하 메시지 등)
3. 보내기 → 링크 아이콘 → 링크 복사
4. `src/components/Guestbook.tsx`에 URL 추가:

```typescript
const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true';
```

## 🚀 배포 전 체크리스트

- [ ] 모든 개인정보 입력 완료
- [ ] 이미지 교체 완료
- [ ] 색상 테마 확인
- [ ] 모바일에서 테스트
- [ ] 빌드 오류 없음 (`npm run build`)
- [ ] GitHub 저장소 생성
- [ ] `vite.config.ts`의 `base` 설정 확인

## 🔧 문제 해결

### 이미지가 표시되지 않을 때
- 이미지 파일이 `public/images/` 폴더에 있는지 확인
- 이미지 경로가 `/images/...`로 시작하는지 확인
- 빌드 후 `dist/images/` 폴더에 이미지가 복사되었는지 확인

### 스타일이 적용되지 않을 때
- CSS 파일이 컴포넌트에서 import 되었는지 확인
- 브라우저 캐시 삭제 후 재시도
- 개발자 도구에서 CSS 로딩 오류 확인

### 빌드가 실패할 때
- `npm install`로 의존성 재설치
- TypeScript 오류 확인
- ESLint 경고 확인

## 📞 추가 지원

더 많은 정보가 필요하시면:
- `README.md` - 프로젝트 개요 및 시작 가이드
- `DEPLOYMENT.md` - 배포 상세 가이드
- `PRD.md` - 프로젝트 요구사항 문서


