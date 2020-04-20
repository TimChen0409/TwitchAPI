let counterWidth = 100;  //計時條長度
let timer;        //倒數時間(亳秒)
let counterHandle;      //計時條
let val;//儲存第一張卡片Value
let val2;//儲存第二張卡片Value
let count = 0;//判斷翻卡第一次還是第二次
let point = 0;//計算分數

function startGame() {
    $(".mask").css("display", "none");
    init();//遊戲初始化
    counterHandle = setInterval(timeCounter, 100)    //啟動計時器
    chk();//卡片判斷與計分
}


//遊戲初始化
function init() {
    $(".card").removeClass('front active');
    point = 0;
    $("span").text('結果：');
    $(".score").text('總分：');
    $(".card-wrapper").html($(".card-wrapper .card").sort(function () {
        return Math.random() - 0.5;
    }));//卡片隨機洗牌
    clearInterval(counterHandle);
    counterWidth = 100;
    timer = 30000;
    complete = 0;
    $("#counter").css("width", "100%");
};


//卡片判斷與計分
function chk() {
    $(".card-wrapper").on('click', '.card', function () {

        if ($(this).hasClass("active") || $(this).hasClass("front")) {//如果卡片被打開移除監聽事件
            $(this).off("click");
        }
        else {
            $(this).addClass('front')
            if (count == 0) {
                val = $(this).find('.front').attr('value');
                count++;
            }
            else {
                val2 = $(this).find('.front').attr('value');
                count = 0;
                if (val == val2) {
                    $(".judge").text('結果：正確!⭕');
                    $('.card.front').addClass('active').removeClass('front');
                    point++;
                    $(".score").append('💎');

                }
                else {
                    $(".judge").text('結果：錯誤!❌');
                    setTimeout(function () {
                        $(".card.front").removeClass('front')
                    }, 500);
                    val = undefined;
                    val2 = undefined;
                }
            }
            if (point >= 6) {
                setTimeout(function () {
                    result();
                }, 700);

            }
        }

    });
};

//計時條倒數
function timeCounter() {
    if (timer < 0) {
        $("#counter").css("width", "0%");
        clearInterval(counterHandle);
        result();  //計時結束時執行結果判定
    } else {
        timer -= 100;
        counterWidth -= 0.33
        $("#counter").css("width", counterWidth + "%");

        var number = Math.floor(timer / 1000 * 10) / 10;
        if (number > 0) {
            $("#timer").html("倒數計時器："+number);
        }
        else {
            $("#timer").html(0);
        }
    }
};

//結果判定
function result() {
    let count = point;
    let str = "";
    //設定結果字串
    if (count >= 6) {
        str = "遊戲結果：恭喜完成遊戲\n<button onclick='startGame()'>繼續遊戲</button>";
    } else {
        str = "遊戲結果：失敗\n<button onclick='startGame()'>重新進行遊戲</button>";
    }
    //把結果字串寫入提示顯示區
    $(".intro").html(str);
    $(".mask").css("display", "block");
};