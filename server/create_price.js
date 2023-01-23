const stripe = require('stripe')('sk_test_51MQNOOFnF1SzAEmZWJNaozjzwDNbYD9doovEVcfqD33IuT5G98r9XOXi3y9WHMiLKtCHGrOnmlEFnjiL8UU6FfPq00TT9MItbp');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});

//Success! Here is your starter subscription product id: prod_NDzeSBBudzY5O1
// Success! Here is your premium subscription price id: price_1MTXf3FnF1SzAEmZyO5goUds