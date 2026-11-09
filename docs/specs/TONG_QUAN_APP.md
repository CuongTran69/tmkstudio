# Lời Xưa (CaDaoViet) — Tài liệu tổng hợp toàn app

> File tổng hợp duy nhất từ 9 file docs: `README.md`, `PRODUCT_PLAN.md`, `FEATURES.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, `UX_FLOW.md`, `ROADMAP.md`, `CONTENT_STRATEGY.md`, `PLAN.md`. Cập nhật: 09/11/2026.

---

## 1. App là gì

**Lời Xưa** (tên kỹ thuật `CaDaoViet`) là app iOS giúp người Việt tiếp cận ca dao, tục ngữ, thành ngữ theo 3 cách:

1. **Daily Discovery** — mỗi ngày một câu hay (lý do mở app thường xuyên).
2. **Knowledge Library** — kho tra cứu có tìm kiếm, phân loại, giải nghĩa, nguồn trích dẫn.
3. **Exploration Experience** — khám phá ngẫu nhiên, theo chủ đề/thể loại/cảm hứng, câu liên quan.

Triết lý: tránh hai cực — không phải app quote đẹp nhưng nhanh chán, cũng không phải database khô khan. Vừa cảm xúc, vừa hữu dụng lâu dài.

Core value: *"Mỗi ngày khám phá một câu hay, khi cần thì tra cứu, khi tò mò thì tiếp tục khám phá văn hóa Việt."*

## 2. Đối tượng người dùng

| Nhóm | Nhu cầu | Yêu cầu thiết kế |
|---|---|---|
| Người trẻ (Gen Z, Millennials) | Caption, cảm hứng, thao tác vuốt/chạm nhanh | UI mượt, Share as Image, caption copy, Gieo quẻ |
| Người lớn tuổi | Đọc to rõ, không quảng cáo, lưu trữ tra cứu | Chữ to, contrast cao, TTS offline, hiệu năng máy cũ |
| Người làm nội dung / HSSV | Tra nghĩa chính xác, trích nguồn rõ | Meaning, origin, example, glossary, source+license |

6 jobs-to-be-done: Daily (thấy ngay câu đáng đọc) · Search (nhớ một phần câu, gõ không dấu) · Learn (biết nghĩa) · Explore (đọc thêm cùng chủ đề) · Save (giữ câu thích, không giới hạn) · Share (gửi cho người khác).

## 3. Ba trụ cột sản phẩm

- **Pillar A — Daily Ritual:** Daily Saying phong cách lịch ngày (dương/âm, thứ), ổn định cả ngày, chỉ lấy từ câu `dailyEligible` ưu tiên có meaning; TTS offline + Copy nhanh + peek/flip đổi câu; Widget (1.0.1), notification (1.1).
- **Pillar B — Searchable Knowledge:** Search không phân biệt hoa thường và **không dấu từ 1.0** (xử lý `đ/Đ`, dấu thanh); Scope Bar [Tất cả | Ca dao | Tục ngữ | Thành ngữ]; Recent Searches; filter type/category; Detail có meaning/source, hướng tới tra từ cổ (1.2).
- **Pillar C — Endless Discovery:** Swipe Mode toàn màn hình (ẩn TabBar, vuốt + nút Trước/Tiếp); Share text + Share as Image; TTS trên từng thẻ; Related sayings (đơn giản ở 1.0, thông minh ở 1.2).

Điểm khác biệt: typography tĩnh lặng (New York serif, không quảng cáo) · khai thác iOS 17 (`ImageRenderer`, `AppIntents`, `AVSpeechSynthesizer` offline) · trợ năng đa thế hệ · search không dấu xuất sắc · pháp lý minh bạch.

## 4. Điều hướng & màn hình (4 tab)

```
TabView
├── Hôm nay (Home): Daily Saying · Random + Peek · Favorite · Share · TTS · Copy
├── Khám phá (Explore): Search (dấu/không dấu) · Categories · Types · Swipe Mode · Recommended
├── Đã lưu (Favorites): danh sách yêu thích, search + filter trong list
└── Cài đặt (Settings): Theme · Nguồn nội dung/license/dataset version · About · Privacy
```

Không có welcome/onboarding screen ở MVP — giá trị hiện ngay trong 2 giây đầu.

## 5. Tính năng chi tiết

### 5.1. Home / Hôm nay
- **Daily Saying:** 1 câu/ngày, deterministic (xem mục 8), chỉ từ `dailyEligible`; phong cách lịch ngày tối giản; logic nằm trong `CaDaoCore` để widget cho cùng kết quả.
- **Random + Peek:** nút "Câu khác" hiệu ứng lật thẻ/peek, tránh lặp trong phiên, luôn có nút quay về câu Daily gốc.
- **TTS:** nút loa, `AVSpeechSynthesizer` locale `vi-VN`, offline hoàn toàn, Play/Pause.
- **Copy nhanh:** copy text + haptic `sensoryFeedback(.selection)` + toast "Đã sao chép vào bộ nhớ tạm". Có thêm **Copy caption MXH** (Bước 1 trong PLAN.md): format sẵn ngoặc kép + nguồn + ý nghĩa + hashtag `#loixua #cadaovietnam...`, 1 chạm đăng Facebook/Instagram/Threads.
- **Favorite:** tim bấm nhanh + haptic, persist local App Group, không giới hạn.
- **Share:** Share text qua `ShareLink` (giữ xuống dòng lục bát); Share as Image 1.0: `ImageRenderer` render thiệp 9:16 (Story) và 1:1 (Feed), thiết kế tối giản.

