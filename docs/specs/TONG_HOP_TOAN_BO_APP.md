# TRANG TRẠI NHÀ TÔI — Tài liệu tổng hợp toàn bộ App (v3.0)

> Tổng hợp duy nhất từ 14 file trong `Docs/` (00 → 13) + README. Nguồn sự thật cho dev, kiểm thử và pilot.
> Tagline: **Ghi nhanh. Rõ tiền từng lứa.**

---

## 1. Tổng quan sản phẩm

**Trang Trại Nhà Tôi** là sổ chăn nuôi offline-first trên iPhone cho hộ nuôi nhỏ lẻ Việt Nam. Không phải ERP/kế toán doanh nghiệp. Triết lý: **ghi ít — tự tổng hợp — nhắc đúng việc — giải thích bằng câu đơn giản.**

- **Phiên bản:** 3.0 — Đa trại, đa vật nuôi (Vịt, Gà, Lợn).
- **Nền tảng:** iOS Native SwiftUI, iOS 17+, Local-first SwiftData, zero third-party runtime.
- **Hiện trạng:** Đủ luồng MVP (trại, lứa, chi phí, cám/FCR, chết hao, cân mẫu, cân bắt Bì–Gộp, quyết toán, báo cáo, backup .zip, nhập giọng nói). Có 14 file XCTest cho tính tiền, FCR, parser giọng nói, backup ZIP. **Chưa pilot lứa thật; OCR và xuất PDF chưa làm.**

**Giá trị cốt lõi:**
1. Không phải tự cộng — app tự cộng chi phí, kg, điều chỉnh, trạng thái đối chiếu.
2. Không ghi nhầm trại — mọi form gắn trại/lứa ở đầu; 1 lứa mở thì tự chọn, nhiều lứa thì bắt chọn trước.
3. Không mất phiếu — ảnh nằm đúng khoản/lần xuất/quyết toán, backup được.
4. Không cần biết kế toán — báo cáo mở đầu bằng Nhà đã chi / Cty đã trả / Cần đối chiếu / Tiền còn lại tạm tính.
5. Không bị ép công nghệ — chữ to, nút to, offline, 1 iPhone chính.

**Phạm vi MVP (thuộc / không thuộc):**
- Thuộc: đa trại Vịt/Gà/Lợn, lứa, việc, chi phí + phân bổ chung, phiếu ảnh, xuất/bắt, quyết toán có interpretation, báo cáo cùng trại/cùng loài, share 1 chạm Zalo/iMessage, backup/restore, UX senior, nhập giọng nói tiếng Việt on-device.
- Chưa thuộc: OCR, API thời tiết, AI phân tích, sync nhiều máy, Android/PWA, IoT, chẩn đoán bệnh, dự báo lợi nhuận.

---

## 2. Quyết định sản phẩm đã chốt (00)

| Lĩnh vực | Quyết định |
|---|---|
| Số trại | Không giới hạn cứng; thêm/sắp xếp/archive sau. |
| Vật nuôi | Mỗi trại 1 loài chính (Vịt/Gà/Lợn) lúc tạo; lứa snapshot loài để lịch sử bất biến. |
| Dùng chung | Trại, lứa, việc, chi phí, phiếu, xuất/bắt, quyết toán, báo cáo, backup. |
| Theo loài | Template việc, câu chữ, mốc nuôi, vắc-xin do `LivestockProfile` quyết. Vịt chi tiết; Gà/Lợn template cơ bản sửa được, không suy luận chuyên môn. |
| Báo cáo | Chỉ so lứa cùng trại + cùng loài. Tổng hộ chỉ là tổng dòng tiền. |
| Chi phí | Cám, điện, nước, công, thuốc/vắc-xin, khác; mỗi khoản đúng 1 lứa. Chi phí chung: chỉ trong trại này, chia đều hoặc nhập tay; `SharedExpenseGroup` giữ hóa đơn gốc. |
| Xuất/bắt | Model tên `HarvestEvent`; UI gọi theo loài ("CP đến bắt vịt", "Xuất gà"...). |
| Quyết toán | Adjustment tự nhập + cờ `isIncludedInSettlementAmount` chống trùng; interpretation `unknown / netPaidAfterDeductions / grossBeforeDeductions`; chưa đối chiếu thì không hiện tiền tạm tính. |
| Trùng lặp | Chỉ cảnh báo tương tự trong 7 ngày; luôn cho lưu thêm. |
| Phiếu/backup | Ảnh nén JPEG 0.7 theo lứa; backup ZIP = manifest + data.json + receipts/. |
| UX | Bố/mẹ ít tech: chữ to, nút to, tiếng Việt đời thường, icon luôn có nhãn. |

