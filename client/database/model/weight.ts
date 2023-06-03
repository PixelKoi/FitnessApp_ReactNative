import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';
// https://blog.logrocket.com/offline-app-react-native-watermelondb/
export default class Weight extends Model {
    static table = 'weights';
    @field('weight') weight;
    @readonly @date('created_at') createdAt;
    @field('note') note;

}