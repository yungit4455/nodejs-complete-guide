96_Model View Controller (MVC)

앱을 만들때 코드를 구조화하는 특정 패턴을 따라야 한다. 
패턴이란 여러 파일로 나누는 방식이나 코드를 작성하는 방식이 아니라 코드를 논리적으로 나누는 것을 의미한다.
======================================================================================================================================
97_MVC 란?

쉽게 말하여 관심사를 분리하는 것이다. 코드의 여러 부분들이 각기 다른 기능을 가져서 어떤 부분이 어떤 작업을 책임지고 있는지 확실히 하는 것이다.
MVC는 Models, Views, Controllers 로 구성되어 있다.

- Models: 기본적으로 객체나 데이터를 나타내는 코드의 한 부분으로 데이터를 저장하거나 파일로부터 데이터를 주고받는 등 데이터 관련 작업을 할 수 있도록 한다.
- Views: 사용자가 보는 화면을 책임진다. html 자료에 올바른 내용을 렌더링해 사용자에게 보내는 역할을 한다. 애플리케이션 코드와 분리되어 있으며 뷰를 생성하기 위해 템플릿 엔진에 주입하는 데이터와 약간만 통합되어 있다.
- Controllers: 모델과 뷰 사이의 연결점이다. 뷰는 애플리케이션 논리와 상관이 없으먀 모델을 데이터를 저장하고 가져오는 역할을 하기 때문에 컨트롤라가 모델과 함께 데이터를 저장하거나 저장 프로세스를 유발한다. 뷰에서 가져온 데이터를 전달하는 경우도 컨트롤러가 돕는다. 즉, 컨트롤러는 중개인으로서 중간 논리를 포함한다. 컨트롤러는 작업할 모델과 렌더링할 뷰를 정의하는 역할을 한다. 
컨트롤러는 Routes와도 관련이 있다.

- Routes: 어떤 경로에 따른 http 메서드에 따라 어떤 컨트롤러 코드를 실행할지 정의한다.

바로 이것이 패턴이며 만든 앱처럼 Express가 내장된 앱은 미들웨어 개념을 기반으로 하고 있다. 컨트롤러는 미들웨어 기능 간에 분할되는데, 일부 논리가 분리되어 다른 미들웨어 기능으로 이동하는 것이다.