import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Row from './Row';

const App = () => {
  const [state, setState] = useState([
    { id: 'row1', items: ['1', '2', '3'] },
    { id: 'row2', items: ['4', '5', '6'] },
    { id: 'row3', items: ['7', '8', '9'] },
  ]);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'row') {
      const newState = JSON.parse(JSON.stringify(state));
      const dragged = JSON.parse(
        JSON.stringify(state[state.findIndex(row => row.id === draggableId)])
      );

      newState.splice(source.index, 1);
      newState.splice(destination.index, 0, dragged);
      setState(newState);
      return;
    }

    const newState = JSON.parse(JSON.stringify(state));

    if (source.droppableId === destination.droppableId) {
      const newItems =
        newState[state.findIndex(row => row.id === source.droppableId)].items;
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, draggableId);
    } else {
      const newSourceItems =
        newState[state.findIndex(row => row.id === source.droppableId)].items;
      const newDestinationItems =
        newState[state.findIndex(row => row.id === destination.droppableId)]
          .items;
      newSourceItems.splice(source.index, 1);
      newDestinationItems.splice(destination.index, 0, draggableId);
    }

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-rows" direction="vertical" type="row">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="rows"
          >
            {state.map((row, index) => (
              <Row key={row.id} index={index} row={row} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
