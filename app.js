const completed=new Set(),totalInteractions=5;
const progressLabel=document.getElementById("progressLabel");
const progressBar=document.getElementById("progressBar");
function completeInteraction(name){completed.add(name);const count=completed.size;progressLabel.textContent=count+" of "+totalInteractions+" interactions completed";progressBar.style.width=(count/totalInteractions*100)+"%";}

const choiceData={
  print:{icon:"🖨️",kicker:"Use less",title:"Print only when needed",why:"Printing uses paper, ink and energy and creates waste. Choosing digital options when practical reduces those impacts before they are created.",tip:"Preview documents first and share a digital copy when a printed version is not necessary."},
  reuse:{icon:"📓",kicker:"Extend its life",title:"Use what you already have",why:"Using supplies and equipment for longer avoids unnecessary purchases and the materials, manufacturing and transportation behind new products.",tip:"Before ordering something new, check whether your team or office already has something that will work."},
  reusable:{icon:"💧",kicker:"Choose repeat use",title:"Choose reusable items",why:"Reusable bottles, mugs and containers prevent repeated single-use waste and reduce the need to continually replace disposable items.",tip:"Keep a reusable bottle or mug somewhere visible so it becomes the easy default."},
  power:{icon:"🖥️",kicker:"Use energy intentionally",title:"Turn off unused equipment",why:"Monitors, lights and other equipment can continue using electricity when they are left on unnecessarily. Powering down helps lower energy use and associated emissions.",tip:"Before leaving a room or finishing for the day, take a quick look for equipment that can be switched off."}
};
const choiceTabs=document.querySelectorAll(".choice-tab");
const choiceStage=document.getElementById("choiceStage");
const choiceStageIcon=document.getElementById("choiceStageIcon");
const choiceStageKicker=document.getElementById("choiceStageKicker");
const choiceStageTitle=document.getElementById("choiceStageTitle");
const choiceStageWhy=document.getElementById("choiceStageWhy");
const choiceTip=document.getElementById("choiceTip");
const choiceCount=document.getElementById("choiceCount");
const exploredChoices=new Set();
choiceTabs.forEach(tab=>tab.addEventListener("click",()=>{
  const key=tab.dataset.choice,data=choiceData[key];
  choiceTabs.forEach(item=>{item.classList.remove("active");item.setAttribute("aria-selected","false")});
  tab.classList.add("active","explored");tab.setAttribute("aria-selected","true");
  choiceStage.classList.remove("choice-stage-pop");void choiceStage.offsetWidth;choiceStage.classList.add("choice-stage-pop");
  choiceStageIcon.textContent=data.icon;choiceStageKicker.textContent=data.kicker;choiceStageTitle.textContent=data.title;choiceStageWhy.textContent=data.why;choiceTip.innerHTML="<strong>Try this:</strong> "+data.tip;
  exploredChoices.add(key);choiceCount.textContent=exploredChoices.size+" of "+choiceTabs.length+" explored";
  if(exploredChoices.size===choiceTabs.length){choiceCount.textContent="All 4 explored ✓";completeInteraction("decisions");}
}));

const energyHabits=document.querySelectorAll(".energy-habit");
const energyMeterFill=document.getElementById("energyMeterFill");
const energyScore=document.getElementById("energyScore");
const energyFeedback=document.getElementById("energyFeedback");
const selectedEnergy=new Set();
const energyMessages=[
  "Start with one habit you can make part of your routine.",
  "Good start. One consistent habit can reduce unnecessary energy use.",
  "You’re building a more energy-conscious workday.",
  "Almost there — small habits reinforce each other.",
  "Energy-smart workday complete. Consistency is what turns these choices into impact."
];
energyHabits.forEach((habit,index)=>habit.addEventListener("click",()=>{
  const selected=habit.getAttribute("aria-pressed")==="true";
  habit.setAttribute("aria-pressed",String(!selected));
  habit.classList.toggle("selected",!selected);
  if(!selected)selectedEnergy.add(index);else selectedEnergy.delete(index);
  const count=selectedEnergy.size;
  energyMeterFill.style.width=(count/energyHabits.length*100)+"%";
  energyScore.textContent=count+" of "+energyHabits.length+" habits selected";
  energyFeedback.textContent=energyMessages[count];
  if(count===energyHabits.length){energyScore.textContent="4 of 4 habits selected ✓";completeInteraction("energy");}
}));

const rCards=document.querySelectorAll(".r-card"),rDetail=document.getElementById("rDetail"),exploredRs=new Set();
rCards.forEach((card,index)=>card.addEventListener("click",()=>{rCards.forEach(item=>{item.classList.remove("active");item.setAttribute("aria-pressed","false")});card.classList.add("active");card.setAttribute("aria-pressed","true");rDetail.textContent=card.dataset.detail;exploredRs.add(index);if(exploredRs.size===rCards.length)completeInteraction("waste");}));

