function setLang(lang) {
    $.i18n().locale = 'cn';
    $('html').i18n();
}

$(function() {

    $.i18n().load({
        "app-name": "Via币",
        "app-title": "Via币- 虚拟货币的新潮流",
        "app-slogan1": "虚拟货币的新潮流",
        "app-slogan2": "快速、灵活、可靠，数位时代的新趋势",

        "app-start-button": "马上启用",

        
        // info block
        "app-info-roadmap": "2017产品流程图",
        "app-info-magazine": "隔离见证激活（segwit）",

        "app-info-bullet1-title": "快速交易",
        "app-info-bullet1-subtitle": "比特币的25倍速",

        "app-info-bullet2-title": "清算所(Clearing House)",
        "app-info-bullet2-subtitle": "去中心化系统及分布式核算传输",

        "app-info-bullet3-title": "区块练验证",
        "app-info-bullet3-subtitle": "刊载证明机制(Proof-of-publication)",

        "app-info-bullet4-title": "嵌入式共识演算系统",
        "app-info-bullet4-subtitle": "延伸OP_RETURN 120字节辅助",

        "app-info-bullet5-title": "Locktime支援",
        "app-info-bullet5-subtitle": "便于支付及付款的交易渠道",

        "app-info-bullet6-title": "隔离见证（segwit）",
        "app-info-bullet6-subtitle": "修复延展性问题",

        "app-info-bullet7-title": "闪电网络(升级中)",
        "app-info-bullet7-subtitle": "区块链外交易服务，瞬间交易",

        "app-info-bullet8-title": "安全性",
        "app-info-bullet8-subtitle": "受加密法与scrypt合并开采保护",

        //wallets block
        "app-wallet-electrum": "Vialectrum钱包",
        "app-wallet-paper": "纸钱包",

        //pool block
        "app-pool-title": "矿池名单",
        "app-pool-subtitle": "Via币矿池",

        //resources block
        "app-resources-title": "资源",

        //community block
        "app-community-title": "社群",
        "app-community-subtitle": "-",

        "app-community-twitter": "推特",
        "app-community-twitter-subtitle": "取得最新信息",

        "app-community-reddit": "热提网",
        "app-community-reddit-subtitle": "最新文章",

        "app-community-github-subtitle": "产品原始码数据库",

        "app-community-telegram-subtitle": "Telegram实时聊天",

        //contact us
        "app-contact": "联络我们",

        //footer
        "app-footer-we": "我们"


    }, 'cn').done(function() {

        var cn = false;

        var countries = ['CN', 'HK', 'SG', 'MO', 'TW'];

        var userLang = navigator.language || navigator.userLanguage; 

        $.get("https://ipinfo.io", function(response) {
            if(countries.indexOf(response.country) != -1) {
              setLang('cn') ;
              cn = true;
            }
        }, "jsonp");

        userLang = userLang.split('-')[0];

        if(userLang == 'zh' && !cn) {
            setLang('cn');
        }


    });

});