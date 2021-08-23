class Favorite {
    constructor(){
        this.favoriteElement = document.querySelector(".content-favorite");
// this는 클래스가 생성한 인스턴스를 가리키고 인스턴스 안에 favoriteElement라는 프로퍼티를 만든다.
// Favorite 객체 { favoriteElement : .content-favorite }
    }

    setup(){
        this.bindEvents();
    }
    // bindEvent()함수를 실행하는 메소드

    bindEvents(){
        // 이벤트 리스너 처리
        this.favoriteElement.addEventListener('click', (event)=>{
            // 리스너 함수
            const cPath = event.composedPath();
            // composedPath는 이벤트의 경로를 배열값으로 반환한다는 뜻
            // 상수 cPath를 선언하고 event 객체에 composedPath 설정
            // 이벤트 경로란 이벤트가 전파되는 경로

            const element = cPath.find(element => element.tagName == "BUTTON")
            // 배열 cPath에 find 함수를 이용해 find 함수 안에 함수의 조건을 통화한 것만 Element에 담기도록 한다.

            if(!element){
                return;
            }
            //조건문으로 예외처리. element가 없으면 return으로 아무것도 실행시키지 않는다.
            element.classList.toggle('on');
            // element가 없으면 그냥 지나가고, element가 있으면 on 클래스를 toggle(있으면 뺴고 없으면 넣음)
        });
    }
}
// 이벤트 위임
// 부모에게 이벤트를 걸어서 이벤트가 아래로 내려가도록


export default Favorite;