---

## 3. Người dùng & hành trình một lứa (02)

**Bố/mẹ trực tiếp nuôi:** hiểu việc trại nhưng ghét ghi chép, khó đọc chữ nhỏ. Cần biết hôm nay làm gì, ghi tiền ở đâu, trại nào thiếu phiếu, lứa còn lại bao nhiêu. Bối cảnh: 1 trại (tự chọn lứa mở nhưng hiện tên trại to), nhiều trại (thẻ lớn, chạm đúng trại mới ghi), nhiều loài (tên chữ "Trại vịt sau nhà", icon bổ trợ), ngoài chuồng (nút cao, ít trường, offline), muốn hiểu tiền (câu ngắn, thiếu gì nói rõ).

**Con/em hỗ trợ:** kiểm tra lịch sử, phiếu, sửa số, backup, phân bổ chi phí chung, báo cáo nhiều trại — nằm ở Xem kỹ + Báo cáo. Nhận thẻ tóm tắt qua 1 chạm Zalo/iMessage.

**Hành trình chung:** Tạo trại (tên + loài) → Tạo lứa (trại, ngày bắt đầu, số con, sinh lịch việc từ profile) → Nuôi (xác nhận việc, ghi chi phí + phiếu, chết hao/cân mẫu tùy ý, không chẩn đoán bệnh) → Xuất/bắt (1..n `HarvestEvent`, kg/con/tiền tùy có) → Quyết toán (nhập số đối tác, cộng/trừ, cách hiểu số tiền; mô hình không gia công vẫn dùng trạng thái đối chiếu) → Đóng lứa (xem kết quả, archive, tạo việc nghỉ). Chỉ số UX: bố/mẹ tự tạo trại/lứa/chi phí/xuất-bắt và đọc kết quả; nếu không biết đang chọn trại nào hoặc phải tự cộng tiền là fail.

---

## 4. Bản đồ màn hình & chức năng (04)

```
RootTabView (3 tab)
├── 1. Hôm nay (TodayView)
│   ├── Header + chuông báo thức (AlarmListView)
│   ├── Thẻ trại (Farm Card) + nút thêm trại (CreateFarmView)
│   └── FarmDetailView: nút "Lưu ý ngày X" (DailyTechnicalCareSheet),
│       thẻ Quân số & Tỉ lệ sống, thẻ Cơ cấu chi phí,
│       4 nút: Ghi chi tiêu / Cân bán lứa / Chết & Hao / Cân mẫu,
│       lịch sử gần đây, Sửa lứa / Chốt-Mở lại lứa
├── 2. Báo cáo (ReportsView)
│   ├── Thẻ tổng kết từng trại → FarmBatchesReportListView (list / chart)
│   └── BatchReportDetailView: share Zalo, GrowthProgressBar, 4 KPI
│       (Nhà đã chi, Đã cân bán, Giá hòa vốn, Lãi thực nhận/tạm tính),
│       chi phí theo danh mục, đợt cân bán, SettlementView, dải ảnh phiếu
└── 3. Cài đặt (SettingsView)
    ├── FarmManagementView, AlarmListView,
    ├── BackupRestoreView (ZIP), DatabaseRecoveryView
```

