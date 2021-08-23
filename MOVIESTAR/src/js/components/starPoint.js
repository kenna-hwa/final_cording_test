const starImageSourceMap = {
    //호버 상태에 따른 이미지 맵핑 객체
    // 별점에 호버를 했을 때 별의 모양이 달라져야 한다.  
    empty : './src/images/icon_empty_star.png',
    half : './src/images/icon_half_star.png',
    full : './src/images/icon_star.png',


}


class StarPoint {
    constructor(){
        // constructor 생성자 함수
        this.starContentElement = document.querySelector('.content-star');
        // 별점의 가장 상위 부모 요소
        this.starBackgroundElement = this.starContentElement.querySelector('.star-background');
        // starContentElement의 자식 요소로 별점 이미지를 감싸는 div
        this.starimages = this.starBackgroundElement.querySelectorAll('img');
        // 이미지들을 전부 선택하기 위해 querySelectorAll 사용해 img 태그를 선택
        // 배열과 같은 형태로 저장이 된다. 
        this.starPointResetButton = this.starContentElement.querySelector('.icon-remove-star');
        // 별점을 리셋할 x 표시 버튼을 선택한다.
        this.lockedStarPoint = false;
        // 별점이 고정되어 있는지 아닌지 상태를 알려주는 변수.
        // 클릭을 했는지, 별점을 고정했는지 확인하는 변수다.
    }

    setup(){
        this.bindEvents();
    }

    // 별점의 상태에 대한 함수 세가지

    // 1번 : 별점을 고정된 상태로 만들어 준다.
    lockStarPoint(){
        // lockStarPoint() 함수가 실행되면 lockedStarPoint 변수의 false 값이 true로 바뀐다.
        this.lockedStarPoint = true;
    }

    // 2번 : 별점을 고정되지 않은 상태로 만들어 준다.  
    unlockStarPoint(){
        this.lockedStarPoint = false;
    }

    // 3번 : 현재 별점의 상태를 반환한다. 
    isLockedStarPoint(){
        return this.lockedStarPoint;
    }


    bindEvents(){
    // 별점에 hover가 된 위치에 따라 별점을 채워주는 기능
    // 마우스 move 이벤트
    // 마우스를 move 할 때 마다 이벤트가 발생된다
    this.starBackgroundElement.addEventListener('mousemove', (event)=>{
        // 구조분해할당을 이용해 const target = event.target; 을 const {target} = event;로 변경
        // event.offsetX는 target 요소에서 마우스 포인터의 x축 위치를 반환
        // event.offsetX의 offsetX를 currentUserPoint라는 이름으로 변경
        if(this.isLockedStarPoint()){
            return;
            // 만약 lockedStarPint의 값이 true(고정된 상태)면 움직임을 중단 시킨다.
            // 별점이 고정되어 있다면 이벤트 핸들링 중지
        }

        const { target, offsetX : currentUserPoint } = event;
        // offsetX : 타겟 요소에서 마우스 포인터의 X축 위치를 반환
        const { point } = target.dataset;
        // dataset은 data-point로 선언한 attribute를 말한다.
        const starPointIndex = parseInt(point, 10) -1;
        // 위에서 선언한 point 값을 parseInt로 10진수로 만들어준다.  
        const [starimageClientRect] = target.getClientRects();
        // getClientRect()는 target 요소에 좌표와 크기에 대한 정보를 받아온다.
        // 그 값은 객체로 표현되고 그 중에 0번째 값이 우리가 필요한 값이다.
        // target.getClientRects() 을 배열을 사용해 구조분해할당한다. 
        //이렇게 두면 target.getClientRects();값의 0번째 값이 starimageClientRect에 배열로 들어가게 된다.
        // const starimageClientRect = target.getClientRects()[0];
        // 위의 코드가 맞는 코드이지만 구조분해할당이라 자동으로 들어간다.
        // 요소의 좌표와 크기에 대한 정보를 반환
        const starImageWidth = starimageClientRect.width;
        console.log(starImageWidth)
        // starimageClientRect를 통해 알아낸 타겟 요소의 크기와 위치를 알아낼 수 있다. 
        // starimageClientRect의 width 값을 통해 별모양의 넓이 값을 알아낼 수 있다.
        // 따라서 마우스의 위치가 별의 반절을 넘었는지 안넘었는지를 알아내면 된다.
        const isOverHalf = starImageWidth / 2 < currentUserPoint;
        // 마우스 위치가 별점의 반절을 넘어가면 별이 전부 채워져야 한다. 
        // 반절을 넘어가면 isOverHalf에 true 값이 저장되고 아니면 false값이 저장되어야 한다.
        // 

        this.renderStarPointImages({drawableLimitIndex: starPointIndex, isOverHalf});
                // 객체를 전달인자로 가진다. drawableLimitIndex 라는 key값과 starPointIndex (img 태그의 data-point 값을 인자로 가지는 변수) 그리고 isOverHalf 값을 준다.
        // 이 함수는 bindEvents 함수 밖에서 새로운 함수로 선언한다. 
        });


        this.starBackgroundElement.addEventListener('click', () => this.lockStarPoint());
        // 마우스 클릭 시 별점 고정

        this.starPointResetButton.addEventListener('click', ()=>{
            this.unlockStarPoint();
            this.resetStarPointImages();
        // 리셋버튼 이벤트 할당
        });

        this.starBackgroundElement.addEventListener('mouseout', () => {
            !this.isLockedStarPoint() && this.resetStarPointImages();
            // 마우스 아웃할 때 별점이 고정되지 않으면 별점을 빈 별로 초기화 
            // &&연산자는 첫 번째 피연산자가 true일 때 두 번째 피연산자를 반환한다.
        })
    }


