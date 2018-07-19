[![HitCount](http://hits.dwyl.io/cheese10yun/KaKaoBot-Node.svg)](http://hits.dwyl.io/cheese10yun/KaKaoBot-Node)
# 카카오 봇
## 개발 위키 참고
* [Node API 설정](https://github.com/cheese10yun/Node-Boot/wiki/Node-API-%EC%84%A4%EC%A0%95)
* [옐로우 아이디 설정](https://github.com/cheese10yun/Node-Boot/wiki/%EC%98%90%EB%A1%9C%EC%9A%B0-%EC%95%84%EC%9D%B4%EB%94%94-%EC%84%A4%EC%A0%95)
* [카카오 봇 API 간단설명](https://github.com/cheese10yun/Node-Boot/wiki/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EB%B4%87-API-%EA%B0%84%EB%8B%A8%EC%84%A4%EB%AA%85)

## 옐로우 아이디 친구 추가
 * [https://plus.kakao.com/home/@node_yun](https://plus.kakao.com/home/@node_yun) 클릭 친구 추가 

## 기능

![](http://i.imgur.com/PjpxQy8.png)

* 기존관 오늘 식단
* BTL 오늘 식단
* 하교 광주 시간표 (이미지)

**매일 12시 45분 오늘의 식단표가 변경됩니다.**

![](http://i.imgur.com/Ns8Rw9C.png)
* 목포 하교 시간표
* 기능 추가요청 (깃허브 이슈 페이지)

![](http://i.imgur.com/St3zAuj.png)
* 하교 시간표 이미지


## 기술스펙
* Node.JS
* Redis
* Node Cron [link](https://github.com/merencia/node-cron)

## 프로젝트 실행 방법 (Mac 기준)
### Redis 설치 및 실행
```
$ wget http://download.redis.io/redis-stable.tar.gz
$ tar xvzf redis-stable.tar.gz
$ cd redis-stable
$ make
$ redis-server
```
### Node 설정 및 실행
```
$ [sudo] npm install pm2 -g
$ cd Node-Boot/
$ [sudo] npm install
$ cd bin/
$ pm2 start www --name <APP_NAME>
```
* **PM2 설정은 [Yun Blog PM2](https://cheese10yun.github.io/PM2) 참고**
* **Redis Node 사용법은 [Yun TIL](https://github.com/cheese10yun/Yun-Wiki/blob/master/Node/Redis.md) 참고**
