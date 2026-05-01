const data = window.DASHBOARD_DATA;
let focusIndex = 0;
let slidePos = 0;
let view = "brief";
let questionPos = 0;
let answerMode = false;
let viewerMode = null;
let briefPage = 0;
const BRIEF_PAGE_COUNT = 6;

const $ = (selector) => document.querySelector(selector);
const buttons = $("#focusButtons");
const teachingBriefs = {
  f1: {
    bigIdea: "傳統戲曲不是離學生很遠的古老表演，而是臺灣廟會、酬神、休閒與地方記憶交會出的劇場文化。",
    narrative: "先從學生可能見過的廟口戲、陣頭、節慶聲響進入，讓他們理解戲曲原本就和生活場景相連。再引導學生看到本課主軸：臺灣傳統戲曲在時代變遷中，一邊保存傳統，一邊吸收科技與現代表演元素。",
    keywords: ["廟口野臺戲", "酬神還願", "傳統戲曲", "客家戲", "歌仔戲", "新文化"],
    task: "請學生用一句話描述自己對傳統戲曲的第一印象，再把印象分類為聲音、服裝、故事、場域或信仰。",
    misconception: "學生容易把傳統戲曲視為過時娛樂；要提醒它同時是社群記憶、宗教活動、表演訓練與文化創新的載體。",
    questions: ["如果沒有手機與夜生活，早期臺灣人會去哪裡看表演？", "為什麼廟會常和戲曲演出連在一起？", "傳統戲曲吸收現代科技後，還算不算傳統？"]
  },
  f2: {
    bigIdea: "戲神與禁忌表面上是規矩，背後其實反映演員的風險管理、信仰安定與劇團共同生活秩序。",
    narrative: "教學時不要只要求學生背田都元帥、西秦王爺或禁食毛蟹，而是把禁忌當成文化線索：演出前祭拜祖師爺，是祈求平順，也是讓團隊進入專注狀態；不能說某些字、不能做某些事，則讓學生看到語言、信仰和表演心理的關聯。",
    keywords: ["田都元帥", "西秦王爺", "戲班", "祖師爺", "毛蟹禁忌", "生活密碼"],
    task: "小組抽一項戲曲禁忌，推測它可能解決了什麼問題：安全、心理、團隊秩序、語音諧音或信仰。",
    misconception: "學生可能把禁忌直接等同迷信；要引導他們先理解功能，再討論今日哪些禁忌被保留、調整或打破。",
    questions: ["為什麼演出前要祭拜戲神？", "禁忌如何幫助劇團維持秩序？", "現代劇場還需要保留傳統禁忌嗎？"]
  },
  f3: {
    bigIdea: "客家戲從山歌、採茶歌與三腳採茶戲發展而來，唱腔和語言本身就是族群生活經驗的舞臺化。",
    narrative: "這段適合用聲音教學。先讓學生知道客家人上山採茶、砍柴時用山歌抒情與傳意，再連到三腳採茶戲的一丑二旦與後來的客家改良戲。〈天公落水〉可作為聽覺入口，讓學生比較民間曲調和流行音樂改編的情緒差異。",
    keywords: ["山歌", "採茶歌", "三腳採茶戲", "一丑二旦", "收冬戲", "平安戲"],
    task: "聽或朗讀〈天公落水〉歌詞，圈出自然景物、人物互動與情感線索，再用現代語句改寫四句。",
    misconception: "學生可能只記得客家戲是地方劇種，卻忽略它和勞動、語言、節慶與族群認同之間的關係。",
    questions: ["為什麼山歌適合在採茶或砍柴時唱？", "三腳採茶戲為什麼能發展成大戲？", "收冬戲和平安戲反映了什麼生活願望？"]
  },
  f4: {
    bigIdea: "歌仔戲的百年變革，就是臺灣表演藝術如何跟著社會型態、媒介技術和觀眾習慣不斷轉身。",
    narrative: "把歌仔戲教成時間線最清楚：本地歌仔從落地掃開始，野臺歌仔戲連到廟會酬神，內臺歌仔戲進入售票劇場，胡撇仔戲反映日治時期壓力下的混合美學，廣播、電影、電視和現代劇場則呈現媒介轉換。",
    keywords: ["本地歌仔", "落地掃", "野臺", "內臺", "胡撇仔戲", "劇場歌仔戲"],
    task: "學生分組領取一個時期，做出三格小海報：演出地點、觀眾關係、舞臺技術。",
    misconception: "學生容易把不同時期當成互相取代；要提醒許多型態至今仍並存，只是服務不同場域與觀眾。",
    questions: ["從野臺到內臺，觀眾和演員的關係有什麼改變？", "胡撇仔戲為什麼會有中西混搭特色？", "電視與劇場讓歌仔戲失去了什麼，又增加了什麼？"]
  },
  f5: {
    bigIdea: "角色裝扮不是漂亮外觀而已，它是觀眾判讀人物身分、性格、情緒與舞臺功能的視覺語言。",
    narrative: "帶學生看劇照時，先從妝容、服裝、姿態、道具四個線索判讀角色。小生、小旦、三花、花面等角色類型，都透過臉部線條、服裝色彩與身段建立辨識度。這裡可連結學生熟悉的動漫角色設計，理解造型如何快速傳達個性。",
    keywords: ["生旦淨丑", "小生", "小旦", "三花", "花面", "彩妝"],
    task: "選一張劇照，學生用「我看到……所以我推測……」句型描述角色性格，避免只說好看或不好看。",
    misconception: "學生可能只把妝容當作裝飾；要把裝扮轉為表演符號，讓他們說出造型如何服務角色。",
    questions: ["觀眾為什麼能從妝容快速判斷角色？", "小生和小旦的身體線條可能有什麼不同？", "現代彩妝和傳統戲曲妝容各有什麼優勢？"]
  },
  f6: {
    bigIdea: "身段和水袖把日常動作提煉成舞臺語彙，學生要學的是手、眼、身、步如何共同說故事。",
    narrative: "這一焦點應從身體體驗收束全課。先示範手眼相隨、腰帶動身形、腳步定點，再讓學生以小生或小旦的情緒做短句呈現。四句聯可以作為口白節奏練習，讓聲音和身體同時進入戲曲表演。",
    keywords: ["身段", "水袖", "手眼身法步", "腳步手路", "四句聯", "同儕回饋"],
    task: "兩人一組設計 20 秒呈現：一句四句聯、一個定格姿勢、一段水袖或手勢，最後接受同儕回饋。",
    misconception: "學生可能只模仿動作外形；要提醒眼神方向、重心、節奏和情緒一致，才是身段的表演品質。",
    questions: ["為什麼眼神要跟著手勢走？", "水袖可以表達哪些情緒？", "同儕回饋時，應該看動作速度還是表演意圖？"]
  }
};

