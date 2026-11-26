
document.addEventListener('DOMContentLoaded', () => {
  const cards = [...document.querySelectorAll('.question')];
  function updateMetrics() {
    let answered = 0, right = 0;
    for (const card of cards) {
      const picked = card.querySelector('input[type="radio"]:checked');
      if (picked) { answered++; if (picked.value === card.dataset.correct) right++; }
    }
    document.getElementById('answered').textContent = answered;
    document.getElementById('hits').textContent = right;
  }
  for (const card of cards) {
    card.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', () => {
        const selected = input.value;
        const right = card.dataset.correct;
        const feedback = card.querySelector('.feedback');
        const correct = selected === right;
        card.querySelectorAll('.answer').forEach(option => {
          option.classList.remove('is-correct', 'is-incorrect');
          if (option.querySelector('input').value === right) option.classList.add('is-correct');
          else if (option.querySelector('input').value === selected) option.classList.add('is-incorrect');
        });
        feedback.textContent = correct
          ? `✓ Acertou! Alternativa ${right}. Veja a explicação detalhada abaixo.`
          : `✕ Ainda não. Você marcou ${selected}; a correta é ${right}. Leia por que cada alternativa está certa ou errada.`;
        feedback.className = 'feedback visible ' + (correct ? 'good' : 'bad');
        card.querySelector('.key').open = true;
        updateMetrics();
      });
    });
  }
  document.getElementById('show-all').addEventListener('click', () => {
    cards.forEach(card => { card.querySelector('.key').open = true; });
  });
  document.getElementById('hide-all').addEventListener('click', () => {
    cards.forEach(card => { card.querySelector('.key').open = false; });
  });
  document.getElementById('reset').addEventListener('click', () => {
    cards.forEach(card => {
      card.querySelectorAll('input').forEach(i => { i.checked = false; });
      card.querySelectorAll('.answer').forEach(e => e.classList.remove('is-correct','is-incorrect'));
      const f = card.querySelector('.feedback'); f.className='feedback'; f.textContent='';
      card.querySelector('.key').open = false;
    }); updateMetrics(); window.scrollTo({top:0,behavior:'smooth'});
  });
  let priorOpen = [];
  function doPrint(student) {
    document.body.classList.toggle('print-student', student);
    priorOpen = cards.map(c => c.querySelector('.key').open);
    cards.forEach(card => {card.querySelector('.key').open = !student;});
    setTimeout(() => window.print(), 80);
  }
  document.getElementById('print-student').addEventListener('click', () => doPrint(true));
  document.getElementById('print-keys').addEventListener('click', () => doPrint(false));
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('print-student');
    cards.forEach((card, i) => {card.querySelector('.key').open = priorOpen[i] ?? false;});
  });
  updateMetrics();
});
