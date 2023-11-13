let button = document.getElementById("geradorbotao"),
  output = document.getElementById("entrada"),
  output2 = document.getElementById("turbo"),
  output3 = document.getElementById("validade");
const whatsAppBanner = document.getElementById("whatsapp");
function getRandomNumber(t, e) {
  let n = Math.random() * (e - t + 1) + t;
  return Math.floor(n);
}
function getRandomNumber(t, e) {
  let n = Math.random() * (e - t + 1) + t;
  return Math.floor(n) + "X";
}
function countdown(t) {
  let e = t;
  const n = setInterval(() => {
    (button.innerHTML = "AGUARDE (" + e + "s...)"),
      e--,
      e < 0 &&
        (clearInterval(n),
        (button.disabled = !1),
        (button.innerHTML = "GERAR NOVO SINAL"));
  }, 1e3);
}
function updateTime() {
  return dayjs().add(2, "m").format("HH:mm");
}
button.addEventListener("click", (t) => {
  var audio = document.getElementById("meuAudio");
  audio.currentTime = 0;
  audio.play();
  t.preventDefault(),
    (button.disabled = !0),
    (output.innerText = getRandomNumber(5, 10)),
    (output2.innerText = getRandomNumber(5, 10)),
    (output3.innerText = updateTime()),
    countdown(60);
  const style = `color: #fff;
    text-shadow: 0 0 20px #fff900, 1px 1px 20px #000000, 2px 2px 20px #fff900, -1px -1px 20px #fff900, -2px -2px 20px #fff900;`;
  document.getElementById("entrada").style = style;
  document.getElementById("turbo").style = style;
  document.getElementById("validade").style = style;
});

function loadFile(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function parseNames(content) {
  return content.trim().replace(/\r/g, "").split("\n");
}

function generateRandomName(namesFromFile) {
  if (namesFromFile && namesFromFile.length > 0) {
    const randomIndex = Math.floor(Math.random() * namesFromFile.length);
    return namesFromFile[randomIndex];
  }
}

function showRandomNotification(namesFromFile) {
  const name = generateRandomName(namesFromFile);
  const value = `R$ ${(Math.random() * 50).toFixed(2)}`;
  const time = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  $.notify(`${name} ganhou ${value}`, "success");

  setTimeout(() => showRandomNotification(namesFromFile), time);
}

const namesFileUrl = "resources/names.txt";

loadFile(namesFileUrl, function (content) {
  const namesFromFile = parseNames(content);

  showRandomNotification(namesFromFile);
});
