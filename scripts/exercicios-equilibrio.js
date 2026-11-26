
(function(){
  const cards=[...document.querySelectorAll('.exam-quiz')];
  const teacher=document.getElementById('teacher-mode');
  const progress=document.getElementById('progress');
  let teacherOn=false;
  function update(){
    const tried=cards.filter(c=>c.dataset.tried==='true').length;
    const acertos=cards.filter(c=>c.dataset.tried==='true'&&c.dataset.correct==='true').length;
    progress.textContent=`${tried} de ${cards.length} corrigidas · ${acertos} acertos`;
    document.getElementById('score').textContent=`Seu progresso: ${tried}/${cards.length} corrigidas e ${acertos} acertos.`;
    document.getElementById('score').hidden=tried===0;
  }
  function resetCard(c){
    c.querySelectorAll('input[type=radio]').forEach(input=>input.checked=false);
    c.querySelectorAll('.option-row').forEach(r=>r.classList.remove('is-answer','is-selected-wrong'));
    const f=c.querySelector('.answer-feedback'); f.textContent=''; f.className='answer-feedback';
    c.querySelector('.solution-box').open=teacherOn;
    delete c.dataset.tried;delete c.dataset.correct;
    update();
  }
  cards.forEach(c=>{
    c.querySelector('.check-answer').addEventListener('click',()=>{
      const selected=c.querySelector('input[type=radio]:checked');
      const f=c.querySelector('.answer-feedback');
      if(!selected){f.textContent='Marque uma alternativa antes de conferir.';f.className='answer-feedback is-warning';return;}
      const correct=selected.value===c.dataset.answer;
      c.dataset.tried='true';c.dataset.correct=String(correct);
      f.textContent=correct?`✓ Correto! Alternativa ${c.dataset.answer}. Veja a justificativa abaixo.`:`✗ Você marcou ${selected.value}. A correta é ${c.dataset.answer}. Veja o raciocínio.`;
      f.className='answer-feedback '+(correct?'is-correct':'is-wrong');
      c.querySelectorAll('.option-row').forEach(r=>{
        r.classList.remove('is-answer','is-selected-wrong');
        const val=r.querySelector('input').value;
        if(val===c.dataset.answer)r.classList.add('is-answer');
        else if(r.querySelector('input').checked)r.classList.add('is-selected-wrong');
      });
      c.querySelector('.solution-box').open=true;
      update();
    });
    c.querySelector('.reset-one').addEventListener('click',()=>resetCard(c));
  });
  teacher.addEventListener('click',()=>{
    teacherOn=!teacherOn;
    teacher.setAttribute('aria-pressed',String(teacherOn));
    teacher.textContent=teacherOn?'👩‍🏫 Ocultar gabaritos':'👩‍🏫 Modo professor';
    cards.forEach(c=>c.querySelector('.solution-box').open=teacherOn);
  });
  document.getElementById('reset-all').addEventListener('click',()=>{teacherOn=false;teacher.setAttribute('aria-pressed','false');teacher.textContent='👩‍🏫 Modo professor';cards.forEach(resetCard);update();});
  function doPrint(withAnswers){
    const prev=cards.map(c=>c.querySelector('.solution-box').open);
    document.body.classList.add(withAnswers?'print-teacher':'print-student');
    if(withAnswers)cards.forEach(c=>c.querySelector('.solution-box').open=true);
    function restore(){document.body.classList.remove('print-teacher','print-student');cards.forEach((c,i)=>c.querySelector('.solution-box').open=prev[i]);window.removeEventListener('afterprint',restore);}
    window.addEventListener('afterprint',restore);
    setTimeout(()=>{window.print();setTimeout(restore,800);},60);
  }
  document.getElementById('print-student').addEventListener('click',()=>doPrint(false));
  document.getElementById('print-teacher').addEventListener('click',()=>doPrint(true));
  update();
})();