### 5.2. Gieo Quẻ Ca Dao — Oracle (đã xong, PLAN.md Bước 2)
Kế thừa bói Kiều/xin xăm, khoác áo "chữa lành": chọn 1 trong 6 tâm nguyện (Cầu An Yên · Tình Duyên · Công Danh · Gia Đạo · Đối Nhân · Tùy Duyên) → lắc máy/chạm ống thẻ tre → thẻ thơ bay ra lật mở → thẻ quẻ gồm hạng quẻ (Thượng Cát/Đại Cát/Bình Hòa/Khai Tâm) + câu thơ + Lời dặn tiền nhân 2–3 câu + Việc nên làm hôm nay + nút xuất thiệp Story/TikTok. Điểm vào: nút "Gieo quẻ" trên NavigationBar Home + banner vàng kim "GIEO QUẺ ĐẦU NGÀY".

### 5.3. Zen Soundscape (đã xong, PLAN.md Bước 3)
3 âm nền tổng hợp thủ tục, offline 100%: Mưa hiên vắng (pink noise) · Suối reo · Chuông thiền 432Hz. `ZenSoundscapeService` dùng `AVAudioEngine` + `AVAudioSourceNode`, tự ducking khi bật TTS. Điều khiển qua `ZenSoundscapeControlView` (chọn âm + slider volume), nút tai nghe trên Home và Swipe view.

### 5.4. Explore / Tìm kiếm & duyệt
- **Search:** không phân biệt hoa thường/dấu; Scope Bar; Recent Searches (xóa từng từ/toàn bộ); kết quả rút gọn tối đa 2 dòng + `...` + highlight từ khóa; ranking cụm > đầu câu > token; stress-test máy cũ Phase 4.
- **Categories (15 chuẩn):** tinh-yeu, gia-dinh, que-huong, dao-ly, ban-be-thay-tro, lao-dong, kinh-nghiem-nong-nghiep, hoc-tap, ung-xu, thoi-tiet, cham-biem, am-thuc-phong-tuc, lich-su-danh-nhan, triet-ly-cuoc-song, dong-dao-tuoi-tho (mỗi cái có name, mô tả, order, icon SF Symbol).
- **Types (3):** ca-dao (có vần điệu, tình cảm) · tuc-ngu (câu hoàn chỉnh, kinh nghiệm) · thanh-ngu (cụm cố định, đơn vị từ vựng).
- **Swipe Mode:** toàn màn hình, ẩn TabBar, vuốt lên = tiếp / vuốt xuống = lùi (giữ stack lịch sử phiên), nút Trước/Tiếp luôn hiện, TTS + Favorite + Share trên thẻ, VoiceOver actions, Reduce Motion → cross-fade, không lặp trong phiên.
- **Recommended:** 5–10 câu từ `dailyEligible`, xoay theo ngày bằng `DailyPicker`, loại trừ câu Daily hôm nay.

