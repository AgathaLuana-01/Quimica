
    document.querySelectorAll('.exam-quiz').forEach(card => {
      const btn = card.querySelector('.check-answer');
      const feedback = card.querySelector('.answer-feedback');
      if (!btn || !feedback) return;
      btn.addEventListener('click', () => {
        const selected = card.querySelector('input[type="radio"]:checked');
        if (!selected) {
          feedback.textContent = 'Escolha uma alternativa antes de conferir.';
          feedback.className = 'answer-feedback is-warning';
          return;
        }
        const certo = selected.value === card.dataset.answer;
        feedback.textContent = certo ? '✓ Resposta correta!' : '✗ Não é essa. Tente novamente ou consulte a explicação.';
        feedback.className = 'answer-feedback ' + (certo ? 'is-correct' : 'is-wrong');
      });
    });



  