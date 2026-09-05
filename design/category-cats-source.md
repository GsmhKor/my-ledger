# 支出分类猫咪图标

本次按用户提供的三张单图，使用内置 `image_gen` 提取/改绘；不是逐像素原图裁切。
日用品使用图 1 的黄色卷发猫（含梳子和剪刀），餐饮使用图 2 的喷火猫，其他使用图 3 的受撞猫并去掉全部「dong」文字。
保留分类 ID，分类名和原生筛选下拉框的 emoji 不变；记账选项、首页/账单行和统计图例继续共用现有图片映射。

| 用途 | 透明母版 | 应用资源 |
| --- | --- | --- |
| 日用品 | `design/generated/cat-daily-master.png` | `src/assets/cat-daily.png` |
| 餐饮 | `design/generated/cat-food-master.png` | `src/assets/cat-food.png` |
| 其他支出 | `design/generated/cat-other-master.png` | `src/assets/cat-other.png` |

内置工具生成透明图片（其他图标追加一次去背景），sharp 裁去外围透明留白、补边并缩放为 192 × 192 PNG。
仅重建上述三张资源；现有 `scripts/generate-icons.mjs` 已包含它们，不需要更改重建脚本。
交通和金丝熊的现用素材另见 `transport-navigation-cats-source.md` 和 `cat-pet-source.md`。

## 内置工具完整提示词

### daily

```text
Use case: precise-object-edit. The three attached images are edit targets for three separate mobile ledger category icons. For this request output ONLY the specified target below. Faithfully preserve the original sticker's uneven black hand-drawn outlines, colors, pose, proportions and expression. Isolate the complete sticker centered on a square canvas with 7 percent padding. Use actual transparent alpha if available; otherwise a uniform pure white background. NEVER draw a checkerboard, shadows, watermarks or additional characters. Keep all internal white cat fur opaque white, with no pattern. Use IMAGE 1: the smiling white calico cat with a huge fluffy YELLOW curly hairstyle, orange cheek patches, pink comb floating at upper left and blue scissors at upper right. Keep the full hair, comb and scissors, tiny neck/body strokes and the little black motion lines. Do not replace this with a tissue cat or add any letters.
```

### food

```text
Use case: precise-object-edit. The three attached images are edit targets for three separate mobile ledger category icons. For this request output ONLY the specified target below. Faithfully preserve the original sticker's uneven black hand-drawn outlines, colors, pose, proportions and expression. Isolate the complete sticker centered on a square canvas with 7 percent padding. Use actual transparent alpha if available; otherwise a uniform pure white background. NEVER draw a checkerboard, shadows, watermarks or additional characters. Keep all internal white cat fur opaque white, with no pattern. Use IMAGE 2: the white calico cat breathing a large flame to the RIGHT, the flame has red outer shape, orange middle and bright yellow center, with tiny paws/body below the wide face. Keep this precise funny fire-breathing cat pose and full flame. No food bowl, chef hat or other objects. No letters.
```

### other

```text
Use case: precise-object-edit. The three attached images are edit targets for three separate mobile ledger category icons. For this request output ONLY the specified target below. Faithfully preserve the original sticker's uneven black hand-drawn outlines, colors, pose, proportions and expression. Isolate the complete sticker centered on a square canvas with 7 percent padding. Use actual transparent alpha if available; otherwise a uniform pure white background. NEVER draw a checkerboard, shadows, watermarks or additional characters. Keep all internal white cat fur opaque white, with no pattern. Use IMAGE 3: the wide white calico cat with orange side patches, squeezed-shut eyes, small dot mouth, two tiny body lines, and the impact motion arcs and little pale puff above the head. REMOVE the entire word 'dong' above the cat; replace its area with empty background. Preserve the cat, puff and impact arcs, but no text or letters anywhere.
```

### 其他图标透明背景修正

```text
Use case: background-extraction. Remove only the solid white exterior background of this exact cat sticker, replacing it with actual transparent alpha pixels. Preserve the opaque white face inside the black outline and the pale puff at upper left. Preserve all black impact arcs, eyes and body lines, orange patches, proportions and framing. Seal tiny accidental gaps in the outer cat-head outline as needed so the white face remains opaque. Keep the area where dong was removed empty: NO words, letters or extra shapes. Output RGBA PNG with a genuinely transparent background, NOT a white rectangle and NOT a checkerboard painting. Do not redraw the character.
```