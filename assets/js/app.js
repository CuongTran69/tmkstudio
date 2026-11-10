/**
 * TMK Studio — World-Class Apple Indie Portfolio Showcase
 * Interactive Engine: Real Data, Micro-interactions, Bilingual System, and Native Dialogs
 */

// Authentic Sayings for Lời Xưa Oracle (extracted from CaDaoViet database)
const CA_DAO_SAYINGS = [
  {
    text: "Công cha như núi Thái Sơn,\nNghĩa mẹ như nước trong nguồn chảy ra.\nMột lòng thờ mẹ kính cha,\nCho tròn chữ hiếu mới là đạo con.",
    meaning: "Ca ngợi công ơn sinh thành dưỡng dục vô bờ bến của cha mẹ, nhắc nhở con cái bổn phận làm tròn chữ hiếu suốt đời.",
    meaningEn: "Praising the boundless love and sacrifice of parents, reminding children of lifelong filial piety.",
    category: "Gia đình · Đạo lý",
    categoryEn: "Family · Filial Piety",
    tag: "#giadinh #chuhieu"
  },
  {
    text: "Nhiễu điều phủ lấy giá gương,\nNgười trong một nước phải thương nhau cùng.",
    meaning: "Lời răn dạy về tinh thần đoàn kết, tình nghĩa đồng bào thiêng liêng giữa những người con cùng chung đất mẹ.",
    meaningEn: "A timeless reminder of solidarity, urging countrymen to love and cherish one another.",
    category: "Đồng bào · Tình nghĩa",
    categoryEn: "Solidarity · Brotherhood",
    tag: "#dongbao #tinhnghia"
  },
  {
    text: "Bầu ơi thương lấy bí cùng,\nTuy rằng khác giống nhưng chung một giàn.",
    meaning: "Dù xuất thân, hoàn cảnh có khác biệt, hãy luôn sẻ chia và đùm bọc lẫn nhau trong hoạn nạn.",
    meaningEn: "Though coming from different walks of life, we share the same trellis — nurture compassion.",
    category: "Đùm bọc · Tương thân",
    categoryEn: "Compassion · Kindness",
    tag: "#chiase #tuvita"
  },
  {
    text: "Lời nói chẳng mất tiền mua,\nLựa lời mà nói cho vừa lòng nhau.",
    meaning: "Nhắc nhở về văn hóa ứng xử, lời ăn tiếng nói nhã nhặn, tôn trọng và gìn giữ hòa khí.",
    meaningEn: "Words cost nothing to buy; choose them thoughtfully to bring peace and harmony to all.",
    category: "Giao tiếp · Ứng xử",
    categoryEn: "Wisdom · Communication",
    tag: "#loian #ungxu"
  },
  {
    text: "Có công mài sắt, có ngày nên kim.",
    meaning: "Lòng kiên trì, nhẫn nại và nỗ lực không ngừng nghỉ sẽ vượt qua mọi gian khó để gặt hái thành công.",
    meaningEn: "With patient perseverance and steady resolve, even an iron rod can be ground into a needle.",
    category: "Ý chí · Nghị lực",
    categoryEn: "Perseverance · Resolve",
    tag: "#nghiluc #kientri"
  }
];

// Interactive Palettes for Paletto Showcase
const PALETTO_PALETTES = [
  {
    name: "Tây Bắc Mist",
    colors: ["#2C3E50", "#4CA1AF", "#A1DB58", "#F5F7FA", "#1A252F"],
    wcag: { text: "#FFFFFF", bg: "#2C3E50", ratio: "8.6:1", level: "AAA Pass" }
  },
  {
    name: "Hà Nội Autumn",
    colors: ["#D97706", "#F59E0B", "#FDE68A", "#78350F", "#451A03"],
    wcag: { text: "#FFFFFF", bg: "#78350F", ratio: "7.9:1", level: "AAA Pass" }
  },
  {
    name: "Shan Tea Leaves",
    colors: ["#064E3B", "#047857", "#10B981", "#6EE7B7", "#ECFDF5"],
    wcag: { text: "#FFFFFF", bg: "#064E3B", ratio: "11.2:1", level: "AAA Pass" }
  },
  {
    name: "Apple Silicon Slate",
    colors: ["#0F172A", "#1E293B", "#334155", "#64748B", "#F8FAFC"],
    wcag: { text: "#F8FAFC", bg: "#0F172A", ratio: "15.4:1", level: "AAA Pass" }
  }
];