**Chi tiết F01–F08:**
- **F01 Hôm nay + FarmDetail:** đa trại/đa vật nuôi màu pastel; quân số (thả – chết/hao = còn lại + % sống); thanh cơ cấu chi phí; Lưu ý ngày X theo ngày tuổi (VD vịt ngày 3: úm 32–34°C, vắc-xin Dịch tả/Viêm gan).
- **F02 Chết & Hao (MortalitySheet):** số con/ngày, chọn Hôm nay/Hôm qua/Ngày khác, phím nhanh 3/5/7/10/15/20, chip triệu chứng (hao tự nhiên, lạnh, yếu chân, tiêu chảy, đè góc), lịch sử + xóa, tự cập nhật quân số.
- **F03 Cân mẫu:** tổng kg + số con mẫu → kg/con realtime so biểu tăng trọng.
- **F04 Ghi chi tiêu (QuickExpenseView, 4 bước + chụp phiếu):** loại (Cám, Thuốc, Điện/nước, Con giống, Rơm/Trấu/Vôi, Nhân công, Khác) → số tiền (phím +100k/500k/1tr/2tr/5tr, đọc thành chữ TV, format tiền) → nguồn (Nhà tự trả / Cty trừ lứa / Cần hỏi lại) → thời gian + ghi chú (Hôm nay/Hôm qua/Ngày khác, DatePicker không xung đột bàn phím) → ảnh hóa đơn. Chống trùng cùng ngày.
- **F05 Cân bán (HarvestEntryView 2 pha Bì–Gộp + HarvestDetailView):** nhập từng lồng `HarvestCrate` (kg + số con) → tổng kg/con/bình quân; xem lại bảng kê từng lồng, ảnh phiếu cân phóng to, xóa + hoàn tác sản lượng.
- **F06 Báo thức:** lặp mỗi ngày (mặc định) hoặc T2–CN; gợi ý 1 chạm (ăn sáng 06:00, thuốc 08:00, nhiệt/quạt 12:00, ăn chiều 16:30, ghi sổ 20:00, úm đêm 21:30); tiêu đề không cắt chữ, lời nhắc "Đến giờ ra chuồng làm việc rồi bác ơi!"; chạm sửa giờ/tên/lịch.
- **F07 Báo cáo:** Rich Batch Card (tiến độ ngày, tiền chi, kg bán, Đang nuôi/Đã chốt); Sổ lứa có share, GrowthProgressBar, 4 KPI, chi phí theo danh mục, đợt cân, ảnh phiếu; padding chân 110–130 tránh floating TabBar.
- **F08 Quyết toán (SettlementView):** thẻ Nhà tự trả / Cty trừ lứa / Kg chuồng cân; nhập số cty + nút điền nhanh; bảng soát lệch S1–S6; 3 cách hiểu (thực nhận / tổng trước trừ / chưa rõ); thêm/xóa thưởng-phạt (FCR, hao, điện...); ảnh phiếu phóng to; navbar nền đặc.

---

## 5. Nghiệp vụ, dữ liệu & công thức tài chính (03 + 13)

### 5.1 Data model lõi

| Model | Trường trọng yếu |
|---|---|
| Farm | id, name, livestockType, isArchived, sortOrder |
| Batch | farmID, livestockType snapshot, startDate, initialAnimalCount, expectedHarvestDate, status, endReason |
| FarmTask | batchID, kind, dueAt, completedAt, note |
| Expense | batchID, group, amount, paymentStatus, sharedExpenseGroupID, duplicateFingerprint |
| SharedExpenseGroup | originalAmount, allocationMethod, childExpenseIDs, sourceReceiptID |
| HarvestEvent | batchID, date, kg, animalCount, price/kg, amount, duplicateFingerprint |
| HarvestCrate | harvestEventID, sortOrder, weight, animalCount |
| MortalityRecord | batchID, occurredAt, count, reason (nguồn duy nhất, không còn ghi Batch.note) |
| SampleWeightRecord | batchID, occurredAt, sampleCount, totalKg, averageKg |
| Settlement | batchID, settlementAmount, interpretation, isReconciled, partnerKilograms (= S1) |
| SettlementAdjustment | settlementID, title, type, amount, isIncludedInSettlementAmount |
| ReceiptAttachment | ownerType, ownerID, batchID, relativePath, isPendingData |
| DailyAlarm | hour, minute, label, isEnabled, repeatDays |

Trạng thái lứa: `preparation → raising → waitingSettlement → closed` hoặc `stoppedEarly`. Chỉ `BatchService` chuyển trạng thái. Có nút Mở lại (closed/stoppedEarly) và Dừng sớm (bán sớm/dịch/khác) kèm confirm; báo cáo tính lại từ dữ liệu nên mở lại không cần thao tác thêm.

### 5.2 Phân bổ chi phí chung
Chỉ trong trại này: (a) 1 lứa → 1 Expense; (b) Chia đều n lứa mở — phần bằng nhau, dư làm tròn vào phần đầu; (c) Nhập tay — tổng phần phải bằng hóa đơn gốc. Mỗi Expense con 1 lứa; Group chỉ liên kết để sửa/xóa cả nhóm.

