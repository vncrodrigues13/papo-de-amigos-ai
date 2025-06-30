
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ConfigurationScreenProps {
  onStart: (interests: string, context: string) => void;
}

const ConfigurationScreen = ({ onStart }: ConfigurationScreenProps) => {
  const [interests, setInterests] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.trim()) {
      onStart(interests, context);
    }
  };

  const interestSuggestions = [
    'viagens', 'música', 'comida', 'filmes', 'séries', 'tecnologia', 
    'esportes', 'livros', 'hobbies', 'memórias de infância', 'trabalho', 'relacionamentos'
  ];

  const contextSuggestions = [
    'churrasco', 'jantar em casa', 'barzinho', 'café da manhã', 
    'viagem em grupo', 'festa de aniversário', 'encontro casual'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Gerador de Conversas
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Configure os interesses do seu grupo para gerar perguntas incríveis que vão estimular ótimas conversas!
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="interests" className="text-lg font-semibold text-gray-700">
                Interesses do Grupo *
              </Label>
              <Textarea
                id="interests"
                placeholder="Digite os interesses, hobbies e tópicos que o grupo tem em comum..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="min-h-[100px] text-base"
                required
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm text-gray-500 mb-1">Sugestões:</span>
                {interestSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      const currentInterests = interests.split(',').map(i => i.trim()).filter(Boolean);
                      if (!currentInterests.includes(suggestion)) {
                        setInterests(prev => prev ? `${prev}, ${suggestion}` : suggestion);
                      }
                    }}
                    className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="context" className="text-lg font-semibold text-gray-700">
                Contexto do Encontro (Opcional)
              </Label>
              <Input
                id="context"
                placeholder="Onde vocês estão se encontrando? Ex: churrasco, jantar, barzinho..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="text-base"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm text-gray-500 mb-1">Sugestões:</span>
                {contextSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setContext(suggestion)}
                    className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold transition-colors"
              disabled={!interests.trim()}
            >
              Começar a Gerar Perguntas
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationScreen;
