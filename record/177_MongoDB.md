177_What is MongoDB?

MongoDB는 회사명이기도 하지만 그 회사가 개발한 유명 제품인 데이터베이스 솔루션 혹은 데이터베이스 엔진의 이름이다.
효율적인 NoSQL 데이터베이스를 실행하는 툴이다. 'Humongous' 라는 단어에서 비롯된 주요 목적은 저장 및 작업이다.
여기서 작업이 중요한데 방대한 양의 데이터를 저장하고 작업할 수 있다. 규모가 큰 앱을 위해 구축된 것이다.
데이터 쿼리, 저장, 상호 작용 등을 아주 빠르게 처리하며 NoSQL 데이터베이스와 MongoDB가 기반한 데이터베이스 철학이다.

원리
MongoDB 서버를 가동하면 다수의 데이터베이스가 나타난다.

Database:                      |-------Shop-------|
Collections:                 Users              Orders
Documents:         { name: 'Max', age: 29 }      {...}
                       { name: 'Manu' }          {...}
                          
SQL의 경우 데이터베이스에 테이블이 여러 개 있었지만 MongoDB의 경우 컬렉션이 여러 개 있다.

각 컬렉션에는 레코드가 아닌 문서가 있는데 명칭만 다른게 아닌 이 데이터베이스의 핵심 철학에 큰 차이점이 있다. 
그 예로 MongoDB는 Schemaless로 컬렉션의 문서 즉, 데이터나 항목이 같은 구조를 가질 필요가 없다.
이러한 유연성 덕분에 시간이 지남에 따라 데이터베이스에 표현하기 어렵지 않게 애플리케이션의 데이터 요구사항을 변경할 수 있다.

JSON(BSON) Data Format
    {
        "name": "Max",
        "age": 29,
        "address": {
            "city": "Munich"
        },
        "hobbies": [
            { "name": "Cooking" },
            { "name": "Sports" }
        ]
    }

문서는 자바스크립트 객체 표기법과 유사하게 보인다. MongoDB는 JSON을 통해 컬렉션에 데이터를 저장한다. 즉 저장하는 문서 모두 이런식으로 보이며 자바스크립트 객체 표기법을 따른다. 엄밀히 말하면 MongoDB는 Binary JSON인 BSON을 이용하는데 파일에 저장하기 전에 이면에서 데이터를 변형한다는 뜻으로 신경 쓰지 않아도 된다.
중첩된 요소는 MongoDB에서 내장 문서로 불린다. 예시에서는 adress가 내장 문서를 가지고 있다. 또한 문서는 배열을 가질 수 있다. 배열 역시 다른 문서나 객체, 문자열, 숫자 등을 가질 수 있어 데이터에 유연성이 크다. 
======================================================================================================================================
178_MongoDB에서의 관계

    Orders
    {id: 'abc123', user: {id: 1, email: 'max@test.com'}, product: {id: 2, price: 10.99 } }
    {id: 'lddoa1', user: {id: 2, email: 'manu@test.com'}, product: {id: 1, price: 120.99 } }
                {id: 'nbax12', product: {id: 2, price: 10.99 } }
                                    {...}

    Users
    { id: 1, name: 'Max', email: 'max@test.com' }
    { id: 2, name: 'Manu', email: 'manu@test.com' }
    {...}

    Products
    {id: 1, title: 'Chair', price: 120.99 }
    {id: 2, title: 'Book', price: 10.99 }
    {...}

NoSQL에서는 다음과 같은 구조가 일반적으로 사용된다. 세 개의 컬렉션이 있고 그중 중복되는 데이터(Duplicate Data)가 있다.
- e.g. Orders 컬렉션의 {id: 1, email: 'max@test.com'} 와 Users 컬렉션의 { id: 1, name: 'Max', email: 'max@test.com' } 등
이때 Users 컬렉션에 사용자에 관한 세부 사항이 있지만 해당 데이터의 일부는 다른 컬렉션 문서에 중첩 혹은 내장될 수 있다.
따라서 SQL처럼 ID에 따라 맞추는게 아니라 다른 문서에 데이터를 내장하여 관계를 표현한다. 다른 문서를 가리키는 ID를 내장해서 두 문서를 직접 병합하는 것이다.
하지만 중점이 되는 정보만 가지고 다른 문서에 넣을 수 있다. 예를 들어 특정 사용자 데이터를 Orders에 넣으면 Orders를 검색할 때마다 해당 데이터도 같이 나올 것이다. 모든 주문을 검색하고 맞는 사용자를 찾아서 가져올 필요가 없는 것이다.
이 측면에서 NoSQL 특히 MongoDB가 빠르고 효율적인 것이다. 데이터가 필요한 형식으로 쿼리를 하도록 만들어 필요한 형식으로 데이터를 저장해서 추후에 병합하는 과정을 많이 거치지 않아도 즉, 서버의 백그라운드에서 여러 컬렉션을 합치지 않고도 필요한 형식의 데이터를 가져올 수 있다. 

