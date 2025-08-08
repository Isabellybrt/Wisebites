import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  X, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  Zap
} from 'lucide-react';
import { foodRecognitionService, DetectedFood, FoodRecognitionResult } from '@/services/foodRecognitionService';
import { toast } from 'sonner';

interface FoodRecognitionUploadProps {
  onFoodsDetected: (foods: DetectedFood[]) => void;
  onTotalCalories: (calories: number) => void;
}

export const FoodRecognitionUpload: React.FC<FoodRecognitionUploadProps> = ({
  onFoodsDetected,
  onTotalCalories
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState<FoodRecognitionResult | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Manipula a seleção de arquivo
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecione apenas arquivos de imagem (JPEG, PNG)');
        return;
      }

      // Validar tamanho (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Arquivo muito grande. Máximo 10MB.');
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setRecognitionResult(null);
    }
  };

  /**
   * Remove o arquivo selecionado
   */
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setRecognitionResult(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Processa a imagem para reconhecimento de alimentos
   */
  const handleProcessImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simular progresso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Chamar serviço de reconhecimento
      const result = await foodRecognitionService.recognizeFoods(selectedFile);
      
      clearInterval(progressInterval);
      setProgress(100);

      setRecognitionResult(result);
      
      // Notificar componentes pai
      onFoodsDetected(result.detectedFoods);
      onTotalCalories(result.totalCalories);

      toast.success(`Reconhecimento concluído! ${result.detectedFoods.length} alimentos detectados.`);

    } catch (error) {
      console.error('Erro no processamento:', error);
      toast.error(`Erro no reconhecimento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  /**
   * Abre a câmera do dispositivo
   */
  const handleOpenCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Reconhecimento por IA
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tire uma foto ou envie uma imagem da sua refeição para detectar automaticamente os alimentos e estimar as calorias.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Área de Upload */}
        {!selectedFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">Envie uma foto da sua refeição</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Suporte para JPEG, PNG (máximo 10MB)
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Escolher arquivo
                </Button>
                <Button 
                  onClick={handleOpenCamera}
                  variant="outline"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Tirar foto
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview da imagem */}
            <div className="relative">
              <img 
                src={previewUrl!} 
                alt="Preview" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Botão de processamento */}
            <Button 
              onClick={handleProcessImage}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Reconhecer Alimentos
                </>
              )}
            </Button>

            {/* Barra de progresso */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analisando imagem...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </div>
        )}

        {/* Resultados do reconhecimento */}
        {recognitionResult && (
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Alimentos Detectados</h4>
              
              {/* Resumo */}
              <div className="bg-primary/5 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Total de Calorias</p>
                    <p className="text-2xl font-bold text-primary">
                      {recognitionResult.totalCalories} kcal
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Alimentos</p>
                    <p className="text-lg font-semibold">
                      {recognitionResult.detectedFoods.length}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Processado em {recognitionResult.processingTime}ms
                </p>
              </div>

              {/* Lista de alimentos */}
              <div className="space-y-2">
                {recognitionResult.detectedFoods.map((food) => (
                  <div 
                    key={food.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{food.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {food.estimatedPortion}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">
                        {food.estimatedCalories} kcal
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(food.confidence * 100)}% confiança
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Aviso de precisão */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">
                      Estimativa aproximada
                    </p>
                    <p className="text-yellow-700 mt-1">
                      As calorias são estimativas baseadas em IA. Para maior precisão, 
                      ajuste manualmente as porções conforme necessário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input file oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};
