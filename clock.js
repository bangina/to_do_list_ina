//시계 만들기
const clockTitle = document.querySelector("h2");

function getTime() {
    const date = new Date(); //시간객체 D 대문자로
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours<10 ? `0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
    //Ternary Operator(삼항연산자) : ${조건 ? True시 실행값 : false시 실행값};
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();