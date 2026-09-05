# 宠物分类猫咪图标

- 来源：用户在 2026-09-05 会话附上的猫咪贴纸页，选用左上角的皇冠猫。
- 处理方式：内置 `image_gen` 工具，以附件为编辑目标制作透明背景单图。这是 AI 提取/重绘结果，不是逐像素原图裁切。
- 母版：`design/generated/cat-pet-master.png`。
- 应用资源：`src/assets/cat-pet.png`（192 × 192，保留透明通道）。
- `npm run icons` 使用现有 sharp 流程缩放压缩母版，可重建应用资源；不依赖生成工具的外部保存路径。
- 使用位置：记账分类选项、首页/账单记录行、统计分类图例。原生分类筛选下拉框使用猫脸 emoji；分类 id 仍为 `pet`。

## 内置工具的完整提示词

```text
Use case: background-extraction. Input image 1 is the edit target: a sheet of hand-drawn calico cat stickers. Extract ONLY the upper-left sticker: the smiling white calico cat head with orange patches, black hand-drawn outlines, raised paw, and the small yellow crown with red celebratory rays above it (roughly x=125..275, y=75..215 of the supplied 1536x1024 sheet). Preserve that specific cat's expression, uneven pen lines, orange/yellow colors, crown and pose as closely as possible. Remove all other stickers and the white paper background. Output one isolated cat sticker centered on an ACTUAL transparent alpha background, no white rectangle, no checkerboard drawn into the image, no text, no shadow. Crop composition close to the sticker with about 8% transparent padding, square image. This is a small pet-category icon for a mobile ledger app; keep the complete crown, paw and cat head visible. Do not invent extra objects or change to 3D/vector style.
```
