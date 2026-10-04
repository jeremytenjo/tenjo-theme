# Markdown Preview Color Test

This paragraph should appear bright and easy to read in the **rendered preview**.
The source editor should keep its existing Tenjo syntax colors.

## Second-level heading

Normal body text includes a [link](https://code.visualstudio.com/docs/languages/markdown) and some `inline code`.

### Third-level heading

- First bullet item
- Second bullet item with **bold** and *italic* text

1. First numbered item
2. Second numbered item

> This is a blockquote for comparing its text with the surrounding paragraphs.

| Element | What to check |
| --- | --- |
| Headings | Bright text |
| Paragraphs and lists | Bright text |
| Source editor | Original syntax colors |

```js
const previewColor = '#eeffff';
console.log(previewColor);
```
