import React, { useState, useEffect, memo } from 'react';

/**
 * Interface para as propriedades do Efeito de Máquina de Escrever
 */
interface TypewriterTextProps {
  words: string[];           // Lista de palavras para digitar (ex: ["Dev", "Designer"])
  typingSpeed?: number;      // Velocidade de digitação (ms por letra)
  deletingSpeed?: number;    // Velocidade de apagar (ms por letra)
  pauseTime?: number;        // Tempo de pausa antes de começar a apagar (ms)
  className?: string;        // Classes CSS adicionais para estilização
}

/**
 * Componente TypewriterText
 * 
 * Cria um efeito visual de digitação e apagamento contínuo de uma lista de palavras.
 * Usamos React.memo para evitar re-renderizações desnecessárias se as props não mudarem.
 */
const TypewriterText: React.FC<TypewriterTextProps> = memo(({ 
  words, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseTime = 2000,
  className = ''
}) => {
  // Estado para armazenar o texto que está visível na tela agora
  const [displayText, setDisplayText] = useState('');
  
  // Estado para saber qual palavra da lista estamos processando
  const [wordIndex, setWordIndex] = useState(0);
  
  // Estado para saber se estamos na fase de digitação (false) ou apagamento (true)
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Hook useEffect: "Cérebro" do efeito.
   * Ele é executado toda vez que o texto muda, ou o estado de deletar muda.
   * Funciona como um loop infinito controlado por timeouts.
   */
  useEffect(() => {
    const currentWord = words[wordIndex]; // A palavra alvo atual
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // --- FASE DE APAGAR ---
      if (displayText.length > 0) {
        // Se ainda tem letras, apaga uma (remove o último caractere)
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Se acabou de apagar tudo:
        // 1. Para de deletar
        // 2. Passa para a próxima palavra da lista (usando módulo % para voltar ao zero no fim)
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }
    } else {
      // --- FASE DE DIGITAR ---
      if (displayText.length < currentWord.length) {
        // Se ainda não digitou a palavra inteira, adiciona a próxima letra
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Se a palavra está completa:
        // Espera um tempo (pauseTime) antes de começar a apagar
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    // Função de limpeza (cleanup):
    // Cancela o timeout pendente se o componente for desmontado ou re-renderizado
    // Isso evita bugs de memória e atualizações de estado em componentes desmontados.
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`text-4xl md:text-5xl lg:text-6xl font-bold font-display inline-block min-h-[1.5em] ${className}`}>
      {/* Texto estilo 'tag' HTML */}
      &lt;{displayText}
      {/* Cursor piscante (caret/cursor) */}
      <span className="animate-pulse border-r-4 border-cyan-500 ml-1 inline-block h-[0.8em] align-middle"></span>
      /&gt;
    </span>
  );
});

export default TypewriterText;