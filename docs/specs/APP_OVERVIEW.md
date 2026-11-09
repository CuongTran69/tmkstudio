# Trạm Thiền Trà — Tổng quan toàn bộ App (APP_OVERVIEW)

> File tổng hợp duy nhất về app, được biên soạn từ toàn bộ docs trong repo
> (`SPEC.md`, `proposal.md`, `XCODE_CLOUD_SETUP.md`, `openspec/specs/*`,
> `openspec/changes/*`, `CLAUDE.md`, `AGENTS.md`, `AppStoreAssets/`).
> Cập nhật: 09/11/2026 — phiên bản **1.0.4 (build 66)**, branch `main`.

---

## 1. Giới thiệu app

**Trạm Thiền Trà** là ứng dụng iOS giúp người dùng thực hành thiền định qua nghi
thức uống trà và viết nhật ký biết ơn mỗi ngày. Giao diện mang đậm phong cách
**Việt Nam** — mộc mạc, gần gũi, chữa lành — lấy cảm hứng từ văn hóa trà shan
tuyết, cảnh sắc Tây Bắc và tâm hồn thiền của người Việt.

| Thuộc tính | Giá trị |
|---|---|
| Nền tảng | iOS only, SwiftUI, hỗ trợ iOS 16.0+ (design system mới target iOS 17+) |
| Đối tượng | Người Việt yêu thiền, yêu trà, thực hành mindfulness mỗi ngày |
| Phân loại App Store | Lifestyle / Personal Journaling |
| Bundle ID | `com.tramthientra.app` (widget: `com.tramthientra.app.TramThienTraWidget`) |
| Version hiện tại | Marketing **1.0.4**, build **66** |
| Định hướng review | Tuyệt đối KHÔNG dùng từ "Mental Health / Therapy / Mental Wellness" — chỉ dùng "Personal Journaling App", "Ghi lại điều tốt đẹp" |
| Backend | Go (đồng bộ & backup gratitude logs + APNs push ở v2); hiện tại v1 chạy local-first (SwiftData + Local Notification) |

Triết lý sản phẩm gói trong 2 nghi thức cốt lõi mỗi ngày:

- **Tích luỹ** — ghi lại điều biết ơn (nuôi dưỡng, giữ lại).
- **Buông bỏ** — viết ra phiền não rồi buông đi, không lưu trữ (riêng tư tuyệt đối).

Xung quanh đó là các phòng thực hành mở rộng: **Thiền Thở, Phòng Sám Hối,
Trà Đêm, Thư Gửi Tương Lai, Khoảnh Khắc (photo journal)**.

---

## 2. Tính năng chính

### 2.1 Onboarding (3 màn hình)

- Phong cách giấy dó, thủy mặc Việt Nam; màu nâu trà, xanh lá nhạt, kem ngà.
- Trang 1: Chào mừng — "Mỗi ngày, một tách trà…".
- Trang 2: Nghi thức Tích luỹ — ghi 3 điều biết ơn.
- Trang 3: Nghi thức Buông bỏ — viết rồi buông như khói trà.
- Swipeable `PageTabViewStyle`, nút "Bắt đầu" ở trang cuối, nút "Bỏ qua" góc phải.
- Cờ `hasCompletedOnboarding` trong UserDefaults; bỏ qua → vào thẳng Trà Thất, streak = 0.

### 2.2 Trà Thất (màn hình chính)

- Ấm trà shan tuyết bốc khói vẽ bằng SwiftUI Canvas (`TeapotSceneView`),
  5–8 hạt khói loop 0.8s, glow theo khung giờ.
- Nút Settings (trái trên), History (phải trên); 2 nút nghi thức
  Buông bỏ / Tích luỹ; **Cây thiền** (streak visualization) bên dưới.
- Từ dock điều hướng tới: Thiền Thở, Sám Hối, Trà Đêm, Thư Tương Lai,
  Khoảnh Khắc, History, Settings.
- **Nền động theo thời gian thực** (`NenDongView` + `ThoiGianViewModel`,
  timer 30s, 6 khung giờ, gradient 3-stop + mist + radial glow, reduce-motion safe):

| Khung giờ | Tên gọi |
|---|---|
| 05:00–07:59 | Sương sớm |
| 08:00–08:59 mở rộng | Buổi sáng (`buoiSang`) |
| 09:00–16:59 | Ban ngày |
| 15:00–17:59 | Chiều tà (`chieuTa`) |
| 17:00–18:59 | Hoàng hôn |
| 19:00–04:59 | Trà đêm |