### 5.3 Công thức tiền (chỉ khi `isReconciled==true`, không có `needsReconciliation`, `interpretation != unknown`)

```
netPaidAfterDeductions (thực nhận):
  estimatedRemaining = settlementAmount - householdPaid + externalAdjustments
grossBeforeDeductions (tổng trước trừ):
  estimatedRemaining = settlementAmount - householdPaid - cpDeductionsOutstanding + externalAdjustments
```

`householdPaid` = nhà đã trả; `cpDeductionsOutstanding` = CP sẽ còn trừ; `externalAdjustments` = cộng/trừ KHÔNG nằm trong số phiếu (`isIncluded==false`, cả 2 cách hiểu); `isIncluded==true` chỉ hiển thị đối chiếu. Trả lại cám (`isFeedReturn`, có tiền) trừ ngược vào nhóm thanh toán của nó; để trống tiền thì chỉ tính bao cho FCR.

**Giá hòa vốn/kg** = (householdPaid + cpDeductionsOutstanding) / totalHarvestKg (hoặc sản lượng dự kiến) — để đàm phán giá bắt / đánh giá hợp đồng.

### 5.4 So khớp lệch quyết toán
- So kg (gia công): nhập S1 (kg cty, optional) so tổng kg nhà cân; lệch >1% hoặc >20kg → đỏ + hướng kiểm tra (cân xe, hao đường xa).
- So tiền (chỉ bán giá thị trường): so tổng `receivedAmount` với số phiếu. Nuôi gia công không ghi tiền bán → không so tiền.
- Chênh lệch lớn / khấu trừ mờ → cảnh báo trước khi ký chốt.

### 5.5 FCR
- Tạm tính (đang nuôi): kg cám ròng / (sống × cân mẫu gần nhất + kg đã bắt). Không chấm điểm.
- Chốt (đã đóng): kg cám ròng / tổng kg đã bắt. Chỉ vịt có ngưỡng; gà/lợn chỉ hiện số + nhắc so định mức hợp đồng.

### 5.6 Chống trùng
Fingerprint là dữ liệu so sánh, không phải unique constraint. Cảnh báo khi cùng lứa + cùng nhóm + tiền gần giống + cách ≤7 ngày (chi phí) hoặc ngày–kg–tiền tương tự (xuất/bắt). Dialog: Lưu thêm / Xem khoản cũ / Hủy.

### 5.7 Báo cáo
Hiển thị Nhà đã chi, Đối tác/CP trả, Cần đối chiếu, Giá hòa vốn, Tiền tạm tính. So lứa chỉ cùng trại + cùng loài. Báo cáo hộ cộng lứa đã đóng mọi trại, nhãn "Tổng dòng tiền toàn hộ".

### 5.8 Đối soát gia công thực tế (CP/Japfa/CJ/Dabaco/Emivest)
- Cty cấp: giống 1 ngày tuổi, cám theo giai đoạn, thuốc/vắc-xin, KTV. Hộ bỏ: chuồng, điện/nước, độn, nhiên liệu úm, công, xử lý chất thải. Trả công/kg hoặc/con đạt chuẩn ± kỹ thuật.
- Bảng kê chuẩn: Tổng công theo sản lượng (Gross) + Thưởng (FCR tốt, sống cao, đẹp) − Phạt (FCR vượt, hao quá, lệch chuẩn) − Khấu trừ vật tư/công nợ (cám tồn, thuốc vượt, vỏ bao, cọc) = Thực lĩnh (Net).
- 6 mục S1–S6: S1 tổng kg (lệch cân chuồng vs cổng/hao đường); S2 FCR = cám kg / thịt kg (nhầm bao, quên trừ cám trả); S3 thưởng/phạt FCR (sai mốc mùa); S4 thuốc vượt trần (trừ cả vắc-xin tài trợ/nhầm trại); S5 vỏ bao/bốc xếp (thiếu vỏ, boa thợ không hóa đơn); S6 cọc/gối đầu (chưa hoàn cọc cũ).
- Quy trình 3 bước trong app: (1) Sổ nhà tự ghi (mỗi lần bắt: ngày/kg từng lồng/con/biển số; mỗi lần nhận cám: bao + phiếu) → (2) Nhập bảng kê (số tiền + ảnh, chọn Net/Gross) → (3) So khớp: khớp/lệch nhẹ → chốt đóng lứa; lệch >1% hoặc trừ lạ → đỏ + câu hỏi mang đi đối chất KTV (hao đường xa? cám thừa thu hồi? thuốc trừ bao nhiêu con?).
- V1: Smart OCR (Vision) cho phiếu cân viết tay, hóa đơn cám liên 3, bảng quyết toán CP/Japfa (FCR, kg, đơn giá công).

