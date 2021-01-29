# bluemarvel 

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Run your end-to-end tests

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

- eslint 설정 변경
  - quotes, no-tabs, indent rule 추가
- prettier 설정 추가 및 eslint에 적용
- postcss config 우선 추가
- App 컴포넌트의 nav 영역을 컴포넌트로 분리
- router, store 설정
  - 부루마블에 대한 store module 추가
	- `/` 페이지에 부루마블 컴포넌트를 렌더링 하도록 추가
- unit 테스트 파일 비우기