// Master Apps Database with Comprehensive Details & Media
const APPS_DATA = [
  {
    id: "loi-xua",
    name: "Lời Xưa — CaDaoViet",
    subtitle: "Vietnamese Folk Wisdom",
    bundleId: "com.cuongtran.CaDaoViet",
    version: "1.0.2",
    platforms: ["iOS 17+"],
    category: "culture",
    icon: "assets/icons/loi-xua.png",
    banner: "assets/banners/loi-xua-header.png",
    screenshot: null,
    appStoreUrl: "https://tmkstudio.io.vn/loixua",
    tagline: {
      vi: "Mỗi ngày một câu hay — Khi cần tra cứu, khi tò mò khám phá văn hóa Việt.",
      en: "A wise saying each day — Discover Vietnamese folk poetry and proverbs."
    },
    shortDesc: {
      vi: "Kho tàng ca dao, tục ngữ, thành ngữ Việt Nam với typography New York thanh tịnh, gieo quẻ tre chữa lành, tra cứu không dấu và âm thanh Zen đồng quê.",
      en: "Treasury of Vietnamese proverbs and folk verse crafted with quiet typography, healing bamboo oracle divination, and countryside nature soundscapes."
    },
    story: {
      vi: "Lời Xưa ra đời để giải quyết khoảng cách giữa văn hóa dân gian quý giá của cha ông và thói quen lướt điện thoại nhanh của người trẻ. Không phải cuốn từ điển ngữ học khô cứng, Lời Xưa đem lại cảm giác thanh thản như lật giở từng trang giấy dó: mỗi sáng nhận một câu thơ đẹp kèm lịch âm, gieo quẻ tre xin lời dặn khi hoang mang, và sao chép câu chữ tinh tế để chia sẻ cùng bạn bè.",
      en: "Lời Xưa bridges centuries of Vietnamese folk wisdom with modern digital mindfulness. Neither a dry linguistic dictionary nor a generic quote app, it evokes the warmth of handmade Dó paper: greet each sunrise with poetic verse, cast bamboo divination sticks for gentle guidance, and export graceful cards."
    },
    features: [
      {
        title: "Hôm Nay & Lịch Ngày Âm Dương",
        titleEn: "Daily Saying & Lunar Dates",
        desc: "Mỗi ngày hiển thị một câu ca dao chọn lọc cố định, nghe giọng đọc AI offline tiếng Việt, peek lật thẻ đổi câu linh hoạt.",
        descEn: "A deterministic daily poem paired with lunar calendar dates, offline AI TTS voice, and intuitive card-peek gestures."
      },
      {
        title: "Gieo Quẻ Ca Dao (Oracle)",
        titleEn: "Folk Wisdom Oracle",
        desc: "Lắc máy hoặc chạm ống quẻ tre xin lời dặn tiền nhân theo 6 tâm nguyện: Cầu An, Tình Duyên, Công Danh, Gia Đạo, Đối Nhân, Tùy Duyên.",
        descEn: "Shake bamboo sticks for ancestral counsel across 6 life intentions: Peace, Love, Career, Family, Kindness, Serendipity."
      },
      {
        title: "Zen Soundscape Đồng Quê",
        titleEn: "Countryside Zen Soundscape",
        desc: "Không gian âm thanh thư giãn thuần túy: tiếng mưa rơi trên mái lá, tiếng suối reo, chuông chùa ngân vang và chim hót sáng sớm.",
        descEn: "Relaxing rural ambiances: rain on thatch roofs, forest streams, distant temple bells, and morning birds."
      },
      {
        title: "Tra Cứu Không Dấu Xuất Sắc",
        titleEn: "Accent-Insensitive Search",
        desc: "Gõ không dấu thoải mái (xử lý chuẩn ký tự `đ/Đ` và dấu thanh), phân loại Ca dao, Tục ngữ, Thành ngữ kèm giải nghĩa và nguồn gốc.",
        descEn: "Fast search ignoring tones and unique Vietnamese diacritics with comprehensive meanings and etymology."
      }
    ],
    tech: {
      stack: "SwiftUI, SwiftData, AVSpeechSynthesizer, ImageRenderer",
      privacy: "100% Offline. Zero tracking. No accounts."
    }
  },
  {
    id: "typemate",
    name: "TypeMate — VietText",
    subtitle: "Native macOS Text Expander",
    bundleId: "com.cuongtran.TypeMate",
    version: "1.2.0 (macOS Universal)",
    platforms: ["macOS 14+ (Apple Silicon & Intel)"],
    category: "productivity",
    icon: "assets/icons/typemate.png",
    banner: "assets/banners/typemate-header.png",
    screenshot: "assets/screens/typemate-quickpaste.png",
    downloadUrl: "downloads/TypeMate.dmg",
    appStoreUrl: "https://tmkstudio.io.vn/apps",
    tagline: {
      vi: "Ứng dụng gõ tắt native cho macOS — Chung sống hòa bình với bộ gõ tiếng Việt.",
      en: "Native macOS text expander — Harmonious with Vietnamese input methods."
    },
    shortDesc: {
      vi: "Công cụ mở rộng văn bản tự động trên Mac, cam kết không xung đột với Telex/VNI, dán nhanh ⌥⌘V thần tốc và hỗ trợ chia sẻ gói mẫu .typemate-pack.",
      en: "Automated text expander for Mac engineered to never clash with Telex/VNI input engines, with instant ⌥⌘V Quick Paste."
    },
    story: {
      vi: "Người dùng Mac tại Việt Nam từ lâu gặp phải nghịch lý: các phần mềm Text Expander nước ngoài khi dùng chung với bộ gõ tiếng Việt (Telex Apple, EVKey, OpenKey) thường xuyên làm nhảy dấu, nhân đôi chữ hoặc nuốt mất ký tự. TypeMate ra đời với triết lý: Toàn vẹn văn bản là số 1 — khi không chắc chắn sẽ không bao giờ can thiệp bừa bãi.",
      en: "Mac users in Vietnam have long endured a frustrating trade-off: mainstream text expanders routinely break, duplicate characters, or scramble words when paired with Vietnamese input engines (Telex, OpenKey, EVKey). TypeMate was engineered from day one on a sacred rule: Text integrity comes first."
    },
    features: [
      {
        title: "Bung Chữ Tự Động An Toàn Tuyệt Đối",
        titleEn: "Conflict-Free Auto Expansion",
        desc: "Gõ trigger tắt (ví dụ `;stk`, `;email`) và app tự động thay thế nội dung mẫu mà không làm lệch dấu gõ tiếng Việt.",
        descEn: "Type abbreviations (e.g., `;bank`, `;email`) and watch them expand seamlessly without tone mark disruption."
      },
      {
        title: "Dán Nhanh Thông Minh (⌥⌘V)",
        titleEn: "Instant Quick Paste (⌥⌘V)",
        desc: "Bật cửa sổ tra cứu nhanh ở bất kỳ đâu để chọn và chèn câu trả lời mẫu cho CSKH, Telesale, Kế toán trong 1 giây.",
        descEn: "Summon a lightweight instant search palette anywhere to insert common replies in a split second."
      },
      {
        title: "Biến Động & Con Trỏ Chuẩn",
        titleEn: "Dynamic Variables & Cursor",
        desc: "Tự động chèn ngày giờ, nội dung clipboard và đưa con trỏ soạn thảo vào đúng vị trí mong muốn.",
        descEn: "Auto-insert current date/time, restore clipboard content, and position your cursor precisely."
      },
      {
        title: "Gói Mẫu Nhóm (.typemate-pack)",
        titleEn: "Team Snippet Packs (.typemate-pack)",
        desc: "Đóng gói và chia sẻ hàng trăm mẫu câu chuẩn cho phòng ban, nhân viên kinh doanh hoặc CSKH.",
        descEn: "Import and export curated snippet bundles for entire customer service or sales teams."
      }
    ],
    tech: {
      stack: "Native Swift & SwiftUI, Accessibility API, Carbon Events",
      privacy: "100% On-device. Zero network traffic. Zero keylogging."
    }
  },
  {
    id: "tram-thien-tra",
    name: "Trạm Thiền Trà",
    subtitle: "Mindful Tea Journaling",
    bundleId: "com.tramthientra.app",
    version: "1.0.4",
    platforms: ["iOS 16+"],
    category: "culture",
    icon: "assets/icons/tram-thien-tra.png",
    banner: "assets/banners/tram-thien-tra-header.jpg",
    screenshot: "assets/screens/tram-thien-tra-search.jpg",
    appStoreUrl: "https://tmkstudio.io.vn/thientra",
    tagline: {
      vi: "Mỗi ngày, một tách trà… Buông bỏ muộn phiền, tích lũy an vui.",
      en: "Every day, a cup of tea… Release burdens, cultivate inner quietude."
    },
    shortDesc: {
      vi: "Ứng dụng thiền trà và nhật ký biết ơn lấy cảm hứng từ văn hóa trà Shan tuyết Tây Bắc. Mang lại chốn an trú mộc mạc, tĩnh lặng giữa bộn bề cuộc sống.",
      en: "Mindfulness and gratitude journaling rooted in Vietnamese Shan snow tea culture. A serene sanctuary to pause and reflect in the digital age."
    },
    story: {
      vi: "Trạm Thiền Trà không cố trở thành một ứng dụng theo dõi y tế hay trị liệu phức tạp. Thay vào đó, app mang đến cảm giác như một buổi sớm ngồi bên hiên nhà gỗ Tây Bắc: nhóm một ấm trà shan tuyết, ngắm làn khói mờ ảo chuyển dần theo ánh nắng trong ngày, ghi lại ba điều mình biết ơn cuộc đời, hoặc viết ra một nỗi muộn phiền rồi để nó tan biến như làn khói không còn lưu vết.",
      en: "Trạm Thiền Trà refuses clinical jargon and cold wellness dashboards. Instead, it feels like sitting on a wooden porch in the misty mountains of Northwest Vietnam: brewing a pot of wild Shan snow tea, watching steam drift with the changing daylight, recording three daily blessings, or writing down heavy thoughts and watching them dissolve forever."
    },
    features: [
      {
        title: "Trà Thất Động (Canvas)",
        titleEn: "Living Tea Room Canvas",
        desc: "Ấm trà vẽ bằng SwiftUI Canvas bốc khói mộc mạc, đổi màu nền theo 6 khung giờ thực tế: Bình Minh, Sớm Mai, Ban Trưa, Xế Chiều, Hoàng Hôn và Đêm Muộn.",
        descEn: "Steaming teapot rendered on SwiftUI Canvas, naturally transitioning its ambient colors through 6 real-world day phases."
      },
      {
        title: "Nghi Thức Buông Bỏ (Release)",
        titleEn: "Burden Release Ritual",
        desc: "Viết ra phiền muộn rồi nhấn buông — chữ tan biến thành khói trà. Hoàn toàn riêng tư, tuyệt đối không lưu dữ liệu hay gửi đi bất kỳ đâu.",
        descEn: "Write down frustrations and release them into the mist — text vanishes completely with zero storage or tracking."
      },
      {
        title: "Nghi Thức Tích Luỹ (Gratitude)",
        titleEn: "Gratitude Journaling",
        desc: "Ghi chép 3 điều bạn biết ơn mỗi ngày để nuôi dưỡng mầm an yên, xây dựng góc nhìn tích cực bền vững.",
        descEn: "Capture 3 daily gratitudes to nourish long-term peace of mind and resilience."
      },
      {
        title: "Cây Thiền Streak & Thực Hành Mở Rộng",
        titleEn: "Zen Tree Streak & Breathwork",
        desc: "Mầm trà lớn dần qua từng ngày thực hành kiên trì; kèm phòng Thiền Thở nhịp 4-7-8, Phòng Sám Hối, Trà Đêm và Thư Gửi Tương Lai.",
        descEn: "Your tea sprout grows into a lush bush as you maintain mindful streaks; includes 4-7-8 breathwork and reflection chambers."
      }
    ],
    tech: {
      stack: "SwiftUI, Canvas 2D, SwiftData, Local Notifications",
      privacy: "100% Local-First. Zero telemetry. No account required."
    }
  },
  {
    id: "bus-chill",
    name: "Bus Chill",
    subtitle: "Smart Bus Companion",
    bundleId: "com.cuongtran.BusCompanion",
    version: "1.0.1",
    platforms: ["iOS 16.2+", "watchOS 9+"],
    category: "life",
    icon: "assets/icons/bus-chill.png",
    banner: "assets/banners/bus-chill-header.png",
    screenshot: null,
    appStoreUrl: "https://tmkstudio.io.vn/buschill",
    tagline: {
      vi: "Đi buýt thảnh thơi, không lo lỡ trạm — Bạn đồng hành xe buýt Hà Nội.",
      en: "Ride the bus in peace — Never miss your stop in Hanoi."
    },
    shortDesc: {
      vi: "Ứng dụng trợ lý xe buýt offline-first cho Hà Nội. Báo thức thông minh chống ngủ quên bằng AlarmKit và rung cổ tay tiện lợi trên Apple Watch.",
      en: "Offline-first Hanoi transit assistant. Features smart wake-up alarms before your stop with AlarmKit and Apple Watch wrist alerts."
    },
    story: {
      vi: "Đi xe buýt sau một ngày làm việc mệt mỏi, ai cũng muốn nhắm mắt ngủ một giấc nhưng luôn thấp thỏm sợ đi quá trạm. Bus Chill biến chiếc iPhone và Apple Watch thành người bạn đồng hành tin cậy: chuông báo thức native sẽ đánh thức bạn đúng trước 2 trạm, kể cả khi iPhone khóa màn hình hoặc mất sóng GPS dưới hầm.",
      en: "Commuters after a long workday often crave a brief nap on the bus, yet live in fear of missing their stop. Bus Chill turns your iPhone and Apple Watch into a vigilant companion: native alarm tones gently wake you exactly 2 stops before your destination, even when the phone is locked or GPS fades."
    },
    features: [
      {
        title: "Báo Thức 'Chống Ngủ Quên' (AlarmKit)",
        titleEn: "Anti-Sleep Stop Alarm",
        desc: "Đặt báo trước 1–3 trạm; kích hoạt hệ thống báo động native AlarmKit kết hợp geofence và countdown dự phòng chuẩn xác.",
        descEn: "Set alerts 1-3 stops ahead; triggers native AlarmKit alerts with geofencing and fallback countdown timers."
      },
      {
        title: "138+ Tuyến Buýt Hà Nội 100% Offline",
        titleEn: "138+ Routes 100% Offline",
        desc: "Toàn bộ lộ trình và biểu đồ giờ nằm sẵn trong cơ sở dữ liệu GRDB SQLite trên máy, tra cứu lộ trình không tốn 1 byte dung lượng mạng.",
        descEn: "Complete Hanoi bus timetable stored in local SQLite; browse routes and stops without burning cellular data."
      },
      {
        title: "Live Activity & Dynamic Island",
        titleEn: "Live Activities & Island",
        desc: "Theo dõi số trạm còn lại và thời gian dự kiến đến ngay trên màn hình khóa hoặc Dynamic Island.",
        descEn: "Glanceable progress right on your Lock Screen and Dynamic Island."
      },
      {
        title: "Apple Watch Companion & Gamification Xanh",
        titleEn: "Apple Watch & Eco Stats",
        desc: "Rung nhẹ trên cổ tay khi sắp đến điểm dừng; quy đổi mỗi chuyến buýt thành số tiền tiết kiệm và trồng rừng cây ảo xanh mát.",
        descEn: "Haptic wrist taps when approaching your destination; converts commutes into money saved and a virtual forest."
      }
    ],
    tech: {
      stack: "SwiftUI, AlarmKit, ActivityKit, CoreLocation, GRDB SQLite",
      privacy: "Offline-first. Location strictly processed on-device."
    }
  },
  {
    id: "fam-diary",
    name: "Fam Diary",
    subtitle: "Private Digital Family Diary",
    bundleId: "app.FamDiary",
    version: "1.0",
    platforms: ["iOS 17+"],
    category: "life",
    icon: "assets/icons/fam-diary.png",
    banner: "assets/banners/fam-diary-header.png",
    screenshot: "assets/screens/fam-diary-1.png",
    appStoreUrl: "https://tmkstudio.io.vn/famdiary",
    tagline: {
      vi: "Nhật ký số an toàn cho cả gia đình — Lưu giữ khoảnh khắc, bảo mật mã hóa AES-256.",
      en: "Your family's private digital diary — AES-256 encrypted, 100% on-device."
    },
    shortDesc: {
      vi: "Sổ tay gia đình bảo mật cao: lưu sự kiện, lịch khám bệnh, hồ sơ sức khỏe, tài liệu và hình ảnh riêng cho từng thành viên, nhắc nhở thông minh và hoạt động 100% offline.",
      en: "Secure family digital record: store events, appointments, health notes, photos for each member, smart reminders, 100% on-device with AES-256 encryption."
    },
    story: {
      vi: "Mỗi gia đình đều có hàng trăm giấy tờ y tế, lịch hẹn khám, ngày tiêm chủng của con nhỏ và những kỷ niệm vô giá bị phân tán trên nhiều ứng dụng chat hay giấy tờ dễ thất lạc. Fam Diary ra đời với mục tiêu trở thành chiếc két sắt số cho gia đình: mọi dữ liệu được mã hóa chuẩn quân sự AES-256-GCM trực tiếp trên máy của bạn, tuyệt đối không tải lên đám mây hay bán dữ liệu cho bất kỳ bên thứ ba nào.",
      en: "Every family juggles countless health records, appointments, immunization dates, and cherished memories scattered across chat groups or lost paper folders. Fam Diary acts as a digital family vault: military-grade AES-256-GCM encryption keeps all records strictly on your device, with zero cloud tracking and zero data selling."
    },
    features: [
      {
        title: "Hồ Sơ Riêng Từng Thành Viên",
        titleEn: "Individual Member Profiles",
        desc: "Tạo hồ sơ độc lập cho bố mẹ, con cái và ông bà; sắp xếp tài liệu, hình ảnh và ghi chú theo từng người.",
        descEn: "Create dedicated profiles for parents, kids, and grandparents; organize files, photos, and notes per person."
      },
      {
        title: "Mã Hóa AES-256-GCM Cục Bộ",
        titleEn: "AES-256-GCM On-Device Encryption",
        desc: "Toàn bộ nhật ký và ảnh chụp được mã hóa ngay trên thiết bị, tuyệt đối không truyền ra ngoài.",
        descEn: "All entries and photos are encrypted right on your iPhone with zero external server exposure."
      },
      {
        title: "Nhắc Lịch Hẹn & Sự Kiện Thông Minh",
        titleEn: "Smart Appointment Reminders",
        desc: "Hẹn giờ thông báo native chuẩn xác cho lịch khám sức khỏe, ngày kỷ niệm hay hạn tái khám.",
        descEn: "Customizable native local notifications ensure you never miss appointments or family milestones."
      },
      {
        title: "Sao Lưu & Xuất Dữ Liệu Chủ Động",
        titleEn: "Encrypted Backup & Full Control",
        desc: "Dễ dàng xuất và phục hồi toàn bộ dữ liệu gia đình bất kỳ khi nào bạn muốn.",
        descEn: "Export and import your complete family vault anytime with seamless offline backup tools."
      }
    ],
    tech: {
      stack: "SwiftUI, SwiftData, AES-256-GCM Cryptography, Local Notifications",
      privacy: "100% Local-First. Zero server uploads. Complete local encryption."
    }
  },
  {
    id: "paletto",
    name: "Paletto — Color Studio",
    subtitle: "Color Studio for Designers & Devs",
    bundleId: "com.paletto.app",
    version: "1.2",
    platforms: ["iOS 17+"],
    category: "productivity",
    icon: "assets/icons/paletto.png",
    banner: "assets/banners/paletto-header.png",
    screenshot: "assets/screens/paletto-search.png",
    appStoreUrl: "https://tmkstudio.io.vn/paletto",
    tagline: {
      vi: "Trích xuất, tạo lập và quản lý bảng màu chuyên nghiệp trên iOS.",
      en: "Extract, create, and manage beautiful color palettes on iOS."
    },
    shortDesc: {
      vi: "Bộ công cụ màu sắc cho Designer và Developer: trích xuất K-Means từ ảnh, chấm màu camera thời gian thực, kiểm tra tương phản WCAG 2.1 và xuất code 7+ định dạng.",
      en: "Comprehensive color lab: K-Means photo extraction, real-time camera color picker, WCAG 2.1 contrast checker, and multi-format code export."
    },
    story: {
      vi: "Paletto được xây dựng để đơn giản hóa quy trình làm việc với màu sắc của giới sáng tạo. Bạn có thể chụp ảnh hoàng hôn hoặc một poster đẹp để lấy ngay bảng màu 5 tone hài hòa, kiểm tra độ tương phản giữa chữ và nền để đảm bảo người khiếm thị đọc được (chuẩn WCAG AA/AAA), và xuất thẳng mã code cho SwiftUI, Tailwind CSS hay Jetpack Compose.",
      en: "Paletto was engineered to streamline color workflows for developers and designers. Capture a sunset or vintage poster to generate a 5-color harmony, test foreground/background contrast ratios against international accessibility standards, and export clean SwiftUI or Tailwind CSS snippets instantly."
    },
    features: [
      {
        title: "Trích Xuất Màu Bằng K-Means & Kính Lúp",
        titleEn: "K-Means Extraction & Loupe",
        desc: "Tự động phân tích các dải màu chủ đạo từ ảnh chụp, kèm kính lúp phóng to chuẩn xác từng pixel điểm ảnh.",
        descEn: "K-Means clustering algorithm finds dominant hues with an interactive loupe for exact pixel sampling."
      },
      {
        title: "Chấm Màu Qua Camera Đời Thực",
        titleEn: "Live Camera Eyedropper",
        desc: "Hướng camera vào bất kỳ đồ vật hay cảnh sắc đời thực để bắt mã HEX/RGB trực tiếp theo thời gian thực.",
        descEn: "Point your camera at real-world objects to lock onto hex colors in real time."
      },
      {
        title: "Kiểm Tra Độ Tương Phản Chuẩn WCAG 2.1",
        titleEn: "WCAG 2.1 Contrast Analyzer",
        desc: "Đo tỉ lệ tương phản chữ/nền, chấm điểm chuẩn AA / AAA cho cả người khiếm thị và gợi ý hòa sắc (Complementary, Triadic...).",
        descEn: "Measure text-to-background contrast ratios with instant AA/AAA accessibility ratings."
      },
      {
        title: "Xuất Code 7+ Nền Tảng 1 Chạm",
        titleEn: "7+ Platform Code Export",
        desc: "SwiftUI Color, UIKit Hex, CSS/Sass, Tailwind CSS, Jetpack Compose, JSON, Adobe ASE và Widget màn hình chính.",
        descEn: "Instant export to SwiftUI, UIKit, CSS/Sass, Tailwind, Compose, JSON, and Adobe ASE."
      }
    ],
    tech: {
      stack: "SwiftUI, App Group container, AVFoundation, WidgetKit",
      privacy: "100% On-device processing. Camera used strictly for color sampling."
    }
  },
  {
    id: "cat-link",
    name: "Cất Link",
    subtitle: "Actionable Link Saver",
    bundleId: "com.cuongtran.castlink",
    version: "1.2",
    platforms: ["iOS 17+"],
    category: "productivity",
    icon: "assets/icons/cat-link.png",
    banner: "assets/banners/cat-link-header.png",
    screenshot: null,
    appStoreUrl: "https://tmkstudio.io.vn/catlink",
    tagline: {
      vi: "Biến link đã lưu thành việc sẽ làm — Cất link theo ý định & thời điểm.",
      en: "Turn saved links into actions — Save by intent and timing."
    },
    shortDesc: {
      vi: "Giải pháp lưu link thông minh từ TikTok, Safari, YouTube, Shopee… giúp bạn không bao giờ biến bookmark thành 'bãi rác lãng quên'.",
      en: "Smart link capture for TikTok, Safari, and shopping apps that prevents bookmarks from becoming forgotten graveyards."
    },
    story: {
      vi: "Chúng ta lưu hàng trăm liên kết mỗi tuần nhưng 90% không bao giờ mở lại. Cất Link thay đổi điều này bằng câu hỏi cốt lõi khi lưu qua Share Sheet: Bạn cất link này để làm gì (Xem, Đọc, Mua, Đi, Làm, Gửi)? Và bạn sẽ mở vào lúc nào (Tối nay, Cuối tuần, Để sau)? Link sẽ xuất hiện đúng thời điểm bạn có thời gian.",
      en: "We hoard hundreds of links every week, yet 90% are never opened again. Cất Link changes the game by asking a simple question upon capture: Are you saving this to Watch, Read, Buy, Go, Do, or Send? And will you do it Tonight, This Weekend, or Later? Your links appear exactly when you have time."
    },
    features: [
      {
        title: "Share Sheet 1 Chạm Siêu Tốc",
        titleEn: "Ultra-Fast Share Sheet",
        desc: "Lưu link từ bất kỳ app nào chỉ với 1 chạm; chọn nhanh Ý định và Mốc thời gian xử lý.",
        descEn: "Save from any app in a tap: pick Intent (Watch/Read/Buy/Go/Do/Send) and Time Bucket."
      },
      {
        title: "Action Inbox 'Hôm Nay'",
        titleEn: "Action Inbox 'Today'",
        desc: "Tự động phân loại 5 tầng: Quá hạn -> Tối nay -> Mua/Đi -> Mới lưu 24h -> Thư viện.",
        descEn: "Intelligent 5-layer sorting: Overdue -> Tonight -> Shopping/Places -> Recent 24h -> Library."
      },
      {
        title: "Nhắc Nhở Đúng Hẹn & Tôn Trọng Giờ Ngủ",
        titleEn: "Respectful Smart Reminders",
        desc: "Hẹn giờ nhắc 20:00 tối lúc bạn thảnh thơi; tự động chuyển sang 8:00 sáng hôm sau nếu rơi vào giờ ngủ (22h–7h).",
        descEn: "Delivers notifications at 20:00 leisure time; postpones alerts to 08:00 during quiet hours."
      },
      {
        title: "Tự Dọn Dẹp Link Cũ & Power Search",
        titleEn: "Auto Cleanup & Power Search",
        desc: "Tự động dọn dẹp link đã xong sau 7/30/90 ngày; tìm kiếm siêu tốc theo tên miền, hashtag `#` và ghi chú.",
        descEn: "Background maintenance purges discarded items after 7/30/90 days; real-time `#tag` filtering."
      }
    ],
    tech: {
      stack: "SwiftUI, SwiftData, Share Extension, BackgroundTasks",
      privacy: "Local-first. Zero accounts. Zero advertising."
    }
  },
  {
    id: "trang-trai-nha-toi",
    name: "Trang Trại Nhà Tôi",
    subtitle: "Livestock Farm Notebook",
    bundleId: "com.cuongtran.TrangTraiNhaToi",
    version: "1.1",
    platforms: ["iOS 17+"],
    category: "life",
    icon: "assets/icons/trang-trai-nha-toi.png",
    banner: "assets/banners/trang-trai-nha-toi-header.png",
    screenshot: "assets/screens/trang-trai-nha-toi-search.png",
    appStoreUrl: "https://tmkstudio.io.vn/trangtrainhatoi",
    tagline: {
      vi: "Quản lý lứa nuôi, chi phí và doanh thu dễ dàng cho nhà nông Việt Nam.",
      en: "Effortless livestock batch, expense, and revenue tracking for farmers."
    },
    shortDesc: {
      vi: "Sổ tay chăn nuôi thiết kế riêng cho người lớn tuổi: chữ to, nút to, nhập liệu bằng giọng nói tiếng Việt on-device, đối chiếu quyết toán chống lệch tiền.",
      en: "Livestock notebook tailored for farming families: big text, bold buttons, on-device Vietnamese voice entry, and airtight settlement reconciliation."
    },
    story: {
      vi: "Hầu hết phần mềm quản lý nông nghiệp hiện nay quá phức tạp hoặc ép dùng máy tính. Trang Trại Nhà Tôi được thiết kế từ chính thực tế tại các vùng quê Việt Nam: các cô chú nuôi vài nghìn vịt hay đàn lợn chỉ cần một chiếc iPhone để nói vào số bao cám đã mua, kiểm tra lịch tiêm vắc-xin và đối chiếu tiền bán khi thương lái đến bắt mà không lo bị tính thiếu một hào.",
      en: "Most farm management apps are overly corporate and require desktop PCs. Trang Trại Nhà Tôi was built in direct response to rural Vietnamese farming realities: caregivers managing thousands of ducks or pigs can simply speak into their iPhone to log feed bags, check vaccine schedules, and reconcile buyer statements with zero guesswork."
    },
    features: [
      {
        title: "Thiết Kế UX Senior Cho Người Lớn Tuổi",
        titleEn: "Senior UX for Farming Families",
        desc: "Chữ to bản, nút bấm lớn, độ tương phản cao, thao tác 1 chạm không đòi hỏi thành thạo công nghệ.",
        descEn: "Large typography, high contrast, oversized buttons, effortless controls."
      },
      {
        title: "Nhập Liệu Giọng Nói Tiếng Việt On-Device",
        titleEn: "On-Device Voice Dictation",
        desc: "Nói trực tiếp tiếng Việt vào app để ghi chi phí cám, thuốc thú y rảnh tay mà không phải gõ phím nhỏ.",
        descEn: "Hands-free on-device Vietnamese voice entry for recording feed bags and medicine."
      },
      {
        title: "Quản Lý Đa Trại Vịt, Gà, Lợn",
        titleEn: "Ducks, Chickens, Pigs Tracker",
        desc: "Quy trình chăm sóc và lịch tiêm chủng vắc-xin chuẩn theo từng loài; tự động phân bổ chi phí chung giữa các chuồng.",
        descEn: "Customized workflows for Ducks, Chickens, and Pigs with shared cost allocation."
      },
      {
        title: "Quyết Toán Chống Lệch Tiền & Chia Sẻ Zalo",
        titleEn: "Reconciled Settlement & Zalo Share",
        desc: "Công thức đối chiếu đa tầng cân xuất, trừ cám tạm ứng, thưởng FCR; xuất ảnh báo cáo gửi 1 chạm qua Zalo cho người thân.",
        descEn: "Calculates harvest weights, deductions, feed advances, and FCR bonuses without discrepancies."
      }
    ],
    tech: {
      stack: "SwiftUI, SwiftData, On-device Speech Recognition, ShareLink",
      privacy: "100% Offline. Zero cloud dependencies. Full local backup & restore."
    }
  }
];

