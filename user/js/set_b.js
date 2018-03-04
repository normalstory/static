var commands = {
  '앞*val' : function() {
    location.href = "./a";
  },
  '뒤로*val' : function() {
    location.href = "./a";
  },
  '뒷*val' : function() {
    location.href = "./a";
  },
  '백*val' : function() {
    location.href = "./a";
  },
  '다음*val' : function() {
    location.href = "./c";
  },
  '넥스트*val' : function() {
    location.href = "./c";
  },
  '에이*val' : function() {
    location.href = "./a";
  },
  '비*val' : function() {
    alert("여기가 B 페이지 입니다.");
  },
  '씨*val' : function() {
    location.href = "./c";
  },
  '메인*val' : function() {
    location.href = "./";
  }
}
annyang.addCommands(commands);
annyang.start({autoRestart: false, continuous: true});
