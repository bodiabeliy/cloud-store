const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;

const app = express();

// раздача статических файлов
app.use(express.static(__dirname));
// корень приложения (папка билда)
app.use(express.static(path.resolve(__dirname, 'build')));

// обработка  обновления страницы с не из стартового URL
app.get('*', (res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
