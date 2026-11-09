# Cất Link (CatLink) — Tổng hợp toàn app

> Bundle `com.cuongtran.castlink`, tên hiển thị "Cất Link", iOS 17+, Swift 6 (`SWIFT_STRICT_CONCURRENCY: complete`), SwiftUI + SwiftData local-first. Version trong `project.yml` hiện là MARKETING_VERSION 1.3 (docs 1.0.x ghi TestFlight-ready 1.0.0). 4 targets: App + ShareExtension + WidgetExtension + Tests.

## 1. Mục đích & định vị
- Biến link lưu từ TikTok/Instagram/Safari/Chrome/YouTube/mua sắm thành việc làm đúng thời điểm, thay vì bookmark bị quên.
- Câu hỏi cốt lõi khi lưu: "Cất link này để làm gì?" → chọn Ý định (Xem/Đọc/Mua/Đi/Làm/Gửi) + Thời điểm (Tối nay/Cuối tuần/Để sau).
- Local-first, không tài khoản/login/paywall/ads ở v1; analytics chỉ on-device JSONL, opt-out được.

## 2. Tính năng (đã ship, xác minh qua docs + code)
- Lưu qua Share Sheet (fast capture 1 chạm + adjust capture): `ShareExtension/ShareCaptureView.swift`, `ShareCaptureViewModel.swift`, `ExtensionItemExtractor.swift`, `ShareViewController.swift` (UIKit entry + UIHostingController).
- Dán nhanh 1 chạm + banner clipboard + Manual Capture (URL + title ≤120 + tag): `CastLink/Features/ManualCapture/ManualCaptureViewModel.swift`, `PasteGuard` chống spam 3 lần/60s trên canonicalKey.
- Hôm nay (Action Inbox): sort 5 tầng qua `TodaySort` (overdue → tonight → buy/go → 24h recent → dueAt/createdAt/UUID), stale "Lâu chưa mở" (active + openedAt==nil + createdAt<=now-7d): `CastLink/Features/Today/TodayView.swift`.
- Tủ link (Library): filter status (Hoạt động/Đã xong/Đã bỏ/Tất cả) + intent chips + stale; adaptive 1/2 cột (threshold 720, maxCardWidth 560).
- Power Search 1 ô: intent/bucket/domain-substring/#tag/text + rank title>domain>tag>note; word-boundary cho intent (tránh `damuaho`→`mua`).
- Link Detail Inspector: title inline-edit, tag chip editor, note, đổi intent/bucket, Để sau/Đã xong/Chia sẻ/Xóa; hit-area tách bạch (title/CTA mở URL, còn lại mở Detail).
- Smart Reminder: `DueDateResolver` (Tối nay 20:00, quiet hours 22h–7h → 8h sáng) + `ReminderScheduler` (tối đa 1 notificationID/link, cancel/reschedule khi complete/discard/snooze) + pre-prompt sau ≥3 links + deep link chạm notification mở đúng Detail (`NotificationResponseHandler` + `NotificationDeepLinkPublisher`).
- Undo Toast 4.5s (`ConfirmationToast` + `UndoSnapshot` khôi phục status/due/notification); bulk delete destructive, không undo.
- Tự dọn (`RetentionCleaner` + `BGAppRefreshTask com.cuongtran.castlink.cleanup`): chỉ xóa completed/discarded quá 7/30/90 ngày, mặc định tắt.
- Backup (v1.1+, đã có code): xuất JSON (khôi phục được) / CSV; nhập JSON gộp, skip trùng, không ghi đè: `CastLink/Core/Services/LinkBackupService.swift`, `CastLink/Features/Settings/DataBackupViewModel.swift`. Device-local fields (notificationID, thumbnail path) bị loại khỏi backup.
- Dedup khi share lại: share lại link active đang có → cập nhật intent/bucket của link cũ thay vì tạo mới (`CaptureImporter`).
- Tiêu đề + thumbnail tự động mọi đường lưu qua `LinkMetadataHydrator`; ảnh lưu trong App Group `Thumbnails/`, file mồ côi dọn khi mở app. Notification actions Xong/Mai/Để sau chạy nền không mở app (`NotificationActions`).
- Widget "Hôm nay" (Small/Medium) chia sẻ `TodaySort`; Onboarding carousel 3 trang; Settings (theme, accent, retention, privacy, help); iPad adaptive; Dark Mode/Dynamic Type/Haptics/vi+en (246 keys `Localizable.xcstrings`).

