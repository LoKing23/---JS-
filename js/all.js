let data;
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
.then((res)=>{
  data = res.data.data;
  //森命週期
  (function init(){
    renderAll()
  })()
})
.catch((err)=>{
  console.log(err);
})
//資料
//1 將form資料抓出來組成obj
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
        formValue = +formValue
        break;
      case '套票組數':
        dataAttribute = "group"
        formValue = +formValue
        break;
      case '套票星級':
        dataAttribute = "rate"
        formValue = +formValue
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
//3 處理C3顯示資料
function getC3Data(){
  let areaObj = data.reduce((acc,item) => {
    let area = item.area;
    if(acc[area]) acc[area]++
    else acc[area]=1
    return acc
  },{})
  let areaArr = Object.keys(areaObj);
  let c3Data = areaArr.map((item)=>{
    return [item,areaObj[item]]
  })
  console.log(c3Data);
  return c3Data
}
//事件
//1 新增套票事件-> 取input、塞入data、重新render
const form_submit = document.querySelector('.ticket__form a')
form_submit.addEventListener('click',(e)=>{
  e.preventDefault;
  let newData = getFormObj();
  cleanFormValue();
  addData(newData);
  renderAll();
})
//2 areaFilter事件-> 監聽改變重新render合適項目
const areaFilter = document.querySelector('.areaFilter');
console.log(areaFilter.value);
areaFilter.addEventListener('change',e => {
  let value = e.target.value;
  if(value === 'all'){
    renderCard()
  }else{
    let newData = data.filter(item => item.area === value)
    renderCard(newData)
  }
})
//畫面
//1. render: 卡片、資料筆數
function renderCard(newData = data){
  //渲染卡片
  const cardArea = document.querySelector('.cardArea');
  // newData = newData || data;
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
  // 渲染資料筆數
  const num = document.querySelector('.areaFilter + span');
  let totalData = newData.length;
  num.innerHTML = `本次搜尋共${totalData}筆資料`
}
//2. render C3
function renderC3(){
  let c3Data = getC3Data();
  let chart = c3.generate({
    bindto: '#donut',
    data: {
      columns: c3Data,
      type : 'donut',
      colors: {
        台北: '#26BFC7',
        台中: '#5151D3',
        高雄: '#E68618'
      }
    }, 
    donut: {
        title: "套票地區比重",
        width: 10,
        label: {
          show: false
        }
    }
  });

}
//3. 將依據data render的方法綁在一起
function renderAll(){
  renderCard()
  renderC3()
}
