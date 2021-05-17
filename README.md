### 1. 엔트리와 ROS 연동하기
엔트리 블록 명세 작성하는 법을 참고해, 엔트리와 ROS를 연동하는 카테고리를 만들어줬다.
기존의 14개 카테고리 외에 ROS 카테고리를 하나 더 정의해줬다.

#### (1)ROS 카테고리 추가

![ros카테고리](https://user-images.githubusercontent.com/59854960/117400965-a1a96b00-af3e-11eb-90e5-212521f99611.PNG)

맨 아래에 ROS 카테고리를 추가해줬다.

#### (2)ROS 카테고리 내 블록 추가

![ROS 카테고리](https://user-images.githubusercontent.com/59854960/117401160-01a01180-af3f-11eb-97a2-c97f7dc1c3bb.PNG)

다음과 같이 5개의 카테고리를 추가해줬다.

#### (2-1)초음파 센서 SUB

초음파 SUB 하면 리스트를 생성해준다.
리스트에 초음파 8개 값 받아와서 리스트에 띄워준다.

![초음파 리스트](https://user-images.githubusercontent.com/59854960/117593049-c8051b80-b175-11eb-97f0-c94837c41236.PNG)

리스트는 위와 같이 생성된다.

![초음파 실행](https://user-images.githubusercontent.com/59854960/117593048-c63b5800-b175-11eb-8ae5-377e2f0c041c.PNG)

초음파가 실행되면 받아오는 초음파 값에 따라 리스트가 계속 변화한다.

#### (2-2)카메라 센서 SUB

엔트리 캔버스에 SUB 해온 카메라 영상이 뜬다.

#### (2-3)motor 메세지 PUB

motor에 angle과 speed 값을 pub 해준다.

![예제_초음파,조향](https://user-images.githubusercontent.com/59854960/118233127-77baf000-b4cc-11eb-9247-14f499a39c4e.PNG)

#### (3)최종


![최종_1](https://user-images.githubusercontent.com/59854960/118233308-b355ba00-b4cc-11eb-8ce6-30ee5aaf3024.PNG)

최종적으로 위와 같이 완성되었다.
