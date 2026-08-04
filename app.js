const completed=new Set(),totalInteractions=4;
const progressLabel=document.getElementById("progressLabel");
const progressBar=document.getElementById("progressBar");
function completeInteraction(name){completed.add(name);const count=completed.size;progressLabel.textContent=count+" of "+totalInteractions+" interactions completed";progressBar.style.width=(count/totalInteractions*100)+"%";}
const decisionCards=document.querySelectorAll(".decision-card"),exploredDecisions=new Set();
decisionCards.forEach((card,index)=>card.addEventListener("click",()=>{card.classList.add("explored");exploredDecisions.add(index);if(exploredDecisions.size===decisionCards.length)completeInteraction("decisions");}));
const actionItems=document.querySelectorAll(".action-item"),exploredEnergy=new Set();
actionItems.forEach((item,index)=>item.addEventListener("click",()=>{item.classList.add("explored");exploredEnergy.add(index);if(exploredEnergy.size===actionItems.length)completeInteraction("energy");}));
const rCards=document.querySelectorAll(".r-card"),rDetail=document.getElementById("rDetail"),exploredRs=new Set();
rCards.forEach((card,index)=>card.addEventListener("click",()=>{rCards.forEach(item=>item.classList.remove("active"));card.classList.add("active");rDetail.textContent=card.dataset.detail;exploredRs.add(index);if(exploredRs.size===rCards.length)completeInteraction("waste");}));
document.querySelectorAll(".purchase-card").forEach(card=>card.addEventListener("click",()=>card.classList.add("explored")));
const impactChoices=document.querySelectorAll(".impact-choice"),impactMessage=document.getElementById("impactMessage"),selectedImpact=new Set();
impactChoices.forEach((choice,index)=>choice.addEventListener("click",()=>{choice.classList.toggle("selected");choice.classList.contains("selected")?selectedImpact.add(index):selectedImpact.delete(index);if(selectedImpact.size===impactChoices.length){impactMessage.textContent="Together, these everyday choices create meaningful, lasting impact.";completeInteraction("impact");}else impactMessage.textContent=selectedImpact.size+" of "+impactChoices.length+" actions selected.";}));
