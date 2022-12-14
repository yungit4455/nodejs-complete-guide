464_What is "Testing"?

                                        <Code>                 "Code that tests your code"
            Manually test code -----------|-----------------| Automated code testing
Pro: Use app like your actual users              Pro: Cover all core features and run 
Con: Easy to forget a test or test too little    automatically after every code change
                                                 Con: Only tests what you define, hard to test UI

여태까지는 코드를 작성하고 페이지에 들어가거나 API에 요청을 보내는 식으로 직접 테스트했다. 가장 큰 이점은 페이지를 직접 볼 수 있다는 점이다. 사용자가 보게 되는 페이지를 미리 확인할 수 있고 개발자로서 원하는 대로 API와 상호 작용할 수 있기 때문에 매뉴얼 테스트는 아주 중요하다. 
하지만 단점도 있다. 테스트 자체를 잊어버리거나 일부분만 테스트할 수 있다. 특히 코드를 변경할 때 의도치 않게 앱의 일부분을 중단하고도 의식하지 못해서 따로 테스트하지 않을 수도 있다. 시간이 지나서 혹은 아예 오류를 잡지 못하면 문제가 될 것이다. 또한 앱의 모든 기능을 테스트하거나 코드를 변경할 때마다 테스트하기 어려우므로 테스트 자동화가 필요하다.
테스트 자동화는 코드를 테스트하는 코드를 작성하는 것이다. 실행되는 과정을 정의하고 테스트할 시나리오들을 정의해 중요한 변경 사항이 생길 때마다 자동으로 테스트를 실행하도록 설정해 원하는 대로 실행할 수 있다. 배포 과정에도 포함해서 앱이 배포되기 전에 테스트를 실행해 테스트 중 일부라도 실패하면 오류를 나타내게 할 수도 있다. 그럼 테스트를 살펴보며 오류를 찾고 고칠 수 있다.
테스트 자동화의 가장 큰 이점은 모든 핵심 기능을 살펴보고 테스트를 진행할 모든 시나리오를 정의해서 변경 사항을 만들었을 때 앱이 중지되지 않도록 한다는 것이다.
당연히 단점도 있다. 테스트하는 코드에 시나리오를 잘못 입력해서 모든 테스트에 문제가 일어나지 않는 것이다. 또한 정의해둔 부분만 테스트할 수 있고 사용자가 보는 화면을 볼 수 없어서 UI를 테스트하기 어렵다.
===========================================================================================
465_Why "Testing"?

테스트 자동화는 모든 코드를 자동으로 테스트하도록 한다. '모든' 뒤에 별표가 붙은 이유는 정의한 것에 한해 모든 코드를 테스트하기 때문이다. 작성한 테스트만 진행한다. 하지만 이론상으로는 코드가 수정될 때마다 앱의 모든 부분을 테스트할 수 있기 때문에 코드 수정 후 예상치 못한 곳에서 문제가 생기더라도 어디서 코드가 잘못됐는지 쉽게 감지한다. 특히 테스트 자동화를 통해 테스트 과정이 예상 가능하도록 분명하게 정의할 수 있다. 
이렇게 코드에 과정을 정의해두기 때문에 테스트가 항상 같은 방식으로 실행된다. 다시 말해, 항상 시나리오가 같다는 가정 아래 테스트를 진행하는 것이다. 앱을 직접 테스트하는 경우에는 지난번과 같은 과정을 반복한다고 해도 실수로 한 단계를 건너뛰는 등 완전히 동일하지 않을 수도 있다. 그래서 테스트가 필요하다.

Testing Tools & Setup

Node.js를 이용해 서버에서 뷰를 렌더링하는 페이지든, REST API, GraphQL API를 구축하든지 간에 테스트가 자동으로 실행되도록 만들어야 한다. 완성한 코드를 테스트하는 코드를 실행하기 위해서는 몇 가지 툴이 필요하다.
우선 테스트 코드를 실행하는 툴이 필요하다. 코드를 실행할 뿐만 아니라 테스트를 통과했는지 실패했는지 결과를 알려주는 툴이다. 테스트 실행에 필요한 프레임워크로는 Mocha가 유명하다. 
두 번째 툴은 코드 실행에서 나아가 충족해야 하는 일정 조건을 정의해서 특정 결과만 나오도록 한다. 특정 시나리오, 즉 테스트가 성공했는지 알려면 어떤 경우에 성공이라고 간주하는지 테스트에 정의해서 테스트 결과를 검사해야 하는데 테스트의 모든 과정에는 여러 툴이 필요하다. 이때는 Chai가 유명하다. Jest라는 대안도 있다. 
Side Effects(부작용)을 관리하고 외부 의존성이나 복잡한 시나리오를 다룰 때는 Sinon이라는 툴을 이용해 stub 및 mock를 생성한다. 
===========================================================================================
466_테스트 설정 및 작성

원활한 테스트 자동화 학습을 위해서 async/await로 REST API를 막 끝낸 시점의 프로젝트로 돌아간다. 
테스트를 위한 패키지를 설치한다.
    npm install --save-dev mocha chai

우선 package.json의 scripts 섹션에서 "test" 스크립트가 있을 것이다. 없으면 추가한다. 디폴트 값은 쓸모없으니 지우고 mocha 를 입력한다.
package.json => scripts
    "test": "mocha --timeout 5000"
- 옵션으로 --timeout을 작성하고 숫자를 입력하면 타임아웃에 필요한 시간을 조절할 수 있다. 단위는 ms이다. 디폴트는 2000이다. 추후 DB에 접근하려면 5000 정도로 설정한다.

