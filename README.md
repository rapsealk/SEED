# SEED
* 이 문서는 SEED 프로젝트의 REST API를 설명합니다.
* 이 문서에서 도메인 명은 __localhost:3000__으로 설정합니다.
* 인증에 사용하는 token은 다음과 같은 방식을 통해 얻을 수 있습니다.

>// Java - Android
FirebaseUser user = firebaseAuth.getCurrentUser();
String token = user.getToken();

## Message
#### 메시지 불러오기 `GET` `http://localhost:3000/messages?token=<token>`
1. 성공
- 유저의 메시지 리스트를 JSON 형태로 반환합니다. 이때 timestamp는 unix time을 따릅니다.
```
{
    "protocol": "200",
    "messages": {
        "1487821222427": "Message #1",
        "1487821233538": "Message #2",
        ...
    }
}
```
2. 인증 실패
- 아래의 Error Code 항목을 참고하시기 바랍니다.
#
#### 메시지 등록하기 `POST` `http://localhost:3000/messages`
* 다음과 같은 body를 전달합니다.
```
{
    "token": "eyJhbGciOiJSUzI1Ni...VH6FhF6vgTCQ",
    "message": "Hello, World!"
}
```
1. 성공
- status code를 반환합니다.
```
{ "protocol": "201" }
```
2. 인증 실패
- 아래의 Error Code 항목을 참고하시기 바랍니다.
3. 메시지 등록 실패
- 서버의 내부 문제로 인해 메시지 등록에 실패한 경우입니다.
```
{ "protocol": "500" }
```
#
#### 메시지 삭제하기 `DELETE` `http://localhost:3000/messages`
* 다음과 같은 body를 전달합니다.
```
{
    "token": "eyJhbGciOiJSUzI1Ni...VH6FhF6vgTCQ",
    "timestamp": "1487821222427"
}
```
1. 성공
```
{ "protocol": "200" }
```
2. 인증 실패
- 아래의 Error Code 항목을 참고하시기 바랍니다.
3. 메시지 삭제 실패
- 서버의 내부 문제로 인해 메시지 삭제에 실패한 경우입니다.
```
{ "protocol": "500" }
```
## Weather
#### 날씨 불러오기 `GET` `http://localhost:3000/weather?location=<location>`
1. 성공
- 전달된 지역의 날씨 정보를 JSON 형태로 반환합니다.
```
{
  "query": {
    "count": 1,
    "created": "2017-02-23T08:47:46Z",
    "lang": "en-US",
    "results": {
      "channel": {
        "item": {
          "condition": {
            "text": "Sunny"
          }
        }
      }
    }
  }
}
```
## Alarm
#### 알람 설정하기 `POST` `http://localhost:3000/alarm`
* 다음과 같은 body를 전달합니다.
```
{
    "title": "Good Morning",
    "ms": 3600000,              // milliseconds from now to set time
}
```
1. 성공
```
{ "protocol": "201" }
```
## Error Code
1. 인증 실패
- token을 통한 사용자 인증에 실패할 경우 발생합니다.
```
{
    "protocol": "401"
    "error": "Error: Decoding Firebase ID token failed.
              Make sure you passed the entire string JWT which represents an ID token.
              See https://firebase.google.com/docs/auth/admin/verify-id-tokens
              for details on how to retrieve an ID token."
}
```
## Protocol
이 프로그램에서 사용된 HTTP Status Code에 대해 다룹니다. 자세한 내용은 [wikipedia](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C)를 참고하세요.
### 2xx (성공)
클라이언트가 요청한 동작을 수신하여 이해했고 승낙했으며 성공적으로 처리했음을 가리킨다.
* 200(성공): 서버가 요청을 제대로 처리했다는 뜻이다. 이는 주로 서버가 요청한 페이지를 제공했다는 의미로 쓰인다.
* 201(작성됨): 성공적으로 요청되었으며 서버가 새 리소스를 작성했다.
### 4xx (요청 오류)
클라이언트에 오류가 있음을 나타낸다.
* 401(권한 없음): 이 요청은 인증이 필요하다. 서버는 로그인이 필요한 페이지에 대해 이 요청을 제공할 수 있다.
### 5xx (서버 오류)
서버가 유효한 요청을 명백하게 수행하지 못했음을 나타낸다.
* 500(내부 서버 오류): 서버에 오류가 발생하여 요청을 수행할 수 없다.
