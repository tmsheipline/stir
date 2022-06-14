const requestURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=vodka,lemonade'

//filter multiple ingredients - gives back drink name,image, and ID based on search
// const requestURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i={ingArray}'

//Lookup drink by the ID
https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17206

fetch(requestURL).then((res) => {
    return res.json()
})
.then((cocktailData) => {
    console.log(cocktailData)
})
.catch((error) => {
    console.log(error)
})
