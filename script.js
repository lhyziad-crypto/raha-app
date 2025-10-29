
function playSound(type) {
  let sound;
  if (type === 'breath') sound = new Audio('sounds/breath.mp3');
  else if (type === 'meditation') sound = new Audio('sounds/meditation.mp3');
  if (sound) sound.play();
  else alert("الصوت غير متوفر حالياً 🎵");
}
// تتبع المزاج
const moodInput = document.getElementById('mood');
const moodText = document.getElementById('mood-text');
const moodChartCtx = document.getElementById('moodChart');
let moodData = JSON.parse(localStorage.getItem('moodData')) || {};
const moods = {1:"😞 حزين",2:"😐 عادي",3:"🙂 متوازن",4:"😊 مرتاح",5:"😄 سعيد"};
if(moodInput){ moodInput.addEventListener('input',()=>{ moodText.textContent = moods[moodInput.value]; }); }
function saveMood(){
  const day = document.getElementById('day').value;
  const moodValue = parseInt(document.getElementById('mood').value);
  moodData[day] = moodValue;
  localStorage.setItem('moodData', JSON.stringify(moodData));
  updateChart();
}
function updateChart(){
  const labels = Object.keys(moodData);
  const data = Object.values(moodData);
  if(window.moodChart) window.moodChart.destroy();
  window.moodChart = new Chart(moodChartCtx, {
    type: 'line',
    data: { labels: labels, datasets: [{ label: 'المزاج', data: data, borderColor:'#2e7d32', backgroundColor:'rgba(46,125,50,0.2)', fill:true }]},
    options:{ responsive:true, scales:{ y:{ min:1, max:5, ticks:{ stepSize:1 } } } }
  });
}
if(moodChartCtx) updateChart();
