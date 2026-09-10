# 收入分类猫咪图标

本次按用户提供的三张单图，使用内置 `image_gen` 提取/改绘；不是逐像素原图裁切。
图片依次对应奖金、退款和投资收益；工资与其他收入保持原 emoji，不作修改。
保留分类名称和稳定 ID；记账选项、账单行和统计图例共用新增图片映射，原生筛选下拉框继续使用原 emoji。

| 用途 | 透明母版 | 应用资源 |
| --- | --- | --- |
| 奖金 | `design/generated/cat-income-bonus-master.png` | `src/assets/cat-income-bonus.png` |
| 退款 | `design/generated/cat-income-refund-master.png` | `src/assets/cat-income-refund.png` |
| 投资收益 | `design/generated/cat-income-investment-master.png` | `src/assets/cat-income-investment.png` |

内置工具生成带真实 alpha 的 1254 × 1254 PNG 母版；`scripts/generate-icons.mjs` 将母版等比缩放为 192 × 192 应用 PNG。

## 内置工具完整提示词

### bonus

```text
Use case: background-extraction
Asset type: mobile ledger income category icon master for 奖金
Input images: Image 1 is the sole edit target; Images 2 and 3 are context only and must not be combined.
Primary request: Isolate and faithfully preserve only the complete sticker from Image 1: the wide white cat with uneven black hand-drawn outline, pink heart-shaped eyes, pink circles and yellow sparkles around it.
Composition/framing: center the complete sticker on a square canvas with about 7% transparent padding; keep all surrounding pink circles and yellow sparkles visible.
Style/medium: preserve the original simple hand-drawn sticker style, colors, pose, proportions, expression, and uneven linework.
Constraints: genuinely transparent alpha background; keep the white cat fur opaque white; no checkerboard; no white rectangle; no text; no watermark; no shadows; no added or removed decorative elements; do not include anything from Images 2 or 3.
```

### refund

```text
Use case: background-extraction
Asset type: mobile ledger income category icon master for 退款
Input images: Image 2 is the sole edit target; Images 1 and 3 are context only and must not be combined.
Primary request: Isolate and faithfully preserve only the complete sticker from Image 2: the small white calico cat with orange patches at both sides of its head, tiny smiling face, little white body and paws, black curl and motion marks around it.
Composition/framing: center the complete sticker on a square canvas with about 7% transparent padding; keep all motion marks visible.
Style/medium: preserve the original simple hand-drawn sticker style, colors, pose, proportions, expression, and uneven black linework.
Constraints: genuinely transparent alpha background; keep the white cat fur and body opaque white; no checkerboard; no white rectangle; no text; no watermark; no shadows; no added or removed elements; do not include anything from Images 1 or 3.
```

### investment

```text
Use case: background-extraction
Asset type: mobile ledger income category icon master for 投资收益
Input images: Image 3 is the sole edit target; Images 1 and 2 are context only and must not be combined.
Primary request: Isolate and faithfully preserve only the complete sticker from Image 3: the wide white calico cat with orange patches at both sides, happy face and two paws holding a white bone-like horizontal shape, surrounded by blue, yellow and pink hearts.
Composition/framing: center the complete sticker on a square canvas with about 7% transparent padding; keep every surrounding heart visible.
Style/medium: preserve the original simple hand-drawn sticker style, colors, pose, proportions, expression, and uneven black linework.
Constraints: genuinely transparent alpha background; keep the white cat fur and held white shape opaque white; no checkerboard; no white rectangle; no text; no watermark; no shadows; no added or removed hearts or characters; do not include anything from Images 1 or 2.
```
