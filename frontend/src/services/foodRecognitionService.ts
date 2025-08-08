// Serviço para reconhecimento de alimentos usando IA
// Utiliza a API do Roboflow para detectar alimentos em imagens

export interface DetectedFood {
  id: string;
  name: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  estimatedCalories: number;
  estimatedPortion: string;
}

export interface FoodRecognitionResult {
  detectedFoods: DetectedFood[];
  totalCalories: number;
  processingTime: number;
  imageUrl?: string;
}

export interface CalorieEstimate {
  foodName: string;
  calories: number;
  portion: string;
  confidence: number;
}

// Base de dados de calorias por alimento (em 100g)
const CALORIE_DATABASE: Record<string, number> = {
  // Frutas
  'apple': 52,
  'banana': 89,
  'orange': 47,
  'strawberry': 32,
  'grape': 62,
  'watermelon': 30,
  'pineapple': 50,
  'mango': 60,
  'pear': 57,
  'peach': 39,
  'plum': 46,
  'cherry': 50,
  'blueberry': 57,
  'raspberry': 52,
  'blackberry': 43,
  'kiwi': 61,
  'avocado': 160,
  'coconut': 354,
  
  // Vegetais
  'carrot': 41,
  'broccoli': 34,
  'lettuce': 15,
  'tomato': 18,
  'cucumber': 16,
  'onion': 40,
  'potato': 77,
  'sweet potato': 86,
  'bell pepper': 20,
  'mushroom': 22,
  'spinach': 23,
  'kale': 49,
  'cauliflower': 25,
  'cabbage': 25,
  'celery': 16,
  'garlic': 149,
  'ginger': 80,
  
  // Proteínas
  'chicken': 165,
  'beef': 250,
  'fish': 100,
  'salmon': 208,
  'tuna': 144,
  'shrimp': 99,
  'egg': 155,
  'pork': 242,
  'turkey': 189,
  'lamb': 294,
  'duck': 337,
  'sausage': 296,
  'bacon': 541,
  'ham': 145,
  'hot dog': 290,
  
  // Carboidratos
  'rice': 130,
  'bread': 265,
  'pasta': 131,
  'spaghetti': 131,
  'noodles': 138,
  'potato': 77,
  'corn': 86,
  'oatmeal': 68,
  'cereal': 378,
  'tortilla': 218,
  'bagel': 245,
  'croissant': 406,
  'donut': 452,
  'muffin': 265,
  'cookie': 502,
  'cake': 257,
  'pie': 237,
  'brownie': 466,
  
  // Laticínios
  'milk': 42,
  'cheese': 402,
  'yogurt': 59,
  'butter': 717,
  'cream': 340,
  'ice cream': 207,
  'cream cheese': 342,
  'cottage cheese': 98,
  'sour cream': 193,
  
  // Oleaginosas
  'peanut': 567,
  'almond': 579,
  'walnut': 654,
  'cashew': 553,
  'pistachio': 560,
  'hazelnut': 628,
  'pecan': 691,
  'macadamia': 718,
  'sunflower seed': 584,
  'pumpkin seed': 559,
  
  // Fast Food e Pratos
  'pizza': 266,
  'hamburger': 295,
  'hot dog': 290,
  'sandwich': 250,
  'taco': 226,
  'burrito': 206,
  'sushi': 150,
  'curry': 120,
  'stew': 100,
  'casserole': 150,
  'lasagna': 132,
  'mac and cheese': 164,
  'fried chicken': 277,
  'chicken nuggets': 297,
  'french fries': 312,
  'onion rings': 411,
  'mozzarella sticks': 324,
  'chicken wings': 290,
  'fish and chips': 296,
  
  // Bebidas
  'coffee': 2,
  'tea': 1,
  'water': 0,
  'soda': 42,
  'juice': 54,
  'beer': 43,
  'wine': 85,
  'cocktail': 150,
  'smoothie': 80,
  'milkshake': 150,
  'hot chocolate': 52,
  'energy drink': 45,
  
  // Sobremesas
  'chocolate': 545,
  'candy': 400,
  'gummi bears': 329,
  'chocolate bar': 545,
  'chocolate chip cookie': 502,
  'cupcake': 305,
  'cheesecake': 321,
  'tiramisu': 240,
  'pudding': 119,
  'jello': 62,
  'popsicle': 136,
  
  // Outros
  'salad': 20,
  'soup': 50,
  'chips': 536,
  'popcorn': 375,
  'pretzel': 380,
  'crackers': 412,
  'granola': 471,
  'protein bar': 360,
  'energy bar': 400,
  'trail mix': 462,
  'dried fruit': 300,
  'jerky': 410,
  'pickle': 11,
  'olive': 115,
  'hummus': 166,
  'guacamole': 160,
  'salsa': 36,
  'ketchup': 102,
  'mayonnaise': 680,
  'mustard': 66,
  'soy sauce': 60,
  'hot sauce': 6,
  'ranch dressing': 484,
  'italian dressing': 292,
  'balsamic vinegar': 88,
  'olive oil': 884,
  'vegetable oil': 884,
  'margarine': 717,
};

