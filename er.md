userテーブル
  - email
  - defaultName
  - signUpDate
  - teacherFlag

recordテーブル
  - userId
  - title
  - postDate
  - description
  - place
  - youtubeURL

Orderテーブル
  - recordId
  - teacherId(userId)
  - status
  - comment
  - adviceComment

Commentテーブル
  - userId
  - recordId
  - status
  - comment