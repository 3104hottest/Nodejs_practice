var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('mydb.sqlite3');

// GETアクセスの処理
router.get('/',(req, res, next) => {
	//データベースのシリアライズ
	db.serialize(() => {
		//レコードを全て取り出す
		db.all("select * from mydata",(err, rows) => {
			//データベースアクセス完了時の処理
			if (!err) {
				var data = {
				title: 'Hello!',
				content: rows // 取得したレコードデータ
				};
				res.render('hello',data);
			}
		});
	});
});

module.exports = router;
