# 我的账本：版本升级交接文档

最后更新：2026-09-05。本文是跨会话交接入口，文件名固定为小写 `upgrade_handoff.md`。新会话先完整阅读本文，再核对源码、`git status` 和最近提交；会话结束前同步更新已完成工作、计算口径、验证结果和待办。

## 0. 最近会话交接（优先阅读）

### 用户要求与本次完成内容

1. 用户先要求完整阅读交接文档、检查现有代码，再按后续要求升级，并保留已有账单及备份兼容性。已完成文档阅读、源码核对和基线 lint/build。
2. 用户指定：统计标签的「每日支出」图表右上角，将「峰值」改成「最大支出」，并增加「平均支出」「本月预测」。已在 `src/pages/StatsPage.tsx` 实现，`src/App.css` 增加右侧三行摘要及窄屏换行样式。
3. 用户要求交接文件名改为小写，并将内容一并 push，以便新会话了解前一会话。本文已改名并补全记录；README 增加入口，项目 `AGENTS.md` 记录阅读和维护交接文档的约定。本次提交范围包含图表源码、样式和这些文档。

### 当前计算口径

用户明确指定了三项名称；下列公式由本次实现采用，已在会话中说明，用户未另行指定公式。

- **最大支出**：选中月份内，按日期合计后的最高单日支出，不是最大单笔金额；包含该月已录入的未来日期支出。
- **平均支出**：当前月只累计截至今天（含今天）的支出，除以本月已过日历天数，包含没有支出的日期。当前月未来日期的记录不参与此项计算。
- **本月预测**：当前月用未四舍五入的日均支出乘以本月总天数，最终显示为整数日元。
- 历史月份：平均支出为整月支出除以该月天数；「本月预测」显示该月实际支出总额。
- 未来月份：最大支出仍显示该月最高单日支出；平均支出和本月预测显示「—」。
- 收入不参与上述计算。整月没有支出时仍显示原有空状态，不显示每日支出图表和摘要。
- 日期基于设备本地日期，在组件渲染时计算；本次没有增加跨午夜定时刷新机制。

### 验证与兼容性

- `npm run lint`、`npm run build`、`git diff --check` 已通过。
- 通过临时 Node 脚本转译并调用实际 `StatsPage` 组件，核对了摘要标签和显示金额：当前月、排除当前月未来日期支出、排除收入、同日多笔合计、闰年二月、未来月份、整数显示及预测使用未舍入均值、空状态。这是组件计算检查，不是浏览器或 iPhone 实机测试；脚本未保存为项目测试文件。
- 本次未改数据库名、版本、对象仓库、账单字段、分类 id 或 JSON `schemaVersion: 1`，未操作个人账单，也未改依赖和应用版本号（仍为 `1.0.0`）。
- 本次未重新验证真实浏览器 CRUD、备份往返、Pages 子路径运行、Service Worker 离线更新或 iPhone 布局；不能把构建通过视为这些流程已通过。

### 下一会话与发布核对

- 截至本文更新，用户明确提出的功能改动已完成，没有收到下一项功能需求。第 8 节是已知待办，不代表本次已经修复，也不应当作用户已经要求全部实施。
- 用户已明确授权本次提交并推送到 `origin/main`；现有工作流会在 main 推送后自动构建和部署 Pages。该授权针对本次内容，后续发布按后续会话指示执行。
- 本文随本次内容一起提交，提交号及远端是否包含该提交以 Git 为准：`git log -5 --oneline`、`git log -1 --oneline -- upgrade_handoff.md`；联网 `git fetch origin` 后用 `git status -sb` 核对远端差异。不要把此文件中的发布意图当成 push 或 Pages 部署成功的证据。
- Pages 部署状态需另查 GitHub Actions；手机更新情况需实机核对。不要通过清除网站数据或重建 IndexedDB 刷新版本。

## 1. 项目与用户目标

项目名称「我的账本」，英文名 `my-ledger`。个人使用的 iPhone 记账 PWA，核心目标是快速记一笔，并看清每月钱花在哪里。

用户在 Windows + VS Code 中开发，没有 Mac / Xcode。当前以 Safari 添加到主屏幕的方式使用，未来可考虑 React Native + Expo，但不为未来过度设计。

- 本地目录：`C:\Users\zako2\OneDrive\Desktop\work\my-ledger`
- GitHub：<https://github.com/GsmhKor/my-ledger>
- 已配置的线上地址：<https://gsmhkor.github.io/my-ledger/>
- 分支：`main`
- 当前版本：`1.0.0`
- 本次图表改动之前的基线提交：`c68aa5e`，`更新猫咪手绘主题与应用图标`
- 前一提交：`2d8c8bf`，`初始化我的账本 PWA`