- `ZenCard` đọc `cardOverlayOpacity` theo slot; text/icon/smoke/glow chuyển
  mượt `easeInOut` 2s; ban đêm glow nhân 0.55x.

### 2.3 Tích luỹ (Gratitude journaling)

- Header "Tích luỹ — Ngày dd/MM/yyyy"; 3 TextField, mỗi field **300 ký tự**.
- Validation linh hoạt: cho lưu 1, 2 hoặc 3 fields.
- Cùng ngày viết lại → **ghi đè** entry (update items), streak chỉ +1/ngày.
- Nút Lưu (giọt nước `NutGiotNuocView`: spring 0.5s + ripple 0.4s):
  haptic nhẹ → âm thanh `water_drop.mp3` → lưu SwiftData → ngầm sync BE nếu login.
- Chưa login → popup nhẹ: "Hãy tạo một góc nhỏ…" với [Đăng nhập với Apple] [Để sau].

### 2.4 Buông bỏ (Release)

- TextEditor lớn, placeholder mờ. Nút "Buông" → haptic nhẹ → text mờ dần,
  khói bay tan (`KhoiTanView`: easeInOut 2.0s, opacity 1→0, scale 1→1.3) →
  xoá sạch. **KHÔNG LƯU, không cần login, im lặng (không âm thanh).**

### 2.5 Cây thiền — Streak system

| Streak | Giai đoạn |
|---|---|
| 0 | Hạt giống (đứt streak) |
| 1–2 | Nảy mầm |
| 3–6 | Lá non |
| 7–29 | Cây xanh |
| 30–59 | Sum suê |
| 60+ | Đại thụ |

- Viết Tích luỹ 1 lần/ngày → +1; lỡ 1 ngày → reset 0 (so sánh
  `Calendar.current.startOfDay`). Hiển thị số ngày + animation growth theo phase.

### 2.6 Thiền Thở (ThienTho)

- Phòng thở có hướng dẫn: vòng thở (`BreathingCircleView` + `BreathingGuideView`),
  âm thanh `breath_in.mp3` / `breath_out.mp3` / `cycle_bell.mp3`,
  preset quản lý qua `AudioService` (thread-safe, xem openspec audio-*).

### 2.7 Phòng Sám Hối (SamHoi)

- 2 tab: **Sám Hối** (viết ăn năn theo gợi ý xoay vòng 6 căn — mắt/tai/mũi/
  lưỡi/thân/ý, lời nguyện chuyển hoá, animation khói khi gửi, câu trích dẫn)
  và **Kinh Tụng** (bài "Sám Hối Sáu Căn" 6 đoạn, đọc thiền).
- Không lưu trữ (privacy by design), tái dùng `KhoiTanView`, `NenDongView`, Zen*.

### 2.8 Trà Đêm (Nighttime wind-down ritual)

- Chuỗi dẫn 5 phase buổi tối: Mở đầu → Buông bỏ → Thở → Chúc lành → Kết thúc
  (`TraDemView` + 5 subview + `TraDemViewModel`), dùng quotes ban đêm riêng,
  tạo vòng lặp retention mỗi tối.

### 2.9 Thư Gửi Tương Lai (FutureLetter)

- Viết thư, niêm phong 1/3/6/12 tháng, nhận notification khi mở phong,
  đọc kèm animation con dấu sáp (`WaxSealAnimationView`), quản lý list/đọc/xoá.
- Model SwiftData `FutureLetter`; `NotificationService` mở rộng
  `scheduleFutureLetterReminder`.

### 2.10 Khoảnh Khắc / Khánh Khắc (Photo journal)

- Chụp/lưu khoảnh khắc đẹp trong ngày (`KhoanhKhacCaptureView` → Album → Detail),
  model `MomentLog`, `KhoanhKhacViewModel`.

### 2.11 Lịch sử (History)

- List các ngày Tích luỹ (load 20 entry, infinite scroll; chưa có search —
  để v2), preview 1 dòng, tap → chi tiết, swipe-to-delete có xác nhận,
  empty state dẫn dắt.

### 2.12 Cài đặt (Settings)

- Nhắc nhở hàng ngày (toggle, mặc định bật, 21:00 mỗi tối; time-picker +
  onboarding xin quyền + local reminder — xem openspec notification-*).
