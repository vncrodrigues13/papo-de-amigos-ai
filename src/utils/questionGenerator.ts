
// Simulador de geração de perguntas baseado em interesses e contexto
// Em uma implementação real, isso seria conectado a uma API de IA

interface QuestionTemplate {
  template: string;
  categories: string[];
  contexts?: string[];
}

const questionTemplates: QuestionTemplate[] = [
  {
    template: "Qual foi a experiência mais marcante que você teve relacionada a {interest}?",
    categories: ["viagens", "música", "comida", "esportes", "hobbies"]
  },
  {
    template: "Se você pudesse ensinar algo sobre {interest} para alguém, o que seria?",
    categories: ["música", "tecnologia", "culinária", "esportes", "arte"]
  },
  {
    template: "Conte sobre uma memória de infância envolvendo {interest} que ainda te faz sorrir.",
    categories: ["comida", "música", "brincadeiras", "família", "escola"]
  },
  {
    template: "Qual é a coisa mais inusitada ou interessante sobre {interest} que você descobriu recentemente?",
    categories: ["tecnologia", "ciência", "história", "cultura", "natureza"]
  },
  {
    template: "Se você tivesse que escolher apenas um {interest} para o resto da vida, qual seria e por quê?",
    categories: ["livro", "filme", "música", "comida", "lugar"]
  },
  {
    template: "Qual é a história mais engraçada ou embaraçosa que você tem relacionada a {interest}?",
    categories: ["viagens", "trabalho", "relacionamentos", "hobbies", "esportes"]
  },
  {
    template: "O que você faria se tivesse tempo e dinheiro ilimitados para explorar {interest}?",
    categories: ["viagens", "hobbies", "arte", "música", "tecnologia"]
  },
  {
    template: "Qual pessoa você gostaria de conhecer e conversar sobre {interest}?",
    categories: ["arte", "música", "literatura", "ciência", "esportes"]
  },
  {
    template: "Conte sobre uma vez que {interest} mudou completamente seu dia ou humor.",
    categories: ["música", "amizade", "natureza", "arte", "comida"]
  },
  {
    template: "Se você pudesse voltar no tempo, que conselho daria ao seu eu mais novo sobre {interest}?",
    categories: ["relacionamentos", "carreira", "hobbies", "estudos", "saúde"]
  }
];

const contextualQuestions: QuestionTemplate[] = [
  {
    template: "Qual é a melhor comida que você já experimentou em um {context} como este?",
    categories: ["comida"],
    contexts: ["churrasco", "jantar", "restaurante", "festa"]
  },
  {
    template: "Conte sobre o {context} mais divertido que você já participou.",
    categories: ["festa", "encontro"],
    contexts: ["festa", "churrasco", "encontro", "celebração"]
  },
  {
    template: "Se você fosse organizar o {context} perfeito, como seria?",
    categories: ["organização"],
    contexts: ["jantar", "festa", "encontro", "viagem"]
  }
];

const fallbackQuestions = [
  "Qual foi o último filme que te fez refletir sobre algo importante?",
  "Conte sobre um livro, filme ou série que você recomendaria para todos aqui.",
  "Qual é a coisa mais interessante que você aprendeu nas últimas semanas?",
  "Se você pudesse ter uma conversa com qualquer pessoa, viva ou morta, quem seria?",
  "Qual é o melhor conselho que você já recebeu e de quem?",
  "Conte sobre um momento recente que te deixou genuinamente feliz.",
  "Qual é um talento ou habilidade que você gostaria de desenvolver?",
  "Se você pudesse mudar uma coisa no mundo, o que seria?",
  "Qual é a tradição ou costume da sua família que você mais valoriza?",
  "Conte sobre um lugar que você visitou e que superou todas as suas expectativas."
];

export const generateQuestion = async (interests: string, context: string): Promise<string> => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const interestList = interests.toLowerCase().split(',').map(i => i.trim());
  const normalizedContext = context.toLowerCase().trim();

  // Tenta encontrar uma pergunta contextual primeiro
  if (normalizedContext) {
    const contextualOptions = contextualQuestions.filter(q => 
      q.contexts?.some(ctx => normalizedContext.includes(ctx))
    );
    
    if (contextualOptions.length > 0) {
      const randomContextual = contextualOptions[Math.floor(Math.random() * contextualOptions.length)];
      return randomContextual.template.replace('{context}', normalizedContext);
    }
  }

  // Procura por templates que combinem com os interesses
  const matchingTemplates = questionTemplates.filter(template =>
    template.categories.some(category =>
      interestList.some(interest => 
        interest.includes(category) || category.includes(interest)
      )
    )
  );

  if (matchingTemplates.length > 0) {
    const randomTemplate = matchingTemplates[Math.floor(Math.random() * matchingTemplates.length)];
    
    // Encontra um interesse que combine com as categorias do template
    const matchingInterest = interestList.find(interest =>
      randomTemplate.categories.some(category =>
        interest.includes(category) || category.includes(interest)
      )
    ) || interestList[0];

    return randomTemplate.template.replace('{interest}', matchingInterest);
  }

  // Se não encontrar nada específico, usa uma pergunta genérica
  return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)];
};
