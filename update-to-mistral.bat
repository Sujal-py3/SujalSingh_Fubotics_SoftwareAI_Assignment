@echo off
echo Updating backend/.env to use Mistral model...

if exist "backend\.env" (
    echo Current .env file found. Updating model URL...
    
    REM Create a temporary file with updated content
    (
        echo HF_MODEL_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
        echo HF_API_TOKEN=your_token_here
        echo PORT=3000
    ) > backend\.env.tmp
    
    REM Check if token exists in old file
    findstr /C:"HF_API_TOKEN" backend\.env >nul
    if %errorlevel% == 0 (
        REM Extract token from old file
        for /f "tokens=2 delims==" %%a in ('findstr /C:"HF_API_TOKEN" backend\.env') do set OLD_TOKEN=%%a
        if defined OLD_TOKEN (
            REM Update with existing token
            (
                echo HF_MODEL_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
                echo HF_API_TOKEN=%OLD_TOKEN%
                echo PORT=3000
            ) > backend\.env.tmp
        )
    )
    
    REM Replace old file with new
    move /Y backend\.env.tmp backend\.env >nul
    
    echo ✅ Updated to Mistral model!
    echo.
    echo Current settings:
    type backend\.env
) else (
    echo ❌ backend/.env not found. Run setup-env.bat first.
)

echo.
echo ⚠️  Make sure HF_API_TOKEN has your actual token!
echo    Get token: https://huggingface.co/settings/tokens
pause

