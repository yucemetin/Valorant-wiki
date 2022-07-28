const url = "https://valorant-api.com/v1/agents";
const agentUrl = "https://valorant-api.com/v1/agents/";

const agents = document.getElementById("container");
const popup = document.getElementById("pop-up");
const deneme = document.getElementById("deneme");
const modalMenu = document.getElementById("modal");

const check = async (obj) => {
  const response = await fetch(agentUrl + obj.id);
  const data = await response.json();
  const arr = data.data;
  let audio = `<audio id="audio" src="./sounds/${arr.displayName}.wav"></audio>`;
  if (arr.displayName === "KAY/O") {
    audio = `<audio id="audio" src="./sounds/Kayo.wav"></audio>`;
  }
  modalMenu.classList.add("show");
  
  let fadeFlag = ""
  if(arr.displayName == "Fade"){
    fadeFlag = `<div style="display=none;"><img id="turkish-flag" src="Turkish-flag.jfif" alt=""></div>`;
  }
  

  deneme.innerHTML = `<div class="popinfo" style="background-color: #${arr.backgroundGradientColors[2]};">
  ${fadeFlag}
  <div><a class="closebtn" id="closebtn"> < Close ></a></div>
  <img class="popimg" src="${arr.fullPortrait}" alt="">
    <h1>${arr.displayName}</h1>
    <p>${arr.description}</p>
    <div class="abilities">
    <div class="subability"><h3>${arr.abilities[0].displayName}</h3>
    <img class="abilityicon" src="${arr.abilities[0].displayIcon}" alt="">
    </div>
    <div class="subability"><h3>${arr.abilities[1].displayName}</h3>
    <img class="abilityicon" src="${arr.abilities[1].displayIcon}" alt="">
    </div>
    <div class="subability"><h3>${arr.abilities[2].displayName}</h3>
    <img class="abilityicon" src="${arr.abilities[2].displayIcon}" alt="">
    </div>
    <div class="subability"><h3>${arr.abilities[3].displayName}</h3>
    <img class="abilityicon" src="${arr.abilities[3].displayIcon}" alt="">
    ${audio}
    </div>
    </div>
    </div>`;
  const audioSound = document.getElementById("audio");
  const buton = document.getElementById("closebtn");
  buton.addEventListener("click", () => {
    modalMenu.classList.remove("show");
    audioSound.pause();
  });
  audioSound.play();
};

const getAgents = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const arr = data.data;

  for (let items of arr) {
    if (items.name !== "Null UI Data!" && items != arr[7]) {
      agents.innerHTML += `<div class="agents">
        <a onclick="check(this)" id="${items.uuid}" href="#"><img class="icons" src="${items.displayIconSmall}" alt=""></a>
        <h2>${items.displayName}</h2>
        </div>`;
    }
  }
};

getAgents();
