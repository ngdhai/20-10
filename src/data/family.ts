// ============================================================
// Toàn bộ nội dung của website nằm ở file này.
// Muốn đổi tên, lời thư, caption, lời chúc hay ảnh: chỉ cần sửa ở đây.
// Ảnh đặt trong public/images/ (ghi đường dẫn KHÔNG có dấu / ở đầu).
// Thay ảnh: chép đè file cùng tên, hoặc đổi đường dẫn bên dưới.
//
// Mỗi người có link riêng: https://<domain>/<code>
// Trang gốc "/" không liệt kê ai, để không ai mở nhầm thư của người khác.
// ============================================================

/** wide: ảnh ngang trải hết chiều rộng trong hộp ký ức (ví dụ tranh nhiều khung) */
export type Memory = { src: string; caption: string; wide?: boolean }

export type Recipient = {
  id: string
  /** Mã trong đường link riêng: /<code>. Đổi thành chuỗi khó đoán bất kỳ. */
  code: string
  /** Mô tả hiện dưới link khi gửi qua Zalo/Facebook */
  preview: string
  /** Vai trong gia đình */
  role: string
  /** Tên riêng */
  name: string
  /** Câu ngắn dưới tên, trên tấm polaroid */
  tagline: string
  /** Màu nhấn riêng của người này (dùng cho tem, nút, hoa) */
  accent: string
  cover: string
  /** Ảnh kỷ niệm (ảnh dọc hay ngang đều được) */
  memories: Memory[]
  /** Tiêu đề phần thư, ví dụ “Điều con muốn nói” */
  letterTitle: string
  /** Dòng trên phong thư đóng */
  envelopeNote: string
  /** Lời thư — mỗi phần tử là một đoạn, xuống dòng bằng \n */
  letter: string[]
  /** Dòng ký tên cuối thư */
  signature: string
  /** Lời chúc riêng — hái hoa sẽ nhận ngẫu nhiên một câu */
  wishes: string[]
  /** Hộp ký ức riêng (tuỳ chọn). Thiếu mục nào thì dùng mục đó trong site.finale */
  box?: { collage?: Memory[]; heading?: string; text?: string[]; closing?: string }
}

export const site = {
  title: '20.10 — Gửi những người phụ nữ của gia đình',
  intro: {
    date: '20 · 10',
    line: 'Có một món quà nhỏ dành riêng cho',
    button: 'Mở món quà',
  },
  /** Trang gốc "/" và link sai mã */
  welcome: {
    line: 'Mỗi món quà có một đường link riêng.\nHãy mở bằng đường link đã được gửi cho mình nhé.',
    notFound: 'Không tìm thấy món quà này.\nKiểm tra lại đường link giúp mình nhé.',
  },
  home: {
    eyebrow: 'Món quà dành riêng cho',
    reopen: 'Chạm vào tấm ảnh để xem lại món quà.',
    doneStamp: 'Đã mở',
  },
  scene: {
    back: 'Quay lại',
    memoriesTitle: 'Kỷ niệm',
    swipeHint: 'Kéo ngang để xem thêm ảnh',
    openLetter: 'Mở thư',
    flowerTitle: 'Một bông hoa',
    flowerPrompt: 'Chọn một bông hoa dành cho hôm nay.',
    wishLabel: 'Lời chúc cho hôm nay',
    toFinale: 'Mở hộp ký ức',
  },
  finale: {
    title: 'Hộp ký ức gia đình',
    lockedHint: 'Chiếc hộp này sẽ mở sau khi bông hoa của hôm nay được hái.',
    openButton: 'Mở hộp ký ức',
    heading: 'Vì cuối cùng…',
    text: [
      'Điều đẹp nhất không phải là chúng ta có bao nhiêu ngày đặc biệt.',
      'Mà là trong rất nhiều ngày bình thường,\nchúng ta vẫn có nhau.',
    ],
    closing: 'Chúc mừng 20/10',
    collage: [
      { src: 'images/photo-family-1.jpg', caption: 'Cả nhà' },
      { src: 'images/photo-family-2.jpg', caption: 'Tết năm ấy' },
      { src: 'images/photo-family-3.jpg', caption: 'Bữa cơm Chủ nhật' },
      { src: 'images/photo-family-4.jpg', caption: 'Chuyến đi xa' },
    ] as Memory[],
  },
  music: 'music/music.mp3',
}

