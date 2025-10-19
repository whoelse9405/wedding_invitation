# 스플래시 스크린 설정 가이드

## 개요

웹사이트 로딩 시 표시되는 스플래시 스크린(Splash Screen)은 연필로 글씨를 쓰는 듯한 애니메이션을 제공합니다.

## 현재 설정

기본 설정은 다음과 같습니다:

```typescript
const splashConfig = {
  line1: '이동진 ♥ 이예인',      // 연필 쓰기 효과
  line2: '2026년 1월 25일',      // 페이드인 효과
  duration: 3500,              // 3.5초
};
```

## 애니메이션 특징

### 연필 쓰기 효과
- 📝 왼쪽에서 오른쪽으로 부드럽게 나타남
- ✍️ 필기체 폰트 (Nanum Pen Script) 사용
- 💚 연두색 펜 커서가 글씨를 따라감
- 🎨 자연스러운 손글씨 느낌

## 문구 변경 방법

### 1. 기본 설정 변경

`src/components/SplashScreen.tsx` 파일을 열고 `splashConfig` 객체를 수정하세요:

```typescript
const splashConfig = {
  line1: '원하는 첫 번째 문구',  // 연필 쓰기 효과
  line2: '원하는 두 번째 문구',  // 페이드인 효과
  duration: 3500,              // 스플래시 표시 시간 (밀리초)
};
```

### 2. 예시

#### 예시 1: 간단한 인사
```typescript
const splashConfig = {
  line1: '결혼합니다',
  line2: '여러분을 초대합니다',
  duration: 3000,
};
```

#### 예시 2: 영문 사용
```typescript
const splashConfig = {
  line1: 'Save The Date',
  line2: 'January 25, 2026',
  duration: 4000,
};
```

#### 예시 3: 축하 메시지
```typescript
const splashConfig = {
  line1: '우리, 결혼합니다',
  line2: '축하해주세요',
  duration: 3500,
};
```

## 애니메이션 타이밍 변경

### 표시 시간 조절

`duration` 값을 밀리초(ms) 단위로 변경:

```typescript
duration: 2500,  // 2.5초 (빠름)
duration: 3500,  // 3.5초 (기본)
duration: 5000,  // 5초 (느림)
```

### 연필 쓰기 속도 조절

`src/styles/SplashScreen.css`에서:

```css
.splash-text.line1 {
  animation: handwriting 2s ease-in-out 0.5s forwards;
}
```

- `2s`: 쓰기 애니메이션 지속 시간 (숫자를 줄이면 빠름, 늘리면 느림)
- `0.5s`: 시작 지연 시간

예시:
```css
/* 빠른 쓰기 */
animation: handwriting 1.5s ease-in-out 0.3s forwards;

/* 느린 쓰기 */
animation: handwriting 3s ease-in-out 0.8s forwards;
```

### 펜 커서 속도 조절

```css
.splash-text.line1::before {
  animation: penCursor 2s ease-in-out 0.5s;
}
```

- `2s`: 펜이 움직이는 시간 (handwriting 애니메이션과 동일하게 설정)

### 두 번째 줄 페이드인 타이밍

```css
.splash-text.line2 {
  animation: fadeInUp 0.8s ease-out 2.3s forwards;
}
```

- `0.8s`: 페이드인 지속 시간
- `2.3s`: 시작 지연 시간 (쓰기 애니메이션 후에 나타나도록)

## 스타일 커스터마이징

### 글씨 크기 변경

```css
.splash-text.line1 {
  font-size: 3rem;  /* 첫 번째 줄 크기 (연필체는 크게) */
}

.splash-text.line2 {
  font-size: 1.3rem;  /* 두 번째 줄 크기 */
}
```

### 폰트 변경

연필체 대신 다른 필기체를 사용하려면:

```css
.splash-text.line1 {
  font-family: 'Caveat', cursive;  /* 영문 필기체 */
  /* 또는 */
  font-family: 'Single Day', cursive;  /* 한글 필기체 */
  /* 또는 */
  font-family: var(--font-kr-serif);  /* 명조체로 변경 */
}
```

Google Fonts에서 원하는 폰트를 찾아 `index.html`에 추가:
```html
<link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet" />
```

### 색상 변경

```css
.splash-text.line1 {
  color: var(--text-primary);  /* 첫 번째 줄 색상 */
}

.splash-text.line2 {
  color: var(--text-secondary);  /* 두 번째 줄 색상 */
}
```

