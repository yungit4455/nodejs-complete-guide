115_동적 라우트 및 고급 모델

개요
지난번에는 지금까지 만든 앱을 다듬었다. 이제 라우트에 동적 데이터를 전달할 능력을 갖추어야 한다.
url에 정보를 인코딩해서 제품 ID와 같은 정보를 url의 일부로 입력하고자 한다.
이번 섹션에서는 실제로 url을 통해 데이터를 제출하거나 전송하는 방법과 요청 본문에 대신 넣어야 하는 경우에 대하여 배울 것이다. 
또한, 모델 작업도 이어갈 텐데 정확히는 라우트 매개변수를 입력하는 방법(Passing Route Params)과 쿼리 매개변수 사용법(Using Query Params)을 배울 것이다. 이 둘은 Express 라우터에서 지원하는 중요한 기능으로 단순히 정보를 입력하는 것만이 아니라 이번 섹션에서는 모델을 강화(Enhance our Models)하는데 활용할 것이다.
그 과정에서 더 많은 기능을 추가하고 새로운 모델을 추가한다.
======================================================================================================================================
118_경로에 제품 ID 추가

views/product-list.ejs =>
    <a href="/products/information" class="btn">Details</a>
Details는 그냥 /가 아니라 해당 제품의 세부 정보를 표시하는 페이지로 연결되어야 하는데 이는 경로의 일부로 추가 정보를 전달해야 하는 활용 사례에 해당한다. /products를 불러오고 이 특정 제품에 대한 /information을 불러오고 싶다면 이를 위해 고유 식별자가 필요하다. 그러므로 먼저 생성되는 모든 제품이 고유 ID를 가져야 한다.

models/product.js => save() 메서드
    this.id = Math.random().toString();
새로운 제품을 생성하거나 파일 또는 데이터베이스에 저장할 때 ID를 추가해야 한다. 이 앱에서는 save에서 추가한다.
- this.id: 작업 중인 제품 객체 전체에 새로운 속성을 추가한다. 


views/product-list.ejs =>
    <a href="/products/<%= product.id %>" class="btn">Details</a>
생성한 고유 ID를 이 경로에 입력한다. 여기 링크 또는 경로의 일부로 무언가 출력하도록 ejs를 활용한다. 
이제 이 링크는 products로 향하며 무작위 값을 쓸 수 있다.
ex) /products/0.6720501002256918
이제 이를 처리하여 라우트 파일의 경로에서 ID를 추출할 수 있는지 확인한다. 그래야 컨트롤러가 올바른 제품을 불러오고 해당하는 세부 정보를 표시할 수 있다.
이렇게 경로의 일부로써 정보를 전송하여 컨트롤러나 그 내부로부터 제품에 대한 모든 정보를 추출한다. product 전체를 URL의 일부로 보낼 수는 없지만 이 핵심 정보를 보낼 수는 있다.
======================================================================================================================================
119_동적 매개변수 추출하기

url에서 정보(id)를 추출해야 한다.
routes/shop.js => 
    router.get('/products/:productId', shopController.getProduct);
- 새로운 페이지를 표시하는 것이므로 get 라우트이다.
- 경로의 일부는 products 이지만 그것 뿐만은 아니다. Dynamic Segment인 ID가 있다. Express 라우터는 이를 지원한다. 콜론을 추가하고 productId 처럼 원하는 이름을 입력하여 변수 세그먼트가 있음을  Express 라우터에 알릴 수 있다. 이 이름으로 정보를 추출할 수 있다. 중요한 것은 콜론(:)이다. 콜론은 Express에게 productId와 같은 라우트를 탐색하지 말라는 신호를 보낸다. 대신 productId 부분에는 무엇이 와도 되는데, 그러면 단순히 라우팅하거나 이 경로에 대해 라우트를 불러올 것이다. 그 다음 이름을 통해 정보를 추출한다.
- router.get('/products/delete') 같은 일반 라우트가 있다고 가정하자. 이때 순서가 중요한데, 코드가 위에서부터 아래로 파싱되고 요청이 위에서 아래로 거쳐간다는 것을 기억하라.
    router.get('/products/:productId', shopController.getProduct);
    router.get('/products/delete');