// UI Text Dictionary for Bilingual Toggle
const I18N = {
  vi: {
    brandName: "TMK Studio",
    byCreator: "Sản phẩm được tạo bởi Trần Cường",
    navWork: "Hệ Sinh Thái",
    navValues: "Triết Lý",
    navCreator: "Tác Giả",
    navContact: "Liên Hệ",
    heroPill: "Apple Native · 100% Local-First · Tinh Tế Cho Người Việt",
    heroTitle: "Ứng Dụng Tinh Tế, Phục Vụ Trọn Vẹn Đời Sống Việt",
    heroLead: "Bộ sưu tập 8 ứng dụng độc lập được thiết kế tỉ mỉ cho hệ sinh thái Apple. Tôn trọng quyền riêng tư tuyệt đối, hoạt động offline mượt mà và mang đậm nét đẹp văn hóa Việt.",
    heroCtaPrimary: "Khám Phá 8 Ứng Dụng",
    heroCtaSecondary: "Đọc Triết Lý Sản Phẩm",
    statItem1: "8 Ứng Dụng Độc Lập",
    statItem2: "Không Quảng Cáo Rác",
    statItem3: "100% Local-First",
    statItem4: "Apple Native Swift",
    bentoHeaderTitle: "Bento Showcase",
    bentoHeaderSub: "Mỗi ứng dụng giải quyết trọn vẹn một nhu cầu trong đời sống.",
    filterAll: "Tất cả (8)",
    filterCulture: "Văn hóa & Tâm hồn",
    filterProductivity: "Năng suất & Tiện ích",
    filterLife: "Đời sống & Thực tế",
    cardLearnMore: "Khám phá chi tiết",
    cardGetAppStore: "Tải trên App Store",
    copiedToast: "Đã sao chép vào bộ nhớ tạm!",
    modalTabOverview: "Tổng Quan & Ý Niệm",
    modalTabFeatures: "Tính Năng Cốt Lõi",
    modalTabSpecs: "Thông Số & Bảo Mật",
    modalClose: "Đóng",
    valuesTitle: "Triết Lý Khác Biệt (Tâm · Mộc · Kỹ)",
    valuesSub: "Tại sao chúng tôi kiên định xây dựng phần mềm local-first?",
    val1Title: "TÂM: Quyền Riêng Tư Là Tối Thượng",
    val1Desc: "Dữ liệu của bạn thuộc về bạn. Chúng tôi không bao giờ thu thập thông tin cá nhân, không bắt buộc tạo tài khoản rườm rà và không bán quảng cáo theo dõi.",
    val2Title: "MỘC: Đậm Đà Hồn Cốt Đời Sống Việt",
    val2Desc: "Từ tách trà Shan tuyết, câu ca dao cha ông, tiếng chuông xe buýt đến sổ sách của cô chú nông dân — mỗi ứng dụng đều giải quyết bài toán thật của đời sống.",
    val3Title: "KỸ: Trải Nghiệm Apple Native Chuẩn Mực",
    val3Desc: "Viết thuần Swift và SwiftUI, khai thác tối đa Widget, Live Activity, WatchKit, Canvas và Dynamic Island để mang lại cảm giác mượt mà trong từng cú chạm.",
    creatorTitle: "Về Tác Giả & TMK Studio",
    creatorRole: "iOS & Apple Platforms Developer",
    creatorBio: "Xin chào! Tôi là Trần Cường. Với tình yêu sâu sắc dành cho thiết kế tối giản và hệ sinh thái Apple, tôi sáng lập TMK Studio để xây dựng những sản phẩm độc lập, mộc mạc và bền bỉ theo thời gian.",
    creatorEmailBtn: "Liên Hệ Trực Tiếp",
    footerText: "© 2026 TMK Studio. Thiết kế và phát triển bởi Trần Cường."
  },
  en: {
    brandName: "TMK Studio",
    byCreator: "Crafted by Tran Cuong",
    navWork: "Ecosystem",
    navValues: "Philosophy",
    navCreator: "Creator",
    navContact: "Contact",
    heroPill: "Apple Native · 100% Local-First · Mindfully Crafted",
    heroTitle: "Thoughtful Apps Crafted for Everyday Life",
    heroLead: "A suite of 8 independent apps meticulously crafted for Apple platforms. Strict local privacy, offline reliability, and cultural warmth.",
    heroCtaPrimary: "Explore 8 Apps",
    heroCtaSecondary: "Our Philosophy",
    statItem1: "8 Independent Apps",
    statItem2: "Zero Annoying Ads",
    statItem3: "100% Local-First",
    statItem4: "Apple Native Swift",
    bentoHeaderTitle: "Bento Showcase",
    bentoHeaderSub: "Every app solves a genuine need with craftsmanship and care.",
    filterAll: "All Apps (8)",
    filterCulture: "Culture & Soul",
    filterProductivity: "Productivity & Tools",
    filterLife: "Daily Life & Transit",
    cardLearnMore: "Explore Details",
    cardGetAppStore: "Get on App Store",
    copiedToast: "Copied to clipboard!",
    modalTabOverview: "Overview & Story",
    modalTabFeatures: "Key Features",
    modalTabSpecs: "Specs & Privacy",
    modalClose: "Close",
    valuesTitle: "Our Design Philosophy (Heart · Simplicity · Precision)",
    valuesSub: "Why we relentlessly build local-first software",
    val1Title: "HEART: Privacy Is Sacred",
    val1Desc: "Your data belongs solely to you. We collect zero personal logs, require no tedious logins, and display zero tracking advertisements.",
    val2Title: "SIMPLICITY: Rooted in Everyday Life",
    val2Desc: "From Shan snow tea and ancient folk poetry to daily bus commutes and rural farm notebooks — each app solves genuine everyday needs.",
    val3Title: "PRECISION: Apple Native Craftsmanship",
    val3Desc: "Crafted exclusively in Swift and SwiftUI, fully harnessing Widgets, Live Activities, WatchKit, and Dynamic Island for fluid responsiveness.",
    creatorTitle: "About the Creator & TMK Studio",
    creatorRole: "iOS & Apple Platforms Developer",
    creatorBio: "Hello! I am Tran Cuong. Driven by minimalism and craftsmanship in Apple software, I founded TMK Studio to build apps that are serene, purposeful, and built to last.",
    creatorEmailBtn: "Get in Touch",
    footerText: "© 2026 TMK Studio. Designed and built by Tran Cuong."
  }
};

