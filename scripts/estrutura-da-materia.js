
    document.querySelectorAll('.exam-quiz').forEach(card => {
      const button = card.querySelector('.check-answer');
      const feedback = card.querySelector('.answer-feedback');
      button.addEventListener('click', () => {
        const selected = card.querySelector('input[type="radio"]:checked');
        if (!selected) {
          feedback.textContent = 'Selecione uma alternativa antes de corrigir.';
          feedback.className = 'answer-feedback is-warning';
          return;
        }
        const correct = selected.value === card.dataset.answer;
        feedback.textContent = correct ? '✓ Correto!' : '✗ Essa não é a resposta. Confira o gabarito comentado.';
        feedback.className = 'answer-feedback ' + (correct ? 'is-correct' : 'is-wrong');
      });
    });
  