### 5.5. Saying Detail
Thứ tự: Type badge + Category chips → Text chính (giữ xuống dòng, New York serif, nền phẳng) → Action Bar (Nghe | Copy | Thích | Chia sẻ Text/Ảnh) → Meaning → Glossary/điển cố (1.2) → Region → Source + License (link gốc) → Related sayings. Related 1.0: cùng category (ưu tiên trùng nhiều nhất) rồi cùng type, loại trừ câu hiện tại, sắp xếp xác định; 1.2: keywords + variant group + tương đồng ngữ nghĩa.

### 5.6. Favorites (Đã lưu)
Sắp xếp mới nhất hoặc A–Z; search riêng trong list; filter chips theo type/chủ đề; vuốt trái xóa; giữ lâu mở context menu (Copy/Chia sẻ/Bỏ thích); empty state ấm áp; dataset đổi ID thì ánh xạ qua `id_aliases.json` không mất dữ liệu.

### 5.7. Settings
Appearance (System/Light/Dark + font Serif New York/Sans SF Pro) · Content (Nguồn nội dung, license, dataset version, thông báo CC BY-SA, xuất Favorites ra JSON/Text) · About (About/Privacy/Contact) · Ủng hộ/Pro (từ 1.2, chưa hiện ở 1.0).

### 5.8. Tính năng tương lai (PLAN.md Bước 4–6, chưa làm)
- **Bước 4 — Context Matcher:** tìm thơ theo ngữ cảnh thực tế (ảnh đồ ăn quê, chia tay, lười học...) + copy caption 1 chạm.
- **Bước 5 — Minigame Đố/Nối thơ:** nối vế lục bát, đoán nghĩa, tìm dị bản, danh hiệu Tú tài → Trạng nguyên.
- **Bước 6 — Lịch Tiết khí:** 24 tiết khí + lịch âm gắn ca dao thời tiết/nông vụ, nhắc theo ngày.

## 6. Lộ trình version

| Version | Nội dung |
|---|---|
| **1.0 (MVP)** | Daily + Random/peek, Search dấu/không dấu + Scope Bar + Recent, Categories/Types, Swipe Mode, Detail (meaning/origin/example/glossary/region/source/license + related đơn giản), TTS offline, Copy + haptic + toast, Caption MXH, Gieo quẻ, Zen Soundscape, Favorites không giới hạn (search/filter), Share text + Share as Image 1 template, Dark Mode + typography, trang Nguồn/license |
| **1.0.1** | Widget Small/Medium + Lock Screen `accessoryRectangular` + Interactive Widget (Đổi câu/Thích qua AppIntent) + StandBy, deep link `cadao://saying/<id>` |
| **1.1** | Daily local notification (interactive: Thích/Xem nghĩa), Share as Image nhiều template (giấy dó, sóng nước, gốm Bát Tràng, sen nhạt), iCloud KVS sync Favorites + xuất/nhập JSON |
| **1.2** | Collections + Reading history (SwiftData), Interactive Glossary popover, Core Spotlight, related thông minh (keywords/variant), ranking nâng cao, Tip Jar + Pro mua đứt (theme/template/widget đặc biệt, không khóa nội dung cốt lõi) |
| Future | CloudKit full sync, remote dataset update, community contribution, public API |

