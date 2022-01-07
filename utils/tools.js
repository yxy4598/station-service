
export function uniqueFunc(arr, uniId){
  const res = new Map();
  
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}

export function selectPartition(arr, title) {
  return arr.filter((item, index) =>  {
    if(item.district == title)
      return Object.assign({}, {'text': item.district, value: item.id})
  })
}

export function selectTitle(arr, id) {
  for(const item of arr) {
    if(item.value == id) {
      return item.text
    }
  }
}
