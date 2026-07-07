# vue3 + ts + nuxt(vite)

[Nuxt 공식 문서](https://nuxt.com/docs/getting-started/introduction)에서 더 자세한 내용을 확인할 수 있습니다.

## Requirements

- Node.js `v24.13.0`

## Added Modules

- **[@fullcalendar/vue3](https://fullcalendar.io/docs/vue)** (+ `core`, `daygrid`, `timegrid`, `list`, `interaction`) — 캘린더 UI 라이브러리. 샘플: `/calendar/calendar`
- **[vue3-resizable](https://www.npmjs.com/package/vue3-resizable)** — 드래그로 크기를 조절할 수 있는 `LResize` 컴포넌트 제공. 샘플: `/resizable/vue3-resizable`

## 설치

```bash
npm install
```

## 개발 서버 실행

아래 명령으로 개발 서버를 실행합니다 (`http://localhost:7004`):

```bash
npm run dev
```

## 빌드

배포용으로 빌드합니다:

```bash
npm run build
```

빌드 결과물을 로컬에서 미리 확인할 수 있습니다:

```bash
npm run preview
```

더 자세한 배포 방법은 [Nuxt 배포 문서](https://nuxt.com/docs/getting-started/deployment)를 참고하세요.
