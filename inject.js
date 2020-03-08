(function() {

if (document.location.href.indexOf("?") === -1 || document.location.href.indexOf("/webhp?") !== -1) {
	var currentHours = new Date().getHours();
	var currentMinutes = new Date().getMinutes();

	var bgUrl;
	if (currentHours >= 0 && currentHours < 2) {
		bgUrl = chrome.extension.getURL('00.jpg');
	}
	if (currentHours == 3 && currentMinutes == 14) {
		bgUrl = chrome.extension.getURL('0314.jpg');
	} else if (currentHours >= 2 && currentHours < 4) {
		bgUrl = chrome.extension.getURL('02.jpg');
	}
	if (currentHours >= 4 && currentHours < 6) {
		bgUrl = chrome.extension.getURL('04.jpg');
	}
	if (currentHours >= 6 && currentHours < 8) {
		bgUrl = chrome.extension.getURL('06.jpg');
	}
	if (currentHours >= 8 && currentHours < 10) {
		bgUrl = chrome.extension.getURL('08.jpg');
	}
	if (currentHours >= 10 && currentHours < 12) {
		bgUrl = chrome.extension.getURL('10.jpg');
	}
	if (currentHours >= 12 && currentHours < 14) {
		bgUrl = chrome.extension.getURL('12.jpg');
	}
	if (currentHours >= 14 && currentHours < 16) {
		bgUrl = chrome.extension.getURL('14.jpg');
	}
	if (currentHours >= 16 && currentHours < 18) {
		bgUrl = chrome.extension.getURL('16.jpg');
	}
	if (currentHours >= 18 && currentHours < 20) {
		bgUrl = chrome.extension.getURL('18.jpg');
	}
	if (currentHours >= 20 && currentHours < 22) {
		bgUrl = chrome.extension.getURL('20.jpg');
	}
	if (currentHours >= 22) {
		bgUrl = chrome.extension.getURL('22.jpg');
	}

	var css = [
		"#gws-output-pages-elements-homepage_additional_languages__als { display:none!important; }",
		".content { padding-bottom: 10%!important; }",
		"#main { background-image:url(" + bgUrl + "); background-size:cover; }"
	].join("\n")

	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		document.documentElement.appendChild(node);
	}
}
	
})();
