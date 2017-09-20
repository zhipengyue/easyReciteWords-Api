module.exports={
    validateParams(params,array){
        for(let i in array){
            if(params[array[i]]===''||params[array[i]]===undefined){
                return false
            }
        }
        return true
    },
    getParamsError(params,array){
        let result=[]
        for(let i in array){
            //console.log(params[array[i]])
            //console.log(params[array[i]]===''||params[array[i]]===undefined)
            if(params[array[i]]===''||params[array[i]]===undefined){
                result.push(array[i])
            }
        }
        return JSON.stringify(result)
    }
}