// Application State
let currentLang = localStorage.getItem("preferred-lang") || "vi";
let currentCategory = "all";
let currentSayingIndex = 0;
let currentPaletteIndex = 0;

// Initialize System
document.addEventListener("DOMContentLoaded", () => {
  setupLanguage();
  setupTheme();
  setupCategoryFilter();
  setupInteractiveDemos();
  setupModalDismiss();
  updateTimeOfDay();
});

// Setup Language
function setupLanguage() {
  updatePageText();
  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "vi" ? "en" : "vi";
      localStorage.setItem("preferred-lang", currentLang);
      updatePageText();
      refreshInteractiveDemos();
    });
  }
}

// Update all text nodes marked with data-i18n
function updatePageText() {
  const dict = I18N[currentLang];
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn) {
    langBtn.innerHTML = currentLang === "vi" 
      ? `<span class="text-xs font-semibold tracking-wider"><span class="sm:hidden">🇻🇳 VI</span><span class="hidden sm:inline">🇻🇳 VIỆT NAM</span></span>` 
      : `<span class="text-xs font-semibold tracking-wider"><span class="sm:hidden">🇬🇧 EN</span><span class="hidden sm:inline">🇬🇧 ENGLISH</span></span>`;
  }

  updateCardsLanguage();
}

function updateCardsLanguage() {
  const cards = document.querySelectorAll("[data-app-id]");
  cards.forEach((card) => {
    const appId = card.getAttribute("data-app-id");
    const app = APPS_DATA.find((a) => a.id === appId);
    if (!app) return;

    // Quote — prefer explicit data-field, fallback to legacy blockquote
    const quoteEl = card.querySelector('[data-app-field="tagline"]') || card.querySelector("blockquote");
    if (quoteEl) quoteEl.textContent = `“${app.tagline[currentLang]}”`;

    // Short description — prefer explicit data-field, fallback to legacy sibling
    const descEl = card.querySelector('[data-app-field="shortDesc"]') || card.querySelector("blockquote + p");
    if (descEl) descEl.textContent = app.shortDesc[currentLang];

    // Callout boxes — prefer explicit data-fields, fallback to legacy grid order
    const f1Title = card.querySelector('[data-app-field="feature-0-title"]');
    const f1Desc = card.querySelector('[data-app-field="feature-0-desc"]');
    const f2Title = card.querySelector('[data-app-field="feature-1-title"]');
    const f2Desc = card.querySelector('[data-app-field="feature-1-desc"]');
    if (f1Title && f1Desc && f2Title && f2Desc && app.features.length >= 2) {
      f1Title.textContent = currentLang === "vi" ? app.features[0].title : app.features[0].titleEn;
      f1Desc.textContent = currentLang === "vi" ? app.features[0].desc : app.features[0].descEn;
      f2Title.textContent = currentLang === "vi" ? app.features[1].title : app.features[1].titleEn;
      f2Desc.textContent = currentLang === "vi" ? app.features[1].desc : app.features[1].descEn;
      return;
    }

    const callouts = card.querySelector("div.grid");
    const boxes = callouts ? callouts.querySelectorAll(":scope > div") : card.querySelectorAll(".grid > div");
    if (boxes.length >= 2 && app.features.length >= 2) {
      const b1Title = boxes[0].querySelector("span");
      const b1Desc = boxes[0].querySelector("p");
      if (b1Title) b1Title.textContent = currentLang === "vi" ? app.features[0].title : app.features[0].titleEn;
      if (b1Desc) b1Desc.textContent = currentLang === "vi" ? app.features[0].desc : app.features[0].descEn;

      const b2Title = boxes[1].querySelector("span");
      const b2Desc = boxes[1].querySelector("p");
      if (b2Title) b2Title.textContent = currentLang === "vi" ? app.features[1].title : app.features[1].titleEn;
      if (b2Desc) b2Desc.textContent = currentLang === "vi" ? app.features[1].desc : app.features[1].descEn;
    }
  });
}