Relations - Options

관계를 표현하기 위해 사용할 수 있는 중첩/내장 문서 외에도 References(참조)가 있다.
Nested / Embedded Documents
    Customers
    {
        userName: 'max',
        age: 29,
        address: {
            street: 'Second Street',
            city: 'New York'
        }
    }
- 내장 문서의 예시로 address가 Customers 문서의 일부이다. Customers 및 Addresses 컬렉션이 따로 있어 추후에 ID로 매칭하지 않아도 Customers에 address를 넣는다.

References

    Customers
    {
        userName: 'max',
        favBooks: [{...}, {...}]
    }
- Lots of data duplication: 중복되는 데이터가 아주 많으며 해당 데이터를 많이 다뤄야 해서 자주 변경되는 경우도 있는데 그럴 때마다 중복되는 자리에 직접 업데이트 한다면 내장 문서는 좋은 방법은 아니다. 예를 들어 고객마다 좋아하는 책이 있고 공통적으로 좋아하는 책이 같을 시 데이터가 중복되고 이 데이터는 자주 변경된다. 만약 새로운 버전이 출판된다면 이 책을 꼽은 모든 고객들의 항목을 업데이트 해야한다.

    Customers
    {
        userNmae: 'max',
        favBooks: ['id1', 'id2']
    }
    Books
    {
        _id: 'id1',
        name: 'Lord of the Rings 1'
    }
- 이와 같은 시나리오에서는 두 개의 컬렉션을 가지고 Customers 문서에 책에 대한 참조만 저장한 후 다른 컬렉션으로 관리하는 Books로 직접 병합하는 것이 좋다.

NoSQL Characteristics

가장 중요한 것은 스키마가 없기 때문에 특정 구조가 필요하지 않으면서 유연성이 향상된다. 
내장을 통해 관계를 지을 수 있어 데이터 관계는 줄어든다. 참조를 통해 관계를 직접 구축할 수도 있지만 상황에 따라 무엇이 이상적인 방식인지 판단해서 사용한다.
======================================================================================================================================
180_mongoDB 드라이버 설치

npm install --save mongodb

util/database => 기존 sequelize 코드는 전부 지운다.
    const mongodb = require('mongodb');
    const MongoClient = mongodb.MongoClient;
    const mongoConnect = (callback) => {
        MongoClient.connect(
            '...'
        )
        .then(client => {
            console.log('Connected!');
            callback(client);
        })
        .catch(err => {
            console.log(err);
        });
    }
    exports.mongoConnect = mongoConnect;
- 콜백을 호출하고 연결이 이루어지면 then 블록 내부로 결과를 전달하고 이 결과는 클라이언트다. 즉, 데이터베이스에 접근할 수 있게 하는 클라이언트 객체다. 
- mongoConnect: 이 함수는 MongoDB 내부에 연결하는 위치로 콜백을 전달한다. 그리고 콜백을 실행한 뒤 연결된 클라이언트를 반환하여 상호작용할 수 있도록 해준다.
- 그러나 이렇게 진행하려면 매 작업마다 MongoDB에 연결해야 하고 작업이 끝나고 연결을 해제하지도 못할 것이다. 따라서 이 방법은 MongoDB에 연결하기에 좋은 방법은 아니다. 앱의 다양한 위치에서 연결과 상호작용을 하려고 하기 때문이다.
그러니 데이터베이스의 한 연결을 처리하고 클라이언트로 접근을 반환한 뒤 거기서 설정하거나 앱의 접근이 필요한 다양한 위치로 반환시키는 것이 더 나을 것이다.

app.js =>
    const mongoConnect = require('./util/database').mongoConnect;

    mongoConnect((client) => {
        console.log(client);
        app.listen(3000);
    });
