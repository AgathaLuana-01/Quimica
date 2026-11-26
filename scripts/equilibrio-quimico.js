
(function(){
 const cards=[...document.querySelectorAll('.eq-page .exam-quiz')];
 const progress=document.getElementById('eq-progress');
 const prog2=document.getElementById('quiz-progress');
 const teacher=document.getElementById('eq-teacher');
 const reset=document.getElementById('eq-reset');
 const print=document.getElementById('eq-print');
 let teacherMode=false;
 function update(){
  const tried=cards.filter(c=>c.dataset.tried==='true').length;
  const correct=cards.filter(c=>c.dataset.tried==='true'&&c.dataset.correct==='true').length;
  const msg=`${tried} de ${cards.length} corrigidas · ${correct} acertos`;
  progress.textContent=msg;
  if(prog2)prog2.textContent=msg;
 }
 cards.forEach(card=>{
  const btn=card.querySelector('.check-answer');
  const feed=card.querySelector('.answer-feedback');
  const details=card.querySelector('.solution-box');
  btn.addEventListener('click',()=>{
   const selected=card.querySelector('input[type=radio]:checked');
   if(!selected){feed.textContent='Selecione uma alternativa antes de conferir.';feed.className='answer-feedback is-warning';return;}
   const correct=selected.value===card.dataset.answer;
   card.dataset.tried='true';card.dataset.correct=String(correct);
   feed.textContent=correct?`✓ Correto! Alternativa ${card.dataset.answer}. Veja a resolução passo a passo.`:`✗ Você marcou ${selected.value}. A resposta é ${card.dataset.answer}. Leia o passo a passo.`;
   feed.className='answer-feedback '+(correct?'is-correct':'is-wrong');
   card.querySelectorAll('.option-row').forEach(row=>{
    row.classList.remove('is-answer','is-selected-wrong');
    const opt=row.querySelector('input');
    if(opt.value===card.dataset.answer)row.classList.add('is-answer');
    else if(opt.checked)row.classList.add('is-selected-wrong');
   });
   details.open=true;
   update();
  });
 });
 teacher.addEventListener('click',()=>{
  teacherMode=!teacherMode;
  teacher.setAttribute('aria-pressed',String(teacherMode));
  teacher.textContent=teacherMode?'👩‍🏫 Ocultar resoluções':'👩‍🏫 Modo professor';
  cards.forEach(c=>{c.querySelector('.solution-box').open=teacherMode;});
 });
 reset.addEventListener('click',()=>{
  cards.forEach(c=>{
   c.querySelectorAll('input[type=radio]').forEach(i=>i.checked=false);
   c.querySelectorAll('.option-row').forEach(r=>r.classList.remove('is-answer','is-selected-wrong'));
   c.querySelector('.solution-box').open=false;
   c.querySelector('.answer-feedback').textContent='';
   c.querySelector('.answer-feedback').className='answer-feedback';
   delete c.dataset.tried;delete c.dataset.correct;
  });
  teacherMode=false;teacher.setAttribute('aria-pressed','false');teacher.textContent='👩‍🏫 Modo professor';update();
 });
 print.addEventListener('click',()=>{
  const prev=cards.map(c=>c.querySelector('.solution-box').open);
  cards.forEach(c=>c.querySelector('.solution-box').open=true);
  setTimeout(()=>{window.print();setTimeout(()=>cards.forEach((c,i)=>c.querySelector('.solution-box').open=prev[i]),400)},50);
 });
 update();
})();
