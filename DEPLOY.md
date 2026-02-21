# 香港A+系統 - 部署指南

## 部署架構

- **前端**: Vercel (免費)
- **後端**: Render (免費)

## 第一步：準備 Git 倉庫

### 1.1 初始化 Git
```bash
cd /Users/krist/Downloads/Data
git init
git add .
git commit -m "Initial commit"
```

### 1.2 推送到 GitHub
1. 在 GitHub 創建新倉庫 (例如: hk-a-plus-system)
2. 推送代碼:
```bash
git remote add origin https://github.com/你的用戶名/hk-a-plus-system.git
git branch -M main
git push -u origin main
```

---

## 第二步：部署後端到 Render

### 2.1 註冊 Render
1. 訪問 https://render.com
2. 使用 GitHub 賬號登錄

### 2.2 創建 Web Service
1. 點擊 **New** → **Web Service**
2. 連接 GitHub 倉庫
3. 配置:
   - **Name**: `hk-a-plus-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 2.3 添加環境變量
在 Render 控制台添加:
- `NODE_ENV` = `production`

### 2.4 獲取後端 URL
部署完成後，Render 會給你一個 URL，例如:
```
https://hk-a-plus-api.onrender.com
```

---

## 第三步：部署前端到 Vercel

### 3.1 註冊 Vercel
1. 訪問 https://vercel.com
2. 使用 GitHub 賬號登錄

### 3.2 導入項目
1. 點擊 **Add New** → **Project**
2. 選擇 GitHub 倉庫
3. 配置:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite

### 3.3 添加環境變量
在 Vercel 控制台添加:
- `VITE_API_BASE_URL` = `https://你的render地址.onrender.com/api/dashboard`

### 3.4 更新 vercel.json
將 `client/vercel.json` 中的 URL 替換為你的 Render 地址:
```json
{
  "destination": "https://你的render地址.onrender.com/api/$1"
}
```

---

## 第四步：更新 CORS 配置

在 `server/src/index.js` 中，將你的 Vercel 域名添加到 CORS 白名單:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    /\.vercel\.app$/,
    'https://你的vercel域名.vercel.app'
  ],
  credentials: true
};
```

---

## 部署完成！

- 前端地址: `https://你的項目.vercel.app`
- 後端地址: `https://你的項目.onrender.com`

---

## 常見問題

### Q: 頁面加載但數據不顯示？
A: 檢查瀏覽器控制台是否有 CORS 錯誤，確保後端 CORS 配置正確。

### Q: Render 服務休眠？
A: 免費版 Render 會在 15 分鐘無活動後休眠，首次訪問可能需要等待幾秒喚醒。

### Q: 如何更新部署？
A: 只需推送代碼到 GitHub，Vercel 和 Render 會自動重新部署。

---

## 項目結構

```
Data/
├── client/                 # 前端 (Vercel)
│   ├── src/
│   │   ├── api/           # API 調用
│   │   ├── components/    # Vue 組件
│   │   └── App.vue
│   ├── vercel.json        # Vercel 配置
│   └── .env.example       # 環境變量示例
│
├── server/                 # 後端 (Render)
│   ├── src/
│   │   ├── data/          # 模擬數據
│   │   ├── routes/        # API 路由
│   │   └── index.js       # 入口文件
│   └── render.yaml        # Render 配置
│
└── .gitignore
```
