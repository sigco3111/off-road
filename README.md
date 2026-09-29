# 🚙 오프 로드 (Off-Road)

> **Three.js + Rapier3D 기반 3D 물류 시뮬레이션** — 차량 물리, 설정 가능한 에셋, 씬 편집, 인터랙티브 화물 적재·하역 메커니즘을 갖춘 진행 중(WIP) 프로젝트.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://sigco3111.github.io/off-road/)
[![Three.js](https://img.shields.io/badge/Three.js-r180-black?logo=three.js)](https://threejs.org/)
[![Rapier3D](https://img.shields.io/badge/Rapier3D-0.19-orange)](https://rapier.rs/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

원본 프로젝트: [PabloMesquida/off-road](https://github.com/PabloMesquida/off-road) · 원본 데모: <https://off-road.vercel.app>

## 📑 목차

- [🎮 데모](#-데모)
- [✨ 주요 기능](#-주요-기능)
- [🎯 조작법](#-조작법)
- [🧰 기술 스택](#-기술-스택)
- [📂 프로젝트 구조](#-프로젝트-구조)
- [🚀 시작하기](#-시작하기)
- [🛠️ 개발](#️-개발)
- [🌐 배포](#-배포)
- [🪪 한글화](#-한글화)
- [📝 업데이트 로그](#-업데이트-로그)
- [🤝 크레딧](#-크레딧)
- [📜 라이선스](#-라이선스)

## 🎮 데모

🔗 **라이브 데모**: <https://sigco3111.github.io/off-road/>

## ✨ 주요 기능

### 🚗 차량 물리
- **Rapier3D** 기반 사실적인 차량 동역학
- 차체(Chassis)와 휠(Wheel) 분리 모델
- 프론트 / 브레이크 / 미등 / 후진등 / 비상등 라이트 시스템
- 후방 브레이크는 진행 방향에 따라 가변적인 힘 적용
- 스티어링(조향) 미세조정 가능

### 🧱 에셋 시스템
- 콘, 배럴, 경사로, 과속방지턱, 콘크리트 방호벽, 타이어
- 전방 / 정지 / 주의 / 진입금지 표지판
- **화물 구역(Cargo Zone)** — 화물 적재·하역 인터랙션
- 에셋 정렬 / 이동 / 회전 / 삭제가 가능한 편집 모드

### 🛠️ 씬 편집기
- **Tweakpane** 기반 실시간 디버그 패널
- 카메라 모드(확대 보기) 전환
- 바닥 그리드 프리셋(어두운 / 대비 / 기본 / 청사진 / 레트로 / 네온 / 펑키)
- 바닥 재질 한도(Limits) 조정
- 에셋 배치 후 **설정 저장** → 새로 고침 후에도 유지

### 🎨 렌더링 & 그래픽
- **Three.js r180** (WebGL2)
- 절차적 바닥 / 그리드 머티리얼 (`tsl-textures` 활용)
- 차량용 5종 머티리얼(페인트 / 메탈 / 글래스 / 라이트 / 우드)
- 환경 맵 큐브맵 → 사실적인 반사
- `stats-gl` 기반 프레임 통계 노출

### 🎬 녹화
- `MediaRecorder` 기반 화면 캡처 (`.webm`)
- 로컬호스트에서만 노출되는 `🎬 녹화` 버튼

## 🎯 조작법

### 운전
| 키 | 동작 |
|---|---|
| `W` / `↑` | 전진 |
| `S` / `↓` | 후진 |
| `A` / `←` | 좌회전 |
| `D` / `→` | 우회전 |
| `Space` | 브레이크 |
| `B` | 비상등 |
| `L` | 라이트 |

### 편집
| 키 | 동작 |
|---|---|
| `X` | 선택한 에셋 삭제 |

> 좌측 상단의 **운전 조작** / **편집 조작** 카드에서 빠르게 확인할 수 있습니다.

## 🧰 기술 스택

| 영역 | 라이브러리 |
|---|---|
| 렌더링 | [`three`](https://www.npmjs.com/package/three) `^0.180.0` |
| 물리 | [`@dimforge/rapier3d-compat`](https://www.npmjs.com/package/@dimforge/rapier3d-compat) `^0.19.0` (WASM) |
| 디버그 UI | [`tweakpane`](https://www.npmjs.com/package/tweakpane) `^4.0.5` |
| 절차적 텍스처 | [`tsl-textures`](https://www.npmjs.com/package/tsl-textures) `^2.4.0` |
| 통계 | [`stats-gl`](https://www.npmjs.com/package/stats-gl) `^3.6.0` |
| 빌드 | [`vite`](https://vitejs.dev/) `^7.1.2` + [`vite-plugin-wasm`](https://www.npmjs.com/package/vite-plugin-wasm) + [`vite-plugin-top-level-await`](https://www.npmjs.com/package/vite-plugin-top-level-await) |

## 📂 프로젝트 구조

```
off-road/
├─ .github/workflows/    # GitHub Pages 배포 워크플로
├─ public/               # 정적 에셋 (모델, 텍스처, 환경맵)
│  ├─ models/            # GLB 차량 / 휠 / 에셋
│  └─ textures/          # 환경맵 큐브맵
├─ src/
│  ├─ main.js            # 엔트리포인트
│  ├─ sources.js         # 에셋 경로 매니페스트
│  ├─ style.css          # UI 스타일
│  ├─ core/              # 게임 루프, 리소스, 뷰포트, 이벤트
│  ├─ engine/
│  │  ├─ inputs/         # 키보드 입력 매핑
│  │  ├─ physics/        # Rapier3D 래퍼 + 디버그
│  │  ├─ rendering/      # WebGL 렌더링
│  │  └─ view/           # 카메라 / 뷰포트
│  ├─ editor/
│  │  ├─ UI/             # Tweakpane 디버그 UI
│  │  ├─ controllers/    # 에셋 인터랙션 / 배치 / 편집 컨트롤러
│  │  └─ gizmos/         # 트랜스폼 기즈모
│  ├─ gameplay/world/
│  │  ├─ assets/         # 에셋 정의 / 레지스트리 / 머티리얼 / 매니저
│  │  ├─ environment/    # 환경 설정
│  │  ├─ floor/          # 바닥 + 그리드
│  │  ├─ systems/        # 에셋 / 화물 드래그 / 편집 / 차량 시스템
│  │  ├─ vehicle/        # 섀시 / 차량 / 휠 / 컨트롤러 / 비주얼
│  │  └─ zones/          # 화물 구역
│  └─ graphics/materials/ # 절차적 / 차량용 머티리얼
├─ index.html            # 단일 진입 HTML
├─ vite.config.js        # Vite + WASM 설정
└─ package.json
```

## 🚀 시작하기

### 사전 요구사항

- **Node.js 18 이상** (Vite 7 요구사항)
- **npm 9 이상**

### 설치

```bash
git clone https://github.com/sigco3111/off-road.git
cd off-road
npm install
```

### 로컬 실행

```bash
npm run dev
```

기본적으로 `http://localhost:5173`에서 호스팅됩니다. `--host` 옵션이 활성화되어 있어 네트워크 상의 다른 기기에서도 접속 가능합니다.

### 프로덕션 빌드

```bash
npm run build
```

산출물은 `dist/`에 생성됩니다. 미리 보려면:

```bash
npm run preview
```

## 🛠️ 개발

### 코드 컨벤션

- **모듈 시스템**: ES Modules (`type: module`)
- **포매팅**: 들여쓰기 2칸, 세미콜론 사용
- **구조**: 클래스 기반 단일 책임 (각 시스템은 `src/.../systems` 또는 `controllers`에 위치)

### 새 에셋 추가 절차

1. `public/models/Assets/<Name>/` 에 GLB 모델 배치
2. `src/sources.js`에 `{ name: '<key>Model', type: 'gltfModel', path: '...' }` 추가
3. `src/gameplay/world/assets/assetsConfig.js`에 `{ key, resourcePathName, assetType }` 등록
4. `src/gameplay/world/assets/AssetDefinitions.js`에 물리 정의 작성
5. `src/editor/UI/TweakpaneUI.js`의 적절한 폴더에 `makePlaceBtn(...)` 호출 추가
6. 필요 시 `AssetMaterialResolver.js`에 머티리얼 매핑 추가

## 🌐 배포

이 저장소는 **GitHub Pages**로 자동 배포됩니다.

- 워크플로: `.github/workflows/deploy.yml`
- 트리거: `main` 브랜치 push 또는 수동 실행(`workflow_dispatch`)
- 서빙 경로: `/<repo-name>/` (즉, <https://sigco3111.github.io/off-road/>)
- 빌드 출력: `dist/`

다른 경로(Vercel, 자체 호스팅 등)에 배포하려면 환경 변수로 베이스 경로를 덮어쓸 수 있습니다:

```bash
VITE_BASE=/ npm run build
```

## 🪪 한글화

- 사용자 노출 텍스트(HTML, Tweakpane 라벨, 옵션)를 **일관되게 한국어**로 제공합니다.
- HTML 의 `lang` 속성은 `ko`로 설정되어 있습니다.
- 식별자(클래스명, 메서드명, 에셋 `key`, 물리 `type` 등 **코드 상의 이름**)는 원본 그대로 유지하여 향후 업스트림 머지 시 충돌을 피했습니다.
- README 본문과 `summary` / `description` 메타데이터도 한국어로 작성되었습니다.

## 📝 업데이트 로그

원본 저장소 [LOG](https://github.com/PabloMesquida/off-road) 섹션을 한국어로 옮긴 것입니다.

| 주차 | 작업 |
|---|---|
| 최근 | 화물 구역을 에셋으로 설정할 수 있도록 개선 |
| | 화물 적재·하역 구역 추가 |
| | 픽업 트럭(캠페인)의 콜라이더 업데이트 |
| | 여러 에셋의 콜라이더 조정 |
| | 편집 모드의 여러 부분 재구현 |
| | 에셋 설정을 저장할 수 있도록 개선 |
| | 새 에셋 몇 가지 추가 |
| | 스폰 버그를 오랜 시간 끝에 해결 |
| | 편집 패널이 다양한 에셋을 지원하도록 준비 완료 |
| | 편집 패널 추가 |
| | 첫 번째 오브젝트 추가 |
| | 바닥 머티리얼에 그리드 추가 |
| | 스티어링 조정을 거친 후 기본 기능 완료 |
| | Blender에서 Ambient Occlusion을 내보냄 — 더 마음에 듦 |
| | 후방 브레이크가 진행 방향에 따라 다른 힘을 적용 |
| | 라이트 시스템 OK: 프론트 / 브레이크 / 비상등 / 후진등 |
| | 모델 머티리얼이 현재 보기 좋음 |
| | 리토폴로지 진행 |
| | Three.js 도입 |
| 시작 | 1971년 Rastrojero 차량 모델 작업 시작 |

원작자의 작업 기록(LinkedIn 링크 포함):

- [화물 구역을 에셋으로 설정할 수 있도록 개선](https://lnkd.in/p/eUrPireM)
- [화물 적재·하역 구역 추가](https://lnkd.in/p/eYM3fzCD)
- [픽업 트럭의 콜라이더 업데이트](https://lnkd.in/p/e7fjGYbR)
- [여러 에셋의 콜라이더 조정](https://lnkd.in/p/eWsp5HWR)
- [편집 모드의 여러 부분 재구현](https://lnkd.in/p/eQffnqnj)
- [에셋 설정을 저장할 수 있도록 개선](https://lnkd.in/p/e9QD4NtY)
- [새 에셋 추가](https://lnkd.in/p/eC4ShNFj)
- [스폰 버그 해결](https://lnkd.in/p/eNRbxW8g)
- [편집 패널이 다양한 에셋 지원](https://lnkd.in/p/ev9hzkyS)
- [편집 패널 추가](https://www.linkedin.com/posts/pablomesquida_wip-threejs-activity-7391169492497813504-8gWH)
- [첫 번째 오브젝트 추가](https://www.linkedin.com/posts/pablomesquida_wip-threejs-activity-7389723248130936832-6F7I)
- [바닥 머티리얼에 그리드 추가](https://www.linkedin.com/posts/pablomesquida_wip-threejs-activity-7388552558438428672-jniF)
- [스티어링 조정 → 기본 기능 완료](https://www.linkedin.com/posts/pablomesquida_wip-threejs-activity-7387445684435611648-1iiv)
- [Blender에서 Ambient Occlusion 내보내기](https://www.linkedin.com/posts/pablomesquida_wip-activity-7387163282178052096--p3i)
- [후방 브레이크 — 방향별 가변 힘](https://www.linkedin.com/posts/pablomesquida_wip-activity-7386715785370611713-OTaB)
- [라이트 시스템 OK (프론트 / 브레이크 / 비상등 / 후진등)](https://www.linkedin.com/posts/pablomesquida_el-sistema-de-luces-ok-frontales-freno-activity-7386324000295235584-P8mp)
- [모델 머티리얼 점검](https://www.linkedin.com/posts/pablomesquida_threejs-activity-7385956171595206656-WnrN)
- [리토폴로지](https://www.linkedin.com/posts/pablomesquida_blender-activity-7383448908913590272-gpj7)
- [Three.js 도입](https://www.linkedin.com/posts/pablomesquida_threejs-activity-7382323048814886912-Gkg8)
- [Rastrojero 1971 시작](https://www.linkedin.com/posts/pablomesquida_blender-activity-7381596435009396736-HRWl)

![Off-Road 시뮬레이션 미리보기](https://media.licdn.com/dms/image/v2/D4D22AQEbdUOJECXZBA/feedshare-shrink_800/B4DZrfZJdXKQAo-/0/1764684503062?e=1787788800&v=beta&t=qc7gtF3DGt0PBH3MXf--2KLJU9-D6RdnTFlESIzUMGM)

## 🤝 크레딧

이 한글화 포크는 다음 프로젝트에 기반합니다.

- **원작자**: [Pablo Mesquida](https://github.com/PabloMesquida) — [@PabloMesquida](https://github.com/PabloMesquida)
- **원본 저장소**: <https://github.com/PabloMesquida/off-road>
- **원본 라이브 데모**: <https://off-road.vercel.app>

한글화 및 GitHub Pages 배포 자동화: [sigco3111](https://github.com/sigco3111)

### 사용된 오픈소스 라이브러리

- [Three.js](https://threejs.org/) — MIT
- [Rapier3D](https://rapier.rs/) — Apache-2.0
- [Tweakpane](https://tweakpane.github.io/) — MIT
- [tsl-textures](https://github.com/boytchev/tsl-textures) — MIT
- [stats-gl](https://github.com/uber-common/stats-gl) — MIT
- [Vite](https://vitejs.dev/) — MIT

## 📜 라이선스

원본 저장소가 명시한 라이선스를 그대로 따릅니다. 자세한 내용은 원본 저장소의 `LICENSE` 파일을 확인해 주세요. 명시되지 않은 경우 저장소 작성자에게 문의하시기 바랍니다.