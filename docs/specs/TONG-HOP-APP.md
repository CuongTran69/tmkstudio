# TypeMate / VietText macOS — Tổng hợp toàn bộ ứng dụng

> File tổng hợp duy nhất, dựng từ toàn bộ docs trong `docs/` (00–12), `PRIVACY_POLICY.md`, `TESTFLIGHT_GUIDE.md`, `CLAUDE.md`, source analytics và lịch sử git chi nhánh `main` (tính đến 09/11/2026). Tên thương mại hiện tại: **TypeMate** (tên kỹ thuật/spec cũ: **VietText**).

---

## 1. Ứng dụng là gì

TypeMate (VietText) là ứng dụng **text expander native cho macOS** (Swift + SwiftUI), thiết kế riêng để **chung sống an toàn với bộ gõ tiếng Việt** (Telex/VNI built-in của Apple, OpenKey, EVKey…).

Vấn đề gốc: các text expander phổ biến quan sát phím và chèn chữ nên dễ xung đột với bộ gõ Việt — mất dấu, xóa nhầm, nhân đôi ký tự, không kích hoạt. Cam kết sản phẩm gồm 2 điểm:

1. **Toàn vẹn văn bản đặt lên trước** — khi không chắc chắn thì không can thiệp (fail-open cho việc gõ, fail-closed cho việc mở rộng).
2. **Trung thực về khả năng** — bảng tương thích công khai với 4 trạng thái `Supported / Known limitation / Unsupported / Not tested`; tuyệt đối không dùng câu "không bao giờ làm hỏng văn bản" như một khẳng định đã chứng minh.

Đối tượng: dân văn phòng, nhân viên CSKH, người chăm đơn, kế toán — những người nhắn tin, gõ câu lặp lại nhiều mỗi ngày (Excel, Word, Zalo, Gmail, Slack…).

Persona gốc trong PRD: Hương (kế toán, Excel/Word), Minh (CSKH, Zalo web/Gmail), Dev/Freelancer (editor/Slack). Cần kiểm chứng bằng phỏng vấn 15–20 người (story VT-D02).

---

## 2. Tính năng chính

### 2.1. Tự động bung chữ (auto-expansion)
- Gõ trigger kiểu `;chao`, `;stk` + phím ngắt → app xóa trigger và chèn nội dung mẫu.
- **Enter, Enter phím số và Tab chỉ reset bộ đệm, không bao giờ kích hoạt** — sửa lỗi nghiêm trọng: trước đây Enter trong Zalo gửi nhầm tin, Tab trong Excel xóa nhầm ô bên cạnh.
- **App lạ mặc định KHÔNG tự bung.** Chỉ bung trong allowlist + app người dùng bật tay ("Bật cho \<app\>"). Denylist cứng: app dòng lệnh, quản lý mật khẩu, ô mật khẩu, lúc Secure Input bật.
- **Bộ gõ Apple (gạch chân composition) chờ phím cách mới bung**; OpenKey/EVKey bung tức thời.
- **Trigger lồng nhau** (`;bank` vs `;bank_vcb`): nếu còn trigger dài hơn cùng tiền tố thì chờ phím cách.
- **Không bung trong chính cửa sổ TypeMate** (trừ khung chat thử có cơ chế riêng).
- One-time bypass: `Shift + Space` hoặc `Esc` giữ nguyên từ vừa gõ (`ko`, `dc`), bỏ qua mở rộng 1 lần.
- Snippet nhiều dòng (`\n`): ưu tiên backend Clipboard hoặc map thành `Shift+Return`/`Option+Return` theo App Profile — tránh gửi nhầm tin Zalo/Slack, nhảy ô Excel.
- Không auto-chain (nội dung chèn không kích hoạt snippet khác).

### 2.2. Dán nhanh ⌥⌘V (tính năng dùng nhiều nhất)
- Panel nổi kiểu Spotlight, **không phụ thuộc cửa sổ Thư viện** (đóng Library vẫn dùng được).
- Không kéo TypeMate ra trước; chọn mẫu → **dán thẳng vào ô chat đang gõ** nếu có quyền Trợ năng, nếu chưa thì copy sẵn + HUD nhắc nhấn ⌘V. Có công tắc tắt trong Cài đặt.
- Phím: ↑/↓ chọn, Enter dán, Esc đóng, ⌘1…⌘9 chọn nhanh. Mẫu "Hay dùng" xếp đầu.
- Menu bar có nút mở dán nhanh. Danh sách copy nhanh ưu tiên "Hay dùng", ẩn mẫu trong thùng rác.

