# TMK Studio — Tổng quan Portfolio 7 App

> File tổng hợp công khai duy nhất, chắt lọc ý tưởng + kiến trúc + công thức cốt lõi
> từ tài liệu nội bộ của 7 ứng dụng. Không chứa secret, bundle ID, hay thông tin nhạy cảm.
> Cập nhật: 09/11/2026.

Website showcase của portfolio này nằm ở root (mở `index.html` là chạy).

---

## 1. Trạm Thiền Trà — Mindful Tea Journaling (iOS 16+, SwiftUI)

App thiền định qua nghi thức uống trà + nhật ký biết ơn, phong cách Việt (trà shan tuyết, giấy dó, thủy mặc).

**Hai nghi thức cốt lõi mỗi ngày:**
- **Tích luỹ** — ghi 1–3 điều biết ơn (mỗi field 300 ký tự), cùng ngày ghi lại thì ghi đè, streak +1/ngày, lỡ 1 ngày reset về 0.
- **Buông bỏ** — viết phiền não rồi xem nó tan như khói trà, **không lưu trữ** (privacy by design).

**Tính năng mở rộng:** Thiền Thở (vòng thở + âm thanh), Phòng Sám Hối (6 căn + kinh tụng), Trà Đêm (5 phase dẫn trước ngủ), Thư Gửi Tương Lai (niêm phong 1/3/6/12 tháng + notification mở phong + con dấu sáp), Khoảnh Khắc (photo journal), History (20 entry/lần, swipe-to-delete), Widget Small/Medium theo khung giờ.

**Điểm kỹ thuật đáng chú ý:**
- Nền động 6 khung giờ/ngày (gradient 3-stop + mist + glow, timer 30s, reduce-motion safe).
- SwiftData local-first (`GratitudeLog`, `FutureLetter`, `MomentLog`...), guest-first, login Apple chỉ để backup; sync retry 3 lần, last-write-wins theo ngày.
- Design system riêng: 8 component `Zen*` (Card/Button/TextField...), token màu trà, touch target 44pt, WCAG AA.
- MVVM: `App → Models → ViewModels → Views → Services → Utilities`.

---

## 2. Lời Xưa — Kho Ca Dao Việt (iOS 17+, SwiftUI)

App tra cứu + khám phá ca dao/tục ngữ/thành ngữ. Triết lý: vừa cảm xúc (daily, gieo quẻ) vừa hữu dụng lâu dài (search, giải nghĩa, trích nguồn).

**3 trụ cột:**
- **Daily Ritual** — 1 câu/ngày kiểu lịch ngày (âm/dương), TTS offline giọng Việt, copy nhanh + caption MXH 1 chạm.
- **Searchable Knowledge** — tìm kiếm **không dấu** ngay từ v1.0 (xử lý `đ/Đ`, dấu thanh), Scope Bar, Recent Searches, 15 chủ đề + 3 thể loại.
- **Endless Discovery** — Swipe Mode toàn màn hình, Share as Image (`ImageRenderer`, 9:16 Story / 1:1 Feed), câu liên quan.

**Điểm kỹ thuật đáng chú ý:**
- Thuật toán Daily deterministic: `dayNumber` từ epoch → Fisher–Yates với PRNG `SplitMix64` trên pool đã sort — mỗi câu xuất hiện đúng 1 lần/chu kỳ, offline, không trùng khi qua tháng/năm.
- Chuẩn hóa search: NFC → lowercase → `đ/Đ`→`d` thủ công → bỏ dấu → tính sẵn `normalizedText` lúc build/load (linear scan đủ cho ~5.000 câu).
- Dataset pipeline: JSON có `schemaVersion`/`datasetVersion`, validate chặn build (UUID unique, type/category hợp lệ, license đầy đủ), registry UUID + alias để favorites không mồ côi khi đổi ID.
- Gieo Quẻ (6 tâm nguyện + hạng quẻ + thiệp Story) và Zen Soundscape (3 âm tổng hợp bằng `AVAudioEngine`) làm bằng assets thuần, offline 100%.

---

## 3. Bus Chill — Bạn đồng hành xe buýt Hà Nội (iOS, offline-first)

