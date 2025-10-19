# 스플래시 스크린 설정 가이드

## 개요

웹사이트 로딩 시 표시되는 스플래시 스크린(Splash Screen)은 연필로 글씨를 쓰는 듯한 애니메이션을 제공합니다.

## 현재 설정

기본 설정은 다음과 같습니다:

```typescript
const splashConfig = {
  line1: '이동진 ♥ 이예인',
  line2: '2026년 1월 25일',
  duration: 3500, // 3.5초
};
```

## 문구 변경 방법

### 1. 기본 설정 변경

`src/components/SplashScreen.tsx` 파일을 열고 `splashConfig` 객체를 수정하세요:

```typescript
const splashConfig = {
  line1: '원하는 첫 번째 문구',  // 큰 글씨 (타자기 효과)
  line2: '원하는 두 번째 문구',  // 작은 글씨 (페이드인 효과)
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
duration: 2000,  // 2초 (빠름)
duration: 3500,  // 3.5초 (기본)
duration: 5000,  // 5초 (느림)
```

### 타자기 속도 조절

`src/styles/SplashScreen.css`에서:

```css
.splash-text.line1 {
  animation: typewriter 1.5s steps(20) 0.5s forwards,
             fadeIn 0.3s ease-out 0.5s forwards;
}
```

- `1.5s`: 타자기 애니메이션 지속 시간 (숫자를 줄이면 빠름, 늘리면 느림)
- `steps(20)`: 타이핑 단계 수 (글자 수에 맞게 조정)
- `0.5s`: 시작 지연 시간

예시:
```css
/* 빠른 타이핑 */
animation: typewriter 1s steps(20) 0.3s forwards,
           fadeIn 0.3s ease-out 0.3s forwards;

/* 느린 타이핑 */
animation: typewriter 2.5s steps(20) 0.8s forwards,
           fadeIn 0.3s ease-out 0.8s forwards;
```

### 두 번째 줄 페이드인 타이밍

```css
.splash-text.line2 {
  animation: fadeIn 0.8s ease-out 2s forwards;
}
```

- `0.8s`: 페이드인 지속 시간
- `2s`: 시작 지연 시간 (타자기 애니메이션 후에 나타나도록)

## 스타일 커스터마이징

### 글씨 크기 변경

```css
.splash-text.line1 {
  font-size: 2.5rem;  /* 첫 번째 줄 크기 */
}

.splash-text.line2 {
  font-size: 1.3rem;  /* 두 번째 줄 크기 */
}
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

### 배경색 변경

```css
.splash-screen {
  background: linear-gradient(135deg, 
    var(--secondary-color) 0%, 
    white 50%, 
    var(--secondary-color) 100%);
}

/* 단색 배경 */
.splash-screen {
  background: white;
}

/* 그라데이션 변경 */
.splash-screen {
  background: linear-gradient(to bottom, #e8f5e9, #ffffff);
}
```

### 커서 색상 변경

```css
.splash-text.line1 {
  border-right: 3px solid var(--primary-color);  /* 커서 색상 */
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

### 타자기 효과가 끊기는 경우

`steps()` 값을 글자 수에 맞게 조정:

```css
/* 10글자 정도: steps(15) */
/* 15글자 정도: steps(20) */
/* 20글자 이상: steps(30) */

.splash-text.line1 {
  animation: typewriter 1.5s steps(30) 0.5s forwards;
}
```

### 두 번째 줄이 너무 빨리/늦게 나타나는 경우

지연 시간을 조정:

```css
.splash-text.line2 {
  /* 2s → 타자기 완료 후 바로 */
  /* 2.5s → 0.5초 지연 */
  animation: fadeIn 0.8s ease-out 2s forwards;
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

## 참고 사항

- 스플래시 스크린은 페이지당 1회만 표시됩니다
- 너무 긴 문구는 모바일에서 잘릴 수 있으니 간결하게 작성
- 타자기 효과는 첫 번째 줄에만 적용됩니다
- 이모지(♥, 💕 등)도 사용 가능합니다

