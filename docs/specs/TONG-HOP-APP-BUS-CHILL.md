# Bus Chill (Bus Companion) — Tổng hợp toàn app

> Tài liệu tổng hợp duy nhất, rút từ: `Bus Companion Screens.md`, `Bus Companion ui ux design.md`, `AppEncryptionDocumentation.md` và toàn bộ 33 file `openspec/specs/*/spec.md`.
> Ngôn ngữ: tiếng Việt. Cập nhật: 2026-11-09.

---

## 1. Tổng quan app

- **Tên:** Bus Chill (bundle `com.cuongtran.BusCompanion`, v1.0.0 build 1). Tên cũ trong tài liệu thiết kế: Bus Companion.
- **Nền tảng:** iOS 26.2+ (dùng AlarmKit), Apple Watch là companion ở V1 (theo spec `watch-companion`).
- **Đối tượng:** người đi xe buýt mỗi ngày — học sinh, sinh viên, dân văn phòng.
- **Thành phố V1:** **Hà Nội**. Dữ liệu **theo lịch (schedule-based)** — Hà Nội chưa có vị trí xe realtime.
- **Triết lý cốt lõi:** **offline-first**. GTFS tĩnh nằm trong GRDB/SQLite trên máy; mạng chỉ bổ sung giờ theo lịch, có quota và cache. Mọi màn hình đều render được khi mất mạng.
- **Giá trị cốt lõi:** báo thức "ngủ quên" — báo trước N trạm (mặc định 2 trạm) bằng AlarmKit + geofence + countdown dự phòng; Live Activity, widget, Watch để "liếc là hiểu"; nhật ký chuyến đi quy đổi thành tiền tiết kiệm + rừng cây ảo (gamification xanh).
- **Tab bar:** Trang chủ · Tuyến · (Camera/Explore) · Tôi. Dashboard là trái tim, mọi tính năng cách tối đa 1 chạm.

---

## 2. Kiến trúc dữ liệu & offline-first

### 2.1. Hai tầng dữ liệu

**Tầng 1 — GTFS tĩnh trong GRDB/SQLite (lõi, gần như không tốn mạng):**
- Nguồn: `busmaps.com` API (`capi.busmaps.com:8443`, header `capi-key` + `capi-host`, `countryIso=VNM`, `regionName=asia`), hoặc bundle TimBus 2026 (138 tuyến, tên thật).
- Tải ZIP qua `URLSession` (CDN chặn bot nên không dùng curl), parse `routes/stops/trips/stop_times` → bulk insert 1 transaction, R\*Tree cho tìm trạm lân cận.
- Chỉ tải lại khi `contentHash` đổi (BGAppRefreshTask 1–2 tuần/lần). Onboarding màn Sync hiển thị tiến trình parse.
- Phục vụ offline hoàn toàn: tìm tuyến, trạm lân cận (GPS), timeline trạm, thứ tự `stop_times`, tính "N trạm trước" cho báo thức.

**Tầng 2 — Giờ khởi hành theo lịch (cache RAM/đĩa, TTL 60s):**
- `/nextDepartures` (mode `stopId`), key cache = `stopId`. Chỉ gọi khi cần (mở Dashboard tile tuyến yêu thích, mở Route Detail, bật alarm, refresh widget/Live Activity); cuộn/quay lại màn cũ không gọi lại (tiết kiệm quota ~6.000 calls/ngày).
- Hết mạng/hết quota → fallback timetable tĩnh trong SQLite + nhãn "Theo lịch · cập nhật lúc HH:mm". Không bao giờ màn trắng.
- Không có realtime ở Hà Nội: `rawVehiclePositions = 0`, không có `rtDeparture` — mọi ETA đều gắn mác "ước tính / THEO LỊCH".

