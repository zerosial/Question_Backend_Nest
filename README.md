const koreanToEnglishMapping = {
"회원정보": "MEMBER_INFO",
"카셰어링": "CAR_SHARING",
"차량관제": "VEHICLE_CONTROL",
"기타": "OTHER",
};

subTitle = {
"개인정보 변경": "PERSONAL_INFO_CHANGE",
"소속변경": "AFFILIATION_CHANGE",
"면허/카드 등록": "LICENSE_CARD_REGISTRATION",
"예약문의": "RESERVATION_INQUIRY",
"반납문의": "RETURN_INQUIRY",
"결제문의": "PAYMENT_INQUIRY",
"도어제어문의": "DOOR_CONTROL_INQUIRY",
"기타": "OTHER",
}

User API

POST /user : 새로운 사용자 생성
body
{
"email": "zerosial@gmail.com"
}

GET /users : 사용자 목록 조회

DELETE /user/:email: 사용자 정보 삭제
ex) https://question-pineone.koyeb.app/user/zerosial2@gmail.com

Inquiry API

GET /inquiry: 모든 문의 목록 조회

POST /inquiry: 새로운 문의 생성
body
{
"title": "제목입니다22",
"content": "서브타이틀입니다.22",
"questionCategory" : "MEMBER_INFO",
"questionDetail" : "PERSONAL_INFO_CHANGE",
"userEmail": "zerosial@gmail.com"
}

GET /inquiries/user: 특정 이메일을 가진 사용자의 모든 문의 조회
ex) https://question-pineone.koyeb.app/inquiries/user?email=zerosial@gmail.com

PUT /inquiry/:id: 특정 문의 업데이트
ex) https://question-pineone.koyeb.app/inquiry/3
body
{
"title": "제목입니다22",
"content": "서브타이틀입니다.22",
"questionCategory": "MEMBER_INFO",
"questionDetail": "PERSONAL_INFO_CHANGE",
"questionState": "N"
}

DELETE /inquiry: 문의 삭제
body
{
"id": 3
}
