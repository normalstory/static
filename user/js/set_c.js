var commands = {
  '앞*val' : function() {
    location.href = "./b";
  },
  '뒤로*val' : function() {
    location.href = "./b";
  },
  '뒷*val' : function() {
    location.href = "./b";
  },
  '백*val' : function() {
    location.href = "./b";
  },
  '다음*val' : function() {
    location.href = "./a";
  },
  '넥스트*val' : function() {
    location.href = "./a";
  },
  '에이*val' : function() {
    location.href = "./a";
  },
  '비*val' : function() {
    location.href = "./b";
  },
  '씨*val' : function() {
    alert("여기가 C 페이지 입니다.");
  },
  '메인*val' : function() {
    location.href = "./";
  }
}
annyang.addCommands(commands);
annyang.start({autoRestart: false, continuous: true});