Tiêu chí 1.0 đạt: mở < 1.5s offline; search không dấu không khựng máy cũ; Daily + TTS mượt; copy/share image tức thì; favorites không giới hạn; ≥ 2.000 câu sạch có type/category/source/license; validate pass 100%; trang attribution đầy đủ; không crash iOS 17+; contrast ≥ 4.5:1. Sau phát hành đo retention D1/D7/D30, tỉ lệ share/copy, cài widget, favorites/user, rating, crash-free ≥ 99.5%.

Non-goals 1.0: không account, không backend, không comment/mạng xã hội, không AI-explanation on-device, không IAP, không public API.

## 7. Kiến trúc kỹ thuật

- **Stack:** Swift 5.9+, SwiftUI, iOS 17+ (`@Observable`, `ImageRenderer`, `AppIntents`; SwiftData từ 1.2), AVFoundation TTS, UserDefaults App Group (favorites 1.0) / `@AppStorage` settings / iCloud KVS (1.1), JSON bundle, XCTest, StoreKit 2 (1.2). Không dependency bên thứ ba ở 1.0.
- **Style:** MVVM nhẹ + Repository: View → ViewModel (`@Observable`) → Repository/Service (Search, Audio/TTS, DailyPicker, Favorite, Related) → Local JSON / UserDefaults / KVS / SwiftData.
- **Cấu trúc:** `App/` (App + Environment) · `CaDaoCore/` (package dùng chung app+widget: Models, Data JSON + Repository, Services, Utilities) · `Features/` (Home, Explore, Search, Discovery/Swipe, Favorites, SayingDetail, Share, ContentSources, Settings, + Oracle/Caption/Zen từ PLAN.md) · `WidgetExtension/` (WidgetKit + AppIntent) · `Components/` (SayingCard, CategoryChip, EmptyState, SectionHeader, ActionBar...) · `Resources/` · `CaDaoVietTests/` · `Tools/dataset/` (ngoài target app).
- **Navigation:** root `TabView`, mỗi tab một `NavigationStack` riêng.
- **State:** `@Observable` + `.environment(_:)`, không `EnvironmentObject`/`ObservableObject`; global-ish: favorites, repository, settings; còn lại giữ trong ViewModel từng feature.
- **Data loading:** Bundle `sayings.json` → `Data` → `JSONDecoder` → `DatasetFile{schemaVersion, datasetVersion, sayings}` → check schema → tính `normalizedText` nếu thiếu → cache in-memory; decode background + skeleton; lỗi decode hiện màn hình lỗi, không crash.
- **Persistence:** Favorites lưu `[FavoriteEntry{id, savedAt}]` (giữ thứ tự, không dùng Set) trong `UserDefaults(suiteName: group.<bundle-id>)` ngay từ đầu cho widget; truy cập qua protocol `FavoriteStore` (đổi backend không đụng UI); load dataset mới ánh xạ `id_aliases.json`; 1.1 thêm `CloudKVSFavoriteStore` (iCloud KVS, ~20k câu trong 1MB); 1.2 SwiftData cho Collections/History + migration một lần có test.
- **Quyết định chốt:** iOS 17+ (đánh đổi loại iOS 15/16 ≈ 13–14% máy VN, gồm cả người lớn tuổi dùng máy cũ — ý thức rõ); ID UUID String; font New York; dataset qua script validate, không sửa tay.

## 8. Thuật toán cốt lõi