// Mapeamento de nomes detectados para nomes padronizados
const FOOD_NAME_MAPPING: Record<string, string> = {
  // Frutas
  'apple': 'maçã',
  'banana': 'banana',
  'orange': 'laranja',
  'strawberry': 'morango',
  'grape': 'uva',
  'watermelon': 'melancia',
  'pineapple': 'abacaxi',
  'mango': 'manga',
  'pear': 'pera',
  'peach': 'pêssego',
  'plum': 'ameixa',
  'cherry': 'cereja',
  'blueberry': 'mirtilo',
  'raspberry': 'framboesa',
  'blackberry': 'amora',
  'kiwi': 'kiwi',
  'avocado': 'abacate',
  'coconut': 'coco',
  
  // Vegetais
  'carrot': 'cenoura',
  'broccoli': 'brócolis',
  'lettuce': 'alface',
  'tomato': 'tomate',
  'cucumber': 'pepino',
  'onion': 'cebola',
  'potato': 'batata',
  'sweet potato': 'batata doce',
  'bell pepper': 'pimentão',
  'mushroom': 'cogumelo',
  'spinach': 'espinafre',
  'kale': 'couve',
  'cauliflower': 'couve-flor',
  'cabbage': 'repolho',
  'celery': 'aipo',
  'garlic': 'alho',
  'ginger': 'gengibre',
  
  // Proteínas
  'chicken': 'frango',
  'beef': 'carne bovina',
  'fish': 'peixe',
  'salmon': 'salmão',
  'tuna': 'atum',
  'shrimp': 'camarão',
  'egg': 'ovo',
  'pork': 'porco',
  'turkey': 'peru',
  'lamb': 'cordeiro',
  'duck': 'pato',
  'sausage': 'linguiça',
  'bacon': 'bacon',
  'ham': 'presunto',
  'hot dog': 'cachorro quente',
  
  // Carboidratos
  'rice': 'arroz',
  'bread': 'pão',
  'pasta': 'macarrão',
  'spaghetti': 'espaguete',
  'noodles': 'macarrão',
  'corn': 'milho',
  'oatmeal': 'aveia',
  'cereal': 'cereal',
  'tortilla': 'tortilha',
  'bagel': 'bagel',
  'croissant': 'croissant',
  'donut': 'rosquinha',
  'muffin': 'muffin',
  'cookie': 'biscoito',
  'cake': 'bolo',
  'pie': 'torta',
  'brownie': 'brownie',
  
  // Laticínios
  'milk': 'leite',
  'cheese': 'queijo',
  'yogurt': 'iogurte',
  'butter': 'manteiga',
  'cream': 'creme',
  'ice cream': 'sorvete',
  'cream cheese': 'cream cheese',
  'cottage cheese': 'queijo cottage',
  'sour cream': 'creme azedo',
  
  // Oleaginosas
  'peanut': 'amendoim',
  'almond': 'amêndoa',
  'walnut': 'noz',
  'cashew': 'castanha de caju',
  'pistachio': 'pistache',
  'hazelnut': 'avelã',
  'pecan': 'noz-pecã',
  'macadamia': 'macadâmia',
  'sunflower seed': 'semente de girassol',
  'pumpkin seed': 'semente de abóbora',
  
  // Fast Food e Pratos
  'pizza': 'pizza',
  'hamburger': 'hambúrguer',
  'hot dog': 'cachorro quente',
  'sandwich': 'sanduíche',
  'taco': 'taco',
  'burrito': 'burrito',
  'sushi': 'sushi',
  'curry': 'curry',
  'stew': 'ensopado',
  'casserole': 'caçarola',
  'lasagna': 'lasanha',
  'mac and cheese': 'macarrão com queijo',
  'fried chicken': 'frango frito',
  'chicken nuggets': 'nuggets de frango',
  'french fries': 'batatas fritas',
  'onion rings': 'anéis de cebola',
  'mozzarella sticks': 'palitos de mussarela',
  'chicken wings': 'asas de frango',
  'fish and chips': 'peixe e batatas',
  
  // Bebidas
  'coffee': 'café',
  'tea': 'chá',
  'water': 'água',
  'soda': 'refrigerante',
  'juice': 'suco',
  'beer': 'cerveja',
  'wine': 'vinho',
  'cocktail': 'coquetel',
  'smoothie': 'vitamina',
  'milkshake': 'milkshake',
  'hot chocolate': 'chocolate quente',
  'energy drink': 'bebida energética',
  
  // Sobremesas
  'chocolate': 'chocolate',
  'candy': 'doce',
  'gummi bears': 'urso de goma',
  'chocolate bar': 'barra de chocolate',
  'chocolate chip cookie': 'biscoito de chocolate',
  'cupcake': 'cupcake',
  'cheesecake': 'cheesecake',
  'tiramisu': 'tiramisu',
  'pudding': 'pudim',
  'jello': 'gelatina',
  'popsicle': 'picolé',
  
  // Outros
  'salad': 'salada',
  'soup': 'sopa',
  'chips': 'batata chips',
  'popcorn': 'pipoca',
  'pretzel': 'pretzel',
  'crackers': 'biscoitos salgados',
  'granola': 'granola',
  'protein bar': 'barra de proteína',
  'energy bar': 'barra energética',
  'trail mix': 'mix de frutas secas',
  'dried fruit': 'fruta seca',
  'jerky': 'carne seca',
  'pickle': 'picles',
  'olive': 'azeitona',
  'hummus': 'homus',
  'guacamole': 'guacamole',
  'salsa': 'salsa',
  'ketchup': 'ketchup',
  'mayonnaise': 'maionese',
  'mustard': 'mostarda',
  'soy sauce': 'molho de soja',
  'hot sauce': 'molho picante',
  'ranch dressing': 'molho ranch',
  'italian dressing': 'molho italiano',
  'balsamic vinegar': 'vinagre balsâmico',
  'olive oil': 'azeite',
  'vegetable oil': 'óleo vegetal',
  'margarine': 'margarina',
};