### 2.2. Lọc theo ngày chạy xe (service-day)
- Mọi giờ hiển thị (Dashboard, arrivals board, widget, last-trip) chỉ tính trip có service chạy **hôm nay** (cờ weekday + ngoại lệ `calendar_dates`); `service_id` rỗng được coi là luôn chạy (feed thiếu calendar).

### 2.3. Tên trạm (stop-name-resolution)
- GTFS gốc nhiều tên chung chung → lớp phủ tên hiển thị theo thứ tự ưu tiên **`manual > osm > tên GTFS gốc`**, lưu ở bảng riêng `stopNameOverride` (sống sót qua re-import GTFS).
- Bundle sẵn mapping id → tên geocode (nguồn `osm`), import idempotent lần đầu + sau mỗi lần import GTFS, không ghi đè hàng `manual`.
- Trùng tên cùng phố → tự thêm hậu tố phân biệt từ headsign/thứ tự trạm (tính lúc resolve, không bake cứng). Có batch resolve 1 query cho cả list (tránh N+1).

### 2.4. Giá vé (bus-fare-source)
- Giá vé từng tuyến lấy từ API `timbus.vn` (lấy cookie `ASP.NET_SessionId` rồi POST `searchfull`, lọc chính xác `FleedCode == shortName`), cache theo `route_id`; miss/offline → fallback `SavingsConstants.busFareVnd` (8.000đ). Không bao giờ chặn planner hay arrivals board vì thiếu giá.

### 2.5. Mã hóa & export (AppEncryptionDocumentation)
- Chỉ dùng mã hóa chuẩn của iOS: HTTPS/TLS (URLSession), Data Protection AES-256, CoreLocation, SQLite thường (không mã hóa). Không thuật toán tự chế → `ITSAppUsesNonExemptEncryption = NO`, miễn giấy phép ERN.

---

## 3. Nhóm màn hình & tính năng

### 3.1. Onboarding (screen-onboarding)
- Luồng 3 bước: **Welcome → Sync (GTFS) → Permissions**. Bước chọn tuyến yêu thích đã **bỏ** (yêu thích giờ là theo trạm, phát sinh tự nhiên trong quá trình dùng).
- Welcome render ngay frame đầu (không placeholder xám). Sync hiển thị checklist tải/parse/index. Permissions dùng **soft prompt** của app trước khi gọi popup iOS (có nút "Để sau", không dark-pattern, không hỏi lại mỗi phiên).

### 3.2. Dashboard — Bento Grid (screen-dashboard + tiles)
- Layout Bento 2 cột, **tự reflow 1 cột** khi chữ trợ năng lớn; có 2 chế độ do user chọn trong Settings: **Lưới** (mặc định) và **Đơn giản** (xếp dọc full-width), lưu `AppSettings`, áp dụng live.
- Khối **"Đang theo dõi"** luôn trên cùng khi có trip đang chạy hoặc board-watch intent (trip ưu tiên hơn board-watch); favorite đang được track thì ẩn khỏi list favorite để khỏi trùng.
- Các tile:
  - **Hero hành trình xanh**: số cây + tổng CO₂ từ các chuyến đã đi; chạm → màn Tiết kiệm. Chưa có chuyến nào → câu động viên.
  - **Weather strip** gắn liền dưới hero xanh (không còn tile thời tiết rời): hiện tại + vài giờ tới + mưa; các trạng thái loading/cache/offline ("cần mạng để cập nhật")/từ chối vị trí/lỗi.
  - **Trạm gần bạn**: trạm gần nhất từ GPS + R\*Tree (offline), chạm → arrivals board; có loading/empty/error + retry.
  - **Trạm yêu thích**: list trạm đã ghim ♥ (khái niệm favorite DUY NHẤT — **không còn favorite tuyến**); rỗng → hướng dẫn ghim; chạm → arrivals board.
  - **Chuyến của tôi** (saved trips, tối đa 3): hiển thị trip khớp khung giờ hiện tại (sáng/chiều/tối) + giờ chạy kế tiếp + badge chuyến chót; rỗng → hướng dẫn tạo.
  - **Báo thức**: quick toggle; **Explore/Bus Reel**: placeholder "sắp ra mắt" (chưa gọi camera/WeatherKit thật).