const purchaseSteps=[
  {
    number:"01",
    label:"Reuse first",
    question:"Do we already have something that can meet this need?",
    helper:"The best purchase is sometimes the one we do not need to make.",
    options:[
      {text:"Yes — reuse what we have",feedback:"Great choice. Reusing an existing item avoids a new purchase and extends the life of resources already in use."},
      {text:"No — continue the check",feedback:"If there is not a suitable item available, move on and make the new purchase as thoughtfully as possible."}
    ]
  },
  {
    number:"02",
    label:"Right-size it",
    question:"Are we purchasing only what we actually need?",
    helper:"Extra quantity can become unused stock, unnecessary cost, and eventually waste.",
    options:[
      {text:"Yes — the quantity fits the need",feedback:"Exactly. Buying the right amount helps prevent unnecessary materials, packaging, and waste."},
      {text:"Not yet — adjust the quantity",feedback:"Good catch. Reduce the order to what is realistically needed before moving forward."}
    ]
  },
  {
    number:"03",
    label:"Choose better",
    question:"Which option should we prioritize when a purchase is necessary?",
    helper:"Look beyond the immediate purchase and consider how the product and supplier create value over time.",
    options:[
      {text:"Durable, lower-packaging, responsibly sourced",feedback:"That is the stronger choice. Prioritize quality products built to last, reduce packaging and single-use items, and consider small businesses and diverse suppliers where appropriate."},
      {text:"Disposable or short-lived when a better option exists",feedback:"Take another look. A durable option with less packaging can reduce repeated purchasing and waste over time."}
    ]
  }
];
let purchaseStep=0;
const purchaseNumber=document.getElementById("purchaseNumber");
const purchaseLabel=document.getElementById("purchaseLabel");
const purchaseQuestion=document.getElementById("purchaseQuestion");
const purchaseHelper=document.getElementById("purchaseHelper");
const purchaseOptions=document.getElementById("purchaseOptions");
const purchaseFeedback=document.getElementById("purchaseFeedback");
const purchaseNext=document.getElementById("purchaseNext");
const purchaseTrackFill=document.getElementById("purchaseTrackFill");
function renderPurchaseStep(){
  const step=purchaseSteps[purchaseStep];
  purchaseNumber.textContent=step.number;purchaseLabel.textContent=step.label;purchaseQuestion.textContent=step.question;purchaseHelper.textContent=step.helper;
  purchaseOptions.innerHTML="";purchaseFeedback.textContent="Choose the response that best fits the situation.";purchaseFeedback.classList.remove("answered");purchaseNext.hidden=true;
  step.options.forEach(option=>{const button=document.createElement("button");button.type="button";button.className="purchase-option";button.textContent=option.text;button.addEventListener("click",()=>{purchaseOptions.querySelectorAll(".purchase-option").forEach(item=>item.classList.remove("selected"));button.classList.add("selected");purchaseFeedback.textContent=option.feedback;purchaseFeedback.classList.add("answered");purchaseNext.hidden=false;purchaseNext.textContent=purchaseStep===purchaseSteps.length-1?"Finish the check ✓":"Next question →";});purchaseOptions.appendChild(button);});
  purchaseTrackFill.style.width=(purchaseStep/purchaseSteps.length*100)+"%";
}
purchaseNext.addEventListener("click",()=>{
  if(purchaseStep<purchaseSteps.length-1){purchaseStep++;renderPurchaseStep();}
  else{purchaseTrackFill.style.width="100%";purchaseNumber.textContent="✓";purchaseLabel.textContent="Ready to purchase thoughtfully";purchaseQuestion.textContent="Use this quick check whenever you are ordering for Acumetis.";purchaseHelper.textContent="Reuse first, buy only what is needed, and choose durable, lower-impact options and responsible suppliers where possible.";purchaseOptions.innerHTML="";purchaseFeedback.textContent="Thoughtful purchasing reduces waste, conserves resources, and supports more responsible supply chains.";purchaseFeedback.classList.add("answered");purchaseNext.hidden=true;completeInteraction("purchasing");}
});
renderPurchaseStep();

const impactChoices=document.querySelectorAll(".impact-choice"),impactMessage=document.getElementById("impactMessage"),selectedImpact=new Set();
impactChoices.forEach((choice,index)=>choice.addEventListener("click",()=>{choice.classList.toggle("selected");choice.classList.contains("selected")?selectedImpact.add(index):selectedImpact.delete(index);if(selectedImpact.size===impactChoices.length){impactMessage.textContent="Together, these everyday choices create meaningful, lasting impact.";completeInteraction("impact");}else impactMessage.textContent=selectedImpact.size+" of "+impactChoices.length+" actions selected.";}));
