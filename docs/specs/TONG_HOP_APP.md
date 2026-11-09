# Paletto — Tài liệu tổng hợp toàn bộ App

> File tổng hợp duy nhất về app Paletto: tổng quan, tính năng, kiến trúc, cấu trúc thư mục, luồng hoạt động, công nghệ, trạng thái hiện tại.
> Nguồn: `docs/index.html`, `docs/privacy.html`, toàn bộ `openspec/specs/*/spec.md`, source `Paletto/`, `PalettoWidget/`, `PalettoTests/`.
> Ngày tổng hợp: 09/11/2026.

---

## 1. Tổng quan app

**Paletto** là ứng dụng iOS (SwiftUI) giúp **trích xuất, tạo, quản lý và chia sẻ bảng màu (color palette)**.

- Slogan (theo `docs/index.html`): "Extract, create, and manage beautiful color palettes on iOS."
- Đối tượng: designer, developer iOS/Android/Web cần lấy màu từ ảnh, kiểm tra tương phản WCAG, sinh harmony, export code.
- Quyền riêng tư tuyệt đối: **không thu thập dữ liệu**, mọi xử lý on-device, chỉ xin quyền Camera/Photo khi user trích xuất màu (`docs/privacy.html`, hiệu lực 17/03/2026).
- Liên hệ hỗ trợ: cuongtran17796@gmail.com.
- Local storage: `UserDefaults` (settings) + **App Group container** (`group.com.paletto.shared`) chia sẻ dữ liệu palette giữa app và widget. Không có backend, không tracking, không quảng cáo.

### 4 tab chính (`Paletto/App/ContentView.swift`)

| Tab | View | Chức năng |
|-----|------|-----------|
| 0. Extract | `PaletteExtractionView` | Trích xuất palette từ ảnh (photo picker), kính lúp chọn màu, k-means |
| 1. Camera | `CameraColorPickerView` | Chấm màu trực tiếp từ camera |
| 2. Library | `PaletteListView` | Thư viện palette: tìm kiếm, lọc tag, folder, xem chi tiết |
| 3. Settings | `SettingsView` | Ngôn ngữ, theme, haptic, số màu mặc định, bật/tắt animation preview |

---

## 2. Tính năng chính

### 2.1. Trích xuất palette từ ảnh (PaletteExtraction)
- File: `Paletto/Features/PaletteExtraction/` (5 file: `PaletteExtractionView`, `PaletteExtractionViewModel`, `ImageAnalysisView`, `PhotoPickerView`, `ColorSwatchView`, `MagnifierOverlay`).
- Thuật toán: downsample ảnh về 100x100 (`Constants.Image.downsampleSize`), chạy **k-means** tối đa 20 vòng lặp x 3 lần chạy, lấy màu trội (`ColorExtractionService`, `ImageAnalysisService`).
- Giới hạn hiển thị: ảnh > 1600px được downsample khi chọn (`maxDisplayDimension`).
- **Pixel cache thread-safe** (spec `palette-extraction-pixel-cache`): `buildPixelData` chỉ dùng CoreGraphics (`CGContext.draw(cgImage:)`, `cgImage.width/height`), KHÔNG dùng UIKit context API để tránh crash khi chạy background thread. `pickColor(at:)` đọc từ buffer đã cache khi user rê kính lúp.
- Số màu mỗi palette: min 3, max 10, mặc định 5.

### 2.2. Chấm màu camera (ColorPicker)
- `CameraColorPickerView`, `CameraPreviewView` — preview camera + lấy màu tại điểm chạm.

### 2.3. Chi tiết palette (PaletteDetail)
- File: `Paletto/Features/PaletteDetail/` (`PaletteDetailView`, `PaletteDetailViewModel`, `ColorDetailRow`, `ContrastMatrixView`, `PreviewCardView`).
- Sửa tên palette → persist xuống đĩa ngay khi confirm (checkmark/return), quay lại Library thấy tên mới (spec `palette-detail-editing`).
- Gán **ColorRole** cho từng màu (Background, Primary, Secondary, Accent... — `ColorRole.swift`), nút "Auto Assign Roles".
- **Contrast fix**: gợi ý chỉnh màu để đạt WCAG, áp dụng 1 chạm.
- **Animation preview** (spec `palette-animation-preview`): picker 4 chế độ Off / Pulsing / Hue Rotation / Brightness Breathing trên preview card (3 layout: appCard, dashboard, blogPost).
  - Pulsing: brightness 0.7→1.0 theo sin, chu kỳ 2.5s.
  - Hue Rotation: hue quay 0°→360°/2.5s.
  - Brightness Breathing: brightness dao động ±20% quanh giá trị gốc, clamp [0,1].
  - Tôn trọng `accessibilityReduceMotion` và toggle toàn cục `previewAnimationEnabled` trong Settings (mặc định bật).