- Tìm kiếm tuyến trên Dashboard hiển thị **lịch sử tuyến vừa xem** (tối đa 10, dedup đưa lên đầu, xóa từng dòng/xóa hết) thay cho list "tuyến phổ biến" giả.

### 3.3. Tuyến & báo thức (screen-routes-list, screen-route-detail, screen-alarm-setup)
- **Danh sách tuyến**: tìm kiếm theo số hiệu + tên (không phân biệt hoa thường); mỗi dòng badge số tuyến + tên; không còn nút ♥ tuyến; rỗng GTFS → dẫn về onboarding sync.
- **Route Detail — timeline dọc** (thay bản đồ rối): phân loại trạm **đã qua / hiện tại / sắp tới** theo giờ hiện tại so với giờ lịch; node hiện tại accent + pulsing; tên trạm đã resolve; header "trạm đầu → trạm cuối" + số trạm + km.
- Mỗi dòng trạm có **chuông báo thức** (phản ánh alarm đã lưu; tap ≥44pt, VoiceOver rõ đích + số trạm báo trước) và **♥ ghim trạm**. Chạm chuông → sheet xác nhận (đổi đích được, stepper số trạm báo trước 1–5, cảnh báo "quá gần đầu tuyến") → lưu, cập nhật chuông tại chỗ + haptic success, **không popup xác nhận**; có **Undo inline 3–5 giây** (gỡ cả lịch báo thức đã đặt).
- Lần đầu mở tuyến có nội dung → **thẻ hướng dẫn tuyến** (route-guide: hướng, số trạm, giờ chạy, số chiều + ghi chú thủ công từ JSON bundle nếu có; thiếu tên bến thì không hiện thẻ); đánh dấu đã xem nên không hiện lại; nút "Xem lại hướng dẫn" mở lại theo nhu cầu.
- Nút **"Lưu chuyến này"** pre-fill tuyến + trạm lên/xuống + chiều + gợi ý khung giờ → tạo saved trip (tôn trọng giới hạn 3).

### 3.4. Bảng giờ tại trạm (stop-arrivals-board, at-stop-arrivals)
- Mở từ tile trạm gần bạn / trạm yêu thích / timeline: liệt kê **mọi tuyến qua trạm**, gom theo tuyến, xếp theo giờ chạy kế tiếp, gắn nhãn **THEO LỊCH**, countdown "còn X phút"/"Sắp đến" tự tick (dừng khi rời màn hình); có loading/empty ("Không còn chuyến hôm nay")/error + thử lại; chạm dòng tuyến → chi tiết các giờ chạy tiếp theo (load off-main-thread).
- Chạm 1 tuyến → **board-watch**: gài geofence 1–2 trạm phía trước (namespace `boardwatch.`), lưu intent (persist qua kill app, tự hết hạn); vào vùng → hỏi "Bạn vừa lên tuyến X?" (foreground: prompt inline; background + quyền Always: notification) → xác nhận → mở chọn điểm xuống → bắt đầu trip "Xuống trạm này"; từ chối → dọn intent. Hết quota vùng (20) → vẫn lưu intent, chờ foreground xác nhận.

