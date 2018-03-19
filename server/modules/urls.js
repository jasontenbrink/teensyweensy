const urlsArray = []


const urls = {
    getUrls(){return urlsArray},
    addUrl(url){urlsArray.push(url)}
}


module.exports = urls