const flip = (d, a) => {
    let sortedArray = [];
    if (d === 'R') {
        for (let i = 0; i < a.length; i++) {
            // console.log(`start of ith loop: ${i}`)
            let num = 0;
            for (let j = 0; j < a.length; j++) {
                if (num < a[j] && num ) {
                    num = a[j];
                }
                // console.log(`start of J loop: ${j}`)
            }
            console.log(num);
        }
    }

}

flip('R', [1, 2, 3, 2])