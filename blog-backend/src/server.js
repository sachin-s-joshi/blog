var express = require('express')
var parser = require('body-parser');
const { MongoClient } = require('mongodb')
let app = express();

app.use(parser.json())

const withDB = async (opreations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        let db = client.db('my-blog');
        await opreations(db);
        client.close()
    }
    catch (err) {
        res.status(500).json('Something went wrong..')
        console.log(`something wrong with the request: ${err}`)
    }
}

app.get('/', async (req, res) => {
    withDB(async (db) => {
        let articleInfo = await db.collection('articles').find({}).toArray();
        if (articleInfo) {
            res.status(200).json(articleInfo);
        }

    }, res)

});

app.get('/api/article/:name', (req, res) => {
    withDB(async (db) => {
        Aname = req.params.name;
        let articleInfo = await db.collection('articles').findOne({ name: Aname });
        if (articleInfo) {
            res.status(200).json(articleInfo)
        }
        else {
            throw new Error()
        }
    }, res)

})

app.post('/api/article/:name/upvotes', async (req, res) => {

    withDB(async (db) => {
        Aname = req.params.name;
        let articleInfo = await db.collection('articles').findOne({ name: Aname });
        console.log(articleInfo)
        await db.collection('articles').updateOne({ name: Aname }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1,
            },
        });

        let updatedInfo = await db.collection('articles').findOne({ name: Aname })
        res.status(200).json(updatedInfo);
    }, res)

})

app.post('/api/article/:name/comments', (req, res) => {
    withDB(async (db) => {
        const { username, text } = req.body
        const articleName = req.params.name
        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ username, text})
            }
        });

        let updatedInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(updatedInfo);
    })

});
app.listen(8000, () => { console.log('App Server is up on port 8000..') })