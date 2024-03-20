function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

  const columns = document.querySelectorAll(".column");
  
  document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
  });
  
  document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });
  
  columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(item, e.clientY);
  
        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        }
        else {
            item.prepend(dragging);
        }
  
        checkSequence(); // Verifica a sequência após a movimentação de um item
    }); 
  });
  
  function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".item:not(.dragging)");
    let result;
  
    for (let refer_card of cards){
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
  
        if (posY >= boxCenterY) result = refer_card;
    }
  
    return result;
  }
  
  function checkSequence() {
    const correctSequence = [
        "Livros",
        "Gênesis",
        "Êxodo",
        "Levítico",
        "Números",
        "Deuteronômio"  
    ];

    const items = document.querySelectorAll('.kanban .item');
    let sequenceCorrect = true;

    items.forEach((item, index) => {
        if (item.textContent.trim() !== correctSequence[index]) {
            sequenceCorrect = false;
            return;
        }
    });

    if (sequenceCorrect) {
        // Verifica se a sequência está correta
        // Se estiver correta, inicia o efeito de confete

        // Define os parâmetros para os confetes
        let params = {
            particleCount: 15, // Quantidade de confetes
            spread: 90, // O quanto eles se espalham
            startVelocity: 100, // Velocidade inicial
            origin: { x: 0, y: 0.5 }, // Posição inicial na tela
            angle: 45 // Ângulo em que os confetes serão lançados
        };
        
        // Joga confetes da esquerda pra direita
        confetti(params);
    
        // Joga confetes da direita para a esquerda
        params.origin.x = 1;
        params.angle = 135;
        confetti(params);
    }
}