### Daily Saying (deterministic)
Không dùng `yyyyMMdd % count` (lộ thứ tự file, nhảy cuối tháng, thêm câu đổi toàn bộ lịch). Thay bằng: `dayNumber` = số ngày từ epoch 2026-01-01 (local calendar) → `cycle = dayNumber / pool.count`, `position = dayNumber % pool.count` → Fisher–Yates hoán vị `pool` (ID đã `sorted()`) bằng PRNG tự cài `SplitMix64(seed: cycle)` → lấy `permutation[position]`. Mỗi câu xuất hiện đúng 1 lần/chu kỳ, trông ngẫu nhiên, offline, xác định. Không dùng `hashValue`/`Hasher`/`shuffle(using:)`. Widget và app dùng chung `DailyPicker` trong `CaDaoCore`. Unit test: cùng ngày cùng câu, ngày liên tiếp khác câu, không trùng trong chu kỳ, qua tháng/năm/đổi múi giờ.

### Search không dấu
Chuẩn hóa query và dữ liệu bằng cùng hàm `searchNormalized`: NFC → lowercase → `đ/Đ`→`d` thủ công → `folding(.diacriticInsensitive)` → bỏ dấu câu/xuống dòng/gộp khoảng trắng. `normalizedText` tính sẵn lúc build/load, không tính mỗi lần gõ; `keywords` cũng chuẩn hóa. Linear scan đủ cho ~5.000 câu; ranking cụm > đầu câu > token, câu ngắn trước khi hòa. Phase 4 stress-test gõ không dấu + debounce trên iPhone XS/XR/11; nếu khựng thì search background/index token. 1.2: token weight, Spotlight, search trong meaning.

### TTS & Share Image & Widget
- TTS: `AVSpeechUtterance(saying.text)`, voice `vi-VN`, rate ~0.48, quản lý Play/Pause/Stop khi chuyển view.
- Share Image: `ImageRenderer(content: SayingExportCard)` tại `@MainActor`, scale theo màn hình, render < 100ms, tỉ lệ 9:16 và 1:1, không thư viện ngoài.
- Widget 1.0.1: `NextSayingIntent` (đổi câu) + `ToggleFavoriteIntent` (thả tim) qua AppIntent; đọc `CaDaoCore` + App Group.

### Testing
Unit: DailyPicker, normalization (đ/Đ, NFC/NFD, dấu chồng), ranking, Favorite (thứ tự, alias), Related. Dataset: decode được, UUID unique/đúng format, slug tồn tại. UI smoke: mở app → Daily → TTS → favorite → search → detail → share image. Perf: search máy cũ. Thủ công: Dynamic Type max, VoiceOver, Reduce Motion, dark mode, SE→Pro Max.

## 9. Data Model

**Header `sayings.json`:** `{schemaVersion (v2 thêm glossary/origin/example/poeticForm/isPopular), datasetVersion (vd 2026.10.1, hiện ở Settings), generatedAt, count (validate nhanh), sayings[]}`.

**Saying:** `id` (UUID v4 chữ thường, cấp 1 lần qua `id_registry.json`, không đổi/tái dùng) · `text` (giữ dấu, NFC lúc ingest, `\n` giữa câu 6/8 lục bát) · `type` (ca-dao/tuc-ngu/thanh-ngu) · `categories[]` (slug trong `categories.json`, 15 cái) · `keywords[]?` · `meaning?` (đại ý) · `origin?` (điển tích/xuất xứ) · `example?` (câu mẫu, ưu tiên Thành ngữ) · `glossary[]?` (`{word, meaning}` cho từ cổ/phương ngữ) · `poeticForm?` (luc-bat/song-that-luc-bat/dong-dao/tu-do, cho ca dao, hỗ trợ thụt dòng) · `isPopular?` (câu kinh điển, DailyPicker ưu tiên) · `region?` (bac-bo/trung-bo/nam-bo/toan-quoc) · `source?` + `sourceURL?` + `license?` (CC BY-SA 4.0/Public domain/Original...) · `dailyEligible` (true chỉ khi duyệt chính tả/type/category + có meaning chuẩn; tập này ≥ 365 câu cho Daily/Widget cả năm) · `variantGroupId?` (gom dị bản) · `normalizedText?` (pipeline hoặc lúc load).