- **Undo/Redo** (spec `palette-undo-redo`): bật `isUndoEnabled(true)` trên WindowGroup; Detail hỗ trợ undo đổi role, sửa tên, auto-assign, contrast fix; Extraction hỗ trợ undo thêm/xóa/sắp xếp màu; gộp (coalesce) thao tác cùng loại trong 0.5s; xóa palette KHÔNG undo được; có haptic khi bật.

### 2.4. Thư viện — tìm kiếm, tag, folder
- `PaletteListView` + `PaletteListViewModel` + `FolderSection` + `TagFilterBar`.
- **Refresh không chớp spinner** (spec `palette-list-refresh`): lần đầu hiện spinner; quay lại từ Detail hay chuyển tab thì reload từ đĩa nhưng giữ dữ liệu cũ, không flash loading.
- **Tags** (spec `palette-tags`, `ColorPalette.version = 2`): mỗi palette có `tags: [String]`, tối đa 20 tag, mỗi tag ≤ 50 ký tự, cấm `/`, cấm rỗng. Migration v1→v2 tự điền `tags: []`. TagFilterBar: chip "All" + chip từng tag (kèm count), chip "+ New Tag"; kết hợp được với search text (AND). PaletteDetail có tag editor (chip + nút ×).
- **Folders** (spec `palette-folders`): struct `Folder { id, name, paletteIds, createdAt, updatedAt }`, lưu `folders.json` trong Application Support, tối đa 50 folder, tên ≤ 100 ký tự, cấm trùng tên. Một palette thuộc 0..1 folder. Xóa folder không xóa palette (thành uncategorized). Library có section "My Folders" collapsible, tap vào folder lọc list, có empty state.

### 2.5. Màu sắc chuyên sâu
- **ColorHarmony** (`ColorHarmonyView/ViewModel`, `ColorHarmonyService`, `HarmonyType`): sinh complementary, triadic, ... từ màu gốc.
- **ColorBlindness** (`ColorBlindnessView/ViewModel`, `ColorBlindnessService`, `ColorBlindnessType`): mô phỏng các dạng mù màu để kiểm tra accessibility.
- **ContrastChecker** (`ContrastCheckerService`): tỉ lệ tương phản theo WCAG 2.2 (AA normal 4.5, AA large 3.0, AAA normal 7.0, AAA large 4.5) + ma trận contrast trong Detail.
- **PaletteComparison** (`PaletteComparisonView/ViewModel`, `PaletteComparisonService`): so sánh 2 palette cạnh nhau (dùng CIELAB — xem `Color+CIELAB.swift`).
- Extensions màu: `Color+Hex`, `Color+Luminance`, `UIImage+Resize`, `View+OnChangeCompat`.

### 2.6. Export & Chia sẻ
- **Export** (`ExportView`, `ExportService` + protocol): 9 định dạng (`ExportFormat`): image (PNG), SwiftUI, CSS, Tailwind (JS), Jetpack Compose (KT), Flutter (Dart), SVG, danh sách HEX (TXT), JSON design tokens.
- **Sharing** (`SharePaletteView`, `QRCodeGenerator`, `PaletteSharingService`): mã hóa palette thành URL `paletto://palette?n=NAME&c=HEX1,HEX2,...`, hiển thị QR code; app nhận URL → decode → lưu qua `PaletteStorageService.shared` → mở sheet Detail. URL sai → alert "invalid link".

### 2.7. Widget màn hình chính (`PalettoWidget/`)
4 file: `PalettoWidget.swift`, `PalettoWidgetBundle.swift`, `PalettoWidgetEntryView.swift`, `PalettoWidgetExtension.entitlements` + `AppIntents/SelectWidgetPaletteIntent.swift` trong app.