## 3. Kiến trúc
- Feature-first MVVM: Feature/View/ViewModel (@MainActor) → protocol `LinkRepository`/`ReminderScheduling`/`URLLaunching`; `RootTabView` + `AppDependencies` là composition root duy nhất (`CastLink/App/AppDependencies.swift` khởi tạo canonicalizer, reminderScheduler, pasteGuard, metadataService/hydrator, repository, analytics, notification handler, captureImporter).
- App là owner duy nhất của SwiftData store. Share Extension KHÔNG chạm SwiftData; chỉ ghi `CaptureDraft` JSON versioned vào App Group (`NSFileCoordinator` + atomic write + schemaVersion). App chính import idempotent theo `draft.id` khi launch/scene active (`CastLink/Core/Persistence/CaptureImporter.swift`).
- Data model `SavedLink`: captureDraftID unique, originalURL/canonicalURL, domain, title?, thumbnailPath?, intentRaw/dueBucketRaw/statusRaw, dueAt?, note?, tags/normalizedTags (lowercase, ≤20/tag, ≤5/link, dedup), createdAt/openedAt/completedAt/notificationID. `CaptureDraft`: id, receivedURL/receivedText, intent, dueBucket, createdAt, schemaVersion.
- State machine: active→completed (set completedAt, cancel noti), active→discarded (cancel, giữ record), snooze giữ active đổi dueBucket=.later/dueAt=nil + cancel, reopen/restore về active, restoreFromUndo khôi phục snapshot + reschedule nếu dueAt>now. Bulk `deleteMany` destructive + confirm.
- Service không import SwiftUI; View không gọi network/persistence trực tiếp. Shared sources giữa 3 targets khai trong `project.yml` (Models, AppGroupCaptureStore, AppConfiguration, AnalyticsLogger, AppSettings, LinkCanonicalizer, SharedUI, xcstrings, Assets).
- Analytics: `LocalAnalyticsLogger` JSONL trong App Group (`Analytics/events.jsonl`), 8 events (app_launched, capture_created, link_imported, link_opened, link_completed, link_snoozed, link_discarded, notification_tapped), domain hash SHA256-8, không log URL/note/title, opt-out + xóa. Firebase (Core+Analytics) là dependency duy nhất ngoài, chỉ init khi có `GoogleService-Info.plist` (gitignored) và tôn trọng opt-out.

## 4. Cấu trúc thư mục
```
CatLink/
├── README.md, PROJECT_RULES.md, CLAUDE.md, project.yml (XcodeGen)
├── Config/ (XCODE_SETUP, TESTFLIGHT_CHECKLIST, PRIVACY_NOTES)
├── CastLink/App/ (CastLinkApp, AppDependencies, RootTabView, AppBootstrapView)
├── CastLink/Core/Models|Persistence|Services|SharedUI/
├── CastLink/Features/Today|Library|Search|LinkDetail|ManualCapture|Onboarding|Settings/
├── CastLink/Resources/ (Localizable.xcstrings 246 keys, PrivacyInfo.xcprivacy, Assets, Info.plist)
├── ShareExtension/ (5 file: ViewController, CaptureView, ViewModel, Extractor, SharedContent)
├── CastLinkWidget/CastLinkWidget.swift
├── Tests/ (TestDoubles + ~14 test files; docs ghi 58/58 pass: 38 Swift Testing + 20 XCTest)
├── docs/ (PHASE_2,3,4,5,6, APP_STORE_METADATA, REVIEW_NOTES, PRIVACY_POLICY)
├── product-docs/ (README tổng quan, MVP Scope, UI UX Spec, Feasibility/kiến trúc, Feature Proposal post-MVP, QA-checklist)
└── openspec/ (specs & change archives)
```

