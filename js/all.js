let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];
let obj = [
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
]
//資料
//1 將form資料抓出來組成obj
function getFormObj(){
  const labels = document.querySelectorAll('.ticket__form label');
  const obj = {};
  labels.forEach(item => {
    let formAttribute = item.childNodes[0].data.trim();
    let formValue = item.childNodes[1].value;
    let dataAttribute;
    //將formAttribute對應的屬性存進dataAttribute
    switch(formAttribute){
      case '套票名稱':
        dataAttribute = "name"
        break;
      case '圖片網址':
        dataAttribute = "imgUrl"
        break;
      case '景點地區':
        dataAttribute = "area"
        break;
      case '套票金額':
        dataAttribute = "price"
        break;
      case '套票組數':
        dataAttribute = "group"
        break;
      case '套票星級':
        dataAttribute = "rate"
        break;
      case '套票描述':
        dataAttribute = "description"
        break;
    }
    obj[dataAttribute] = formValue
  })

  return obj
}
//2 清空form資料
function cleanFormValue(){
  const labels = document.querySelectorAll(".ticket__form label");
  labels.forEach(item => {
    item.childNodes[1].value = "";
  })
}
function addData(newData){
  data.push(newData);
}
//事件
//1 新增套票事件-> 取input、塞入data、重新render
const form_submit = document.querySelector('.ticket__form a')
form_submit.addEventListener('click',(e)=>{
  e.preventDefault;
  let newData = getFormObj();
  cleanFormValue();
  addData(newData);
  renderCard();
})
//2 areaFilter事件-> 監聽改變重新render合適項目
const areaFilter = document.querySelector('.areaFilter');
console.log(areaFilter.value);
areaFilter.addEventListener('change',e => {
  let value = e.target.value;
  if(value === 'all'){
    render()
  }else{
    let newData = data.filter(item => item.area === value)
    renderCard(newData)
  }
})
//畫面
// 1. render
function renderCard(newData){
  const cardArea = document.querySelector('.cardArea');
  newData = newData || data;
  let str = newData.reduce((acc, item)=>{   
    acc += 
    `<!-- card-head -->
        <div class="card">
          <div class="card-head">
            <div class="card-imgWrap">
              <img src="${item.imgUrl}" alt="">
            </div>
            <div class="card-head-area">${item.area}</div>
            <div class="card-head-level">${item.rate}</div>
          </div>
          <!-- card-body -->
          <div class="card-body">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="card-foot">
              <div>
                <i class="fas fa-exclamation-circle"></i>
                <em>剩下最後 ${item.group} 組</em>
              </div>
              <span>TWD <strong>$${item.price}</strong></span>
            </div>
          </div>
        </div>`
    return acc
  },"")
  cardArea.innerHTML = str;
}

//森命週期
(function init(){
  renderCard()
})()