# 1ForAll — TMK Studio Showcase

Website portfolio tĩnh giới thiệu 7 ứng dụng Apple của TMK Studio (Trần Cường).

## Mở web

```bash
open index.html
```

Không build, không backend. Tailwind qua CDN.

## Cấu trúc

```
index.html                  # Toàn bộ UI showcase landing page
404.html                    # Trang fallback 404
_headers                    # Tối ưu Cache-Control & bảo mật trên Cloudflare Pages
assets/
  js/app.js                 # Data APPS_DATA + i18n + filter + modal + demo
  css/style.css             # Font face & custom animations
  icons/                    # Logo, app icons
  banners/                  # Banner header các app
  screens/                  # Screenshot app
  fonts/                    # DFVN Basteleur fonts
docs/
  PORTFOLIO_OVERVIEW.md     # Tổng hợp công khai ý tưởng + kiến trúc 7 app
```

## Ghi chú

- Song ngữ VI/EN qua `data-i18n` + `data-app-field` (tagline, shortDesc).
- Modal dùng `<dialog>`, clipboard có fallback `execCommand`.
- Font DFVN Basteleur đã được wired (`@font-face`, class `.font-display`).
- Sẵn sàng deploy trực tiếp lên **Cloudflare Pages** (Output directory: `/`).