- 콜백, 즉 연결한 뒤에 실행될 함수를 전달해야 하므로 클라이언트 객체로 접근할 권한을 얻는다.
======================================================================================================================================
181_데이터베이스 연결 생성

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(
        '...'
    )
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
- callback()에서 클라이언트를 반환하는 대신 _db라는 변수를 추가하는데 이 underbar는 이 변수가 파일 내부에서만 사용됨을 알리는 용도이므로 필수는 아니다. 
- _db = client.db(): 기본값으로는 테스트 데이터베이스에 연결하게 될 텐데 연결 문자열에서 .net/ 다음을 shop 등의 원하는 데이터베이스로 설정한다. SQL과는 다르게 미리 데이터베이스나 테이블 또는 컬렉션을 생성할 필요는 없다. 처음 접근하면 자동으로 생성된다.
- getDb: 우선 _db가 설정되었는지 확인하고 설정되었다면 반환한다.
- 이제 두 개의 메서드를 exports하게 되었다. 연결을 위한 것과 데이터베이스로의 연결을 저장하는 용도다. 따라서 _db = client.db() 이 부분은 계속 실행될 것이고 연결된 데이터베이스로의 접근이 존재하는 경우 접근을 반환하는 메서드가 있는 것이다. MongoDB는 뒤에서 연결 풀링이라는 방법으로 이 과정을 관리하는데 데이터베이스와 동시 상호작용을 다수 진행하기에 충분한 연결을 제공한다. 

app.js => 
    mongoConnect(() => {
        app.listen(3000);
    });
- 콜백으로 더 이상 반환하지 않으므로 연결되어 있다는 것은 알지만 더 이상 할 게 없다.

models/product => class Product
    const mongodb = require('mongodb');
    const getDb = require('../util/database').getDb;
- 이제 getDB를 호출하여 데이터베이스로 접근할 수 있다. getDB는 우리가 연결되어 있는 데이터베이스 인스턴스를 반환한다. 

    constructor(title, price, description, imageUrl) {
        ...
    }

    save() {
        const db = getDb();
        return db.collection('products')
        .insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }
- collection('products').insertOne(this): products라는 컬렉션에 데이터 하나를 입력한다. 컬렉션이 존재하지 않으면 자동으로 생성한다. 여러 개를 입력할 때는 insertMany를 사용하며 자세한 것은 공식 문서를 참조할 것
insertMany는 입력을 원하는 자바스크립트 객체의 배열을 취한다. 지금은 하나만 입력하니 객체를 인자로 전달한다. 
e.g. {name: 'A book', price: 12.99}
- JSON이 아니라 자바스크립트 객체지만 MongoDB가 알아서 변환한다.
- 그러나 우리가 원하는 것은 product의 정보이므로 this를 입력한다. 
- insertOne은 이후 promise를 반환하여 then, catch가 존재한다. 

모든 제품 가져오기
    static fetchAll() {
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(err => {
            console.log(err);
        });
    }
- find: MongoDB의 데이터 탐색을 위한 메서드. 필터를 사용하여 원하는 것만 가져올 수 있다.
- 중요한 것은 find가 promise를 즉시 반환하는 대신 커서라는 것을 반환한다.
- 커서는 MongoDB가 제공하는 객체로, 단계별로 요소와 문서를 탐색한다. 왜냐하면 이론적으로 컬렉션에서 수백만 개의 문서를 반환할 수도 있지만 그만한 분량을 한꺼번에 전달하고 싶지는 않을 것이다. 대신 find는 MongoDB에게 다음 문서를 순차적으로 요청할 수 있는 일종의 손잡이를 제공하는 것이다. 
- toArray: MongoDB에게 모든 문서를 받아서 자바스크립트 배열로 바꾼다. 하지만 수십 개에서 백 개 정도의 문서가 있는 경우에 사용한다. 그렇지 않다면 추후 배울 페이지네이션을 사용하는 것이 낫다.

단일 제품 가져오기
     static findById(prodId) {
        const db = getDb();
        return db
        .collection('products')
        .find({ _id: new mongodb.ObjectId(prodId) })
        .next()
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => console.log(err));
    }
