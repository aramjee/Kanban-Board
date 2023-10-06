//Here you will import route files and export them as used in previous labs

import tasksRoutes from './tasks.js';

const constructorMethod = (app) => {
  //app.use('/posts', postRoutes);
  console.log("checking")
  app.use('/', tasksRoutes);
  app.use('*', (req, res) => {
    res.status(404).render('404');
  });
};

export default constructorMethod; //only 1 default export allowed, this is default that get exported

// when you export default no destructing is needed and you can name it anything like configRoutes
// need to destructure an export when it is not a default - when it is a named export, you cannot change it's name when importing
