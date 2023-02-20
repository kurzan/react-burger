import {selectedIngredientsReducer, initialState} from '../reducers/selected-ingredients'
import { selectBun, selectIngredient, removeIngredient, resetIngredient, moveIngredient } from '../actions/selected-ingredients';


describe('selectedIngredientsReducer', () => {

  it('initializes the state with the default value', () => {
    expect(selectedIngredientsReducer(initialState, {})).toEqual({
      "bun": null, "selectedIngredients": []
    })
  })
  it('sets the bun when selectBun is called', () => {
    const result = selectedIngredientsReducer(initialState, selectBun({bun: { key: 'sesame'}}))
    expect(result.bun).toEqual({bun: { key: 'sesame' }});
  });
  it('selectedIngredients is empty when resetIngredient is called', () => {
    const result = selectedIngredientsReducer(initialState, selectBun({bun: { key: 'sesame'}}))
    const resetResult = selectedIngredientsReducer(result, resetIngredient());
    expect(resetResult.selectedIngredients).toEqual([]);
  });
  it('adds new ingredient when selectIngredient is called', () => {
    const result = selectedIngredientsReducer(initialState, selectIngredient({ingredient: { key: '123'}}))
    expect(result.selectedIngredients).toEqual([{"ingredient": {"key": "123"}, "key": undefined}]);
  });
  it('removes ingredient when removeIngredient is called', () => {
    let state = {
      bun: null,
      selectedIngredients: [{ ...{type: 'sauce'}, key: '123' }]
    }
    const result = selectedIngredientsReducer(state, removeIngredient('123'))
    expect(result.selectedIngredients).toEqual([]);
  });
  it('moves ingredient when moveIngredient is called', () => {
    let state = {
      bun: null,
      selectedIngredients: [{type: 'sauce'}, {type: 'meat'}, {type: 'chease'}]
    }
    const result = selectedIngredientsReducer(state, moveIngredient(1, 2))
    expect(result.selectedIngredients).toEqual([{type: 'sauce'}, {type: 'chease'}, {type: 'meat'}]);
  });
});