    renderStarPointImages(payload = {}){
        // 인자로 객체를 전달 받는다.
        const { drawableLimitIndex = -1, isOverHalf = false } = payload;
        // drawableLimitIndex의 초깃값으로 -1을 넣어주고 isOverHalf의 초깃값으로 false를 할당한다. 만약 값이 들어오지 않으면 -1과 false가 나올 수 있도록 한다. 
        // 위의 초깃값은 전달받은 payload의 key 값을 초기화 시킨다. 

        // 이미지 태그를 한 번 쭉 훑어주는 함수가 필요하다.
        // 훑어주는 이유: 별점 위를 마우스 호버를 했는데 그 값을 통해서 starImages의 이미지 소스 값을 꽉 찬 별을 해줄건지 반절만 찬 별을 해줄건지 빈 별을 해줄건지 이미지들을 돌아가면서 판단을 해주고 거기에 알맞은 이미지 src소스 값을 집어넣어야 한다.
        //this.starImages.forEach((starimage, index)=>{

        //});
        // index는 상태값으로 forEach문이 얼마나 starImages를 돌았는지 알려준다.
        // starImages는 이미지 태그의 배열이다. 하지만 실제 Array 배열은 아니다. 
        // NodeList라는 배열과 같은 리스트 형태를 말한다. NodeList != Array
        // 인터넷 익스플로러에서는 NodeList에 forEach를 사용하는 것이 불가능하다. 그래서 호환성을 위해 NodeList를 Array로 바꿔줘야 한다.  
        //Array의 prototype에 접근해서 call 메소드로 forEach문을 실행해준다.
        Array.prototype.forEach.call(this.starimages, (starimage, index)=>{

            // NodeList != Array. call을 통해서 호출하는 객체를 Array에서 NodeList 객체로 재할당
            let imageSource = index < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;
            // 삼항연산자 이용  :  index가 drawableLimitIndex보다 작으면 starImageSourceMap.full 반환하고 크면 starImageSourceMap.empty를 반환한다.
            // drawableLimitIndex : 호버한 별의 위치
            // 현재 순환 순서보다 마우스가 호버된 별의 인덱스가 크다면 꽉찬별, 아니면 빈별을 채운다.
            if(drawableLimitIndex === index){
                imageSource = isOverHalf ? starImageSourceMap.full : starImageSourceMap.half;
            }
            // 현재 순환 순서와 마우스가 호버된 별의 인덱스가 같은 경우
    
            starimage.src = imageSource;
            // 현재 순환중인 이미지에 src값을 할당
       

        });
        // call은 forEach 메소드를 호출하는 객체를 변경해줄 수 있다. 그래서 call 매개변수로 this.starImages를 넣어준다. 이러면 call을 통해 forEach 메소드를 빌려올 수 있다. 
        // 위와 같이 call 메소드로 함수를 실행하게 되면 NodeList에도 forEach문을 문제없이 돌릴 수 있다.

    }

      resetStarPointImages(){
        this.renderStarPointImages();
     }
}
export default StarPoint;