이제 Terminal에 npm test를 입력하면 프로젝트에 정의된 모든 테스트가 실행된다. 당연히 지금은 아무 테스트도 없다. Mocha는 디폴트로 'test'라는 폴더를 찾는다. 그러므로 루트 디렉토리에 test 폴더를 생성한다. tests 등의 다른 이름은 안 된다. 여기에 테스트 코드를 가질 파일을 정의한다.
파일 이름은 상관없지만 .js 파일이어야 한다. start.js 파일을 생성해본다.
start.js =>
    const expect = require('chai').expect;

    it('should add numbers correctly', function() {
        const num1 = 2;
        const num2 = 3;
        expect(num1 + num2).to.equal(5);
    })
    it('should not give a result of 6', function() {
        const num1 = 3;
        const num2 = 3;
        expect(num1 + num2).not.to.equal(6);
    })
- 테스트 코드는 it으로 시작한다. Mocha가 제공하는 기능이다. 함수 이름이 이상해 보이지만 테스트에 이름을 붙이면 평범한 영어 문장으로 읽히도록 두 개의 인수를 가진다. 
- 첫 번째는 테스트를 설명하는 문자열이다. 테스트 결과에 나오므로 테스트 성공 여부를 구별하는 데 도움을 준다. 함수 이름과 합치면 마치 영어 문장처럼 읽힌다.(It should add numbers correctly) 이론상으로 아무 텍스트나 상관없지만 이런 식으로 문장을 쓰는게 보편적이다. 
- 두 번째 인수가 중요하다. 테스트 코드를 정의하는 function()을 넣는다. 모델이나 컨트롤러에 도달해 테스트하도록 말이다.
- 성공 조건을 정의한다. 이를 위해 Chai가 필요하다. Mocha는 테스트를 실행하고 테스트 코드를 정의하는 it 함수를 제공한다면 Chai는 성공 조건을 정의하는 역할을 한다. should라는 카워드로 조건을 다르게 정의할 수도 있지만 여기선 expect를 사용한다. 테스트 조건을 작성하는 방법에만 차이가 있다. expect를 함수로 호출하고 테스트하고자 하는 코드나 결과를 인수로 전달한다. 이 경우에는 num1 + num2 이다. 
- 예상 결괏값을 정의한다. 영어 문장을 작성하는 것과 비슷한데 Chai가 반환할 객체에 몇 가지 속성을 준다. to 같은 속성이 그것이다. to에는 또 다른 객체로 equal 함수를 사용할 수 있으며 equal()에 테스트 결괏값을 정의한다. 위의 예제에서는 num1 + num2가 5가 나오기를 기대하고 있다.

다시 npm start를 실행하면 test 폴더를 찾아 모든 테스트와 파일을 실행하고 터미널에 결과가 출력된다.
===========================================================================================
467_auth middleware test

위에서는 테스트 패키지 사용법을 알아보았다. 단순히 자바스크립트 코드를 실행한 것에 불과하므로 의미는 없다. 내가 작성한 코드를 테스트해보자. auth-middleware.js 파일을 생성하고 is-auth.js 파일을 임포트한다.
auth-middleware.js =>
    const authMiddleware = require('../middleware/is-auth');