App báo thức "ngủ quên" trên xe buýt: báo trước N trạm bằng geofence + countdown dự phòng + Live Activity + Apple Watch.

**Kiến trúc dữ liệu 2 tầng:**
- **Tầng tĩnh:** GTFS trong SQLite (GRDB) trên máy — tuyến, trạm, lịch trình; chỉ tải lại khi `contentHash` đổi. Mọi màn hình render được khi mất mạng.
- **Tầng động:** giờ khởi hành theo lịch, cache RAM/đĩa TTL 60s, chỉ gọi khi cần (mở tuyến yêu thích, bật báo thức, refresh widget).

**Điểm kỹ thuật đáng chú ý:**
- Báo thức = geofence ~250m tại "trạm báo" (`destIndex − leadStops`) + countdown theo giờ lịch làm lưới an toàn; chia ngân sách 20 vùng theo ưu tiên alarm > trip > board-watch > auto-check-in.
- Tên trạm resolve theo thứ tự `manual > OSM > GTFS gốc`, sống sót qua re-import.
- Nhật ký chuyến tự quy đổi tiền tiết kiệm (giá xe công nghệ − vé buýt) và CO₂ thành "rừng cây" (gamification xanh).
- Lịch sử tìm kiếm, chuyến đã lưu (tối đa 3, khớp khung giờ sáng/chiều/tối), cảnh báo chuyến chót, weather guard mưa bằng WeatherKit.

---

## 4. TypeMate — Text Expander cho macOS (macOS 14+, Swift)

Text expander native **chung sống an toàn với bộ gõ tiếng Việt** (Telex/VNI, OpenKey, EVKey). Hai cam kết: toàn vẹn văn bản lên trước (không chắc thì không can thiệp), trung thực về khả năng (bảng tương thích 4 trạng thái công khai).

**Tính năng chính:**
- Tự bung trigger (`;chao` + phím ngắt); Enter/Tab **chỉ reset buffer, không kích hoạt**; app lạ mặc định không bung (allowlist + denylist mật khẩu/Secure Input).
- Dán nhanh `⌥⌘V` kiểu Spotlight — tính năng dùng nhiều nhất, hoạt động cả khi tắt tự bung.
- Thư viện snippet (CRUD, linter trigger, biến ngày giờ, import/export JSON), thống kê tiết kiệm thời gian, gói nhóm `.typemate-pack` (preview diff, khóa sửa, rollback 5 bản).
- Safety Gate 3 trạng thái + hàng đợi tuần tự + file lỗi không bao giờ bị ghi đè (`.corrupt-*` + backup xoay vòng).

**Điểm kỹ thuật đáng chú ý:**
- Tách 2 bản build vì Guideline 2.4.5: bản App Store (sandbox, chỉ ⌥⌘V + copy) và bản DMG trực tiếp (đầy đủ event-tap), chung một codebase bằng cờ build.
- Pipeline engine: EventTap → buffer → matcher → SafetyGate → planner → inject (phím/Clipboard), abort khi có race/focus-drift.
- Module `Core` thuần Swift, không phụ thuộc UI — test được trên Linux (47 test lõi).

---

## 5. Cất Link — Save-for-do (iOS 17+, Swift 6, SwiftData)

Biến link lưu từ TikTok/Instagram/Safari... thành việc làm đúng thời điểm. Câu hỏi cốt lõi khi lưu: *"Cất link này để làm gì?"* → chọn Ý định (Xem/Đọc/Mua/Đi/Làm/Gửi) + Thời điểm (Tối nay/Cuối tuần/Để sau).

