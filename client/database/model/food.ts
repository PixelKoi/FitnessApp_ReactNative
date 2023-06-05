// Import necessary dependencies
import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

// Define the Foods table schema
export default class Food extends Model {
    static table = 'foods';

    // Define table fields
    @field('calories') calories;
    @field('carbs') carbs;
    @field('fat') fat;
    @field('protein') protein;
    @field('description') description;
}


