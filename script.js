let clientId = '7jnow7dr6xs9f979a40a1rbd3rlim6';
let LANG = 'zh';

//XMLHttpRequest
function getLoLData(LANG) {
    clearData();
    let apiUrl = `https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends&limit=6&language=${LANG} `;
    let request = new XMLHttpRequest();
    request.open('GET', apiUrl, true);//非同步
    request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    request.setRequestHeader('Client-ID', clientId);
    request.send();

    request.onload = function load() {

        if (this.status >= 200 && this.status < 400) {
            let data = JSON.parse(this.responseText);
            getData(data, block1);

        } else {
            console.log('Error');
        }
    };
    request.onerror = function error() {
        console.log('Error');
    };
    $('#LolBlock').show();
    $('#MSBlock').hide();
};

//JQuery AJAX
function getMSData(LANG) {
    clearData();
    let apiUrl2 = `https://api.twitch.tv/kraken/streams/?game=MapleStory&limit=6&language=${LANG} `;

    // AJAX寫法1
    // $.ajax({
    //     url: apiUrl2,
    //     headers: {
    //         'Accept': 'application/vnd.twitchtv.v5+json',
    //         'client-ID': clientId,
    //     },
    //     success: (data2) => {
    //         getData(data2, block2);
    //     },
    //     error: function () {
    //         console.log('JQuery Ajax Error');
    //     }
    // })

    // AJAX寫法2
    $.ajax({
        url: apiUrl2,
        headers: {
            'Accept': 'application/vnd.twitchtv.v5+json',
            'client-ID': clientId,
        }
    })
    .done(data2 => getData(data2, block2))
    .fail(() => console.log('JQuery Ajax Error'))
    .always(()=>console.log('complete'));



    $('#LolBlock').hide();
    $('#MSBlock').show();
};

function getData(data, block) {
    const streams = data.streams;
    const $row = $(block);//選擇添加區塊
    for (var i = 0; i < streams.length; i++) {
        $row.append(getColumn(streams[i]))
    }
};

function getColumn(data) {
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

function clearData() {
    $('.row').empty();//清除元素裡的內容
}

function changeLang(lang, type) {
    $('.container h1').text(window.I18N[lang]['TITLE']);
    $('#LOL').text(window.I18N[lang]['LOLNAME']);
    $('#MS').text(window.I18N[lang]['MSNAME']);
    LANG = lang;
    $('.row').empty();//清除元素裡的內容

    if (type == 'LOL') getLoLData(LANG);
    if (type == 'MS') getMSData(LANG);

};