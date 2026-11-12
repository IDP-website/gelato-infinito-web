(function(){
  // Hours by weekday (0 = Sunday), in South African time
  var HOURS={0:[10,18],1:[10,17],2:[10,18],3:[10,18],4:[10,18],5:[10,19],6:[10,19]};
  function sast(){var d=new Date(Date.now()+(new Date().getTimezoneOffset()+120)*60000);return {day:d.getDay(),h:d.getHours()+d.getMinutes()/60}}
  function fmt(h){var m=Math.round((h%1)*60);return String(Math.floor(h)).padStart(2,"0")+":"+String(m).padStart(2,"0")}
  var t=sast(),today=HOURS[t.day];
  var el=document.querySelector("[data-status]"),txt=document.querySelector("[data-status-text]");
  if(el&&txt){
    if(t.h>=today[0]&&t.h<today[1]){el.classList.add("open");txt.textContent="Open now · until "+fmt(today[1])}
    else if(t.h<today[0]){el.classList.add("closed");txt.textContent="Opens today at "+fmt(today[0])}
    else{var n=(t.day+1)%7;el.classList.add("closed");txt.textContent="Closed now · opens tomorrow at "+fmt(HOURS[n][0])}
  }
  var row=document.querySelector('.hours tr[data-day="'+t.day+'"]');if(row)row.classList.add("today");
  // Reveal on scroll
  var io="IntersectionObserver" in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12}):null;
  document.querySelectorAll(".reveal").forEach(function(r){io?io.observe(r):r.classList.add("in")});
})();
