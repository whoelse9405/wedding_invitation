# 🚀 배포 가이드

이 문서는 결혼 청첩장 웹사이트를 GitHub Pages에 배포하는 방법을 상세히 안내합니다.

## 목차

1. [빠른 시작](#-빠른-시작)
2. [GitHub Pages 배포](#-github-pages-배포)
3. [커스텀 도메인 설정](#-커스텀-도메인-설정)
4. [문제 해결](#-문제-해결)
5. [다른 호스팅 서비스](#-다른-호스팅-서비스)

## 🏃 빠른 시작

```bash
# 1. 저장소 클론 (이미 했다면 생략)
git clone git@github.com:whoelse9405/wedding_invitation_code.git
cd wedding_invitation_code

# 2. 의존성 설치
npm install

# 3. 로컬에서 테스트
npm run dev

# 4. 빌드 테스트
npm run build
npm run preview

# 5. GitHub에 푸시 (자동 배포)
git add .
git commit -m "Update wedding invitation"
git push origin main
```

## 📦 GitHub Pages 배포

### 방법 1: GitHub Actions (추천)

이 저장소는 이미 GitHub Actions로 자동 배포가 설정되어 있습니다.

#### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 **+** → **New repository** 클릭
3. 저장소 정보 입력:
   - Repository name: `wedding-invitation` (원하는 이름)
   - Description: `My wedding invitation website`
   - Public 또는 Private 선택
   - **"Initialize this repository with a README" 체크 해제** (중요!)
4. **Create repository** 클릭

#### 2단계: 로컬 코드를 GitHub에 푸시

**이미 git이 초기화되어 있는 경우:**
```bash
# 현재 origin 확인
git remote -v

# origin 변경 (본인의 저장소로)
git remote set-url origin git@github.com:YOUR_USERNAME/wedding-invitation.git

# 푸시
git push origin main
```

**git이 초기화되어 있지 않은 경우:**
```bash
# Git 초기화
git init

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Wedding invitation website"

# 원격 저장소 연결 (SSH 권장)
git remote add origin git@github.com:YOUR_USERNAME/wedding-invitation.git

# 푸시
git branch -M main
git push -u origin main
```

#### 3단계: GitHub Actions 설정

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 좌측 메뉴에서 **Pages** 클릭
4. **Source** 설정:
   - **GitHub Actions** 선택 (추천)
5. 저장

#### 4단계: 자동 배포 확인

1. **Actions** 탭으로 이동
2. 배포 워크플로우 진행 상황 확인
3. ✅ 초록색 체크마크가 나타나면 배포 완료
4. 배포된 사이트 접속:
   ```
   https://YOUR_USERNAME.github.io/wedding-invitation/
   ```

### 방법 2: 수동 배포 (gh-pages)

GitHub Actions를 사용하지 않고 수동으로 배포하려면:

#### 1단계: gh-pages 설치 확인

`package.json`을 확인하여 `gh-pages`가 설치되어 있는지 확인:
```bash
npm list gh-pages
```

없다면 설치:
```bash
npm install --save-dev gh-pages
```

#### 2단계: package.json 스크립트 확인

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### 3단계: 배포 실행

```bash
npm run deploy
```

#### 4단계: GitHub Pages 설정

1. GitHub 저장소 → **Settings** → **Pages**
2. **Source** 설정:
   - **Deploy from a branch** 선택
   - Branch: **gh-pages** 선택, 폴더: **/ (root)** 선택
3. **Save** 클릭

#### 5단계: 배포 확인

몇 분 후 다음 URL에서 확인:
```
https://YOUR_USERNAME.github.io/wedding-invitation/
```

## ⚙️ 배포 설정

### vite.config.ts 설정

저장소 이름에 맞게 `base` 설정을 변경하세요:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/wedding-invitation/',  // 저장소 이름으로 변경
})
```

**주의사항:**
- 저장소 이름이 `my-wedding`이면 → `base: '/my-wedding/'`
- 양쪽에 슬래시(`/`) 필수!
- 커스텀 도메인을 사용하면 → `base: '/'`

### GitHub Actions 워크플로우

`.github/workflows/deploy.yml` 파일이 자동 배포를 담당합니다:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: dist
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```

## 🌐 커스텀 도메인 설정

자신의 도메인(예: `wedding.mydomain.com`)을 사용하고 싶다면:

### 1단계: CNAME 파일 생성

`public/CNAME` 파일을 생성하고 도메인을 입력:

```
wedding.mydomain.com
```

### 2단계: DNS 설정

도메인 등록 업체(가비아, 후이즈, Cloudflare 등)에서 DNS 설정:

**방법 A: CNAME 레코드 (추천)**
```
Type: CNAME
Name: wedding
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**방법 B: A 레코드**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
TTL: 3600
```

### 3단계: GitHub Pages에서 도메인 설정

1. GitHub 저장소 → **Settings** → **Pages**
2. **Custom domain** 섹션에 도메인 입력
3. **Save** 클릭
4. **Enforce HTTPS** 체크 (HTTPS 인증서 자동 발급)

### 4단계: vite.config.ts 수정

커스텀 도메인 사용 시:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/',  // 루트 경로로 변경
})
```

### 5단계: 배포 및 확인

```bash
git add public/CNAME vite.config.ts
git commit -m "Add custom domain"
git push origin main
```

DNS 전파에는 최대 48시간이 걸릴 수 있습니다.

## 🐛 문제 해결

### 1. 페이지가 표시되지 않을 때 (404 에러)

**원인**: `vite.config.ts`의 `base` 설정 오류

**해결방법:**
```typescript
// 저장소 이름이 wedding-invitation인 경우
export default defineConfig({
  base: '/wedding-invitation/',  // 정확히 일치해야 함
})
```

빌드 후 다시 푸시:
```bash
npm run build
git add .
git commit -m "Fix base path"
git push origin main
```

### 2. 이미지가 표시되지 않을 때

**원인 1**: 이미지 경로 오류

```typescript
// ❌ 잘못된 경로
<img src="images/cover.jpg" />

// ✅ 올바른 경로
<img src="/images/cover.jpg" />  // 맨 앞에 /
```

**원인 2**: 이미지 파일이 빌드에 포함되지 않음

- `public/images/` 폴더에 이미지가 있는지 확인
- `dist/images/` 폴더에 이미지가 복사되었는지 확인

```bash
npm run build
ls -la dist/images/
```

### 3. CSS 스타일이 적용되지 않을 때

**원인**: 빌드 캐시 문제

**해결방법:**
```bash
# 빌드 폴더 삭제
rm -rf dist

# 재빌드
npm run build

# 푸시
git add .
git commit -m "Rebuild"
git push origin main
```

### 4. GitHub Actions가 실패할 때

**원인 1**: Node 버전 불일치

`.github/workflows/deploy.yml`:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '18'  # 18 이상 권장
```

**원인 2**: 의존성 설치 오류

로컬에서 테스트:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**원인 3**: GitHub Pages 권한 문제

1. 저장소 → **Settings** → **Actions** → **General**
2. **Workflow permissions**에서:
   - **Read and write permissions** 선택
3. **Save** 클릭

### 5. 카카오맵이 표시되지 않을 때

**원인**: 도메인 미등록

1. [Kakao Developers](https://developers.kakao.com) 접속
2. 애플리케이션 선택
3. **플랫폼** → **Web** → **사이트 도메인** 추가:
   ```
   http://localhost:5173
   https://YOUR_USERNAME.github.io
   ```

### 6. 배경 음악이 재생되지 않을 때

**원인**: 브라우저의 자동 재생 정책

- 사용자 상호작용 후에만 재생 가능
- 음소거 상태로 시작 후 사용자가 활성화하도록 구현

자세한 내용은 [MUSIC_GUIDE.md](./MUSIC_GUIDE.md) 참고

## 🔄 업데이트 방법

### 내용 수정 후 재배포

```bash
# 1. 파일 수정 (이미지, 텍스트 등)

# 2. 로컬에서 확인
npm run dev

# 3. 빌드 테스트
npm run build
npm run preview

# 4. 커밋 & 푸시 (자동 배포)
git add .
git commit -m "Update content"
git push origin main

# 5. GitHub Actions에서 배포 진행 확인
# https://github.com/YOUR_USERNAME/wedding-invitation/actions
```

### 긴급 수정

```bash
# 빠른 수정 & 배포
git add .
git commit -m "Hotfix: ..."
git push origin main
```

보통 2-3분 내에 배포 완료됩니다.

## 🌟 다른 호스팅 서비스

### Vercel (추천)

**장점:**
- 무료
- 자동 배포
- 빠른 CDN
- 커스텀 도메인 무료
- 자동 HTTPS

**배포 방법:**
1. [Vercel](https://vercel.com) 가입
2. **New Project** 클릭
3. GitHub 저장소 연결
4. 자동 배포 완료

### Netlify

**장점:**
- 무료
- 자동 배포  
- 폼 처리 기능
- 서버리스 함수

**배포 방법:**
1. [Netlify](https://netlify.com) 가입
2. **New site from Git** 클릭
3. GitHub 저장소 연결
4. Build command: `npm run build`
5. Publish directory: `dist`

### Cloudflare Pages

**장점:**
- 무료
- 빠른 CDN
- 무제한 대역폭

**배포 방법:**
1. [Cloudflare Pages](https://pages.cloudflare.com) 가입
2. **Create a project** 클릭
3. GitHub 저장소 연결
4. Build command: `npm run build`
5. Build output: `dist`

## 📊 배포 체크리스트

### 배포 전
- [ ] 로컬에서 테스트 완료 (`npm run dev`)
- [ ] 빌드 테스트 완료 (`npm run build`)
- [ ] 미리보기 확인 (`npm run preview`)
- [ ] 모든 이미지 경로 확인
- [ ] 모바일에서 테스트
- [ ] 개인정보 확인 (이름, 연락처, 계좌번호)
- [ ] `vite.config.ts`의 `base` 설정 확인

### 배포 후
- [ ] 실제 URL에서 접속 확인
- [ ] 모든 링크 동작 확인 (전화, 지도 등)
- [ ] 이미지 로딩 확인
- [ ] 카카오톡 공유 테스트
- [ ] 모바일 브라우저에서 확인
- [ ] 다양한 기기에서 테스트

## 💡 베스트 프랙티스

### 성능 최적화
- 이미지 최적화 (1MB 이하)
- Lazy loading 활용
- 불필요한 의존성 제거

### SEO
`index.html`:
```html
<head>
  <title>신랑♥신부 결혼합니다</title>
  <meta name="description" content="2026년 1월 25일, 신랑과 신부의 결혼식에 초대합니다" />
  <meta property="og:title" content="신랑♥신부 결혼합니다" />
  <meta property="og:description" content="2026년 1월 25일 오후 2시 30분" />
  <meta property="og:image" content="/images/main/cover.jpg" />
</head>
```

### 보안
- 개인 정보 주의
- API 키 노출 주의
- `.env` 파일 사용 권장

## 📞 도움말

### 관련 문서
- [README.md](./README.md) - 프로젝트 개요
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - 커스터마이징
- [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md) - 애니메이션
- [KAKAO_MAP_GUIDE.md](./KAKAO_MAP_GUIDE.md) - 카카오맵
- [MUSIC_GUIDE.md](./MUSIC_GUIDE.md) - 배경음악

### 문의
- GitHub Issues: 버그 리포트
- GitHub Discussions: 질문 및 토론

---

**🎉 배포 성공을 기원합니다!**