- Sign in with Apple / Đăng xuất; Privacy Policy link; hiển thị version.

### 2.13 Widget tương tác

- `TramThienTraWidget` (Small + Medium): hiển thị streak/quote theo khung giờ
  (`WidgetThoiGian`, `WidgetTimelineProvider`), chia sẻ dữ liệu qua
  `WidgetDataProvider` + App Group, intents tương tác (`WidgetIntents`).

### 2.14 Monetization & Âm thanh

- `AdManager` + `InterstitialAdViewModel` / `RewardedAdViewModel` (Google-Mobile-Ads,
  `GoogleService-Info.plist`).
- `AudioService` (AVFoundation): `pour_tea.mp3`, `water_drop.mp3`, `bell.mp3`,
  presets trong `Resources/presets/`; `HapticService` bọc UIImpactFeedback.

---

## 3. Kiến trúc

- **Pattern:** MVVM — `App/` → `Models/` → `ViewModels/` → `Views/` →
  `Services/` → `Utilities/` + `Shared/` + `Resources/`.
- **UI:** SwiftUI; `@StateObject/@EnvironmentObject` (iOS 16) và `@Observable`
  (iOS 17+); `TimelineView` cho animation liên tục; `LazyView` lazy-load tab.
- **Dữ liệu:** SwiftData (`GratitudeLog`, `AppUser`, `FutureLetter`, `MomentLog`,
  `TeaMood`); guest-first, login Apple để backup; cờ `synced/syncPending`,
  retry 3 lần + toast nhẹ; conflict last-write-wins (theo SPEC backend Go
  `/api/v1/`, upsert theo date — backend hiện ngoài scope repo này).
- **Thông báo:** UserNotifications local (nhắc 21:00 + thư tương lai);
  `NotificationService` + `NotificationReminderService`; APNs token sẵn cho v2.
- **Auth:** AuthenticationServices — Sign in with Apple duy nhất.
- **Design system:** `ZenCard` (glassmorphism), `ZenButton` (primary/secondary),
  `ZenTextField`, `ZenScreenHeader`, `ZenSquareButton`, `ZenFeatureTray`,
  `ZenFeaturedCard`; tokens màu `zenSage/zenSageLight`, nâu trà, vàng ấm
  (thay `zenAccent` cũ); typography thêm `display/subheadline/caption2`;
  44×44pt touch target, VoiceOver đầy đủ, tương phản WCAG AA, hỗ trợ
  reduce-motion.
- **Âm/haptic:** AVFoundation + `UIImpactFeedbackGenerator`.
- **Quảng cáo:** Google Mobile Ads. **Widget:** WidgetKit + App Intents.
- **Privacy:** `PrivacyInfo.xcprivacy`; Buông bỏ/Sám Hối không persistence.

---

## 4. Cấu trúc thư mục (thực tế trên `main`)