---

## 6. Kiến trúc kỹ thuật (07 + 10)

**Nguyên tắc:** Local-first/offline-first (SwiftData), zero third-party runtime (chỉ SwiftUI/SwiftData/UserNotifications/Foundation; PhotosUI/Camera/UIKit JPEG; LocalAuthentication optional; ShareLink/PDF/CSV; XCTest; XcodeGen chỉ sinh project), logic tính toán tập trung ở `CalculationService`/`BatchService` (+ Allocation), không tính trong View.

**Dependency:** Features → Services (qua protocol/view model) → Models; DesignSystem không phụ thuộc nghiệp vụ; Calculation/Allocation là nguồn duy nhất tính tiền/chia phí.

**Cấu trúc nguồn:**
```
App/ TrangTraiNhaToiApp.swift (ModelContainer, StoreSafety snapshot)
Models/ DomainEnums, FarmModels (Farm/Batch/FarmTask/DailyAlarm),
        FinanceModels (Expense/HarvestEvent/Settlement/Adjustment/Receipt),
        HarvestCrate
Services/ Calculation, Batch, Reminder, ReceiptStorage (JPEG 0.7),
          Backup (ZIP manifest+data.json+receipts/, ZipArchive tự viết),
          FlockLivingCount/FlockLog/Migration, FeedFCR, DuplicateCheck, LivestockProfile
DesignSystem/ AppTheme, KeyboardDismiss, Components (UndoToast 5s, SeniorControls,
          GrowthProgressBar, FarmStatusCard)
Features/ Today, Batches (Create/Edit), Expenses (Quick/History/SharedAllocation),
          Harvests (Entry Bì-Gộp/TareComponents/Detail), Alarms (List/Add),
          Settlement, Reports (Reports/BatchShareCard/Detail),
          Settings (Settings/AllReceiptsGallery/BackupRestore/DatabaseRecovery),
          Farms (Create/Management)
Tests/ 14 file XCTest (tiền, FCR, Bì-Gộp, giọng nói, codec+migration, backup DTO+ZIP, lịch sử phí...)
```

**Quan hệ:** Farm 1—n Batch; Batch 1—n Expense / HarvestEvent (1—n HarvestCrate) / Mortality / SampleWeight / FarmTask / Receipt; Batch 1—1 Settlement 1—n Adjustment; DailyAlarm độc lập.

**An toàn dữ liệu:** StoreSafety snapshot `.store/-wal/-shm` vào `StoreSnapshots/` mỗi lần mở đầu ngày (giữ 5); màn lỗi sổ có nút zip gửi hỗ trợ, nút xóa chỉ xóa 3 file SQLite và luôn snapshot trước; backup tay vào `Documents/SaoLuu` (Files app, giữ 10), restore là **gộp** (không xóa dữ liệu chỉ có trên máy, báo thức thay toàn bộ); chết hao/cân mẫu chỉ ở Record, note cũ `[chết hao]/[cân mẫu]` migration 1 lần; schema migration hiện lightweight, đổi kiểu/xóa cột phải thêm VersionedSchema + MigrationPlan và thử trên máy dữ liệu thật. Target iOS 17+; nếu xuống iOS 16 phải đổi Core Data (quyết định riêng).

---

## 7. UI/UX Senior-friendly (05)