### 2.3. Thư viện snippet
- CRUD: title, trigger, body plain-text, matchMode, enabled, scope. Validate + linter trigger thời gian thực (cảnh báo `dd/aa/ee/ow…`, phím dấu Telex, số VNI, trùng, quá ngắn, tiền tố).
- Tìm kiếm theo title/trigger, xem trước + ô thử mô phỏng (không cần quyền, không chứng minh app đích chèn được).
- Thông tin shop thật (`{khach}`, tên shop, hotline); chưa điền hiện `[TÊN SHOP]`/`[HOTLINE]` thay vì số giả.
- Gói mẫu câu, biến ngày giờ `{date:dd/MM/yyyy}`, smart case, nhóm/thẻ, yêu thích, duplicate, draft recovery, import/export JSON, import macOS Text Replacement (`.plist`).

### 2.4. Thống kê sử dụng — v1.2 giai đoạn 1 (đã làm)
- Ghi mỗi lần dùng mẫu (tự bung, ⌥⌘V, Copy). Chỉ đếm số, **không lưu nội dung**. File riêng `usage_v1.json`; file lỗi thì cất sang bên, đếm lại, không ảnh hưởng mẫu câu.
- Màn hình **Thống kê**: lượt dùng + phút tiết kiệm (hôm nay / 7 ngày / 30 ngày, tốc độ ~35 từ/phút), Top 10, danh sách chưa dùng 30 ngày + nút bỏ vào Thùng rác.
- Sắp xếp thông minh ⌥⌘V và menu bar: "Hay dùng" → dùng nhiều 14 ngày → dùng gần nhất.
- Test: 15 test mới, tổng 47/47 test lõi đạt (Swift 5.10 Linux).

### 2.5. Gói mẫu nhóm `.typemate-pack` — v1.2 giai đoạn 2 (đã làm)
- **Trưởng nhóm** (nút Nhóm): tạo gói từ danh mục → Phát hành & xuất file → gửi qua Zalo/Email. Tự tính thay đổi chưa phát hành. Lịch sử 50 phiên bản (ai, khi nào, thêm/sửa/bỏ gì).
- **Thành viên**: đúp file trong Finder hoặc "Nhận gói từ file" → xem trước (mới/sửa/bỏ/trùng phím tắt) → Cập nhật. Mẫu nhóm **khóa sửa** (có nhãn Nhóm), vẫn được Yêu thích / tắt / Nhân bản để sửa riêng. Mẫu riêng không bị đụng. Mẫu bị bỏ khỏi gói → Thùng rác. Trùng phím tắt → mẫu nhóm thêm ở trạng thái tắt. Giữ 5 phiên bản gói, quay lại bản cũ được, gỡ cả gói được. Tự mở gói do chính mình soạn thì bị từ chối.
- `FeatureGate.teamPacks` hiện luôn bật (miễn phí, sau này gắn IAP).
- Giai đoạn 3–4 (chưa làm): đồng bộ iCloud cá nhân (CloudKit Private DB, `CKSyncEngine`) → v1.4; kho nhóm tự đồng bộ + phân quyền Trưởng nhóm/Biên tập viên/Thành viên + lịch sử 180 ngày → v1.5.

