document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');

    // Data for Modals
    const modalData = {
        'artrose-joelho': {
            title: 'Artrose de Joelho',
            content: `
                <img src="img/protese joelho.jpeg" alt="Prótese de Joelho" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>A artrose é o desgaste da cartilagem que reveste as articulações. No joelho, é uma das causas mais comuns de dor e perda de mobilidade em pessoas acima de 50 anos.</p>
                <h4>Sintomas</h4>
                <ul>
                    <li>Dor que piora com o esforço</li>
                    <li>Rigidez matinal</li>
                    <li>Inchaço na articulação</li>
                    <li>Estalos ou sensação de "areia" no joelho</li>
                </ul>
                <h4>Tratamentos</h4>
                <p>Desde fisioterapia, infiltrações (viscossuplementação) até cirurgias de prótese total de joelho em casos avançados.</p>
            `
        },
        'menisco': {
            title: 'Lesão de Menisco',
            content: `
                <img src="img/lesoes de menisco.jpeg" alt="Lesão de Menisco" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>Os meniscos funcionam como amortecedores do joelho. Lesões podem ocorrer por traumas (torções) ou degeneração natural com a idade.</p>
                <h4>Quando procurar ajuda?</h4>
                <p>Se houver travamento do joelho, dor aguda ao agachar ou inchaço constante.</p>
                <h4>Tratamento</h4>
                <p>Muitas lesões são tratadas com fisioterapia. Casos de travamento ou dor persistente podem exigir artroscopia (cirurgia minimamente invasiva).</p>
            `
        },
        'ligamentos': {
            title: 'Ligamentos (LCA/LCP)',
            content: `
                <img src="img/lesoes de ligamento.jpeg" alt="Lesões de Ligamento" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>Lesões ligamentares são comuns em esportes com mudanças bruscas de direção (futebol, basquete). O Ligamento Cruzado Anterior (LCA) é o mais afetado.</p>
                <h4>Sintomas</h4>
                <p>Instabilidade (joelho "falso"), estalo audível no momento da lesão e inchaço imediato.</p>
                <h4>Tratamento</h4>
                <p>A reconstrução ligamentar por artroscopia é o padrão ouro para atletas que desejam retornar ao esporte.</p>
            `
        },
        'condromalacia': {
            title: 'Condromalácia Patelar',
            content: `
                <img src="img/Menisco.jpeg" alt="Condromalácia Patelar" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>Conhecida como "joelho de corredor", é o amolecimento da cartilagem da patela.</p>
                <h4>Sintomas</h4>
                <p>Dor na frente do joelho, especialmente ao subir/descer escadas ou ficar muito tempo sentado.</p>
                <h4>Tratamento</h4>
                <p>Foco total em fortalecimento muscular e correção biomecânica. Infiltrações podem ajudar no alívio da dor.</p>
            `
        },
        'artrose-quadril': {
            title: 'Artrose de Quadril',
            content: `
                <img src="img/protese quadril.jpeg" alt="Prótese de Quadril" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>O desgaste da articulação do quadril (coxofemoral) causa dor na virilha e limitação para calçar sapatos ou andar.</p>
                <h4>Tratamento</h4>
                <p>Inicia-se com medidas conservadoras. A Prótese de Quadril é indicada para devolver qualidade de vida quando dor é incapacitante.</p>
                <img src="img/Protese de quadril com assistencia Robotica Navegada.jpeg" alt="Prótese de Quadril com Assistência Robótica Navegada" style="width:100%; height:auto; border-radius:10px; margin-top:15px;">
            `
        },
        'bursite': {
            title: 'Bursite Trocantérica',
            content: `
                <img src="img/Bursite trocanterica quadril.jpeg" alt="Bursite Trocantérica" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>Inflamação da bursa na lateral do quadril. Muito comum em mulheres.</p>
                <h4>Sintomas</h4>
                <p>Dor na lateral da coxa que piora ao deitar de lado sobre o quadril afetado.</p>
                <h4>Tratamento</h4>
                <p>Fisioterapia, Infiltrações e Terapia por Ondas de Choque apresentam excelentes resultados.</p>
            `
        },
        'impacto': {
            title: 'Impacto Fêmoro-Acetabular',
            content: `
                <img src="img/impacto femoroacetabular.jpeg" alt="Impacto Fêmoro-Acetabular" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>Alteração no formato dos ossos do quadril que causa atrito durante o movimento. É uma causa comum de artrose precoce em jovens.</p>
                <h4>Tratamento</h4>
                <p>A artroscopia de quadril pode corrigir o formato ósseo e reparar lesões no labrum.</p>
            `
        },
        'necrose': {
            title: 'Necrose Avascular',
            content: `
                <img src="img/necrose avascula da cabeça do femur.jpeg" alt="Necrose Avascular" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>Morte do tecido ósseo da cabeça do fêmur por falta de suprimento sanguíneo. Pode ser causada por uso de corticoides, álcool ou traumas.</p>
                <h4>Tratamento</h4>
                <p>O diagnóstico precoce é crucial. Tratamentos variam desde descompressão até prótese de quadril.</p>
            `
        },
        'regenerativa': {
            title: 'Medicina Regenerativa com Ortobiológicos',
            content: `
                <img src="img/medicina regenerativa.jpeg" alt="Medicina Regenerativa" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>A medicina regenerativa é uma abordagem moderna que utiliza substâncias do próprio corpo do paciente para estimular a cicatrização, reduzir a dor e melhorar a função das articulações, músculos, tendões e ligamentos.</p>
                <p>Entre as técnicas utilizadas estão PRP (Plasma Rico em Plaquetas), i-PRF, aspirado de medula óssea e células retiradas do tecido adiposo (gordura). Esses tratamentos atuam diretamente no local da lesão, estimulando a regeneração dos tecidos de forma natural e segura.</p>
                <p>É uma excelente opção para pacientes que desejam evitar ou postergar cirurgias, acelerar a recuperação de lesões esportivas ou tratar dores crônicas de maneira menos invasiva.</p>
                <h4>Destaques</h4>
                <ul>
                    <li><i class="fas fa-check"></i> Tratamentos personalizados</li>
                    <li><i class="fas fa-check"></i> Procedimentos minimamente invasivos</li>
                    <li><i class="fas fa-check"></i> Utiliza o próprio organismo para recuperação</li>
                </ul>
            `
        },
        'ondas-choque': {
            title: 'Terapia por Ondas de Choque',
            content: `
                <img src="img/ondas de choque 1.jpeg" alt="Terapia por Ondas de Choque" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <img src="img/ondas de choque 2.jpeg" alt="Equipamento de Ondas de Choque" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>A terapia por ondas de choque é um tratamento não invasivo, realizado em consultório, que utiliza ondas acústicas para estimular a regeneração dos tecidos e aliviar a dor.</p>
                <p>Ela é especialmente indicada para dores crônicas e lesões como tendinites, fascite plantar, dor no ombro, cotovelo, joelho e outras condições musculoesqueléticas que não melhoraram com tratamentos convencionais.</p>
                <p>O procedimento é rápido, seguro e não requer afastamento das atividades do dia a dia.</p>
                <h4>Benefícios</h4>
                <ul>
                    <li><i class="fas fa-check"></i> Redução significativa da dor</li>
                    <li><i class="fas fa-check"></i> Estimula a cicatrização natural</li>
                    <li><i class="fas fa-check"></i> Sem cortes ou cirurgias</li>
                </ul>
            `
        },
        'acido-hialuronico': {
            title: 'Infiltração com Ácido Hialurônico',
            content: `
                <img src="img/infiltraçao.jpeg" alt="Infiltração com Ácido Hialurônico" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>A infiltração com ácido hialurônico é um tratamento indicado principalmente para artrose (desgaste da cartilagem) e dores articulares.</p>
                <p>O ácido hialurônico atua como um lubrificante natural da articulação, melhorando o movimento, reduzindo o atrito entre os ossos e aliviando a dor. O procedimento é realizado de forma segura, muitas vezes com auxílio de ultrassom para maior precisão.</p>
                <p>É uma excelente alternativa para pacientes que buscam melhorar a qualidade de vida, com menos dor e mais mobilidade.</p>
                <h4>Vantagens</h4>
                <ul>
                    <li><i class="fas fa-check"></i> Melhora da função articular</li>
                    <li><i class="fas fa-check"></i> Alívio da dor e rigidez</li>
                    <li><i class="fas fa-check"></i> Procedimento rápido e seguro</li>
                </ul>
            `
        },
        'bloqueios': {
            title: 'Bloqueios de Nervos Periféricos',
            content: `
                <img src="img/Bloqueios Guiados por US.jpeg" alt="Bloqueios Guiados por Ultrassom" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>Os bloqueios de nervos periféricos são técnicas avançadas para o tratamento da dor, realizadas com extrema precisão através do ultrassom.</p>
                <p>Esse método permite identificar exatamente o nervo responsável pela dor, proporcionando um tratamento mais eficaz e seguro, com menor risco de efeitos colaterais. É indicado para dores persistentes no joelho, quadril, ombro e outras regiões.</p>
                <p>O objetivo é controlar a dor, melhorar a função e permitir que o paciente retome suas atividades com mais conforto.</p>
                <h4>Diferenciais</h4>
                <ul>
                    <li><i class="fas fa-check"></i> Alta precisão com ultrassom</li>
                    <li><i class="fas fa-check"></i> Alívio rápido e eficaz da dor</li>
                    <li><i class="fas fa-check"></i> Procedimento seguro e minimamente invasivo</li>
                </ul>
            `
        },
        'cartilagem-joelho': {
            title: 'Lesões de Cartilagem no Joelho',
            content: `
                <img src="img/Lesões de Cartilagem.jpeg" alt="Lesões de Cartilagem no Joelho" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>A cartilagem é o tecido que reveste o joelho e permite movimentos sem dor. Quando ela é lesionada ou sofre desgaste, o joelho pode apresentar dor, inchaço, estalos, travamentos e limitação para atividades do dia a dia.</p>
                <h4>Quais são as causas?</h4>
                <ul>
                    <li>Traumas e lesões esportivas</li>
                    <li>Excesso de impacto</li>
                    <li>Desalinhamento do joelho</li>
                    <li>Desgaste natural com o passar do tempo</li>
                </ul>
                <h4>Como é feito o tratamento?</h4>
                <p>O tratamento é sempre individualizado e pode incluir:</p>
                <ul>
                    <li>Fisioterapia e fortalecimento muscular</li>
                    <li>Infiltrações articulares, como ácido hialurônico e terapias biológicas</li>
                    <li>Cirurgia por artroscopia, quando indicada, com técnica minimamente invasiva e recuperação mais rápida</li>
                </ul>
                <h4>Quando procurar um especialista?</h4>
                <p>Se você sente dor persistente no joelho, dificuldade para caminhar, subir escadas ou praticar exercícios, uma avaliação especializada é fundamental para evitar a progressão da lesão.</p>
            `
        },
        'tendinite-joelho': {
            title: 'Tendinites no Joelho',
            content: `
                <img src="img/tendinite joelho.jpeg" alt="Tendinites no Joelho" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>As tendinites são inflamações ou lesões dos tendões, estruturas responsáveis por ligar o músculo ao osso. No joelho, as mais comuns acometem o tendão patelar e o tendão do quadríceps, causando dor e limitação funcional.</p>
                <h4>Causas mais comuns</h4>
                <ul>
                    <li>Sobrecarga e movimentos repetitivos</li>
                    <li>Atividades esportivas de impacto</li>
                    <li>Falta de fortalecimento muscular</li>
                    <li>Alterações biomecânicas e desalinhamento do joelho</li>
                </ul>
                <h4>Principais sintomas</h4>
                <ul>
                    <li>Dor na parte anterior do joelho</li>
                    <li>Desconforto ao subir e descer escadas</li>
                    <li>Dor ao agachar, correr ou saltar</li>
                    <li>Sensibilidade local e, às vezes, inchaço</li>
                </ul>
                <h4>Tratamento</h4>
                <p>O tratamento é individualizado e, na maioria dos casos, não cirúrgico:</p>
                <ul>
                    <li>Fisioterapia e fortalecimento muscular</li>
                    <li>Ajuste das atividades físicas</li>
                    <li>Terapias de reabilitação, como ondas de choque</li>
                    <li>Infiltrações, quando indicadas, para controle da dor e inflamação</li>
                </ul>
            `
        },
        'tendinite-quadril': {
            title: 'Tendinites no Quadril',
            content: `
                <img src="img/Bursite trocanterica quadril.jpeg" alt="Tendinites no Quadril" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>As tendinites do quadril são inflamações ou lesões dos tendões que atuam na articulação do quadril, sendo mais comuns nos tendões dos glúteos e dos flexores do quadril. Essas alterações costumam causar dor e limitação de movimento.</p>
                <h4>Causas mais comuns</h4>
                <ul>
                    <li>Sobrecarga e movimentos repetitivos</li>
                    <li>Atividades físicas de impacto</li>
                    <li>Alterações posturais e biomecânicas</li>
                    <li>Enfraquecimento muscular</li>
                    <li>Desequilíbrios na marcha</li>
                </ul>
                <h4>Principais sintomas</h4>
                <ul>
                    <li>Dor na lateral ou na frente do quadril</li>
                    <li>Dor ao caminhar, subir escadas ou levantar da cadeira</li>
                    <li>Desconforto ao deitar sobre o lado afetado</li>
                    <li>Rigidez e limitação de movimento</li>
                </ul>
                <h4>Tratamento</h4>
                <p>O tratamento é individualizado e, na maioria dos casos, conservador:</p>
                <ul>
                    <li>Fisioterapia e fortalecimento muscular</li>
                    <li>Ajuste das atividades físicas</li>
                    <li>Terapias avançadas, como ondas de choque</li>
                    <li>Infiltrações, quando indicadas, para alívio da dor e controle da inflamação</li>
                </ul>
            `
        },
        'artroplastia-robotica': {
            title: 'Artroplastia com Assistência Robótica',
            content: `
                <img src="img/cirurgia de protese com assistencia robótica.jpeg" alt="Cirurgia com Assistência Robótica" style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;">
                <p>A artroplastia é a cirurgia indicada para casos de artrose avançada, quando a dor e a limitação de movimento já comprometem a qualidade de vida. Com a assistência robótica, o cirurgião utiliza tecnologia avançada para realizar a cirurgia com mais precisão, segurança e planejamento personalizado para cada paciente.</p>
                <h4>Quando essa cirurgia é indicada?</h4>
                <ul>
                    <li>Dor intensa e persistente no joelho ou quadril</li>
                    <li>Dificuldade para caminhar, subir escadas ou realizar atividades simples</li>
                    <li>Falha dos tratamentos conservadores (medicações, fisioterapia, infiltrações)</li>
                    <li>Limitação importante da mobilidade</li>
                </ul>
                <h4>Vantagens da cirurgia robótica</h4>
                <ul>
                    <li><i class="fas fa-check"></i> Maior precisão no posicionamento da prótese</li>
                    <li><i class="fas fa-check"></i> Cirurgia planejada de forma individualizada</li>
                    <li><i class="fas fa-check"></i> Melhor alinhamento e equilíbrio da articulação</li>
                    <li><i class="fas fa-check"></i> Menor agressão aos tecidos ao redor</li>
                    <li><i class="fas fa-check"></i> Recuperação mais rápida e funcional</li>
                </ul>
                <h4>Recuperação</h4>
                <p>A maioria dos pacientes inicia a movimentação logo após a cirurgia, com acompanhamento fisioterápico. O objetivo é reduzir a dor, restaurar o movimento e permitir o retorno às atividades do dia a dia com mais conforto e segurança.</p>
            `
        }
    };

    // Open Modal
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const key = trigger.getAttribute('data-modal');
            const data = modalData[key];
            if (data) {
                modalTitle.textContent = data.title;
                modalDescription.innerHTML = data.content;
                modal.style.display = 'flex';
                // Trigger reflow
                modal.offsetHeight;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal Function
    const closeModalHandler = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    };

    closeModal.addEventListener('click', closeModalHandler);

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModalHandler();
        }
    });

    // --- Form Handling ---
    const contactForm = document.getElementById('appointment-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Let the form submit naturally to FormSubmit
            // Show loading state on button
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Enviando...';
            btn.disabled = true;
        });
    }

    // --- Scroll Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.condition-card, .treatment-card, .about-text, .hero-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
