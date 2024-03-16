const maxPerWallet = 1;

const getTime = (t) => {
    const date = new Date().getTime() + t
    const dateTimes = new Date(date)
    const timer = date -  new Date().getTime()
  
    return {
      year: dateTimes.getFullYear(),
      month: dateTimes.getMonth(),
      day: dateTimes.getDate(),
      hours: dateTimes.getHours(),
      minutes: dateTimes.getMinutes(),
      seconds: dateTimes.getSeconds(),
      timer: timer
    }
  }
  
  const time = getTime(1000 * 60 * 5)

  const settingPprogres = {
    supply: 1000,
    minted: 531,
    end: 972,
    buy: [1, 15],
    change: [0, 15],
    timer: time.timer
  }
  
  document.addEventListener('DOMContentLoaded', function() {
      const t = new Date(time.year, time.month, time.day, time.hours, time.minutes, time.seconds).getTime()
  
      if(!localStorage.getItem("date")) {
        localStorage.setItem("date", t)
      }
  
    });
  
    const PROGRESSBAR = document.querySelector('[data-id="progressBar"]');
    const PROC = document.querySelector('[data-id="procent"]');
    const MINTED = document.querySelector('[data-id="minNumber"]');
    const SUPPLY = document.querySelector('[data-id="maxNumber"]');

    const totalSup = document.querySelector('[data-id="totalSup"]');

    totalSup.innerHTML = settingPprogres.supply;
  
    document.addEventListener('DOMContentLoaded', function() {
      const supply = settingPprogres.supply
      const minted = !!localStorage.getItem('minted') ? Number(localStorage.getItem('minted')) : settingPprogres.minted
  
      const persent = (Number(minted) / (Number(supply) / 100)).toFixed()
     
      PROC.innerHTML = `${persent}`
      MINTED.innerHTML = minted
      SUPPLY.innerHTML = supply
  
      PROGRESSBAR.style = `width: ${persent}%;`
  
      Progres()
    });
  
    let buy = settingPprogres.buy
    let minted = !!localStorage.getItem('minted') ? Number(localStorage.getItem('minted')) : settingPprogres.minted
    let supply = settingPprogres.supply
    let end = settingPprogres.end
    let timer = !!localStorage.getItem("timer") ? Number(localStorage.getItem("timer")) : settingPprogres.timer 
  
    const Progres = () => {
      const ost = Number(end) - Number(minted)
  
      const interval = Number(timer / ost).toFixed()
  
      
      setTimeout(() => {
        const curr = getRandomInt(buy[0], buy[1] > ost ? ost : buy[1])
        const change = getRandomInt(settingPprogres.change[0], settingPprogres.change[1])
  
        if(ost > 0 && timer > 0) {
          
            if(change === 2) {
              minted = minted + curr
  
              const persent = (Number(minted) / (Number(supply) / 100)).toFixed()
        
              PROC.innerHTML = `${persent}`
              MINTED.innerHTML = minted
              SUPPLY.innerHTML = supply
          
              PROGRESSBAR.style = `width: ${persent}%;`
  
              localStorage.setItem('minted', minted);
            }
  
          Progres()
        }
       
      }, interval)
    }
  
    setInterval(() => {
      timer = timer - 1000
      if(timer < 0) {
        
      } else {
        localStorage.setItem("timer", timer)
      }
      
    }, 1000)
  
  
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }