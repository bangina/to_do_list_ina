//내가 한 코딩(이대로 했을 때는 입력한 todo 내용이 출력되지 않았음)
//toDos를 따로 변수 선언해줘야 하는 것 같음. 정확한 이유는 모르겠음.
const TODOS_LS = 'toDos',
    toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = []; //empty array, 새로 입력되는 value값 받아서 계속 업데이트 되어야 하기 때문에 const(재할당불가)가 아닌 let(재할당가능)로 정의해야 한다.

//투두 삭제하는 함수. 
function deleteToDo(event) {
    //"어떤"버튼이 클릭(event)되었는지 구분해서 알아야 함.
    const btn = event.target;
    //클릭된 btn(타겟)의 부모인 li까지를 삭제해줘야 함.
    const li = btn.parentNode;
    //(console.dir(event.target)으로 조회해서 parentNode가 li임을 찾아냄)
    toDoList.removeChild(li);
    //위에서 li = target btn의 부모 요소로 정의되어 있으므로, toDoList의 자식요소 중에서 클릭된 li만 삭제됨.

    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id); //지울 타겟과 id가 같지 않은 obj만 반환
    });
    //filter : each item에서 함수 실행한 뒤, true를 return하는 것들만 filter한다.
    //toDo의 모든 item들의 id 중에서, li의 id와 일치하지 않는 것들을 필터링한다
    //toDo.id = 숫자 / li.id = string (-->parseInt로 string을 숫자로 변환)
    toDos = cleanToDos; //
    saveToDos();
}

//(toDoObj내용 넣은 뒤)toDos 저장하기, JS object를 string으로 변환
function saveToDos() {
    //localStorage.setItem(TODOS_LS,toDos.stringify);
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

//받은 toDoForm.value 값으로 리스트 표시하기
//HTML elements 만들어서 표시
function paintToDo(text) {
    const delBtn = document.createElement('button');
    const li = document.createElement('li');
    const span = document.createElement('span');
    const newId = toDos.length + 1; //ID 값(li 및 배열각각에 부여)
    span.innerText = text;
    delBtn.innerText = '❌';
    //X버튼 클릭시 deleteToDo 함수 실행
    delBtn.addEventListener('click', deleteToDo);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    //toDos 배열에 push할 toDoObj 생성
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos(); //내용 집어 넣은 toDos 배열을 저장
}

//LS에 저장된 투두리스트가 없을 때, 
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        //변환된 string을 JS object로 변환(parse)하여 이해할 수 있도록 정리.
        const parsedToDos = JSON.parse(loadedToDos);
        //toDo array의 요소별로 "각각" 함수 실행
        parsedToDos.forEach(function fx(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //입력한 값 없애주기
}

//투두리스트를 로드하고, form에서 submit발생하면 handleSubmit 실행
function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}
init();