import path from "path";

const notFound = (req, res, next) => {
     res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render(path.resolve("/RentCar2022/RentCardemo/pages/404.ejs"), { url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
}

export default notFound