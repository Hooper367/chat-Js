
const inputForm = document.querySelector('#inputForm');
let inputValue = document.querySelector('#inputValue');
let result = document.querySelector(".result")
let arr = [];
const queryString = window.location.search, urlParams = new URLSearchParams(queryString)
let myName = urlParams.get('userName');
let arrmsgs = local();

 let user = urlParams.get('userName')


class msgs  {
    constructor(id,user,msg){

        this.id = id ,
        this.user = user,
        this.msg = msg,
        this.date = new Date(id)
    }
}


function local(){
    let values = [], keys = Object.keys(localStorage), i = keys.length;

    while(i--){
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    values.sort((a,b) => (a.id > b.id) ? 1 : -1) 
    
    return values;
    
}

result.innerHTML = arrmsgs.map( elem => 
    
    elem.user == myName  ?
    ` <div class="my-2 chat-ctn d-flex justify-content-end text-end">
    <div class="arrow arrow-user bg-success"></div>
    <div class="rounded text-light user bg-success p-2 col-7">${elem.msg}</div>
    </div>` 
      
    :
    `<div class="my-2 chat-ctn d-flex justify-content-start">
    <div class="arrow arrow-contact bg-primary"></div>
    <div class="rounded text-light contact p-2 bg-primary col-7">${elem.msg}</div>
    </div>`  


).join('');
    
// console.log(msg[0].userName);

inputForm.addEventListener('submit', e =>Typing(e))

inputValue.addEventListener('input', e => Typing(e))
  
function Typing(e){
    let test = document.querySelectorAll('.test');
    
    if(e.type == 'input'){
        // console.log('input');
    
        if (e.target.value !== "" && !test.length ) {

        result.insertAdjacentHTML('beforeend',
         `<div class="my-2 chat-ctn test  d-flex justify-content-baseline">
            <div class="arrow arrow-contact bg-primary"></div>
                <div class="rounded text-light contact p-2 bg-primary col-7">
                    <div class="d-flex">
                        <div class="round-text"></div>
                        <div class="round-text"></div>
                        <div class="round-text"></div>
            
                    </div>
                </div>
            </div>`,
                           )
    } else if(e.target.value == "" && test.length > 0){
        test.forEach(e => e.remove())
    } 
        
    }else if(e.type == 'submit'){
        // console.log('submit');
       let time =  new Date().getTime();
        // let today = Math.floor(Date.now()/1000);
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let user = urlParams.get('userName');
        let message = new msgs(time,user,inputValue.value)
         e.preventDefault();
         if(  test.length > 0){
          
            test.forEach(e => e.remove())

            if(user == myName){
                
                result.insertAdjacentHTML('beforeend' ,
                `<div class="fw-6">envoyer à :${hours}h${minutes}m${seconds}s</div>
                 <div class="my-2 chat-ctn d-flex justify-content-end text-end">
                 <div class="arrow arrow-user bg-success"></div>
                 <div class="rounded text-light user bg-success p-2 col-7">${inputValue.value}</div>
                 </div>` 
                )    
            }
            else{
                result.insertAdjacentHTML('beforeend' ,`
                <div class="fw-6">envoyer à :${hours}h${minutes}m${seconds}s</div>
                <div class="my-2 chat-ctn d-flex justify-content-start">
                <div class="arrow arrow-contact bg-primary"></div>
                <div class="rounded text-light contact p-2 bg-primary col-7">${inputValue.value}</div>
                </div>`
                )     
            }
            localStorage.setItem(time,JSON.stringify(message));
    }
    }
}