// Setup Theme Toggle according to modern-web-guidance
function setupTheme() {
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
  const themeBtn = document.getElementById("theme-toggle-btn");

  const syncThemeUI = () => {
    const isDark = document.documentElement.classList.contains("dark") || 
      (!localStorage.getItem("color-scheme") && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
      localStorage.getItem("color-scheme") === "dark";

    if (isDark) {
      document.documentElement.classList.add("dark");
      if (themeBtn) {
        themeBtn.innerHTML = `
          <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        `;
      }
    } else {
      document.documentElement.classList.remove("dark");
      if (themeBtn) {
        themeBtn.innerHTML = `
          <svg class="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        `;
      }
    }
  };

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isCurrentlyDark = document.documentElement.classList.contains("dark");
      const nextTheme = isCurrentlyDark ? "light" : "dark";

      if (metaColorScheme) {
        metaColorScheme.content = nextTheme;
      }
      localStorage.setItem("color-scheme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      syncThemeUI();
    });
  }

  syncThemeUI();
}

// Category Filter Controller
function setupCategoryFilter() {
  const filterBtns = document.querySelectorAll("[data-bento-filter]");
  const cards = document.querySelectorAll("[data-app-category]");

  filterBtns.forEach((btn) => {
    if (!btn.hasAttribute("aria-pressed")) {
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
    }
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active", "bg-zinc-900", "text-white", "dark:bg-white", "dark:text-zinc-900", "shadow-sm");
        b.classList.add("text-zinc-500", "hover:text-zinc-900", "dark:text-zinc-400", "dark:hover:text-white");
        b.setAttribute("aria-pressed", "false");
      });

      btn.classList.add("active", "bg-zinc-900", "text-white", "dark:bg-white", "dark:text-zinc-900", "shadow-sm");
      btn.classList.remove("text-zinc-500", "hover:text-zinc-900", "dark:text-zinc-400", "dark:hover:text-white");
      btn.setAttribute("aria-pressed", "true");

      const targetCategory = btn.getAttribute("data-bento-filter");
      currentCategory = targetCategory;

      cards.forEach((card) => {
        const cat = card.getAttribute("data-app-category");
        if (targetCategory === "all" || cat === targetCategory) {
          card.style.display = "";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });
}

// Real-time time of day for Trạm Thiền Trà
function updateTimeOfDay() {
  const hour = new Date().getHours();
  let phase = "Bình Minh";
  let phaseEn = "Dawn";
  let color = "from-amber-600/30 via-orange-500/20 to-transparent";

  if (hour >= 6 && hour < 11) {
    phase = "Sớm Mai";
    phaseEn = "Morning";
    color = "from-emerald-600/30 via-teal-500/20 to-transparent";
  } else if (hour >= 11 && hour < 14) {
    phase = "Ban Trưa";
    phaseEn = "Noon";
    color = "from-amber-500/30 via-yellow-500/20 to-transparent";
  } else if (hour >= 14 && hour < 17) {
    phase = "Xế Chiều";
    phaseEn = "Afternoon";
    color = "from-orange-600/30 via-amber-600/20 to-transparent";
  } else if (hour >= 17 && hour < 20) {
    phase = "Hoàng Hôn";
    phaseEn = "Dusk";
    color = "from-purple-600/30 via-rose-500/20 to-transparent";
  } else {
    phase = "Đêm Muộn";
    phaseEn = "Midnight";
    color = "from-indigo-900/40 via-blue-900/20 to-transparent";
  }

  const el = document.getElementById("tea-time-phase");
  if (el) {
    el.textContent = currentLang === "vi" ? `Trà Thất · ${phase}` : `Tea Chamber · ${phaseEn}`;
  }
}

// Setup Interactive Micro-Demos
function setupInteractiveDemos() {
  // 1. Ca Dao Oracle Flip (Lời Xưa)
  const drawOracleBtn = document.getElementById("oracle-draw-btn");
  if (drawOracleBtn) {
    drawOracleBtn.addEventListener("click", () => {
      currentSayingIndex = (currentSayingIndex + 1) % CA_DAO_SAYINGS.length;
      renderCurrentSaying();
      showToast(currentLang === "vi" ? "Đã gieo một câu ca dao mới!" : "Cast a new folk verse!");
    });
  }
  renderCurrentSaying();

  // 2. Paletto Palette Swatch Swapper
  const nextPaletteBtn = document.getElementById("palette-next-btn");
  if (nextPaletteBtn) {
    nextPaletteBtn.addEventListener("click", () => {
      currentPaletteIndex = (currentPaletteIndex + 1) % PALETTO_PALETTES.length;
      renderCurrentPalette();
    });
  }
  renderCurrentPalette();

  // 3. TypeMate Quick Expansion Simulator
  const snippetBtns = document.querySelectorAll("[data-snippet-trigger]");
  const snippetOutput = document.getElementById("typemate-demo-output");
  const snippetTriggerBadge = document.getElementById("typemate-active-trigger");

  snippetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const trigger = btn.getAttribute("data-snippet-trigger");
      const expandText = btn.getAttribute("data-snippet-expansion");
      
      snippetBtns.forEach((b) => b.classList.remove("border-blue-500", "bg-blue-50/50", "dark:bg-blue-950/40"));
      btn.classList.add("border-blue-500", "bg-blue-50/50", "dark:bg-blue-950/40");

      if (snippetTriggerBadge) snippetTriggerBadge.textContent = trigger;
      if (snippetOutput) {
        snippetOutput.style.opacity = "0";
        setTimeout(() => {
          snippetOutput.textContent = expandText;
          snippetOutput.style.opacity = "1";
        }, 150);
      }
      showToast(`${currentLang === 'vi' ? 'Bung mẫu câu cho' : 'Expanded snippet for'} ${trigger}`);
    });
  });

  // 4. Trang Trại Livestock Species Switcher
  const farmSpeciesBtns = document.querySelectorAll("[data-farm-species]");
  farmSpeciesBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      farmSpeciesBtns.forEach((b) => b.classList.remove("bg-emerald-600", "text-white", "border-emerald-600"));
      farmSpeciesBtns.forEach((b) => b.classList.add("bg-zinc-100", "dark:bg-zinc-800", "text-zinc-600", "dark:text-zinc-300"));

      btn.classList.add("bg-emerald-600", "text-white", "border-emerald-600");
      btn.classList.remove("bg-zinc-100", "dark:bg-zinc-800", "text-zinc-600", "dark:text-zinc-300");

      const species = btn.getAttribute("data-farm-species");
      updateFarmSpeciesPreview(species);
    });
  });
}

