// ═══════════════════════════════════════════════════════════
// SCRIPT PRINCIPAL
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso!');

    // Adicionar eventos aos botões de produtos
    const productButtons = document.querySelectorAll('.product-button');
    
    productButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Produto adicionado ao carrinho!');
        });

        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll para links de navegação
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    console.log('Scripts inicializados com sucesso!');
});

// Função para validar formulários
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (!form) {
        console.error('Formulário não encontrado!');
        return false;
    }

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Função para carregar imagens dinamicamente
function loadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
    });
}
