# 🕯️ jinian.click - 3D纪念平台

## 项目介绍
- 域名：jinian.click
- 部署：Vercel（免费）
- 代码托管：GitHub

## 功能
1. 🌍 3D地球 - 使用 Cesium ion
2. 🚀 俯冲动画 - 进入纪念空间
3. 🏛️ 3D祠堂场景
4. 🌸💰🕯️ 祭奠功能（献花/烧纸/焚香）
5. 🔗 SUI区块链存证
6. 🤖 AI生成祭文（待开发）
7. 🎨 NFT铸造（待开发）

## 技术栈
- 前端：React + Vite
- 3D引擎：Cesium ion（免费额度）
- 区块链：SUI

## 快速开始

### 1. 获取 Cesium ion Token
1. 访问 https://ion.cesium.com/ 注册免费账号
2. 创建 Access Token
3. 配置环境变量（见下方）

### 2. 配置环境变量

**本地开发 (.env 文件)：**
```bash
# 创建 .env 文件
cp .env.example .env
# 编辑 .env，填入你的Token
```

**Vercel 部署：**
1. 打开 Vercel 项目设置
2. → Environment Variables
3. 添加：`VITE_CESIUM_ION_TOKEN` = 你的Token

### 2. 本地运行
```bash
cd jinian-click
npm install
npm run dev
```

### 3. 部署到 Vercel
```bash
# 方法1: GitHub 导入
# 1. 推送代码到 GitHub
# 2. 访问 https://vercel.com
# 3. Import Git Repository
# 4. 自动部署！

# 方法2: Vercel CLI
npm i -g vercel
vercel
```

## 项目结构
```
jinian-click/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx       # 主应用（Cesium 3D地球）
│   └── index.css
└── README.md
```

## 下一步
- [ ] 添加 SUI 钱包集成
- [ ] 实现链上存证
- [ ] AI 生成祭文功能
- [ ] NFT 铸造
- [ ] 精美3D祠堂模型

---

💡 提示：Cesium ion 有免费额度，个人项目足够使用！
