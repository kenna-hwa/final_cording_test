import Favorite from "./components/favorite.js";
import StarPoint from "./components/starPoint.js";


const favorite = new Favorite;

// 상수 favorite을 선언하고 new 키워드를 이용해 Favorite클래스의 인스턴스를 생성

const starPoint = new StarPoint;


favorite.setup();
// Favorite의 인스턴스의 setup 메소드 실행

starPoint.setup();