첫 번째 테스트는 권한 헤더가 없을 때 실제로 오류가 발생하는 지 확인하는 것이다.
    it('should throw an error if no authorization header is present', function() {
        const req = {
            get: function(headerName) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
    });
- function의 안에 off middleware manual을 호출하면 좋은데 왜냐하면 전체 요청 플로우를 시뮬레이션하는 게 아니기 때문이다. 사용자가 클릭하여 요청을 전송하고 미들웨어를 트리거하는 동작을 시뮬레이션할 게 아니다. 
- 더미 req을 작성하는 이유는 해당 객체가 res, next 처럼 express 미들웨어에서 일반적으로 전달되기 때문이다.
- 여기선 직접 요청 객체를 정의했는데 다양한 시나리오를 정의할 수 있어서 유용하다. 
- get: function을 is-auth 미들웨어에서 호출하므로(const authHeader = req.get('Authorization')) 객체가 get: function을 가져야 하며 실제로는 이 get: function이 권한 헤더의 값을 반환한다. 물론 express가 제공하는 get 메서드는 훨씬 복잡하다. 헤더의 스캔뿐만 아니라 들어오는 요청의 다양한 부분도 스캔한다. 여기서의 목표는 get 메서드가 권한 헤더를 반환하지 않는 시나리오를 작성하는 것이다. 즉 이 함수는 단순히 null을 반환한다.
- auth 미들웨어에선 get 메서드에 대한 'Authorization' 문자열을 전달하고 있는데 이를 위해 인수를 추가할 수는 있다.(headerName) 물론 지금 필요는 없다. 
- 이후 auth 미들웨어를 호출해서 다른 요소가 빠진 request 객체를 전달할 수 있다. res는 빈 객체를 전달하는데 이 응답 객체에 관련된 걸 전혀 테스트하지 않기 때문이다. next도 다음 단계를 테스트하지 않으니 빈 화살표 함수만 전달한다.
- throw는 메시지와 함께 오류를 출력할 것을 예상한다.
- 미들웨어를 직접 호출하면 에러가 발생한다. 인증 미들웨어에서 직접 에러를 출력하는 것이다. 테스트하는 프레임워크에서 호출하게 해야한다. 즉, mocha, chai에 미들웨어의 참조만을 expect 함수에 전달한다. 그리고 테스트 설정이 함수를 호출할 때 전달하려는 인수를 bind한다. 이때 bind는 this 키워드에 대한 입력값을 요구한다. 이제 준비된 참조를 expect로 전달하게 된다.

이와같은 테스트 방식은 미들웨어 함수만을 테스트하는 것인데 이것을 Unit test(유닛 테스트) 라고 한다. 일반적으로 유닛은 함수다. Integration test(통합 테스트)은 좀 더 완성된 플로우를 테스트한다. 요청이 올바르게 라우트되는지, 모든 미들웨어와 컨트롤러 함수까지 테스트할 수 있다. 그러나 그 정도로 긴 체인을 테스트하는 것은 복잡하기 때문에 자주 진행하지 않는다. 따라서 실패할 만한 변수들이 다수 존재한다. 반면 유닛 테스트는 모두 성공했다면 앱의 실행을 어느정도 보장해주기 때문에 매우 유용하다. 또한 실패하더라도 알아내기가 쉽다.
===========================================================================================
468_여러 테스트 구성

테스트를 더 추가해본다.
    it('should throw an error if the authorization header is only one string', function() {
        const req = {
            get: function() {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });
- 토큰 값으로 'xyz'를 갖도록 한다. 
- 이전의 예시처럼 정확한 오류 메시지를 확인할 수 있으나 확실하지 않거나 오류의 출력 여부에만 관심이 있다면 인수를 전달하지 않고 throw만 확인할 수 있다.

테스트하면 성공한다. 즉, 'xyz' 토큰을 전달하면 실패했다는 뜻이다.

더 많은 테스트를 추가할수록 출력값을 읽기 어려워진다. 이를 위해 Mocha에서 테스트 정의 및 조직함에 있어 it 함수 이상을 제공한다. describe 함수로 테스트를 묶어서 원하는 만큼 describe 함수 호출을 중첩할 수 있다. 즉, 각자의 내부에 describe 함수가 여러개 존재할 수 있다. 
describe 함수는 제목을 가질 수 있는데 영어 문장처럼 읽히는 문장이 아니라 설명하는 그룹에 대한 헤더, 예를 들어 Auth Middleware 등이 있다.
describe는 두 번째 인수로 함수를 가지며 함수 내부로 it 함수 호출이 이루어질 때마다 모든 테스트 Case(사례)를 전달한다. 즉, 이제 위의 테스트 케이스들은 describe 함수 내부에 존재한다.
    describe('Auth Middleware', function() {
        it('...', function() {
            ...
        }
        
        it('...', function() {
            ...
        }

        describe('...', function() {
            ...
        });
    });

테스트해보면 헤더가 생성되어 테스트들이 소속된 파일이나 앱의 코드 영역을 확인하기 더 쉬워졌다.
===========================================================================================
469_테스트하지 말아야 할 것!

토큰은 어떻게 테스트할까? 정확하지 않은 토큰에 대해 실패를 유도하는 방법은 무엇일까? 
몇 가지 중요한 요소들이 있는데 verify 함수가 올바르게 작동하는지 테스트해서는 안 된다. 즉, 실제로 토큰을 올바르게 확인하는지 테스트하면 안 된다. 왜냐하면 우리가 보유한 함수나 메서드가 아니기 때문이다. 이 앱에서는 제3자 패키지인 jsonwebtoken을 사용하므로 코드를 테스트하여 작동을 보장하는 것은 패키지 제공자 측에서 할 일이다. 외부 디펜던시를 테스트할 필요가 없다. 따라서 토큰 확인에 실패하거나 성공했을 때 우리의 코드가 올바르게 작동하는지 만을 테스트한다.
만약 코드가 잘 작동하는지를 테스트하려면 실패를 테스트하는 쪽이 쉽다. 이 패키지에서 확인되지 않은 토큰을 쉽게 전달할 수 있는데 어떤 토큰이 우리에게 생성되는지를 모르기 때문이다. 토큰은 굉장히 긴 문자열이라서 추측할 수 없다. 즉, 우리가 함수에 전달하는 내용은 이 verify 단계에서 아마 실패할 것이다. 

auth-middleware.js =>
    it('should throw an error if the token cannot be verified', function() {
        const req = {
            get: function() {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

verify 함수에서 오류가 출력될 것이므로 이 테스트는 반드시 성공한다. 반대로 유효한 토큰인지를 테스트할 경우 다른 테스트를 작성할 수 있다. 이때 토큰을 decode(해독)하여 우리에게 반환되는 객체에 userId가 있어야 한다.
    it('should yield a userId after decoding the token', function() {
        const req = {
            get: function() {
                return 'Bearer sadadaqwedkndekslfhadwqkjdhasidak';
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

req에 userId가 추가되도록 인증 미들웨어를 수동으로 호출하여 요청과 응답 객체 그리고 빈 next 함수를 전달한다. 

    it('should yield a userId after decoding the token', function() {
        ...
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
    });
- 이 미들웨어를 실행하면 요청 객체에서 새 속성을 예측하는데 새로운 속성인 userId 속성을 추가했기 때문이다. req.userId가 특정 값과 동일한지 비교하거나 이름이 'userId'인 to.have.property를 입력해도 된다. userId는 토큰이 유효한 경우 예측할 수 있는 부분이다. 

테스트를 실행하면 실패한다. 토큰이 지나치게 짧아 jwt의 verify 메서드의 기준을 충족하지 않아 오류가 출력된다.
실패하는 경우를 늘 테스트할 수는 없으나 성공하는 케이스는 테스트할 텐데 왜냐하면 오류로 인해 실패하지 않으나 단순히 해당 코드가 존재하지 않기 때문에 userId가 요청에 저장되지 않는 시나리오가 앱에 존재할 수 있기 때문이다. 해당 userId는 이후 컨트롤러에서 가져오려고 시도하겠지만 컨트롤러에서는 에러를 출력하지 않는다. 따라서 이런 테스트가 매우 중요해진다. 왜냐하면 여기에서 미들웨어를 실행한 뒤 userId가 req 객체에 저장되었는지를 테스트하기 때문이다. 

이러한 에러를 발견하려면 verify 메서드를 끄는 방법이 필요하다. 입력한 토큰이 유효하지 않다는 사실은 이미 알고 있다. 그러나 이 테스트에서는 관계없다. 토큰의 유효성과는 상관없이 유효한 토큰에 대해 우리의 앱이 올바르게 작동하는가를 테스트하는 것이 목적이다.
===========================================================================================
470_Stubs 사용

이러한 문제를 해결하려면 stubs나 mocks를 사용하는데 검증 메서드를 보다 단순한 메서드로 교체하는 것이다. 
테스트 파일에 jwt 패키지를 임포트하고 jwt.verify를 호출한 뒤 새로운 함수와 동일하게 설정해준다.
    it('should yield a userId after decoding the token', function() {
        ...
        jwt.verify = function() {
            return { userId: 'abc }
        }
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
    });
- 실제로 jwt 패키지에 있는 verify 메서드를 덮어쓰는 구문이다. 이렇게 덮어쓸 때 모듈 임포트가 node.js에서 작동하는 방식은 한 개의 전역 패키지가 있으므로 가능하다. 즉 커스텀 함수로 변경되며 테스트를 실행하면 변경한 함수로 실행된다. 

테스트를 실행하면 의도한대로 테스트를 진행할 수 있게 되었다. 그러나 수동으로 덮어쓰면 큰 단점이 존재한다. 방금 작성한 테스트 코드를 그 전에 진행한 테스트 앞으로 옮기면 에러가 발생한다. 원래 있던 테스트도 토큰과 관계가 있는데 verify 메서드를 덮어씀으로써 오류가 절대로 발생하지 않게 되어버렸다. 즉, 다른 테스트에서 원본 verify 메서드를 필요로 했다면 새로 작성한 테스트에서 커스텀 함수로 교체해 버렸기 때문에 더 이상 사용할 수 없다. 

따라서 기능을 수동으로 스터빙 내지는 모킹하여 교체하는 것보다는 원본 설정을 복원해 주는 패키지를 사용하는 것이 좋다. 
    npm install --save-dev sinon
Sinon은 stub이라고 하는 원본 함수의 대체품을 생성하는 패키지인데 원본 함수를 쉽게 복원할 수 있다. 
    const sinon = require('sinon');
    ...
    sinon.stub(jwt, 'verify');
- sinon.stub을 호출하고 첫 번째 인수로 교체하려는 메서드가 있는 객체를 전달한다. 이 경우 jwt이다. 두 번째로 변경할 메서드 이름을 문자열로 전달한다.
- 이제 sinon은 디폴트로 공백 함수로 교체하고 특별한 기능을 수행하지 않는데 꼭 그것만은 아니다. 함수 호출을 등록하는 등의 기능이 있어 실행되는 요소의 종류와 관계없이 이 함수가 호출될지의 여부 등을 테스트할 수도 있다.
    jwt.verify.returns({userId: 'abc'});
- stub된 메서드에 접근하여 returns를 호출한다. verify 메서드는 sinon이 추가되어 실행될 수는 없으나 구성될 수 있는 객체를 최종적으로 확인한다. 또한 returns는 이 함수가 무엇을 반환할지 구성할 수 있게 해준다.
- jwt.verify를 호출할 때마다 실제로는 이 stub을 호출하는 것이다.
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    expect(req).to.have.property('userId', 'abc');
- 높은 완성도를 위해서 요청에 특정 값을 지닌 userId 속성이 존재하는지 테스트할 수 있다. 위에서 abc 값을 정의했으므로 일종의 중복 테스트에 해당한다. 
    expect(jwt.verify.called).to.be.true;
- verify 메서드가 호출되었는지 확인할 수 있다.
    jwt.verify.restore();
- 원본 함수를 복원한다. 기존 메서드를 스텁으로 교체했으면 반드시 복원해야 한다.

이렇게 외부 메서드를 교체하면서도 작업이 끝나고 모든 것을 복원하여 원본 기능이 필요한 다른 테스트도 잘 작동하는 방법을 배웠다.
===========================================================================================
471_컨트롤러 테스트

인증에서도 테스트를 더 추가할 수 있지만 컨트롤러로 넘어간다. 가입이나 로그인 같은 컨트롤러 기능에 라우트를 통해 접근하게 되고 최종적으로 요청을 발신하는 라우트 폴더에서 정의된다. 즉, 라우트에서 노출하는 건 API 엔드 포인드들이다. 
우리는 유닛 테스트를 작성하고 있다. 코드 내부에서 auth 미들웨어 같은 미들웨어를 테스트하는 중이다. 따라서 라우팅은 테스트하지 않는다. 로그인 요청의 발신 가능 여부는 테스트하지 않는다. auth 컨트롤러에서 로그인 기능을 실행했는데 왜냐하면 그 요청, 로그인 메서드의 실행을 전달하는 것은 express가 처리했기 때문이다. 앞서 말했듯 다른 라이브러리를 테스트하지 않는다. 
물론 컨트롤러에서 들어오는 요청에 이메일과 암호가 저장되어 있는지 테스트할 수도 있다. 그러나 이건 우리가 들어오는 요청을 시뮬레이션하여 설정 여부를 결정하므로 좋은 테스트는 아니다. 그러나 예를 들어 설정된 이메일이 없거나 해당 이메일을 가진  사용자가 존재할 때 제대로 작동하는지를 테스트할 수는 있다.
하지만 새로운 복잡도가 하나 추가되었는데 바로 DB이다. 컨트롤러에서는 user 모델과 상호작용 중인데 user 모델은 Mongoos 모델을 기반으로 한다. 그리고 배후에서 MongoDB를 사용한다. 그럼 DB는 어떻게 테스트할까?

활용할 수 있는 전략은 2가지가 있다. 하나는 실제로 DB 액세스에 의존하는 부분들을 stub이나 mock 하는 것이다. 예를 들어 findOne을 실행할 때 사전 정의된 결과를 반환하는 stub을 생성하여 이후 코드가 올바르게 작동하는지를 테스트한다. 이 경우 DB와 상호작용에 문제가 있거나 로그인할 때 해당 이메일을 가진 사용자가 존재하지 않는 경우 코드가 어떻게 작동하는지 등이 해당된다. 2가지 시나리오가 있으며 관련된 테스트 2가지를 작성할 수 있다. 두 시나리오 모두 결과적으로 오류가 발생한다. findOne이 실패하는 경우에도 출력된다. 물론 상태 코드는 달라야 한다. DB가 실패했다면 상태 코드는 500이고 사용자가 없는 경우 401을 사용한다.
우선 test 파일에 auth-controller.js 파일을 생성한다. 이전 파일에서 임포트를 그대로 가져오고 user 모델도 임포트한다. 
auth-controller.js => 
    describe('Auth Controller', function() {
        it('should throw an error with code 500 if accessing the database fails', function(done) {
            sinon.stub(User, 'findOne');
            User.findOne.throws();
            
            expect(AuthController.login);

            User.findOne.restore();
        });
    });
- 중요한 점은 오류를 발생시킬 stub으로 findOne 메서드를 완전히 교체하여 이 DB의 오류를 지어내고 있다는 것이다. 

여기에서의 예측은 auth 컨트롤러의 로그인 메서드가 호출되었을 때 오류를 출력하는 것이다. 이를 위해 auth 컨트롤러를 살펴보자. login 함수에 async 키워드가 존재한다는 것을 깨달았다. 즉, 이건 일반 함수가 아니라 비동기 함수라는 뜻이다. 최종적으로 프로미스를 사용한다는 걸 뜻한다. async/await은 프로미스의 더 깔끔한 구문이다. 이 함수에는 비동기식 코드가 존재하며 이것은 우리의 예측이 생각하는 대로 작동되지 않음을 뜻한다.
===========================================================================================
472_비동기 코드 테스트

auth controller의 프로미스가 작성 중인 테스트에서 결과적으로 오류를 반환하는지를 확인하려고 한다. 이를 위해 컨트롤러를 약간 조정한다. 끝부분에 return을 추가한다. 테스트 파일에서는 AuthConroller.login에 접근한다. 
controller/auth.js =>
    exports.login = async (req, res, next) => {
        ...
        try {
                ...
                return;
        } catch (err) {
            ...
            return err;
        }
    };

auth-controller.js =>
    it('...', function() {
        ...
        const req = {
            body: {
                email: 'test@test.com',
                password: 'abc123'
            }
        };

        AuthController.login(req, {}, () => {}).then(result => {
            console.log(result);
        });
        User.findOne.restore();
    });
- 여기에 암암리에 login 메서드에 프로미스를 반환하기 때문에 then을 추가할 수 있다. 그러면 login 함수가 완료된 이후 then이 실행된다.

테스트를 해보면 모두 통과되는 것이 이상하다. 콘솔에는 반환받은 err 객체가 출력되었다. 로그인에 성공한다면 아무것도 반환하지 않는다. 
    AuthController.login(req, {}, () => {}).then(result => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
    });
- expect(result).to.be.an하고 오류를 전달할 수 있다. Chai는 몇 가지 종류의 데이터를 탐지할 수 있는데 그중 하나가 오류이다. 다른 가능한 값으로는 String, Object, null, Promise 등이 있다.
- 이것이 오류일 것으로 예상하고 expect(result).to.have.property로 상태 코드 속성을 가지는 것을 예측한다. 에러 객체에는 500 상태 코드가 있을 것이다. 

다시 테스트를 실행하면 모두 통과한다. 그러나 이것은 거짓 통과다. 왜냐하면 Mocha는 이 테스트 케이스가 끝날 때까지 기다리지 않는다. 원인은 비동기 코드가 있기 때문인데 기본값으로 해당 비동기 코드가 해결되기를 기다리지 않는다. 테스트 코드를 위에서 아래로 동기적으로 실행하기는 하지만 프로미스가 해결될 때까지 기다려 주지 않는다. 
이를 위해 우리가 전달하는 함수에 done 인수를 전달한다. done 인수는 옵션이며 호출할 수 있는 함수이다. 즉, Mocha에서는 이 테스트 케이스가 끝난 뒤 호출할 수 있는 함수를 제공한다. 기본값으로는 맨 위에서 아래까지 코드를 실행한 뒤에 완료되지만 이 인수를 전달하면 호출을 기다려준다. 그리고 이후 비동기식 코드인 스니펫으로 호출할 수도 있다. 
    it('...', function(done) {
        ...

        AuthController.login(req, {}, () => {}).then(result => {
            ...
            done();
        });
        ...
    });
- 이전에는 이 테스트 케이스가 완료된 것으로 취급했었다. 이제 Mocha는 이 코드의 실행을 기다려준다.

테스트를 실행하면 또 통과할 것이다. 하지만 지금은 유효한 테스트이다. 예측하는 상태 코드를 500 이외의 다른 값으로 바꾸고 실행하면 오류 코드 500이 아니기 때문에 테스트에 실패한다. 만약 done 함수의 호출과 done 인수를 모두 제거하고 다시 실행하면 모든 테스트가 통과된다. 이때 인수에서도 반드시 지워야 한다. done 인수를 받으면 Mocha가 기본값으로 비동기식으로 실행되는 코드를 보유하는지 확인하기 때문이다.
===========================================================================================
473_테스트 DB 설정

DB에 접근하는 코드를 처리하는 방법으로 여러 가지가 있다고 했었다. 여태까지는 stub을 사용했었다. findOne 메서드를 넣은 stub을 생성해 테스트에 어떤 작업을 할지 정의한 후 restore()로 마무리했다. 실제 DB 접근을 막아서 테스트 실행이 빠르고 DB에 영향이 없다는 것이 중요하다. 테스트 도중에 DB에 데이터가 작성될 수도 있는데 적어도 Production 단계의 DB에 이런 일이 없어야 한다.
하지만 테스트만을 위한 DB를 사용하는 것도 하나의 방법이다. 단점은 테스트 시간이 더 오래걸린다는 것이고 장점은 현실적인 테스트 환경을 가질 수 있다는 것이다. 실제 DB에 도달해서 데이터를 작성하고 읽는다면 유닛 테스트뿐만 아니라 통합 테스트도 할 수 있다. 컨트롤러가 실행되는 플로우 전체를 알기 때문이다. 모델이 DB에 도달하면 데이터를 반환한다. 어떤 경우에는 모든 코드에 stub 함수를 쓰는 것보다 통합 테스트가 나을 수도 있기 때문에 지정된 테스트 DB를 사용하는 MongoDB를 위해 테스트 환경 설정하는 법을 알아보자.

auth.js 컨트롤러와 관련된 테스트를 하나 추가한다. auth.js의 getUserStatus 메서드에서 ID로 사용자를 찾을 때 테스트 DB에 해당 사용자가 있는지 확인한다. 테스트 코드 안에는 테스트 DB에 연결해서 해당 사용자가 있는지부터 확인한다. 사용자가 있다면 컨트롤러 액션이 user.status를 제대로 검색해서 응답에 상태 코드 200을 추가할 것이다.
    it('...', function(done) {
        mongoose.connect(MONGODB_TEST_URL)
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'abc123',
                    name: 'Tester',
                    posts: [],
                    _id: '5c0f66b979af55031b34728a'
                });
                return user.save();
            })
            .then(() => {

            });
    });
- DB 연결을 위해 Mongoose를 불러온다. app.js에서 사용한 것과 동일한 구문을 사용할 수 있다. 사용자의 이메일 비밀번호는 아무거나 상관없다. 중요한 것은 연결하는 DB를 테스트용으로 수정해야 한다. 절대로 생산 DB를 사용해서는 안 된다. 
- req 객체를 생성하여 userId를 넣어야 하므로 _id가 필요하다. 문자열의 형식은 상관없는데 첨부된 문자열이 MongoDB의 유효한 ID 문자열이므로 사용했다.
- 연결에 성공해도 app.listen(8080)을 설정하는 대신 테스트를 설정한다.
- 테스트 논리 이전에 더미 사용자를 생성한다. user.js 모델에서 정의한 것처럼 필요한 필드를 입력한다. 디폴트가 정의된 필드는 설정할 필요없다.
- user.save를 호출한 후 프로미스를 반환할 테니 then 블록을 추가해 조금 전에 설정하고 DB에 저장한 더미 사용자를 사용한다.
===========================================================================================
474_활성 DB로 코드 테스트

이제 테스트 논리를 작성한다. 컨트롤러 폴더의 auth.js 파일을 보면 findById로 사용자를 찾으니 userId 필드가 필요하며 응답 객체에는 status 메서드와 json 메서드를 호출했다. 즉, userId가 있는 요청 객체를 전달하고 status, json 메서드가 있는 응답 객체를 전달하며 거기에 상태 관련 데이터를 설정해야 한다. 이때 실제 응답 객체가 아니라 임의의 응답 객체를 전달해서 테스트를 용이하게 할 수 있다.

    it('...', function(done) {
        mongoose.connect(MONGODB_TEST_URL)
            .then(result => {
                ...
            })
            .then(() => {
                const req = { userId: '5c0f66b979af55031b34728a' };
- req 객체에 _id를 전달하여 해당 사용자가 존재하는지 찾을 수 있다.
                const res = {
                    statusCode: 500,
                    userStatus: null,
                    status: function(code) {
                        this.statusCode = code;
                        return this;
                    },
- res는 빈 객체가 아닌 status, json 메서드를 호출하고 user.status를 저장할 곳과 응답 상태 코드를 지정한다.
- 메서드를 변경할 수 있으니 json을 호출할 수 있다. 그러려면 return this; 가 필요하다. 
                    json: function(data) {
                        this.userStatus = data.status;
                    }
                }; 
- json function을 추가해 인수에 data를 넣는데 이때 데이터는 user.status인 status 키를 가진 객체이므로 this.userStatus = data.status; 으로 설정한다. status 키를 가진 객체를 추출해서 this.userStatus에 저장한 것이다.
                AuthController.getUserStatus(req, res, () => {}).then(() => {
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.userStatus).to.be.equal('I am new!');
                    done();
                });
            });
    });
- 테스트 코드를 실행한다. 이때 getUserStatus 메서드는 프로미스를 반환해야 한다.
- 마지막으로 done을 호출해 Mocha 실행을 종료한다.

테스트를 실행하면 통과한다. 시간이 조금 오래 걸리는데 만약 timeout이 나타나면 시간을 늘리기 위해 package.json의 scripts에서 mocha 뒤에 --timeout 5000 등으로 설정한다. 숫자는 ms 단위이고 디폴트는 2000이다. 
확실히 하기 위해 status를 수정하고 재실행해보면 timeout 에러가 나온다. duplicate key 에러인데 새로운 사용자를 생성하려고 했더니 이미 같은 ID의 사용자가 존재하는 탓이다. 
또한 프로세스가 자동으로 끝나지 않고 직접 컨트롤+C를 눌러 중단해야 한다.
===========================================================================================
475_테스트 설정 정리

프로세스를 직접 종료해야 했던 이유는 무엇일까? done()을 호출해도 Mocha는 이벤트 루프에 실행 중인 프로세스가 있다고 감지한 것이다. DB 연결 후 중단한 적이 없으니 맞는 말이다. 따라서 테스트가 끝나면 mongoose.disconnect를 호출해서 then 블록 안에서 done()을 호출하는 것이 첫 번째 작업이다.
    AuthController.getUserStatus(req, res, () => {}).then(() => {
        ...
        mongoose.disconnect().then(() => {
            done();
        });
    });

사용자 설정에서 중복 키 오류가 났었다. 하드코딩한 id가 중복되어 실패한 것이다. 테스트가 끝난 후 disconnect 이전에 모든 사용자를 제거하는 코드를 작성한다. 
    AuthController.getUserStatus(req, res, () => {}).then(() => {
        ...
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
- deleteMany로 테스트를 종료하기 전에 데이터를 전부 정리해서 다음 테스트를 실행했을 때 문제가 없도록 한다.
- 그 다음에 오는 then 블록에서 연결을 해제하고 그 안에 있는 then 블록에 done()을 호출한다.
===========================================================================================
476_Hook

모두 테스트에 통과하지만 완성은 아니다. 테스트 실패 시 설정을 초기화하는 단계로 진입하지 못하기 때문에 catch 블록이 필요하다. 또한 전반적으로 코드의 가독성이 좋지 않다. MongoDB와 더미 사용자 설정을 사용하는 다른 테스트 케이스에 코드를 반복하는 경우 어떻게 해야할까?
Mocha가 제공하는 Lifecycle Hook(라이프사이클 훅)을 사용하면 된다. it()안에 테스트를 정의하고 describe()로 그룹화를 했었다. describe 안에는 몇 가지 추가적인 함수를 호출해 모든 테스트 전이나 각 테스트 전에 실행할 수 있다. 예를 들어 DB에 연결할 때 테스트 전에 더미 사용자를 생성하고 싶다고 가정하자. 매 테스트마다 다시 연결하고 재생성하는 건 아니지만 처음 테스트 실행 시 사용자를 생성하는 코드를 실행하고 싶다. 해당 부분의 코드를 describe() 바로 안에서 before(function)을 사용하면 된다. it 함수의 코드도 그에 맞게 정리한다.
    before(function(done) {
        mongoose.connect(MONGODB_TEST_URL)
            .then(result => {
                ...
                return user.save();
            })
            .then(() => {
                done();
            });
    });
- 비동기 코드가 있으므로 done 인수도 잊지 않는다. 설정이 끝나면 done()을 호출하여 Mocha에 알린다. 그러면 테스트를 실행하는 단계로 넘어간다.

before은 모든 테스트 전에 단 한 번만 실행된다. 이제 아래의 테스트 코드에는 테스트 논리만 정의하고 초기화 설정은 없다. 사용자를 제거하고 연결을 해제하는 User.deleteMany 부분도 잘라내고 before과 동등한 위치(describe 바로 안)에 after 함수를 추가한다. 이때 순서는 상관없다. after()은 모든 테스트가 끝나고 실행되며 before과 마찬가지고 한 번만 실행된다. 또한 비동기식 코드도 실행할 수 있다.
    after(function(done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });

만약 다른 설정이 필요한 테스트가 있다면 새 describe 함수에 추가하면 된다. 다양한 테스트를 위해 다른 훅이 필요하다면 여러 describe 블록을 가질 수 있다. 이 경우 모든 테스트가 같은 설정을 사용하고 있다. 

테스트를 실행하면 마찬가지로 모두 통과한다. 훅을 정리해서 테스트 코드에 섞지 않기 때문에 더 나은 코드가 되었다.

beforeEach(), afterEach()도 있다. 이름처럼 beforeEach는 매 테스트 전에 실행되고, afterEach는 매 테스트 이후에 실행된다. 따라서 beforeEach는 매 테스트마다 초기화해야 할 때 쓸 수 있으며, afterEach는 매 테스트 후에 필요한 정리 작업에 사용된다. 모두 테스트에 유용한 훅이다.
===========================================================================================
477_인증이 필요한 테스트 코드

이제 feed.js 컨트롤러를 테스트하며 마무리한다. 이곳에는 사용자의 인증 여부에 달린 코드가 있다. 예를 들어 게시물을 생성할 때 사용자 ID에 접근하는데 사용자 ID는 요청 객체의 일부분이다. 그 이유는 is-auth.js에서 추가했기 때문이다. 그럼 auth 미들웨어의 실행을 전제로 하는 컨트롤러는 어떻게 테스트할까? 전체 플로우가 아니라 컨트롤러만 테스트하고 싶은 경우이다.
직접 테스트를 구성할 때 req, res, next 함수를 전달하는 것이 중요하다. 만약 userId 등 요청 객체에서 추출하는 코드는 실제 앱에서 미들웨어가 주관하므로 미들웨어를 테스트하기도 했지만 컨트롤러에서는 가짜로 userId가 있는 요청 객체를 전달하면 끝이다. 

test 폴더에 feed-controller.js 파일을 추가하고 auth-controller.js의 코드를 모두 복사해서 일부 수정한다. before에서 더미 사용자를 생성하고, 테스트 케이스는 하나만 필요하므로 it 한 개를 제외하고 제거한다. 사용자를 정리하는 after 훅은 그대로 둔다. 다른 테스트 파일에 영향을 주지 않기 위함이다. 
feed-controller.js => 
    it('should add a created post to the posts of the creator', function(done) {
        const req = {
            body: {
                title: 'Test Post',
                content: 'A Test Post'
            },
            file: {
                path: 'abc'
            },
            userId: '5c0f66b979af55031b34728a'
        };
- feed.js 컨트롤러를 보면 req 객체에 몇 가지 요소가 있다. file 객체, 이미지의 경로인 path가 필요한데 진짜일 필요는 없고 추출할 수 있도록 존재만 하면 된다. 더미 문자열도 가능하다. 또한 post에 설정한 title, content, userId가 필요하다. 이때 feed.js는 request body로부터 title, content를 검색한다.
        const res = { 
            status: function() {
                return this;
            }, 
            json: function() {} 
        };
- 요청 객체에서 오류가 나타나지 않도록 status, json 메서드를 무조건 넣는 것이 좋다. 이를 위해 더미 res 객체를 생성하여 전달한다.
- feed 컨트롤러 파일을 보면 json 메서드를 res 객체가 아닌 status 메서드의 결과(res.status(201).json)에 호출한 것을 알 수 있다. 그러므로 status: function 안에 return this를 입력해 전체 객체에 또다른 참조를 반환하고 이 객체에 json 함수가 있도록 해야한다.
        FeedController.createPost(req, res, () => {}).then(savedUser => {
            expect(savedUser).to.have.property('posts');
            expect(savedUser.posts).to.have.length(1);
            done();
        }); 
- 1개의 게시물이 추가됐는지 테스트한다.
    });

controllers/feed.js => createPost
    const savedUser = await user.save();
    ...
    return savedUser;
- req 객체를 전달해서 feed controller가 게시물을 저장하고 사용자에 연결한 후 게시물을 사용자 객체에 추가할 수 있게 되었다. 잘 작동하는지 확인하려면 컨트롤러 함수 밖의 사용자 객체에 접근할 수 있어야 한다.
- user.save의 결과를 저장하고 아래에서 반환한다. 물론 컨트롤러의 동작은 변하지 않는다.

이제 length를 0으로 바꾸고 테스트해보면 실패한다. 올바르게 1을 입력하면 성공한다.
===========================================================================================
478_마무리

Mocha, Chai를 사용해 테스트와 예상값(expectation)을 작성하는 법을 배웠다. 비동기식 코드, 테스트 DB를 사용하고 외부 디펜던시는 stub으로 대체했다. 하지만 여전히 많은 것들이 남았다. 파일 접근, 세션이나 쿠키, 상태 코드가 제대로 설정됐는지 등이다.
예를 들어 상태 코드의 경우 반드시 스스로에게 해당 코드에 책임이 있는지 물어야 한다. 상태 코드가 응답 객체에 설정됐는지 테스트할 필요는 없지만 찾고자 하는 상태 코드가 올바른지는 테스트하는 것이 좋다. 상태 코드가 201인지 500인지는 내가 작성한 코드에 달렸기 때문이다. 
함수가 아주 커서 일부분을 테스트하기 위해 많은 부분에 stub 메서드를 사용하는 경우 함수를 나누는 것이 좋다. 컨트롤러도 마찬가지다. 예를 들어 user.posts에 게시물 추가하는 부분을 새 함수에 넣을 수 있다. 사용자 ID와 생성된 게시물을 입력값으로 넣으면 사용자 ID를 찾아서 게시물을 추가한다. 실질적으로 이 부분만 관여하는 새로운 함수로 아웃소싱하면 테스트가 훨씬 쉬워진다. 코드를 세부적인 함수로 나누어 테스트하면 관리와 테스트 모두 용이해지기 때문이다.
세션 및 쿠키의 테스트 방법은 구글링해보는 것이 좋다. 그러면 설명, 원리, 의견 등이 많이 나오는데 테스트에는 많은 생각과 실행이 뒷받침되어야 하며 하나의 해결책만 있는 경우는 드물다.