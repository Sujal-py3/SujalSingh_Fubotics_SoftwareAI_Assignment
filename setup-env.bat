@echo off
echo Creating environment files...

if not exist "backend\.env" (
    (
        echo HF_MODEL_URL=https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2
        echo HF_API_TOKEN=your_token_here
        echo PORT=3000
    ) > backend\.env
    echo Created backend/.env
) else (
    echo backend/.env already exists
)

if not exist "frontend\.env" (
    (
        echo VITE_API_URL=http://localhost:3000
    ) > frontend\.env
    echo Created frontend/.env
) else (
    echo frontend/.env already exists
)

echo.
echo Done! Edit backend/.env and add your HuggingFace token.
echo Get token: https://huggingface.co/settings/tokens
pause

