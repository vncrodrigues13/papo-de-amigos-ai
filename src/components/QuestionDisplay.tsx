
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, RotateCcw, Settings } from 'lucide-react';
import { generateQuestion } from '@/utils/questionGenerator';

interface QuestionDisplayProps {
  interests: string;
  context: string;
  onReconfigure: () => void;
}

const QuestionDisplay = ({ interests, context, onReconfigure }: QuestionDisplayProps) => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuestion = async () => {
    setIsLoading(true);
    try {
      const question = await generateQuestion(interests, context);
      setCurrentQuestion(question);
    } catch (error) {
      console.error('Erro ao gerar pergunta:', error);
      setCurrentQuestion('Erro ao gerar pergunta. Tente novamente!');
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleGenerateQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header com botão de reconfigurar */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Gerador de Conversas</h1>
          <p className="text-gray-600 mb-4">
            Interesses: <span className="font-semibold">{interests}</span>
            {context && (
              <>
                {' | '}
                Contexto: <span className="font-semibold">{context}</span>
              </>
            )}
          </p>
          <Button
            onClick={onReconfigure}
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-800"
          >
            <Settings className="w-4 h-4 mr-2" />
            Reconfigurar
          </Button>
        </div>

        {/* Área principal da pergunta */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12">
            <div className="text-center space-y-8">
              {isLoading ? (
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-red-500" />
                  <p className="text-xl text-gray-600">Gerando uma pergunta incrível...</p>
                </div>
              ) : (
                <>
                  <div className="min-h-[120px] flex items-center justify-center">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 leading-relaxed text-center">
                      {currentQuestion || 'Clique no botão abaixo para gerar sua primeira pergunta!'}
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleGenerateQuestion}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    <RotateCcw className="w-6 h-6 mr-3" />
                    Nova Pergunta
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Dicas de uso */}
        <div className="text-center text-gray-600 space-y-2">
          <p className="text-sm">💡 <strong>Dica:</strong> Leia a pergunta em voz alta para o grupo</p>
          <p className="text-sm">🎯 As perguntas são personalizadas com base nos interesses que você definiu</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
