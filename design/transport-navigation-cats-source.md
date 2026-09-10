# 交通与底部导航猫咪图标

- 来源：用户 2026-09-05 提供的两张带红圈贴纸图。
- 交通采用图 1 右下角的飞机猫及粉色猫脸太阳；分类 ID 保持 `transport`。
- 首页、账单、统计依次采用图 2 右侧红圈内从上到下的三只厨师猫，设置图标不变。
- 使用内置 `image_gen` 提取/改绘，属于 AI 重绘，不是原图逐像素裁切。
- 首次生成带格子背景，随后用内置工具清理成纯白背景；用 sharp 去除连通外背景并缩放。
- 为保留手绘轮廓内的白色，去背景时临时闭合小缺口，再恢复外轮廓边缘。
- 母版保存透明背景；`scripts/generate-icons.mjs` 已加入导航资源缩放条目，本轮未运行全量图标脚本。

| 用途 | 透明母版 | 应用资源 |
| --- | --- | --- |
| 交通 | `design/generated/cat-transport-master.png` | `src/assets/cat-transport.png` |
| 首页 | `design/generated/cat-tab-home-master.png` | `src/assets/cat-tab-home.png` |
| 账单 | `design/generated/cat-tab-bills-master.png` | `src/assets/cat-tab-bills.png` |
| 统计 | `design/generated/cat-tab-stats-master.png` | `src/assets/cat-tab-stats.png` |

应用 PNG 为 192 × 192，导航显示为 34 × 34 CSS 像素，保留原导航文字和选中文字颜色。
交通新母版替换原乘车猫；旧 `category-cats-source.md` 中的交通生成过程仅代表旧素材来源。

## 账单导航猫毛色修正（2026-09-10）

- 用户指出首页底部「账单」上方的厨师猫毛色与样本不符。
- 以内置 `image_gen` 对现有高分辨率母版做局部改绘：只将左右两侧毛色统一为样本中的金橙色，保留帽子、蓝色帽纹、表情、爪子、黑色线条、黄色底座与橙红边缘。
- 工具输出将透明背景画成了实体棋盘格；随后沿用项目的连通背景清理思路，用 sharp 从画布边缘移除中性灰网格并恢复真实 alpha，内部白色猫脸、帽子和爪子保持不透明。
- 已替换 `design/generated/cat-tab-bills-master.png`，由现有生成脚本重建 `src/assets/cat-tab-bills.png`。

### 毛色修正提示词

```text
Use case: precise-object-edit
Asset type: bottom navigation icon master for the mobile ledger tab 账单
Input images: the large square high-resolution chef-cat image is the edit target; the user's small white-background chef-cat image is the authoritative color reference; the small transparent 192px icon is context only.
Primary request: Change ONLY the calico fur patches on the chef cat so both the left ear/cheek patch and the right cheek/ear patch match the same warm golden-orange fur color shown in the user's reference image. Remove the current mismatch where the left patch is dark orange and the right patch is yellow.
Constraints: preserve the exact existing high-resolution edit target's cat shape, pose, proportions, facial expression, paws, uneven black hand-drawn outlines, chef hat, two blue hat stripes, yellow cushion/base, orange-red outer edge, crop, scale, and transparent background. Do not recolor the yellow cushion or orange-red edge. Do not redraw, add, remove, or reposition anything. No text, checkerboard, white rectangle, shadow, or watermark. Output a genuinely transparent RGBA PNG.
```

### 去背景提示词

```text
Use case: background-extraction
Asset type: bottom navigation icon master for the mobile ledger tab 账单
Input images: Image 1 is the sole edit target, the recolored chef-cat image with a gray checkerboard behind it.
Primary request: Remove ONLY the entire gray checkerboard exterior background and replace it with genuinely transparent alpha pixels.
Constraints: preserve the chef cat, both matching warm golden-orange fur patches, chef hat and blue stripes, facial expression, paws, all uneven black outlines, yellow cushion/base, orange-red outer edge, exact colors, proportions, crop, and scale unchanged. Keep all white areas inside the cat and chef hat opaque white. Do not redraw or recolor anything. No visible checkerboard, white rectangle, text, shadow, or watermark. Output an RGBA PNG with actual transparency.
```

## 内置工具完整提示词

### transport

