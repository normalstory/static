var commands = {
  '다음*val' : function() {
    location.href = "./page_a";
  },
  '앞*val' : function() {
    location.href = "./page_a";
  },
  '넥스트*val' : function() {
    location.href = "./page_a";
  },
  '뒤로*val' : function() {
    location.href = "./page_b";
  },
  '뒷*val' : function() {
    location.href = "./page_b";
  },
  '백*val' : function() {
    location.href = "./page_b";
  },
  '메인*val' : function() {
    location.href = "./";
  }
}
annyang.addCommands(commands);
annyang.start({autoRestart: false, continuous: true});
