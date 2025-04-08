# 학교 투표 시스템

React와 Node.js를 사용한 익명 투표 웹 애플리케이션입니다.

## 주요 기능

- 관리자 페이지에서 투표 주제 생성 및 최대 투표 인원 설정
- 학생들을 위한 익명 투표 페이지
- 투표 결과 실시간 확인
- 중복 투표 방지 기능

## 기술 스택

### 프론트엔드
- React
- Material-UI
- React Router
- Axios

### 백엔드
- Node.js
- Express
- MongoDB
- Mongoose

## 설치 및 실행

### 백엔드

```bash
cd backend
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 수정하여 MongoDB 연결 정보 입력

npm start
```

### 프론트엔드

```bash
cd frontend
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 수정하여 백엔드 API URL 입력

npm start
```

## 배포

이 프로젝트는 Cloudtype을 사용하여 배포할 수 있습니다. 자세한 배포 방법은 각 디렉토리의 README를 참조해주세요. 