1. **Như sổ tay nút lớn:** 1 màn hình = 1 luồng; câu nông hộ (Nhà tự trả, Cty trừ lứa, Cân chuồng, Chốt sổ...); icon luôn kèm nhãn/emojis loài; không dùng màu đơn độc báo trạng thái.
2. **Kích thước:** primary ≥56pt/radius 16/bold headline; secondary ≥50pt pastel 14–16; card trắng #FFFFFF radius 16 viền appBorder/loài 0.25; font Dynamic Type ≥16–17pt; tiền `.title/.largeTitle` + `.monospacedDigit()`.
3. **Layout:** title giữa bằng `ToolbarItem(.principal)` + `.toolbarBackground(.visible)`; padding chân 110–130 tránh floating TabBar; `.scrollDismissesKeyboard(.interactively)`, NumberPad kèm nút Xong xanh; cấm `simultaneousGesture(TapGesture())` toàn ScrollView (chặn DatePicker/ô nhập).
4. **Màu semantic:** bg #F7F7F2, surface #FFFFFF, text #1B1B1B / #666666, green #087A4A / light #E8F5EE (Đang nuôi/Lãi), amber #9A5A00 (cần đối chiếu), red #B42318 (trừ/chết/xóa/Lỗ).
5. **An toàn:** UndoToast 5s; confirm mọi xóa/chốt/xóa trại; cảnh báo trùng cùng ngày.

---

## 8. Thương hiệu (11)

- **Tên app + hiển thị:** Trang Trại Nhà Tôi; kỹ thuật/URL: `TrangTraiNhaToi`; bundle `com.cuongtran.TrangTraiNhaToi`.
- **Tagline:** Ghi nhanh. Rõ tiền từng lứa. Mô tả ngắn: Sổ chăn nuôi đơn giản cho trại Vịt, Gà, Lợn. Onboarding: "Theo dõi trại của nhà mình, từng lứa một." Empty: "Bắt đầu bằng cách tạo trại đầu tiên của nhà mình."
- **Tone:** ấm, rõ, không kỹ thuật ("trại nhà mình", "lứa này", "nhà đã chi", "cần đối chiếu", "tiền còn lại tạm tính"); tránh ERP/module/dòng tiền ở luồng bố mẹ. Lưu ý: tra cứu nhãn hiệu trước khi khóa logo/domain/marketing — đây mới là tên làm việc.

---

## 9. Đối thủ & khác biệt (12)

**Ma trận 4 nhóm:** (1) Sổ thu chi (Sổ Bán Hàng/MISA/Money Lover/Excel) — dễ dùng nhưng không hiểu lứa/FCR/phân bổ/quyết toán; (2) SmartFarm/ERP (NextFarm/AutoAgri/MobiAgri/FarmWork) — đủ tính năng IoT nhưng phức tạp, cần mạng, đắt, rối người già; (3) Portal hãng (CP/Japfa/CJ/Dabaco) — khép kín 1 chiều, nông dân thiếu công cụ độc lập đối soát; (4) App ngoại (FarmLogs/Herdwatch/AgriApp) — chuẩn quốc tế nhưng không khớp thực tế VN (bắt nhiều đợt, chạc, đại lý gối đầu, thưởng/phạt gia công).

**Định vị:** "Sổ tay đối soát thực chiến, offline-first, dễ nhất cho người lớn tuổi, công cụ độc lập bảo vệ túi tiền hộ nuôi." (Sâu nghiệp vụ + siêu dễ dùng.)

**5 trụ khác biệt:** (1) Dual-persona — bố/mẹ ghi nhanh chữ to 3 nút + giọng nói/ảnh 2s, con/em đối soát qua share Zalo 1 chạm; (2) Kiểm toán hợp đồng độc lập — so kg/tiền nhà vs cty, đỏ khi lệch kg/chiết khấu/cám-thuốc/FCR; (3) Diễn giải dân dã ("Hòa vốn 32.500đ/kg, bắt trên giá này là lời"); (4) Kho ảnh phiếu + xuất sổ PDF/album 1 chạm; (5) 100% offline + share linh hoạt (zip/thẻ ảnh).

---

## 10. Lộ trình (06)

| Giai đoạn | Nội dung |
|---|---|
| MVP Đợt 0–4 | 0: chốt phiếu thật + công thức + từ vựng vịt. 1: Farm/Profile/Batch, list + tạo trại/lứa. 2: việc, chi phí + chung nhiều trại, phiếu, xuất/bắt. 3: quyết toán interpretation + so lệch + hòa vốn + báo cáo cùng trại/loài + share Zalo + backup. 4: **pilot 1 lứa thật, sửa UX/data trước khi thêm tính năng.** |
| V1 Giảm nhập & đối soát | OCR phiếu cám/quyết toán CP (bóc chiết khấu, phạt FCR), template theo loài, share backup cho con/em, giọng nói on-device. |
| V2 Theo loài | Profile gà/lợn chuyên sâu khi có quy trình + phiếu thật (checklist, lịch, đơn vị, màn xuất, báo cáo); không khuyến nghị y tế/chẩn đoán nếu thiếu chuyên gia. |
| V3 Cảnh báo & phân tích | Thời tiết opt-in, OCR hoàn thiện, AI tóm tắt số đã ghi (không chẩn đoán/kê thuốc/sửa sổ). |
| V4 Gia đình | Sync đa thiết bị, phân quyền, Android/PWA, cân/cảm biến, tích hợp đối tác — chỉ sau khi 1 iPhone đã chạy nhiều lứa. |