### 2.6. An toàn dữ liệu, clipboard, ổn định
- **Safety Gate 3 trạng thái** `safe/unsafe/unknown`; `unknown` không bao giờ inject. Mọi quyết định `safe` cần SafetyEvidence (profile/version, focus, quyền, Secure Input, nguồn nhập, session/sequence, backend).
- Hàng đợi `AsyncStream` tuần tự duy nhất; bundle ID lấy ngay lúc nhấn phím; sequence báo Engine ngay trong callback để lệnh xóa/dán tự hủy khi người dùng gõ tiếp. Chống race, gap/overflow/reorder/stale → reset buffer, abort.
- Click chuột, Home/End/PageUp/PageDown, Forward Delete đều reset bộ đệm.
- File mẫu lỗi **không bị ghi đè**: giữ lại `.corrupt-<time>.json`, khôi phục từ backup gần nhất + báo người dùng. Backup xoay vòng tối đa 10 phút/lần. Lỗi sao lưu không chặn lưu.
- Clipboard dán đánh dấu `org.nspasteboard.TransientType` (app quản lý clipboard không lưu STK). ⌘V tìm đúng phím V theo layout (Dvorak, AZERTY…). Bộ đếm "đang chèn" an toàn khi chồng lệnh. Không cho chạy 2 bản cùng lúc. `OSLog` (`TMLog`), log không ghi nội dung gõ. Lưu editor debounce 0,4s + ghi ngay khi thoát. Lỗi lưu/restore/Launch at Login hiện banner.
- Safe Mode theo profile + kill switch toàn cục khi integrity failure, có reason code.

### 2.7. UI/UX
- Menu bar (`MenuBarExtra`): Running / Paused / Thiếu quyền / Secure / Unsupported / Unknown / Not tested / Safe Mode / lỗi tap. Đổi trạng thái ≤ 1s, icon template đơn sắc, không phụ thuộc màu.
- Thư viện `NavigationSplitView`, Cài đặt (Chung · Ứng dụng · Quyền · Dữ liệu · …), Onboarding 5 bước (bản DMG) / 3 bước (bản App Store), Quick Paste `NSPanel`, HUD/badge khi trigger bị chặn (kèm gợi ý ⌥⌘V).
- Visual App Picker (Icon + tên app, tự lưu Bundle ID), cảnh báo trigger bị IME biến đổi kèm gợi ý thay thế.
- VoiceOver, điều hướng bàn phím đầy đủ, Light/Dark, Reduce Motion/Increase Contrast. Tiếng Việt trước, tiếng Anh sau.

---

## 3. Kiến trúc và công nghệ

- **Nền tảng**: macOS 14+ (Sonoma), Swift/SwiftUI, `@Observable`, `MenuBarExtra`, `SMAppService` (Launch at Login).
- **Module** (`Sources/`):

| Module | Vai trò | File chính |
|---|---|---|
| `VietTextApp` (SwiftUI) | UI + AppModel | `VietTextApp.swift`, `AppModel.swift`, `LibraryWindowView.swift`, `MenuBarAndSettingsView.swift`, `QuickPastePanelView.swift`, `StatusHUDController.swift`, `AnalyticsService.swift` |
| `VietTextCore` (Swift thuần, không AppKit) | Engine, matcher, safety | `Engine.swift` (actor), `InputSession.swift`, `TriggerMatcher.swift`, `TriggerLinter.swift`, `SafetyGate.swift`, `ExpansionPlanner.swift`, `Models.swift`, `Usage.swift`, `Pack.swift` |
| `VietTextPlatform` (AppKit/CG/AX/Carbon) | Event tap, quyền, inject | `EventTapMonitor.swift`, `PermissionManager.swift`, `PlatformContextProvider.swift`, `PlatformInjectionCoordinator.swift`, `GlobalHotKeyManager.swift` (Carbon ⌥⌘V), `TMLog.swift` |
| `VietTextStore` | Lưu trữ | `SnippetRepository.swift`, `UsageRepository.swift`, `PackRepository.swift` |

