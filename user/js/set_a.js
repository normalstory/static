var commands = {
  '다음*val' : function() {
    location.href = "./page_b";
  },
  '앞*val' : function() {
    location.href = "./page_b";
  },
  '넥스트*val' : function() {
    location.href = "./page_b";
  },
  '뒤로*val' : function() {
    alert("시작 페이지 입니다.");
  },
  '뒷*val' : function() {
    alert("시작 페이지 입니다.");
  },
  '백*val' : function() {
    alert("시작 페이지 입니다.");
  },
  '메인*val' : function() {
    location.href = "./";
  }
}
annyang.addCommands(commands);
annyang.start({autoRestart: false, continuous: true});