### 배경 이미지 변경

현재는 메인 사진을 배경으로 사용하고 그 위에 반투명 오버레이가 있습니다:

```css
.splash-screen {
  background-image: url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80');
  background-size: cover;
  background-position: center;
}
```

**자신의 이미지로 변경:**
```css
.splash-screen {
  background-image: url('/images/main/cover.jpg');
  /* 또는 */
  background-image: url('https://example.com/your-image.jpg');
}
```

**배경 위치 조절:**
```css
background-position: center;    /* 중앙 */
background-position: top;       /* 상단 */
background-position: bottom;    /* 하단 */
background-position: center 30%;  /* 세밀한 조절 */
```

### 오버레이 투명도 조절

메인 사진 위에 올라가는 반투명 레이어:

```css
.splash-screen::before {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.85) 0%,    /* 85% 불투명 */
    rgba(232, 245, 233, 0.80) 50%,   /* 80% 불투명 */
    rgba(255, 255, 255, 0.85) 100%
  );
}
```

**더 투명하게 (메인 사진이 더 잘 보임):**
```css
rgba(255, 255, 255, 0.70)  /* 70% 불투명 */
rgba(232, 245, 233, 0.65)  /* 65% 불투명 */
```

**더 불투명하게 (메인 사진이 덜 보임):**
```css
rgba(255, 255, 255, 0.95)  /* 95% 불투명 */
rgba(232, 245, 233, 0.90)  /* 90% 불투명 */
```

**오버레이 색상 변경:**
```css
/* 어두운 오버레이 */
.splash-screen::before {
  background: rgba(0, 0, 0, 0.5);  /* 검정 50% */
}

/* 단색 오버레이 */
.splash-screen::before {
  background: rgba(232, 245, 233, 0.85);  /* 연두색만 */
}
```

**오버레이 제거 (이미지만 보임):**
```css
.splash-screen::before {
  display: none;
}
```

### 펜 커서 색상 변경

```css
.splash-text.line1::before {
  background: radial-gradient(circle, var(--primary-color) 40%, transparent 70%);
  /* var(--primary-color)를 원하는 색상으로 변경 */
  /* 예: */
  background: radial-gradient(circle, #4a7c4e 40%, transparent 70%);
}
```

### 펜 커서 크기 변경

```css
.splash-text.line1::before {
  width: 20px;   /* 너비 */
  height: 20px;  /* 높이 */
}
```

## 스플래시 스크린 비활성화

스플래시 스크린을 사용하지 않으려면 `src/App.tsx`에서:

### 방법 1: 초기 상태를 false로 설정

```typescript
const [showSplash, setShowSplash] = useState(false);  // true → false
```

### 방법 2: 조건부 렌더링 제거

```typescript
return (
  <>
    {/* {showSplash && <SplashScreen onFinish={handleSplashFinish} />} */}
    
    <div className="App">
      {/* ... */}
    </div>
  </>
);
```

## 반투명 효과 커스터마이징

### 컨텐츠 박스 투명도 조절

글씨가 있는 박스의 투명도를 변경:

```css
.splash-content {
  background: rgba(255, 255, 255, 0.7);  /* 70% 불투명 */
  backdrop-filter: blur(4px);
}

/* 더 투명하게 */
.splash-content {
  background: rgba(255, 255, 255, 0.5);  /* 50% 불투명 */
}

/* 완전 투명 (박스 없음) */
.splash-content {
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
}
```

### 박스 디자인 변경

```css
.splash-content {
  border-radius: 20px;  /* 모서리 둥글기 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);  /* 그림자 */
  padding: 40px;  /* 내부 여백 */
}
```

## 고급 설정

### 3줄 이상 사용하기

`src/components/SplashScreen.tsx`를 수정:

```typescript
const splashConfig = {
  line1: '첫 번째 줄',
  line2: '두 번째 줄',
  line3: '세 번째 줄',  // 추가
  duration: 4000,
};

return (
  <div className="splash-screen">
    <div className="splash-content">
      <h1 className="splash-text line1">{splashConfig.line1}</h1>
      <p className="splash-text line2">{splashConfig.line2}</p>
      <p className="splash-text line3">{splashConfig.line3}</p> {/* 추가 */}
    </div>
  </div>
);
```

CSS에도 추가:

