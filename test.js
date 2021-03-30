const DigitalWorld = require('./index');

const instance = new DigitalWorld({
        endpoint: 'https://merchants.digitalpay.net/apidigitalpay',
        merchant_email: 'halim@selectionvalley.com',
        secret_key: 'eqEygqTwZnDdBxY7gp43KLG81QzxalZLmNd1OxNka8nNjX825J6WSz89RDA6i5giobmshFrmhU4ry8ZxlY3LyA5ivejYoh4qVapb',
        site_url: 'https://perla-ksa.com/',
        return_url: 'https://perla-ksa.com/',
        currency: 'SAR',
        country: 'SAU',
        country_shipping: 'SAU',
    }
);

// instance.validateSecretKey({
//     merchant_email: 'halim@selectionvalley.com',
//     secret_key: 'eqEygqTwZnDdBxY7gp43KLG81QzxalZLmNd1OxNka8nNjX825J6WSz89RDA6i5giobmshFrmhU4ry8ZxlY3LyA5ivejYoh4qVapb'
// }).then(console.log);


instance.createPayPage({
    amount: '70',
    quantity: '1',
    unit_price: '50',
    title: 'Order # 3321',
    products_per_title: 'Producy1',
    email: 'example@test.com',
    m_first_name: 'John',
    m_last_name: 'Doe',
    m_phone_number: '987654321012',
    phone_number: '987654321012',
    other_charges: '20',
    billing_address: 'Address of billing',
    address_shipping: 'Address of billinfg',
    refno: '123',
}).then(console.log);


// instance.verifyPayment('t2938yh202tu0').then(console.log);


// instance.refundTransaction({
//     paypage_id: '123',
//     reference_number: '4578',
//     refund_amount:'1000',
//     refund_reason:'asd',
//     transaction_id:'123'
// }).then(console.log);


// instance.transactionsReports({
//     startdate: '02/20/2016 12:00:00',
//     enddate: '02/20/2016 12:00:00'
// }).then(console.log);


// instance.getTransaction('TST2108200121174').then(console.log);
