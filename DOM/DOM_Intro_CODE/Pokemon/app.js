// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector('#container')

for (i = 1; i <= 151; i++) {
    let pokContainer = document.createElement('div');

    let pokImage = document.createElement('img')
    pokImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`

    let pokNum = document.createElement('span')
    pokNum.innerText = i
    pokNum.style.alignContent = 'center'

    pokContainer.append(pokImage);
    pokContainer.append(pokNum);
    container.append(pokContainer)
    pokContainer.classList.add('pokemon')

    
    
    // let pokImage = document.createElement('img')
    // pokImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
    // container.append(pokImage)
}

