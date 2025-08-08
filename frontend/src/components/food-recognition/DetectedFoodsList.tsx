import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Edit2, 
  Save, 
  X, 
  Trash2, 
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DetectedFood } from '@/services/foodRecognitionService';

interface EditableFood extends DetectedFood {
  isEditing?: boolean;
  customCalories?: number;
  customPortion?: string;
}

interface DetectedFoodsListProps {
  foods: DetectedFood[];
  onFoodsUpdate: (foods: EditableFood[]) => void;
  onRemoveFood: (foodId: string) => void;
}

export const DetectedFoodsList: React.FC<DetectedFoodsListProps> = ({
  foods,
  onFoodsUpdate,
  onRemoveFood
}) => {
  const [editableFoods, setEditableFoods] = useState<EditableFood[]>(
    foods.map(food => ({
      ...food,
      isEditing: false,
      customCalories: food.estimatedCalories,
      customPortion: food.estimatedPortion
    }))
  );

  /**
   * Ativa o modo de edição para um alimento
   */
  const handleEditFood = (foodId: string) => {
    setEditableFoods(prev => 
      prev.map(food => 
        food.id === foodId 
          ? { ...food, isEditing: true }
          : food
      )
    );
  };

  /**
   * Salva as alterações de um alimento
   */
  const handleSaveFood = (foodId: string) => {
    setEditableFoods(prev => 
      prev.map(food => 
        food.id === foodId 
          ? { 
              ...food, 
              isEditing: false,
              estimatedCalories: food.customCalories || food.estimatedCalories,
              estimatedPortion: food.customPortion || food.estimatedPortion
            }
          : food
      )
    );
    onFoodsUpdate(editableFoods);
  };

  /**
   * Cancela a edição de um alimento
   */
  const handleCancelEdit = (foodId: string) => {
    setEditableFoods(prev => 
      prev.map(food => 
        food.id === foodId 
          ? { 
              ...food, 
              isEditing: false,
              customCalories: food.estimatedCalories,
              customPortion: food.estimatedPortion
            }
          : food
      )
    );
  };

  /**
   * Atualiza as calorias customizadas
   */
  const handleCaloriesChange = (foodId: string, value: string) => {
    const calories = parseInt(value) || 0;
    setEditableFoods(prev => 
      prev.map(food => 
        food.id === foodId 
          ? { ...food, customCalories: calories }
          : food
      )
    );
  };

  /**
   * Atualiza a porção customizada
   */
  const handlePortionChange = (foodId: string, value: string) => {
    setEditableFoods(prev => 
      prev.map(food => 
        food.id === foodId 
          ? { ...food, customPortion: value }
          : food
      )
    );
  };

  /**
   * Remove um alimento da lista
   */
  const handleRemoveFood = (foodId: string) => {
    setEditableFoods(prev => prev.filter(food => food.id !== foodId));
    onRemoveFood(foodId);
  };

  /**
   * Calcula o total de calorias
   */
  const totalCalories = editableFoods.reduce((sum, food) => 
    sum + (food.customCalories || food.estimatedCalories), 0
  );

  /**
   * Obtém a cor do badge baseada na confiança
   */
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (editableFoods.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Nenhum alimento detectado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Alimentos Detectados</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total:</span>
            <Badge variant="secondary" className="text-lg">
              {totalCalories} kcal
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {editableFoods.map((food) => (
            <div 
              key={food.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                {/* Informações do alimento */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{food.name}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getConfidenceColor(food.confidence)}`}
                    >
                      {Math.round(food.confidence * 100)}% confiança
                    </Badge>
                  </div>

                  {/* Campos editáveis */}
                  {food.isEditing ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Porção</label>
                        <Input
                          value={food.customPortion || ''}
                          onChange={(e) => handlePortionChange(food.id, e.target.value)}
                          className="h-8 text-sm"
                          placeholder="Ex: 1 porção"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Calorias</label>
                        <Input
                          type="number"
                          value={food.customCalories || ''}
                          onChange={(e) => handleCaloriesChange(food.id, e.target.value)}
                          className="h-8 text-sm"
                          placeholder="kcal"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-sm">
                        {food.customPortion || food.estimatedPortion}
                      </Badge>
                      <span className="font-semibold text-primary">
                        {food.customCalories || food.estimatedCalories} kcal
                      </span>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex items-center gap-1">
                  {food.isEditing ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSaveFood(food.id)}
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancelEdit(food.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditFood(food.id)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveFood(food.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo final */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total de Calorias</p>
              <p className="text-2xl font-bold text-primary">{totalCalories} kcal</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Alimentos</p>
              <p className="text-lg font-semibold">{editableFoods.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