Mỗi loài mới chỉ bật workflow chuyên sâu khi có quy trình 1 lứa + phiếu mẫu + chi thực tế + tiêu chí báo cáo được người nuôi xác nhận; thêm profile không đổi lõi.

---

## 11. Kiểm thử & nghiệm thu (08)

**Nguyên tắc:** nhập 1 lứa vịt đã xong từ phiếu thật + tạo trại Gà/Lợn để chắc không nhầm trại/workflow.

**Kịch bản đạt:** tạo trại đầu (đặt tên + chọn loài không cần giải thích) → thêm trại 2/3 (chữ vẫn to, lưới không chật) → 1 lứa mở (tự chọn đúng, header rõ trại) → nhiều lứa (bắt chọn trại) → chi phí chung 3tr/2–3 lứa (tổng khớp) → trùng (cảnh báo nhưng cho lưu) → xuất/bắt đúng nhãn loài → quyết toán unknown (không tiền tạm tính, có CTA) / net (10tr−3tr=7tr khi đã đối chiếu) / gross (10−3−2=5tr) → backup/restore đủ lứa/phí/nhóm/ảnh.

**Nghiệm thu:** dễ dùng (bố/mẹ tự làm hết) / đúng trại (không form mù đích) / đúng tiền (truy về phiếu, adjustment trong CP không cộng 2 lần) / không mất (restart/offline/backup) / dễ đọc (Dynamic Type 3–5 không che nút, VoiceOver nghĩa) / an toàn (confirm archive/xóa/đóng + Undo 5s). **Pilot:** vịt quy trình/phiếu thật trước; gà/lợn chỉ sổ chung.

---

## 12. Dữ liệu cần bổ sung (09)

Cần (đã che nhạy cảm): phiếu cám/hóa đơn (ngày, loại, bao, tiền, người bán); phiếu xuất/bắt vịt (kg, con, giá/tiền, nhiều đợt/ngày); phiếu quyết toán CP vịt (chốt interpretation + khoản trong số CP + công thức); danh sách chi phí chung (cách chia điện/nước/công); quy trình 1 lứa gà + lợn (việc, mốc, xuất/bán, chi/phiếu); 1 sổ lứa cũ mỗi loài (gia đình thực muốn biết gì cuối lứa).

5 câu hỏi trước khi mở workflow Gà/Lợn: lứa bắt đầu/kết thúc khi nào, chu kỳ mấy ngày? việc nào bắt buộc nhắc? đầu ra kg/con/trứng/tiêu chí khác? có quyết toán/khấu trừ kiểu CP không, phiếu ghi gì? chi phí nào riêng/chung? Không cần để dùng sổ cơ bản.

---

## 13. Mở app & cấu trúc repo

```bash
brew install xcodegen
cd TrangTraiNhaToi
# sửa PRODUCT_BUNDLE_IDENTIFIER + DEVELOPMENT_TEAM trong project.yml
xcodegen generate
open TrangTraiNhaToi.xcodeproj
```

`App/ | Models/ | Services/ | DesignSystem/ | Features/{Farms,Batches,Expenses,Harvests,Settlement,Reports,...} | Docs/ (nguồn sự thật v3)`. Skeleton: đã có đa trại/đa vật nuôi, tạo trại/lứa theo profile, quyết toán interpretation, phân bổ phí; phiếu ảnh/backup/báo cáo chi tiết là điểm hoàn thiện trước pilot. Lưu ý: không chốt lãi/lỗ khi chưa đối chiếu; báo cáo chỉ so cùng trại/cùng loài; tổng nhiều trại là tổng dòng tiền hộ.

---

*File này thay thế việc đọc lẻ 14 file khi cần nắm toàn app. Chi tiết công thức/OCR/pixel UI vẫn tra file gốc theo số mục.*
