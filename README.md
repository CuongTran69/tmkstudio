# 1ForAll — TMK Studio Showcase

Website portfolio tĩnh giới thiệu 7 ứng dụng Apple của TMK Studio (Trần Cường).

## Mở web

```bash
open web/index.html
```

Không build, không backend. Tailwind qua CDN.

## Cấu trúc

```
web/
  index.html          # toàn bộ UI
  assets/js/app.js    # data APPS_DATA + i18n + filter + modal + demo
  assets/css/style.css
  assets/icons|banners|screens|fonts
docs/specs/           # spec tham khảo các app iOS (không phải code chạy được)
```

## Ghi chú

- Song ngữ VI/EN qua `data-i18n` + `data-app-field` (tagline, shortDesc).
- Modal dùng `<dialog>`, clipboard có fallback `execCommand`.
- Font DFVN Basteleur đã được wired (`@font-face`, class `.font-display`).
