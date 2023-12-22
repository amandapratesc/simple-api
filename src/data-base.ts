import cors from 'cors';
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujufcqynzfseugushtwb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqdWZjcXluemZzZXVndXNodHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxODkwMTgsImV4cCI6MjAxODc2NTAxOH0.bAMQ36NnWXKYWSb6_fwxE6JL70FIkJLM34p1ykDncX4';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

const tableName = 'Review';

app.post('/review', async (request, response) => {

  const { name, average, content, product_id } = request.body;

  const dataToPost = {
    reviewer_name: name,
    reviewer_average: average,
    reviewer_content: content,
    product_id: product_id
  };

  const { data, error } = await supabase.from(tableName).upsert(dataToPost).select();
  if (error) {
    console.log('error', error);
  }
  response.status(200).json({
    success: true,
  });
});

app.get('/list', async (request, response) => {
  const { data, error } = await supabase
    .from(tableName)
    .select();

  if (error) {
    console.log('error', error);
  }
  console.log('data', data);
  response.status(200).json({
    success: true,
    data: data
  });
});


// app.put('/products/:id', async (req, res) => {
//   const {error} = await supabase
//     .from('products')
//     .update({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price
//     })
//     .eq('id', req.params.id);
//   if (error) {
//     res.send(error);
//   }
//   res.send('updated!!');
// });

// app.delete('/products/:id', async (req, res) => {
//   const {error} = await supabase
//     .from('products')
//     .delete()
//     .eq('id', req.params.id);
//   if (error) {
//     res.send(error);
//   }
//   res.send('deleted!!');

// });

app.get('*', (req, res) => {
  res.send('Hello again I am working my friend to the moon and behind <3');
});

app.listen(3000, () => {
  console.log('> Ready on http://localhost:3000');
});