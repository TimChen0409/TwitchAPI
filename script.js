let clientId = '7jnow7dr6xs9f979a40a1rbd3rlim6';
let LANG = 'zh-tw';

//XMLHttpRequest
function getLoLData(LANG) {


    var apiUrl = 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=6&language=${LANG} ';
    console.log(apiUrl);
    var request = new XMLHttpRequest();
    request.open('GET', `https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=6&language=${LANG} `, true);//非同步
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID', clientId);
    request.send();

    request.onload = function load() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.responseText);
            getData(data, block1);

        } else {
            console.log('error');
        }
    };
    request.onerror = function error() {
        console.log('error');
    };
    $('#LolBlock').show();
    $('#MPBlock').hide();
};

//JQuery AJAX
function getMPData() {


    var apiUrl2 = 'https://api.twitch.tv/kraken/streams/?game=MapleStory&limit=6&language=zh';
    $.ajax({
        url: apiUrl2,
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'client-ID': clientId,
        },
        success: (data2) => {
            getData(data2, block2);
        },
        error: function () {
            alert('JQuery Ajax Error');
        }

    })
    $('#LolBlock').hide();
    $('#MPBlock').show();
};

function getData(LANG, data, block) {
    const streams = data.streams;
    const $row = $(block);//選擇添加區塊
    for (var i = 0; i < streams.length; i++) {
        $row.append(getColumn(streams[i]))
    }
};

function getColumn(LANG, data) {
    return `<div class="col-sm-4">
            <a href="${data.channel.url}" target="_blank" class="twitch_block">
                    <div class="twitch_preview">
                        <img src="${data.preview.medium}"/>
                    <div class="twitch_info">
                        <img src="${data.channel.logo}" class="twitch_avatar"/>
                        <div class="ml-2">
                                <div class="twitch_title">${data.channel.status}</div>
                            <div class="twitch_name">
                                <div class="float-left">${data.channel.display_name} (${data.channel.name})</div>
                                <div class="float-right text-danger"><i class="fa fa-user"></i> ${data.viewers}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>`;
};



function changeLang(lang) {
    $('.container h1').text(window.I18N[lang]['TITLE']);
    $('#LOL').text(window.I18N[lang]['LOLNAME']);
    $('#MS').text(window.I18N[lang]['MSNAME']);

    $('.row').empty();//清除元素裡的內容



};