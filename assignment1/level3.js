const members = [
  { name: "강한희", part: "Server", group: "OB" },
  { name: "고성용", part: "Server", group: "OB" },
  { name: "구건모", part: "Server", group: "YB" },
  { name: "권세훈", part: "Server", group: "YB" },
  { name: "김영권", part: "Server", group: "YB" },
  { name: "김은지", part: "Server", group: "YB" },
  { name: "김진욱", part: "Server", group: "YB" },
  { name: "김희빈", part: "Server", group: "OB" },
  { name: "남지윤", part: "Server", group: "YB" },
  { name: "문규원", part: "Server", group: "YB" },
  { name: "박나희", part: "Server", group: "OB" },
  { name: "박정현", part: "Server", group: "YB" },
  { name: "박현지", part: "Server", group: "OB" },
  { name: "변주현", part: "Server", group: "OB" },
  { name: "서호영", part: "Server", group: "OB" },
  { name: "설지원", part: "Server", group: "YB" },
  { name: "손시형", part: "Server", group: "YB" },
  { name: "안준영", part: "Server", group: "OB" },
  { name: "장서현", part: "Server", group: "OB" },
  { name: "오예원", part: "Server", group: "OB" },
  { name: "이다은", part: "Server", group: "OB" },
  { name: "이동근", part: "Server", group: "YB" },
  { name: "이솔", part: "Server", group: "OB" },
  { name: "이승헌", part: "Server", group: "YB" },
  { name: "이정은", part: "Server", group: "YB" },
  { name: "이제준", part: "Server", group: "YB" },
  { name: "정설희", part: "Server", group: "OB" },
  { name: "조윤서", part: "Server", group: "OB" },
  { name: "조재호", part: "Server", group: "YB" },
  { name: "조찬우", part: "Server", group: "YB" },
  { name: "주어진사랑", part: "Server", group: "YB" },
  { name: "주효식", part: "Server", group: "YB" },
  { name: "채정아", part: "Server", group: "OB" },
  { name: "최영재", part: "Server", group: "OB" },
  { name: "최유림", part: "Server", group: "YB" },
  { name: "최진영", part: "Server", group: "YB" },
  { name: "허유정", part: "Server", group: "YB" },
];

function pushTeam(team, teamNum, array) {
  for(let i = 0; i < array.length; i++){
    index= i % teamNum;
    team[index].push(array[i]);
  }
}

function shuffle(array) { 
  array.sort(() => Math.random() - 0.5); 
}


function teamGenerator(members, teamNum) { 
  let OBs = members.filter((member)=>{
    if (member['group']=='OB') {
      return member;
    };
  })
  
  let YBs = members.filter((member)=>{
    if (member['group']=='YB'){
      return member;
    }
  })

  let team = []
  for(let i=0; i < teamNum; i++){
    team.push([]);
  }

  shuffle(OBs);
  shuffle(YBs);
  pushTeam(team,teamNum,OBs);
  pushTeam(team,teamNum,YBs);
  
  console.log("OBs: ",OBs.length);
  console.log("YBs: ", YBs.length);
  console.log("YB/OB 비율: ", YBs.length/OBs.length);

  return team;
}

team = teamGenerator(members, 6);
console.log(team);

for(let i=0; i < team.length; i++){
  let NumOfOBs = team[i].filter((member)=>{
    if (member['group']=='OB') {
      return member;
    };
  }).length;
  
  let numOfYBs = team[i].filter((member)=>{
    if (member['group']=='YB'){
      return member;
    };
  }).length;

  console.log(`team${i+1} YB/OB :`, (numOfYBs/NumOfOBs));
}