**Files phụ:** `categories.json` (15 category + slug/name/mô tả/order/icon) · `sources.json` (cho trang Nguồn nội dung: id/name/author/url/license/licenseURL/note) · `Tools/dataset/id_registry.json` (khóa = text chuẩn hóa → UUID, commit cùng dataset, không xóa dòng) · `id_aliases.json` (`{oldId: newId | null}` — null = xóa hẳn, để favorites không mồ côi).

## 10. UX Flow tóm tắt

- **First launch:** Launch → Home/Daily hiện ngay (không onboarding, không quảng cáo tính năng chưa có), skeleton loading nền, không màn hình trống/chớp.
- **Daily:** Mở app → thẻ lịch (Thứ/Ngày dương/Tháng âm) → Nghe/Copy/Thích/Chia sẻ/Xem chi tiết/Câu khác (flip/peek + quay về câu hôm nay). Widget 1.0.1: tap → Detail đúng câu; action trực tiếp Đổi câu/Thích.
- **Search:** Explore → gõ dấu/không dấu (`tháng năm` hay `thang nam` đều ra "Đêm tháng năm...") → Scope Bar → Recent → list 2 dòng + highlight → Detail.
- **Category:** Explore → chủ đề → list (lọc type) → Detail → Related.
- **Swipe:** Explore → ngẫu nhiên → full-screen ẩn TabBar → vuốt lên/xuống hoặc nút Trước/Tiếp → TTS/Copy/Thích/Share trên thẻ → tap vào thẻ mở Detail.
- **Favorite:** chạm tim ở bất kỳ đâu → haptic + lưu App Group → tab Đã lưu (search/filter/vuốt xóa/giữ lâu menu).
- **Share as Image:** thẻ/Detail → "Chia sẻ ảnh" → sheet preview 9:16/1:1 → ImageRenderer → ShareSheet hệ thống.
- **Attribution:** Settings → Nguồn nội dung → list nguồn (tên/license/link/dataset version/link dataset công khai); từ Detail bấm dòng Nguồn mở trang gốc.
- **Detail layout:** badge + chips → text → action bar → meaning → từ khó (1.2) → region → source/license → related.
- **Empty states:** Search ("Thử từ khóa ngắn hơn hoặc kiểm tra Scope Bar") · Favorites (ấm áp, rủ khám phá) · Dataset lỗi (thử mở lại, không crash).
- **Accessibility:** TTS offline; Dynamic Type max không cắt dấu chồng (ệ/ẫ/ặ); VoiceOver labels + đọc ngắt nghỉ theo dòng lục bát; contrast ≥ 4.5:1 WCAG AA light+dark; vùng chữ nền phẳng (hoa văn chỉ ở nền ngoài); Reduce Motion; tap target ≥ 44×44pt.

## 11. Content Strategy & Pháp lý (critical path, chạy song song code từ Phase 0)

Thứ tự ưu tiên nguồn: public domain → license rõ → Wikimedia/Wikiquote có attribution → team tự biên → web khác chỉ khi quyền tái sử dụng rõ. Không coi "public trên web" = được copy database.

**Wikiquote (CC BY-SA):** Ghi công (trang Nguồn nội dung: tên+link nguồn, tên+link giấy phép, ghi rõ đã chỉnh sửa, giữ source/sourceURL/license từng câu trỏ đúng trang gốc, không ngụ ý được Wikimedia bảo trợ). Chia sẻ tương tự: dataset phái sinh phát hành **CC BY-SA công khai** (repo GitHub, link từ app/App Store); meaning copy/sửa từ Wikiquote cũng CC BY-SA; meaning team tự viết thuộc team (ghi rõ license riêng). Lưu ý: nội dung chép từ sách còn bản quyền không "rửa sạch" vì nằm trên Wikiquote — nghi ngờ thì kiểm tra/tự viết lại; lấy dump/API chính thức, không cào HTML; Wikiquote có thể không đủ 2.000 câu — đếm sớm, chuẩn bị nguồn bổ sung.