本次交接范围和发布核对方式见第 0 节；线上部署结果不由本地构建结果推断。

## 2. 必须保留的产品约束

- Mobile First，重点适配 iPhone Safari、竖屏、单手操作和顶部/底部安全区域。
- 无注册、无登录、无后端、无云端数据库、无自动同步。
- 不上传账单，不接入分析、广告、追踪 SDK。
- 每个设备/浏览器存储环境保存自己的账单；没有账户级隔离，也没有跨设备同步。同一浏览器环境不是多用户账本。
- JPY 为当前唯一实际记账货币，金额保存为正的安全整数日元，收支方向由 type 表示。
- 保留 CSV 和完整 JSON 备份/恢复能力，清空数据必须二次确认。
- 简洁卡片、圆角和充分留白，支持深色模式；装饰不要妨碍快速记账。
- 暂不做银行 API、信用卡连接、OCR、AI 分类、社交或 App Store 发布。
- 升级必须兼容已有账单与备份。不要用清空 IndexedDB、改数据库名或删除旧存储的方式解决问题。

## 3. 当前技术栈

以下为 package.json 中的依赖范围，精确安装版本以 package-lock.json 为准。

| 项目 | 当前配置 |
| --- | --- |
| React / React DOM | ^19.2.8 |
| TypeScript | ~6.0.2 |
| Vite | ^8.2.2 |
| @vitejs/plugin-react | ^6.1.0 |
| idb | ^8.0.3 |
| vite-plugin-pwa | ^1.3.0 |
| oxlint | ^1.79.0 |
| sharp | ^0.35.4，仅开发时处理图片 |

没有路由库、全局状态库、UI 框架或图表库。Tab 使用 React state 切换；图表采用 CSS 圆环和柱状图。

## 4. 已实现功能

| 位置 | 当前行为 |
| --- | --- |
| 首页 | 共享月份切换、本月结余主卡、收入和支出、最近 5 笔记录、查看全部 |
| 快速记账 | 底部弹层，突出金额，支出/收入、分类、日期和备注；默认支出、今天、对应类型第一个分类 |
| 账单 | 月内账单按日期倒序分组，备注搜索、类型筛选、分类筛选，点击记录编辑或删除 |
| 统计 | 当月支出分类圆环、分类金额和占比、每日支出柱状图；图表右上角显示最大支出、平均支出、本月预测（口径见第 0 节） |
| 设置 | 全量 CSV 导出、全量 JSON 导出、JSON 覆盖恢复、两次确认清空、深色开关、版本信息 |
| 导航 | 首页 / 账单 / 统计 / 设置，悬浮「记一笔」按钮 |
| PWA | Manifest、standalone、PNG 图标、Apple touch icon、Service Worker、基础离线缓存与自动更新配置 |

支出分类：餐饮、超市、交通、购物、房租、水电煤、通讯、娱乐、医疗、日用品、宠物、旅行、其他。

收入分类：工资、奖金、退款、投资收益、其他收入。

当前首页以「结余」为最大的金额展示；最初需求举例以「支出」为主，后续可评估是否调整。

## 5. 目录与职责

```text
my-ledger/
  AGENTS.md                         开发会话的交接阅读与维护约定
  .github/workflows/deploy-pages.yml   main 推送后构建并部署 Pages
  design/generated/                  3 张图案的 PNG 母版
  public/                            4 个 PWA / Apple PNG 图标文件
  scripts/generate-icons.mjs          母版生成图标、去背景和生成 WebP
  src/
    assets/                          睡觉猫、电脑猫 WebP
    components/
      EmptyState.tsx                 两种插图的空状态
      Icon.tsx                       通用界面图标
      MonthSwitcher.tsx              月份切换
      TabBar.tsx                     底部导航
      TransactionEditor.tsx          新增、编辑和删除弹层
      TransactionRow.tsx             账单行
    constants/categories.ts          分类 id、名称、emoji、颜色和类型
    hooks/useLedger.ts               账单读取、内存状态和 CRUD 后刷新
    hooks/useDarkMode.ts             主题状态和 localStorage
    pages/                           Home / Bills / Stats / Settings
    services/database.ts             IndexedDB 操作
    services/backup.ts               CSV、JSON 导出与导入校验
    types/transaction.ts             账单与备份类型
    utils/                           日期和货币格式化
    App.tsx                          Tab、共享月份、编辑弹层和通知状态
    App.css                          页面和组件样式
    index.css                        全局样式与主题变量
    main.tsx                         React 入口、注册 Service Worker
  index.html                         页面入口和 Apple / viewport 元信息
  vite.config.ts                     Vite、base 路径、PWA 配置
  README.md                          使用说明
  upgrade_handoff.md                 本交接文档（固定小写）
```

