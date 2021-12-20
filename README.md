# Geonmo-Gu

![github_구건모_ver1](https://user-images.githubusercontent.com/29723695/135609680-90bbbba6-20fc-49f5-91e9-580374dc3e29.png)



# Level2. Resizing image

확장 프로그램 내역

![image](https://user-images.githubusercontent.com/51692363/146746550-73cecd2b-4698-46b1-ae54-73cde00e1610.png)

적용 모습 (좌:원본 사이즈, 우:200*200 리사이징 이미지)

![image](https://user-images.githubusercontent.com/51692363/146746416-7f3316ec-d3e8-45b2-abb1-d0845d0a4b41.png)

# Level3. Refresh token

Access Token의 단점은 제 3자에게 탈취되었을 때 보안에 취약하다는 점이다. 이를 막기 위해 유효기간을 짧게 설정하여 발급하면 사용자는 로그인을 자주해줘야하는 단점이 생긴다. 이를 막기위해 Refresh Token을 사용하면 된다. Refresh Token은 Access Token과 같은 JWT로 로그인 시 Access Token과 함께 발급된다. Refresh Token은 Access Token보다 유효기간이 길며 Access Token이 만료되었을 때 Refresh Token이 만료되지 않았다면 Access Token을 재발급한다. 이를 통해 Access Token이 탈취되어도 유효기간이 짧기 때문에 조금 더 보안성을 높일 수 있다.

![image](https://user-images.githubusercontent.com/51692363/146747306-3d048290-defd-4c85-9965-1bdbb26a466f.png)

Access Token이 만료되면,

![image](https://user-images.githubusercontent.com/51692363/146749378-501ca3a1-e36a-4b36-8d77-fbedc09a09e3.png)

새로 발급 요청을 할 때, Refresh Token을 함께 전달.

![image](https://user-images.githubusercontent.com/51692363/146749542-9b4fd423-6c5c-4f84-9f12-cb9d437c4602.png)

새로 발급된 Access Token을 헤더에 다시 넣고 GET 요청시 요청 성공.

![image](https://user-images.githubusercontent.com/51692363/146749597-c9fa9508-91d6-4fa0-b268-5c87a14edfa3.png)

