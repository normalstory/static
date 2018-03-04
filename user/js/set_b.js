var commands = {
  '다음*val' : function() {
    location.href = "./page_c";
  },
  '앞*val' : function() {
    location.href = "./page_c";
  },
  '넥스트*val' : function() {
    location.href = "./page_c";
  },
  '뒤로*val' : function() {
    location.href = "./page_a";
  },
  '뒷*val' : function() {
    location.href = "./page_a";
  },
  '백*val' : function() {
    location.href = "./page_a";
  },
  '메인*val' : function() {
    location.href = "./";
  }
}
annyang.addCommands(commands);
annyang.start({autoRestart: false, continuous: true});