**Monetization không chạm nội dung CC:** Tip Jar/Pro (1.2) chỉ bán thẩm mỹ/tiện ích, không khóa nội dung.

**Mục tiêu số lượng:** dev 100 → alpha 500 → 1.0 từ 2.000–5.000 sạch (≥ 365 `dailyEligible`, 100% có type/category/source/license). Chất lượng > số lượng: check chính tả, dấu câu, NFC, type, category, duplicate, source/license, meaning.

**Pipeline `Tools/dataset/`:** không sửa tay, script chạy trước build/CI; `validate_dataset.py` check JSON/schemaVersion/count khớp, UUID v4 chữ thường unique khớp registry + không tái dùng ID xóa (đối chiếu aliases), keywords mảng chuẩn, type 1 trong 3, categories slug hợp lệ kebab-case, text NFC không thừa trắng/ký tự lạ/zero-width, thiếu source/license → lỗi, `dailyEligible` thiếu meaning → cảnh báo, trùng sau normalize, URL đúng format. Hai mức: lỗi chặn build / cảnh báo người xem. UUID cấp 1 lần qua registry (khóa = text chuẩn hóa), chạy lại dùng UUID cũ (kẻo vỡ Favorites), registry commit cùng dataset không xóa dòng.

**Dedupe:** normalize NFC/lowercase/whitespace/punctuation/xuống dòng; khác từ ngữ đáng kể thì không auto-merge mà gán cùng `variantGroupId`; gộp/xóa ghi `id_aliases.json`.

**Type guideline:** ca dao = thể thơ có vần, thiên tình cảm; tục ngữ = câu hoàn chỉnh, kinh nghiệm/lời khuyên; thành ngữ = cụm cố định như đơn vị từ vựng. Không chắc → ghi chú người duyệt, kèm sổ ví dụ mẫu; không để AI/script gán cuối cùng. Meaning dùng AI nháp cũng phải người duyệt 100% — giải nghĩa sai mất uy tín.

**Tri thức (meaning/origin/example/glossary):** meaning = đại ý/bài học (ưu tiên 100% dailyEligible); glossary = từ cổ/Hán-Việt/phương ngữ (tào khang, trâm anh...); origin = điển tích (Nợ như Chúa Chổm, Đẽo cày giữa đường...); example = câu mẫu đời sống (ưu tiên Thành ngữ).

**Trang attribution trong app** (từ `sources.json`): tên nguồn, license, link nguồn + toàn văn phép, ghi chú biên tập, dataset version, link dataset công khai.

**Tone biên tập:** ngắn, dễ hiểu, trung tính, tránh tuyệt đối hóa câu đa nghĩa, không học thuật nặng.

**Checklist 1.0:** đủ số câu · license rõ từng nguồn · rà soát meaning/sưu tầm từ sách · công bố dataset CC BY-SA · trang Nguồn đúng · validate pass · duyệt hết meaning + dailyEligible.

## 12. Roadmap thực thi (2 track song song)