function refreshInteractiveDemos() {
  renderCurrentSaying();
  renderCurrentPalette();
  updateTimeOfDay();
}

// Render Ca Dao Saying Card
function renderCurrentSaying() {
  const item = CA_DAO_SAYINGS[currentSayingIndex];
  const textEl = document.getElementById("oracle-poem-text");
  const meaningEl = document.getElementById("oracle-poem-meaning");
  const categoryEl = document.getElementById("oracle-poem-category");

  if (textEl) {
    textEl.style.opacity = "0";
    setTimeout(() => {
      textEl.innerHTML = item.text.replace(/\n/g, "<br/>");
      textEl.style.opacity = "1";
    }, 120);
  }

  if (meaningEl) {
    meaningEl.textContent = currentLang === "vi" ? item.meaning : item.meaningEn;
  }

  if (categoryEl) {
    categoryEl.textContent = currentLang === "vi" ? item.category : item.categoryEn;
  }
}

// Clipboard helper with fallback for file:// and non-HTTPS contexts
async function copyTextWithFallback(text) {
  try {
    if (navigator.clipboard && window.isSecureContext !== false) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw new Error("clipboard-api-unavailable");
  } catch (e) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e2) {
      return false;
    }
  }
}

// Copy Ca Dao text to clipboard
window.copyCurrentSaying = function() {
  const item = CA_DAO_SAYINGS[currentSayingIndex];
  const shareText = `"${item.text}"\n\n— Lời Xưa (${currentLang === 'vi' ? item.meaning : item.meaningEn}) ${item.tag}`;
  copyTextWithFallback(shareText).then((ok) => {
    showToast(ok
      ? (currentLang === "vi" ? "Đã sao chép ca dao kèm hashtag!" : "Copied verse with hashtags!")
      : (currentLang === "vi" ? "Không sao chép được, hãy copy thủ công." : "Copy failed, please copy manually."));
  });
};

