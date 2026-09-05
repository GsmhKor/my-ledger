# 金丝熊分类猫咪图标

- 来源：用户在 2026-09-05 附图红圈指定的猫咪，位于第三行最右侧，戴粉色彩点蝴蝶结。
- 处理：内置 `image_gen` 参考附件提取/改绘，并修正身体轮廓；不是逐像素原图裁切。
- 工具输出仍带不透明格子，沿用项目 sharp 连通浅色背景去除方式制作透明母版，保留封闭轮廓内的白色。
- 母版：`design/generated/cat-pet-master.png`；应用：`src/assets/cat-pet.png`（192 × 192）。
- 替换原皇冠猫；现有 `npm run icons` 可从新母版重建。本轮只生成该分类资源。
- 名称改为「金丝熊」，分类 ID 仍为 `pet`；记账选项、账单行和统计图例共用图标。
- 原生分类筛选下拉框仍使用猫脸 emoji 和分类文字。

## 内置工具提示词

首次提取：

```text
Use case: background-extraction. Input image 1 is the edit target: the user attached 1536x1024 sheet of hand-drawn calico cat stickers with a red circle. Extract ONLY the sticker inside the red circle at the far right of the third row, roughly x=1250..1410, y=405..545: the smiling white calico cat with orange patches, closed happy eyes, tiny upper body and arms, wearing a huge hot-pink bow with yellow, blue and white polka dots. Preserve this specific cat's expression, pose, proportions, uneven black pen lines, bow shape and colors as closely as possible. Remove the red annotation circle, every other sticker and the white paper background. Output one isolated complete sticker centered on an ACTUAL transparent alpha background, no white rectangle, no checkerboard painted into the image, no text, no shadow. Square image, close composition with about 8% transparent padding. Preserve the opaque white cat face and body. Do not add a crown, hamster, extra objects, 3D shading or vector styling. This is a small category icon for a mobile ledger app.
```

轮廓与背景修正：

```text
Use case: background-extraction. Edit the attached single bow cat image. Keep the pink polka-dot bow, orange patches, opaque white face and body, black outlines, smile and pose unchanged. Remove the entire gray-and-white CHECKERBOARD currently painted into the background and visible beside the cat; replace it with REAL TRANSPARENT ALPHA PIXELS, not a drawing of transparency. Also remove checkerboard in the small areas outside the face and between arms and body. Preserve opaque white areas inside the cat. Close the bottom of the white torso naturally between the two lower black lines so the body stays opaque. Output a single PNG with actual alpha transparency, centered square, about 8% padding around the full figure. NO checkerboard pattern, NO white background, NO shadows, NO extra elements.
```