- **3 slot độc lập** (spec `widget-multi-slot-storage`, `widget-multiple-palettes`): key `widget_small`, `widget_medium`, `widget_large` trong App Group UserDefaults, mỗi slot lưu `WidgetConfig { palette: WidgetPalette?, updatedAt }`. `WidgetPalette { id, name, hexColors, colorRoles }` — gọn nhẹ, không kèm ảnh.
- **3 kích thước** (spec `widget-large-size`): small/medium/large; large hiện tên (tối đa 2 dòng), tối đa 8 swatch (mỗi swatch: màu + hex + role), footer "Paletto · Tap to open", empty state "Set a palette in Paletto", hỗ trợ VoiceOver đọc hex + role.
- **Set as Widget**: trong Detail có action sheet Small/Medium/Large → `SharedDataService.setWidgetPalette(_:forKind:)` → `reloadTimelines(ofKind:)` + toast xác nhận.
- **AppIntent iOS 17+** (spec `widget-appintent-config`): `SelectWidgetPaletteIntent` cho phép long-press → Edit Widget → chọn palette + size ngay ngoài Home Screen; iOS 16 fallback `StaticConfiguration`, gate `#available(iOS 17.0,*)`.
- **Deep link** (spec `widget-deep-link-navigation`): tap widget mở `paletto://palette/{UUID}` → app chuyển tab Library → điều hướng tới Detail đúng palette; UUID sai / palette đã xóa → chỉ về Library; link đến trước khi list load xong → đợi load xong mới navigate.
- Sửa palette đang dùng trong widget (đổi tên/màu) → `reloadAllTimelines()`.

### 2.8. Đa ngôn ngữ, theme, cài đặt
- `LocalizationManager` + `AppLanguage` (Anh/Việt qua `en.json`/`vi.json`), `LocalizationKeys`, `String+Localized`. Đổi ngôn ngữ force re-render (`ContentView.id(language)`).
- `ThemeManager` + `AppTheme`, `SemanticColors`, `ScaleButtonStyle`; `preferredColorScheme` toàn app.
- `SettingsManager`: haptic feedback, số màu mặc định, export format mặc định, ngôn ngữ, theme, `previewAnimationEnabled`.
- `FirebaseService` (đã cấu hình `GoogleService-Info.plist`, `configure()` trong `PalettoApp.init`) — lưu ý `privacy.html` ghi "không tích hợp third-party thu thập dữ liệu"; cần đối chiếu lại cấu hình Firebase thực tế trước khi release.

---

## 3. Kiến trúc

### 3.1. Sơ đồ tổng thể

```
PalettoApp (@main)
 ├─ ThemeManager / LocalizationManager / FirebaseService (StateObject)
 ├─ ContentView (TabView 4 tab)
 │    ├─ PaletteExtractionView ── PaletteExtractionViewModel
 │    ├─ CameraColorPickerView ── CameraColorPickerViewModel
 │    ├─ PaletteListView ── PaletteListViewModel ── PaletteDetailView ── PaletteDetailViewModel
 │    │       ├─ ContrastMatrixView / PreviewCardView / ColorDetailRow
 │    │       ├─ ColorHarmony / ColorBlindness / ContrastChecker / Comparison / Export / Sharing
 │    └─ SettingsView
 ├─ onOpenURL: widget deep link + sharing link
 └─ WindowGroup.isUndoEnabled (Swift 6+)
PalettoWidget (extension riêng, đọc App Group)
```

### 3.2. MVVM + Service + Protocol
- Mỗi Feature gồm `View` + `ViewModel`; ViewModel gọi Service qua **protocol** (`Core/Services/Protocols/` — 11 protocol: Storage, Extraction, Harmony, Blindness, Contrast, Comparison, Export, Folder, ImageAnalysis, Settings, Theme) nên dễ mock/test.
- **Singleton dùng chung**: `PaletteStorageService.shared` (mọi ViewModel dùng chung `fileQueue` để serialize I/O — spec `palette-storage`), `SharedDataService.shared`, `ThemeManager.shared`, `LocalizationManager.shared`, `FirebaseService.shared`, `SettingsManager`.
- Models (`Core/Models/`): `ColorPalette` (id, name, colors, createdAt, updatedAt, sourceImageData?, version=2, tags), `PaletteColor` (id, hex, RGB, alpha, role? + hàm tính luminance/hue/saturation/brightness + `animatedColor`), `ColorRole`, `HarmonyType`, `ColorBlindnessType`, `ExportFormat` (9 loại), `Folder`, `WidgetKind`/`WidgetConfig` (trong Constants.swift).

### 3.3. Luồng dữ liệu & lưu trữ