```
TramThienTra/
├── APP_OVERVIEW.md              # file này
├── SPEC.md                      # spec gốc v1 (tiếng Việt, đầy đủ nhất)
├── proposal.md                  # đề xuất scaffold ban đầu (đường dẫn cũ ZenTea)
├── XCODE_CLOUD_SETUP.md         # hướng dẫn CI Xcode Cloud
├── AGENTS.md / CLAUDE.md        # quy ước agent + GitNexus
├── project.yml                  # nguồn sinh .xcodeproj (XcodeGen)
├── TramThienTra.xcodeproj/
├── ci_scripts/ci_post_clone.sh  # cài XcodeGen trên CI
├── AppStoreAssets/              # banner App Store (header/search/universal)
├── openspec/
│   ├── specs/                   # 15 specs sống: audio-*, future-letter,
│   │                            # khanh-khac, kinh-tung, nighttime-ritual,
│   │                            # notification-*, privacy-manifest,
│   │                            # sam-hoi, tea-leaf, widget-*
│   └── changes/                 # 1 change đang mở (zentea-ui-ux-redesign)
│                                # + 10 changes đã archive (trathat, zentea-wiring,
│                                # theme, streak, notification-flow, sam-hoi,
│                                # audioservice, widget, apple-review, khanh-khac,
│                                # thu-tuong-lai, ios-xcode-bootstrap)
├── TramThienTra/
│   ├── App/TramThienTraApp.swift        # @main + SwiftData container
│   ├── Models/ (AppUser, GratitudeLog, FutureLetter, MomentLog, TeaMood)
│   ├── ViewModels/ (TraThat, TichLuy, BuongBo, Streak, ThoiGian, ThienTho,
│   │                SamHoi, TraDem, FutureLetter, KhoanhKhac,
│   │                InterstitialAd, RewardedAd)
│   ├── Views/
│   │   ├── Onboarding/ TraThat/ (TraThatView, TeapotSceneView)
│   │   ├── TichLuy/ (TichLuyView, NutGiotNuocView)
│   │   ├── BuongBo/ (BuongBoView, KhoiTanView)
│   │   ├── ThienTho/ (ThienThoView, BreathingCircle/GuidеView)
│   │   ├── SamHoi/ (SamHoiView, HuongTramView)
│   │   ├── TraDem/ (TraDemView + 5 phase views + ContentCard)
│   │   ├── ThuGuiTuongLai/ (list, write, detail, wax-seal, info sheet)
│   │   ├── KhoanhKhac/ (capture, album, detail)
│   │   ├── History/ (list + detail)  Settings/ (SettingsView)
│   │   └── Components/ (NenDongView, LaTraView, Zen* 8 món,
│   │                     AppleDangNhapView, LoginPromptView,
│   │                     NotificationPromptView)
│   ├── Services/ (AudioService, AuthService, HapticService,
│   │              NotificationService, NotificationReminderService, AdManager)
│   ├── Shared/ (HealingQuotes, SharedConstants, WidgetDataProvider)
│   ├── Utilities/ (ThoiGian, Constants, LazyView, SwiftUIExport)
│   ├── Resources/ (Assets.xcassets, *.mp3, presets/)
│   ├── TramThienTraWidget/ (Bundle, TimelineProvider, Entry,
│   │                        Small/Medium views, Intents, WidgetThoiGian)
│   ├── Info.plist / GoogleService-Info.plist / TramThienTra.entitlements /
│   │  PrivacyInfo.xcprivacy
├── TramThienTraTests/TramThienTraTests.swift
├── .claude/ .augment/           # skills + agents của tooling (không phải tính năng app)
```

---

## 5. Màn hình & luồng chính

```
Mở app
 ├─ Chưa onboarding → Onboarding 3 trang → Trà Thất
 └─ Đã onboarding → Trà Thất (Tea Room)
      ├─ Tích luỹ → lưu → streak +1 → về Trà Thất
      ├─ Buông bỏ → viết → Buông (xoá, không lưu) → ở lại
      ├─ Thiền Thở → vòng thở có nhạc → xong
      ├─ Phòng Sám Hối → [Sám Hối | Kinh Tụng] → khói tan
      ├─ Trà Đêm → 5 phase dẫn trước ngủ
      ├─ Thư Gửi Tương Lai → viết → niêm phong → đợi mở
      ├─ Khoảnh Khắc → chụp → album
      ├─ History → chi tiết / xoá
      └─ Settings → nhắc giờ, Apple login, privacy, version
```

Quyết định then chốt (từ SPEC §1.1): streak 1 entry/ngày; ghi đè cùng ngày;
giới hạn 300 ký tự; reset 00:00 local; guest dùng thoải mái, login chỉ khi cần
giữ dữ liệu; portrait iPhone; Noto Serif tiêu đề + SF Pro body; lưới 8pt,
card 16pt, button 12pt.

---

## 6. Data model (SwiftData @Model)

- **GratitudeLog** — `date`, `items[]` (1–3 chuỗi), `synced/syncPending`;
  upsert theo ngày, unique (user, date) phía BE.
- **AppUser** — `appleUserId`, `apnsToken`, `createdAt`.
- **FutureLetter** — nội dung thư + ngày niêm phong/mở + trạng thái đã đọc.
- **MomentLog** — ảnh + chú thích khoảnh khắc.
- **TeaMood** — tâm trạng trà (dùng cho widget/tray).
- Quy tắc sync (SPEC §3.2): guest→login migrate toàn bộ local lên BE;
  background sync khi có mạng; retry 3 lần; last-write-wins.

Schema BE tham khảo (Go + Postgres, ngoài repo): `users(id, apple_user_id,
apns_token, created_at)`, `gratitude_logs(id, user_id, date, items JSONB,
created_at, updated_at, UNIQUE(user_id, date))`, API `/api/v1/auth/apple`,
`/logs`, `/logs/:date`, `/apns-token`.

