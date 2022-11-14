import xhr2 from 'xhr2';
import { parentPort } from 'worker_threads';

global.XMLHttpRequest = xhr2

parsePosts();

setTimeout(() => {
    parsePosts()
}, 300000)
// every 5 minute

function parsePosts() {
    let url = "https://lifehacker.com/rss";
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let posts = [ ...xmlHttp.responseText.matchAll(/<item>(.+?)<\/item>/gm)];
            posts = posts.map((item, index) => {
                const id = +([ ...item[1].matchAll(/<guid.+?>(.+?)<\/guid>/gm)][0][1]);
                const title = [ ...item[1].matchAll(/<title><!\[CDATA\[(.+?)]]><\/title>/gm)][0][1];
                const textAndImg = [ ...item[1].matchAll(/<description><!\[\w+\[(.*)]]><\/description>/gm) ][0][1];
                let createDate = [ ...item[1].matchAll(/<pubDate>(.+?)<\/pubDate>/gm)][0][1];
                createDate = new Date(createDate);
                createDate = `${createDate.getDate()}.${createDate.getMonth()}.${createDate.getFullYear()}  ${createDate.toLocaleTimeString()}`;
                const author = [ ...item[1].matchAll(/<dc:creator><!\[CDATA\[(.+?)]]><\/dc:creator>/gm)][0][1];
                const categories = [ ...item[1].matchAll(/(<category>(.+?)<\/category>)+?/gm)].map(category => {
                    return category[2];
                });
                let text = [...textAndImg.matchAll(/(<img.*?\/>)(.*)/gm)][0][2];
                let textMatchesArray = [...text.matchAll(/(<a.+?>((?!Read more).+?)<\/a>)/gm)];
                if (textMatchesArray.length > 0) {
                    textMatchesArray.forEach((item) => {
                        text = text.replace(item[1], item[2]);
                    })
                }
                textMatchesArray = [...text.matchAll(/(<em>(.+?)<\/em>)/gm)];
                if (textMatchesArray.length > 0) {
                    textMatchesArray.forEach((item) => {
                        text = text.replace(item[1], item[2]);
                    })
                }
                const img = [...textAndImg.matchAll(/(<img.*?\/>)(.*)/gm)][0][1];
                return { id, title, text, img, createDate, author, categories };
            });
            const postIds = posts.reduce((accumulator, currentValue) => {
                accumulator.push(currentValue.id);
                return accumulator;
            }, [])
             parentPort.postMessage({posts, postIds});
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}