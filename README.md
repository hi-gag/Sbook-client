# 스북 클라이언트

## 스택

- Next(12.1.4)
- tailwind css
- antd

## 설치 및 개발

### clone

```shell
# 로컬 디렉토리에 클론해주세여
cd 적당한디렉토리
git clone https://github.com/hi-gag/Sbook-client
```

### install

*npm말고 yarn(v1.2.X)을 사용해주세요

```shell
# 로컬 디렉토리에 클론해주세여
cd 클론디렉토리
yarn install
yarn dev # 개발 모드
```

## 유의사항

- Next의 라우팅, default 컴포넌트, 서버 렌더링(getServerSideProps)에 대한 학습이 필요합니닷 [Docs](https://nextjs.org/)를 살펴봐주셔요
- prettier, eslint가 미리 설정되어 있으니 에디터에서 formatonsave 기능을 켜주세요
- 가급적 모든 컴포넌트에 Proptype을 사용해서 타입을 지정해주세요(타입스크립트를 사용하지 않으므로)
- main에 직접 커밋하지 말고, 피처 브랜치를 파서 그 위에 작업해주세용. 매주 작업 상황을 체크하면서 뭘 합칠지 같이 결정합니다
```shell
git switch -c "feat/[브랜치-이름]"
git add ~
git commit ~
git push origin ~
```
- component에 fundamental 이라는 디렉토리는 디자인에 입각해서 사용할 수 있는 기본 요소들을 먼저 정의해놓은 디렉토리입니다. antd 컴포넌트를 쓰기 전에 여기서 컴포넌트를 먼저 사용할 수 
  없는지 타진해주세요.
- 가시성을 보장하기 위해 Antd의 태그(Typography, Space), 시맨틱 태그를 사용해주세용
