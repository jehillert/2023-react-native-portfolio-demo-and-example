[blog](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)
```js
[Selector that takes argument - stack overflow](https://stackoverflow.com/questions/40291084/use-reselect-selector-with-parameters)

/* itemsSelectors.js */
const selectItems = state => state.items;

// createSelector 2nd arg (callback), expects a number as the second argument
const selectItemId = (state, itemId) => itemId;

const selectItemById = createSelector(
    [selectItems, selectItemId, selectOtherField],
    (items, itemId, someField) => items[itemId]
);

/* MyComponent.tsx */
const MyComponent = (props) => {
  const itemById = useSelector((state) =>
    selectItemById(state, id)
  )

  return (<>some jsx</>);
}
/* ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ */
// Same example as above, but a second parameter...
// selectItems...
// selectItemId...

const selectOtherField (state, someObject) => someObject.someField;

const selectItemById = createSelector(
    [selectItems, selectItemId, selectOtherField],
    (items, itemId, someField) => items[itemId]
);

// MyComponent.tsx
const myValueById = useSelector((state) =>
    selectMyValueById(state, id)
  )
```