## 5. Tech stack
| Lớp | Chọn |
|---|---|
| Platform/ngôn ngữ | iOS 17+, Swift 6, strict concurrency complete |
| UI | SwiftUI (UIKit chỉ ở Share entry), NavigationStack + TabView, Floating Tab Bar |
| Persistence | SwiftData local-first, #Predicate DB-side, cached container, VersionedSchema stub |
| IPC | App Groups `group.com.cuongtran.castlink` + NSFileCoordinator + atomic JSON queue |
| Capture | Share Extension + Manual Capture + Quick Paste clipboard |
| Reminder | UserNotifications local + BGTask `com.cuongtran.castlink.cleanup` (fetch+processing) + URL scheme `castlink` |
| Widget | WidgetKit Small/Medium |
| Packages | SPM, chỉ Firebase (Core+Analytics, optional) |
| Test | Swift Testing + XCTest, FakeRepository/FakeLogger/FakeLauncher |
| Build | XcodeGen (`project.yml`), scheme CastLink build 3 targets + test |

## 6. Luồng hoạt động chính
1. Lưu: Share Sheet/Manual/Dán nhanh → validate + canonicalKey (strip tracking, lowercase host, bỏ trailing /) + PasteGuard → ghi CaptureDraft → app active → CaptureImporter import idempotent (dedup active theo canonicalKey) → tạo SavedLink → hydrate metadata async (timeout 8s, fail → fallback domain) → schedule reminder → toast (Đổi giờ/Hoàn tác) + analytics.
2. Xử lý: Today sort 5 tầng + stale → title/CTA mở URL (ghi openedAt) / chrome mở Detail → swipe phải Xong / trái Xóa / context menu / bulk → UndoSnapshot 4.5s (single) / confirm (bulk) → cancel/reschedule noti + analytics.
3. Tìm lại: Library filter + global `.searchable` powerSearch (AND nhóm token, rank, highlight, suggestions, debounce) → kết quả có đủ swipe/context/detail.
4. Nhắc: dueAt → local noti (quiet-hour adjust) → chạm → deep link publisher → resolve notificationID→SavedLink → mở Detail (ghi openedAt); link đã xóa → ở lại tab, không crash.
5. Dọn + backup: on-launch + BGTask retention (nếu bật) → Settings backup JSON/CSV export, import JSON merge (skip trùng ID + trùng active URL, hydrate tối đa 30, post `.castLinkDataDidChange` reload Today/Library).

## 7. Quy tắc bắt buộc (từ PROJECT_RULES + UI spec)
- Không force unwrap/`try!`/silent catch; error domain rõ; logger không ghi note/full URL.
- Không query SwiftData trong `body`; LazyVStack/List; metadata async; extension appear <1s; launch→Today <500ms; search <100ms/500 links; 64 pending noti giới hạn.
- UI: Linear/Things 3 minimalist, không gradient AI; 2 theme (Classic 4 accent: Ocean #007AFF, Sage #0DA68C, Amber #FA851F, Indigo #615AF0 / Monochrome); hit-area 3-zone; haptics; a11y label; localization qua `String(localized:)`; tên hiển thị luôn "Cất Link".
- Git: 1 PR = 1 outcome; commit `feat:/fix:/test:/docs:/refactor:/chore:`; không commit secret/database.

## 8. Trạng thái & roadmap
- 1.0.0: 6 phases + hardening P0/P1/P2 xong, BUILD SUCCEEDED, chờ QA device thật → tag v1.0.0 → TestFlight internal (checklist trong `product-docs/QA-checklist.md`, metadata/review notes/privacy đã đủ).
- 1.1 đang code (chưa QA device): dedup share, notification actions nền, backup/restore, metadata hydrator + thumbnails.
- Post-MVP (chờ tín hiệu): snooze thông minh, collection theo intent thắng (Mua/Đi/Xem), CloudKit sync opt-in, browser extension, Siri/App Intents, Android, AI summary.

Nguồn chính: `README.md`, `PROJECT_RULES.md`, `product-docs/README.md`, `product-docs/MVP Scope and Expansion Roadmap.md`, `product-docs/UI UX Specification.md`, `product-docs/Feasibility Check iOS MVP.md`, `product-docs/Feature Proposal Post-MVP.md`, `product-docs/QA-checklist.md`, `docs/PHASE_2_LOCAL_FIRST.md`, `docs/PHASE_3_SHARE_EXTENSION.md`, `docs/PHASE_4_UI.md`, `docs/PHASE_5_POLISH.md`, `docs/PHASE_6_HANDOFF.md`, `docs/APP_STORE_METADATA.md`, `docs/APP_STORE_REVIEW_NOTES.md`, `project.yml`.