**Tính năng chính:** Share Extension chụp nhanh 1 chạm, Hôm nay (inbox sắp xếp 5 tầng + nhãn "Lâu chưa mở"), Power Search 1 ô (intent/domain/#tag/text, rank title > domain > tag > note), Smart Reminder (quiet hours 22h–7h), Undo 4.5s, tự dọn link cũ, backup JSON/CSV, dedup khi share lại, Widget "Hôm nay".

**Điểm kỹ thuật đáng chú ý:**
- Share Extension **không chạm SwiftData** — chỉ ghi `CaptureDraft` JSON versioned vào App Group, app chính import idempotent khi active.
- `canonicalKey` (strip tracking, lowercase host) chống trùng + chống spam dán (3 lần/60s).
- State machine rõ ràng: active → completed/discarded, snooze giữ active, bulk delete destructive có confirm.
- Analytics on-device JSONL, hash domain, opt-out được — không server, không account.

---

## 6. Paletto — Color Palette Studio (iOS 16+, SwiftUI)

Trích xuất, tạo, quản lý và chia sẻ bảng màu. 4 tab: Extract (k-means từ ảnh + kính lúp), Camera (chấm màu trực tiếp), Library (search/tag/folder), Settings.

**Tính năng chính:**
- Trích xuất k-means (downsample 100×100, 20 vòng × 3 lần chạy), pixel cache thread-safe bằng CoreGraphics thuần.
- ColorRole + Auto Assign, contrast fix 1 chạm theo WCAG 2.2, animation preview (Pulsing/Hue Rotation/Breathing, tôn trọng Reduce Motion), Undo/Redo gộp 0.5s.
- Export 9 định dạng (SwiftUI/CSS/Tailwind/Kotlin/Flutter/SVG/HEX/JSON/PNG), share qua QR + URL scheme `paletto://`.
- Widget 3 slot × 3 size độc lập, AppIntent đổi palette ngoài Home Screen, deep link mở đúng palette.

**Điểm kỹ thuật đáng chú ý:**
- MVVM + 11 protocol service (dễ mock/test), storage 1 file JSON/palette + migration v1→v2, serial queue serialize I/O.
- So sánh màu bằng CIELAB, kiểm tra mù màu, ma trận contrast trong Detail.

---

## 7. Trang Trại Nhà Tôi — Sổ chăn nuôi offline-first (iOS 17+, SwiftUI)

Sổ trại cho hộ nuôi nhỏ (Vịt/Gà/Lợn). Triết lý: **ghi ít — tự tổng hợp — nhắc đúng việc — giải thích bằng câu đơn giản**, chữ to nút to cho bố mẹ ít tech.

**Tính năng chính:** đa trại/đa vật nuôi, lứa + sinh lịch việc theo profile loài, ghi chi tiêu 4 bước + ảnh phiếu, cân bán 2 pha Bì–Gộp từng lồng, chết & hao, cân mẫu, quyết toán có 3 cách hiểu số tiền (thực nhận/tổng trước trừ/chưa rõ) + so lệch 6 mục S1–S6, báo cáo 4 KPI + share Zalo 1 chạm, backup ZIP, nhập giọng nói on-device.

**Điểm kỹ thuật đáng chú ý:**
- Công thức tiền chỉ hiện khi đã đối chiếu; giá hòa vốn/kg để đàm phán giá bắt; so kg lệch >1% thì đỏ + gợi ý đối chất.
- Chi phí chung chia đều/nhập tay trong cùng trại; fingerprint chống trùng (cảnh báo, vẫn cho lưu).
- An toàn dữ liệu: snapshot SQLite mỗi ngày (giữ 5), restore dạng **gộp** (không xóa dữ liệu chỉ có trên máy), migration có backup trước.

---

## 8. Nguyên tắc chung của cả portfolio

1. **Local-first / offline-first** — mọi app chạy được khi mất mạng; server (nếu có) chỉ để backup/sync.
2. **Privacy by design** — không thu thập dữ liệu, không quảng cáo theo dõi; analytics (nếu có) tắt mặc định, opt-in, chỉ đếm sự kiện.
3. **Apple native** — Swift/SwiftUI, WidgetKit, Live Activity, App Intents, Dynamic Island; a11y (VoiceOver, Dynamic Type, Reduce Motion) là yêu cầu, không phải tùy chọn.
4. **Tiếng Việt trước** — search không dấu, TTS `vi-VN`, nội dung và UX gắn đời sống Việt.
5. **Không hardcode, có test** — hằng số gom một chỗ, logic thuần tách khỏi View để test được.

---

*Fam Diary (nhật ký gia đình) là app thứ 8 trên website showcase nhưng chưa có tài liệu tổng hợp — sẽ bổ sung sau.*