- find는 여전히 커서를 제공한다. MongoDB는 한 개의 값만 받는다는 걸 모르기 때문이다. next 함수를 사용하여 find를 통해 반환된 다음 내지는 마지막 문서를 확보한다. 이제 then에는 product 한 개가 존재하고 이를 반환한다.
- 버튼을 눌러보면 에러가 나오는데 views/shop/index에 문제가 있다. product.id에 접근하는데 MongoDB에서는 _id라야 한다. 이것은 product-list 등 다른 페이지에서도 마찬가지다. 
- 그래도 null이 출력되는데 MongoDB의 id는 약간 다른 방식으로 저장하기 때문이다. Compass에서 볼 수 있듯이 ID는 사실 ObjectId다. MongoDB는 데이터를 BSON 형식으로 저장하고 이 JSON의 Binary 형식은 단지 작업 속도가 빨라서 사용하는 건 아니고 MongoDB가 내부에 특별한 유형의 데이터를 저장할 수 있기 때문이다. ObjectId는 자바스크립트에는 없고 MongoDB가 사용하는 객체다. ObjectId를 생성하여 안에 포함된 문자열을 전달한다.
* 이 부분에서 BSONTypeError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer 에러가 발생하는데 나중에 해결할 것

188_편집, 삭제 버튼 다시 작동하게 만들기

view에서 _id를 전달하는 것이 중요하다

189_업데이트를 위한 product 모델 수정

getEditproduct에서 이제 배열이 아닌 하나의 제품을 반환받을 것이므로 배열에서 추출할 필요가 없다.
이제 데이터베이스에 저장된 제품을 업데이트 하기 위해 모델에 _id 인수를 추가한다.
    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
            .collection('products')
            .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }
- 이제 this._id를 확인해서 이미 존재한다면 업데이트하고 없다면 새로 삽입하도록 한다.
- dbOp: dbOpertion을 뜻함
- updateOne에는 적어도 두 개의 인수를 넣어야 한다. 첫 번째는 어떤 요소 혹은 어떤 문서를 업데이트하는지 정의하는 필터이다. 자바스크립트 객체를 전달해 Equality로 필터를 적용한다. 두 번째 인수는 문서를 업데이트하는 방식을 지정한다.
자바스크립트 객체를 전달하는데 this를 입력하면 기존의 문서를 대체하게 되므로 입력하면 안된다. MongoDB의 속성인 $set에 this를 입력하면 객체에 있는 key-value 필드를 데이터베이스에서 찾은 문서에 설정한다. 더 정확하게 작성하자면
 {set: {title: this.title, ...}} 처럼 업데이트할 모든 필드를 입력해도 되지만 이 앱에서는 모든 필드를 업데이트하니까 this만 입력하면 된다.

업데이트 수정 사항

- admin 컨트롤러에서 ObjectId를 Product 생성자에 전달했었다. 이때 prodId를 문자열로 전달하고 product 모델에서 생성자로 전달한 ObjectId에 전달한다. 즉, id를 컨트롤러에서는 문자열로 전달하고 모델에서 생성자에 값을 넣을 때 ObjectId 객체로 전달하는 것이다. 이렇게 컨트롤러 파일에서 변환하는 것보다 모델에서 변환하는 것이 더 좋은 방법이다.

제품 삭제

- class에 메서드를 추가해 새 product 객체를 생성하고 delete를 호출할 수도 있느나 정적 메서드를 사용할 수도 있다.
    static deleteById(prodId) {
        const db = getDb();
        return db.collection('products')
        .deleteOne({ _id: new mongodb.ObjectId(prodId) })
        .then(result => {
            console.log('Deleted');
        })
        .catch(err => console.log(err));
    }
- deleteOne으로 요소 하나를 삭제한다. 이번에도 _id: 으로 시작하는데 prodId는 인수이기 때문에 ObjectId로 변환하려면 ObjectId 생성자에 전달해야 한다. 그럼 MongoDB가 이 조건을 충족하는 요소를 찾고 그 중에서 첫 번째 요소를 제거한다. 그리고 return으로 반환하여 then, catch 블록을 추가한다. 
    exports.postDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId;
        Product.deleteById(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    }
- 그리고 컨트롤러에서 deleteById를 호출하여 삭제한다.

제품 생성 기능 수정하기

product 모델의 생성자에서 this._id = new mongodb.ObjectId(id); 로 항상 _id를 초기 설정했기 때문에 ID를 전달하지 않아서 undefined가 되어도 이 부분에서 객체를 생성해 저장하므로 save 메서드의 _id가 언제나 정의되어 있다.
이때 ObjectId가 비어있거나 자동 생성된 객체라면 오류가 발생한다. 
이걸 해결하기 위해 삼항 조건 연산자를 이용하여 id가 있는지 확인하고 없다면 null을 저장한다.
    this._id = id ? new mongodb.ObjectId(id) : null;
