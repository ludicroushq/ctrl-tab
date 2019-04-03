import React from 'react';
import Standard from '../components/Standard';

import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = sortableElement(({value}) => (
  <React.Fragment>
    <div className="column">
      <Standard />
    </div>
    <style jsx>
      {`
        .column {
          height: 100%;
          padding: 0px !important;
        }
      `}
    </style>
  </React.Fragment>
));

const SortableContainer = sortableContainer(({children}) => {
  return (
    <React.Fragment>
      <div className="columns">
        {children}
      </div>
      <style jsx>
        {`
          .columns {
            min-height: 100%;
            overflow: hidden;
            margin: 0px;
          }
        `}
      </style>
    </React.Fragment>
  );
});

export default class Index extends React.Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',],
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  render() {
    const {items} = this.state;

    return (
      <React.Fragment>
        <SortableContainer onSortEnd={this.onSortEnd} axis="x">
          {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
        </SortableContainer>
      </React.Fragment>
    );
  }
}