// Render Paletto Palette
function renderCurrentPalette() {
  const p = PALETTO_PALETTES[currentPaletteIndex];
  const nameEl = document.getElementById("paletto-name");
  const swatchesEl = document.getElementById("paletto-swatches-container");
  const wcagEl = document.getElementById("paletto-wcag-badge");

  if (nameEl) nameEl.textContent = p.name;
  if (wcagEl) {
    wcagEl.textContent = `WCAG ${p.wcag.ratio} (${p.wcag.level})`;
  }

  if (swatchesEl) {
    swatchesEl.innerHTML = "";
    p.colors.forEach((hex) => {
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "flex-1 h-14 rounded-xl transition-transform hover:scale-110 active:scale-95 shadow-sm relative group";
      swatch.style.backgroundColor = hex;
      swatch.title = `Copy ${hex}`;
      swatch.innerHTML = `
        <span class="absolute inset-x-0 -bottom-6 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity text-center text-zinc-500 font-bold">
          ${hex}
        </span>
      `;
      swatch.addEventListener("click", () => {
        copyTextWithFallback(hex).then((ok) => {
          showToast(ok
            ? `${currentLang === 'vi' ? 'Đã sao chép' : 'Copied'} ${hex}`
            : (currentLang === 'vi' ? 'Không sao chép được, hãy copy thủ công.' : 'Copy failed, please copy manually.'));
        });
      });
      swatchesEl.appendChild(swatch);
    });
  }
}

// Update Farm Species Preview
function updateFarmSpeciesPreview(species) {
  const infoEl = document.getElementById("farm-batch-info");
  const voiceEl = document.getElementById("farm-voice-text");
  if (!infoEl || !voiceEl) return;

  if (species === "duck") {
    infoEl.innerHTML = `
      <span class="font-bold text-zinc-900 dark:text-white">Trại Vịt #02 · Lứa 4</span>
      <span class="text-xs text-zinc-500">3,200 con · 38 ngày tuổi · Chuẩn bị xuất bán</span>
    `;
    voiceEl.textContent = currentLang === "vi" ? "“Vừa mua 25 bao cám đậm đặc giai đoạn 2”" : "“Recorded 25 bags of stage-2 duck feed”";
  } else if (species === "chicken") {
    infoEl.innerHTML = `
      <span class="font-bold text-zinc-900 dark:text-white">Trại Gà Ri · Lứa 01</span>
      <span class="text-xs text-zinc-500">5,000 con · 65 ngày tuổi · Lịch tiêm Gumboro</span>
    `;
    voiceEl.textContent = currentLang === "vi" ? "“Đã tiêm phòng vắc-xin Gumboro đợt 2 sáng nay”" : "“Completed 2nd Gumboro vaccine round this morning”";
  } else if (species === "pig") {
    infoEl.innerHTML = `
      <span class="font-bold text-zinc-900 dark:text-white">Chuồng Heo Thịt · Lứa 03</span>
      <span class="text-xs text-zinc-500">250 con · Trọng lượng TB 82kg · FCR đạt 2.4</span>
    `;
    voiceEl.textContent = currentLang === "vi" ? "“Cân thử 10 con đạt trung bình 82kg”" : "“Sampled 10 pigs averaging 82kg”";
  }
}

