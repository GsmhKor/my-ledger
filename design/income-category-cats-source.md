# 收入分类猫咪图标

按用户提供的参考图，使用内置 `image_gen` 提取/改绘；不是逐像素原图裁切。
五种收入分类均使用猫咪图片：工资为莲花猫，奖金、退款、投资收益沿用已有图片，其他收入为盆栽书本双猫。
保留分类名称和稳定 ID；记账选项、账单行、图片分类筛选和统计图例共用图片映射。

| 用途 | 透明母版 | 应用资源 |
| --- | --- | --- |
| 奖金 | `design/generated/cat-income-bonus-master.png` | `src/assets/cat-income-bonus.png` |
| 退款 | `design/generated/cat-income-refund-master.png` | `src/assets/cat-income-refund.png` |
| 投资收益 | `design/generated/cat-income-investment-master.png` | `src/assets/cat-income-investment.png` |
| 工资 | `design/generated/cat-income-salary-master.png` | `src/assets/cat-income-salary.png` |
| 其他收入 | `design/generated/cat-income-other-master.png` | `src/assets/cat-income-other.png` |

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

### salary

```text
Use case: background-extraction
Asset type: mobile ledger income category icon master for 工资
Input images: Image 2 is the sole visual reference and extraction target. Images 1 and 3 are UI screenshots for placement context only; Image 4 is for a different icon and must not be combined.
Primary request: Recreate and isolate only the complete small hand-drawn sticker from Image 2: a smiling white-and-orange cat face nestled inside an open pink lotus flower, with black hand-drawn outlines, small yellow radiating marks, a tiny white body below, and no surrounding UI.
Composition/framing: centered on a square canvas with about 8% transparent padding; keep the full lotus petals, cat face, body, and every yellow ray visible; maximize legibility at 42 px.
Style/medium: faithfully preserve the simple uneven hand-drawn sticker look, original pose, proportions, pink/yellow/orange/black palette, and cheerful expression.
Constraints: genuinely transparent alpha background; opaque white cat areas; no checkerboard, no white rectangle, no text, no watermark, no shadows, no border, no extra objects, no red circles, no briefcase, no money bag, and do not include anything from Images 1, 3, or 4.
```

### other-income

```text
Use case: background-extraction
Asset type: mobile ledger income category icon master for 其他收入
Input images: Image 4 is the sole visual reference and extraction target. Images 1 and 3 are UI screenshots for placement context only; Image 2 is for a different icon and must not be combined.
Primary request: Recreate and isolate only the complete hand-drawn sticker from Image 4: two fluffy white cats lying side by side, the left cat with orange patches and a small brown flowerpot with green round leaves resting behind/on it, the right pale-gray cat beside a short row of colorful books. Preserve the cats' tiny sleepy faces and simple black uneven outlines.
Composition/framing: centered compact horizontal composition on a square transparent canvas with about 7% padding; keep both cats, every leaf, the flowerpot, and all books fully visible; maximize legibility at 42 px.
Style/medium: faithfully preserve the original simple hand-drawn sticker look, colors, pose, proportions, soft white/gray bodies, orange patches, green plant, and colorful books.
Constraints: genuinely transparent alpha background; keep both cats and pale book areas opaque; no checkerboard, no white rectangle, no text, no watermark, no shadows, no border, no extra objects, no red circles, no money bag, no briefcase, and do not include anything from Images 1, 2, or 3.
```