======================================================================================================================================
194_새로운 사용자 모델

사용자 모델에 username, email 필드와 save, findById 메서드를 작성한다.
    const ObjectId = mongodb.ObjectId;
- ObjectId 상수를 생성하고 여기서 액세스해서 액세스를 저장한다. 그러나 호출하지는 않고 객체를 생성하지도 않는다. ObjectId 클래스에 대한 참조를 ObjectId 상수에 저장할 뿐이다. 
    return db.collection('users').findOne( {_id: new ObjectId(userId)} );
- findById에서는 findOne 메서드를 사용했다. 하나의 요소를 찾는 것이 확실할 때 사용하는데 find와는 다르게 커서를 반환하지 않고 즉시 그 하나의 요소를 반환한다. 그러므로 next()가 필요없다.

이제 app.js에 User를 import한다.

195_데이터베이스에 사용자 저장하기

user 객체를 어디에 활용할 것인가. 새로운 제품을 생성할 때 활용하고자 한다. 제품을 저장할 때 이 유저에 대한 참조를 저장하거나 유저 데이터 전체를 저장한다. 두 접근법 모두 나름의 논리가 있다. 내장 문서에 모든 사용자 데이터를 포함하는 것은 권장하지 않는데 사용자 데이터가 변경되면 해당 데이터를 모든 제품에서 변경해야 하기 때문이다. 그러나 사용자명과 같이 자주 바뀌지 않는 데이터를 담는다면 이를 ID와 함께 포함해서 필요하다면 해당 ID를 통해 사용자에 대한 추가 데이터를 가져올 수 있다. 
다른 방법은 ID 즉, 참조만 저장하는 것이다. 이 경우 연결된 데이터가 필요하고 두 컬렉션에서 수동으로 가져와야 한다. 

일단 product 모델에 userId 필드를 추가한다.
그리고 postAddProduct 컨트롤러에서 prodId는 null로 설정한다. 생성할 당시에는 제품 id가 존재하지 않기 때문이다. 다음으로 userId를 넘기는데 req.user._id를 인수로 추가한다. 이것은 app.js에서 user를 찾아서 해당 user를 request에 저장하는 미들웨어에서 온다. 지금은 하드코딩되어 있지만, 여기서 중요한 점은 user을 하나의 장소에서 추출하여 모든 라우터에서 다시 활용할 수 있다는 것이다.

196_cart 수정

MongoDB를 사용함에 따라 여기에도 변화가 있다. cart 모델의 목표는 무엇인가? 모든 사용자에 대해 cart를 저장하는 것이다. 사용자는 cart를 가지고 그 cart엔 제품이 담긴다. MongoDB에서 이는 내장 문서를 활용할 좋은 기회이다. 사용자와 cart 사이에 엄격한 일대일 관계가 존재하기 때문이다. 따라서 참조로 이를 관리할 필요가 없다.
그러므로 cart 모델과 cart-item 파일을 삭제하고 user 모델에 cart를 저장한다.

user 모델에 새로운 메서드 addToCart를 추가한다. 매개변수는 cart에 추가하려는 product다. 그리고 addToCart에는 이미 cart에 그 제품이 있는지 알아내는 논리가 들어간다. 만약 있다면 수량을 증가시키고 없다면 처음으로 추가한다. 이를 이해하려면 addToCart가 user 객체에서 호출되고 그 객체는 findById를 통해 데이터베이스에서 불러온 데이터로 생성된다는 사실을 기억하자. findById에선 user를 return한다.

따라서 생성자에서 더 많은 데이터를 수용해야 한다. 데이터베이스에 저장된 데이터를 기반으로 하는 JavaScript 객체에 cart를 저장한다.  
    this.cart = cart; // {items: []}
이제 user에 cart가 할당되므로 해당 cart에 특정 product가 존재하는지 알아내면 된다. 이때 cart는 기본적으로 객체다. items가 포함된 객체, 즉 item 배열이 들어있는 객체다. 
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
만약 이런 경우에는 cartProduct라는 상수를 생성하고 this.cart.items를 사용해 추가하려는 제품과 동일한 ID를 가진 제품의 index를 cart에서 검색한다. 그리고 items 배열의 모든 요소에 대해 자바스크립트가 실행할 함수인 findIndex에 함수를 전달한다. items 배열에서 제품을 찾았다면 true를 반환한다. 

