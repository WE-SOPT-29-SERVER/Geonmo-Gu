
const team = {
    members: [
        {name:"조재호", home:"경기도 남양주시", age:24, hobby:"서핑"},
        {name:"변주현", home:"서울시 중랑구", age:22, hobby:"서버개발"},
        {name:"주어진사랑", home:"서울시 용산구", age:23, hobby:"해뜨고 자기"},
        {name:"조찬우", home:"성남시 분당구", age:24, hobby:"농구"},
        {name:"구건모", home:"인천시 남동구", age:23, hobby:"독서"},
        {name:"강한희", home:"unknown", age:"unknown", hobby:"unknown"},
    ],
    
    introduce: function() {
        for(member of this.members){
            console.log(`이름: ${member['name']}, 사는 곳: ${member['home']}, 나이: ${member['age']}, 취미: ${member['hobby']}`)
        }
    }

}

team.introduce();