- Quy tắc phụ thuộc: `App → {Core, Store, Platform}`, `Platform → Core`, `Store → Core`; **Core không phụ thuộc ai**, không import SwiftUI/AppKit/Carbon/CoreGraphics.
- **Pipeline engine**: CGEventTap callback (nhanh, không chặn) → `InputEvent` (+sequence) → hàng đợi → `EventNormalizer` (lọc self-event, bypass) → `InputSession` (buffer bounded) → `TriggerMatcher` (exact/prefix+delimiter/word boundary, NFC) → `InputStreamGuard` → `SafetyGate` → `ExpansionPlanner` (deleteCount, delimiter, lineBreakPolicy) → `InjectionCoordinator` (chọn Keys/Clipboard/Unsupported theo profile, preflight, abort nếu `latestRealSequence != matchSequence`, timeout, verify best-effort, Safe Mode khi lỗi).
- **Lưu trữ**: file JSON trong `Application Support/TypeMate` (snippets, `usage_v1.json`, packs) + backup xoay vòng; spec gốc đề xuất SQLite/GRDB (SwiftData là phương án B), schema sync-ready (UUID, `updatedAt`, `deletedAt`/tombstone, `revision`, bảng `profile_safety_state`). Migration luôn backup trước.
- **Quyền**: Input Monitoring (nhận trigger), Accessibility (xóa/dán, phát hiện ô mật khẩu), file do người dùng chọn. Quick Paste Lite copy-only **không cần** 2 quyền trên.
- **Gate A (cổng bắt buộc)**: PoC event tap + 2 backend inject trên MSS {built-in Telex, OpenKey} × {Notes, Chrome/Gmail, Word} (≥300 lượt đối kháng, ≥95% success ở ≥4/6 ô, 100% negative control không mở rộng, 0 self-loop, callback P95 <2ms). GO / PARTIAL GO (allowlist hẹp) / PIVOT (Quick Paste-first). Time-box 1,25× estimate.
- **Beta Exit** (tách riêng): hết Sev-1, profile `Supported` có hồi quy versioned (mục tiêu ≥99,5%), negative controls 100%, đủ test overflow/partial/focus/clipboard/multiline/migration/sleep-wake.

---

## 4. Cấu trúc project

```text
VietText_macOS/
├── Sources/VietTextApp/        UI + AppModel + Analytics
├── Sources/VietTextCore/       Engine thuần Swift
├── Sources/VietTextPlatform/   Event tap, quyền, inject
├── Sources/VietTextStore/      Repository JSON
├── Tests/                      Core + Store (47 test) + TeamAndUsageTests
├── Config/                     Info.plist, 2 entitlements, 2 ExportOptions
│   ├── VietText-TestFlight.entitlements   (sandbox ON — App Store)
│   └── VietText-DirectDMG.entitlements    (sandbox OFF — DMG)
├── AppResources/               AppIcon (10 size), PrivacyInfo.xcprivacy
├── scripts/                    archive_for_testflight.sh, build_dmg.sh
├── docs/ 00–12 + SHA256SUMS    Bộ spec v0.4.1 + changelog v1.1/v1.2 + plan nhóm
├── openspec/                   Spec change (ảnh tách file, 7.1…)
├── PRIVACY_POLICY.md           Chính sách vi/en (03/11/2026)
├── TESTFLIGHT_GUIDE.md         Hướng dẫn publish TestFlight
├── CLAUDE.md                   Quy ước dùng codebase-retrieval
└── VietText.xcodeproj / Package.swift
```

---

## 5. Luồng hoạt động chính

1. **Gõ tắt tự bung (bản DMG)**: phím → EventTap → sequence → session buffer → matcher trúng trigger → SafetyEvidence đủ + profile Supported → planner tính số ký tự xóa → preflight → xóa trigger + chèn (Keys/Clipboard) → verify. Bất kỳ race/gap/focus-drift/thiếu evidence nào → abort/Safe Mode + HUD gợi ý ⌥⌘V.
2. **Dán nhanh ⌥⌘V (cả 2 bản)**: hotkey Carbon → panel Spotlight → gõ lọc → Enter → có Accessibility thì paste thẳng vào app đang focus, không thì copy + nhắc ⌘V. Đồng thời ghi usage + Firebase (nếu opt-in).
3. **Quản lý mẫu**: Library CRUD → linter → lưu nguyên tử + backup → (v1.2) thống kê/thùng rác → (nhóm) đóng gói `.typemate-pack` → thành viên import/preview/cập nhật/rollback.
4. **Khôi phục**: file lỗi → `.corrupt-*` + restore backup + banner; migration → backup trước; Safe Mode → tắt auto-expansion profile, chỉ mở lại khi người dùng chủ động.

---

## 6. Phân phối và phiên bản