이제 user에 cart를 저장한다. 
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
    );
- id를 인수로 받아야 한다.
- $set: 찾고 나서는 어떻게 갱신할지를 정한다. $set을 사용하고 업데이트할 필드와 업데이트 방식에 대한 정보가 모두 들어있는 객체를 입력한다. 여기서는 cart 필드만 명시했으므로 name, email 등의 다른 필드는 영향을 받지 않는다. updatedCart 객체를 새로운 값으로 받아서 기존 값을 덮어씌우게 된다.

197_Add to Cart 기능 추가

app.js => 
    app.use((req, res, next) => {
    User.findById('63014a471bc96e3de82aa4c8')
        .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
        })
        .catch(err => console.log(err));
    });
- req.user = user; 이렇게 해도 user 정보는 요청에 저장이 된다. 그러나 이렇게 저장하는 user은 해당 속성을 가진 객체일 뿐이며 데이터베이스에 있는 데이터다. 즉, user 모델의 메서드는 포함되어 있지 않다. 우변의 user는 데이터베이스에서 가져왔고 메서드는 데이터베이스에 저장되어 있지 않다. 그러므로 User 클래스의 생성자를 이용하여 user 모델 객체를 생성해야 한다. 

controllers/shop.js => postCart
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
        });
- 우선 추가하고자 하는 product을 불러온다. Product 모델을 사용하고 findById로 prodId로 product를 찾는다. then 블록의 product에는 cart에 추가하고자 하는 product가 오게 되고 이것을 addToCart에 인수로 넘긴다.
- addToCart의 마지막에 updateOne의 결과를 프로미스의 형태로 return하므로 다시 shop.js로 돌아와 두 번째 then 블록에 받아준다.  

실행하고 데이터베이스의 users을 살펴보면 제품 정보가 들어있는 객체가 items인 내장 문서 cart를 확인할 수 있다. 여기서 중요한 점은 별개의 컬렉션으로도 저장되는 온전한 product 문서를 user에서 내장 문서의 일부로써 저장했다는 것이다. 즉, 중복된 데이터이다. 같은 product가 users의 내장 문서와 products에 각각 존재한다. 이 상태로 product의 title, price 등을 변경하면 cart에 반영되지 않는다.

user.js => addToCart
    items: [{ productId: new ObjectId(product._id), quantity: 1 }]
- product를 저장하는 부분에서 모든 데이터를 저장하지 않고 제품 ID와 수량만 저장한다. 즉, 제품에 대한 참조와 수량만 저장한 것이다. 이제 제품 정보를 제공하려면 ID를 사용해 수동으로 불러와야 한다. 대신 제품 정보를 수정하더라도 product 컬렉션이나 users에서 추가로 변경할 필요가 없다.  

198_cart에 여러 개의 제품 저장하기

위의 코드는 항상 기존의 장바구니를 덮어쓰기 한다. 다양한 제품을 저장하고 이미 존재하는 경우 수량만 증가하도록 수정한다.
user.js => addToCart
    addToCart(product) {
        if (!this.cart.items) {
            this.cart.items = [];
        }
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            });
        }
        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        return db
        ...
    }
- if (...): 해당 제품이 이미 존재할 경우 기존 수량에 + 1 한다. 
- updatedCartItems: cart.items에 접근하고 스프레드 연산자를 통해 기존 요소들을 모두 복사하는 새로운 배열을 생성한다. 이렇게 장바구니에 있는 모든 품목이 들어간 새 배열을 받아 저장한다. 이 배열은 자바스크립트의 참조와 원시 타입으로 인해 기존 배열을 건드리지 않고 편집할 수 있다.
- return cp.productId.toString() === product._id.toString() : 우변의 인수로 가져오는 product는 데이터베이스에서 방금 검색한 제품이다. 즉, _id는 자바스크립트에서 문자열로 간주되지만 사실 문자열 유형이 아니다. 그런데 ===를 사용했기 때문에 값 뿐만아니라 타입까지 일치해야 한다. 이런 상황에서 두 가지 해결책이 있다. 하나는 ==를 쓰거나 toString을 양쪽에 사용하는 것이다.

199_cart 항목 표시하기