---

## 7. Build / Release

- **Hiện tại:** Marketing 1.0.4, build 66 (cả app + widget target),
  team `QWP9AN675X`, `project.yml` (XcodeGen) sinh `.xcodeproj`.
- **CI:** Xcode Cloud — push `main` → build Archive Release → test
  (scheme TramThienTra, iPhone 16 Pro) → TestFlight Internal;
  `ci_post_clone.sh` cài XcodeGen; free tier 25 giờ/tháng.
  Lịch sử commit gần nhất: bump 1.0.4/66 cho App Store, fix TestFlight
  (`CI_BUILD_NUMBER`, `agvtool` force 1.0.2).
- **Signing:** Xcode Cloud tự quản lý cert/profile; Bundle ID đã đăng ký,
  app đã có trên App Store Connect.
- **Test:** `TramThienTraTests/` hiện tối giản (1 file).
- **AppStoreAssets/**: 3 banner (header 3840×1646, search 3840×2560,
  universal 5244×2950, cả .jpg + .png).
- **Apple Review:** Lifestyle/Personal Journaling, không ép login, Sign in
  with Apple, Privacy Policy URL + `PrivacyInfo.xcprivacy` bắt buộc,
  không ads/social feed gây khó.

---

## 8. Hướng dẫn dev (ngắn)

1. Clone → `xcodegen generate` (nếu thiếu `.xcodeproj`) → mở
   `TramThienTra.xcodeproj`.
2. Đọc `SPEC.md` (tính năng), `openspec/specs/*` (chi tiết từng capability),
   file này (bản đồ tổng).
3. Quy ước agent: trước khi sửa symbol phải chạy `gitnexus_impact`,
   cảnh báo khi HIGH/CRITICAL; không rename bằng find-replace;
   trước commit chạy `gitnexus_detect_changes` (xem `CLAUDE.md`).
4. Màu/typography/animation dùng Zen* tokens — không hardcode hex mới;
   mọi màn hình mới phải có VoiceOver label + reduce-motion path.
5. Muốn hiểu luồng: `gitnexus_query("concept")` thay vì grep;
   cần full context: `gitnexus_context("SymbolName")`.
6. Đẩy lên `main` → Xcode Cloud tự build/TestFlight; lỗi xem Report
   Navigator → Cloud hoặc App Store Connect → Xcode Cloud.

---

## 9. Danh mục docs đã tổng hợp (toàn repo)

**Root (4):** `SPEC.md`, `proposal.md`, `XCODE_CLOUD_SETUP.md`,
`AGENTS.md` (+ `CLAUDE.md` là quy ước GitNexus).

**`openspec/specs/` (15):** audio-effect-playback, audio-preset-management,
audio-thread-safety, future-letter, khanh-khac, kinh-tung-sutra-reader,
nighttime-ritual, notification-onboarding, notification-reminder,
notification-time-picker, privacy-manifest, sam-hoi-repentance,
tea-leaf-visualization, widget-display, widget-interaction.

**`openspec/changes/` (11, trong đó 10 archived + 1 active):**
archive/ios-xcode-bootstrap; 2026-04-23-trathat-direction-a-redesign;
2026-04-23-zentea-integration-wiring; 2026-04-24-dynamic-theme-system;
2026-04-24-streak-tea-leaf-redesign; 2026-04-28-fix-notification-permission-flow
(+ verify-fixes); 2026-04-29-feat-phong-sam-hoi; 2026-04-29-fix-audioservice-issues;
2026-05-04-interactive-widget; 2026-05-07-apple-review-fixes;
2026-05-10-khanh-khac-photo-journal; 2026-05-14-thu-gui-tuong-lai-tra-dem
(+ verify-fixes); active/zentea-ui-ux-redesign (design-system, gradient-system,
view-redesign, animation-enhancements, accessibility).

**`AppStoreAssets/` (6):** 3 banner × (jpg+png).

**`.claude/` + `.augment/` (~90 file):** skills/agents của tooling
(gitnexus-*, feat/fix/docs/test/ci/docker…), không mô tả tính năng app nên
không đưa vào nội dung tổng hợp, chỉ liệt kê để đủ danh mục.

---

*Hết file tổng hợp. Chi tiết sâu xem `SPEC.md` (gốc) và `openspec/specs/*`
(từng capability).*