业务与 UI 已初步拆分，但月度汇总和统计逻辑仍在页面中，可按实际需要提取纯函数。

## 6. 数据与兼容性

```ts
type TransactionType = 'expense' | 'income'
type Currency = 'JPY' | 'CNY'

interface LedgerTransaction {
  id: string
  amount: number       // 当前为整数日元，正数，安全整数
  type: TransactionType
  category: string     // 稳定的分类 id，例如 food / salary
  date: string         // 本地日历日期 YYYY-MM-DD
  note: string
  currency: Currency
  createdAt: string    // ISO 时间戳
  updatedAt: string    // ISO 时间戳
}

interface BackupFile {
  app: 'my-ledger'
  schemaVersion: 1
  exportedAt: string
  transactions: LedgerTransaction[]
}
```

IndexedDB 数据库名 `my-ledger-db`，版本 `1`，对象仓库 `transactions`，主键 `id`，索引 `date` / `type` / `category`。当前读取全量记录并在内存过滤月份。JSON 恢复在一个读写事务中清空并写入记录，行为是覆盖而非合并。

CSV 含日期、类型、分类、金额、币种、备注，带 UTF-8 BOM。JSON 导出的是所有账单字段，不包含主题偏好。

主题偏好保存在 localStorage 的 `my-ledger-theme`。首次读取系统偏好，之后保存为明确的浅色/深色值；尚无持续跟随系统模式。

CNY 只是类型和格式化预留，不能认为已实现人民币记账。当前编辑器固定保存 JPY，月度统计直接累加金额，不按币种拆分。

## 7. 猫咪主题和素材实际情况

用户最初提供两张猫咪表情贴纸页，希望裁切图案、更换 App 图标、合理安排内部插图，并协调颜色。当前成果包含参考贴纸风格生成的图案，并非原贴纸的逐张原样裁切。原始两张贴纸未见于当前项目素材目录；后续若需精确裁切，先确认原图是否可用。

用户最近指出：「我看到你加了 8 张图，但是我在 app 里只看到 3 张吧？」实际只有 3 种图案，不能把尺寸变体或母版计为新的表情。

| 图案 | 当前用途 | 文件 |
| --- | --- | --- |
| 皇冠猫拿账单 | App 图标、加载状态、设置中的 App 信息 | app-icon-master.png + public 下 4 个尺寸/用途版本 |
| 睡觉猫 | 首页无账单、账单页无匹配结果 | cat-sleeping-master.png + cat-sleeping.webp |
| 电脑猫 | 统计无支出、设置隐私横幅 | cat-laptop-master.png + cat-laptop.webp |

合计 9 个图片文件：3 张母版、4 个图标文件、2 张 WebP 插图。内部插图大多在空状态出现，有账单后不一定能看到。

当前浅色：奶油底 `#fff9ed`，深棕文字 `#302a25`，橙色主色 `#f67624`，黄色 `#ffd52d`，蓝色点缀 `#269fe7`。首页为黄橙渐变卡片。

当前深色：背景 `#17120e`，卡片 `#241e19`，文字 `#fff8ed`，主色 `#ff9445`。

可讨论的视觉升级方向是增加适配不同情境的独立表情，比如记账成功、无搜索结果、备份完成；这仍是建议，不代表已经实现或用户明确指定了 8 张图的数量。

## 8. 代码核对发现的升级事项

这些是从当前实现发现的问题或限制，不代表已修复，也不等于所有场景已经实机复现。