여기서의 개념은 장바구니 품목을 반환하여 컨트롤러에 장바구니 품목을 확보하고 이들을 출력하는 것이다. 최종적으로 제품만 필요하다. 따라서 각 제품과 수량이 기재된 목록을 확보하고자 한다. 
getCart 메서드는 이 cart 속성을 이미 갖고 있는 user.js에 존재한다. 이게 MongoDB가 상관관계를 생각하는 방식이다. cart 컬렉션은 존재하지 않으므로 해당 컬렉션에 접근할 필요가 없다.
이제 getCart에서 완전히 채운 cart를 반환하면 된다. 
user.js => getCart
        const db = getDb();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db.collection('products')
        .find({ _id: { $in: productIds } })
        .toArray()
        .then(products => {
            return products.map(p => {
                return {
                    ...p, 
                    quantity: this.cart.items.find(i => {
                    return i.productId.toString() === p._id.toString();
                    }).quantity
                };
            });
        });
- find({ _id: { $in: productIds } }): MongoDB가 지원하는 특별한 쿼리 구문을 이용하여 모든 요소를 찾는다. find 내부에서 _id가 동일한 모든 제품을 찾겠다고 할 수 있는데 이때 단일 ID를 찾는 게 아니므로 ID를 전달하지는 않는다. 대신 객체를 전달하여 MongoDB 연산자를 사용한다. 
$in 연산자는 ID 배열을 가져가고 해당 배열에 있는 모든 ID가 수락되며 이 배열에서 언급된 ID 중 하나를 포함하는 모든 제품에 대한 참조를 포함하는 커서를 가져온다.
- const productIds = this.cart.items.map(...): items는 객체들의 배열이다. 즉, 제품 ID와 수량을 가지는 객체들이 들어있다. 지금은 제품의 ID만 필요하므로 자바스크립트 기본 함수인 map을 사용한다. 맵핑하여 포함된 모든 품목을 변환하고 productId를 반환한다. 여기에서는 모든 품목이 자바스크립트 객체인 items 배열을 문자열 내지는 제품 ID의 배열로 맵핑하고 있다. 이후 새로운 productIds 상수에 저장된다.
- then 메서드는 장바구니에 있던 모든 제품 데이터를 포함한다. 그리고 수량에 관한 정보를 모든 제품에 다시 추가해야 한다. 이 then 블록에 모든 제품이 약간씩 변환될 제품 배열의 맵핑된 버전을 다시 반환한다. 즉, 검색한 모든 데이터는 유지하되 새로운 quantity 속성을 추가하며 이 수량 속성은 이미 알고 있거나 제품에 포함된 데이터로 채워야 한다.
- 이 코드처럼 getCart는 어느 제품 컬렉션에 저장된 모든 데이터가 포함된 제품들을 반환할 텐데 사용자와 장바구니에는 참조만을 저장하기 때문이다. 참조가 없는 두 컬렉션 사이에 연결이 없는 경우 MongoDB에서 이처럼 직접 통합해야 한다. 

이제 getCart는 모든 정보를 포함한 장바구니를 반환한다. 
controllers/shop.js => getCart
    req.user
    .getCart()
    .then(products => {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
        });
    }) 
    .catch(err => console.log(err));

views/shop/cart.ejs =>
    p.cartItem.quantity -> p.quantity
    p.id -> p._id

201_장바구니 항목 삭제

models/user => deleteItemFromCart
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    const db = getDb();
    return db
    .collection('users')
    .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
    );
- filter: Vanilla 자바스크립트에서 제공하는 메서드다. 배열의 요소를 필터링하는 방식에 대한 기준을 정의하게 해준다. 필터는 모든 요소에 실행되고 새로운 배열에 요소를 계속 두고 싶다면 true를 반환하고 제거하길 원한다면 false를 반환하도록 정의한다.
- 이제 DB에 저장된 items를 updatedCartItems로 교체하면 끝이다. 

202_주문 생성

cart는 내장 문서이며 cart item은 참조와 추가적인 메타데이터 조합이었는데 주문의 경우는 다르다.
addOrder 메서드에 아무런 인수도 넣지 않는데 장바구니가 이미 사용자에 등록되었기 때문이다. 따라서 주문을 사용자에 추가하거나 사용자를 주문에 추가해야 한다. 수천 개의 주문이 있을 때는 주문을 새 컬렉션에 저장하고 User 객체에 넣지 않는데 이 같은 객체는 금방 커지기 때문이다. 장바구니는 그렇게 커지지 않지만 주문 내역은 보통 매우 길어지므로 새로운 컬렉션이 필요하다.
models/user => addOrder
    const db = getDb();
    return db
    .collection('orders')
    .insertOne(this.cart)
    .then(result => {
        this.cart = { items: [] };
        return db
        .collection('users')
        .updateOne(
            { _id: new ObjectId(this._id) }, 
            { $set: { cart: { items: [] } } }
        );
    });
