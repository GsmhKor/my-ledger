# 首页绣球花猫咪背景

- 来源：用户在 2026-09-05 提供的金额卡片设计图，蓝色绣球花、绿色枝叶与猫咪。
- 工具：内置 `image_gen`，以附件为编辑目标，移除标题、三个 ¥0、圆点和分隔线，补齐纸张背景；属于 AI 编辑/改绘。
- 母版：`design/generated/balance-hydrangea-master.png`。
- 应用资源：`src/assets/balance-hydrangea.png`，使用现有 sharp 缩放至 1200px 宽并压缩 PNG。
- 图片保留完整颜色；由首页 CSS 的 `opacity: .5` 设置 50% 不透明度，仅作用于背景图。
- 真实标题和动态金额由 React 渲染，不写入图片；文字衬底使用 86% 不透明度的卡片主题底色。
- `scripts/generate-icons.mjs` 包含该背景的重建步骤；本轮只生成此资源。
- 后续修补：用户指出下部中央猫咪脸旁黑色小方块。整图编辑未消除，改为放大局部用内置 image_gen 清理，仅将原图坐标 (773, 745) 的 16 × 17 像素区域合成回母版，周围图案沿用原图；应用 PNG 随母版重新生成。

## 内置工具完整提示词

```text
Use case: precise-object-edit. The attached image is the edit target: a watercolor blue hydrangea and cute orange cat illustrated ledger balance card. Create a clean BACKGROUND ASSET for this same card. Remove ALL Chinese lettering (本月结余, 本月支出, 本月收入), ALL currency signs and ALL digits including the three ¥0 amounts, the two colored bullet dots, and the thin horizontal and vertical divider lines. Inpaint those areas seamlessly with the original warm ivory watercolor paper texture. Preserve the blue hydrangea border, green leaves, rounded cream card edge, bee-costumed cat at middle-left, angel cat with bag at middle-right, and small dancing cats along the lower portion. Keep their hand-painted character and original positions as closely as possible; do not substitute new characters. Leave generous quiet blank space at upper-middle for a live balance label and amount, and at lower-left and lower-right for live expense/income figures. Crop away the large white exterior margins so the decorative rounded card almost fills the landscape canvas, preserving the full floral frame without cutting off flowers. Opaque warm ivory background, full-strength original art colors (the app will apply 50% opacity itself). No transparency checkerboard, no new words/numbers, no mockup device, no shadows outside the card. Output just the finished background illustration, landscape approximately 3:2.
```


## 黑色方块局部清理提示词

```text
Use case: precise-object-edit. In this close-up watercolor cat illustration REMOVE THE SOLID BLACK SQUARE immediately to the right of the brown smiling mouth and just left of the big yellow-orange ear. It is the obvious black rectangular block at approximately x=450..510,y=220..290 of this 900x690 crop. Replace the entire black rectangle with the SAME warm off-white watercolor texture as the adjacent cat cheek below it. There should be NO black mark whatsoever there when finished. Preserve the two small BROWN eyes, BROWN W-shaped mouth, BROWN triangular forehead outline, yellow-orange ears, blue flowers, and all surrounding paper texture. No new line or object is needed in place of the square, just blank off-white cheek. Keep exactly the same framing, proportions and layout so this edited crop can be placed back into its original image. Output only the corrected image.
```