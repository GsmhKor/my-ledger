# 支出分类猫咪图标

来源：沿用用户提供的猫咪贴纸风格，以项目内 `design/generated/cat-pet-master.png` 为角色与画风参考，使用内置 `image_gen` 工具生成四个新姿势。属于 AI 风格改绘，不是原贴纸逐像素裁切。宠物继续使用原皇冠猫。

每种图案保存为 `design/generated/cat-<名称>-master.png` 母版和 `src/assets/cat-<名称>.png` 应用资源（192 × 192，透明 PNG），名称为 `food`、`transport`、`daily`、`other`。`npm run icons` 可从母版重建应用资源。

图标用于记账分类、首页/账单行和统计图例；原生筛选下拉框继续使用 emoji 和文字。分类 id 和备份格式不变。

初稿中有不透明的棋盘格背景，随后使用同一内置工具去背景，最终仅保存通过透明通道检查的母版。资源缩放使用 `contain` 保持长宽比，避免裁掉猫咪和道具。

## 去背景修正提示词（四张共用）

```text
Use case: background-extraction. Remove the background from this image. Deliver an RGBA PNG cutout with a genuinely transparent alpha channel, like a background-removed product image. The current light gray and white checkerboard is unwanted opaque artwork: erase all of it outside the sticker, including gaps around the paws/tail/props, replacing it with zero-alpha pixels. Keep the cat and its prop completely unchanged, including white fur and black outlines. Do not draw another checkerboard and do not add a solid background. Transparent background, isolated subject only.
```

## 完整提示词

### 餐饮：吃面猫

```text
Use case: style-transfer. Asset type: tiny mobile ledger category sticker. Input image is the character and drawing-style reference. Create ONE new pose of this exact cute white calico cat with orange/yellow patches, wide oval head, tiny pink nose and chunky irregular black pen outlines with subtle marker texture. Preserve character identity and handmade sticker style. Remove the crown and red rays. Dining category: happy cat eating noodles from one small warm orange bowl, holding chopsticks, eyes joyfully closed. Show head, little paws and bowl in a compact arrangement. Center the complete sticker on a square canvas with about 8% transparent padding. Actual transparent alpha background, no paper rectangle, no checkerboard pattern, no cast shadow, no text or letters. Keep shapes simple, bold and readable at 36 pixels, one cat and only the specified prop, no additional decorations. This is an adapted drawing, not a photoreal image.
```

### 交通：乘车猫

```text
Use case: style-transfer. Asset type: tiny mobile ledger category sticker. Input image is the character and drawing-style reference. Create ONE new pose of this exact cute white calico cat with orange/yellow patches, wide oval head, tiny pink nose and chunky irregular black pen outlines with subtle marker texture. Preserve character identity and handmade sticker style. Remove the crown and red rays. Transport category: happy cat peeking out of the large front window of a tiny sky-blue train, with two simple round headlights and two short rail strokes beneath. Cat face dominates the compact train icon, cheerful going-out expression. Center the complete sticker on a square canvas with about 8% transparent padding. Actual transparent alpha background, no paper rectangle, no checkerboard pattern, no cast shadow, no text or letters. Keep shapes simple, bold and readable at 36 pixels, one cat and only the specified prop, no additional decorations. This is an adapted drawing, not a photoreal image.
```

### 日用品：纸巾猫

```text
Use case: style-transfer. Asset type: tiny mobile ledger category sticker. Input image is the character and drawing-style reference. Create ONE new pose of this exact cute white calico cat with orange/yellow patches, wide oval head, tiny pink nose and chunky irregular black pen outlines with subtle marker texture. Preserve character identity and handmade sticker style. Remove the crown and red rays. Daily supplies category: happy cat holding a small mint-green tissue box with a single large white tissue sticking up; head and little paws behind the box, simple cozy expression. The box is clearly a tissue box, not a gift. Center the complete sticker on a square canvas with about 8% transparent padding. Actual transparent alpha background, no paper rectangle, no checkerboard pattern, no cast shadow, no text or letters. Keep shapes simple, bold and readable at 36 pixels, one cat and only the specified prop, no additional decorations. This is an adapted drawing, not a photoreal image.
```

### 其他：思考猫

```text
Use case: style-transfer. Asset type: tiny mobile ledger category sticker. Input image is the character and drawing-style reference. Create ONE new pose of this exact cute white calico cat with orange/yellow patches, wide oval head, tiny pink nose and chunky irregular black pen outlines with subtle marker texture. Preserve character identity and handmade sticker style. Remove the crown and red rays. Other expenses category: curious cat tilting its big head, one small paw touching its cheek in a thinking pose, eyes looking up, one small orange question mark above one ear. No other props. Compact composition. Center the complete sticker on a square canvas with about 8% transparent padding. Actual transparent alpha background, no paper rectangle, no checkerboard pattern, no cast shadow, no text or letters. Keep shapes simple, bold and readable at 36 pixels, one cat and only the specified prop, no additional decorations. This is an adapted drawing, not a photoreal image.
```