export const recipients: Recipient[] = [
  {
    id: 'grandma-paternal',
    code: 'bfz9p5',
    preview: 'Gửi bà nội, người hết lòng vì con cháu — từ bố mẹ Xoài và Xoài.',
    role: 'Bà nội',
    name: 'Lành',
    tagline: 'Người hết lòng vì con cháu.',
    accent: '#7f8a63',
    cover: 'images/ba-noi-5.jpg',
    memories: [
      { src: 'images/ba-noi-1.jpg', caption: 'Bà ru Xoài ngủ' },
      { src: 'images/ba-noi-2.jpg', caption: 'Hai bà cháu chơi đồ chơi' },
      { src: 'images/ba-noi-3.jpg', caption: 'Xoài trong vòng tay bà' },
      { src: 'images/ba-noi-4.jpg', caption: 'Sinh nhật bà' },
      { src: 'images/ba-noi-5.jpg', caption: 'Bà trong tà áo dài' },
    ],
    letterTitle: 'Lời cảm ơn',
    envelopeNote: 'Những việc bà làm mỗi ngày,\nchúng con đều thấy.',
    letter: [
      'Bà ơi,',
      'Làm đậu phải dậy từ sớm,\nvất vả là thế,\nvậy mà việc nhà bà vẫn lo chu đáo,\nlại còn chăm Xoài từng chút một.',
      'Hai vợ chồng con ra ở riêng rồi,\nnhưng vẫn được bà đỡ đần đủ đường,\ntừ chuyện tiếp tế lương thực\nđến từng việc nhỏ.',
      'Lúc Xoài ốm,\nbà ở bên chăm Xoài cùng chúng con.\nLúc mẹ Xoài ốm, bà lo cả hai mẹ con.',
      'Những lúc ốm đau hay gặp khó khăn,\nnhà ông bà nội vẫn luôn là nơi\nchúng con được trở về.',
      'Chúng con thương bà\nvà biết ơn bà nhiều lắm.',
      '20/10 này, chúc bà luôn trẻ, luôn vui,\nbớt vất vả\nvà có thêm thời gian cho chính mình.',
    ],
    signature: 'Bố mẹ Xoài và Xoài.',
    wishes: [
      'Luôn trẻ, luôn xinh.',
      'Bớt việc, thêm nhiều chuyến đi chơi.',
      'Mặc áo dài đẹp thật nhiều dịp.',
      'Được ngủ thêm một chút mỗi sáng.',
      'Xoài về chơi với bà thật nhiều.',
      'Luôn vui như hôm sinh nhật.',
    ],
    box: {
      collage: [
        { src: 'images/ba-noi-tranh.jpg', caption: 'Bà và Xoài, qua từng tháng', wide: true },
        { src: 'images/ba-noi-1.jpg', caption: 'Những ngày đầu' },
        { src: 'images/ba-noi-2.jpg', caption: 'Chơi cùng bà' },
        { src: 'images/ba-noi-3.jpg', caption: 'Bà bế' },
        { src: 'images/ba-noi-4.jpg', caption: 'Sinh nhật' },
      ],
      heading: 'Điều chúng con mong',
      text: [
        'Bà cứ trẻ, cứ xinh như bây giờ.',
        'Bớt lo cho bố mẹ Xoài một chút,\nđể dành thời gian đi chơi, làm đẹp,\nlàm những việc bà thích.',
        'Còn Xoài thì vẫn bám bà như thường nhé.',
      ],
      closing: 'Chúc mừng 20/10, bà nhé',
    },
  },
  {
    id: 'grandma-maternal',
    code: 'rcv7ya',
    preview: 'Gửi bà ngoại bận rộn nhất nhà — từ bố mẹ Xoài và Xoài.',
    role: 'Bà ngoại',
    name: 'Hường',
    tagline: 'Bà thương con cháu.',
    accent: '#b07a63',
    cover: 'images/ba-ngoai-2.jpg',
    memories: [
      { src: 'images/ba-ngoai-1.jpg', caption: 'Bà với Xoài ra biển' },
      { src: 'images/ba-ngoai-2.jpg', caption: 'Xoài được bà bế đi dạo' },
      { src: 'images/ba-ngoai-3.jpg', caption: 'Hai bà cháu đi tàu điện' },
      { src: 'images/ba-ngoai-4.jpg', caption: 'Chuyến tàu đầu tiên của Xoài' },
      { src: 'images/ba-ngoai-5.jpg', caption: 'Bữa trưa nhìn ra biển' },
      { src: 'images/ba-ngoai-6.jpg', caption: 'Bà đi biển' },
      { src: 'images/ba-ngoai-7.jpg', caption: 'Đường phi lao' },
      { src: 'images/ba-ngoai-8.jpg', caption: 'Bà chỉ cho cả nhà xem biển' },
    ],
    letterTitle: 'Lời cảm ơn',
    envelopeNote: 'Mấy dòng ngắn thôi,\nnhưng chúng con muốn nói từ lâu rồi.',
    letter: [
      'Bà ơi,',
      'Công việc ở xưởng bận là thế,\nvậy mà sáng sớm trước giờ đi làm,\nhay tối muộn mới về,\nbà vẫn tranh thủ ghé thăm Xoài.',
      'Dịp nào quan trọng của Xoài,\nbà cũng có mặt.\nMỗi lần Xoài ốm, bà xót lắm.',
      'Bà đi làm vất vả lo cho cả nhà,\nthỉnh thoảng còn lì xì cho Xoài\nmua đồ chơi, quần áo mới.',
      'Bà còn đưa Xoài đi khắp nơi:\nđi du lịch, đi chơi,\nrồi sang nhà hàng xóm\nbuôn dưa lê cùng bà nữa.',
      'Cảm ơn bà vì đã thương không chỉ Xoài,\nmà cả mẹ Xoài và bố Xoài nữa.',
      '20/10 này, chúc bà luôn trẻ,\ncông việc suôn sẻ,\nvà có thêm thật nhiều\nchuyến đi cùng Xoài.',
    ],
    signature: 'Bố mẹ Xoài và Xoài.',
    wishes: [
      'Luôn trẻ, luôn xinh.',
      'Công việc ở xưởng luôn suôn sẻ.',
      'Bớt vất vả, có thêm thời gian nghỉ.',
      'Thêm thật nhiều chuyến đi chơi cùng Xoài.',
      'Buôn dưa lê với hàng xóm thật vui.',
      'Xoài lớn nhanh để đi chơi cùng bà.',
    ],
    box: {
      collage: [
        { src: 'images/ba-ngoai-1.jpg', caption: 'Ra biển' },
        { src: 'images/ba-ngoai-3.jpg', caption: 'Đi tàu điện' },
        { src: 'images/ba-ngoai-5.jpg', caption: 'Ăn trưa' },
        { src: 'images/ba-ngoai-8.jpg', caption: 'Ngắm biển' },
      ],
      heading: 'Vì cuối cùng…',
      text: [
        'Xoài còn bé, chắc chưa nhớ được những chuyến đi này.',
        'Nhưng bố mẹ Xoài nhớ,\nvà sau này sẽ kể cho Xoài nghe\nvề người bà đã bế Xoài đi khắp nơi.',
      ],
      closing: 'Chúc bà 20/10 vui nhé',
    },
  },
  {
    id: 'wife',
    code: 'jyjmhr',
    preview: 'Một món quà nhỏ anh làm riêng cho em nhân ngày 20/10.',
    role: 'Vợ',
    name: 'Thu Hà',
    tagline: 'Người cùng anh tạo nên gia đình của riêng mình.',
    accent: '#b5707a',
    cover: 'images/photo-vo-cover.jpg',
    memories: [
      { src: 'images/photo-vo-1.jpg', caption: 'Lần đầu đi chơi xa' },
      { src: 'images/photo-vo-2.jpg', caption: 'Ngày cưới' },
      { src: 'images/photo-vo-3.jpg', caption: 'Căn nhà đầu tiên' },
      { src: 'images/photo-vo-4.jpg', caption: 'Một buổi sáng rất bình thường' },
      { src: 'images/photo-vo-5.jpg', caption: 'Em, lúc không để ý' },
    ],
    letterTitle: 'Điều anh muốn nói',
    envelopeNote: 'Có vài điều bình thường ngày nào cũng nghĩ,\nnhưng lại ít khi nói ra.',
    letter: [
      'Gửi Hà,',
      'Trước khi có gia đình này,\nanh từng nghĩ một mái nhà chỉ cần một nơi để trở về.',
      'Sau này anh mới hiểu,\nmột mái nhà thật sự được tạo nên bởi một người\nkhiến mình muốn trở về.',
      'Cảm ơn em vì đã cùng anh trải qua những ngày dễ dàng,\nnhững ngày mệt mỏi,\nvà cả những ngày rất bình thường.',
      '20/10 này,\nanh không chỉ muốn chúc em vui.',
      'Anh muốn cảm ơn em\nvì đã trở thành một phần rất quan trọng\ncủa cuộc đời anh.',
    ],
    signature: 'Anh.',
    wishes: [
      'Được yêu thương nhiều hơn — anh sẽ lo phần này.',
      'Có nhiều thời gian cho chính mình.',
      'Ít mệt hơn, ngủ ngon hơn.',
      'Có thật nhiều ngày vui.',
      'Luôn là chính em, theo cách em thích.',
      'Hôm nay không phải nấu cơm.',
    ],
  },
  {
    id: 'sister-in-law',
    code: 'zw5hmf',
    preview: 'Một món quà nhỏ anh rể gửi Linh nhân ngày 20/10.',
    role: 'Em vợ',
    name: 'Diệu Linh',
    tagline: 'Người làm cả nhà ồn ào hơn — theo nghĩa dễ thương.',
    accent: '#c29a5b',
    cover: 'images/photo-em-vo-cover.jpg',
    memories: [
      { src: 'images/photo-em-vo-1.jpg', caption: 'Linh và chị Hà' },
      { src: 'images/photo-em-vo-2.jpg', caption: 'Chuyến đi cả nhà' },
      { src: 'images/photo-em-vo-3.jpg', caption: 'Ảnh dìm đã được duyệt' },
      { src: 'images/photo-em-vo-4.jpg', caption: 'Ngày vui' },
    ],
    letterTitle: 'Điều anh muốn nói',
    envelopeNote: 'Thư này không có gì sến đâu.\nChỉ hơi hơi thôi.',
    letter: [
      'Linh này,',
      'Anh vào nhà mình sau,\nnhưng chưa bao giờ thấy mình là người ngoài —\nmột phần là nhờ em.',
      'Cảm ơn em vì luôn ở bên chị Hà,\nvì những lần “đứng về phe anh” hiếm hoi,\nvà vì làm cho mỗi lần cả nhà gặp nhau vui hơn hẳn.',
      '20/10 này, anh chúc em\nlàm việc gì cũng thuận,\nđi đâu cũng có người thương,\nvà luôn giữ được sự vô tư của mình.',
    ],
    signature: 'Anh rể (vẫn đang cố gắng ghi điểm).',
    wishes: [
      'Mọi việc đều suôn sẻ.',
      'Luôn rạng rỡ như bây giờ.',
      'Có thật nhiều chuyến đi vui.',
      'Gặp toàn người tử tế.',
      'Ít deadline, nhiều ngày nghỉ.',
      'Luôn có chị Hà và cả nhà ở bên.',
    ],
  },
]