1. **离线插图**：vite.config.ts 的 Workbox globPatterns 只包含 js/css/html/svg/png/ico，未包含 webp；两张内部插图未纳入此预缓存规则。应补齐并验证离线重新启动。
2. **读取失败反馈**：useLedger 初始读取失败时把列表设置为空，没有向用户区分「读取失败」与「没有账单」。应增加可理解的错误与重试状态。
3. **导入校验**：目前验证字段类型和日期格式，但未验证真实日历日期、有效时间戳、重复/空 id、分类与类型匹配；覆盖恢复前应完整校验。重复 id 可能被 put 覆盖。
4. **货币边界**：导入器接受 CNY，UI 编辑会写成 JPY，汇总也不区分币种。第一版应明确只支持 JPY 并防止静默错算，或另行设计币种规则；不要直接增加汇率服务。
5. **金额边界**：编辑器校验单笔安全整数，但数据库服务本身仅 Math.round；多笔累加也未检查安全整数溢出。应按实际风险统一校验。
6. **失败与并发操作**：删除和清空的异步操作缺少完整异常反馈；恢复、清空和记账同时操作的交互需要检查。
7. **PWA 更新体验**：配置 autoUpdate，入口 immediate 注册；没有显式的版本提示、恢复前台检查或编辑中更新保护。不能保证用户 push 后所有手机立刻更新；应检查更新时未保存表单是否会受影响。
8. **iPhone 交互**：需实机验证软键盘、日期输入、弹层滚动、底部按钮遮挡、横向溢出、长金额和深色模式。当前没有可证明全部通过的 iPhone 实机测试记录。
9. **可访问性和趋势交互**：检查弹层焦点管理、无障碍标签、触摸查看每日金额；目前柱状图主要通过 title 展示明细。
10. **备份细节**：检查 CSV 中备注以公式字符开头时的电子表格处理、回车转义，以及 Safari 下载/恢复流程。
11. **图标与主题**：maskable 图标当前与普通 512 图标采用同样缩放，需检查安全区；系统主题切换和图表分类配色可进一步统一。

建议先处理数据正确性与离线可靠性，再进行视觉和交互升级。具体版本范围由下一轮需求决定。

## 9. 启动、验证与部署

Windows PowerShell，在项目目录运行：

```powershell
cd C:\Users\zako2\OneDrive\Desktop\work\my-ledger
npm ci
npm run dev
```

电脑打开终端显示的本地地址，通常为 `http://localhost:5173`。现有 Vite 配置已设置 server.host 为 true。

```powershell
npm run lint
npm run build
npm run preview -- --host
```

需要重建图标和内部插图时运行 `npm run icons`，它会根据 design/generated 的母版覆盖生成目标图片。

本次 lint 和 build 均通过；详细验证范围见第 0 节。项目目前没有配置自动化测试脚本；构建成功不等于 CRUD、Safari 或离线流程全部验证通过。

部署工作流使用 Node 22，执行 npm ci 和 npm run build，并设置 `VITE_BASE_PATH=/<仓库名>/`；当前即 `/my-ledger/`。main 分支推送会触发 Pages 发布。保留 base-aware 资源路径，避免子路径部署资源 404。

日常使用地址为上文 HTTPS Pages 链接。局域网 HTTP 开发地址只作调试，不作为完整 PWA 离线能力的验收环境。

备份和旧账单兼容性应列入升级验收。正常发布不应主动删除账单；不要通过卸载桌面 App、清除网站数据或改变存储来源来刷新图标/版本，除非用户已经备份并理解数据影响。

## 10. 可直接交给下一轮模型的请求

> 请接手这个已经存在的「我的账本」PWA。先完整阅读 upgrade_handoff.md（尤其第 0 节），再检查源码、git status 和最近提交，根据我本轮的具体要求继续开发，不要从零重建项目。
>
> 保留 Windows 开发、iPhone 优先、纯本地 IndexedDB、无账户/后端/追踪、整数日元和 JSON 备份兼容性。当前是奶油黄橙色猫咪手绘主题，实际只有 3 种图案；不要把多个图标尺寸说成多张独立插图。
>
> 第 8 节列出尚未修复的已知问题，按本轮需求决定改动范围。统计页三项摘要已实现，保留第 0 节计算口径，除非本轮明确要求调整。需要新增图案时先检查原始素材，不要把生成重绘描述为原图裁切。
>
> 保留已有用户修改和账单，不进行破坏性数据库重置。实现后运行 lint/build，并针对改动验证 CRUD、备份恢复、金额汇总、子路径资源和离线行为。分别说明已通过检查与仍需 iPhone 实机验证的项目。最后给出中文变更说明和本地预览方法；是否发布按该会话中的用户指示执行。
>
> 结束前更新 upgrade_handoff.md，记录本轮用户要求、最终实现、计算规则、修改文件、验证结果、未完成事项和提交/推送状态；替换过时描述，不能只追加相互矛盾的记录。文档不保存个人账单、密钥或完整聊天记录。

如果下一轮模型可访问本工作区，直接读取源码即可；若在独立聊天中使用，请一并提供源码和本文档。源码交接应包含 package-lock.json、配置、src、public、design 和 scripts，无需包含 node_modules、dist、.git 或个人账单备份。