만약 이런 순서로 배치한다면 절대 delete 라우트에 도달하지 못한다. 콜론은 어떤 값이든 처리하기 때문에 Express가 위의 라우트에서 처리해버린다. 이때 delete는 동적 세그먼트 취급을 받기 때문이고, 따라서 동적 세그먼트와 특정 라우트가 있으면 더 구체적인 라우트를 앞에 두어야 한다. 
    router.get('/products/delete');
    router.get('/products/:productId', shopController.getProduct);

controllers/shop.js =>
    exports.getProduct = (req, res, next) => {
        const productId = req.params.productId;
        console.log(productId);
        res.redirect('/');
    };
이제 url로부터 정보를 추출한다. 새 컨트롤러를 추가하는데 순서는 중요하지 않다.
- req.params.productId: 요청을 액세스할 수 있으며 Express.js는 이미 요청에 대한 params 객체를 제공한다. 
이 params 객체에서 productId에 접근할 수 있다. 이때 productId 이름은 routes/shop.js 에서 콜론 다음에 정의한 이름을 사용한다. 
======================================================================================================================================
121_제품 상세 보기 렌더링

뷰를 추가하거나 기존 뷰에 논리를 추가한다. 기본 템플릿을 복사하여 시작한다.
views/shop/product-detail.ejs =>
    <main class="centered">
        <h1><%= product.title %></h1>
        <hr>
        <div>
            <img src="<%= product.imageUrl %>" alt="<%= product.title %>">
        </div>
        <h2><%= product.price %></h2>
        <p><%= product.description %></p>
        <form action="/cart" method="POST">
            <button class="btn" type="submit">Add to Cart</button>
        </form>
    </main>

이제 detail 라우트에 대해 뷰를 렌더링하도록 설정한다.
controllers/shop.js => exports.getProduct
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail', { 
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
- 콜론 오른쪽의 product는 데이터를 가져올 product이고, 왼쪽의 product는 단순히 key이며 이를 통해 뷰에서 액세스 한다. 
======================================================================================================================================
122_POST 요청으로 데이터 전달하기

Add to Cart는 POST 요청을 보낸다. 중요한 사실은 req.body를 통해 데이터를 전달할 수 있다는 점이다. get 요청에서는 불가능하다. 그러나 post 요청에서는 일반적으로 req.body를 사용한다. 이미 제품 추가에서 사용했었다.

form 태그는 자동으로 모든 입력 데이터가 body에 포함된 요청을 준다. 그러나 post 데이터만 가능하다. 데이터를 get 할 때는 사용할 수 없지만 post 할 때는 url에 정보를 추가할 필요가 없다. 정보를 post body에 넣으면 되기 때문이다. 
views/shop/product-list.ejs =>
    <input type="hidden" name="productId" value="<%= product.id %>">
input을 추가하고 타입은 히든으로 하면, 페이지에 표시되지 않지만 전송되는 요청에는 인코딩된다. 

routes/shop.js =>
    router.post('/cart', shopController.postCart);
라우트 추가

controllers/shop.js =>
    exports.postCart = (req, res, next) => {
        const productId = req.body.productId;
        console.log(productId);
        res.redirect('/cart');
    };
컨트롤러 추가

form 구문이 여러 파일에서 반복되므로 includes에 add-to-cart.ejs 템플릿 추가
이때 product-list.ejs 에서 에러가 발생하는데 
    <% for (let product of prods) { %>
        ...
    <%- include('../includes/add-to-cart.ejs', {product: product}) %>
    
product가 해당 루프에서만 사용 가능한 로컬 변수이기 때문이다. 따라서 루프에 포함된 include에서는 기본적으로 이 변수를 받지 못한다. 이를 위해 include 함수에 두 번째 인자로 객체를 입력하고 변수를 추가한다. 이때도 역시 오른쪽 product는 이 파일에서 사용 가능한 값이며, 왼쪽 product는 키 값이다.