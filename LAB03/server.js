const connect=require('connect');
const url=require('url');

const app = connect();
app.listen(3000);

function calculate(method, x, y){
    switch(method){
        case 'add':
            return `${x} + ${y} = ${x+y}`;

        case 'subtract':
            return `${x} - ${y} = ${x-y}`;

        case 'multiply':
            return `${x} * ${y} = ${x*y}`;
        
        case 'divide':
            if (y==0){
                return 'Cannot divide by 0!';
            }
            else{
                return `${x} / ${y} = ${x/y}`
            }
        default:
            return 'Invalid method, check typing';
    }
}

function displayResult(req, res, next){
    const link=url.parse(req.url, true).query;
    const method=link.method;
    const x=parseFloat(link.x);
    const y=parseFloat(link.y);

    res.setHeader('Content-Type', 'text-plain');
    res.write(calculate(method, x, y));
    res.end();
}

app.use('/lab2', displayResult); //lab2 as in sample URLs
