let clientId = "sa8qsftf1cnffx3n1uez5gg39twnvv";
let clinetSecret = "co3qq6jzlwpck7je27ncevo8j1muow";
let LANG = "zh";

async function getTwitchAuthorization() {
  let url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clinetSecret}&grant_type=client_credentials&redirect_uri=http://127.0.0.1:5500/`;
  let response = await axios.post(url);
  return response.data;
}

async function getLoLData(LANG) {
  clearData();
  const url = `https://api.twitch.tv/helix/streams?game_id=21779&first=12&language=${LANG}`;

  let authorizationObject = await getTwitchAuthorization();
  let { access_token, expires_in, token_type } = authorizationObject;

  //將bearer第一個字轉大寫
  token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

  let authorization = `${token_type} ${access_token}`;
  let headers = {
    Authorization: authorization,
    "Client-Id": clientId,
  };

  axios
    .get(url, {
      headers: headers,
    })
    .then((response) => {
      let streams = response.data.data;
      getData(streams, block1);
    });

  $("#LolBlock").show();
  $("#MSBlock").hide();
  $("#ChattingBlock").hide();
}

async function getMSData(LANG) {
  clearData();
  const url = `https://api.twitch.tv/helix/streams?game_id=19976&first=12&language=${LANG}`;
  let authorizationObject = await getTwitchAuthorization();
  let { access_token, expires_in, token_type } = authorizationObject;

  //將bearer第一個字轉大寫
  token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

  let authorization = `${token_type} ${access_token}`;
  let headers = {
    Authorization: authorization,
    "Client-Id": clientId,
  };

  axios
    .get(url, {
      headers: headers,
    })
    .then((response) => {
      let streams = response.data.data;
      getData(streams, block2);
    });

  $("#LolBlock").hide();
  $("#MSBlock").show();
  $("#ChattingBlock").hide();
}

async function getChattingData(LANG) {
  clearData();
  const url = `https://api.twitch.tv/helix/streams?game_id=509658&first=12&language=${LANG}`;
  let authorizationObject = await getTwitchAuthorization();
  let { access_token, expires_in, token_type } = authorizationObject;

  //將bearer第一個字轉大寫
  token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

  let authorization = `${token_type} ${access_token}`;
  let headers = {
    Authorization: authorization,
    "Client-Id": clientId,
  };

  axios
    .get(url, {
      headers: headers,
    })
    .then((response) => {
      let streams = response.data.data;
      getData(streams, block3);
    });

  $("#LolBlock").hide();
  $("#MSBlock").hide();
  $("#ChattingBlock").show();
}

function getData(streams, block) {
  console.log(streams);
  const $row = $(block); //選擇添加區塊
  for (var i = 0; i < streams.length; i++) {
    $row.append(getColumn(streams[i]));
  }
}

function getColumn(data) {
  console.log(data);
  data.thumbnail_url = data.thumbnail_url.replace(
    "{width}x{height}",
    "320x220"
  );

  data.avatar='https://static-cdn.jtvnw.net/previews-ttv/live_user_namin1004-70x70.jpg'

  return `<div class="col-12 col-lg-6 col-xl-4">
            <a href="https://www.twitch.tv/${data.user_login}" target="_blank" class="twitch_block">
                    <div class="twitch_preview">
                        <img src="${data.thumbnail_url}"/>
                    <div class="p-1">
                        <div class="ms-2">
                                <div class="twitch_title">${data.title}</div>
                            <div class="twitch_name">
                                <div class="float-left">${data.user_name} (${data.user_login})</div>
                                <div class="float-right text-danger"><i class="fa fa-user"></i> ${data.viewer_count}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>`;
}

function clearData() {
  $(".row").empty(); //清除元素裡的內容
}

function changeLang(lang, type) {
  $(".container h3").text(window.I18N[lang]["TITLE"]);
  $("#LOL").text(window.I18N[lang]["LOLNAME"]);
  $("#MS").text(window.I18N[lang]["MSNAME"]);
  $("#Chat").text(window.I18N[lang]["ChattingNAME"]);
  $(".row").empty(); //清除元素裡的內容

  if (type == "LOL") getLoLData(lang);
  if (type == "MS") getMSData(lang);
  if (type == "Chatting") getChattingData(lang);
}
