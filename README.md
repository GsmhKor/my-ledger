# 我的账本

一款面向 iPhone、无需账号和后端的本地记账 PWA。账单保存在浏览器的 IndexedDB 中，应用不会上传账单，也没有分析、广告或追踪 SDK。

## 功能

- 快速记录支出和收入，金额使用整数存储
- 月份切换、账单日期分组、备注搜索、分类/类型筛选
- 月度分类圆环图和每日支出趋势，显示最大支出、平均支出和本月预测
- 编辑、删除账单
- CSV 导出、JSON 完整备份和恢复
- 浅色/深色模式，适配 iPhone 安全区域
- Web App Manifest、Service Worker 和离线缓存

## 开发交接

新会话先完整阅读 [upgrade_handoff.md](./upgrade_handoff.md)，了解最近一次需求、已完成改动、统计口径、兼容性约束、验证结果和待办，再核对源码与 Git 状态。每次开发结束前更新此文档；会话约定见 [AGENTS.md](./AGENTS.md)。

## 1.2.0 更新

- 新增记账进一步移除超市、购物，现为餐饮、交通、日用品、宠物、其他；旧账单的分类保留。
- 餐饮、交通、日用品、其他分别使用吃面猫、乘车猫、纸巾猫、思考猫，宠物保留皇冠猫。
- 五张分类猫咪统一用于记账、账单和统计，保留旧账单及 JSON 备份兼容性。

## 1.1.0 更新

- 每日支出图表显示最大支出、平均支出和本月预测。
- 新增支出分类精简为餐饮、超市、交通、购物、日用品、宠物、其他；旧账单的停用分类仍可显示、筛选并保留保存。
- 宠物分类使用皇冠猫图标，在记账、账单和统计中统一显示。
- 保持原有本地账单和 schema 1 JSON 备份兼容性，无需数据迁移。

## 本地开发

需要 Node.js 20.19+ 或 22.12+。

```powershell
cd C:\Users\zako2\OneDrive\Desktop\work\my-ledger
npm install
npm run dev
```

电脑浏览器访问终端显示的 `http://localhost:5173`。如需让同一 Wi-Fi 下的 iPhone 临时访问，运行：

```powershell
npm run dev -- --host
```

然后在 Windows 中运行 `ipconfig`，找到无线网卡的 IPv4 地址。假设地址是 `192.168.1.20`，iPhone Safari 打开 `http://192.168.1.20:5173`。Windows 防火墙首次询问时允许“专用网络”。

> 局域网 HTTP 适合调试，但 iPhone 不会把它视为安全上下文，Service Worker 离线能力可能不可用。正式添加到主屏幕时应使用 HTTPS 地址。

## 构建

```powershell
npm run lint
npm run build
npm run preview -- --host
```

构建结果在 `dist`。它是纯静态文件，可放到任何支持 HTTPS 的静态托管服务。托管的只有应用代码；账单仍只写入 iPhone Safari 的 IndexedDB。

仓库已包含 `.github/workflows/deploy-pages.yml`。推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动构建并发布 GitHub Pages；站点路径会根据仓库名称自动设置。

## 安装到 iPhone

1. 将 `dist` 部署到支持 HTTPS 的静态站点（例如 Cloudflare Pages、Netlify 或 Vercel）。
2. 用 iPhone Safari 打开站点的 HTTPS 地址。
3. 点底部“分享”按钮。
4. 选择“添加到主屏幕”，打开“作为 Web App 打开”，名称保留为“我的账本”。
5. 点“添加”并从桌面打开一次，之后应用资源已缓存时可以离线启动。

请定期在“设置”中导出 JSON 完整备份，并保存到 iCloud Drive 或电脑。删除网站数据、卸载主屏幕 Web App 或系统清理 Safari 数据，都可能移除本地账单。

## 目录

```text
src/
  components/   通用 UI 组件
  constants/    收支分类
  hooks/        数据与主题状态
  pages/        首页、账单、统计、设置
  services/     IndexedDB、导入导出
  types/        数据模型
  utils/        日期与货币工具
public/         PWA 图标
```
