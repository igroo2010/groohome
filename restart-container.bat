@echo off
chcp 65001 >nul
echo =========================================
echo Docker 컨테이너 재시작
echo =========================================

echo --- NAS Docker 컨테이너 재시작 중...
ssh GrooNas@192.168.1.23 -p 11240 ^
"cd /volume1/docker/groohome && docker-compose down && docker-compose up -d --build"

echo.
echo =========================================
echo 컨테이너 재시작 완료!
echo =========================================
echo.
echo 디버깅 URL 확인:
echo http://192.168.1.23:3000/api/debug-env
echo http://192.168.1.23:3000/api/test-ai
echo.
pause
