const countDownForm =  document.getElementById('countDownForm')
const inputContainer = document.getElementById('input-container')
const dateEl = document.getElementById('date-picker')

const countDownEl = document.getElementById('countdown')
const countDownTitleEl = document.getElementById('countdown-title')
const countDownButton =  document.getElementById('countdown-button')
const timeEl = document.querySelectorAll('span')


const completeEl = document.getElementById('complete')
const completeInfo = document.getElementById('complete-info')
const completeTitle = document.getElementById('complete-title')
const completeButton = document.getElementById('complete-button')

//ตัวแปรควบคุมการทำงาน
let countDownTitle = '';
let countDownDate = '';

let countDownValue = Date; //เก็บวันที่เลือกจากฟอร์ม
let countDownActive; //ตัวนับเวลา
let saveCountDown; //เก็บข้อมูลหัวช้อและวันแจ้งเตือน (Object)

//ตัวแปรแปลงหน่วยเวลา
const second=1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

countDownForm.addEventListener('submit',updateCountDown)

function updateCountDown(e){
  e.preventDefault();
  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;
  console.log(countDownTitle,countDownDate);

  //! Validate
  if(countDownTitle === '' || countDownDate === ''){
    alert('ป้อนข้อมูลไม่ครบ')
  }else{
    saveCountDown={title:countDownTitle,date:countDownDate} 
    localStorage.setItem('countDown',JSON.stringify(saveCountDown)) //เก็บข้อมูลลง localStorage
    countDownValue = new Date(countDownDate).getTime() // !เวลาที่ตั้งไว้
    setUpTime(); //นับเวลาถอยหลัง
  }
}

function setUpTime(){
  countDownActive = setInterval(() => {
      //ตั้งเอาไว้ - ปัจจุบัน
      const now = new Date().getTime();
      const distance  =  countDownValue - now; 
      const days  = Math.floor(distance/day) 
      const hours = Math.floor((distance%day)/hour)
      const minutes = Math.floor((distance%hour)/minute)
      const seconds = Math.floor((distance%minute)/second)
      inputContainer.hidden=true;
      if(distance>0){
        //หมดเวลา
        countDownEl.hidden=true;
        completeEl.hidden=false;
        completeInfo.textContent=`${countDownTitle}  วันที่  ${countDownDate}`

        clearInterval(countDownActive)
      }else{
        countDownTitle.textContent = countDownTitle
        //นับถอยหลังเรื่อยๆ
        timeEl[0].textContent = `${days}`
        timeEl[1].textContent = `${hours}`
        timeEl[2].textContent = `${minutes}`
        timeEl[3].textContent = `${seconds}`
        countDownEl.hidden=false;
        completeEl.hidden=true;
      }
  }, second);
}

function callDataInStore(){
  if(localStorage.getItem('countDown')){
    saveCountDown = JSON.parse(localStorage.getItem('countDown'))
    countDownTitle=saveCountDown.title;
    countDownDate=saveCountDown.date;
    countDownValue = new Date(countDownDate).getTime() // !เวลาที่ตั้งไว้
    setUpTime();
  }else{

  }
}

function reset(){
  localStorage.removeItem('countDown')
  countDownEl.hidden=true;
  completeEl.hidden=true;
  inputContainer.hidden=false;
  clearInterval(countDownActive)
  countDownTitle=''
  countDownDate=''
}

countDownButton.addEventListener('click',reset)
completeButton.addEventListener('click',reset)

callDataInStore()