| Dữ liệu | Nơi lưu | Ghi chú |
|---------|---------|---------|
| Palette | 1 file JSON / palette trong `Application Support/Palettes/` | `PaletteStorageService` (singleton, serial queue), migration v1→v2 qua `PaletteMigration` |
| Folder | `folders.json` (Application Support) | `FolderStorageService`; file hỏng → khởi tạo rỗng, không crash |
| Widget slot | App Group UserDefaults `widget_small/medium/large` | `SharedDataService`; fallback standard UserDefaults nếu thiếu App Group |
| Settings | UserDefaults (key trong `Constants.Storage`) | Ngôn ngữ, theme, haptic, số màu, animation toggle |
| Ảnh gốc | `sourceImageData` trong JSON palette (optional) | Có thể phình file — đã có downsample khi chọn |

### 3.4. Luồng hoạt động chính

1. **Tạo palette từ ảnh**: Extract tab → chọn ảnh (downsample nếu >1600px) → k-means → cache pixel (background, CoreGraphics) → kính lúp chọn/thêm màu → undo được → Save → JSON vào `Palettes/` → Library reload (không flash spinner).
2. **Quản lý trong Library**: search + tag filter (AND) + folder filter → mở Detail → sửa tên/role/tag → save đĩa → reload widget nếu palette đang gắn widget.
3. **Dùng màu chuyên sâu**: từ Detail đi tới Harmony / Blindness / Contrast matrix / Comparison → áp contrast fix (undo được).
4. **Export/Share**: Detail → Export (1 trong 9 format) hoặc Share (QR + URL `paletto://`) → máy khác mở URL → decode → save → xem Detail.
5. **Widget**: Detail → Set as Widget (chọn size) hoặc Edit Widget ngoài Home Screen (iOS 17+) → ghi App Group slot → timeline reload → tap widget → deep link `paletto://palette/{UUID}` → mở đúng Detail.

---

## 4. Cấu trúc thư mục (thực tế trong repo)

```
Paletto/
 ├─ Paletto/                          # App chính
 │   ├─ App/                          # PalettoApp.swift, ContentView.swift (4 tabs + onOpenURL)
 │   ├─ AppIntents/                   # SelectWidgetPaletteIntent.swift (Edit Widget iOS 17+)
 │   ├─ Core/
 │   │   ├─ Models/                   # ColorPalette, PaletteColor, ColorRole, Folder, HarmonyType,
 │   │   │                           # ColorBlindnessType, ExportFormat
 │   │   ├─ Services/                 # 15 service + Protocols/ (11 protocol)
 │   │   │                           # Extraction, ImageAnalysis, Harmony, Blindness, Contrast,
 │   │   │                           # Comparison, Export, Sharing, PaletteStorage, FolderStorage,
 │   │   │                           # SharedDataService (widget), SettingsManager, FirebaseService
 │   │   ├─ Extensions/               # Color+CIELAB/Hex/Luminance, UIImage+Resize, View+OnChangeCompat
 │   │   ├─ Theme/                    # AppTheme, SemanticColors, ScaleButtonStyle (+ThemeManager)
 │   │   ├─ Localization/             # AppLanguage, LocalizationManager, Keys, en.json, vi.json
 │   │   └─ Utilities/                # AppError, Constants (mọi giới hạn/magic number), PaletteMigration,
 │   │                                # UndoManager+Helpers
 │   ├─ Features/ (11 nhóm)
 │   │   ├─ PaletteExtraction/  PaletteList/  PaletteDetail/  PaletteComparison/
 │   │   ├─ ColorPicker/  ColorHarmony/  ColorBlindness/  ContrastChecker(vỏ, logic ở Service)/
 │   │   └─ Export/  Sharing/  Settings/
 │   └─ Resources/                    # Assets, Info.plist, GoogleService-Info.plist, PrivacyInfo
 ├─ PalettoWidget/                    # Extension widget (4 file + entitlements)
 ├─ PalettoTests/ (7 file)            # Blindness, Harmony, Contrast, Export, Sharing, Animation, UndoRedo
 ├─ docs/                             # index.html (landing), privacy.html, appstore_assets/ (screenshot)
 ├─ openspec/specs/ (13 spec)         # palette-animation-preview, palette-detail-editing,
 │                                    # palette-extraction-pixel-cache, palette-folders, palette-list-refresh,
 │                                    # palette-storage, palette-tags, palette-undo-redo,
 │                                    # widget-appintent-config, widget-deep-link-navigation,
 │                                    # widget-large-size, widget-multi-slot-storage, widget-multiple-palettes
 ├─ openspec/changes/                 # fix-extract-color-limit (đang làm) + archive (6 change đã xong)
 ├─ generate_appstore_assets.py       # Script sinh ảnh App Store
 ├─ Podfile / Pods/                   # CocoaPods (cần kiểm tra còn dùng gì)
 └─ README.md                         # Hiện chỉ còn 1 dòng "# Paletto"
```

