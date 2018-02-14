var langs = [['Afrikaans', ['af-ZA']],
['Bahasa Indonesia',['id-ID']],
['Bahasa Melayu', ['ms-MY']],
['Català', ['ca-ES']],
['Čeština', ['cs-CZ']],
['Deutsch', ['de-DE']],
['English', ['en-AU', 'Australia'],
                 ['en-CA', 'Canada'],
                 ['en-IN', 'India'],
                 ['en-NZ', 'New Zealand'],
                 ['en-ZA', 'South Africa'],
                 ['en-GB', 'United Kingdom'],
                 ['en-US', 'United States']],
['Español', ['es-AR', 'Argentina'],
                 ['es-BO', 'Bolivia'],
                 ['es-CL', 'Chile'],
                 ['es-CO', 'Colombia'],
                 ['es-CR', 'Costa Rica'],
                 ['es-EC', 'Ecuador'],
                 ['es-SV', 'El Salvador'],
                 ['es-ES', 'España'],
                 ['es-US', 'Estados Unidos'],
                 ['es-GT', 'Guatemala'],
                 ['es-HN', 'Honduras'],
                 ['es-MX', 'México'],
                 ['es-NI', 'Nicaragua'],
                 ['es-PA', 'Panamá'],
                 ['es-PY', 'Paraguay'],
                 ['es-PE', 'Perú'],
                 ['es-PR', 'Puerto Rico'],
                 ['es-DO', 'República Dominicana'],
                 ['es-UY', 'Uruguay'],
                 ['es-VE', 'Venezuela']],
['Euskara', ['eu-ES']],
['Français', ['fr-FR']],
['Galego', ['gl-ES']],
['Hrvatski', ['hr_HR']],
['IsiZulu', ['zu-ZA']],
['Íslenska', ['is-IS']],
['Italiano', ['it-IT', 'Italia'],
                 ['it-CH', 'Svizzera']],
['Magyar', ['hu-HU']],
['Nederlands', ['nl-NL']],
['Norsk bokmål', ['nb-NO']],
['Polski', ['pl-PL']],
['Português', ['pt-BR', 'Brasil'],
                 ['pt-PT', 'Portugal']],
['Română', ['ro-RO']],
['Slovenčina', ['sk-SK']],
['Suomi', ['fi-FI']],
['Svenska', ['sv-SE']],
['Türkçe', ['tr-TR']],
['български', ['bg-BG']],
['Pусский', ['ru-RU']],
['Српски', ['sr-RS']],
['한국어', ['ko-KR']],
['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'],
                 ['cmn-Hans-HK', '普通话 (香港)'],
                 ['cmn-Hant-TW', '中文 (台灣)'],
                 ['yue-Hant-HK', '粵語 (香港)']],
['日本語', ['ja-JP']],
['Lingua latīna', ['la']]];

//언어 선택

for (var i = 0; i < langs.length; i++) {
select_language.options[i] = new Option(langs[i][0], i);
}
select_language.selectedIndex = 28;
updateCountry();
select_dialect.selectedIndex = 28;
showInfo('info_start');