/**
 * Estima as calorias de um alimento baseado no nome e confiança da detecção
 * @param foodName - Nome do alimento detectado
 * @param confidence - Confiança da detecção (0-1)
 * @param bbox - Bounding box do alimento na imagem
 * @returns Estimativa de calorias e porção
 */
function estimateCalories(foodName: string, confidence: number, bbox: any): CalorieEstimate {
  // Normalizar nome do alimento
  const normalizedName = foodName.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const mappedName = FOOD_NAME_MAPPING[normalizedName] || foodName;
  
  // Obter calorias base do alimento
  const baseCalories = CALORIE_DATABASE[normalizedName] || 150; // Valor padrão mais realista
  
  // Calcular área do bounding box para estimar porção
  const area = bbox.width * bbox.height;
  const imageArea = 640 * 640; // Assumindo imagem 640x640
  const areaRatio = area / imageArea;
  
  // Estimar porção baseada na área e tipo de alimento
  let portion = '1 porção';
  let calorieMultiplier = 1;
  
  // Ajustar multiplicador baseado no tipo de alimento
  if (normalizedName.includes('pizza')) {
    // Pizza tem porções maiores
    if (areaRatio < 0.15) {
      portion = '1 fatia';
      calorieMultiplier = 0.8;
    } else if (areaRatio > 0.4) {
      portion = '2 fatias';
      calorieMultiplier = 1.6;
    } else {
      portion = '1.5 fatias';
      calorieMultiplier = 1.2;
    }
  } else if (normalizedName.includes('hamburger') || normalizedName.includes('sandwich')) {
    // Hambúrgueres e sanduíches
    if (areaRatio < 0.1) {
      portion = '0.5 porção';
      calorieMultiplier = 0.5;
    } else if (areaRatio > 0.25) {
      portion = '1.5 porções';
      calorieMultiplier = 1.5;
    }
  } else if (normalizedName.includes('fruit') || normalizedName.includes('apple') || normalizedName.includes('banana')) {
    // Frutas têm porções menores
    if (areaRatio < 0.05) {
      portion = '0.5 porção';
      calorieMultiplier = 0.5;
    } else if (areaRatio > 0.15) {
      portion = '1.5 porções';
      calorieMultiplier = 1.5;
    }
  } else {
    // Alimentos gerais
    if (areaRatio < 0.08) {
      portion = '0.5 porção';
      calorieMultiplier = 0.5;
    } else if (areaRatio > 0.25) {
      portion = '1.5 porções';
      calorieMultiplier = 1.5;
    }
  }
  
  // Ajustar calorias baseado na confiança (mínimo 0.3 para evitar valores muito baixos)
  const confidenceMultiplier = Math.max(0.3, confidence);
  const adjustedCalories = Math.round(baseCalories * calorieMultiplier * confidenceMultiplier);
  
  return {
    foodName: mappedName,
    calories: adjustedCalories,
    portion,
    confidence
  };
}

