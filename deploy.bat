@echo off
chcp 65001 >nul
echo =========================================
echo 로컬 → GitHub → NAS 배포 시작
echo =========================================

REM 1. 로컬 변경사항 커밋
git add .
git commit -m "Auto deploy commit from local"

REM 2. GitHub에 강제 푸시
echo.
echo --- GitHub(main)에 강제 푸시 중...
git push origin main --force
IF ERRORLEVEL 1 (
    echo GitHub 푸시 실패!
    pause
    exit /b 1
)

REM 3. NAS에 SSH로 접속해서 GitHub에서 pull
echo.
echo --- NAS에 최신 코드 반영 중...
ssh GrooNas@192.168.1.23 -p 11240 ^
"cd /volume1/docker/groohome && git fetch origin main && git reset --hard origin/main"

echo.
echo =========================================
echo 배포 완료!
echo =========================================
pause