### 6.1. Tách 2 bản — Guideline 2.4.5 (commit `781af67`, 09/11/2026)
Apple từ chối app App Store dùng API nghe phím toàn hệ thống. Giải pháp: **cờ build `DIRECT_DISTRIBUTION`**.

| | Bản Mac App Store / TestFlight (Release mặc định) | Bản DMG trực tiếp (Debug + `DIRECT_DISTRIBUTION`) |
|---|---|---|
| Sandbox | Bật (`VietText-TestFlight.entitlements`) | Tắt (`VietText-DirectDMG.entitlements`) |
| Tự bung chữ, CGEventTap, giả lập phím | **Loại hẳn khỏi code biên dịch** | Đầy đủ |
| Xin quyền Trợ năng / Giám sát | Không | Có (sau khi bấm nút onboarding) |
| Còn lại | Thư viện, ⌥⌘V, Copy (tự nhấn ⌘V), thống kê, gói nhóm | Tất cả |
| UI | Ẩn tab Ứng dụng/quyền/tạm dừng/tự dán; onboarding 3 bước | Đầy đủ, onboarding 5 bước |
| Đóng gói | `scripts/archive_for_testflight.sh` (tự dừng nếu phát hiện API nghe phím) | `scripts/build_dmg.sh` (archive, ký Developer ID team QWP9AN675X, notarize, đóng DMG) |

Lưu ý TestFlight: sandbox giới hạn CGEventTap — muốn tự bung nội bộ thì đổi entitlement sang DirectDMG + Direct Distribution.

### 6.2. Lịch sử phiên bản
- **v1.0**: chờ Apple duyệt.
- **v1.1** (build 2, `MARKETING_VERSION=1.1`, commit `e4f2578`): 9 lỗi nghiêm trọng + ⌥⌘V panel + onboarding 5 bước. Upload **sau khi v1.0 được duyệt**. What's New vi/en, App Review Notes, Privacy labels (Device ID + Product Interaction, không liên kết, không tracking), Privacy Policy URL công khai. Checklist: thử Release-sandbox 10 bước + ⌥⌘V + onboarding, `swift test` 32 test, tag `v1.1`, chụp lại screenshot (`--generate-screenshots`).
- **v1.2** (commit `c724010`): thống kê + gói nhóm giai đoạn 1–2 (xem §2.4–2.5). 47/47 test lõi đạt.
- **Kế hoạch**: v1.3 (gói nhóm + lịch sử hoàn chỉnh), v1.4 (iCloud cá nhân), v1.5 (kho nhóm tự đồng bộ). Giai đoạn 1–2 không cần entitlement mới; giai đoạn 3–4 cần iCloud container + TestFlight kỹ.

### 6.3. Kinh doanh (giả thuyết)
Mua một lần $15/$19/$25 (chưa chốt, cần VT-D02). Beta chưa bán. License offline-first, không khóa dữ liệu. Tính năng nhóm miễn phí trước (`FeatureGate`), sau gắn IAP.

---

## 7. Analytics (Firebase)

- **Mặc định TẮT**, opt-in trong Cài đặt → Quyền riêng tư. `Info.plist`: `FIREBASE_ANALYTICS_COLLECTION_ENABLED = false`. Tắt = dừng gửi ngay + `resetAnalyticsData()` + xóa thống kê máy. Bỏ debug logger.
- Chỉ gửi **số đếm/loại hành động**, không bao giờ gửi nội dung gõ, nội dung mẫu, clipboard, tên khách, tên app đang chat. Khai báo `PrivacyInfo.xcprivacy` (Product Interaction, Device ID, không liên kết, không tracking).
- Code: `AnalyticsService.swift` (`shared`, `configure/setEnabled/log/logEvent`, enum `AnalyticsEvent`, commit `bd8b003`).
- Danh sách event: `app_open`, `library_opened`, `quickpaste_opened`, `snippet_created/deleted/restored/copied/image_attached/image_removed`, `category_created/deleted`, `quickpaste_selected` (auto_paste), `snippet_expanded`, `expansion_paused/blocked`, `app_autoexpand_enabled`, `safe_mode_entered/unlocked`, `pack_created/published/reexported/deleted/import_opened/imported/rolled_back/uninstalled`, `data_exported/imported`, `permission_requested/granted`, `setting_changed`.

