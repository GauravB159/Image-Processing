function addComp(a,b){
    let c = {};
    c.real = a.real+b.real;
    c.imag = a.imag+b.imag;
    return c;
}

function subComp(a,b){
    let c = {};
    c.real = a.real-b.real;
    c.imag = a.imag-b.imag;
    return c;
}

function mulComp(a,b){
    let c = {};
    c.real = a.real*b.real - a.imag*b.imag;
    c.imag = a.real*b.imag + b.real*a.imag;
    return c;
} 

function divComp(a,b){
    let c = {},
        temp = (b.real*b.real + b.imag*b.imag);
    c.real = (a.real*b.real + a.imag*b.imag) / temp;
    c.imag = (a.imag*b.real - a.real*b.imag) / temp;
    return c;
}

function printComp(a){
    console.log(`${a.real} + ${a.imag}i`)
}

function doubleuNnk(N,n,k){
    let hold = k*n;
    hold /= N;
    let temp = {},
        theta = -2*Math.PI*hold;
    temp.real = parseFloat(Math.cos(theta).toFixed(2));
    temp.imag = parseFloat(Math.sin(theta).toFixed(2));
    return temp;
}
function arrToComp(arr){
    arr.forEach((a,i)=>{
        let temp = {};
        temp.real = a;
        temp.imag = 0;
        arr[i] = temp;
    });
    return arr;
}

function TwoDDFT(arr2){
    let te = [];
    let l = arr2[0].length;
    for(let i = 0; i < l;i++){
        te.push([]);
        for(let j = 0; j < l;j++){
            if((i+j) % 2 === 0){
                te[i].push(1);
            }else{
                te[i].push(-1);
            }
        }
    }
    let arr = [];
    for(let i = 0; i < arr2.length;i++){
        arr.push([]);
        for(let j = 0; j < arr2[i].length; j++){
            arr[i].push(arr2[i][j] * te[j][i])
        }
    }
    arr.forEach((a)=>{
        arrToComp(a);
    })
    let temp = [];
    for(let i = 0; i < arr.length; i++){
        temp.push([]);
        for(let j = 0; j < arr[i].length; j++){
            let t = {real:0,imag:0};
            for(let k = 0; k < arr[i].length; k++){
                let o = mulComp(doubleuNnk(arr[i].length,k,j),arr[i][k]);
                t = addComp(t,o)
            }
            temp[i].push(t);
        }
    }
    let result = [];
    for(let i = 0; i < temp.length; i++){
        result.push([]);
        for(let j = 0; j < temp[i].length; j++){
            let t = {real:0,imag:0};
            for(let k = 0; k < temp.length; k++){
                let o = mulComp(doubleuNnk(temp.length,k,i),temp[k][j])
                t = addComp(t,o)
            }
            t.real = parseInt(t.real);
            t.imag = parseInt(t.imag);
            result[i].push(t);
        }
    }    
    return result;
}
function TwoDIDFT(arr){
    let temp = [];
    for(let i = 0; i < arr.length; i++){
        temp.push([]);
        for(let j = 0; j < arr[i].length; j++){
            let t = {real:0,imag:0};
            for(let k = 0; k < arr[i].length; k++){
                let o = mulComp(doubleuNnk(arr[i].length,-k,j),arr[i][k]);
                t = addComp(t,o)
            }
            temp[i].push(divComp(t,{real:arr[i].length, imag:0}));
        }
    }
    let result = [];
    for(let i = 0; i < temp.length; i++){
        result.push([]);
        for(let j = 0; j < temp[i].length; j++){
            let t = {real:0,imag:0};
            for(let k = 0; k < temp.length; k++){
                let o = mulComp(doubleuNnk(temp.length,-k,i),temp[k][j])
                t = addComp(t,o)
            }
            result[i].push(divComp(t,{real:temp.length, imag:0}));
        }
    }
    for(let i = 0; i < result.length; i++){
        for(let j = 0; j < result[i].length; j++){
            if((i+j) % 2 === 1){
                result[i][j] = mulComp(result[i][j],{real: -1, imag: 0})
            }
        }
    }
    return result;
}

let arr = [
            [0,1,2,1],
            [1,0,1,2],
            [2,1,0,1],
            [1,2,1,0]
        ];


let result = TwoDDFT(arr);
console.log(result);
result = TwoDIDFT(result);
console.log(result);