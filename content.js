/*
  ЕДИНЫЙ ФАЙЛ КОНТЕНТА САЙТА
  Здесь можно менять основные надписи, направления, навыки, приборы,
  контакты и карточки работ. После изменения сохраните файл и обновите сайт.

  Фотографии работ:
  - одна: images: ["assets/photo.jpg"]
  - несколько в одной карточке: images: ["assets/1.jpg", "assets/2.png", "assets/3.webp"]
  - photoLayout: "auto" | "split" | "hero-left" | "grid"

  Поддерживаются все форматы, которые умеет показывать браузер:
  JPG/JPEG, PNG, WEBP, GIF, AVIF, SVG, BMP и другие браузерные форматы.
*/
window.GEO_CONTENT = {
  meta: {
    title: "Строй Сергей",
    description: "Личный архив и портфолио геодезиста: строительство, топография, исполнительная съёмка и контроль строительно монтаных работ."
  },

  photoViewer: {
    dialogLabel: "Просмотр фотографии",
    open: "Открыть фото",
    close: "Закрыть фотографию",
    previous: "Предыдущее фото",
    next: "Следующее фото",
    photo: "Фото"
  },

  topbar: {
    brand: "GEO / PERSONAL ARCHIVE",
    coordinates: "57°13′52.4815″ N / 37°52′46.0057″ E"
  },

  hero: {
    eyebrowLeft: "FIELD / OFFICE",
    eyebrowRight: "REV. 08",
    titleHtml: "ГЕО<span>ДЕЗИЯ</span><br>КАК ОНО</span><br>ЕСТЬ.",
    description: "Личный рабочий архив геодезиста. Площадки, измерения, чертежи и то, как выглядит профессия без рекламного шума.",
    aboutLabel: "О СЕБЕ / 00",
    aboutText: "Я геодезист. Работаю в поле и с камеральной частью: выполняю разбивку, топографическую и исполнительную съёмку, контролирую геометрию конструкций и оформляю результат. Этот сайт — мой рабочий архив и подборка реальных задач. Можно, конечно, всё это придумать, нагенерировать, сфоткаться с чем-то, что не было мною построено, но это неинтересно)))",
    contactsLabel: "КОНТАКТЫ / DIRECT",
    levelLeft: "H = 216.500",
    levelRight: "Δ = +0.004"
  },

  directions: {
    title: "НАПРАВЛЕНИЯ",
    range: "auto",
    archiveLink: "Смотреть работы ↓",
    items: [
      { number: "01", title: "Строительство", details: "разбивка / оси / отметки", category: "construction" },
      { number: "02", title: "Топография", details: "рельеф / ситуация / сети", category: "topography" },
      { number: "03", title: "Контроль", details: "геометрия / отклонения", category: "control" },
      { number: "04", title: "Исполнительная", details: "факт / проект / схема", category: "asbuilt" },
      { number: "05", title: "Полезные приложения для AutoCAD/Civil 3D", details: "https://e.pcloud.link/publink/show?code=kZl5Ny7ZxjFGsGOLuTRyBJx55hvBJ4mRGit7"}
    ]
  },

  ticker: [
    "СТРОИТЕЛЬСТВО",
    "ТОПОГРАФИЯ",
    "КОНТРОЛЬ",
    "ИСПОЛНИТЕЛЬНАЯ",
    "GNSS / RTK",
    "ТАХЕОМЕТР",
    "НИВЕЛИР",
    "AUTOCAD",
    "CIVIL 3D",
    "Credo"
  ],

  expertise: {
    number: "01",
    kicker: "TOOLS / SKILLS",
    titleHtml: "НАВЫКИ<br>И ПРИБОРЫ",
    description: "Чем владею и что делаю на объекте.",
    skillsCode: "01A",
    skillsTitle: "НАВЫКИ",
    skills: [
      { number: "01", title: "Разбивочные работы", text: "Вынос осей, проектных точек и отметок, закрепление разбивочной основы." },
      { number: "02", title: "Топографическая съёмка", text: "Рельеф, ситуация, инженерные сети, подготовка данных для плана." },
      { number: "03", title: "Исполнительная съёмка", text: "Фиксация фактического положения конструкций и сопоставление с проектом." },
      { number: "04", title: "Геодезический контроль", text: "Проверка геометрии, высот, вертикальности и отклонений." },
      { number: "05", title: "GNSS / RTK", text: "Координатные измерения, вынос и съёмка в спутниковых сетях." },
      { number: "06", title: "Камеральная обработка", text: "AutoCAD / Civil 3D, Credo, схемы, ведомости и подготовка материалов." }
    ],
    instrumentsCode: "01B",
    instrumentsTitle: "РАБОТАЛ С ПРИБОРАМИ / СОФТОМ",
    instruments: [
      { number: "01", type: "GNSS / RTK", title: "GNSS-приёмник", text: "Модель прибора", accent: "PrinCe i80 Pro" },
      { number: "02", type: "TOTAL STATION", title: "Электронный тахеометр", text: "Модель прибора", accent: "Sokkia CX-105, Sokkia iM-102" },
      { number: "03", type: "LEVEL", title: "Нивелир", text: "Модель прибора", accent: "Любой оптический" },
      { number: "04", type: "SOFTWARE", title: "Рабочий софт", text: "AutoCAD / Civil 3D", accent: "Credo DAT, Credo Топоплан" }
    ]
  },

  archive: {
    number: "02",
    kicker: "WORK ARCHIVE",
    titleHtml: "ПРИМЕРЫ<br>РАБОТ",
    description: "Поток выполненных задач. От старых к новым. Сверху вниз.",
    allFilter: "Все"
  },

  contacts: [
    { key: "telegram", label: "TELEGRAM", value: "@it_is_my_page", href: "https://t.me/it_is_my_page", external: true },
    { key: "email", label: "E-MAIL", value: "xysbk@bk.ru", href: "mailto:xysbk@bk.ru" },
    { key: "phone", label: "PHONE", value: "+7 930 180-97-84", href: "tel:+79301809784" },
    { key: "youtube", label: "YOUTUBE", value: "Канал / объекты", href: "https://images.meme-arsenal.com/2201adfea91c99ff96b451d2550c043d.jpg", external: true },
    { key: "vk", label: "VK", value: "Фото / заметки", href: "https://images.meme-arsenal.com/580ef7b9cd76a0de3238401ab16c709d.jpg", external: true }
  ],

  projects: [
    {
      title: "Контроль вертикальности колонн",
      category: "control",
      location: "Складское помещение",
      task: "До 1 сантима (сантиметра) нормально",
      code: "REC / 001",
      images: ["assets/object-001.jpg","assets/object-002.jpg"],
      photoLayout: "auto"
    },
    {
      title: "Разбивка фундаментных плит",
      category: "construction",
      location: "Станция обезжелезивания",
      task: "Разбиваю до точности 3 мм",
      code: "REC / 002",
      images: ["assets/object-003.jpg"],
      photoLayout: "auto"
    },
    {
      title: "Уравнивание Геодезической разбивочной основы",
      category: "topography",
      location: "Столбы и козырек здания",
      task: "Клеим марки и смотрим невязки",
      code: "REC / 003",
      images: ["assets/object-004.jpg","assets/object-005.png"],
      photoLayout: "auto"
    },
    {
      title: "3D-модели, картограммы",
      category: "asbuilt",
      location: "Инженерные сети",
      task: "Построение 3D-модели линейного объекта и подсчет объемов земляных работ методом картограммы",
      code: "REC / 004",
      images: ["assets/object-008.jpg","assets/object-009.png"],
      photoLayout: "auto"
    },
    {
      title: "Установка фундаментных блоков И цокольных панелей",
      category: "construction",
      location: "КПП",
      task: "Квест пройден",
      code: "REC / 005",
      images: ["assets/object-006.jpg","assets/object-007.jpg"],
      photoLayout: "auto"
    },
    {
      title: "Разбивка и заливка монолитных плит",
      category: "construction",
      location: "Сооружения",
      task: "Ничего не просело",
      code: "REC / 006",
      images: ["assets/object-009.jpg","assets/object-010.jpg"],
      photoLayout: "auto"
    },
    {
      title: "Благоустройство",
      category: "construction",
      location: "По всей стройке",
      task: "Бордюры для заезда и зелёнка",
      code: "REC / 007",
      images: ["assets/object-015.jpg","assets/object-014.jpg","assets/object-012.jpg","assets/object-011.jpg"],
      photoLayout: "auto"
    },
    {
      title: "Прокладка Тахеометрического хода",
      category: "topography",
      location: "Для Общежития",
      task: "По бегали нормально",
      code: "REC / 008",
      images: ["assets/object-010.png","assets/object-011.png"],
      photoLayout: "auto"
    },
    {
      title: "Разбивка подбетонок и Осей на них",
      category: "construction",
      location: "Общежитие",
      task: "Работаем допоздна",
      code: "REC / 009",
      images: ["assets/object-016.jpg","assets/object-017.jpg"],
      photoLayout: "auto"
    },
    {
      title: "Разбивка Осей на стаканах для последующих съемок рулеткой",
      category: "control",
      location: "Общежитие",
      task: "Приятно смотреть как фундамент растёт вширь",
      code: "REC / 010",
      images: ["assets/object-019.jpg","assets/object-018.jpg"],
      photoLayout: "auto"
    },
    {
      title: "ещё проция Исполнительных съёмочек для выполнения",
      category: "asbuilt",
      location: "Всё везде",
      task: "Всего по чуть-чуть",
      code: "REC / 011",
      images: ["assets/object-020.jpg","assets/object-022.png","assets/object-023.png","assets/object-024.png"],
      photoLayout: "auto"
    },
    {
      title: "Отдельные! Съёмки для своих",
      category: "asbuilt",
      location: "Избирательно",
      task: "Показываем всё как есть:(",
      code: "REC / 012",
      images: ["assets/object-021.png"],
      photoLayout: "auto"
    }
  ],

  footer: {
    brand: "GEO / PERSONAL ARCHIVE - Сайт собственного производства)",
    telegram: "TG ↗",
    mail: "MAIL ↗",
    phone: "TEL ↗",
    top: "НАВЕРХ ↑"
  }
};
