import {index} from './database';

export type Weight = {
    createdAt?: Date;
    weight: string | number;
    note: string | undefined;
};

const weights = index.collections.get('weights');

export const observeWeights = () => weights.query().observe();
export const saveWeight = async ({weight, note}: Weight) => {
    await index.action(async () => {
        await weights.create((entry) => {
            entry.weight = Number(weight);
            entry.note = note;
        });
    });
};