# 页面与设置导航猫咪图标

用户于 2026-09-17 提供目标位置截图及参考图。使用内置 `image_gen` 提取或重绘透明背景素材，不是逐像素裁切；红圈和界面元素不进入资源。

| 用途 | 透明母版 | 应用资源 |
| --- | --- | --- |
| 设置底部导航 | `design/generated/cat-tab-settings-master.png` | `src/assets/cat-tab-settings.png` |
| 首页空状态 | `design/generated/cat-empty-cloud-master.png` | `src/assets/cat-empty-cloud.webp` |
| 账单空状态 | `design/generated/cat-empty-bills-master.png` | `src/assets/cat-empty-bills.webp` |
| 统计空状态 | `design/generated/cat-empty-stats-master.png` | `src/assets/cat-empty-stats.webp` |
| 设置页本地数据提示 | `design/generated/cat-settings-privacy-master.png` | `src/assets/cat-settings-privacy.webp` |

设置导航应用图为 192 × 192 PNG；页面插图裁去外部透明空白后缩放为最大 560 × 320 的 WebP，并保留透明通道。各位置按用户确认顺序逐项接入。

## 内置工具完整提示词

### settings-tab

```text
Use case: background-extraction
Asset type: bottom navigation icon master for the mobile ledger tab 设置
Input images: Image 1 is the sole edit target and authoritative source.
Primary request: Remove only the plain white exterior background from Image 1 and preserve the original sticker itself as faithfully as possible: the exact small calico cat rapidly typing, gray monitor at left, gray keyboard, black motion strokes, and yellow desktop.
Composition/framing: keep the exact original crop, placement, proportions, pose, line thickness, slightly blurry low-resolution hand-drawn texture, colors, and all visible objects. Center the unchanged complete sticker on a square canvas with minimal transparent padding.
Constraints: genuine transparent alpha background. Do not redraw, beautify, clean up, sharpen, upscale-detail, restyle, recolor, reinterpret, add, remove, resize individual parts, or repair anything. Keep the original uneven black lines and original facial expression exactly recognizable. Remove no white area enclosed inside the cat or objects. No checkerboard, white rectangle, text, shadow, border, logo, watermark, or extra objects. Output only the original sticker with the background cut out.
```

### home-empty

```text
Use case: background-extraction
Asset type: mobile ledger home empty-state illustration
Input images: Image 2 is the sole edit target and authoritative source. Image 1 is only the UI placement screenshot and must not be included.
Primary request: Remove only the plain white exterior background from Image 2 and preserve the original sticker exactly: the small white-and-orange calico cat wrapped in the front white cloud, with the larger white cloud outlined in blue behind it, both original tiny faces, the single small black motion mark, and every original hand-drawn line.
Composition/framing: keep the original crop, placement, proportions, pose, line thickness, slightly blurry low-resolution texture, colors, and spacing. Center the unchanged complete sticker on a square canvas with minimal transparent padding.
Constraints: genuine transparent alpha background. Do not redraw, beautify, clean up, sharpen, upscale-detail, restyle, recolor, reinterpret, add, remove, resize individual parts, repair, or change either face. Preserve the original uneven black and blue lines exactly. Keep all white areas inside both clouds and the cat opaque white. No checkerboard, white rectangle, text, Z letters, shadow, border, logo, watermark, red annotation, or UI. Output only the original sticker with its white exterior background cut out.
```

### bills-empty

```text
Use case: background-extraction
Asset type: mobile ledger bills empty-state illustration
Input images: Image 2 is the sole edit target and authoritative source. Image 1 is only the UI placement screenshot and must not be included.
Primary request: Remove only the plain white exterior background from Image 2 and preserve the original sticker exactly: the small horizontally lying white calico cat, orange patch over the left ear, round golden-orange patch on the right cheek, tiny black eyes and smiling U-shaped mouth, two whisker strokes on the left, tiny paw below, and curled black tail mark on the right.
Composition/framing: keep the original crop, placement, horizontal proportions, pose, line thickness, slightly blurry low-resolution texture, colors, and spacing. Center the unchanged complete sticker on a square canvas with minimal transparent padding.
Constraints: genuine transparent alpha background. Do not redraw, beautify, clean up, sharpen, upscale-detail, restyle, recolor, reinterpret, add, remove, resize individual parts, repair, or change the face. Preserve every original uneven black line exactly, including the tiny paw and curled tail. Keep the white cat body opaque white. No checkerboard, white rectangle, text, Z letters, bed, pillow, shadow, border, logo, watermark, red annotation, or UI. Output only the original sticker with its white exterior background cut out.
```

### stats-empty

```text
Use case: background-extraction
Asset type: mobile ledger statistics empty-state illustration
Input images: Image 2 is the sole edit target and authoritative source. Image 1 is only the UI placement screenshot and must not be included.
Primary request: Remove only the plain white exterior background from Image 2 and preserve the original sticker exactly: four small cheerful cats crowded inside the blue hand-drawn shopping basket/cart, including the yellow cat at left, the orange-and-gray calico cat at upper right, the gray cat at lower right, the smaller orange-and-white cat in front, the red-and-blue handle behind them, blue basket grid, and all four small red wheels.
Composition/framing: keep the original crop, placement, proportions, poses, line thickness, slightly blurry low-resolution texture, colors, overlap order, and spacing. Center the unchanged complete sticker on a square canvas with minimal transparent padding.
Constraints: genuine transparent alpha background. Do not redraw, beautify, clean up, sharpen, upscale-detail, restyle, recolor, reinterpret, add, remove, resize individual parts, repair, or change any face. Preserve every original uneven black, blue, and red line exactly. Keep white areas inside the cats and cart opaque white. No checkerboard, white rectangle, text, shadow, border, logo, watermark, red annotation circle, or UI. Output only the original sticker with its white exterior background cut out.
```

### settings-privacy

```text
Use case: background-extraction
Asset type: mobile ledger settings privacy-banner illustration
Input images: Image 2 is the sole edit target and authoritative source. Image 1 is only the UI placement screenshot and must not be included.
Primary request: Remove only the plain white exterior background from Image 2 and preserve the original sticker exactly: the small white calico cat with orange patch over the left ear, round golden-orange patch on the right cheek, red bow on its head, red pen held upright at the left, and pale-yellow square note with the original small smiling cat face held in front.
Composition/framing: keep the original crop, placement, proportions, pose, line thickness, slightly blurry low-resolution texture, colors, overlap order, and spacing. Center the unchanged complete sticker on a square canvas with minimal transparent padding.
Constraints: genuine transparent alpha background. Do not redraw, beautify, clean up, sharpen, upscale-detail, restyle, recolor, reinterpret, add, remove, resize individual parts, repair, or change either face. Preserve every original uneven black line exactly, including the pen, bow, paws, note face, whiskers, and thin body lines. Keep white cat areas and the pale-yellow note opaque. No checkerboard, white rectangle, text, shadow, border, logo, watermark, red annotation circle, or UI. Output only the original sticker with its white exterior background cut out.
```
