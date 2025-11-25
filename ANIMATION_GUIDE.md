# 애니메이션 가이드

## 개요

청첩장 웹사이트에 적용된 애니메이션 효과에 대한 설명입니다.

## 적용된 애니메이션

### 1. **Intro (메인 섹션)**
- **이미지**: `zoomIn` - 1.2배 확대에서 정상 크기로 줌 인
- **신랑신부 이름**: `fadeInDown` - 위에서 아래로 페이드 인
- **일시/장소**: `fadeInUp` - 아래에서 위로 페이드 인 (0.3초 지연)
- **하트 아이콘**: `heartbeat` - 무한 반복 박동 애니메이션

### 2. **Invitation (초대장 메시지)**
- **컨텐츠**: `fadeInUp` - 아래에서 위로 페이드 인
- **제목**: `fadeInDown` - 위에서 아래로 페이드 인
- **메시지**: `fadeInUp` - 0.2초 지연
- **부모님 정보**: `zoomIn` - 작은 크기에서 정상 크기로 (0.3초 지연)

### 3. **DateTime (날짜/시간)**
- **캘린더**: `slideUp` - 아래에서 위로 슬라이드

### 4. **Location (장소)**
- **예식장 정보**: `slideInFromTop` - 위에서 아래로 슬라이드
- **전체 컨텐츠**: `fadeInUp` - 아래에서 위로 페이드 인
- **카카오맵**: `zoomIn` - 0.3초 지연
- **길찾기 버튼**: `fadeInUp` - 0.4초 지연
- **교통 안내**: `fadeInUp` - 0.5초 지연
- **교통 섹션**: 각각 0.6초, 0.7초, 0.8초 지연

### 5. **Gallery (갤러리)**
- **갤러리 아이템**: `fadeInScale` - 각 아이템마다 0.05초씩 지연
  - 1번째: 0.1초 지연
  - 2번째: 0.15초 지연
  - 3번째: 0.2초 지연
  - ... (최대 10개까지)

### 6. **Contact (연락처)**
- **연락처 그룹**: `slideInUp` 
  - 신랑측: 0.1초 지연
  - 신부측: 0.2초 지연

### 7. **Account (계좌)**
- **안내 문구**: `fadeInDown`
- **계좌 그룹**: `slideInUp`
  - 신랑측: 0.2초 지연
  - 신부측: 0.3초 지연

### 8. **Guestbook (방명록)**
- **안내 문구**: `fadeIn`
- **플레이스홀더**: `zoomIn`

### 9. **Share (공유)**
- **안내 문구**: `fadeIn`
- **공유 버튼**: `slideUp` - 0.2초 지연
- **안내 노트**: `slideUp` - 0.3초 지연

## 애니메이션 타이밍

### 지속 시간
- **빠른 애니메이션**: 0.6초
- **보통 애니메이션**: 0.8초
- **느린 애니메이션**: 1.0 ~ 1.5초

### Easing 함수
- **ease-out**: 대부분의 인입 애니메이션 (빠르게 시작, 천천히 끝남)
- **ease-in-out**: 부드러운 전환이 필요한 경우

## 커스터마이징

### 애니메이션 속도 변경

각 CSS 파일에서 `animation` 속성의 지속 시간을 변경하세요:

```css
/* 예: Location.css */
.location-content {
  animation: fadeInUp 0.8s ease-out; /* 0.8s를 원하는 값으로 변경 */
}
```

### 애니메이션 지연 시간 변경

```css
/* 예: Gallery.css */
.gallery-item:nth-child(1) { 
  animation-delay: 0.1s; /* 지연 시간 변경 */
}
```

### 애니메이션 비활성화

특정 섹션의 애니메이션을 끄려면 해당 CSS 파일에서 `animation` 속성을 제거하거나 주석 처리:

```css
.location-content {
  /* animation: fadeInUp 0.8s ease-out; */
}
```

### 모든 애니메이션 비활성화

`src/styles/global.css`에 추가:

```css
* {
  animation: none !important;
  transition: none !important;
}
```

## 애니메이션 종류 설명

### 1. fadeIn / fadeInUp / fadeInDown
- **효과**: 투명도가 0에서 1로 변하면서 나타남
- **방향**: Up(위로), Down(아래로)
- **사용처**: 텍스트, 카드

### 2. slideUp / slideInUp
- **효과**: 아래에서 위로 슬라이드하며 나타남
- **사용처**: 카드, 버튼 그룹

### 3. zoomIn
- **효과**: 작은 크기(0.95)에서 정상 크기(1.0)로 확대
- **사용처**: 이미지, 카드

### 4. fadeInScale
- **효과**: 투명도 + 크기 변화 조합
- **사용처**: 갤러리 아이템

### 5. heartbeat
- **효과**: 크기가 주기적으로 커졌다 작아짐
- **사용처**: 아이콘, 강조 요소

## 성능 최적화

### GPU 가속 활용
애니메이션에 `transform`과 `opacity`만 사용하여 GPU 가속을 활용합니다.

```css
/* ✅ 좋은 예 */
.element {
  transform: translateY(20px);
  opacity: 0;
}

/* ❌ 나쁜 예 */
.element {
  top: 20px;
  opacity: 0;
}
```

### will-change 속성
복잡한 애니메이션에 `will-change` 추가:

```css
.gallery-item {
  will-change: transform, opacity;
}
```

## 브라우저 지원

- Chrome/Edge: 완벽 지원
- Safari: 완벽 지원
- Firefox: 완벽 지원
- Mobile Safari: 완벽 지원
- Samsung Internet: 완벽 지원

## 문제 해결

### 애니메이션이 작동하지 않을 때
1. 브라우저 캐시 삭제
2. CSS 파일이 제대로 로드되는지 확인
3. 개발자 도구의 Console에서 에러 확인

### 애니메이션이 너무 느릴 때
1. 지속 시간을 줄이기 (예: 0.8s → 0.4s)
2. 지연 시간을 줄이기
3. 복잡한 애니메이션 단순화

### 애니메이션이 끊길 때
1. `will-change` 속성 추가
2. 하드웨어 가속 활성화: `transform: translateZ(0)`
3. 동시에 실행되는 애니메이션 수 줄이기

## 추가 애니메이션 아이디어

### 스크롤 애니메이션
Intersection Observer API를 사용하여 스크롤 시 애니메이션 트리거:

```typescript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  });

  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, []);
```

### 패럴랙스 효과
배경 이미지가 스크롤 속도와 다르게 움직이는 효과:

```css
.intro-section {
  background-attachment: fixed;
}
```

## 참고 자료

- [CSS Animation MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [CSS Tricks - Animation](https://css-tricks.com/almanac/properties/a/animation/)
- [Animate.css](https://animate.style/) - 인기 있는 CSS 애니메이션 라이브러리