- **Phase 0 (tuần 0–2):** A: chốt vision, 4 tab, design direction + WCAG AA, iOS 17+. C: chốt schema, khảo sát cạnh tranh + điểm khác biệt, rà soát + đếm câu Wikiquote, hướng phát hành CC BY-SA, dựng pipeline + UUID, sample 100 câu. (Business model đã chốt.)
- **Phase 1 Foundation:** project Xcode 17+, CaDaoCore package, App Group, TabView/NavigationStack, AudioService TTS, khung ImageRenderer, Model/Dataset/Repository, FavoriteStore protocol + UserDefaults, ViewModel `@Observable`, unit test nền + sample data. Content: lên 500 câu, type guideline + sổ ví dụ, chốt 8–12 category (sau mở rộng 15).
- **Phase 2 Core experience:** Home lịch ngày + TTS + Copy/haptic/toast + Random flip/peek + Detail + Share Image 9:16/1:1 + Share text + Favorites có thứ tự/search/filter + alias ID.
- **Phase 3 Knowledge:** Explore + Categories/Types + Search không dấu + Scope Bar + Recent + list 2 dòng + Swipe full-screen + Recommended xoay ngày + Related đơn giản + trang Nguồn/license.
- **Phase 4 Polish:** Dark Mode, animation/haptic, Dynamic Type max, VoiceOver/TTS, contrast, stress-test search + render ảnh trên iPhone XS/XR/11, loading/empty/error, icon + launch screen.
- **Phase 5 Content expansion (song song từ Phase 1):** 500 → 2.000 → 5.000; dedupe + variant + aliases; cleanup category; audit source/license; review meaning (ưu tiên dailyEligible); ≥ 365 dailyEligible; công bố dataset CC BY-SA.
- **Phase 6 TestFlight:** nội bộ + bên ngoài, iOS 17/18+, SE→Pro Max, TTS + xuất ảnh, crash-free ≥ 99.5%, CI test + validate.
- **Phase 7 App Store 1.0:** metadata/screenshot, privacy, review notes, trang Nguồn, checklist CONTENT_STRATEGY mục 12, release.
- Sau 1.0: 1.0.1 Widget/StandBy → 1.1 Notification/Cloud KVS → 1.2 Pro/Smart → Later (CloudKit, remote update, community, web, API). Đo D1/D7/D30, widget, TTS/share, favorites/user, rating.

## 13. Quyết định nền tảng đã chốt (tra nhanh)

iOS 17+ · `@Observable` + `.environment(_:)` · UUID v4 chữ thường qua registry · Daily = dayNumber + Fisher–Yates/SplitMix64 trên pool `dailyEligible` đã sort · Favorites `[{id, savedAt}]` App Group UserDefaults, không giới hạn, iCloud KVS 1.1 · Collections/History SwiftData 1.2 · Search NFC + `đ/Đ` thủ công, Scope Bar + Recent, stress-test máy cũ · TTS `AVSpeechSynthesizer` offline · Share Image `ImageRenderer` (1 template 1.0, mở rộng 1.1) · JSON header schemaVersion/datasetVersion + license từng câu · Wikiquote CC BY-SA + dataset phái sinh công khai · validate chặn build/CI · không onboarding MVP · Swipe luôn có nút + VoiceOver + Reduce Motion · không IAP 1.0, Tip Jar + Pro 1.2 (mua đứt, không khóa nội dung) · màu muted contrast ≥ 4.5:1, vùng chữ nền phẳng · unit test từ Phase 1.

## 14. Rủi ro chính

Không đủ 2.000 câu sạch (cao → thu thập từ Phase 0, đếm sớm) · vi phạm license (cao → ghi công + CC BY-SA + tự viết meaning + rà soát từng đợt) · giải nghĩa sai văn hóa (TB → người duyệt, giọng trung tính) · bão hòa thị trường (TB → khảo sát Phase 0, đánh vào thẩm mỹ/TTS/share) · thói quen daily yếu (TB → Widget 1.0.1) · lỗi dấu tiếng Việt (thấp–TB → New York + test Dynamic Type max) · pastel giảm contrast (TB → WCAG AA mọi theme) · search khựng máy cũ (thấp–TB → stress-test Phase 4).

## 15. Design direction

"Hiện đại, trẻ trung nhưng đậm đà bản sắc Việt": đỏ gạch Bát Tràng, xanh ngọc gốm men, nâu đất nung, hồng sen nhạt (contrast ≥ 4.5:1); typography-first — nội dung New York serif đủ dấu Việt, UI SF Pro, line-height rộng cho dấu chồng; họa tiết tối giản (vân giấy dó, sóng nước, mái ngói mờ) chỉ ở nền ngoài, vùng chữ nền phẳng; cảm giác tĩnh lặng ấm áp, Dark Mode tối ưu.