// Universal Floating Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove("translate-y-24", "opacity-0", "pointer-events-none");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.add("translate-y-24", "opacity-0", "pointer-events-none");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 2400);
}

// Modal Light Dismiss Fallback for Safari & ESC key listener (modern-web-guidance)
function setupModalDismiss() {
  const modal = document.getElementById("app-detail-modal");
  if (!modal) return;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeAppDetail();
    }
  });

  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeAppDetail();
  });
}

// Open App Detail Modal with Full Content (Zero viewport jumping)
window.openAppDetail = function(appId, event) {
  if (event) {
    if (typeof event.preventDefault === "function") event.preventDefault();
    if (typeof event.stopPropagation === "function") event.stopPropagation();
  }

  const app = APPS_DATA.find((a) => a.id === appId);
  const modal = document.getElementById("app-detail-modal");
  const container = document.getElementById("modal-content-container");
  if (!app || !modal || !container) return;

  // Capture exact scroll position BEFORE anything else
  const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  document.body.dataset.modalScrollY = String(currentScrollY);

  // Disable smooth scroll completely while modal opens/stays open
  document.documentElement.classList.remove("scroll-smooth");
  document.documentElement.style.scrollBehavior = "auto";

  const dict = I18N[currentLang];

  container.innerHTML = `
    <!-- Modal Header -->
    <div class="relative p-5 sm:p-8 border-b border-zinc-200 dark:border-zinc-800">
      <div class="flex items-start justify-between gap-3 sm:gap-4">
        <div class="flex items-center gap-3.5 sm:gap-5">
          <img 
            src="${app.icon}" 
            alt="${app.name}" 
            class="w-14 h-14 sm:w-20 sm:h-20 app-squircle object-cover flex-shrink-0 shadow-lg"
          />
          <div>
            <div class="flex items-center gap-2 flex-wrap mb-1 sm:mb-1.5">
              ${app.platforms.map(p => `
                <span class="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  ${p}
                </span>
              `).join('')}
              <span class="text-xs font-mono text-zinc-400">
                ${app.version}
              </span>
            </div>
            <h2 id="modal-app-title" class="text-xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
              ${app.name}
            </h2>
            <p class="text-[11px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5 sm:mt-1 truncate max-w-[220px] sm:max-w-none">
              ${app.bundleId}
            </p>
          </div>
        </div>

        <button 
          type="button" 
          onclick="closeAppDetail()" 
          class="p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0"
          aria-label="${dict.modalClose}"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Banner if available -->
      ${app.banner ? `
        <div class="mt-4 sm:mt-6 rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60 shadow-inner">
          <img src="${app.banner}" alt="${app.name} banner" class="w-full h-36 sm:h-56 object-cover" loading="lazy" />
        </div>
      ` : ''}
    </div>

    <!-- Modal Body -->
    <div class="p-5 sm:p-8 space-y-6 sm:space-y-8 max-h-[65vh] sm:max-h-[60vh] overflow-y-auto">
      <!-- Tagline Callout -->
      <blockquote class="p-4 sm:p-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/60 border-l-4 border-blue-500">
        <p class="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 italic">
          "${app.tagline[currentLang]}"
        </p>
      </blockquote>

      <!-- Story -->
      <div>
        <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 sm:mb-3">
          ${dict.modalTabOverview}
        </h3>
        <p class="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          ${app.story[currentLang]}
        </p>
      </div>

      <!-- Key Features Grid -->
      <div>
        <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 sm:mb-4">
          ${dict.modalTabFeatures}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          ${app.features.map(f => `
            <div class="p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60">
              <h4 class="text-xs font-bold text-zinc-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>${currentLang === 'vi' ? f.title : f.titleEn}</span>
              </h4>
              <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                ${currentLang === 'vi' ? f.desc : f.descEn}
              </p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Screenshot if available -->
      ${app.screenshot ? `
        <div>
          <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 sm:mb-4">
            ${currentLang === 'vi' ? 'Giao Diện Thực Tế' : 'In-App Preview'}
          </h3>
          <div class="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md">
            <img src="${app.screenshot}" alt="${app.name} preview" class="w-full max-h-72 sm:max-h-96 object-cover object-top" loading="lazy" />
          </div>
        </div>
      ` : ''}

      <!-- Tech Specs & Privacy Statement -->
      <div>
        <h3 class="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 sm:mb-3">
          ${dict.modalTabSpecs}
        </h3>
        <div class="p-3.5 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 space-y-2.5 text-xs">
          <div class="flex items-start justify-between gap-3">
            <span class="font-medium text-zinc-500 dark:text-zinc-400 flex-shrink-0">${currentLang === 'vi' ? 'Công nghệ:' : 'Architecture:'}</span>
            <span class="font-semibold text-zinc-800 dark:text-zinc-200 text-right">${app.tech.stack}</span>
          </div>
          <div class="flex items-start justify-between gap-3 border-t border-zinc-200/40 dark:border-zinc-800/40 pt-2.5">
            <span class="font-medium text-zinc-500 dark:text-zinc-400 flex-shrink-0">${currentLang === 'vi' ? 'Riêng tư:' : 'Privacy:'}</span>
            <span class="font-semibold text-emerald-600 dark:text-emerald-400 text-right">${app.tech.privacy}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="p-4 sm:p-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
      <button 
        type="button" 
        onclick="closeAppDetail()" 
        class="py-2.5 px-4 sm:px-5 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        ${dict.modalClose}
      </button>

      <div class="flex items-center gap-2.5 flex-wrap">
        ${app.downloadUrl ? `
          <a 
            href="${app.downloadUrl}" 
            download="TypeMate.dmg"
            class="py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
            title="Tải bản cài đặt DMG trực tiếp (Universal cho cả chip M và Intel)"
          >
            <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2.2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>${currentLang === 'vi' ? 'Tải bản DMG (Universal: Chip M & Intel)' : 'Download DMG (Apple Silicon & Intel)'}</span>
          </a>
        ` : ''}

        <a 
          href="${app.appStoreUrl !== '#' ? app.appStoreUrl : 'https://tmkstudio.io.vn/apps'}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl text-xs font-bold ${app.downloadUrl ? 'bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10' : 'bg-white text-zinc-950 hover:bg-zinc-200'} transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96 1-3.1-.98.04-2.16.66-2.86 1.48-.61.71-1.15 1.87-.99 2.98 1.1.08 2.21-.57 2.85-1.36z"/>
          </svg>
          <span>${app.downloadUrl ? (currentLang === 'vi' ? 'Xem trên App Store' : 'View on App Store') : dict.cardGetAppStore}</span>
        </a>
      </div>
    </div>
  `;

  modal.showModal();

  // Instantly maintain exact scroll position without any movement
  window.scrollTo(0, currentScrollY);

  // Lock body scroll to prevent background jump/bounce
  document.body.style.overflow = "hidden";
};

window.closeAppDetail = function() {
  const modal = document.getElementById("app-detail-modal");
  if (!modal) return;

  const targetY = parseInt(document.body.dataset.modalScrollY || "0", 10);

  modal.close();
  document.body.style.overflow = "";

  // Restore scroll position
  window.scrollTo(0, targetY);

  // Re-enable smooth scrolling after modal transition
  setTimeout(() => {
    document.documentElement.classList.add("scroll-smooth");
    document.documentElement.style.scrollBehavior = "";
  }, 120);
};

