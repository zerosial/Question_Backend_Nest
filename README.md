# 1:1 문의사항 API

이 프로젝트는 Nest, Prisma, PostgreSQL, Node.js, TypeScript를 사용하여 구현되었으며, Koyeb을 통해 배포되었습니다.

![test drawio](https://github.com/zerosial/Question_Backend_Nest/assets/97251710/f3a83077-4cb6-4477-932f-dbde5a4b3646)

## 사용 기술

- NestJS
- Prisma
- PostgreSQL
- Node.js
- TypeScript
- Koyeb (배포 플랫폼)

## Swagger 사용법 및 팁

Swagger 문서는 다음 링크에서 확인하실 수 있습니다: https://question-pineone.koyeb.app/api

ID : admin

Pass : admin01!

![chrome_Nu8Rwk1fPh](https://github.com/zerosial/Question_Backend_Nest/assets/97251710/8eea9912-42a9-4c15-ad97-efff6e585d61)


하단 DTO의 경우 body에 담는 내용을 표현하고 있습니다. (이미지와 같이 붉은 \*의 경우 필수값입니다. 기본적으로 생성시는 전체 정보가 필요하고 업데이트는 일부 정보만 있으면 됩니다.)

각 API에 사용되는 DTO의는 해당 부분 선택 시 볼 수 있습니다.

요청하는 방식은 다음과 같습니다:

1. query 방식: `https://question-pineone.koyeb.app/inquiries/user?email=user%40example.com`
2. path 방식: `https://question-pineone.koyeb.app/user/example%40gmail.com`
3. body 방식: 요청 본문에 DTO 등의 정보를 담아서 조회

기본적인 사용 흐름은 다음과 같습니다:

- 사용자 생성 후, 이메일을 통해 문의사항을 등록할 수 있습니다.
- 등록된 문의사항은 전체 조회나 이메일 기반으로 조회할 수 있습니다.
- 문의사항은 삭제, 업데이트가 가능하며, 답변(Answer) 부분은 등록 전까지는 null 상태입니다.
- 답변은 POST 요청을 통해 등록되며, 이후 내용이 생성됩니다.

예시 데이터:

```json
{
  "id": 1,
  "title": "문의 제목",
  "content": "문의 내용",
  "questionCategory": "MEMBER_INFO",
  "questionDetail": "PERSONAL_INFO_CHANGE",
  "registeredDate": "2023-12-26T04:40:56.482Z",
  "userEmail": "zerosial@gmail.com",
  "answer": {
    "isAnswer": true,
    "title": "답변 제목",
    "content": "답변 내용",
    "answeredDate": "2023-12-26T04:41:18.704Z"
  }
}
```

오류가 발생하거나 문제가 있을 경우 알려주세요.

## API Route

- User API
  - GET /users: 모든 사용자 조회
  - POST /user: 사용자 생성
  - DELETE /user/{email}: 사용자 삭제
- Inquiry API
  - POST /inquiry: 문의 생성
  - GET /inquiry: 모든 문의 조회
  - GET /inquiry/user: 이메일 기반 문의 조회
  - PUT /inquiry/{inquiryId}: 문의 업데이트
  - DELETE /inquiry/{inquiryId}: 문의 삭제
- Answer API
  - POST /answer/{inquiryId}: 답변 생성
  - DELETE /answer/{answerId}: 답변 삭제
