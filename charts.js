/* Charts are created when scrolled into view so their entry animation is seen. */
const css=n=>getComputedStyle(document.documentElement).getPropertyValue('--'+n).trim(),CUTS=Object.keys(DATA.sim).map(Number);
const ti=t=>({display:true,text:t,color:css('soft')});
function chartDefaults(){Chart.defaults.font.family="'Geist Mono',monospace";Chart.defaults.font.size=11;Chart.defaults.color=css('soft')}
const grid=()=>({color:css('line')}),tip=()=>({backgroundColor:css('panel'),borderColor:css('line'),borderWidth:1,titleColor:css('ink'),bodyColor:css('soft'),padding:10,displayColors:false});
function mkTier(){
 new Chart($('#tierChart'),{type:'bar',data:{labels:DATA.tiers.map(t=>t.n+' '+t.r),datasets:[{data:DATA.tiers.map(t=>t.v),backgroundColor:DATA.tiers.map(t=>css(t.c=='ok'?'acc':t.c)),borderRadius:3,maxBarThickness:60}]},
 options:{responsive:true,maintainAspectRatio:false,animation:RM?false:{duration:900,easing:'easeOutQuart',delay:c=>c.type==='data'&&c.mode==='default'?c.dataIndex*140:0},
 plugins:{legend:{display:false},tooltip:{...tip(),callbacks:{label:c=>c.parsed.y.toFixed(2)+'% defaulted'}}},
 scales:{y:{beginAtZero:true,max:100,grid:grid(),border:{display:false},ticks:{callback:v=>v+'%'},title:ti('Default rate')},x:{grid:{display:false},ticks:{font:{size:10}},title:ti('Credit tier (score)')}}}});
}
function mkTrade(){
 const mk={id:'mk',afterDatasetsDraw(c){const i=CUTS.indexOf(+$('#sl').value);if(i<0)return;const x=c.scales.x.getPixelForValue(i),g=c.ctx;g.save();g.strokeStyle=css('ink');g.setLineDash([3,4]);g.beginPath();g.moveTo(x,c.chartArea.top);g.lineTo(x,c.chartArea.bottom);g.stroke();g.restore()}};
 const d=1400/CUTS.length,prev=c=>c.chart.getDatasetMeta(c.datasetIndex).data[c.index-1];
 const draw=RM?false:{x:{type:'number',easing:'linear',duration:d,from:NaN,delay(c){if(c.type!=='data'||c.xStarted)return 0;c.xStarted=true;return c.index*d}},
  y:{type:'number',easing:'linear',duration:d,from:c=>c.index===0?c.chart.scales[c.dataset.yAxisID].getPixelForValue(c.dataset.data[0]):prev(c).getProps(['y'],true).y,delay(c){if(c.type!=='data'||c.yStarted)return 0;c.yStarted=true;return c.index*d}}};
 window.tradeInst=new Chart($('#tradeChart'),{type:'line',plugins:[mk],data:{labels:CUTS,datasets:[
  {label:'Default rate (%)',data:CUTS.map(c=>DATA.sim[c][2]),borderColor:css('bad'),backgroundColor:css('bad'),yAxisID:'y',tension:.35,pointRadius:0,pointHoverRadius:4,borderWidth:2},
  {label:'Net profit ($M)',data:CUTS.map(c=>DATA.sim[c][5]),borderColor:css('acc'),backgroundColor:css('acc'),yAxisID:'y1',tension:.35,pointRadius:0,pointHoverRadius:4,borderWidth:2}]},
 options:{responsive:true,maintainAspectRatio:false,animations:draw,interaction:{mode:'index',intersect:false},plugins:{legend:{labels:{usePointStyle:true,boxWidth:7,boxHeight:7}},tooltip:{...tip(),displayColors:true}},
 scales:{y:{beginAtZero:true,grid:grid(),border:{display:false},ticks:{callback:v=>v+'%',color:css('bad')},title:ti('Default rate')},y1:{beginAtZero:true,position:'right',grid:{drawOnChartArea:false},border:{display:false},ticks:{callback:v=>'$'+v+'M',color:css('acc')},title:ti('Net profit')},x:{grid:{display:false},ticks:{maxTicksLimit:8},title:ti('Minimum score cut-off')}}}});
}