- orders 컬렉션을 만들고 insertOne으로 this.cart를 넣는다. 이때 this.cart는 사용자의 장바구니를 의미한다. 주문에 this.cart를 넣고 성공하면 장바구니를 빈 배열로 비워준다. 그리고 데이터베이스에서도 지워야 한다. 중요한 것은 장바구니를 비우기 전에 orders 컬렉션에 삽입하는 것이다. 

203_관계형 주문 데이터 추가

현재 주문은 장바구니의 내용물이 있지만 주문한 사용자의 정보는 없으므로 수정이 필요하다.
models/user => addOrder
    const db = getDb();
    return this.getCart()
        .then(products => {
            const order = {
                items: products,
                user: {
                    _id: new ObjectId(this._id),
                    name: this.name
                }
            };
            return db.collection('orders').insertOne(order)
        })
        .then(result => {
            this.cart = { items: [] };  
            return db
            .collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) }, 
                { $set: { cart: { items: [] } } }
            );
        });
- 저장하고자 하는 객체로 order를 생성한다. 여기에 사용자의 정보가 들어가는데 데이터를 중복시켜서 order, users 컬렉션 둘 다에 있도록 하는 것이다. 여기 있는 사용자 데이터가 나중에 바뀔 수도 있기 때문에 크게 신경 쓰지 않아도 된다. 다시 말해 이미 처리된 주문과 진행 중인 주문이 있을 텐데 이미 처리된 주문의 경우 사용자 이메일이 바뀐다 해도 아무 영향이 없기 때문이다. 만약 신경쓰인다면 email은 제거해도 된다. 따라서 사용자명이 바뀐다고 해도 _id에서는 바꾸지 않고 users 컬렉션에서만 바꾸는 것이다.
- 가격처럼 추가적인 정보를 저장하면 유용하게 활용할 수 있으므로 제품 정보가 필요하다. 이미 getCart 메서드가 제품 정보를 가져오는 방법이므로 this.getCart를 호출하여 사용한다. 그 이후에 const order를 then 블록 안에 넣어 코드가 너무 빨리 실행되지 않고 제품 데이터를 모두 받은 다음 실행되도록 한다.
- 이제 items는 제품 정보와 수량이 있는 products 배열로 설정한다. 이때 제품 정보가 바뀌는 경우를 신경 쓰지 않는데 주문에 스냅샷이 필요하기 때문이다. 제품 가격이 바뀌어도 지난 주문에는 영향이 없는 것처럼 말이다.
- 그리고 삽입 관련 코드도 then 블록 안으로 넣는다. 그러면 순서대로 getCart로 제품 배열을 받고 해당 데이터로 주문을 생성한다. 그리고 orders 컬렉션에 order를 삽입한다. 그 다음 결과를 반환하고 then(result)에서 삽입에 성공하면 기존 카트를 비운다.
- this.getCart에서도 return하여 addOrder의 결과를 반환한다.

204_주문 표시하기

models/user => getOrders
    const db = getDb();
    return db
        .collection('orders')
        .find({ 'user._id': new ObjectId(this._id) })
        .toArray();
- 어떻게 사용자의 모든 주문을 찾을 수 있을까. 각 주문에 User 객체가 있고 User 객체에는 사용자 ID가 있다. 이 사용자 ID를 현재 사용자 ID와 비교하기 위해 필터를 사용한다. MongoDB에서는 경로를 정의하여 중첩된 속성을 확인할 수 있다. 경로는 반드시 따옴표 안에 써야 한다. user._id를 정의하면 내장 문서를 가지고 있는 user 속성에서  _id를 찾는다.
- 그 다음 new ObjectId(this._id)와 비교하면 사용자에 대한 모든 주문 정보를 줄 텐데 하나 이상일 것이기 떄문에 toArray 단축키를 쓰고 사용자의 주문 배열을 반환한다.

views/shop/order.ejs =>
    모든 order에 _id를 써야함을 기억하라 
    products 대신 items를 쓰니까 변경한다.
    orderItem도 사용하지 않는다.