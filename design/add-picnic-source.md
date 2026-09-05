# 首页记一笔：野餐猫背景

- 来源：用户提供的猫咪野餐插画，包含红色花朵、樱桃、野餐篮与黄色格纹布。
- 使用内置 `image_gen` 编辑/改绘，去掉全部「THANK YOU!」及「@RmRint」文字，整理为约 2:1 横向背景。
- 母版：`design/generated/add-picnic-master.png`。
- 应用资源：`src/assets/add-picnic.png`，sharp 缩放至 480px 宽并压缩 PNG。
- 首页「记一笔」背景透明度 40%，即 CSS 不透明度 `opacity: .6`；加号与按钮文字保持不透明。
- 保留按钮尺寸与点击行为；背景采用 cover 居中，窄屏圆形按钮会裁去左右部分装饰。
- 仅首页按钮使用该图，其他标签页沿用原按钮背景。
- `scripts/generate-icons.mjs` 已加入该背景重建步骤；本次只生成这一张资源。

## 内置工具完整提示词

```text
Use case: precise-object-edit. Edit the attached hand-drawn picnic cat illustration into a small mobile button background asset. Remove ALL English lettering and the entire signature/handle below the picture: 'THANK YOU!' and '@RmRint' and any other letters. Remove the now-empty lower text margin. Preserve the original white cat with yellow cheek patches, red cherries above its head, picnic basket on the right, yellow checked picnic cloth, green leaves and tall red flowers. Keep the charming uneven hand-drawn lines and original colors; do not add new objects, text, logos or signatures. Create a compact landscape composition about 2:1 by extending warm off-white paper modestly at the sides if needed, with the complete main cat and picnic scene centered and minimal blank margins. Background is uniform warm ivory, NOT a checkerboard. Preserve the recognizable central cat at small button size. Output only the clean background illustration at full color strength; the app will separately set 40% transparency, so do not fade the art in the image.
```