function updateCountry()
{
for (var i = select_dialect.options.length - 1; i >= 0; i--) {
select_dialect.remove(i);
}
var list = langs[select_language.selectedIndex];
for (var i = 1; i < list.length; i++) {
select_dialect.options.add(new Option(list[i][1], list[i][0]));
}
select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
upgrade();
} else {
start_button.style.display = 'inline-block';
var recognition =  new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.onstart = function() {
recognizing = true;
showInfo('info_speak_now');
start_button.style = 'background-color:darkred;';
};
recognition.onerror = function(event) {
if (event.error == 'no-speech') {
  start_button.style='background-color:navy;';
  showInfo('info_no_speech');
  ignore_onend = true;
}
if (event.error == 'audio-capture') {
  start_button.style='background-color:navy;';
  showInfo('info_no_microphone');
  ignore_onend = true;
}
if (event.error == 'not-allowed') {
  if (event.timeStamp - start_timestamp < 100) {
    showInfo('info_blocked');
  } else {
    showInfo('info_denied');
  }
  ignore_onend = true;
}
};
recognition.onend = function() {
recognizing = false;
if (ignore_onend) {
  return;
}
start_button.style='background-color:navy;';
if (!final_transcript) {
  showInfo('info_start');
  return;
}
showInfo('info_start');
};


//stt 화면에 뿌리기
recognition.onresult = function(event) {
for (var i = event.resultIndex; i < event.results.length; ++i) {
    final_transcript += event.results[i][0].transcript;
}
//stt 변환된 내용
final_transcript = capitalize(final_transcript);
// 체팅 줄 구분을 위해 사용
var br = document.createElement("div");
// 체팅 내용 들어갈 div
var para = document.createElement("div");

br.id = "br";
para.id = "question_view";
// 내용 입력
var node = document.createTextNode(linebreak(final_transcript));
para.appendChild(node);

var element = document.getElementById("results");
//화면에 추가
element.appendChild(br);
br.appendChild(para);
//final_span.innerHTML = linebreak(final_transcript);
//interim_span.innerHTML = linebreak(interim_transcript);

//질문 전달 및 답변 받아오기
QNA(final_transcript);

showButtons('inline-block');

};

//qna maker api 답변 받아오기
function QNA(question) {
// 답변을 받아오기 전에 녹음 종료
recognition.stop();
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status ==200){
    var response = JSON.parse(this.responseText).answers[0];
    //답변을 못 찾을 경우 score가 0점으로 넘어와서 답변이 없을때와 있을때 구분
    if (response.score == 0){
    var answer_response = "";
    var question_response = "답변을 찾지 못하였습니다.";
    var inform = "<p>미워도 다시 한번만</p>"
    } else {
    var answer_response = response.answer;
    var question_response = response.questions[0];
    var inform = "<p>클릭하시면 자세한 내용을 볼 수 있습니다.</p>"
    }
    //구조 result 안에  question_para 와 answer_para가 자식으로 들어 있음(question_para과 answer_para는 형제 관계)
    var result_para = document.createElement("div");
    var answer_para = document.createElement("div");
    var question_para = document.createElement("div");
    var br = document.createElement("div");


    result_para.id="result_view";
    answer_para.id = "answer_deep";

    answer_para.innerHTML = linebreak(answer_response) +"<a href='http://naver.com' target='_blank'></a>";
    question_para.innerHTML = linebreak(question_response) + inform ;

    br.id = "br";

    var result_element = document.getElementById("results");

    result_element.appendChild(result_para);
    result_para.appendChild(question_para);
    result_para.appendChild(answer_para);
    result_element.appendChild(br);

    question_para.addEventListener('click',function(){
      block(this);
    });
    //console.log(response.answers[0]);
    //document.getElementById('final_span').appendChild = ;
  }

};


var host = "https://westus.api.cognitive.microsoft.com/qnamaker/v2.0";
var host2 = "/knowledgebases/"+gov_div+"/generateAnswer";
xhttp.open("POST", host+host2);
xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhttp.setRequestHeader("Ocp-Apim-Subscription-Key",api_user);
xhttp.send("question="+question);
};


function QNA_list() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status ==200){

      var response = JSON.parse(this.responseText);
      var result_para = document.createElement("div");
      var result_element = document.getElementById("q_list");

      console.log(response);
      result_para.innerHTML = "<h1><a href='"+response+"' download>문답 리스트 download</a></h1>" ;

      result_element.appendChild(result_para);

      //console.log(response.answers[0]);
      //document.getElementById('final_span').appendChild = ;
    }

  };
  var host = "https://westus.api.cognitive.microsoft.com/qnamaker/v2.0";
  var host2 = "/knowledgebases/"+gov_div;
  xhttp.open("GET", host+host2, true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader("Ocp-Apim-Subscription-Key",api_user);
  //xhttp.onreadystatechange = handler;
  xhttp.send();
};

//지식 사전 다운로드 경로 생성 함수
QNA_list();


}

function block(tt){

// 답변에서 세부 내용 보기
tt.nextSibling.style.display=(tt.nextSibling.style.display=='none')?'block':'none';
// 클릭 안내 메세지 변경
tt.children[0].innerHTML=(tt.nextSibling.style.display=='none')?'클릭하시면 자세한 내용을 볼 수 있습니다.':'클릭하시면 내용을 접을 수 있습니다.';

}
function upgrade() {
start_button.style.visibility = 'hidden';
showInfo('info_upgrade');
}
var two_line = /\n\n/g; var one_line = /\n/g; function linebreak(s) {
return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/; function capitalize(s) {
return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
function startButton(event) {
if (recognizing) {
recognition.stop();
return;
}
final_transcript = '';
recognition.lang = select_dialect.value;
recognition.start();
ignore_onend = false;
//final_span.innerHTML = '';
//interim_span.innerHTML = '';
start_button.style='background:navy;';
showInfo('info_allow');
showButtons('none');
start_timestamp = event.timeStamp;
}
function showInfo(s) {
if (s) {
for (var child = info.firstChild; child; child = child.nextSibling) {
  if (child.style) {
    child.style.display = child.id == s ? 'inline' : 'none';
  }
}
info.style.visibility = 'visible';
} else {
info.style.visibility = 'hidden';
}
}
var current_style; function showButtons(style) {
if (style == current_style) {
return;
}
current_style = style;
//copy_button.style.display = style;
//email_button.style.display = style;
//copy_info.style.display = 'none';
//email_info.style.display = 'none';
}

