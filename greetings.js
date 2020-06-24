const form = document.querySelector("form"),
      input = document.querySelector("input"),
      greeting = document.querySelector('.greetings'),
      USER_LS = "currentUser"; 

//input.value값을 Local Storage에 저장하기.(새로고침해도 불러올 수 있도록)
function saveName(text){
    localStorage.setItem(USER_LS,text);
}

//form에서 submit 했을 때 처리하는 함수
function handleSubmit(event){
    event.preventDefault(); //submit 이벤트의 기본값을 kill(placeholder로 refresh되는 것)
    const currentValue = input.value; //현재 input의 value값(submit한)얻기
    paintGreeting(currentValue); //얻은 값을 paintGreeting 함수의 text로 "보내"준다! -->여기까지 하면 refresh 했을 때 reset되어버림.
    saveName(currentValue); //따라서 submit한 값을 저장해줘야 함.
}

//유저이름 물어보기
function askForName(){
    form.classList.add('showing');
    //form에 이름 넣고 submit했을 때 -> handleSubmit함수 실행
    form.addEventListener('submit',handleSubmit);
}

//유저이름 표시하기
function paintGreeting(text){
    form.classList.remove('showing'); //이름 입력 form 숨기기
    greeting.classList.add('showing'); //greeting 표시
    greeting.innerText = `안녕하세요 😃 ${text}님,`;
}

//이름 불러오는 함수(저장된 이름이 없으면 물어보고, 있으면 그걸로 표시하기)
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    //저장된 유저이름이 없을 때?
    if(currentUser === null){
        askForName();
    }
    //저장된 유저이름이 있을 때!
    else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();