const proxy = [{
    context: '/artists',
    target: 'http://localhost:8080',
    pathRewrite: { '^/artists': '' }
}];
module.exports = proxy;