```text
Use case: background-extraction. The two input images are edit targets: user supplied hand-drawn cat sticker sheets with red annotations. Extract only the SPECIFIED SINGLE STICKER below, faithfully preserving the original uneven black pen lines, pose, expression, colors and proportions. Remove all red annotations and every other sticker. Output one centered sticker on a REAL transparent alpha background, never a painted checkerboard, no text or added objects, no shadows, no 3D/vector restyling. Opaque white within cat/hat/airplane must remain opaque. Square canvas with about 6 percent padding, tight enough to be legible as a small mobile app icon. From IMAGE 1, the circled sticker at the bottom right (roughly x=950..1275,y=790..1015 of 1536x1024): a happy white calico cat riding on a white airplane with a light-blue stripe, nose pointing left, tail at right, large wing extending down; include the small pink cat-faced sun above-left of the airplane. Preserve this rightmost airplane cat specifically, not the adjacent left airplane cat.
```

### tab-home

```text
Use case: background-extraction. The two input images are edit targets: user supplied hand-drawn cat sticker sheets with red annotations. Extract only the SPECIFIED SINGLE STICKER below, faithfully preserving the original uneven black pen lines, pose, expression, colors and proportions. Remove all red annotations and every other sticker. Output one centered sticker on a REAL transparent alpha background, never a painted checkerboard, no text or added objects, no shadows, no 3D/vector restyling. Opaque white within cat/hat/airplane must remain opaque. Square canvas with about 6 percent padding, tight enough to be legible as a small mobile app icon. From IMAGE 2, the FIRST/TOP sticker inside the tall red outline in the rightmost column (roughly x=975..1185,y=15..200): the calico chef cat with orange patch on the left and gray patch on the right, white chef hat with short blue marks, happy face with tongue sticking out, tiny paws together, sitting behind a bright yellow toast slice with orange crust. Only this first chef cat and its toast.
```

### tab-bills

```text
Use case: background-extraction. The two input images are edit targets: user supplied hand-drawn cat sticker sheets with red annotations. Extract only the SPECIFIED SINGLE STICKER below, faithfully preserving the original uneven black pen lines, pose, expression, colors and proportions. Remove all red annotations and every other sticker. Output one centered sticker on a REAL transparent alpha background, never a painted checkerboard, no text or added objects, no shadows, no 3D/vector restyling. Opaque white within cat/hat/airplane must remain opaque. Square canvas with about 6 percent padding, tight enough to be legible as a small mobile app icon. From IMAGE 2, the SECOND/MIDDLE sticker inside the tall red outline in the rightmost column (roughly x=975..1185,y=210..405): the white-and-orange calico chef cat, white chef hat with short blue marks, gently smiling with closed eyes and small black U mouth, tiny paws together, sitting behind a bright yellow toast slice with orange crust. Preserve the second cat's two orange side patches and distinct peaceful smile. Only this second chef cat and its toast.
```

### tab-stats

```text
Use case: background-extraction. The two input images are edit targets: user supplied hand-drawn cat sticker sheets with red annotations. Extract only the SPECIFIED SINGLE STICKER below, faithfully preserving the original uneven black pen lines, pose, expression, colors and proportions. Remove all red annotations and every other sticker. Output one centered sticker on a REAL transparent alpha background, never a painted checkerboard, no text or added objects, no shadows, no 3D/vector restyling. Opaque white within cat/hat/airplane must remain opaque. Square canvas with about 6 percent padding, tight enough to be legible as a small mobile app icon. From IMAGE 2, the THIRD/BOTTOM sticker inside the tall red outline in the rightmost column (roughly x=975..1185,y=410..600): the light-gray chef cat, white chef hat with short blue marks, joyful closed eyes and open U mouth, tiny paws together, sitting behind a bright yellow toast slice with orange crust. Preserve the third cat's gray head and absence of orange face patches. Only this third chef cat and its toast.
```

### 四张图分别使用的清理提示词

```text
Use case: precise-object-edit. Clean up this sticker for asset production. Replace EVERY faint gray/white checkerboard square with uniform SOLID PURE WHITE (#ffffff). This includes checker patterns inside the cat face, chef hat and paws, and outside the sticker. The whole backdrop must be plain solid white, NOT a transparency visualization. Keep all original black outlines, colored patches, deliberate solid-gray fur patches, pose, expression, and objects exactly as they are. White faces, hats and plane surfaces must be opaque pure white without any pattern. Keep external outlines closed so later background extraction will preserve internal whites. No new details, no shadows, no text, no checkerboard anywhere. Preserve the current composition and size.
```