### 3.5. Chuyến đã lưu, chuyến chót, nhật ký (saved-trips, last-trip-warning, time-aware-surfacing, ride-log)
- **Chuyến của tôi** (tối đa 3, SwiftData): tuyến + trạm lên + trạm xuống + chiều + nhãn khung giờ (tự gợi ý Sáng/Chiều/Tối theo giờ hiện tại, sửa được); màn quản lý list/thêm/sửa/xóa/sắp xếp lại (sortOrder liền mạch).
- **Cảnh báo chuyến chót**: còn ≤3 chuyến → badge "Còn N chuyến, chót HH:MM"; hết → "Hết chuyến hôm nay"; push time-sensitive ~30 phút trước chuyến chót của trip đã lưu, dedup 1 lần/ngày/trip.
- **Chọn trip theo giờ**: trong các trip cùng khung giờ hiện tại lấy sortOrder nhỏ nhất; không khớp → lấy trip đầu tiên; widget cũng đổi trip khi qua mốc giờ (timeline entry), countdown tính offline từ giờ tuyệt đối trong snapshot, hết giờ → "Hết chuyến hôm nay".
- **Nhật ký chuyến (ride-log)**: `CompletedTrip` lưu ảnh chụp tại lúc đi (quãng đường haversine, tiền tiết kiệm, CO₂) + nguồn `getOffAuto` (trip kết thúc `arrived`) / `manualCheckIn` (từ saved trip hoặc Route Detail: trạm đầu → trạm cuối) / `geofenceAuto`; dedup theo (tuyến, ngày, trạm xuống); chuyến 0 km không ghi.

### 3.6. Tự động check-in (auto-checkin)
- Opt-in, **mặc định tắt**, cần quyền **Always** (thiếu thì nói thật, không giả vờ bật). Vào vùng trạm lên rồi vào vùng trạm xuống trong **10–120 phút** → ghi nhật ký qua pipeline ride-log (nguồn `geofenceAuto`, chống trùng với check-in tay) + notification chúc mừng kèm số gram CO₂ thật, chạm → mở màn tiết kiệm.
- Chia sẻ ngân sách 20 geofence: **alarm > trip đang chạy > board-watch > auto-checkin** (hàm phân bổ thuần, có test). Tắt tính năng → gỡ vùng ngay. Không thêm `UIBackgroundModes: location`.

### 3.7. Tiết kiệm & chi phí (savings-estimation, screen-savings, trip-cost-comparison)
- Công thức thuần, có test: quãng đường = tổng haversine các trạm đã đi; **tiền tiết kiệm** = giá xe công nghệ rẻ nhất (Grab/Be/XanhSM: mở cửa + đơn giá×km) − vé buýt, floor 0; **CO₂** = km × (xe máy − buýt/khách), floor 0; **cây** = CO₂ tích lũy / hằng số hấp thụ/năm (giữ phân số để hiện tiến trình cây tiếp theo). Mọi hằng số gom 1 chỗ, inject được cho test.
- **Màn Tiết kiệm**: hũ tiền tích lũy (định dạng VND, cộng dồn giá trị đã lưu — đổi hằng số không làm đổi lịch sử) + rừng cây ảo (số cây nguyên + tiến trình cây tiếp theo); rỗng → câu động viên; vào từ Profile; hỗ trợ Dynamic Type + VoiceOver.
- **So sánh chi phí trong planner A→B**: quãng đường × hệ số đường vòng (ước tính, gắn mác "ước tính"), so 4 phương án (buýt theo giá cache từng tuyến / xe máy cá nhân / xe công nghệ / taxi), tọa độ thiếu thì bỏ qua không crash.

### 3.8. Lịch sử tìm kiếm hành trình (journey-search-history)
- Planner A→B chỉ ghi lịch sử khi **có kết quả** (tối đa 10, trùng theo nhãn điểm đi/đến + cờ "vị trí của bạn" thì đưa lên đầu). Idle hiện lịch sử (dạng "đi → đến", xóa từng dòng/xóa hết); chạm → chạy lại (điểm đi là vị trí hiện tại thì lấy GPS mới, không dùng tọa độ cũ; mất quyền vị trí thì không crash).

