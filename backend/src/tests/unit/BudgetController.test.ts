import {budgets} from '../mocks/budgets';

describe('BudgetController', () => {

    it('Should retrive 3 budgets',()=>{
        expect(budgets).toHaveLength(3)
    })


})