# 배경음악 추가 가이드

## 음악 파일 준비

1. MP3 형식의 음악 파일을 준비합니다.
2. 파일 이름을 `bgm.mp3`로 변경합니다.
3. `public` 폴더에 `bgm.mp3` 파일을 복사합니다.

## 파일 위치

```
wedding_invitation_code/
├── public/
│   └── bgm.mp3  <-- 여기에 음악 파일 추가
├── src/
└── ...
```

## 음악 설정

### 볼륨 조절

볼륨은 기본적으로 50%로 설정되어 있습니다. 
볼륨을 변경하려면 `src/App.tsx` 파일에서 다음 부분을 수정하세요:

```typescript
audioRef.current.volume = 0.5; // 0.0 ~ 1.0 사이 값 (0.5 = 50%)
```

### 다른 파일명 사용

`bgm.mp3` 외의 다른 파일명을 사용하려면 `src/App.tsx`에서 수정:

```typescript
<audio ref={audioRef} loop preload="auto">
  <source src="/your-music.mp3" type="audio/mpeg" />
  브라우저가 오디오를 지원하지 않습니다.
</audio>
```

## 음악 파일 찾기

무료 로열티 프리 음악:
- **YouTube Audio Library**: https://www.youtube.com/audiolibrary
- **Incompetech**: https://incompetech.com/music/royalty-free/
- **Bensound**: https://www.bensound.com/
- **Free Music Archive**: https://freemusicarchive.org/

웨딩 음악 추천:
- Canon in D (파헬벨)
- A Thousand Years (Christina Perri)
- All of Me (John Legend)
- Perfect (Ed Sheeran)

## 브라우저 자동 재생 정책

대부분의 브라우저는 자동 재생을 차단합니다. 
현재 구현은 다음과 같이 작동합니다:

1. 페이지 로드 시 자동 재생 시도
2. 차단되면 사용자가 페이지를 첫 클릭할 때 재생
3. 우측 상단의 음악 버튼으로 재생/일시정지 제어

## 문제 해결

### 음악이 재생되지 않는 경우

1. **파일 확인**: `public/bgm.mp3` 파일이 존재하는지 확인
2. **파일 형식**: MP3 형식인지 확인
3. **파일 크기**: 너무 큰 파일은 로딩이 느릴 수 있음 (5MB 이하 권장)
4. **브라우저 콘솔**: F12를 눌러 콘솔에서 에러 메시지 확인
5. **볼륨 확인**: 브라우저 볼륨이 음소거되어 있지 않은지 확인

### 음질 개선

고음질 파일을 사용하되, 파일 크기를 줄이려면:
- 비트레이트: 128kbps ~ 192kbps 권장
- 샘플레이트: 44.1kHz 권장
- 온라인 MP3 변환기 사용 가능

## 테스트

로컬에서 테스트:
```bash
npm run dev
```

브라우저에서 확인:
1. 페이지 열기
2. 우측 상단 음악 버튼 클릭
3. 음악 재생/일시정지 확인

## 배포 시 주의사항

GitHub Pages에 배포할 때:
1. `public/bgm.mp3` 파일이 포함되어 있는지 확인
2. 빌드 후 `dist/bgm.mp3` 파일이 생성되었는지 확인
3. 배포된 사이트에서 음악이 재생되는지 확인

저작권 확인:
- 사용하는 음악에 대한 저작권을 확인하세요
- 로열티 프리 음악 사용을 권장합니다
- 개인 용도라도 저작권법을 준수해야 합니다


