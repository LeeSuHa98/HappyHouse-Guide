/*
 * Project Name : Happyhouse
 * 
 * Version : beta
 *
 * Date : 2021-03-21
 * 
 * By 김선진 / 010-8835-2870
 */

1. CRUD 중 Read만 구현했으며 GET Method로 조회 가능

2. HouseInfo 데이터 2000여개에서 Head 10개만 조회 가능

3. 그 외 데이터는 간단한 더미 데이터로 넣었습니다.

4. 추가로 필요한 데이터나 기능은 요청시 최대 1일 내로 추가 가능

Base URL : https://n72s3qi251.execute-api.us-east-1.amazonaws.com/happyhouse

community
조회
GET : /comunities : Search all

dibs
조회
GET : /dibs : Search all
GET : /dibs/userid/{userid} : Searching by user id
GET : /dibs/houseid/{userid} : Searching by house id
GET : /dibs/{userid}/{houseid} : Searching by user id and house id

FAQs
조회
GET : /FAQs : Search all

houseInfos
조회
GET : /houseInfos : Search all
GET : /houseInfos/{sidoCode} : Seacing by sidoCode
GET : /houseInfos/{sidoCode}/{sigunguCode} : Seacing by sidoCode and sigunguCode
GET : /houseInfos/{sidoCode} /{sigunguCode}/{danjiCode}: Seacing by sidoCode and sigunguCode and danjiCode

reivews
조회
GET : /reivews : Search all
GET : /reivews/userid/{userid} : Searching by user id
GET : /reivews/houseid/{userid} : Searching by house id
GET : /reivews/{houseid}/{userid} : Searching by user id and house id

users
조회
GET : /users : Search all
GET : /users/{userid} : Searching by user id

사용방법 : Base URL + method로 GET 요청을 보내면 해당 정보를 Json 형태로 뿌려줍니다!!