function slidePath(n) {
  return `./assets/slides/slide_${String(n).padStart(2, "0")}.jpg`;
}

function infoPath(name) {
  return `./assets/infographics/${name}`;
}

function current() {
  return data.focuses[focusIndex];
}

function init() {
  data.focuses.forEach((focus, index) => {
    const button = document.createElement("button");
    button.innerHTML = `<b>${index + 1}. ${focus.title}</b><span>${focus.tag}</span>`;
    button.onclick = () => {
      focusIndex = index;
      slidePos = 0;
      briefPage = 0;
      questionPos = 0;
      answerMode = false;
      render();
    };
    buttons.appendChild(button);
  });

  document.querySelectorAll(".view-tabs button").forEach((button) => {
    button.onclick = () => {
      view = button.dataset.view;
      render();
    };
  });

  $("#homeBrief").onclick = () => {
    briefPage = 0;
    renderBrief();
  };
  $("#prevBrief").onclick = () => changeBrief(-1);
  $("#nextBrief").onclick = () => changeBrief(1);
  $("#openBrief").onclick = () => openViewer("brief");
  $("#openInfo").onclick = () => openViewer("info");
  viewerInit();
  render();
}

function render() {
  const focus = current();
  [...buttons.children].forEach((button, index) => button.classList.toggle("active", index === focusIndex));
  $("#focusTag").textContent = focus.tag;
  $("#focusTitle").textContent = `${focusIndex + 1}. ${focus.title}`;
  $("#activityText").textContent = focus.activity;
  document.querySelectorAll(".view-tabs button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  document.querySelectorAll(".view").forEach((panel) => panel.classList.remove("active-view"));
  $(`#${view}View`).classList.add("active-view");
  renderBrief();
  renderInfo();
  renderQuiz();
}

function renderBrief() {
  const brief = teachingBriefs[current().id];
  $("#briefSlide").innerHTML = briefSlideHtml(brief, false);
  $("#briefCounter").textContent = `教學整理 ${briefPage + 1} / ${BRIEF_PAGE_COUNT}`;
}

function iconSvg(type) {
  const paths = {
    idea: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8.5 14.5c-1.7-1.2-2.5-2.8-2.5-4.7A6 6 0 0 1 18 9.8c0 1.9-.9 3.5-2.5 4.7-.8.6-1 1.2-1 2H9.5c0-.8-.2-1.4-1-2Z"/>',
    board: '<path d="M4 5h16v11H4z"/><path d="M8 20h8"/><path d="M12 16v4"/><path d="M7 9h5"/><path d="M7 12h9"/>',
    task: '<path d="M9 11l2 2 4-5"/><path d="M5 4h14v16H5z"/><path d="M8 17h8"/>',
    alert: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5"/><path d="M12 17h.01"/>',
    ask: '<path d="M12 18h.01"/><path d="M9.5 9a2.6 2.6 0 1 1 3.9 2.2c-.9.5-1.4 1.1-1.4 2.3"/><path d="M4 4h16v16H4z"/>'
  };
  return `<svg class="brief-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[type]}</svg>`;
}

function listHtml(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function briefSlideHtml(brief, enlarged) {
  const sizeClass = enlarged ? " enlarged" : "";
  if (briefPage === 0) {
    return `<article class="brief-ppt${sizeClass}">
      <div class="brief-heading">${iconSvg("idea")}<span>核心概念</span></div>
      <h3>${brief.bigIdea}</h3>
      <p>${brief.narrative}</p>
    </article>`;
  }
  if (briefPage === 1) {
    return `<article class="brief-ppt${sizeClass}">
      <div class="brief-heading">${iconSvg("board")}<span>教學脈絡</span></div>
      <h3>從生活經驗到表演概念</h3>
      <p>${brief.narrative}</p>
    </article>`;
  }
  if (briefPage === 2) {
    return `<article class="brief-ppt${sizeClass}">
      <div class="brief-heading">${iconSvg("board")}<span>板書關鍵字</span></div>
      <h3>本單元黑板重點</h3>
      <div class="keyword-cloud">${brief.keywords.map((keyword) => `<span>${keyword}</span>`).join("")}</div>
    </article>`;
  }
  if (briefPage === 3) {
    return `<article class="brief-ppt${sizeClass}">
      <div class="brief-heading">${iconSvg("task")}<span>學生任務</span></div>
      <h3>把概念轉成可操作任務</h3>
      <p>${brief.task}</p>
    </article>`;
  }
  if (briefPage === 4) {
    return `<article class="brief-ppt${sizeClass}">
      <div class="brief-heading">${iconSvg("alert")}<span>常見誤解</span></div>
      <h3>課堂中需要先拆解的想法</h3>
      <p>${brief.misconception}</p>
    </article>`;
  }
  return `<article class="brief-ppt${sizeClass}">
    <div class="brief-heading">${iconSvg("ask")}<span>教師提問路徑</span></div>
    <h3>由淺入深的討論順序</h3>
    <ol>${listHtml(brief.questions)}</ol>
  </article>`;
}

function changeBrief(delta) {
  briefPage = (briefPage + BRIEF_PAGE_COUNT + delta) % BRIEF_PAGE_COUNT;
  renderBrief();
  if (viewerMode === "brief" && $("#viewer").open) updateViewerImage();
}

function renderInfo() {
  $("#infoSlide").innerHTML = infoSlideHtml(false);
}

function renderQuiz() {
  const questions = data.questions[current().id];
  $("#quizCount").textContent = `${current().title}｜5 題作答 + 第 6 張答案卡`;
  const optionLetters = "ABCD";
  const questionCards = questions.map((question, qIndex) => `
    <section class="quiz-item question-card">
      <div class="quiz-face">
        <span class="quiz-card-index">${qIndex + 1} / 6</span>
        <h3>${qIndex + 1}. ${question[0]}</h3>
        <div class="choices">${question[1].map((choice, index) => `<div class="choice">${optionLetters[index]}. ${choice}</div>`).join("")}</div>
      </div>
    </section>
  `).join("");
  const answerRows = questions.map((question, index) => {
    const answerIndex = optionLetters.indexOf(question[2]);
    return `<li><b>${index + 1}. ${question[2]}</b><span>${question[1][answerIndex]}</span></li>`;
  }).join("");
  $("#quizSet").innerHTML = questionCards + `
    <section class="quiz-item flip-card answer-card">
      <div class="quiz-face quiz-front">
        <span class="quiz-card-index">6 / 6</span>
        <h3>答案卡</h3>
        <p>五題完成後再翻開，核對本單元形成性評量答案。</p>
        <button class="reveal-answer" type="button">翻牌看答案</button>
      </div>
      <div class="quiz-face quiz-back" aria-hidden="true">
        <span>本單元答案</span>
        <ol class="answer-list">${answerRows}</ol>
        <button class="reveal-answer" type="button">回到答案卡</button>
      </div>
    </section>`;
  document.querySelectorAll(".quiz-item .reveal-answer").forEach((button) => {
    button.onclick = () => button.closest(".quiz-item").classList.toggle("flipped");
  });
}

function infoSlideHtml(enlarged) {
  const brief = teachingBriefs[current().id];
  const sizeClass = enlarged ? " enlarged" : "";
  return `<article class="info-ppt info-radar${sizeClass}">
    <div class="brief-heading">${iconSvg("idea")}<span>單元資訊圖表</span></div>
    <div class="radar-wrap">
      <div class="radar-core"><small>${current().tag}</small><strong>${current().title}</strong></div>
      <div class="radar-keywords">${brief.keywords.map((keyword, index) => `<span style="--i:${index}">${keyword}</span>`).join("")}</div>
    </div>
    <p class="info-caption">${brief.bigIdea}</p>
  </article>`;
}

function openViewer(mode) {
  viewerMode = mode;
  $("#viewer").dataset.mode = mode;
  updateViewerImage();
  $("#viewer").showModal();
  resizeCanvas(true);
}

function updateViewerImage() {
  const focus = current();
  $("#viewerImage").hidden = viewerMode === "brief";
  $("#viewerBrief").hidden = viewerMode !== "brief" && viewerMode !== "info";
  $("#penToggle").hidden = true;
  $("#clearPen").hidden = true;
  $("#penCanvas").classList.add("hidden-canvas");
  $("#viewerPrev").hidden = viewerMode === "info";
  $("#viewerNext").hidden = viewerMode === "info";

  if (viewerMode === "brief") {
    $("#viewerTitle").textContent = `教學整理｜${focus.title}｜${briefPage + 1} / ${BRIEF_PAGE_COUNT}`;
    $("#viewerBrief").innerHTML = briefSlideHtml(teachingBriefs[focus.id], true);
    $("#viewerPrev").disabled = false;
    $("#viewerNext").disabled = false;
    return;
  }

  if (viewerMode === "info") {
    $("#viewerImage").hidden = true;
    $("#viewerTitle").textContent = `資訊圖表｜${focus.title}`;
    $("#viewerBrief").innerHTML = infoSlideHtml(true);
    $("#viewerPrev").disabled = true;
    $("#viewerNext").disabled = true;
    return;
  }

}

function viewerInit() {
  const dialog = $("#viewer");
  const canvas = $("#penCanvas");
  const ctx = canvas.getContext("2d");
  let drawing = false;

  $("#closeViewer").onclick = () => dialog.close();
  $("#viewerHome").onclick = () => {
    dialog.close();
    focusIndex = 0;
    slidePos = 0;
    briefPage = 0;
    questionPos = 0;
    answerMode = false;
    view = "brief";
    render();
  };
  $("#viewerPrev").onclick = () => {
    if (viewerMode === "brief") changeBrief(-1);
  };
  $("#viewerNext").onclick = () => {
    if (viewerMode === "brief") changeBrief(1);
  };
  $("#penToggle").onclick = () => canvas.classList.toggle("enabled");
  $("#clearPen").onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
  window.addEventListener("resize", () => resizeCanvas(false));

  canvas.addEventListener("pointerdown", (event) => {
    drawing = true;
    draw(event, true);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (drawing) draw(event, false);
  });
  canvas.addEventListener("pointerup", () => (drawing = false));
  canvas.addEventListener("pointerleave", () => (drawing = false));

  function draw(event, start) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((event.clientY - rect.top) * canvas.height) / rect.height;
    ctx.strokeStyle = "#f06f64";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    if (start) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function resizeCanvas(clearOnly) {
  const canvas = $("#penCanvas");
  const old = clearOnly ? null : canvas.toDataURL();
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  if (!old) return;
  const image = new Image();
  image.onload = () => canvas.getContext("2d").drawImage(image, 0, 0);
  image.src = old;
}

init();
