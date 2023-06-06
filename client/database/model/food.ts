// Import necessary dependencies
import { Model } from '@nozbe/watermelondb';
import { field, relation, writer } from '@nozbe/watermelondb/decorators';

// Define the Foods table schema
export default class Food extends Model {
    static table = 'foods';

    // Define table fields
    @field('calories') calories;
    @field('carbs') carbs;
    @field('fat') fat;
    @field('protein') protein;
    @field('description') description;

    @writer async createFood(objectData) {
        return await this.batch(
            this.collections.get('foods').prepareCreate(food => {
                food.calories = objectData.Calories
                food.carbs = objectData.Carbs
                food.fat = objectData.Fat
                food.protein = objectData.Protein
                food.description = objectData.description
            })
        )
}