/**
 * Serviço principal para reconhecimento de alimentos
 */
export class FoodRecognitionService {
  private static instance: FoodRecognitionService;
  private apiKey: string;
  private modelId: string;
  private useHuggingFace: boolean;
  
  constructor() {
    // Configurações da API
    this.apiKey = import.meta.env.VITE_ROBOFLOW_API_KEY || '';
    this.modelId = import.meta.env.VITE_ROBOFLOW_MODEL_ID || 'food-detection-xyz';
    
    // Usar Hugging Face se a API key do Roboflow não estiver configurada
    this.useHuggingFace = !this.apiKey || 
      this.apiKey === 'sua_api_key_aqui' || 
      this.apiKey === 'rf_Nmbh89ds8CQ7k66ylgpiEjVjzt12';
  }
  
  /**
   * Singleton pattern para instância única do serviço
   */
  public static getInstance(): FoodRecognitionService {
    if (!FoodRecognitionService.instance) {
      FoodRecognitionService.instance = new FoodRecognitionService();
    }
    return FoodRecognitionService.instance;
  }
  
  /**
   * Converte arquivo para base64
   * @param file - Arquivo de imagem
   * @returns Promise com string base64
   */
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remover prefixo data:image/...;base64,
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  }
  
  /**
   * Reconhece alimentos em uma imagem
   * @param imageFile - Arquivo de imagem
   * @returns Promise com resultado do reconhecimento
   */
  async recognizeFoods(imageFile: File): Promise<FoodRecognitionResult> {
    const startTime = Date.now();
    
    try {
      // Validar arquivo
      if (!imageFile.type.startsWith('image/')) {
        throw new Error('Arquivo deve ser uma imagem');
      }
      
      if (imageFile.size > 10 * 1024 * 1024) { // 10MB
        throw new Error('Arquivo muito grande. Máximo 10MB.');
      }
      
      // Converter para base64
      const base64Image = await this.fileToBase64(imageFile);
      
      // Verificar se temos API Key do Hugging Face
      const huggingFaceApiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      const hasHuggingFaceKey = huggingFaceApiKey && 
        huggingFaceApiKey !== '' && 
        huggingFaceApiKey !== 'sua_huggingface_api_key_aqui';
      
      // Verificar se temos as credenciais do Roboflow
      const hasValidCredentials = this.apiKey && 
        this.apiKey !== '' && 
        this.apiKey !== 'sua_api_key_aqui' && 
        this.apiKey !== 'rf_Nmbh89ds8CQ7k66ylgpiEjVjzt12';
        
      const hasValidModel = this.modelId && 
        this.modelId !== '' && 
        this.modelId !== 'seu_model_id_aqui' && 
        this.modelId !== 'food-detection-xyz';
      
      // PRIORIDADE 1: Tentar Hugging Face primeiro (se tiver API Key)
      if (hasHuggingFaceKey) {
        console.log('🤗 Usando Hugging Face API para detecção de alimentos...');
        
        try {
          const apiResult = await this.callHuggingFaceAPI(base64Image);
          
          // Processar resultados do Hugging Face
          const detectedFoods: DetectedFood[] = apiResult.predictions?.map((pred: any) => {
            const calorieEstimate = estimateCalories(
              pred.class,
              pred.confidence,
              pred.bbox
            );
            
            return {
              id: `food-${Date.now()}-${Math.random()}`,
              name: calorieEstimate.foodName,
              confidence: pred.confidence,
              bbox: pred.bbox,
              estimatedCalories: calorieEstimate.calories,
              estimatedPortion: calorieEstimate.portion,
            };
          }) || [];
          
          // Calcular total de calorias
          const totalCalories = detectedFoods.reduce((sum, food) => sum + food.estimatedCalories, 0);
          
          const processingTime = Date.now() - startTime;
          
          return {
            detectedFoods,
            totalCalories,
            processingTime,
            imageUrl: URL.createObjectURL(imageFile)
          };
          
        } catch (hfError) {
          console.warn('❌ Hugging Face falhou, tentando Roboflow...', hfError);
        }
      }
      
      // PRIORIDADE 2: Tentar Roboflow (se tiver credenciais válidas)
      if (hasValidCredentials && hasValidModel) {
        console.log('🤖 Tentando API do Roboflow...');
        
        try {
          const apiResult = await this.callRoboflowAPI(base64Image);
          
          // Processar resultados da API real
          const detectedFoods: DetectedFood[] = apiResult.predictions?.map((pred: any) => {
            const calorieEstimate = estimateCalories(
              pred.class,
              pred.confidence,
              pred.bbox
            );
            
            return {
              id: `food-${Date.now()}-${Math.random()}`,
              name: calorieEstimate.foodName,
              confidence: pred.confidence,
              bbox: pred.bbox,
              estimatedCalories: calorieEstimate.calories,
              estimatedPortion: calorieEstimate.portion,
            };
          }) || [];
          
          // Calcular total de calorias
          const totalCalories = detectedFoods.reduce((sum, food) => sum + food.estimatedCalories, 0);
          
          const processingTime = Date.now() - startTime;
          
          return {
            detectedFoods,
            totalCalories,
            processingTime,
            imageUrl: URL.createObjectURL(imageFile)
          };
          
        } catch (apiError) {
          console.warn('❌ Roboflow falhou, usando dados mockados:', apiError);
        }
      }
      
      // PRIORIDADE 3: Usar dados mockados como fallback
      console.log('🎭 Usando dados mockados como fallback...');
      return await this.recognizeFoodsWithMock(imageFile, base64Image, startTime);
      
    } catch (error) {
      console.error('Erro no reconhecimento de alimentos:', error);
      
      // Se a API real falhar, tentar com dados mockados
      console.log('Tentando com dados mockados devido ao erro da API...');
      return await this.recognizeFoodsWithMock(imageFile, await this.fileToBase64(imageFile), Date.now());
    }
  }
  
  /**
   * Reconhecimento com dados mockados (fallback)
   */
  private async recognizeFoodsWithMock(imageFile: File, base64Image: string, startTime: number): Promise<FoodRecognitionResult> {
    const mockResult = await this.mockRoboflowAPI(base64Image);
    
    const detectedFoods: DetectedFood[] = mockResult.predictions.map((pred: any) => {
      const calorieEstimate = estimateCalories(
        pred.class,
        pred.confidence,
        pred.bbox
      );
      
      return {
        id: `food-${Date.now()}-${Math.random()}`,
        name: calorieEstimate.foodName,
        confidence: pred.confidence,
        bbox: pred.bbox,
        estimatedCalories: calorieEstimate.calories,
        estimatedPortion: calorieEstimate.portion,
      };
    });
    
    const totalCalories = detectedFoods.reduce((sum, food) => sum + food.estimatedCalories, 0);
    const processingTime = Date.now() - startTime;
    
    return {
      detectedFoods,
      totalCalories,
      processingTime,
      imageUrl: URL.createObjectURL(imageFile)
    };
  }
  
  /**
   * Mock da API do Roboflow para demonstração
   * Em produção, substitua por chamada real
   */
  private async mockRoboflowAPI(base64Image: string): Promise<any> {
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Gerar dados mockados baseados em uma seed para consistência
    const seed = base64Image.length % 4; // Usar tamanho da imagem como seed
    
    const mockFoods = [
      // Frutas
      { class: 'apple', confidence: 0.85 + Math.random() * 0.1, bbox: { x: 100, y: 100, width: 80, height: 80 } },
      { class: 'banana', confidence: 0.90 + Math.random() * 0.08, bbox: { x: 200, y: 150, width: 120, height: 60 } },
      { class: 'orange', confidence: 0.78 + Math.random() * 0.15, bbox: { x: 300, y: 200, width: 70, height: 70 } },
      
      // Carboidratos
      { class: 'bread', confidence: 0.87 + Math.random() * 0.1, bbox: { x: 150, y: 300, width: 120, height: 60 } },
      { class: 'rice', confidence: 0.82 + Math.random() * 0.12, bbox: { x: 250, y: 350, width: 150, height: 40 } },
      { class: 'pasta', confidence: 0.79 + Math.random() * 0.15, bbox: { x: 180, y: 400, width: 130, height: 50 } },
      
      // Proteínas
      { class: 'chicken', confidence: 0.92 + Math.random() * 0.06, bbox: { x: 350, y: 250, width: 100, height: 80 } },
      { class: 'fish', confidence: 0.88 + Math.random() * 0.1, bbox: { x: 400, y: 300, width: 90, height: 70 } },
      { class: 'egg', confidence: 0.85 + Math.random() * 0.12, bbox: { x: 450, y: 200, width: 60, height: 50 } },
      
      // Vegetais
      { class: 'carrot', confidence: 0.80 + Math.random() * 0.15, bbox: { x: 120, y: 450, width: 40, height: 100 } },
      { class: 'broccoli', confidence: 0.83 + Math.random() * 0.12, bbox: { x: 200, y: 450, width: 80, height: 80 } },
      { class: 'tomato', confidence: 0.77 + Math.random() * 0.18, bbox: { x: 280, y: 450, width: 50, height: 50 } },
      
      // Laticínios
      { class: 'cheese', confidence: 0.86 + Math.random() * 0.11, bbox: { x: 350, y: 400, width: 70, height: 60 } },
      { class: 'milk', confidence: 0.89 + Math.random() * 0.09, bbox: { x: 450, y: 350, width: 60, height: 100 } },
      
      // Fast Food
      { class: 'pizza', confidence: 0.94 + Math.random() * 0.05, bbox: { x: 100, y: 200, width: 200, height: 150 } },
      { class: 'hamburger', confidence: 0.91 + Math.random() * 0.07, bbox: { x: 320, y: 150, width: 120, height: 80 } },
    ];
    
    // Selecionar 2-4 alimentos aleatoriamente baseado na seed
    const numFoods = 2 + (seed % 3); // 2, 3 ou 4 alimentos
    const selectedFoods = [];
    
    for (let i = 0; i < numFoods; i++) {
      const foodIndex = (seed + i) % mockFoods.length;
      selectedFoods.push(mockFoods[foodIndex]);
    }
    
    // Retornar dados mockados
    return {
      predictions: selectedFoods
    };
  }
  
  /**
   * Implementação real da API do Roboflow (para produção)
   */
  private async callRoboflowAPI(base64Image: string): Promise<any> {
    // O Model ID pode vir em diferentes formatos, vamos normalizar
    let normalizedModelId = this.modelId;
    
    // Se o model ID contém "project-", extrair apenas a parte do modelo
    if (this.modelId.includes('project-')) {
      // Exemplo: "project-ucqoe/food-detection-final-u41pe" -> "food-detection-final-u41pe"
      const parts = this.modelId.split('/');
      if (parts.length > 1) {
        normalizedModelId = parts[1];
      }
    }
    
    // Remover qualquer sufixo de versão se presente
    normalizedModelId = normalizedModelId.replace(/-\d+$/, '');
    
    console.log('Tentando conectar com Model ID:', normalizedModelId);
    
    // Usar o endpoint correto do Roboflow para inferência na nuvem
    const url = `https://infer.roboflow.com/${normalizedModelId}`;
    
    try {
      console.log('Enviando imagem para:', url);
      console.log('Tamanho da imagem base64:', base64Image.length, 'caracteres');
      
      // Usar a estrutura correta conforme a documentação oficial do Roboflow
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: new URLSearchParams({
          image: base64Image
        })
      });
      
      console.log('Resposta da API:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro da API:', errorText);
        
        if (response.status === 405) {
          throw new Error(`Modelo não suporta detecção via API. Verifique se o modelo está configurado para detecção.`);
        } else if (response.status === 401) {
          throw new Error(`API Key inválida. Verifique suas credenciais.`);
        } else if (response.status === 404) {
          throw new Error(`Modelo não encontrado. Verifique o Model ID.`);
        } else if (response.status === 400) {
          throw new Error(`Erro na imagem enviada. Verifique se a imagem é válida.`);
        } else if (response.status === 500) {
          throw new Error(`Erro interno do servidor Roboflow. Tente novamente mais tarde.`);
        } else {
          throw new Error(`Erro na API (${response.status}): ${response.statusText}`);
        }
      }
      
      const result = await response.json();
      console.log('Resultado da API:', result);
      return result;
      
    } catch (error) {
      console.error('Erro na chamada da API:', error);
      throw error;
    }
  }

  /**
   * Implementação da API do Hugging Face para detecção de alimentos
   */
  private async callHuggingFaceAPI(base64Image: string): Promise<any> {
    // Modelo de detecção de objetos do Hugging Face - usando um modelo mais confiável
    const modelId = "facebook/detr-resnet-50"; // Modelo robusto para detecção de objetos
    
    const url = `https://api-inference.huggingface.co/models/${modelId}`;
    
    try {
      console.log('🤗 Usando Hugging Face API para detecção de alimentos...');
      console.log(`📡 Endpoint: ${url}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY || 'hf_demo'}` // Usar demo se não tiver API key
        },
        body: JSON.stringify({
          inputs: `data:image/jpeg;base64,${base64Image}`
        })
      });
      
      console.log('📊 Resposta do Hugging Face:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro do Hugging Face:', errorText);
        
        if (response.status === 401) {
          throw new Error('API Key do Hugging Face inválida');
        } else if (response.status === 503) {
          throw new Error('Modelo do Hugging Face em carregamento. Tente novamente em alguns segundos.');
        } else if (response.status === 404) {
          throw new Error('Modelo não encontrado. Tentando modelo alternativo...');
        } else {
          throw new Error(`Erro na API do Hugging Face (${response.status}): ${response.statusText}`);
        }
      }
      
      const result = await response.json();
      console.log('✅ Resultado do Hugging Face:', result);
      
      // Converter resultado do Hugging Face para formato compatível
      return this.convertHuggingFaceResult(result);
      
    } catch (error) {
      console.error('❌ Erro na chamada do Hugging Face:', error);
      
      // Se o primeiro modelo falhar, tentar um modelo alternativo
      if (error.message.includes('404') || error.message.includes('não encontrado')) {
        console.log('🔄 Tentando modelo alternativo...');
        return await this.callHuggingFaceAlternativeAPI(base64Image);
      }
      
      throw error;
    }
  }

  /**
   * API alternativa do Hugging Face com modelo diferente
   */
  private async callHuggingFaceAlternativeAPI(base64Image: string): Promise<any> {
    // Modelo alternativo mais simples
    const modelId = "microsoft/DialoGPT-medium"; // Modelo mais genérico
    
    const url = `https://api-inference.huggingface.co/models/${modelId}`;
    
    try {
      console.log('🔄 Tentando modelo alternativo:', modelId);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY || 'hf_demo'}`
        },
        body: JSON.stringify({
          inputs: `data:image/jpeg;base64,${base64Image}`
        })
      });
      
      if (!response.ok) {
        throw new Error(`Modelo alternativo também falhou: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ Modelo alternativo funcionou:', result);
      
      return this.convertHuggingFaceResult(result);
      
    } catch (error) {
      console.error('❌ Modelo alternativo também falhou:', error);
      throw error;
    }
  }
  
  /**
   * Converte resultado do Hugging Face para formato compatível
   */
  private convertHuggingFaceResult(hfResult: any): any {
    // Filtrar apenas detecções de alimentos (baseado em confiança e labels)
    const foodLabels = [
      'apple', 'banana', 'orange', 'bread', 'pizza', 'hamburger', 
      'chicken', 'fish', 'rice', 'pasta', 'carrot', 'tomato',
      'cheese', 'milk', 'egg', 'cake', 'cookie', 'sandwich'
    ];
    
    const predictions = hfResult
      .filter((detection: any) => {
        const label = detection.label?.toLowerCase();
        return foodLabels.some(food => label?.includes(food)) && detection.score > 0.3;
      })
      .map((detection: any) => ({
        class: detection.label,
        confidence: detection.score,
        bbox: {
          x: detection.box.xmin,
          y: detection.box.ymin,
          width: detection.box.xmax - detection.box.xmin,
          height: detection.box.ymax - detection.box.ymin
        }
      }));
    
    return { predictions };
  }
}

// Exportar instância singleton
export const foodRecognitionService = FoodRecognitionService.getInstance();
