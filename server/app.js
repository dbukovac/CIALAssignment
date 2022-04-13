var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: axios } = require('axios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/api/getSearchData', async (request, response) => {
  const query = request.query.search;
  writeHistoryFile(query)
  const result = await getData(query)
  response.json(result)
})

app.post('/api/getSearchData', async (request, response) => {
  const query = request.body.search;
  writeHistoryFile(query)
  const result = await getData(query)
  response.json(result)
})

app.get('/api/getSearchHistory', async (request, response) => {
  const result = readHistoryFile()
  response.json(result)
})

async function getData(query) {
  var toReturn = []
  await axios.get('http://api.duckduckgo.com', {
    params: {
      q: query,
      format: 'json'
    }
  })
  .then(res => {
    toReturn = res.data.RelatedTopics.filter(x => x.FirstURL != undefined).map(x => { return { URL: x.FirstURL, title: x.Text} })
  })
  .catch(error => {
    console.error(error)
  })
  return toReturn
}

function readHistoryFile() {
  try {
    const data = fs.readFileSync('./historyFile.txt', 'utf8')
    return data.split(";").filter(x => x !== '')
  } catch (err) {
    console.error(err)
    return []
  }
}

function writeHistoryFile(data) {
  const content = readHistoryFile()
  content.unshift(data)
  fs.writeFile('./historyFile.txt', content.join(";"), { flag: 'w+' }, err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
