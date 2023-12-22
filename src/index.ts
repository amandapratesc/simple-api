import cors from 'cors';
import express from 'express';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-10';

const shopify = shopifyApi({
  // The next 4 values are typically read from environment variables for added security
  apiKey: 'a523831844eeac39c1b25391ec425a7c',
  apiSecretKey: '8c800e46c883dcbd478bacd2ff67c609',
  scopes: [
    'read_customer_events', 
    'write_metaobject_definitions', 
    'read_metaobject_definitions', 
    'write_metaobjects', 
    'read_metaobjects', 
    'write_online_store_navigation', 
    'read_online_store_navigation', 
    'write_online_store_pages', 
    'read_online_store_pages', 
    'write_products',
    'read_products', 
    'write_product_listings', 
    'read_product_listings', 
    'write_themes', 
    'read_themes'
  ],
  hostName: 'swift-app-review.myshopify.com',
  apiVersion: ApiVersion.October23,

  isCustomStoreApp: true,  // this MUST be set to true (default is false)
  isEmbeddedApp: false,
  adminApiAccessToken: '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',
  // Mount REST resources.
  restResources,
});

const getMetafield = async () => {

  const session = shopify.session.customAppSession('swift-app-review.myshopify.com');

  const metafieldCount = await shopify.rest.Metafield.count({
    session: session,
    product_id: '7182867955769',
  });
  console.log('metafield count', metafieldCount);


  const metafield = new shopify.rest.Metafield({session: session});
  metafield.product_id = 7182867955769;
  metafield.namespace = 'custom';
  metafield.key = 'swift_app_reviewer_name';
  metafield.value = 'having fun';
  metafield.type = 'single_line_text_field';

  await metafield.save({
    update: true,
  });

  // const allProduct = await shopify.rest.Product.count({
  //   session: session,
  // });
  // console.log('allProduct', allProduct);

};

getMetafield();


//Note: API front end is running on port 3000
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (request, response) => {
  response.status(200).json({
    success: true,
    message: 'Hello World!'
  });
});

app.post('/review', (request, response) => {

  const { name, average, review } = request.body;

  console.log('request body', request.body);

  response.status(200).json({
    success: true,
    message: `Hello ${name}!`
  });

});


const port = '3000';
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${port}`);
});
