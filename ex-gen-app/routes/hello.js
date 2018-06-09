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
				res.render('hello/index',data);
			}
		});
	});
});

router.get('/add', (req, res, next) => {
	var data = {
		title: 'Hello/Add',
		content: '新しいコードを入力',
		form: {name:'', mail:'', age:0}
	}
	res.render('hello/add',data);
});

router.post('/add', (req, res, next) => {
	var response = res;
	req.check('name','NAMEは必ず入力して下さい。').notEmpty();
	req.check('mail','MAILはメールアドレスを記入して下さい。').isEmail();
	req.check('age','AGEは年齢(整数)を入力下さい。').isInt();
	req.getValidationResult().then((result) => {
		if(!result.isEmpty()) {
			var res = '<ul class="error">';
			var result_arr = result.array();
			for(var n in result_arr) {
				res += '<li>' + result_arr[n].msg + '</li>'
			}
			res += '</ul>';
			var data = {
				title: 'Hello/Add',
				content: res,
				form: req.body
			}
			response.render('hello/add',data);
		} else {
			var nm = req.body.name;
			var ml = req.body.mail;
			var ag = req.body.age;
			db.run('insert into mydata (name, mail, age) values (?, ?, ?)', nm, ml, ag);
			res.redirect('/hello');
		}
	});
});

router.get('/edit', (req, res, next) => {
	var id = req.query.id;
	db.serialize( () => {
		var q = "select * from mydata where id = ?";
		db.get(q, [id], (err, row) => {
			if (!err) {
				var data = {
					title: 'hello/edit',
					content: 'id = ' + id + ' のレコード:',
					mydata: row
				}
				res.render('hello/edit', data);
			}
		});
	});
});

router.post('/edit', (req, res, next) => {
	var id = req.body.id;
	var nm = req.body.name;
	var ml = req.body.mail;
	var ag = req.body.age;
	var q  = "update mydata set name = ?, mail = ?, age = ? where id = ?";
	db.run(q, nm, ml, ag, id);
	res.redirect('/hello');
});

router.get('/delete', (req, res, next) => {
	var id = req.query.id;
	db.serialize(() => {
		var q = "select * from mydata where id = ?";
		db.get(q, [id], (err, row) => {
			if (!err) {
				var data = {
					title: 'Hello/Delete',
					content: 'id = ' + id + ' のレコードを削除:',
					mydata:row
				}
				res.render('hello/delete', data);
			}
		});
	});
});

router.post('/delete', (req, res, next) => {
	var id = req.body.id;
	var q  = "delete from mydata where id = ?";
	db.run(q, id);
	res.redirect('/hello');
})

module.exports = router;