```css
.splash-text.line3 {
  font-family: var(--font-kr);
  font-size: 1rem;
  color: var(--text-light);
  animation: fadeIn 0.8s ease-out 2.5s forwards;
}
```

### 이미지 추가

```typescript
return (
  <div className="splash-screen">
    <div className="splash-content">
      <img src="/logo.png" alt="Logo" className="splash-logo" />
      <h1 className="splash-text line1">{splashConfig.line1}</h1>
      <p className="splash-text line2">{splashConfig.line2}</p>
    </div>
  </div>
);
```

CSS:

```css
.splash-logo {
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}
```

### "Skip" 버튼 추가

```typescript
const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // ... 기존 코드 ...

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onFinish, 100);
  };

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <h1 className="splash-text line1">{splashConfig.line1}</h1>
        <p className="splash-text line2">{splashConfig.line2}</p>
        <button className="splash-skip-btn" onClick={handleSkip}>
          Skip
        </button>
      </div>
    </div>
  );
};
```

CSS:

```css
.splash-skip-btn {
  position: absolute;
  bottom: 40px;
  right: 40px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 20px;
  cursor: pointer;
  opacity: 0;
  animation: fadeIn 0.5s ease-out 1s forwards;
}

.splash-skip-btn:hover {
  background: var(--primary-color);
  color: white;
}
```

## 반응형 설정

모바일에서 글씨 크기를 조절하려면 이미 적용된 미디어 쿼리를 수정:

```css
@media (max-width: 768px) {
  .splash-text.line1 {
    font-size: 2rem;  /* 태블릿 */
  }
}

@media (max-width: 480px) {
  .splash-text.line1 {
    font-size: 1.7rem;  /* 모바일 */
  }
  
  .splash-text.line2 {
    font-size: 1rem;
  }
}
```

## 문제 해결

### 쓰기 효과가 너무 빠르거나 느린 경우

애니메이션 시간을 조정:

```css
.splash-text.line1 {
  animation: handwriting 2.5s ease-in-out 0.5s forwards;  /* 2s → 2.5s */
}

/* 펜 커서도 함께 조정 */
.splash-text.line1::before {
  animation: penCursor 2.5s ease-in-out 0.5s;  /* 2s → 2.5s */
}
```

### 글씨가 잘려보이는 경우

`clip-path` 범위를 조정:

```css
@keyframes handwriting {
  100% {
    clip-path: polygon(0 0, 105% 0, 105% 100%, 0 100%);  /* 100% → 105% */
  }
}
```

### 두 번째 줄이 너무 빨리/늦게 나타나는 경우

지연 시간을 조정:

```css
.splash-text.line2 {
  /* 2.3s → 쓰기 완료 후 바로 */
  /* 2.8s → 0.5초 추가 지연 */
  animation: fadeInUp 0.8s ease-out 2.3s forwards;
}
```

### 스플래시가 너무 빨리 사라지는 경우

`duration` 값을 증가:

```typescript
const splashConfig = {
  line1: '이동진 ♥ 이예인',
  line2: '2026년 1월 25일',
  duration: 4500,  // 3500 → 4500으로 증가
};
```

## 테스트

변경 후 테스트:

```bash
npm run dev
```

브라우저를 새로고침하여 스플래시 스크린 확인. 캐시 때문에 변경사항이 보이지 않으면 `Ctrl+Shift+R` (또는 `Cmd+Shift+R`)로 하드 리프레시.

## 연필 효과를 타자기 효과로 변경하기

연필 효과 대신 타자기 효과를 원한다면:

1. `src/styles/SplashScreen.css` 수정:

```css
.splash-text.line1 {
  font-family: var(--font-kr-serif);
  animation: typewriter 1.5s steps(20) 0.5s forwards;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid var(--primary-color);
}

@keyframes typewriter {
  0% { width: 0; }
  100% { 
    width: 100%;
    border-right-color: transparent;
  }
}

/* ::before 제거 */
.splash-text.line1::before {
  display: none;
}
```

2. 폰트를 일반체로 변경하고 `steps()` 값을 글자 수에 맞게 조정

## 참고 사항

- 스플래시 스크린은 페이지당 1회만 표시됩니다
- 너무 긴 문구는 모바일에서 잘릴 수 있으니 간결하게 작성 (10~15자 권장)
- 연필 쓰기 효과는 첫 번째 줄에만 적용됩니다
- 이모지(♥, 💕 등)도 사용 가능합니다
- 필기체 폰트는 한글에 최적화되어 있습니다

