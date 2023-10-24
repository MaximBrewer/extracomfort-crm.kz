
let arr = []

for (let h = 9; h < 20; ++h) {
    for (let m = 0; m < 65; m += 5) {
        arr.push({
            label: (h > 9 ? h : ('0' + h)) + ':' + (m > 9 ? m : ('0' + m)),
            value: (h > 9 ? h : ('0' + h)) + ':' + (m > 9 ? m : ('0' + m)),
        })
    }
}

export default {
    data: arr
}