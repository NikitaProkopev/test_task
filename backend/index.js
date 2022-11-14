import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/scheme.js';
import { Worker } from 'worker_threads';
import postQueryDbService from "./services/db/post/post.query.db.service.js";
import postMutationDBService from "./services/db/post/post.mutation.db.service.js";
import cors from 'cors'


const runService = () => {
    return new Promise((resolve, reject) => {

        const worker = new Worker('./workers/parser/parserWorker.js');
        worker.on('message', ({posts, postIds}) => {
            postQueryDbService.checkIsIdsExist(postIds).then((result) => {
                result.forEach((isPostExist, index) => {
                    if (!isPostExist) {
                        let post = posts[index];
                        console.log(post);
                        postMutationDBService.createPost(post.title, post.text, post.img, post.createDate, post.author, post.categories, post.id)
                            .catch((err) => {
                                console.log(err, 'create post result');
                            })
                    }
                })
            });
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`stopped with  ${code} exit code`));
        })
    })
}

const run = () => {
    return runService()
}

run().catch(err => console.error(err))



const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');