### 3.9. Thời tiết & bảo vệ commute (weather-data, screen-weather-tile, commute-weather-guard)
- Dự báo giờ qua **WeatherKit** sau lớp trừu tượng mock được; throttle theo khoảng thời gian + vị trí; cache kèm thời điểm, offline dùng cache còn tươi, cũ quá → trạng thái cần mạng (không bịa số liệu). Tile giữ đủ trạng thái + VoiceOver + nút xin quyền.
- **Commute weather guard**: hàm thuần xét mưa trong khung giờ đi làm quen thuộc của từng trip đã lưu (theo ngưỡng); đáng báo → chọn giờ xuất phát khô nhất + soạn tin nhắn mẫu tiếng Việt (không dùng LLM) + lên lịch 1 local notification/ngày/trip trước giờ đi; chạm → mở Dashboard.

### 3.10. Camera / Bus Reel
- Theo thiết kế gốc: viewfinder full-bleed, overlay động (tốc độ/giờ/tuyến, kéo-thả, pinch-scale, đổi màu), Ảnh / Video Loop 3s / Boomerang, hậu kỳ "Add to Story". **Scope: placeholder ở V1** (Dashboard tile + research note đề xuất hoãn sang V1.5/V2 vì cần mạng xã hội trong app + Gen Z chuộng video ngắn; nếu làm cộng đồng thì ưu tiên report tuyến xe đông/trễ).

### 3.11. Companions: Watch, Live Activity, Widget (watch-companion, alarm-trigger-delivery)
- **Watch**: app watchOS riêng (App Group chung), mirror trip đang chạy (tuyến, trạm xuống, số trạm còn lại); chuyển sang arriving → rung Taptic mạnh **đúng 1 lần/trip**; nút "Đã xuống" kết thúc trip cả 2 đầu (lệnh sai id thì bỏ qua). Không watch → điện thoại chạy y nguyên.
- **Live Activity**: thanh tiến trình = (tổng − còn lại)/tổng (thiếu số liệu thì ẩn thanh, không hiện 0% giả, không crash); ETA "còn ~N phút" luôn kèm chữ **"ước tính"**, tự tick không cần đánh thức app, qua giờ/trạng thái đến nơi thì ẩn; trạng thái đến nơi **"XUỐNG TẠI ĐÂY"** nổi bật trên Lock Screen + mọi biến thể Dynamic Island, đạt WCAG AA (không chữ trắng trên cam).
- **Widget**: trip đã lưu khớp khung giờ + countdown offline từ snapshot (tương thích snapshot cũ không có trường mới); hết giờ → "Hết chuyến hôm nay".

### 3.12. Cài đặt & giao diện (screen-settings, app-theming, design-tokens)
- Settings có nhóm **Giao diện**: chế độ Sáng/Tối/Hệ thống + 5 theme màu (Cam mặc định, Đại dương, Rừng, Sakura, Tím — mỗi theme đủ 10 vai trò màu × Sáng/Tối) + bố cục Dashboard (Lưới/Đơn giản); lưu `AppSettings`, áp dụng live không restart.
- Quy tắc tương phản bắt buộc: chữ/nút trên nền cam dùng vai trò đậm (`accentButton`/`accentText`), **không chữ trắng trên cam decor**; `accent` sáng chỉ làm nền trang trí. Token tập trung trong `Theme` (spacing, tile, layout, radius, shadow).

---

## 4. Design system (tóm lược từ 2 tài liệu thiết kế)