---

## 8. Hướng dẫn dev / build

- **Tài liệu bắt buộc đọc trước khi code**: `docs/00_README.md` → `01_PRD.md` §8 (Gate A) → `04_ARCHITECTURE.md` §3+§13 → `07_DEVELOPMENT_GUIDELINES.md`. Dùng `codebase-retrieval` trước khi đọc file lẻ (theo `CLAUDE.md`).
- **Build TestFlight**: mở `VietText.xcodeproj` → chọn Team → `Product → Archive → Distribute → TestFlight & App Store`, hoặc `./scripts/archive_for_testflight.sh <TEAM_ID>`. Chi tiết trong `TESTFLIGHT_GUIDE.md` (App ID `cuongtran.typemate.mac`, AppIcon 10 size, `PrivacyInfo.xcprivacy`, `LSApplicationCategoryType`, `ITSAppUsesNonExemptEncryption=false`).
- **Build DMG**: `scripts/build_dmg.sh` (cờ DIRECT_DISTRIBUTION, ký Developer ID, notarize).
- **Test**: `swift test` (lõi chạy được trên Linux); phần App/Platform (AppKit) phải build bằng Xcode + checklist tay 10 bước trong `docs/09_*` (Zalo, Excel, click đổi focus, app lạ, ⌥⌘V đóng Library, Telex Apple vs OpenKey, shop trống, chống chạy 2 bản).
- **Quy ước code**: value type bất biến + `Sendable`, Engine là actor, callback tap không `await`/chặn, queue bounded có sequence+epoch, UI qua `@MainActor`, view không gọi CGEvent/AX trực tiếp, không `Task.detached` vô chủ, không che `Sendable` warning, migration có backup+rollback, draft không thành snippet active.

---

## 9. FAQ và lưu ý quan trọng

- **Vì sao có 2 bản?** Guideline 2.4.5: App Store cấm nghe phím toàn hệ thống → bản Store chỉ còn ⌥⌘V + copy; bản DMG mới có tự bung.
- **Sandbox TestFlight có tự bung không?** Không ổn định — phải thử Release-sandbox và cập nhật mô tả Store cho đúng (chỉ quảng bá ⌥⌘V nếu cần).
- **Enter/Tab có bung không?** Không — chỉ reset buffer.
- **Mất mẫu câu?** Không ghi đè file lỗi; luôn có `.corrupt-*` + backup + banner. Đồng bộ lớn cũng chỉ chuyển vào Thùng rác, không xóa vĩnh viễn.
- **Quyền riêng tư?** Không tài khoản, không server, dữ liệu trong máy (sau này là iCloud của chính user). Analytics tắt mặc định, chỉ đếm sự kiện.
- **iPhone/Windows?** Không làm ở MVP. iOS không cho giám sát phím toàn hệ thống (chỉ hướng R&D bàn phím chèn snippet). Windows chưa có kế hoạch; máy công ty không Apple ID vẫn dùng được gói file giai đoạn 2.
- **Điều chưa chứng minh**: ngưỡng Gate A, con số hiệu năng, hành vi từng IME/app, USP "expander khác vấp bộ gõ Việt", pricing — tất cả chờ VT-D01 (benchmark aText/Raycast/Alfred/macro IME/Text Replacement Apple) và VT-D02 (phỏng vấn).
- **Nguồn chính**: `docs/00_README.md` (mục lục) · `01_PRD.md` (sản phẩm) · `02_FEATURES.md` (ID tính năng) · `03_UIUX_DESIGN.md` (UX) · `04_ARCHITECTURE.md` (kỹ thuật) · `05_BACKLOG.md` (story/sprint) · `06_TEST_COMPAT.md` (test/ledger) · `07_DEVELOPMENT_GUIDELINES.md` (luật code) · `08_CHANGELOG_v0.4.md` (v0.4) · `09_CHANGELOG_fix_2026-11.md` (fix 03/11) · `10_PLAN_*` (plan nhóm) · `11_RELEASE_v1.1.md` (phát hành) · `12_CHANGELOG_v1.2_*` (v1.2).