---

## 5. Công nghệ

- **Ngôn ngữ/UI**: Swift 6 (có gate `#if swift(>=6.0)` cho Undo), SwiftUI, WidgetKit, AppIntents (iOS 17+), still hỗ trợ iOS 16 (fallback StaticConfiguration).
- **Ảnh/màu**: CoreGraphics (pixel cache), CoreImage (ngầm qua CI), thuật toán k-means tự cài, CIELAB cho so sánh màu, WCAG 2.2 cho contrast.
- **Lưu trữ**: File JSON + UserDefaults + App Group (`group.com.paletto.shared`); chưa dùng SwiftData/CoreData.
- **Khác**: Firebase (đã nhúng config — cần rà soát), CocoaPods, QRCode (tự sinh), localization Anh–Việt, Sensory haptic, VoiceOver cho widget.
- **Test**: 7 file XCTest trong `PalettoTests/` (service + animation + undo/redo). Chưa thấy UI test.

---

## 6. Trạng thái hiện tại & việc cần chú ý

1. **Đã hoàn thành (trong archive)**: fix bug cao/trung bình (03/2026), widget multi-size (03–04/2026), organization pack v1.2 (folder+tag), animation preview + undo/redo (04/2026).
2. **Đang làm**: `openspec/changes/fix-extract-color-limit` — cần đọc proposal/tasks của change này để biết phạm vi.
3. **Rủi ro / cần rà soát**:
   - `README.md` gốc gần như trống; file này (`docs/TONG_HOP_APP.md`) hiện là tài liệu đầy đủ duy nhất.
   - `FirebaseService` + `GoogleService-Info.plist` tồn tại trong khi privacy policy tuyên bố "no third-party SDK" — kiểm tra: nếu Firebase chỉ build local / chưa bật Analytics-Crashlytics thì hoặc gỡ, hoặc cập nhật privacy.
   - `sourceImageData` lưu trong JSON palette có thể làm file nặng — cân nhắc tách ảnh ra file riêng nếu palette có ảnh lớn.
   - `ContrastChecker` thư mục Features đang trống (logic nằm ở Service) — hoặc bổ sung view riêng, hoặc ghi chú rõ.
   - CocoaPods (`Podfile`/`Pods/`) — xác nhận còn dependency nào thật sự dùng, nếu không thì dọn để giảm gánh nặng build.
4. **Luồng xác minh nhanh sau khi đọc file này**: mở app → Extract ảnh → Save → Library tìm/lọc tag/folder → Detail sửa tên + gán role + animation preview → Set as Widget → tap widget deep link → Export 1 format → Share QR sang máy khác.

---

## 7. Bảng tra cứu nhanh (spec → code)

| Spec | Code chính |
|------|-----------|
| palette-animation-preview | `PaletteColor.animatedColor`, `PreviewCardView`, `PaletteDetailViewModel`, `SettingsManager.previewAnimationEnabled` |
| palette-detail-editing | `PaletteDetailViewModel` + `PaletteStorageService` |
| palette-extraction-pixel-cache | `PaletteExtractionViewModel.buildPixelData/pickColor` |
| palette-folders | `Folder.swift`, `FolderStorageService`, `FolderSection`, `PaletteListViewModel` |
| palette-list-refresh | `PaletteListView`, `PaletteListViewModel.loadAll` |
| palette-storage | `PaletteStorageService.shared`, `PalettoApp` |
| palette-tags | `ColorPalette.tags/version`, `PaletteMigration`, `TagFilterBar` |
| palette-undo-redo | `PalettoApp.isUndoEnabled`, `UndoManager+Helpers`, Detail + Extraction ViewModels |
| widget-* (5 spec) | `SharedDataService`, `WidgetKind/WidgetConfig/WidgetPalette`, `SelectWidgetPaletteIntent`, `PalettoWidget/*`, `PalettoApp.handleIncomingURL` |

---

*Hết file tổng hợp. Khi code thay đổi (đặc biệt 13 spec trên), cập nhật lại các mục 2–4 cho khớp.*