- **Màu**: nền `#F2F2F7` (sáng) / đen (tối); surface trắng/`#1C1C1E`; chữ chính `#1C1C1E`; phụ `#8E8E93`; accent cam `#FF8A3D`; xanh lá `#34C759`; xanh dương `#3A82F7`; đỏ `#FF3B30`. Chữ/link cam trên nền trắng dùng cam đậm `#C45A00` (~4.6:1).
- **Chữ**: SF Pro Rounded toàn app (`.rounded`), SF Mono cho overlay camera. Bo góc card 22 / nút 16; shadow cực nhẹ.
- **Layout**: Bento Grid vibe Apple-native (Weather/Fitness); hero là tuyến yêu thích/ETA + hành trình xanh; icon = SF Symbols.
- **Motion & haptic**: spring Apple; Bento co giãn (tile báo thức phình + pulsing khi reo); haptic light khi mở tile, success khi đặt báo thức.
- **Accessibility thiết kế từ đầu**: Dynamic Type reflow 1 cột; báo thức **đa kênh** (chuông + banner/Live Activity + haptic, tùy chỉnh được); tap target ≥44pt; timeline decor ẩn khỏi VoiceOver, mỗi trạm 1 label gộp; chuông có label rõ đích.

---

## 5. Báo thức & quyền (alarm-location-permission, smart-alarm-scheduling, alarm-trigger-delivery)

- **Quyền vị trí 2 bước**: onboarding xin `When In Use`; chỉ nâng lên **Always** đúng lúc user bật báo thức ở foreground (đã trả lời rồi thì không hỏi lại). Từ chối → hạ cấp优雅: countdown-only, nói rõ không có geofence nền, app vẫn dùng được hết.
- **Lập lịch**: từ trạm xuống + số trạm báo trước suy ra **trạm báo** (`max(0, destIndex − leadStops)`); gài **geofence ~250m** làm trigger chính + **countdown theo giờ lịch** làm lưới an toàn; giữ `CLServiceSession(.always)` để nhận sự kiện nền; tắt/xóa/Undo → hủy cả vùng + notification; relaunch (kể cả background) re-arm lại; tôn trọng giới hạn ~20 vùng.
- **Chuông**: AlarmKit trên iOS 26.2+ (có gate `if #available`, iOS 17–26.1 dùng notification `.timeSensitive` xuyên Focus); **không** thêm `UIBackgroundModes: location`. Khi nổ: **chuông + banner + haptic cùng lúc**, không bao giờ chỉ rung.
- **Soft prompt + mô tả quyền** cụ thể theo lợi ích ("theo dõi khoảng cách tới trạm để báo thức khi app chạy nền"), tránh bị App Review từ chối.

---

## 6. Trạng thái scope: V1 vs hoãn

**Trong V1:**
Onboarding 3 bước · Dashboard Bento (2 layout) · tìm tuyến + route detail timeline + đặt báo thức lùi trạm + Undo · arrivals board tại trạm + countdown + board-watch "bạn vừa lên tuyến X?" · saved trips (3) + badge/chuông chuyến chót · ride-log + hũ tiết kiệm + rừng cây · so sánh chi phí 4 phương án (ước tính) · lịch sử planner + lịch sử tuyến vừa xem · trạm yêu thích (khái niệm favorite duy nhất) · tên trạm resolve manual>osm>GTFS · giá vé timbus + fallback · thời tiết WeatherKit + weather guard mưa · Live Activity + widget + Watch · 5 theme + Sáng/Tối/Hệ thống + token tập trung · auto-check-in geofence opt-in · contrast WCAG AA + VoiceOver + Dynamic Type.

**Hoãn khỏi V1 (sang V1.5/V2):**
Bus Reel camera đầy đủ (hiện placeholder) · Apple Watch từng được đề xuất hoãn nhưng spec `watch-companion` đã chốt trong scope · realtime vị trí xe (chờ nguồn GTFS-RT cho Hà Nội; V1 schedule-based + geofence vị trí **của rider**) · report cộng đồng kiểu xe đông/trễ (ý tưởng thay Reel).

**Rủi ro đã biết:**
Quota busmaps ~6.000 calls/ngày → throttle + TTL 60s + fallback tĩnh · giới hạn 20 geofence → phân bổ ưu tiên alarm/trip/board-watch/auto-checkin · GTFS 2018 cũ → bundle TimBus 2026 · tên trạm chung chung → lớp OSM/manual · cam/white contrast → vai trò màu đậm chuyên biệt.
